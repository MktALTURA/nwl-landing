import { NextRequest, NextResponse } from 'next/server';
import { verifyPassword, createSession, COOKIE_NAME, ROLE_HOME } from '@/lib/auth';
import { isRateLimited, recordFailedAttempt, clearRateLimit } from '@/lib/rate-limit';
import { loginSchema } from '@/lib/validations/jobs';

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';

  // Check rate limit (read-only — doesn't increment)
  const blocked = await isRateLimited(ip);
  if (blocked) {
    return NextResponse.json(
      { error: 'Too many attempts. Try again in 15 minutes.' },
      { status: 429, headers: { 'Retry-After': '900' } }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Password is required' }, { status: 400 });
  }

  const role = await verifyPassword(parsed.data.password);
  if (!role) {
    // Only count FAILED attempts
    await recordFailedAttempt(ip);
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }

  // Successful login — clear any rate-limit counter
  await clearRateLimit(ip);

  const token = await createSession(role);
  // The cookie is httpOnly, so the client can't read the role back out of it —
  // hand it the landing path directly.
  const response = NextResponse.json({ success: true, redirectTo: ROLE_HOME[role] });

  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 8 * 60 * 60,
  });

  return response;
}
