import type { Locale } from './i18n/types';

export type BrochureLevel = 'maternal-kinder' | 'elementary' | 'middle-school' | 'high-school';

export interface BrochureConfig {
  level: BrochureLevel;
  slug: string; // URL path segment (same as level key)
  heyzineUrl: Record<Locale, string>;
  pdfDownloadUrl: Record<Locale, string>;
  labelKey: string; // i18n key for dropdown/modal display name
}

export const brochures: Record<BrochureLevel, BrochureConfig> = {
  'maternal-kinder': {
    level: 'maternal-kinder',
    slug: 'maternal-kinder',
    heyzineUrl: {
      en: 'https://heyzine.com/flip-book/5585f5f64b.html',
      es: 'https://heyzine.com/flip-book/fd295b9662.html',
    },
    pdfDownloadUrl: {
      en: '/brochures/en/maternal-kinder.pdf',
      es: '/brochures/es/maternal-kinder.pdf',
    },
    labelKey: 'maternalKinder',
  },
  elementary: {
    level: 'elementary',
    slug: 'elementary',
    heyzineUrl: {
      en: 'https://heyzine.com/flip-book/f8d7ebdd9e.html',
      es: 'https://heyzine.com/flip-book/f8d7ebdd9e.html',
    },
    pdfDownloadUrl: {
      en: '/brochures/en/elementary.pdf',
      es: '/brochures/es/elementary.pdf',
    },
    labelKey: 'primaria',
  },
  'middle-school': {
    level: 'middle-school',
    slug: 'middle-school',
    heyzineUrl: {
      en: 'https://heyzine.com/flip-book/f8d7ebdd9e.html',
      es: 'https://heyzine.com/flip-book/f8d7ebdd9e.html',
    },
    pdfDownloadUrl: {
      en: '/brochures/en/middle-school.pdf',
      es: '/brochures/es/middle-school.pdf',
    },
    labelKey: 'secundaria',
  },
  'high-school': {
    level: 'high-school',
    slug: 'high-school',
    heyzineUrl: {
      en: 'https://heyzine.com/flip-book/f8d7ebdd9e.html',
      es: 'https://heyzine.com/flip-book/f8d7ebdd9e.html',
    },
    pdfDownloadUrl: {
      en: '/brochures/en/high-school.pdf',
      es: '/brochures/es/high-school.pdf',
    },
    labelKey: 'preparatoria',
  },
};

// Ordered array for dropdown rendering
export const brochureLevels: BrochureLevel[] = [
  'maternal-kinder', 'elementary', 'middle-school', 'high-school',
];
