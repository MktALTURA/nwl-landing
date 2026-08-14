import { jwtVerify } from 'jose';

/**
 * Edge-safe half of the admin auth.
 *
 * middleware.ts runs on the edge runtime and cannot pull in `bcryptjs` or
 * `next/headers`, which lib/auth.ts depends on. Everything the middleware
 * needs — the cookie name, the secret, and token verification — lives here so
 * both runtimes share one definition instead of duplicating constants.
 */

/** Who the token belongs to. */
export type AdminRole = 'admin' | 'beneficios';

export const COOKIE_NAME = 'nwl-admin-token';

/** Where each role lands after login (and gets bounced back to). */
export const ROLE_HOME: Record<AdminRole, string> = {
  admin: '/admin/jobs',
  beneficios: '/admin/beneficios',
};

export function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET environment variable is required');
  return new TextEncoder().encode(secret);
}

/**
 * Verify a token and normalize its role claim.
 *
 * Anything that isn't explicitly 'beneficios' resolves to 'admin' — tokens
 * issued before roles existed carry `role: 'admin'` already, so sessions
 * created before this deploy keep full access instead of being logged out.
 */
export async function verifyToken(token?: string): Promise<{ role: AdminRole } | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getJwtSecret());
    return { role: payload.role === 'beneficios' ? 'beneficios' : 'admin' };
  } catch {
    return null;
  }
}
