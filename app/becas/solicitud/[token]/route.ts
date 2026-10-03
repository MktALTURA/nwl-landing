import { NextResponse, type NextRequest } from 'next/server';

const STATUS_COOKIE = 'nwl_becas_app';

/**
 * The link in the family's email carries the application token. This handler
 * moves it into an httpOnly cookie and redirects to the clean /becas/solicitud
 * URL, so the token never reaches GA4, Meta, Clarity or the browser history
 * of a shared device's address bar.
 */
export async function GET(req: NextRequest, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const url = new URL('/becas/solicitud', req.url);
  if (!/^[A-Za-z0-9_-]{6,80}$/.test(token)) {
    return NextResponse.redirect(url, 303);
  }
  const res = NextResponse.redirect(url, 303);
  res.cookies.set(STATUS_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/becas',
    maxAge: 60 * 60 * 24 * 60,
  });
  return res;
}
