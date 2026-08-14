import type { Locale } from '@/lib/i18n/types';

/**
 * Shared shapes for the beneficios catalog (public page + admin panel).
 *
 * Spanish is required, English is optional: Marlene writes in Spanish, and an
 * empty English box falls back to the Spanish text rather than rendering a
 * blank card on the /en version.
 */
export type LocalizedText = { es: string; en?: string };

export interface BenefitCategory {
  /** Stable key referenced by partners and the filter UI. Immutable once created. */
  key: string;
  label: LocalizedText;
  /** A key of COLOR in lib/beneficios/colors.ts — never a raw Tailwind token. */
  color: string;
}

export interface BenefitPartner {
  id: string;
  slug: string;
  name: string;
  categoryKey: string;
  /** A /images/... path (committed assets) or an absolute Vercel Blob URL. */
  logo: string | null;
  logoStyle?: 'wordmark' | 'badge';
  discount: LocalizedText;
  detail?: LocalizedText;
  restrictions?: LocalizedText;
  vigencia?: LocalizedText;
  url?: string;
  promoImages?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CatalogData {
  partners: BenefitPartner[];
  categories: BenefitCategory[];
}

/**
 * Resolve localized copy for the active locale, falling back to Spanish.
 *
 * Every read of a LocalizedText must go through this — including
 * `category.label`, which used to be indexed directly and would render blank
 * for a category with no English label.
 */
export const tr = (s: LocalizedText | undefined, locale: Locale): string =>
  (locale === 'en' ? s?.en || s?.es : s?.es) || '';
