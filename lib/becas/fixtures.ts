import type {
  BecaCategoria,
  BecasCampus,
  BecasCatalog,
  BecasGrado,
  BecasQuoteBeca,
  BecasStatusResponse,
  BecasVariant,
  BecasVerifyResponse,
  Nivel,
  WorkerCampusSlug,
} from './contract';
import { CAMPUS_SITE_SLUG } from './contract';

/* ------------------------------------------------------------------ */
/*  Mock data for the becas page.                                      */
/*                                                                     */
/*  Used when BECAS_API_URL is unset (local dev, preview deployments   */
/*  without worker credentials) and by the /becas/demo/* routes. The   */
/*  numbers are ILLUSTRATIVE — the real list lives in the hoja de      */
/*  inversión D1 and the worker computes every peso with the same      */
/*  engine the hoja uses. The arithmetic here mirrors that engine for  */
/*  the documented BE NEWLAND case (base 9,100 → 6,370 / 9,100 /       */
/*  9,555 / pago anual 60,515) so the demo looks like the real thing.  */
/* ------------------------------------------------------------------ */

export const FIXTURE_CICLOS = { actual: '2026-2027', siguiente: '2027-2028' } as const;

const round2 = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100;

const PRONTO_PAGO_PCT = 8;
const RECARGO_PCT = 5;
const PAGO_ANUAL_FACTOR = 0.95;
const BECA_PCT = 30;
const REFERIDO_PCT = 10;
const REFERIDO_MAX = 7;

/** Illustrative monthly list price per nivel. */
const BASE: Record<Nivel, number> = {
  Maternal: 8200,
  Kinder: 9100,
  Primaria: 10400,
  Secundaria: 11600,
  Prepa: 12800,
};
const INSCRIPCION: Record<Nivel, number> = {
  Maternal: 11900,
  Kinder: 13271,
  Primaria: 14650,
  Secundaria: 15800,
  Prepa: 16900,
};
const CUOTA: Record<Nivel, number> = {
  Maternal: 7100,
  Kinder: 7959,
  Primaria: 8400,
  Secundaria: 8900,
  Prepa: 9300,
};

function becaRows(base: number): BecasQuoteBeca[] {
  const rows: BecasQuoteBeca[] = [];
  const prontoPago = round2(base * (1 - PRONTO_PAGO_PCT / 100));
  for (let n = 0; n <= REFERIDO_MAX; n++) {
    const pct = Math.min(100, BECA_PCT + REFERIDO_PCT * n);
    const c1a10 = round2(base * (1 - pct / 100));
    rows.push({
      referidos: n,
      pct,
      colegiatura1a10: c1a10,
      colegiatura11a20: base,
      colegiaturaDesde21: round2(base * (1 + RECARGO_PCT / 100)),
      pagoAnual: round2(c1a10 * 10 * PAGO_ANUAL_FACTOR),
      ahorroMensualVsLista: round2(base - c1a10),
      ahorroMensualVsProntoPago: round2(prontoPago - c1a10),
      ahorroCicloVsLista: round2((base - c1a10) * 10),
    });
  }
  return rows;
}

const ALL: BecaCategoria[] = ['deportiva', 'academica', 'cultural', 'espiritu'];
const SIN_ACADEMICA: BecaCategoria[] = ['deportiva', 'cultural', 'espiritu'];

type GradoDef = { key: string; label: string; nivel: Nivel; categorias: BecaCategoria[] };

const GRADOS_BASE: GradoDef[] = [
  { key: 'Maternal', label: 'Maternal', nivel: 'Maternal', categorias: SIN_ACADEMICA },
  { key: 'Kinder 1', label: 'Kinder 1', nivel: 'Kinder', categorias: SIN_ACADEMICA },
  { key: 'Kinder 2', label: 'Kinder 2', nivel: 'Kinder', categorias: SIN_ACADEMICA },
  { key: 'Kinder 3', label: 'Kinder 3', nivel: 'Kinder', categorias: SIN_ACADEMICA },
  { key: 'Primaria 1', label: '1º de Primaria', nivel: 'Primaria', categorias: SIN_ACADEMICA },
  { key: 'Primaria 2', label: '2º de Primaria', nivel: 'Primaria', categorias: ALL },
  { key: 'Primaria 3', label: '3º de Primaria', nivel: 'Primaria', categorias: ALL },
  { key: 'Primaria 4', label: '4º de Primaria', nivel: 'Primaria', categorias: ALL },
  { key: 'Primaria 5', label: '5º de Primaria', nivel: 'Primaria', categorias: ALL },
  { key: 'Primaria 6', label: '6º de Primaria', nivel: 'Primaria', categorias: ALL },
  { key: 'Secundaria 1 (7mo)', label: '1º de Secundaria', nivel: 'Secundaria', categorias: ALL },
  { key: 'Secundaria 2 (8vo)', label: '2º de Secundaria', nivel: 'Secundaria', categorias: ALL },
  { key: 'Secundaria 3 (9no)', label: '3º de Secundaria', nivel: 'Secundaria', categorias: ALL },
];
const GRADOS_PREPA: GradoDef[] = [
  { key: 'Preparatoria 1 (10mo)', label: '1º de Preparatoria', nivel: 'Prepa', categorias: ALL },
  { key: 'Preparatoria 2 (12vo)', label: '2º de Preparatoria', nivel: 'Prepa', categorias: ALL },
  { key: 'Preparatoria 3 (13vo)', label: '3º de Preparatoria', nivel: 'Prepa', categorias: ALL },
];

function grados(defs: GradoDef[], withPrices: boolean, campusFactor: number): BecasGrado[] {
  return defs.map((g) => {
    const base = round2(BASE[g.nivel] * campusFactor);
    const grado: BecasGrado = { key: g.key, label: g.label, nivel: g.nivel, categorias: g.categorias };
    if (withPrices) {
      grado.quote = {
        lista: {
          inscripcion: round2(INSCRIPCION[g.nivel] * campusFactor),
          cuotaUnica: round2(CUOTA[g.nivel] * campusFactor),
          costoPerfil: 600,
          colegiaturaBase: base,
          colegiaturaProntoPago: round2(base * (1 - PRONTO_PAGO_PCT / 100)),
          pagoAnual: round2(base * 10 * PAGO_ANUAL_FACTOR),
        },
        beca: becaRows(base),
      };
    }
    return grado;
  });
}

const CAMPUS_DEFS: { slug: WorkerCampusSlug; label: string; prepa: boolean; factor: number; cupo: [number, number] }[] = [
  { slug: 'milenio', label: 'Milenio', prepa: false, factor: 1, cupo: [20, 7] },
  { slug: 'juriquilla', label: 'Juriquilla', prepa: false, factor: 1.04, cupo: [20, 12] },
  { slug: 'corregidora', label: 'Corregidora', prepa: true, factor: 1, cupo: [25, 15] },
  { slug: 'sma', label: 'San Miguel de Allende', prepa: false, factor: 0.96, cupo: [15, 9] },
];

export function fixtureCatalog(variant: BecasVariant): BecasCatalog {
  const withPrices = variant === 'precios';
  const campuses: BecasCampus[] = CAMPUS_DEFS.map((c) => {
    const defs = c.prepa ? [...GRADOS_BASE, ...GRADOS_PREPA] : GRADOS_BASE;
    return {
      slug: c.slug,
      siteSlug: CAMPUS_SITE_SLUG[c.slug],
      label: c.label,
      ciclos: {
        [FIXTURE_CICLOS.actual]: {
          cupo: { visible: true, total: c.cupo[0], restante: c.cupo[1] },
          referencia: null,
          grados: grados(defs, withPrices, c.factor),
        },
        [FIXTURE_CICLOS.siguiente]: {
          cupo: { visible: true, total: c.cupo[0], restante: c.cupo[0] - 2 },
          // Next year's list isn't published yet in the demo: same numbers, flagged.
          referencia: { ciclo: FIXTURE_CICLOS.actual, ajusteEstimado: '5% a 7%' },
          grados: grados(defs, withPrices, c.factor),
        },
      },
    };
  });

  return {
    open: true,
    generatedAt: new Date().toISOString(),
    consentVersion: '2026-10-a',
    variant,
    programa: {
      becaPct: BECA_PCT,
      aplicaA: 'colegiatura',
      diasPago: '1-10',
      prontoPagoPct: PRONTO_PAGO_PCT,
      compatibleProntoPago: false,
      ventanaDias: 14,
      referidoPct: REFERIDO_PCT,
      referidoMax: REFERIDO_MAX,
      pagosPorCiclo: 10,
      entidadAval: null,
      ...(withPrices
        ? {}
        : {
            ahorro: Array.from({ length: REFERIDO_MAX + 1 }, (_, n) => {
              const pctBeca = Math.min(100, BECA_PCT + REFERIDO_PCT * n);
              return { referidos: n, pctBeca, pctVsProntoPago: Math.max(0, pctBeca - PRONTO_PAGO_PCT) };
            }),
          }),
    },
    categorias: [
      { key: 'deportiva', enabled: true, evidencia: 'archivo_o_liga' },
      { key: 'academica', enabled: true, evidencia: 'boleta', niveles: ['Primaria', 'Secundaria', 'Prepa'], promedioMinimo: 8.5 },
      { key: 'cultural', enabled: true, evidencia: 'archivo_o_liga' },
      { key: 'espiritu', enabled: true, evidencia: 'carta', cartaMinChars: 900, cartaMaxChars: 3000 },
    ],
    uploads: {
      maxBytes: 10 * 1024 * 1024,
      maxPorTipo: 3,
      mime: ['application/pdf', 'image/jpeg', 'image/png', 'image/webp', 'image/heic'],
    },
    ciclos: [
      { key: FIXTURE_CICLOS.actual, tipo: 'actual' },
      { key: FIXTURE_CICLOS.siguiente, tipo: 'siguiente' },
    ],
    campuses,
  };
}

/* ───────────────────────── status / verify mocks ───────────────────────── */

const DAY = 86_400_000;
const iso = (offsetDays: number) => new Date(Date.now() + offsetDays * DAY).toISOString();
const dayKey = (offsetDays: number) => iso(offsetDays).slice(0, 10);

export function fixtureStatus(token: string): BecasStatusResponse | null {
  const base: Omit<BecasStatusResponse, 'status' | 'statusLabel' | 'timeline' | 'ventana' | 'carta' | 'siguientePaso'> = {
    folio: 'BECA-JUR-27-000042',
    alumno: { nombre: 'Sofía', inicial: 'G.' },
    campus: { slug: 'juriquilla', siteSlug: 'juriquilla', label: 'Juriquilla' },
    ciclo: FIXTURE_CICLOS.siguiente,
    grado: { key: 'Primaria 3', label: '3º de Primaria' },
    categoria: 'academica',
    beca: {
      pct: 30,
      condiciones: [
        'Aplica sobre la colegiatura mensual pagando del día 1 al 10.',
        'No incluye inscripción ni cuota única.',
        'Se renueva cada ciclo mientras la familia esté al corriente.',
      ],
    },
    asesor: { nombre: 'Equipo CAP Juriquilla' },
  };

  switch (token) {
    case 'mock-pending':
      return {
        ...base,
        status: 'en_revision',
        statusLabel: 'En revisión',
        timeline: [
          { key: 'recibida', label: 'Solicitud recibida', done: true, at: iso(-0.2) },
          { key: 'revision', label: 'En revisión', done: false, dueAt: iso(1) },
          { key: 'aprobada', label: 'Resultado', done: false },
          { key: 'inscripcion', label: 'Inscripción', done: false },
        ],
        ventana: null,
        carta: null,
        siguientePaso: 'Te escribimos el siguiente día hábil. Mientras tanto, tu asesora CAP se pondrá en contacto contigo.',
      };
    case 'mock-approved':
      return {
        ...base,
        status: 'aprobada',
        statusLabel: 'Beca aprobada',
        timeline: [
          { key: 'recibida', label: 'Solicitud recibida', done: true, at: iso(-4) },
          { key: 'revision', label: 'En revisión', done: true, at: iso(-3) },
          { key: 'aprobada', label: 'Beca aprobada', done: true, at: iso(-3) },
          { key: 'inscripcion', label: 'Inscripción', done: false, dueAt: iso(11) },
        ],
        ventana: { venceDia: dayKey(11), venceAt: iso(11), diasRestantes: 11, extendida: false },
        carta: { url: '#carta-demo' },
        siguientePaso: 'Agenda tu visita e inscripción antes de la fecha límite para conservar tu beca.',
      };
    case 'mock-expired':
      return {
        ...base,
        status: 'vencida',
        statusLabel: 'Beca vencida',
        timeline: [
          { key: 'recibida', label: 'Solicitud recibida', done: true, at: iso(-20) },
          { key: 'revision', label: 'En revisión', done: true, at: iso(-19) },
          { key: 'aprobada', label: 'Beca aprobada', done: true, at: iso(-19) },
          { key: 'inscripcion', label: 'Inscripción', done: false, dueAt: iso(-5) },
        ],
        ventana: { venceDia: dayKey(-5), venceAt: iso(-5), diasRestantes: 0, extendida: false },
        carta: null,
        siguientePaso: 'Tu ventana de inscripción terminó. Escríbenos por WhatsApp: tu asesora puede revisar una extensión.',
      };
    default:
      return null;
  }
}

export function fixtureVerify(folio: string): BecasVerifyResponse | null {
  if (folio !== 'BECA-JUR-27-000042') return null;
  return {
    valid: true,
    estado: 'vigente',
    folio,
    alumno: 'Sofía G.',
    categoria: 'academica',
    campus: 'Juriquilla',
    ciclo: FIXTURE_CICLOS.siguiente,
    pct: 30,
    venceDia: dayKey(11),
    emitidaAt: iso(-3),
  };
}
