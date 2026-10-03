/**
 * Becas launch gate — same mechanism as the Rectoría one (lib/rectoria-preview.ts).
 *
 * Until NEXT_PUBLIC_BECAS_PUBLIC=true is set in Vercel Production, the page,
 * its API routes and the demo variants are only reachable by browsers that
 * came through `/becas?preview=<token>` once (sets a cookie). Everyone else
 * gets the 404 page, so the route is invisible rather than "coming soon".
 *
 * Preview deployments and local dev are open, so the page can be reviewed on
 * a preview URL. Keep them on mock data unless the Preview env has the
 * worker credentials.
 *
 * Edge-safe: constants and env reads only, no Node imports.
 */
export const BECAS_PUBLIC =
  process.env.NEXT_PUBLIC_BECAS_PUBLIC === 'true' ||
  (process.env.NEXT_PUBLIC_VERCEL_ENV !== undefined && process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production') ||
  process.env.NODE_ENV === 'development';

/** Local dev never gates (no token to carry around). Production always evaluates the gate. */
export const BECAS_GATE_DISABLED = process.env.NODE_ENV === 'development';

export const BECAS_PREVIEW_COOKIE = 'nwl_becas_preview';
export const BECAS_PREVIEW_PARAM = 'preview';

/** Middleware-only. Unset means the gate is closed to everyone. */
export function becasPreviewToken(): string | null {
  return process.env.BECAS_PREVIEW_TOKEN || null;
}

/** Paths covered by the gate. `/api/becas/revalidate` is the worker webhook and stays open. */
export function isBecasGatedPath(pathname: string): boolean {
  if (pathname === '/becas' || pathname.startsWith('/becas/')) return true;
  if (pathname.startsWith('/api/becas/') && pathname !== '/api/becas/revalidate') return true;
  return false;
}

/** The demo variant routes stay cookie-gated even after public launch. */
export function isBecasDemoPath(pathname: string): boolean {
  return pathname.startsWith('/becas/demo/');
}
