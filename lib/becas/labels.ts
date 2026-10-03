/**
 * The two strings site-wide components need from the becas page. Kept apart
 * from lib/becas/copy.ts so the full dictionary never ships in the shared
 * bundle (FixedCTAButton is on every route).
 */
export const BECAS_CTA_LABEL: Record<'es' | 'en', string> = {
  es: 'Solicita tu beca',
  en: 'Apply now',
};
