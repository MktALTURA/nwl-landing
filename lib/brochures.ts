import type { Locale } from './i18n/types';

export type BrochureLevel = 'maternal-kinder' | 'primaria' | 'secundaria' | 'preparatoria';

export interface BrochureConfig {
  level: BrochureLevel;
  heyzineUrl: Record<Locale, string>;
  pdfDownloadUrl: Record<Locale, string>;
  labelKey: string; // i18n key for dropdown display name
}

export const brochures: Record<BrochureLevel, BrochureConfig> = {
  'maternal-kinder': {
    level: 'maternal-kinder',
    heyzineUrl: {
      en: 'https://heyzine.com/flip-book/f8d7ebdd9e.html',
      es: 'https://heyzine.com/flip-book/f8d7ebdd9e.html',
    },
    pdfDownloadUrl: {
      en: '/brochures/en/maternal-kinder.pdf',
      es: '/brochures/es/maternal-kinder.pdf',
    },
    labelKey: 'maternalKinder',
  },
  primaria: {
    level: 'primaria',
    heyzineUrl: {
      en: 'https://heyzine.com/flip-book/f8d7ebdd9e.html',
      es: 'https://heyzine.com/flip-book/f8d7ebdd9e.html',
    },
    pdfDownloadUrl: {
      en: '/brochures/en/primaria.pdf',
      es: '/brochures/es/primaria.pdf',
    },
    labelKey: 'primaria',
  },
  secundaria: {
    level: 'secundaria',
    heyzineUrl: {
      en: 'https://heyzine.com/flip-book/f8d7ebdd9e.html',
      es: 'https://heyzine.com/flip-book/f8d7ebdd9e.html',
    },
    pdfDownloadUrl: {
      en: '/brochures/en/secundaria.pdf',
      es: '/brochures/es/secundaria.pdf',
    },
    labelKey: 'secundaria',
  },
  preparatoria: {
    level: 'preparatoria',
    heyzineUrl: {
      en: 'https://heyzine.com/flip-book/f8d7ebdd9e.html',
      es: 'https://heyzine.com/flip-book/f8d7ebdd9e.html',
    },
    pdfDownloadUrl: {
      en: '/brochures/en/preparatoria.pdf',
      es: '/brochures/es/preparatoria.pdf',
    },
    labelKey: 'preparatoria',
  },
};

// Ordered array for dropdown rendering
export const brochureLevels: BrochureLevel[] = [
  'maternal-kinder', 'primaria', 'secundaria', 'preparatoria',
];
