/** Centralized SEO constants used across metadata, sitemap, JSON-LD, etc. */

export const SITE_URL = 'https://www.nwl.com.mx';
export const SITE_NAME = 'Newland School';
export const SITE_NAME_ES = 'Colegio Newland';
/** Registered legal entity name (distinct from the public brand names above). */
export const SITE_LEGAL_NAME = 'Colegio NWL';

/**
 * Freshness signal for JSON-LD `dateModified`. Bump deliberately when content
 * is meaningfully revised — do not derive from filesystem mtimes (Vercel
 * resets them on every build, which would falsely reset the signal).
 */
export const SITE_LAST_UPDATED = '2026-05-15';

/** Default OG image used as fallback when a page-specific image isn't set */
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/og/home.jpg`;

/** Per-page SEO data — English metadata (server-rendered default for crawlers) */
export const PAGE_SEO = {
  home: {
    title: 'At Newland, we unlock greatness',
    description:
      'Bilingual private school in Querétaro & San Miguel de Allende. Maternal through High School. English immersion, no homework, project-based learning. 5 campuses.',
    ogImage: '/images/og/home.jpg',
  },
  maternal: {
    title: 'Maternal Program (Ages 2–3)',
    description:
      'Early childhood bilingual program for ages 2–3. Play-based English immersion, Brain Up methodology, nurturing environment. 5 campuses in Querétaro & San Miguel.',
    ogImage: '/images/og/maternal.jpg',
  },
  kinder: {
    title: 'Kinder Program (Ages 3–5)',
    description:
      'Bilingual kindergarten with English immersion, project-based learning, and multisensory approach. No traditional homework. Querétaro & San Miguel de Allende.',
    ogImage: '/images/og/kinder.jpg',
  },
  elementary: {
    title: 'Elementary School (Ages 6–11)',
    description:
      'Bilingual elementary with IMPACT model, STEAM maker labs, philosophy program, and no homework. International certifications. Querétaro & San Miguel de Allende.',
    ogImage: '/images/og/elementary.jpg',
  },
  middleSchool: {
    title: 'Middle School (Ages 12–15)',
    description:
      'Bilingual middle school with dual international certifications, entrepreneurship program, and critical thinking focus. Querétaro & San Miguel de Allende.',
    ogImage: '/images/og/middle-school.jpg',
  },
  highSchool: {
    title: 'High School — Prepa NWL (Ages 15–17)',
    description:
      'Life Project model high school: financial intelligence, real-world certifications, zero homework, AI & modern technology. Querétaro & San Miguel de Allende.',
    ogImage: '/images/og/high-school.jpg',
  },
  careers: {
    title: 'Work with Us — Trabaja con Nosotros',
    description:
      'Join the Newland School team. Explore open teaching and administrative positions across our 5 campuses in Querétaro and San Miguel de Allende.',
    ogImage: '/images/og/careers.jpg',
  },
  padres: {
    title: 'Parents Portal — Portal de Padres',
    description:
      'Access school calendars, cafeteria menus, announcements, and supply lists for Newland School. Portal de padres de Colegio Newland.',
    ogImage: '/images/og/home.jpg',
  },
  noticias: {
    title: 'Noticias — Newland School',
    description:
      'Actualizaciones oficiales de Colegio Newland: metodología, alianzas, campus y comunidad. News and updates from Newland School.',
    ogImage: '/images/levels/kinder/kinder-digital-learning.jpg',
  },
  beneficios: {
    title: 'Beneficios y Convenios — Comunidad Newland',
    description:
      'Beneficios y descuentos exclusivos para la comunidad Newland: salud, estudios clínicos, dental y más. Aliados que reconocen a las familias y colaboradores de Colegio NWL.',
    ogImage: '/images/og/home.jpg',
  },
  newlandKnotion: {
    title: 'Knotion en Newland: introducción gradual en Kinder y descuentos en 3 campus',
    description:
      'Colegio Newland actualiza su metodología Knotion: introducción gradual en Kinder con Knotion Sense y descuentos exclusivos en los campus Milenio, San Miguel y Corregidora. En Maternal el aprendizaje continúa sin pantallas.',
    ogImage: '/images/levels/kinder/kinder-digital-learning.jpg',
  },
} as const;
