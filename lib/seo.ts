/** Centralized SEO constants used across metadata, sitemap, JSON-LD, etc. */

export const SITE_URL = 'https://www.nwl.com.mx';
export const SITE_NAME = 'NWL Australian School';
export const SITE_NAME_ES = 'NWL Australian School';
/** Registered legal entity name (distinct from the public brand names above). */
export const SITE_LEGAL_NAME = 'Colegio NWL';

/**
 * Freshness signal for JSON-LD `dateModified`. Bump deliberately when content
 * is meaningfully revised — do not derive from filesystem mtimes (Vercel
 * resets them on every build, which would falsely reset the signal).
 */
export const SITE_LAST_UPDATED = '2026-07-15';

/** Default OG image used as fallback when a page-specific image isn't set */
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/og/nwl/home.jpg`;

/** Per-page SEO data — English metadata (server-rendered default for crawlers) */
export const PAGE_SEO = {
  home: {
    title: 'The Australian way of learning — NWL Australian School',
    description:
      'NWL Australian School — bilingual private school in Querétaro & San Miguel de Allende on the Australian school model. Maternal through High School, English immersion, project-based learning. 5 campuses.',
    ogImage: '/images/og/nwl/home.jpg',
  },
  modelo: {
    title: 'The NWL Educational Model | Modelo Educativo Australiano',
    description:
      'Inside the NWL Australian School educational model: 7 components and 21 capabilities around one student experience. Wellbeing with rigor, English immersion, Knotion projects, STEM and a global pathway. The Australian way of learning in Querétaro.',
    ogImage: '/images/og/nwl/home.jpg',
  },
  maternal: {
    title: 'Maternal Program (Ages 2–3)',
    description:
      'The Australian way of learning begins at age 2: play-based English immersion, Brain Up neuroscience methodology, and a warm, protective community. 5 campuses in Querétaro & San Miguel.',
    ogImage: '/images/og/nwl/maternal.jpg',
  },
  kinder: {
    title: 'Kinder Program (Ages 3–5)',
    description:
      'Bilingual kindergarten on the Australian school model: English immersion, Knotion project-based learning, and a multisensory approach. No traditional homework. Querétaro & San Miguel de Allende.',
    ogImage: '/images/og/nwl/kinder.jpg',
  },
  elementary: {
    title: 'Elementary School (Ages 6–11)',
    description:
      'Bilingual elementary where English immersion is the engine: STEAM maker labs, Philosophy for Children, and no homework. International certifications. Querétaro & San Miguel de Allende.',
    ogImage: '/images/og/nwl/elementary.jpg',
  },
  middleSchool: {
    title: 'Middle School (Ages 12–15)',
    description:
      'Bilingual middle school balancing wellbeing with academic rigor: dual international certifications, entrepreneurship, and critical thinking at the core. Querétaro & San Miguel de Allende.',
    ogImage: '/images/og/nwl/middle-school.jpg',
  },
  highSchool: {
    title: 'High School — Prepa NWL (Ages 15–17)',
    description:
      'Life Project high school, always forward: Hokku double diploma, Cognia accreditation, financial intelligence, and real-world certifications. Corregidora & Zibatá campuses, Querétaro.',
    ogImage: '/images/og/nwl/high-school.jpg',
  },
  careers: {
    title: 'Work with Us — Trabaja con Nosotros',
    description:
      'Join the NWL Australian School team. Explore open teaching and administrative positions across our 5 campuses in Querétaro and San Miguel de Allende.',
    ogImage: '/images/og/careers.jpg',
  },
  padres: {
    title: 'Parents Portal — Portal de Padres',
    description:
      'Access school calendars, cafeteria menus, announcements, and supply lists for NWL Australian School. Portal de padres de NWL Australian School.',
    ogImage: '/images/og/nwl/home.jpg',
  },
  noticias: {
    title: 'Noticias — NWL Australian School',
    description:
      'Actualizaciones oficiales de NWL Australian School: metodología, alianzas, campus y comunidad. News and updates from NWL Australian School.',
    ogImage: '/images/levels/kinder/kinder-digital-learning.jpg',
  },
  beneficios: {
    title: 'Beneficios y Convenios — Comunidad NWL',
    description:
      'Beneficios y descuentos exclusivos para la comunidad NWL: salud, estudios clínicos, dental y más. Aliados que reconocen a las familias y colaboradores de Colegio NWL.',
    ogImage: '/images/og/nwl/home.jpg',
  },
  nwlAustralianSchool: {
    title: 'Newland es ahora NWL Australian School',
    description:
      'Colegio Newland evoluciona a NWL Australian School: la misma comunidad de 5 campus en Querétaro y San Miguel de Allende, ahora con un modelo educativo australiano que equilibra bienestar y excelencia académica.',
    ogImage: '/images/og/nwl/home.jpg',
  },
  newlandKnotion: {
    title: 'Knotion en Newland: introducción gradual en Kinder y descuentos en 3 campus',
    description:
      'Colegio Newland actualiza su metodología Knotion: introducción gradual en Kinder con Knotion Sense y descuentos exclusivos en los campus Milenio, San Miguel y Corregidora. En Maternal el aprendizaje continúa sin pantallas.',
    ogImage: '/images/levels/kinder/kinder-digital-learning.jpg',
  },
} as const;
