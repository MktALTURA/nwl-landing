import { Redis } from '@upstash/redis';

/**
 * WhatsApp attribution parking lot.
 *
 * One short-lived record per WhatsApp CTA click, keyed by the reference code
 * stamped into the prefilled message. TTL is 7 days because that is Meta's
 * hard limit on `event_time` — a record older than that can no longer be sent
 * to the Conversions API, so keeping it would only invite a rejected replay.
 */

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

export const WA_TTL_SECONDS = 7 * 24 * 60 * 60;

/** `NW-` + 6 unambiguous uppercase chars. Anchored — used to validate input. */
export const WA_TOKEN_RE = /^NW-[23456789ABCDEFGHJKLMNPQRSTUVWXYZ]{6}$/;

export interface WaAttribution {
  token: string;
  /** Epoch ms of the WhatsApp click. Meta event_time is derived from this. */
  clickedAt: number;
  href?: string;
  source_path?: string;
  landing_page?: string;
  ft_landing_page?: string;
  fbclid?: string;
  fbclidTs?: number;
  clickIds?: Record<string, string>;
  utm?: Record<string, string | undefined>;
  ft_utm?: Record<string, string | undefined>;
  /** Read server-side off the click request — never sent by the client. */
  fbc?: string;
  fbp?: string;
  ip?: string;
  ua?: string;
  /** Set once /api/wa-resolve has replayed this click to Meta. */
  resolvedAt?: number;
}

const key = (token: string) => `wa:attr:${token}`;

export async function putWaAttribution(data: WaAttribution): Promise<void> {
  await redis.set(key(data.token), JSON.stringify(data), { ex: WA_TTL_SECONDS });
}

export async function getWaAttribution(token: string): Promise<WaAttribution | null> {
  const raw = await redis.get<WaAttribution | string>(key(token));
  if (!raw) return null;
  // Upstash auto-parses JSON strings on read; tolerate either shape.
  return typeof raw === 'string' ? (JSON.parse(raw) as WaAttribution) : raw;
}

/** Mark as replayed without extending the TTL, so it still expires at 7 days. */
export async function markWaResolved(data: WaAttribution): Promise<void> {
  const ttl = await redis.ttl(key(data.token));
  if (ttl === null || ttl <= 0) return;
  await redis.set(key(data.token), JSON.stringify({ ...data, resolvedAt: Date.now() }), {
    ex: ttl,
  });
}

/**
 * Cheap per-IP write cap on the unauthenticated token endpoint.
 * Returns true when the caller is over budget.
 */
export async function isWaWriteLimited(ip: string, max = 60): Promise<boolean> {
  const k = `rl:wa-token:${ip}`;
  const count = await redis.incr(k);
  if (count === 1) await redis.expire(k, 3600);
  return count > max;
}
