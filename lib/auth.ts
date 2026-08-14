import { SignJWT } from 'jose';
import { compare } from 'bcryptjs';
import { cookies } from 'next/headers';
import { COOKIE_NAME, ROLE_HOME, getJwtSecret, verifyToken, type AdminRole } from './auth-edge';

/**
 * Node-runtime half of the admin auth (password hashing + cookie reading).
 * The edge-safe pieces live in lib/auth-edge.ts — see the note there.
 *
 * Two roles share one login form:
 * - 'admin'      → full access (job listings + beneficios)
 * - 'beneficios' → only the partner-benefits panel
 */

/**
 * Check a password against both role hashes.
 *
 * Both comparisons always run when both hashes are configured: returning early
 * on an admin match would make an admin password measurably slower/faster than
 * a beneficios one, leaking which family a guess landed in.
 */
export async function verifyPassword(password: string): Promise<AdminRole | null> {
  const adminHash = process.env.ADMIN_PASSWORD_HASH;
  const beneficiosHash = process.env.BENEFICIOS_PASSWORD_HASH;

  const [isAdmin, isBeneficios] = await Promise.all([
    adminHash ? compare(password, adminHash) : Promise.resolve(false),
    beneficiosHash ? compare(password, beneficiosHash) : Promise.resolve(false),
  ]);

  if (isAdmin) return 'admin';
  if (isBeneficios) return 'beneficios';
  return null;
}

export async function createSession(role: AdminRole): Promise<string> {
  return new SignJWT({ role })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('8h')
    .sign(getJwtSecret());
}

/**
 * Read the current session from the cookie.
 *
 * Returns an object (not a boolean) so every existing `if (!session)` guard
 * keeps working on truthiness while callers that care can inspect the role.
 */
export async function getSession(): Promise<{ role: AdminRole } | null> {
  const cookieStore = await cookies();
  return verifyToken(cookieStore.get(COOKIE_NAME)?.value);
}

/** Full-access routes (job listings, seeding). */
export function isAdmin(session: { role: AdminRole } | null): boolean {
  return session?.role === 'admin';
}

/** Beneficios panel — both roles are allowed. */
export function canEditBeneficios(session: { role: AdminRole } | null): boolean {
  return session?.role === 'admin' || session?.role === 'beneficios';
}

export { COOKIE_NAME, ROLE_HOME, verifyToken };
export type { AdminRole };
