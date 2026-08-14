import { Redis } from '@upstash/redis';
import { nanoid } from 'nanoid';
import { unstable_cache } from 'next/cache';
import {
  benefitPartners as FILE_PARTNERS,
  benefitCategories as FILE_CATEGORIES,
} from '@/lib/beneficios-data';
import type { BenefitCategory, BenefitPartner, CatalogData } from '@/lib/beneficios/types';
import type { PartnerInput, CategoryInput } from '@/lib/validations/beneficios';

/**
 * Redis-backed store for the beneficios catalog.
 *
 * Keys
 *   beneficios:partners:index   ZSET   member = id, score = display position
 *   beneficios:partner:{id}     JSON   the record
 *   beneficios:slug:{slug}      STRING id — slug uniqueness + reverse lookup
 *   beneficios:categories       JSON   ordered BenefitCategory[]
 *   beneficios:seeded           STRING "1" — distinguishes "never seeded" from
 *                                      "deliberately emptied"
 *
 * Ordering lives in the ZSET score rather than on each record, so a reorder is
 * one pipeline instead of N record writes and the order can't drift out of
 * sync with itself.
 */

const INDEX_KEY = 'beneficios:partners:index';
const CATEGORIES_KEY = 'beneficios:categories';
const SEEDED_KEY = 'beneficios:seeded';
const partnerKey = (id: string) => `beneficios:partner:${id}`;
const slugKey = (slug: string) => `beneficios:slug:${slug}`;

/**
 * Built per call, not at module scope: `new Redis({url: undefined})` throws at
 * construction, which would turn a missing build-time env var into a failed
 * build now that a prerendered page imports this module.
 */
function getRedis(): Redis | null {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

/** The committed file is the seed source and the last-resort fallback. */
function fileCatalog(): CatalogData {
  const now = new Date(0).toISOString();
  return {
    partners: FILE_PARTNERS.map((p, i) => ({
      ...p,
      id: `file-${i}`,
      createdAt: now,
      updatedAt: now,
    })) as BenefitPartner[],
    categories: FILE_CATEGORIES as BenefitCategory[],
  };
}

/** Raw read — no caching. Admin routes use this so the editor never sees stale data. */
export async function loadCatalog(): Promise<CatalogData & { source: 'redis' | 'fallback' }> {
  const redis = getRedis();
  if (!redis) return { ...fileCatalog(), source: 'fallback' };

  const [ids, categories, seeded] = await Promise.all([
    redis.zrange<string[]>(INDEX_KEY, 0, -1),
    redis.get<BenefitCategory[]>(CATEGORIES_KEY),
    redis.get<string>(SEEDED_KEY),
  ]);

  // Never seeded → serve the file. Seeded but empty → someone cleared it on
  // purpose, so respect that and return the empty catalog.
  if (!seeded) return { ...fileCatalog(), source: 'fallback' };

  let partners: BenefitPartner[] = [];
  if (ids.length) {
    const pipeline = redis.pipeline();
    for (const id of ids) pipeline.get(partnerKey(id));
    const rows = await pipeline.exec<(BenefitPartner | null)[]>();
    // zrange already returns them in score order — no re-sorting here.
    partners = rows.filter((p): p is BenefitPartner => p !== null);
  }

  return { partners, categories: categories ?? [], source: 'redis' };
}

/**
 * Cached read for the public page.
 *
 * The try/catch belongs OUTSIDE this (see getCatalogSafe): catching inside
 * would cache the fallback for the full hour after a momentary Redis blip.
 */
const getCachedCatalog = unstable_cache(loadCatalog, ['beneficios-catalog'], {
  tags: ['beneficios'],
  revalidate: 3600,
});

/** What the public page calls. Always returns a renderable catalog. */
export async function getCatalogSafe(): Promise<CatalogData & { source: 'redis' | 'fallback' }> {
  try {
    return await getCachedCatalog();
  } catch (err) {
    console.error('[beneficios] Redis read failed, serving the committed catalog', err);
    return { ...fileCatalog(), source: 'fallback' };
  }
}

// ── Partners ────────────────────────────────────────────────────────────────

export async function getPartner(id: string): Promise<BenefitPartner | null> {
  const redis = getRedis();
  if (!redis) return null;
  return redis.get<BenefitPartner>(partnerKey(id));
}

/** Returns the id owning a slug, or null. Used to enforce uniqueness. */
export async function getIdBySlug(slug: string): Promise<string | null> {
  const redis = getRedis();
  if (!redis) return null;
  return redis.get<string>(slugKey(slug));
}

export async function createPartner(data: PartnerInput): Promise<BenefitPartner> {
  const redis = getRedis();
  if (!redis) throw new Error('KV no configurado');

  const id = nanoid(12);
  const now = new Date().toISOString();
  const partner = { ...data, id, createdAt: now, updatedAt: now } as BenefitPartner;

  // New partners go last: highest existing score + 1.
  const last = await redis.zrange<string[]>(INDEX_KEY, -1, -1, { withScores: true });
  const nextScore = last.length >= 2 ? Number(last[1]) + 1 : 0;

  const pipeline = redis.pipeline();
  pipeline.set(partnerKey(id), partner);
  pipeline.zadd(INDEX_KEY, { score: nextScore, member: id });
  pipeline.set(slugKey(partner.slug), id);
  await pipeline.exec();

  return partner;
}

export async function updatePartner(
  id: string,
  data: PartnerInput
): Promise<BenefitPartner | null> {
  const redis = getRedis();
  if (!redis) throw new Error('KV no configurado');

  const existing = await redis.get<BenefitPartner>(partnerKey(id));
  if (!existing) return null;

  const updated: BenefitPartner = {
    ...existing,
    ...data,
    id,
    createdAt: existing.createdAt,
    updatedAt: new Date().toISOString(),
  } as BenefitPartner;

  const pipeline = redis.pipeline();
  pipeline.set(partnerKey(id), updated);
  if (existing.slug !== updated.slug) {
    pipeline.del(slugKey(existing.slug));
    pipeline.set(slugKey(updated.slug), id);
  }
  await pipeline.exec();

  return updated;
}

export async function deletePartner(id: string): Promise<BenefitPartner | null> {
  const redis = getRedis();
  if (!redis) throw new Error('KV no configurado');

  const existing = await redis.get<BenefitPartner>(partnerKey(id));
  if (!existing) return null;

  const pipeline = redis.pipeline();
  pipeline.del(partnerKey(id));
  pipeline.zrem(INDEX_KEY, id);
  pipeline.del(slugKey(existing.slug));
  await pipeline.exec();

  return existing;
}

/** Current ordered ids — the reorder route compares against this. */
export async function getPartnerIds(): Promise<string[]> {
  const redis = getRedis();
  if (!redis) return [];
  return redis.zrange<string[]>(INDEX_KEY, 0, -1);
}

/** Replace the whole order. Callers must verify the id set first. */
export async function reorderPartners(ids: string[]): Promise<void> {
  const redis = getRedis();
  if (!redis) throw new Error('KV no configurado');

  const pipeline = redis.pipeline();
  pipeline.del(INDEX_KEY);
  ids.forEach((id, i) => pipeline.zadd(INDEX_KEY, { score: i, member: id }));
  await pipeline.exec();
}

// ── Categories ──────────────────────────────────────────────────────────────
// One JSON array: nine records, edited rarely, always read and written whole.

export async function getCategories(): Promise<BenefitCategory[]> {
  const redis = getRedis();
  if (!redis) return FILE_CATEGORIES as BenefitCategory[];
  return (await redis.get<BenefitCategory[]>(CATEGORIES_KEY)) ?? [];
}

export async function saveCategories(categories: CategoryInput[]): Promise<void> {
  const redis = getRedis();
  if (!redis) throw new Error('KV no configurado');
  await redis.set(CATEGORIES_KEY, categories);
}

/** How many partners reference a category — blocks deleting one still in use. */
export async function countPartnersInCategory(key: string): Promise<number> {
  const { partners } = await loadCatalog();
  return partners.filter((p) => p.categoryKey === key).length;
}

// ── Seeding ─────────────────────────────────────────────────────────────────

/**
 * Copy the committed catalog into Redis. Idempotent unless `force` is set,
 * which doubles as a "reset to the file" escape hatch.
 */
export async function seedBeneficios(force = false): Promise<{ seeded: boolean; count: number }> {
  const redis = getRedis();
  if (!redis) throw new Error('KV no configurado');

  if (!force) {
    const claimed = await redis.setnx(SEEDED_KEY, '1');
    if (!claimed) return { seeded: false, count: 0 };
  } else {
    // Clear the old records before re-seeding, or orphans linger.
    const ids = await redis.zrange<string[]>(INDEX_KEY, 0, -1);
    if (ids.length) {
      const cleanup = redis.pipeline();
      for (const id of ids) cleanup.del(partnerKey(id));
      cleanup.del(INDEX_KEY);
      await cleanup.exec();
    }
    await redis.set(SEEDED_KEY, '1');
  }

  const now = new Date().toISOString();
  const pipeline = redis.pipeline();

  FILE_PARTNERS.forEach((p, i) => {
    const id = nanoid(12);
    pipeline.set(partnerKey(id), { ...p, id, createdAt: now, updatedAt: now });
    pipeline.zadd(INDEX_KEY, { score: i, member: id });
    pipeline.set(slugKey(p.slug), id);
  });
  pipeline.set(CATEGORIES_KEY, FILE_CATEGORIES);

  await pipeline.exec();
  return { seeded: true, count: FILE_PARTNERS.length };
}
