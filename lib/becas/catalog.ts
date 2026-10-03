import { unstable_cache } from 'next/cache';
import type { BecasCampus, BecasCatalog, BecasCupo, BecasGrado, BecasVariant, SiteCampusSlug } from './contract';
import { fetchCatalog } from './worker-client';
import { fixtureCatalog } from './fixtures';

export const BECAS_CACHE_TAG = 'becas';

/**
 * Campuses this site will ever show, whatever the worker says. A worker
 * misconfiguration (say, Zibatá scoped into the benefit) can't surface a
 * campus here that the program excludes.
 */
export const SITE_CAMPUS_ALLOWLIST: readonly SiteCampusSlug[] = ['milenio', 'corregidora', 'san-miguel', 'juriquilla'];

/* ------------------------------------------------------------------ */
/*  Public shape — what reaches React (and therefore the HTML/JS).      */
/*  Built with an explicit allowlist so a new worker field can't leak  */
/*  into the page by accident, and so the 'ahorro' variant provably    */
/*  carries no peso amounts.                                           */
/* ------------------------------------------------------------------ */

export interface PublicGrado {
  key: string;
  label: string;
  nivel: BecasGrado['nivel'];
  categorias: BecasGrado['categorias'];
  quote?: NonNullable<BecasGrado['quote']>;
}

export interface PublicCampus {
  slug: SiteCampusSlug;
  label: string;
  ciclos: Record<
    string,
    {
      cupo: BecasCampus['ciclos'][string]['cupo'];
      referencia: BecasCampus['ciclos'][string]['referencia'];
      grados: PublicGrado[];
    }
  >;
}

export interface PublicCatalog {
  open: boolean;
  variant: BecasVariant;
  consentVersion: string;
  programa: BecasCatalog['programa'];
  categorias: BecasCatalog['categorias'];
  uploads: BecasCatalog['uploads'];
  ciclos: BecasCatalog['ciclos'];
  campuses: PublicCampus[];
  /** Sum of visible restantes, or null when any participating campus hides its cupo. */
  cuposTotal: number | null;
  /** True when served from fixtures (demo ribbon). */
  mock: boolean;
}

export function toPublicCatalog(raw: BecasCatalog, variantOverride?: BecasVariant, mock = false): PublicCatalog {
  const variant = variantOverride ?? raw.variant;
  const withPrices = variant === 'precios';

  const campuses: PublicCampus[] = raw.campuses
    .filter((c) => (SITE_CAMPUS_ALLOWLIST as readonly string[]).includes(c.siteSlug))
    .map((c) => ({
      slug: c.siteSlug,
      label: c.label,
      ciclos: Object.fromEntries(
        Object.entries(c.ciclos).map(([ciclo, data]) => [
          ciclo,
          {
            cupo: (data.cupo.visible
              ? { visible: true, total: data.cupo.total, restante: data.cupo.restante }
              : { visible: false }) as BecasCupo,
            referencia: data.referencia ? { ciclo: data.referencia.ciclo, ajusteEstimado: data.referencia.ajusteEstimado } : null,
            grados: data.grados.map((g) => {
              const grado: PublicGrado = { key: g.key, label: g.label, nivel: g.nivel, categorias: [...g.categorias] };
              if (withPrices && g.quote) {
                grado.quote = {
                  lista: { ...g.quote.lista },
                  beca: g.quote.beca.map((b) => ({ ...b })),
                };
              }
              return grado;
            }),
          },
        ]),
      ),
    }))
    // Keep the owner's order, not the worker's.
    .sort((a, b) => SITE_CAMPUS_ALLOWLIST.indexOf(a.slug) - SITE_CAMPUS_ALLOWLIST.indexOf(b.slug));

  const programa: BecasCatalog['programa'] = {
    becaPct: raw.programa.becaPct,
    aplicaA: raw.programa.aplicaA,
    diasPago: raw.programa.diasPago,
    prontoPagoPct: raw.programa.prontoPagoPct,
    compatibleProntoPago: raw.programa.compatibleProntoPago,
    ventanaDias: raw.programa.ventanaDias,
    referidoPct: raw.programa.referidoPct,
    referidoMax: raw.programa.referidoMax,
    pagosPorCiclo: raw.programa.pagosPorCiclo,
    entidadAval: raw.programa.entidadAval || null,
  };
  if (!withPrices) {
    programa.ahorro =
      raw.programa.ahorro ??
      Array.from({ length: raw.programa.referidoMax + 1 }, (_, n) => {
        const pctBeca = Math.min(100, raw.programa.becaPct + raw.programa.referidoPct * n);
        return { referidos: n, pctBeca, pctVsProntoPago: Math.max(0, pctBeca - raw.programa.prontoPagoPct) };
      });
  }

  // Counter total: only when every participating campus shows a figure for the
  // current ciclo; a null anywhere means "don't claim a number".
  const actual = raw.ciclos.find((c) => c.tipo === 'actual')?.key;
  let cuposTotal: number | null = 0;
  for (const c of campuses) {
    const cupo = actual ? c.ciclos[actual]?.cupo : undefined;
    if (!cupo || !cupo.visible) {
      cuposTotal = null;
      break;
    }
    cuposTotal += cupo.restante;
  }

  return {
    open: raw.open,
    variant,
    consentVersion: raw.consentVersion,
    programa,
    categorias: raw.categorias.map((c) => ({ ...c, niveles: c.niveles ? [...c.niveles] : undefined })),
    uploads: { ...raw.uploads, mime: [...raw.uploads.mime] },
    ciclos: raw.ciclos.map((c) => ({ ...c })),
    campuses,
    cuposTotal,
    mock,
  };
}

/* ───────────────────────────── loading ───────────────────────────── */

const loadRaw = unstable_cache(async () => fetchCatalog(), ['becas-catalog'], {
  tags: [BECAS_CACHE_TAG],
  revalidate: 60,
});

/**
 * The catalog for the public page. Never throws: a worker outage returns
 * `null` and the page renders its content without calculator or application,
 * pointing to WhatsApp instead.
 */
export async function getCatalogSafe(variantOverride?: BecasVariant): Promise<PublicCatalog | null> {
  try {
    const raw = await loadRaw();
    const mock = !process.env.BECAS_API_URL || process.env.BECAS_MOCK === '1';
    return toPublicCatalog(raw, variantOverride, mock);
  } catch (err) {
    console.error('[becas] catalog unavailable:', err);
    return null;
  }
}

/** Fixture catalog for the demo routes when the worker has no prices to show. */
export function demoCatalog(variant: BecasVariant): PublicCatalog {
  return toPublicCatalog(fixtureCatalog(variant), variant, true);
}
