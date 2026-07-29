import { NextRequest, NextResponse } from 'next/server';
import { buildFbc, sendMetaEvent } from '@/lib/meta-capi';

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

const ALLOWED_EVENTS = new Set(['PageView', 'Lead', 'ViewContent', 'Contact', 'CompleteRegistration']);

function getClientIp(request: NextRequest): string | undefined {
  const fwd = request.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0].trim();
  return request.headers.get('x-real-ip') ?? undefined;
}

export async function POST(request: NextRequest) {
  let body: {
    eventName?: string;
    eventId?: string;
    eventSourceUrl?: string;
    fbclid?: string;
    fbclidTs?: number;
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
  // Prefer the _fbc cookie; if the pixel was blocked, rebuild fbc from the raw
  // fbclid using the timestamp at which the client captured it.
  const fbc =
    request.cookies.get('_fbc')?.value ??
    (body.fbclid ? buildFbc(body.fbclid, body.fbclidTs) : undefined);

  const result = await sendMetaEvent({
    eventName,
    eventId: body.eventId,
    eventSourceUrl: body.eventSourceUrl,
    userData: {
      client_ip_address: getClientIp(request),
      client_user_agent: request.headers.get('user-agent') ?? undefined,
      fbp,
      fbc,
      // Hash any PII if/when forms expose it.
      email: body.email,
      phone: body.phone,
    },
    customData: body.customData,
  });

  if (!result.ok) {
    return NextResponse.json(
      { error: result.error, ...(result.details ? { details: result.details } : {}) },
      { status: result.status },
    );
  }
  return NextResponse.json({ success: true, ...(result.result as object) });
}
