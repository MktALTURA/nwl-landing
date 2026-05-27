import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'crypto';

/* ------------------------------------------------------------------ */
/*  Meta Conversions API (server-side) endpoint                        */
/*                                                                     */
/*  Receives an event from the browser and forwards it to Meta's       */
/*  Graph API server-to-server. The browser pixel fires the same       */
/*  event with the SAME event_id, so Meta deduplicates the pair        */
/*  (improves "Rate of deduplication" + "Event coverage" metrics).     */
/*                                                                     */
/*  No PII is collected from the GHL iframe forms, so matching relies  */
/*  on the _fbp / _fbc cookies + client IP + user-agent. If hashed     */
/*  email/phone become available later, add them to user_data.         */
/* ------------------------------------------------------------------ */

const GRAPH_API_VERSION = 'v21.0';

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const ACCESS_TOKEN = process.env.META_CAPI_ACCESS_TOKEN;
const TEST_EVENT_CODE = process.env.META_CAPI_TEST_EVENT_CODE;

const ALLOWED_EVENTS = new Set(['PageView', 'Lead', 'ViewContent', 'Contact', 'CompleteRegistration']);

const sha256 = (value: string) =>
  createHash('sha256').update(value.trim().toLowerCase()).digest('hex');

function getClientIp(request: NextRequest): string | undefined {
  const fwd = request.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  return request.headers.get('x-real-ip') ?? undefined;
}

export async function POST(request: NextRequest) {
  if (!PIXEL_ID || !ACCESS_TOKEN) {
    console.error('[meta-capi] Missing NEXT_PUBLIC_META_PIXEL_ID or META_CAPI_ACCESS_TOKEN');
    return NextResponse.json({ error: 'CAPI not configured' }, { status: 500 });
  }

  let body: {
    eventName?: string;
    eventId?: string;
    eventSourceUrl?: string;
    fbclid?: string;
    email?: string;
    phone?: string;
    customData?: Record<string, unknown>;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const eventName = body.eventName;
  if (!eventName || !ALLOWED_EVENTS.has(eventName)) {
    return NextResponse.json({ error: 'Invalid eventName' }, { status: 400 });
  }

  // Cookies set by the browser pixel — primary matching signal.
  const fbp = request.cookies.get('_fbp')?.value;
  // Prefer the _fbc cookie; if the pixel was blocked, build fbc from the raw
  // fbclid (format: fb.1.<unixMs>.<fbclid>) so ad clicks still match.
  const fbc =
    request.cookies.get('_fbc')?.value ??
    (body.fbclid ? `fb.1.${Date.now()}.${body.fbclid}` : undefined);

  const userData: Record<string, unknown> = {
    client_ip_address: getClientIp(request),
    client_user_agent: request.headers.get('user-agent') ?? undefined,
    ...(fbp && { fbp }),
    ...(fbc && { fbc }),
    // Hash any PII if/when forms expose it.
    ...(body.email && { em: [sha256(body.email)] }),
    ...(body.phone && { ph: [sha256(body.phone.replace(/\D/g, ''))] }),
  };

  const payload = {
    data: [
      {
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: body.eventId, // dedup key shared with the browser pixel
        event_source_url: body.eventSourceUrl,
        action_source: 'website',
        user_data: userData,
        ...(body.customData && { custom_data: body.customData }),
      },
    ],
    ...(TEST_EVENT_CODE && { test_event_code: TEST_EVENT_CODE }),
  };

  const url = `https://graph.facebook.com/${GRAPH_API_VERSION}/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const result = await res.json();

    if (!res.ok) {
      console.error('[meta-capi] Meta API error:', JSON.stringify(result));
      return NextResponse.json({ error: 'Meta API error', details: result }, { status: 502 });
    }
    return NextResponse.json({ success: true, ...result });
  } catch (err) {
    console.error('[meta-capi] Request failed:', err);
    return NextResponse.json({ error: 'Request failed' }, { status: 500 });
  }
}
