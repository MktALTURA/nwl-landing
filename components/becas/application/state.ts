import type { BecaCategoria, NivelCompetencia, SiteCampusSlug } from '@/lib/becas/contract';
import type { PublicCatalog } from '@/lib/becas/catalog';
import { normalizePhoneMX } from '@/lib/phone';

/* ------------------------------------------------------------------ */
/*  Application state: four steps, persisted as a draft.               */
/* ------------------------------------------------------------------ */

export type Step = 1 | 2 | 3 | 4;

export interface UploadItem {
  localId: string;
  kind: 'boleta' | 'evidencia';
  name: string;
  sizeKb: number;
  status: 'compressing' | 'uploading' | 'done' | 'error';
  progress: number;
  docId?: string;
  error?: string;
}

export interface AppState {
  step: Step;
  contact: {
    campus?: SiteCampusSlug;
    ciclo?: string;
    nombre: string;
    apellidos: string;
    email: string;
    telefono: string;
    consent: boolean;
  };
  student: {
    newFamily: 'yes' | 'no' | null;
    nombres: string;
    apPaterno: string;
    apMaterno: string;
    nacimiento: string;
    grado?: string;
    escuela: string;
    gradoActual: string;
    calle: string;
    colonia: string;
    ciudad: string;
    cp: string;
  };
  category: {
    id?: BecaCategoria;
    promedio: string;
    deporte: string;
    nivelCompetencia?: NivelCompetencia;
    anioCompetencia: string;
    disciplina: string;
    anosFormacion: string;
    presentacionPublica: boolean | null;
    evidenciaUrl: string;
    cartaMotivos: string;
    referidoPor: string;
    referidoCodigo: string;
  };
  uploads: UploadItem[];
  /** Fields the family edited by hand (so calculator changes stop overriding them). */
  touched: Partial<Record<'campus' | 'ciclo' | 'grado' | 'categoria', boolean>>;
  idempotencyKey: string;
  token?: string;
  leadEventId: string;
  leadFired: boolean;
  submitted?: { folio: string; statusUrl: string; token: string };
  request: { status: 'idle' | 'pending' | 'error'; stage?: 'start' | 'submit'; code?: string; fields?: Record<string, string> };
}

export function initialState(idempotencyKey: string, leadEventId: string): AppState {
  return {
    step: 1,
    contact: { nombre: '', apellidos: '', email: '', telefono: '', consent: false },
    student: {
      newFamily: null,
      nombres: '',
      apPaterno: '',
      apMaterno: '',
      nacimiento: '',
      escuela: '',
      gradoActual: '',
      calle: '',
      colonia: '',
      ciudad: '',
      cp: '',
    },
    category: {
      promedio: '',
      deporte: '',
      anioCompetencia: '',
      disciplina: '',
      anosFormacion: '',
      presentacionPublica: null,
      evidenciaUrl: '',
      cartaMotivos: '',
      referidoPor: '',
      referidoCodigo: '',
    },
    uploads: [],
    touched: {},
    idempotencyKey,
    leadEventId,
    leadFired: false,
    request: { status: 'idle' },
  };
}

export type Action =
  | { type: 'hydrate'; state: Partial<AppState> }
  | { type: 'contact'; patch: Partial<AppState['contact']>; touched?: 'campus' | 'ciclo' }
  | { type: 'student'; patch: Partial<AppState['student']>; touched?: 'grado' }
  | { type: 'category'; patch: Partial<AppState['category']>; touched?: 'categoria' }
  | { type: 'prefill'; contact?: Partial<AppState['contact']>; student?: Partial<AppState['student']>; categoria?: BecaCategoria }
  | { type: 'step'; step: Step }
  | { type: 'upload.add'; item: UploadItem }
  | { type: 'upload.update'; localId: string; patch: Partial<UploadItem> }
  | { type: 'upload.remove'; localId: string }
  | { type: 'request'; request: AppState['request'] }
  | { type: 'started'; token: string }
  | { type: 'leadFired' }
  | { type: 'submitted'; folio: string; statusUrl: string; token: string }
  | { type: 'reset'; idempotencyKey: string; leadEventId: string };

export function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'hydrate':
      return { ...state, ...action.state, request: { status: 'idle' } };
    case 'contact':
      return {
        ...state,
        contact: { ...state.contact, ...action.patch },
        touched: action.touched ? { ...state.touched, [action.touched]: true } : state.touched,
      };
    case 'student':
      return {
        ...state,
        student: { ...state.student, ...action.patch },
        touched: action.touched ? { ...state.touched, [action.touched]: true } : state.touched,
      };
    case 'category':
      return {
        ...state,
        category: { ...state.category, ...action.patch },
        touched: action.touched ? { ...state.touched, [action.touched]: true } : state.touched,
      };
    case 'prefill': {
      const contact = { ...state.contact };
      if (action.contact?.campus && !state.touched.campus) contact.campus = action.contact.campus;
      if (action.contact?.ciclo && !state.touched.ciclo) contact.ciclo = action.contact.ciclo;
      const student = { ...state.student };
      if (action.student?.grado && !state.touched.grado) student.grado = action.student.grado;
      const category = { ...state.category };
      if (action.categoria && !state.touched.categoria) category.id = action.categoria;
      return { ...state, contact, student, category };
    }
    case 'step':
      return { ...state, step: action.step, request: { status: 'idle' } };
    case 'upload.add':
      return { ...state, uploads: [...state.uploads, action.item] };
    case 'upload.update':
      return { ...state, uploads: state.uploads.map((u) => (u.localId === action.localId ? { ...u, ...action.patch } : u)) };
    case 'upload.remove':
      return { ...state, uploads: state.uploads.filter((u) => u.localId !== action.localId) };
    case 'request':
      return { ...state, request: action.request };
    case 'started':
      return { ...state, token: action.token };
    case 'leadFired':
      return { ...state, leadFired: true };
    case 'submitted':
      return { ...state, submitted: { folio: action.folio, statusUrl: action.statusUrl, token: action.token }, request: { status: 'idle' } };
    case 'reset':
      return initialState(action.idempotencyKey, action.leadEventId);
  }
}

/* ───────────────────────────── validation ───────────────────────────── */

export type Errors = Record<string, string>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateStep1(s: AppState['contact']): Errors {
  const e: Errors = {};
  if (!s.campus) e.campus = 'required';
  if (!s.ciclo) e.ciclo = 'required';
  if (s.nombre.trim().length < 2) e.nombre = 'required';
  if (s.apellidos.trim().length < 2) e.apellidos = 'required';
  if (!EMAIL_RE.test(s.email.trim())) e.email = 'email';
  if (!normalizePhoneMX(s.telefono)) e.telefono = 'phone';
  if (!s.consent) e.consent = 'consent';
  return e;
}

export function validateStep2(s: AppState['student']): Errors {
  const e: Errors = {};
  if (s.newFamily === null) e.newFamily = 'newFamily';
  else if (s.newFamily === 'no') e.newFamily = 'newFamilyNo';
  if (s.nombres.trim().length < 2) e.alumnoNombres = 'required';
  if (s.apPaterno.trim().length < 2) e.alumnoApPaterno = 'required';
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s.nacimiento) || Number.isNaN(Date.parse(s.nacimiento))) e.nacimiento = 'date';
  else {
    const y = Number(s.nacimiento.slice(0, 4));
    const now = new Date().getFullYear();
    if (y < now - 25 || y > now) e.nacimiento = 'date';
  }
  if (!s.grado) e.grado = 'required';
  if (s.calle.trim().length < 3) e.calle = 'required';
  if (s.colonia.trim().length < 2) e.colonia = 'required';
  if (s.ciudad.trim().length < 2) e.ciudad = 'required';
  if (!/^\d{5}$/.test(s.cp.trim())) e.cp = 'cp';
  return e;
}

export function validateStep3(
  c: AppState['category'],
  uploads: UploadItem[],
  catalog: PublicCatalog | null,
): Errors {
  const e: Errors = {};
  if (!c.id) {
    e.categoria = 'categoria';
    return e;
  }
  const cfg = catalog?.categorias.find((x) => x.key === c.id);
  const doneOf = (kind: 'boleta' | 'evidencia') => uploads.some((u) => u.kind === kind && u.status === 'done');
  const hasLink = /^https:\/\/\S+$/.test(c.evidenciaUrl.trim());
  if (c.evidenciaUrl.trim() && !hasLink) e.evidenciaUrl = 'url';
  const thisYear = new Date().getFullYear();

  switch (c.id) {
    case 'academica': {
      const p = Number(c.promedio.replace(',', '.'));
      if (!c.promedio.trim() || Number.isNaN(p) || p < 5 || p > 10) e.promedio = 'promedio';
      else if (p < (cfg?.promedioMinimo ?? 8.5)) e.promedio = 'promedioLow';
      if (!doneOf('boleta')) e.boleta = 'boleta';
      break;
    }
    case 'deportiva': {
      if (!c.deporte.trim()) e.deporte = 'required';
      if (!c.nivelCompetencia) e.nivelCompetencia = 'required';
      const y = Number(c.anioCompetencia);
      if (!c.anioCompetencia.trim() || Number.isNaN(y)) e.anioCompetencia = 'required';
      else if (y < thisYear - 2 || y > thisYear) e.anioCompetencia = 'year';
      if (!doneOf('evidencia') && !hasLink) e.evidencia = 'evidence';
      break;
    }
    case 'cultural': {
      if (!c.disciplina.trim()) e.disciplina = 'required';
      if (!c.anosFormacion.trim() || Number.isNaN(Number(c.anosFormacion))) e.anosFormacion = 'required';
      if (c.presentacionPublica === null) e.presentacionPublica = 'required';
      if (!doneOf('evidencia') && !hasLink) e.evidencia = 'evidence';
      break;
    }
    case 'espiritu': {
      const min = cfg?.cartaMinChars ?? 400;
      const max = cfg?.cartaMaxChars ?? 3000;
      const len = c.cartaMotivos.trim().length;
      if (len < min) e.cartaMotivos = 'carta';
      else if (len > max) e.cartaMotivos = 'cartaLong';
      break;
    }
  }
  return e;
}

/** Which evidence block the category needs. */
export function evidenceKind(id?: BecaCategoria): 'boleta' | 'evidencia' | null {
  if (id === 'academica') return 'boleta';
  if (id === 'deportiva' || id === 'cultural') return 'evidencia';
  return null;
}
