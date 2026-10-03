/**
 * Becas API contract — shared between the NWL public site (face) and the
 * ALTURA worker (brain, altura-landing). This file must stay import-free so
 * the same copy can live in both repos verbatim.
 *
 * Transport: JSON over HTTPS, server-to-server, HMAC-signed.
 *   X-Becas-Timestamp: <epoch ms>
 *   X-Becas-Signature: hex(HMAC-SHA256(secret, `${ts}.${METHOD}.${pathname+search}.${sha256hex(rawBody)}`))
 *   Skew tolerance ±5 minutes. GET bodies hash the empty string.
 */

export type BecasVariant = 'precios' | 'ahorro';

export type BecaCategoria = 'deportiva' | 'academica' | 'cultural' | 'espiritu';
export const BECA_CATEGORIAS: readonly BecaCategoria[] = ['deportiva', 'academica', 'cultural', 'espiritu'];

/** Worker-canonical campus slugs (the hoja system's). Zibatá never participates. */
export type WorkerCampusSlug = 'juriquilla' | 'milenio' | 'corregidora' | 'sma';
/** The public site's slugs (routes, campus-data). */
export type SiteCampusSlug = 'juriquilla' | 'milenio' | 'corregidora' | 'san-miguel';

export const CAMPUS_SITE_SLUG: Record<WorkerCampusSlug, SiteCampusSlug> = {
  juriquilla: 'juriquilla',
  milenio: 'milenio',
  corregidora: 'corregidora',
  sma: 'san-miguel',
};
export const CAMPUS_WORKER_SLUG: Record<SiteCampusSlug, WorkerCampusSlug> = {
  juriquilla: 'juriquilla',
  milenio: 'milenio',
  corregidora: 'corregidora',
  'san-miguel': 'sma',
};

export type Nivel = 'Maternal' | 'Kinder' | 'Primaria' | 'Secundaria' | 'Prepa';

/* ────────────────────────── GET /catalog ────────────────────────── */

export interface BecasQuoteLista {
  inscripcion: number;
  cuotaUnica: number;
  costoPerfil: number;
  colegiaturaBase: number;
  colegiaturaProntoPago: number;
  pagoAnual: number;
}

export interface BecasQuoteBeca {
  referidos: number;
  pct: number;
  colegiatura1a10: number;
  colegiatura11a20: number;
  colegiaturaDesde21: number;
  pagoAnual: number;
  ahorroMensualVsLista: number;
  ahorroMensualVsProntoPago: number;
  ahorroCicloVsLista: number;
}

export interface BecasGrado {
  /** GHL picklist string, sent back verbatim ("Primaria 3"). */
  key: string;
  label: string;
  nivel: Nivel;
  categorias: BecaCategoria[];
  /** Present only when variant === 'precios'. */
  quote?: { lista: BecasQuoteLista; beca: BecasQuoteBeca[] };
}

export type BecasCupo = { visible: false } | { visible: true; total: number; restante: number };

export interface BecasCampusCiclo {
  cupo: BecasCupo;
  /** Set when this ciclo has no published list and prices come from the previous one. */
  referencia: { ciclo: string; ajusteEstimado: string } | null;
  grados: BecasGrado[];
}

export interface BecasCampus {
  slug: WorkerCampusSlug;
  siteSlug: SiteCampusSlug;
  label: string;
  ciclos: Record<string, BecasCampusCiclo>;
}

export interface BecasCategoriaConfig {
  key: BecaCategoria;
  enabled: boolean;
  evidencia: 'boleta' | 'archivo_o_liga' | 'carta';
  niveles?: Nivel[];
  promedioMinimo?: number;
  cartaMinChars?: number;
  cartaMaxChars?: number;
}

export interface BecasPrograma {
  becaPct: number;
  aplicaA: 'colegiatura';
  diasPago: string;
  prontoPagoPct: number;
  compatibleProntoPago: boolean;
  ventanaDias: number;
  referidoPct: number;
  referidoMax: number;
  pagosPorCiclo: number;
  entidadAval: string | null;
  /** Only in the 'ahorro' variant: percentages without pesos. */
  ahorro?: { referidos: number; pctBeca: number; pctVsProntoPago: number }[];
}

export interface BecasCatalog {
  open: boolean;
  generatedAt: string;
  consentVersion: string;
  variant: BecasVariant;
  programa: BecasPrograma;
  categorias: BecasCategoriaConfig[];
  uploads: { maxBytes: number; maxPorTipo: number; mime: string[] };
  ciclos: { key: string; tipo: 'actual' | 'siguiente' }[];
  campuses: BecasCampus[];
}

/* ─────────────────────── POST /applications ─────────────────────── */

export interface BecasAttribution {
  utm?: Record<string, string | undefined>;
  ft_utm?: Record<string, string | undefined>;
  clickIds?: Record<string, string | undefined>;
  landing_page?: string;
  ft_landing_page?: string;
  fbclid?: string;
  fbclidTs?: number;
  source_path?: string;
}

export interface BecasPadre {
  nombre: string;
  apellidos: string;
  email: string;
  /** E.164 without "+", e.g. "5214421234567". */
  telefono: string;
}

export interface BecasDomicilio {
  calle: string;
  colonia: string;
  ciudad: string;
  cp: string;
}

export interface BecasStartRequest {
  idempotencyKey: string;
  campus: WorkerCampusSlug | SiteCampusSlug;
  ciclo: string;
  grado?: string;
  padre: BecasPadre;
  consent: { version: string };
  referido?: { por?: string; codigo?: string };
  attribution?: BecasAttribution;
  fromToken?: string;
  client: { ip: string; ua: string };
  /** Meta dedup id minted in the browser, stored for the server-side Lead. */
  eventId?: string;
}

export interface BecasStartResponse {
  token: string;
  status: 'iniciada';
  contactId: string | null;
  contactRecognized: boolean;
  prefill?: { padre: BecasPadre };
}

/* ────────────────── POST /applications/{token}/documents ────────────────── */

export type BecaDocKind = 'boleta' | 'evidencia';

export interface BecasDocumentRequest {
  kind: BecaDocKind;
  filename: string;
  contentType: string;
  size: number;
}

export interface BecasDocumentTicket {
  docId: string;
  uploadUrl: string;
  method: 'PUT';
  headers: Record<string, string>;
  expiresAt: string;
  maxBytes: number;
}

/* ──────────────────── POST /applications/{token}/submit ──────────────────── */

export type NivelCompetencia = 'estatal' | 'regional' | 'nacional' | 'internacional';

export interface BecasDeclarado {
  promedio?: number;
  nivelCompetencia?: NivelCompetencia;
  anioCompetencia?: number;
  deporte?: string;
  disciplina?: string;
  anosFormacion?: number;
  presentacionPublica?: boolean;
  evidenciaUrl?: string;
  cartaMotivos?: string;
}

export interface BecasSubmitRequest {
  campus: WorkerCampusSlug | SiteCampusSlug;
  ciclo: string;
  grado: string;
  categoria: BecaCategoria;
  alumno: {
    nombres: string;
    apPaterno: string;
    apMaterno?: string;
    nacimiento: string; // YYYY-MM-DD
    curp?: string | null;
    gradoActual?: string;
    escuelaProcedencia?: string;
  };
  padre: BecasPadre & { domicilio: BecasDomicilio };
  declarado: BecasDeclarado;
  consent: { version: string; aceptado: true };
  referido?: { por?: string; codigo?: string };
  client: { ip: string; ua: string };
}

export interface BecasSubmitResponse {
  token: string;
  folio: string;
  status: 'en_revision';
  statusUrl: string;
}

/* ───────────────────────── GET /status/{token} ───────────────────────── */

export type BecaPublicStatus =
  | 'en_revision'
  | 'lista_espera'
  | 'aprobada'
  | 'inscrita'
  | 'vencida'
  | 'no_aprobada'
  | 'cancelada';

export interface BecasStatusResponse {
  folio: string;
  status: BecaPublicStatus;
  statusLabel: string;
  alumno: { nombre: string; inicial: string };
  campus: { slug: WorkerCampusSlug; siteSlug: SiteCampusSlug; label: string };
  ciclo: string;
  grado: { key: string; label: string };
  categoria: BecaCategoria;
  timeline: { key: string; label: string; done: boolean; at?: string; dueAt?: string }[];
  ventana: { venceDia: string; venceAt: string; diasRestantes: number; extendida: boolean } | null;
  beca: { pct: number; condiciones: string[] };
  carta: { url: string } | null;
  asesor: { nombre: string } | null;
  siguientePaso: string;
}

/* ───────────────────────── GET /verify/{folio} ───────────────────────── */

export interface BecasVerifyResponse {
  valid: boolean;
  estado: 'vigente' | 'confirmada' | 'vencida' | 'no_vigente';
  folio: string;
  alumno: string;
  categoria: BecaCategoria;
  campus: string;
  ciclo: string;
  pct: number;
  venceDia: string | null;
  emitidaAt: string;
}

/* ──────────────────────────── Errors ──────────────────────────── */

export type BecasErrorCode =
  | 'bad_json'
  | 'firma_invalida'
  | 'firma_expirada'
  | 'no_encontrada'
  | 'programa_cerrado'
  | 'estado_invalido'
  | 'archivo_grande'
  | 'tipo_no_permitido'
  | 'validacion'
  | 'limite'
  | 'becas_no_configurado'
  | 'hojas_db_unavailable';

export interface BecasErrorBody {
  error: BecasErrorCode;
  detail: string;
  fields?: Record<string, string>;
}
