/**
 * Rectoría launch gate.
 *
 * LAUNCHED 2026-09-15: RECTORIA_PUBLIC is hard-coded to `true`, so the page is
 * public everywhere (indexable, in the sitemap, linked from the footer and the
 * "Our School" nav dropdown) and the middleware preview gate never runs.
 *
 * To re-gate production, restore the check this constant used before launch:
 *   process.env.NEXT_PUBLIC_RECTORIA_PUBLIC === 'true' ||
 *   (process.env.NEXT_PUBLIC_VERCEL_ENV !== undefined && process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production')
 * Browsers then need `/rectoria?preview=<token>` once (sets a cookie).
 */
export const RECTORIA_PUBLIC = true;

export const RECTORIA_PREVIEW_COOKIE = 'nwl_rectoria_preview';
export const RECTORIA_PREVIEW_PARAM = 'preview';

/** Middleware-only: the token the preview link carries. Override with RECTORIA_PREVIEW_TOKEN. */
export function rectoriaPreviewToken(): string {
  return process.env.RECTORIA_PREVIEW_TOKEN || 'nwl-rectoria-2026';
}
