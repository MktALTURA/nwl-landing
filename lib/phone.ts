/**
 * Mexican phone normalisation.
 *
 * Families type 10 digits ("442 123 4567"). Meta's CAPI and GHL want E.164
 * digits with the country code ("5214421234567" / "+524421234567"). Mexico
 * dropped the mobile "1" prefix in 2019, but WhatsApp still uses it, so both
 * forms are accepted and reduced to the same canonical value.
 *
 * Returns digits only, no "+", or null when it is not a plausible MX number.
 */
export function normalizePhoneMX(raw: string): string | null {
  const d = (raw || '').replace(/\D+/g, '');
  if (!d) return null;
  if (d.length === 10) return `52${d}`;
  if (d.length === 12 && d.startsWith('52')) return d;
  if (d.length === 13 && d.startsWith('521')) return `52${d.slice(3)}`;
  return null;
}

/** 10 national digits for display / GHL "tel-national". */
export function nationalDigitsMX(raw: string): string | null {
  const n = normalizePhoneMX(raw);
  return n ? n.slice(2) : null;
}

/** WhatsApp wants the legacy "521" form. */
export function whatsappDigitsMX(raw: string): string | null {
  const n = normalizePhoneMX(raw);
  return n ? `521${n.slice(2)}` : null;
}
