/**
 * Rectoría launch gate.
 *
 * Until `NEXT_PUBLIC_RECTORIA_PUBLIC=true` is set, /rectoria is a private
 * preview: the middleware only serves it to browsers that arrived once via
 * `/rectoria?preview=<token>` (which sets a cookie), the footer link, sitemap
 * entry and llms.txt mention stay out, and the page is marked noindex.
 *
 * Preview deployments (e.g. the `test` branch) are always open.
 * To launch in production: set NEXT_PUBLIC_RECTORIA_PUBLIC=true in Vercel and redeploy.
 * Everything below reads the flag at build time (NEXT_PUBLIC_ is inlined).
 */
// Open on Vercel preview deployments (the `test` branch alias) so the team can
// share that link as-is; production stays gated until the launch flag is set.
// Local dev has no VERCEL_ENV, so the gate can still be exercised locally.
// LAUNCHED 2026-09-15: the page is public everywhere. To re-gate production,
// restore the env/VERCEL_ENV check this constant used before launch.
export const RECTORIA_PUBLIC = true;

export const RECTORIA_PREVIEW_COOKIE = 'nwl_rectoria_preview';
export const RECTORIA_PREVIEW_PARAM = 'preview';

/** Middleware-only: the token the preview link carries. Override with RECTORIA_PREVIEW_TOKEN. */
export function rectoriaPreviewToken(): string {
  return process.env.RECTORIA_PREVIEW_TOKEN || 'nwl-rectoria-2026';
}
