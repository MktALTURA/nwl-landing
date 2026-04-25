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
      en: 'https://heyzine.com/flip-book/8ec59152c7.html',
      es: 'https://heyzine.com/flip-book/1b72f96149.html',
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
      en: 'https://heyzine.com/flip-book/b8436ea597.html',
      es: 'https://heyzine.com/flip-book/3b141701f4.html',
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
      en: 'https://heyzine.com/flip-book/9490aebaa1.html',
      es: 'https://heyzine.com/flip-book/557c82d5d7.html',
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
      en: 'https://heyzine.com/flip-book/ceb6f14618.html',
      es: 'https://heyzine.com/flip-book/196df415ae.html',
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
