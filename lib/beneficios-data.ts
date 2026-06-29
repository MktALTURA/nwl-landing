import type { Locale } from './i18n/types';

/**
 * Commercial benefits catalog for the NWL community ("Catálogo de Beneficios").
 *
 * This is DISTINCT from the academic/institutional partners shown in
 * components/Partnerships.tsx (Apple, Knotion, Cognia…). These are external
 * businesses that offer exclusive discounts to NWL families and collaborators.
 *
 * Translatable benefit/vigencia copy is stored inline-bilingual here (same
 * approach as getPartners() in Partnerships.tsx); page/section UI copy lives in
 * the i18n `beneficios` block. To add a real logo later, drop the file under
 * /images/logos/benefits/ and set `logo` to its path — until then `logo: null`
 * renders a brand-colored monogram tile.
 */

export type LocalizedString = { es: string; en: string };

export interface BenefitCategory {
  /** Stable key referenced by partners and the filter UI. */
  key: string;
  label: LocalizedString;
  /** Tailwind color token (from tailwind.config.ts) used as the accent. */
  color: string;
}

export interface BenefitPartner {
  slug: string;
  name: string;
  categoryKey: string;
  /** Path under /images/logos/benefits/, or null for a monogram placeholder. */
  logo: string | null;
  /**
   * How to fit the logo in the card band:
   * - 'wordmark' (default): transparent/white-bg logo shown wide via contain.
   * - 'badge': logo with its own colored background, shown as a rounded tile.
   */
  logoStyle?: 'wordmark' | 'badge';
  /** The headline discount — the focal element of the card. */
  discount: LocalizedString;
  /** Optional secondary detail (eligibility tiers, fine print). */
  detail?: LocalizedString;
  /** Conditions / fine print shown as muted small text on the card. */
  restrictions?: LocalizedString;
  /** Validity window, e.g. "Vigencia: octubre". */
  vigencia?: LocalizedString;
  /** Outbound link (partner site, WhatsApp, etc.). */
  url?: string;
  /**
   * Optional promo flyer image (path under /images/benefits/). When set, the
   * card shows a "view flyer" affordance that opens the image in a lightbox.
   */
  promoImage?: string;
}

export const benefitCategories: BenefitCategory[] = [
  { key: 'salud', label: { es: 'Salud y Bienestar', en: 'Health & Wellness' }, color: 'eucalyptus' },
  { key: 'dental', label: { es: 'Dental y Ortopedia', en: 'Dental & Orthopedics' }, color: 'skyblue' },
  { key: 'laboratorio', label: { es: 'Estudios Clínicos', en: 'Clinical Studies' }, color: 'terracotta' },
  { key: 'prevision', label: { es: 'Previsión y Asistencia', en: 'Funeral & Assistance' }, color: 'mustard' },
  { key: 'alimentos', label: { es: 'Alimentos y Bebidas', en: 'Food & Drink' }, color: 'coral' },
];

export const benefitPartners: BenefitPartner[] = [
  {
    slug: 'gestamed',
    name: 'GestaMed Hospital',
    categoryKey: 'salud',
    logo: '/images/logos/benefits/gestamed.png',
    url: 'https://gestamed.mx/',
    discount: { es: 'Consulta desde $800', en: 'Consultations from $800' },
    detail: {
      es: 'Pediatría y especialidades · Atención las 24 horas. Agenda al 442 212 5965.',
      en: 'Pediatrics & specialties · 24-hour care. Book at 442 212 5965.',
    },
    restrictions: {
      es: 'Precio con IVA incluido. Aplican restricciones.',
      en: 'Price includes tax (IVA). Restrictions apply.',
    },
  },
  {
    slug: 'saiens',
    name: 'SAIENS',
    categoryKey: 'laboratorio',
    logo: '/images/logos/benefits/saiens.png',
    url: 'https://saiens.com.mx/',
    discount: { es: '10% de descuento', en: '10% discount' },
    detail: {
      es: 'En estudios clínicos, mencionando que perteneces a la Familia Newland. Toma de muestra a domicilio gratis en todo Querétaro.',
      en: 'On clinical studies — mention you belong to the Newland Family. Free home sample collection across Querétaro.',
    },
    restrictions: {
      es: 'Válido mencionando que perteneces a la Familia Newland al agendar.',
      en: 'Valid when you mention you belong to the Newland Family at booking.',
    },
  },
  {
    slug: 'airapi',
    name: 'Airapí',
    categoryKey: 'prevision',
    logo: '/images/logos/benefits/airapi.jpg',
    url: 'https://airapi.mx/',
    discount: { es: 'Cobertura funeraria gratuita', en: 'Free funeral coverage' },
    detail: {
      es: 'Plan Tributo con valor de $49,000 MXN, sin costo para tu familia. Al activarlo accedes a descuentos exclusivos en otros servicios.',
      en: 'Tribute Plan worth $49,000 MXN at no cost to your family. Activating it unlocks exclusive discounts on other services.',
    },
    restrictions: {
      es: 'Actívala presentando tu INE (lunes a domingo, 9:00–19:00 hrs, sin cita). Cubre al estudiante e incluye descuentos exclusivos sin vencimiento en planes funerarios y nichos para otros familiares.',
      en: 'Activate it by presenting your INE ID (Mon–Sun, 9:00–19:00, no appointment). Covers the student and includes non-expiring exclusive discounts on funeral plans and niches for other family members.',
    },
  },
  {
    slug: 'orthointegra',
    name: 'Orthointegra',
    categoryKey: 'dental',
    logo: '/images/logos/benefits/orthointegra.jpg',
    logoStyle: 'badge',
    url: 'https://www.facebook.com/people/Orthointegra/100063555731675/',
    discount: { es: '10% a 30% de descuento', en: '10%–30% discount' },
    detail: {
      es: 'En tratamientos dentales según el tipo. Alumnos NWL: valoración y consulta inicial gratis · Colaboradores: $200 · Familiares: 10% a 30%.',
      en: 'On dental treatments by type. NWL students: free initial valuation & consultation · Staff: $200 · Family: 10%–30%.',
    },
    restrictions: {
      es: 'El porcentaje de descuento depende del tipo de tratamiento. Válido en sucursales Juriquilla y El Pueblito.',
      en: 'The discount percentage depends on the treatment type. Valid at the Juriquilla and El Pueblito locations.',
    },
  },
  {
    slug: 'tim-hortons',
    name: 'Tim Hortons',
    categoryKey: 'alimentos',
    logo: '/images/logos/benefits/tim-hortons.svg',
    url: 'https://timhortonsmx.com/',
    promoImage: '/images/benefits/tim-hortons-promo.jpg',
    discount: { es: '10% de descuento', en: '10% discount' },
    detail: {
      es: 'Lleva tu antojo al campus con un 10% de descuento presentando tu credencial NWL (alumno o colaborador) en sucursales participantes.',
      en: 'Bring your craving to campus with 10% off when you present your NWL credential (student or staff) at participating locations.',
    },
    restrictions: {
      es: 'Válido presentando tu credencial NWL en sucursales participantes. Aplican restricciones.',
      en: 'Valid when you present your NWL credential at participating locations. Restrictions apply.',
    },
  },
];

/** Resolve a localized string to the active locale. */
export const t = (s: LocalizedString | undefined, locale: Locale): string =>
  s ? s[locale] : '';

/** Category lookup by key (falls back to the first category). */
export const getCategory = (key: string): BenefitCategory =>
  benefitCategories.find((c) => c.key === key) ?? benefitCategories[0];
