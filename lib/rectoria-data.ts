/**
 * Rectoría — the central leadership team that runs NWL Australian School's
 * five campuses as one school. Source: "Organigrama de Rectoría · Estructura
 * Ejecutiva", September 2026.
 *
 * Names are not localized. Titles, bios and area summaries carry {en, es}
 * (same pattern as `campus-data.ts`). Entries marked `needsReview` carry
 * role-based copy only — no sourced personal background — and should be
 * replaced once the school sends a line or two per person.
 *
 * Campus directors are NOT duplicated here: `campusDirectors()` reads them
 * from `campus-data.ts`, so the campus page and this page can never disagree.
 */

import { campuses, localized, type CampusDirector } from './campus-data';

export type LocalizedText = { en: string; es: string };

export interface RectoriaPerson {
  /** ASCII slug; doubles as the portrait filename stem under /images/rectoria/. */
  id: string;
  name: string;
  title: LocalizedText;
  /** Plain register: role, responsibilities, verified background. No adjectives. */
  bio: LocalizedText;
  /** 0–4 sourced credential chips. Only facts we can point to. */
  facts?: LocalizedText[];
  /** '/images/rectoria/<id>.jpg'. Undefined renders an initials monogram. */
  image?: string;
  /** Ids of the lead(s) this person works with. Rendered as "with …". */
  reportsTo?: string[];
  /** Same semantics as CampusData.hideDirector: drop from page + JSON-LD. */
  hidden?: boolean;
  /** Copy is role-based, not sourced. Never rendered. */
  needsReview?: boolean;
}

export interface RectoriaArea {
  id: string;
  name: LocalizedText;
  /** One line: what this area does for NWL. */
  summary: LocalizedText;
  leads: RectoriaPerson[];
  team: RectoriaPerson[];
}

const img = (id: string) => `/images/rectoria/${id}.jpg`;

/* ── Executive office ─────────────────────────────────────────────────── */

export const executive: RectoriaPerson = {
  id: 'rafael-gutierrez',
  name: 'Rafael Alberto Gutiérrez Aladro',
  title: { en: 'Executive Director', es: 'Director Ejecutivo' },
  image: img('rafael-gutierrez'),
  facts: [
    { en: 'Master’s in Marketing · Tec de Monterrey', es: 'Maestría en Mercadotecnia · Tec de Monterrey' },
    { en: '25+ years in consulting and education', es: 'Más de 25 años en consultoría y educación' },
  ],
  bio: {
    en: 'Rafael is Executive Director of NWL Australian School. He is responsible for the school\'s overall direction, its investments and the coordination of the Rectoría areas and the five campus directors. He led the 2026 transition from Colegio Newland to NWL Australian School. He has more than 25 years of experience in consulting and education, including leading a business-school division at university level, and holds a Master\'s in Marketing from Tec de Monterrey.',
    es: 'Rafael es Director Ejecutivo de NWL Australian School. Es responsable de la dirección general de la escuela, de sus inversiones y de la coordinación de las áreas de Rectoría y de los cinco directores de campus. Encabezó la transición de Colegio Newland a NWL Australian School en 2026. Tiene más de 25 años de experiencia en consultoría y educación, que incluyen la dirección de una división de escuela de negocios a nivel universitario, y una Maestría en Mercadotecnia por el Tec de Monterrey.',
  },
};

// REVIEW: role-based copy, no sourced bio
export const executiveAssistant: RectoriaPerson = {
  id: 'rocio-rivera',
  name: 'Ma. Rocío Rivera Guevara',
  title: {
    en: 'Executive Assistant · Executive Office & Rectoría',
    es: 'Asistente de Dirección Ejecutiva y Áreas de Rectoría',
  },
  image: img('rocio-rivera'),
  needsReview: true,
  bio: {
    en: 'Rocío is Executive Assistant to the Executive Director and to the Rectoría areas. She manages the Executive Director\'s agenda, follows up on decisions with the areas and the campuses, and handles the documentation of the executive office.',
    es: 'Rocío es Asistente de la Dirección Ejecutiva y de las áreas de Rectoría. Administra la agenda del Director Ejecutivo, da seguimiento a los acuerdos con las áreas y los campus, y lleva la documentación de la oficina ejecutiva.',
  },
};

/* ── Áreas de Rectoría (in display order) ─────────────────────────────── */

export const areas: RectoriaArea[] = [
  {
    id: 'administracion',
    name: { en: 'Administration', es: 'Administración' },
    summary: {
      en: 'Finance, purchasing, payroll and facilities for five campuses, run as one operation.',
      es: 'Finanzas, compras, nómina e instalaciones de cinco campus, operados como una sola organización.',
    },
    leads: [
      // REVIEW: role-based copy, no sourced bio
      {
        id: 'guillermo-escobedo',
        name: 'Guillermo Escobedo Segovia',
        title: { en: 'Administration', es: 'Administración' },
        image: img('guillermo-escobedo'),
        needsReview: true,
        bio: {
          en: 'Guillermo is responsible for Administration: the school\'s finances, purchasing, suppliers, and the operation and maintenance of the five campuses. His area sets the budgets and controls each campus works under.',
          es: 'Guillermo es responsable de Administración: las finanzas de la escuela, compras, proveedores y la operación y mantenimiento de los cinco campus. Su área define los presupuestos y controles con los que trabaja cada campus.',
        },
      },
      // REVIEW: role-based copy, no sourced bio
      {
        id: 'pilar-diaz',
        name: 'Marlloly Pilar Díaz Soto',
        title: { en: 'Administration', es: 'Administración' },
        image: img('pilar-diaz'),
        needsReview: true,
        bio: {
          en: 'Pilar co-leads Administration and is responsible for accounting and financial control: tuition, collections, payroll and the school\'s financial reporting.',
          es: 'Pilar colidera Administración y es responsable de la contabilidad y el control financiero: colegiaturas, cobranza, nómina y los reportes financieros de la escuela.',
        },
      },
    ],
    team: [
      // REVIEW: role-based copy, no sourced bio
      {
        id: 'itzel-vargas',
        name: 'Itzel Vargas Silva',
        title: { en: 'Administrative & Accounting Analyst', es: 'Analista Administrativo y Contable' },
        image: img('itzel-vargas'),
        reportsTo: ['guillermo-escobedo', 'pilar-diaz'],
        needsReview: true,
        bio: {
          en: 'Itzel is the Administrative and Accounting Analyst. She keeps the school\'s accounting records, bank reconciliations and monthly reports.',
          es: 'Itzel es Analista Administrativa y Contable. Lleva los registros contables, las conciliaciones bancarias y los reportes mensuales de la escuela.',
        },
      },
    ],
  },
  {
    id: 'desarrollo-organizacional',
    name: { en: 'People & Culture', es: 'Desarrollo Organizacional' },
    summary: {
      en: 'People, culture and the way NWL hires, trains and keeps its teachers and staff.',
      es: 'Personas, cultura y la forma en que NWL recluta, forma y retiene a sus docentes y colaboradores.',
    },
    leads: [
      {
        id: 'tannia-liminana',
        name: 'Tannia Limiñana Rubio',
        title: { en: 'People & Culture', es: 'Desarrollo Organizacional' },
        image: img('tannia-liminana'),
        facts: [{ en: 'Previously at Safran Querétaro', es: 'Antes en Safran Querétaro' }],
        bio: {
          en: 'Tannia is responsible for People & Culture: recruitment, onboarding, training and performance management for teachers and staff at all campuses. Before NWL she worked at Safran in Querétaro.',
          es: 'Tannia es responsable de Desarrollo Organizacional: reclutamiento, integración, capacitación y evaluación del desempeño de docentes y colaboradores en todos los campus. Antes de NWL trabajó en Safran, en Querétaro.',
        },
      },
    ],
    team: [],
  },
  {
    id: 'academico-internacional',
    name: { en: 'International Academics', es: 'Académico Internacional' },
    summary: {
      en: 'The academic direction of the Australian model and the English programme across all campuses.',
      es: 'La dirección académica del modelo australiano y del programa de inglés en todos los campus.',
    },
    leads: [
      {
        id: 'robert-van-der-eyken',
        name: 'Robert van der Eyken',
        // Official title per Robert, Sep 2026 (the area keeps the name "International Academics").
        title: { en: 'International Academic Director', es: 'Director Académico Internacional' },
        // Portrait sent Sep 2026. New filename: /images is cached immutable.
        image: '/images/rectoria/robert-van-der-eyken-2026.jpg',
        facts: [
          { en: 'Former Head of School · Hangzhou International School', es: 'Ex Head of School · Hangzhou International School' },
          { en: 'Former Director · Casablanca American School', es: 'Ex Director · Casablanca American School' },
          { en: 'Former Director · American International School of Quito', es: 'Ex Director · American International School of Quito' },
          { en: 'Master of Education', es: 'Maestría en Educación' },
        ],
        bio: {
          en: 'Robert is International Academic Director: he leads the implementation of the Australian curriculum model and the English programme across the five campuses. He was Head of School at Hangzhou International School in China, Director of Casablanca American School in Morocco and Director of the American International School of Quito in Ecuador, and has held school leadership and teaching roles in Mexico, Canada, Namibia and North Macedonia. He holds a Master of Education.',
          es: 'Robert es Director Académico Internacional: dirige la implementación del modelo curricular australiano y del programa de inglés en los cinco campus. Fue Head of School de Hangzhou International School, en China, Director de Casablanca American School, en Marruecos, y Director de American International School of Quito, en Ecuador, y ha ocupado cargos directivos y docentes en escuelas de México, Canadá, Namibia y Macedonia del Norte. Tiene una Maestría en Educación.',
        },
      },
    ],
    team: [
      {
        id: 'david-petroski',
        name: 'David Gideon Petroski',
        title: { en: 'Dean of English', es: 'Dean of English' },
        // Portrait sent by the school, Sep 2026. New filename: /images is cached immutable.
        image: '/images/rectoria/david-petroski-2026.jpg',
        reportsTo: ['robert-van-der-eyken'],
        facts: [
          { en: 'Retired · U.S. Military and Law Enforcement', es: 'Retirado · Fuerzas Armadas y policía de EE. UU.' },
          { en: 'Certified Paramedic · 47+ years', es: 'Paramédico certificado · Más de 47 años' },
          { en: 'Bachelor of Arts in Criminal Justice', es: 'Licenciatura en Justicia Penal' },
        ],
        bio: {
          en: 'David is Dean of English: he runs the English department for the five campuses, from Maternal to Senior School, covering curriculum, teacher support, and the consistency of methods and levels between them. He also works on the school\'s security protocols, and trains and certifies the faculty in first aid and CPR. He is retired from the United States military and from law enforcement, and is a certified paramedic with more than 47 years of experience. He holds a Bachelor of Arts in Criminal Justice.',
          es: 'David es Dean of English: dirige el departamento de inglés de los cinco campus, de Maternal a Preparatoria, con el currículo, el acompañamiento a docentes y la consistencia de métodos y niveles entre ellos. También trabaja en los protocolos de seguridad de la escuela, y capacita y certifica al personal docente en primeros auxilios y RCP. Es militar retirado de Estados Unidos y ex oficial de policía, y paramédico certificado con más de 47 años de experiencia. Tiene una licenciatura en Justicia Penal.',
        },
      },
    ],
  },
  {
    id: 'imagen-comunicacion',
    name: { en: 'Image & Communications', es: 'Imagen y Comunicación' },
    summary: {
      en: 'Communications and events for the five campuses.',
      es: 'Comunicación y eventos de los cinco campus.',
    },
    leads: [
      // REVIEW: role-based copy, no sourced bio
      {
        id: 'marlene-ramirez',
        name: 'Marlene Ramírez Sanabria',
        title: { en: 'Image & Communications', es: 'Imagen y Comunicación' },
        image: img('marlene-ramirez'),
        needsReview: true,
        bio: {
          en: 'Marlene is responsible for Image and Communications: campus communications and the school\'s events.',
          es: 'Marlene es responsable de Imagen y Comunicación: la comunicación de los campus y los eventos de la escuela.',
        },
      },
    ],
    team: [
      // REVIEW: role-based copy, no sourced bio
      {
        id: 'juan-carlos-ricardez',
        name: 'Juan Carlos Ricardez Montaño',
        title: { en: 'Designer', es: 'Diseñador' },
        image: img('juan-carlos-ricardez'),
        reportsTo: ['marlene-ramirez'],
        needsReview: true,
        bio: {
          en: 'Juan Carlos is the school\'s graphic designer. He produces NWL\'s signage, print materials and campus communications.',
          es: 'Juan Carlos es el diseñador gráfico de la escuela. Produce la señalética, los materiales impresos y la comunicación de campus de NWL.',
        },
      },
    ],
  },
  {
    id: 'preparatoria',
    name: { en: 'Senior School', es: 'Preparatoria' },
    summary: {
      en: 'Prepa NWL: the Years 10–12 programme at Corregidora and Zibatá, from Life Project to the dual diploma.',
      es: 'Prepa NWL: los últimos tres años en Corregidora y Zibatá, del Life Project al doble diploma.',
    },
    leads: [
      // REVIEW: role-based copy, no sourced bio
      {
        id: 'martha-lobato',
        name: 'Martha Aide Lobato Artega',
        title: { en: 'Senior School · Prepa NWL', es: 'Preparatoria' },
        image: img('martha-lobato'),
        needsReview: true,
        bio: {
          en: 'Martha is responsible for Senior School (Prepa NWL) at the campuses that offer it. Her area runs the Years 10–12 programme: the Life Project model and its mentors, the dual diploma and university guidance.',
          es: 'Martha es responsable de Preparatoria (Prepa NWL) en los campus que la ofrecen. Su área opera el programa de los tres últimos años: el modelo Life Project y sus mentores, el doble diploma y la orientación universitaria.',
        },
      },
    ],
    team: [],
  },
];

/* ── Helpers ──────────────────────────────────────────────────────────── */

const visible = (p: RectoriaPerson) => !p.hidden;

/** Areas with hidden people removed (an area with no visible lead is dropped). */
export function visibleAreas(): RectoriaArea[] {
  return areas
    .map((a) => ({ ...a, leads: a.leads.filter(visible), team: a.team.filter(visible) }))
    .filter((a) => a.leads.length > 0);
}

/** Every visible Rectoría person, executive office first. */
export function allRectoriaPeople(): RectoriaPerson[] {
  return [executive, executiveAssistant, ...areas.flatMap((a) => [...a.leads, ...a.team])].filter(visible);
}

export function findPerson(id: string): RectoriaPerson | undefined {
  return allRectoriaPeople().find((p) => p.id === id);
}

/** First given name, used for the "with Pilar" labels. */
export function firstName(name: string): string {
  return name.split(/\s+/).filter((w) => !/\.$/.test(w))[0] ?? name;
}

/** Two-letter monogram for the no-photo fallback. */
export function initials(name: string): string {
  const words = name.split(/\s+/).filter((w) => w && !/\.$/.test(w) && /^[A-ZÁÉÍÓÚÑ]/.test(w));
  const first = words[0]?.[0] ?? '';
  const last = words.length > 1 ? words[words.length - 1][0] : '';
  return (first + last).toUpperCase();
}

export interface CampusDirectorRef {
  slug: string;
  campusName: string;
  director: CampusDirector;
}

const DIRECTOR_ORDER = ['juriquilla', 'milenio', 'san-miguel', 'corregidora', 'zibata'];

/** Campus directors in display order, skipping campuses between directors. */
export function campusDirectors(): CampusDirectorRef[] {
  return DIRECTOR_ORDER.map((slug) => campuses[slug])
    .filter((c): c is NonNullable<typeof c> => !!c && !c.hideDirector)
    .map((c) => ({ slug: c.slug, campusName: c.name, director: c.director }));
}

export { localized };
