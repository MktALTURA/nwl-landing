import { NextRequest, NextResponse } from 'next/server';
import {
  WA_TOKEN_RE,
  isWaWriteLimited,
  putWaAttribution,
  type WaAttribution,
} from '@/lib/db/wa-attribution';

/* ------------------------------------------------------------------ */
/*  POST /api/wa-token                                                 */
/*                                                                     */
/*  Called (fire-and-forget) the moment a visitor clicks a WhatsApp    */
/*  CTA. Parks that visit's attribution under the short reference code */
/*  that was stamped into the prefilled message, so a GHL workflow can */
/*  recover it via /api/wa-resolve when the family actually writes in. */
/*                                                                     */
/*  Unauthenticated by necessity — it runs before any identity exists. */
/*  Guarded by strict token validation, a per-IP write cap, and a      */
/*  7-day TTL on every record.                                         */
/* ------------------------------------------------------------------ */

function getClientIp(request: NextRequest): string {
  const fwd = request.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  return request.headers.get('x-real-ip') ?? 'unknown';
}

/** Keep stored strings short — nothing here should ever be long. */
const clip = (v: unknown, max = 512): string | undefined =>
  typeof v === 'string' && v ? v.slice(0, max) : undefined;

function clipRecord(v: unknown): Record<string, string> | undefined {
  if (!v || typeof v !== 'object') return undefined;
  const out: Record<string, string> = {};
  for (const [k, val] of Object.entries(v as Record<string, unknown>).slice(0, 12)) {
    const s = clip(val, 256);
    if (s) out[k.slice(0, 40)] = s;
  }
  return Object.keys(out).length ? out : undefined;
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const token = typeof body.token === 'string' ? body.token.toUpperCase() : '';
  if (!WA_TOKEN_RE.test(token)) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
  }

  const ip = getClientIp(request);
  try {
    if (await isWaWriteLimited(ip)) {
      return NextResponse.json({ error: 'Rate limited' }, { status: 429 });
    }
  } catch (err) {
    // KV unavailable — the CTA must still work, so fail open and bail out.
    console.error('[wa-token] rate-limit check failed:', err);
    return NextResponse.json({ error: 'Unavailable' }, { status: 503 });
  }

  const clickedAt =
    typeof body.clickedAt === 'number' && Number.isFinite(body.clickedAt)
      ? body.clickedAt
      : Date.now();

  const record: WaAttribution = {
    token,
    clickedAt,
    href: clip(body.href, 1024),
    source_path: clip(body.source_path, 256),
    landing_page: clip(body.landing_page, 256),
    ft_landing_page: clip(body.ft_landing_page, 256),
    fbclid: clip(body.fbclid, 512),
    fbclidTs: typeof body.fbclidTs === 'number' ? body.fbclidTs : undefined,
    clickIds: clipRecord(body.clickIds),
    utm: clipRecord(body.utm),
    ft_utm: clipRecord(body.ft_utm),
    // First-party cookies — only readable here, on our own origin. These are
    // the whole point: they turn a recovered WhatsApp lead into a Meta event
    // with a genuine click ID instead of an unmatched one.
    fbc: request.cookies.get('_fbc')?.value,
    fbp: request.cookies.get('_fbp')?.value,
    ip: ip !== 'unknown' ? ip : undefined,
    ua: request.headers.get('user-agent') ?? undefined,
  };

  try {
    await putWaAttribution(record);
  } catch (err) {
    console.error('[wa-token] store failed:', err);
    return NextResponse.json({ error: 'Store failed' }, { status: 503 });
  }

  return new NextResponse(null, { status: 204 });
}
