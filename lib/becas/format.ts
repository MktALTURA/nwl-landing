/** Money and dates for the becas page. es-MX, America/Mexico_City, no decimals for pesos. */

const mxn = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
  maximumFractionDigits: 0,
});

export function formatMXN(n: number): string {
  // "$9,100" — Intl gives "$9,100.00" with 2 digits, so we fix at 0.
  return mxn.format(Math.round(n));
}

export function formatPct(n: number): string {
  return `${Math.round(n)}%`;
}

export function formatDayKey(dayKey: string, locale: 'es' | 'en' = 'es'): string {
  // dayKey is YYYY-MM-DD in CDMX; render as a local calendar date without TZ drift.
  const [y, m, d] = dayKey.split('-').map(Number);
  const date = new Date(Date.UTC(y, (m || 1) - 1, d || 1, 12));
  return new Intl.DateTimeFormat(locale === 'es' ? 'es-MX' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

export function formatDateTime(iso: string, locale: 'es' | 'en' = 'es'): string {
  return new Intl.DateTimeFormat(locale === 'es' ? 'es-MX' : 'en-US', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/Mexico_City',
  }).format(new Date(iso));
}

/** "2027-2028" → "2027–2028" */
export function formatCiclo(ciclo: string): string {
  return ciclo.replace('-', '–');
}
