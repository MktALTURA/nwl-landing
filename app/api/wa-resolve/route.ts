import { NextRequest, NextResponse } from 'next/server';
import { timingSafeEqual } from 'crypto';
import {
  WA_TOKEN_RE,
  getWaAttribution,
  markWaResolved,
  type WaAttribution,
} from '@/lib/db/wa-attribution';
import { META_MAX_EVENT_AGE_SECONDS, resolveFbc, sendMetaEvent } from '@/lib/meta-capi';

/* ------------------------------------------------------------------ */
/*  POST /api/wa-resolve                                               */
/*                                                                     */
/*  Called by a GoHighLevel workflow when an inbound WhatsApp message  */
/*  contains an `[NW-XXXXXX]` reference code. Returns the attribution  */
/*  parked at click time so GHL can write real source/campaign values  */
/*  onto the contact instead of "sin identificar".                     */
/*                                                                     */
/*  With `sendLead: true` it ALSO replays the conversion to Meta with  */
/*  the original click's `fbc`/`fbp` — this is the half that actually  */
/*  recovers the WhatsApp cohort in Ads Manager, because a server      */
/*  event carrying a genuine click ID is matchable and one without it  */
/*  is not.                                                            */
/*                                                                     */
/*  Auth: shared secret in `x-nwl-secret` (or `?secret=`).             */
/* ------------------------------------------------------------------ */

const SECRET = process.env.WA_RESOLVE_SECRET;

function secretOk(request: NextRequest): boolean {
  if (!SECRET) return false;
  const provided =
    request.headers.get('x-nwl-secret') ?? request.nextUrl.searchParams.get('secret') ?? '';
  const a = Buffer.from(provided);
  const b = Buffer.from(SECRET);
  return a.length === b.length && timingSafeEqual(a, b);
}

/**
 * GHL's webhook action sends every custom data pair as a STRING — there is no
 * boolean type in that UI. So `sendLead` arrives as `"true"`, never `true`,
 * and a strict `=== true` check would silently skip the Meta replay forever
 * while still returning a 200 with attribution. Accept what GHL can actually
 * send.
 */
function isTruthyFlag(v: unknown): boolean {
  if (v === true) return true;
  if (typeof v === 'number') return v === 1;
  if (typeof v !== 'string') return false;
  return ['true', '1', 'yes', 'si', 'sí'].includes(v.trim().toLowerCase());
}

/** Blank-ish merge fields arrive as empty strings or literal unrendered tags. */
function cleanField(v: unknown): string | undefined {
  if (typeof v !== 'string') return undefined;
  const s = v.trim();
  if (!s || s.includes('{{')) return undefined;
  return s;
}

/** Accepts a bare token or the raw inbound message text to scan. */
function extractToken(input: unknown): string | null {
  if (typeof input !== 'string') return null;
  const direct = input.trim().toUpperCase();
  if (WA_TOKEN_RE.test(direct)) return direct;
  const found = direct.match(/NW-[23456789ABCDEFGHJKLMNPQRSTUVWXYZ]{6}/);
  return found ? found[0] : null;
}

/** Flatten to the shape a GHL workflow can map straight onto custom fields. */
function toContactFields(a: WaAttribution) {
  return {
    token: a.token,
    clicked_at: new Date(a.clickedAt).toISOString(),
    utm_source: a.utm?.utm_source ?? null,
    utm_medium: a.utm?.utm_medium ?? null,
    utm_campaign: a.utm?.utm_campaign ?? null,
    utm_term: a.utm?.utm_term ?? null,
    utm_content: a.utm?.utm_content ?? null,
    ft_utm_source: a.ft_utm?.utm_source ?? null,
    ft_utm_medium: a.ft_utm?.utm_medium ?? null,
    ft_utm_campaign: a.ft_utm?.utm_campaign ?? null,
    landing_page: a.landing_page ?? null,
    ft_landing_page: a.ft_landing_page ?? null,
    source_path: a.source_path ?? null,
    fbclid: a.fbclid ?? null,
    gclid: a.clickIds?.gclid ?? null,
    already_resolved: Boolean(a.resolvedAt),
  };
}

export async function POST(request: NextRequest) {
  if (!SECRET) {
    console.error('[wa-resolve] WA_RESOLVE_SECRET is not set');
    return NextResponse.json({ error: 'Not configured' }, { status: 503 });
  }
  if (!secretOk(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const token = extractToken(body.token) ?? extractToken(body.message);
  if (!token) {
    // 200, not 400: this is the normal case for any inbound message that
    // simply has no reference code. It lets the GHL workflow run WITHOUT a
    // message-body filter and branch on a single condition (`found`), instead
    // of needing to tell HTTP error codes apart. Nothing is wrong here.
    return NextResponse.json({ found: false, reason: 'no_code' }, { status: 200 });
  }

  let record: WaAttribution | null;
  try {
    record = await getWaAttribution(token);
  } catch (err) {
    console.error('[wa-resolve] lookup failed:', err);
    return NextResponse.json({ error: 'Lookup failed' }, { status: 503 });
  }

  if (!record) {
    // Expired (>7 days) or never stored. Not an error worth alarming on —
    // GHL should just leave the contact's attribution as-is. Same 200 +
    // `found: false` shape as the no-code case, so one condition covers both.
    return NextResponse.json({ found: false, reason: 'expired_or_unknown', token }, { status: 200 });
  }

  const response: Record<string, unknown> = {
    found: true,
    attribution: toContactFields(record),
  };

  if (isTruthyFlag(body.sendLead)) {
    response.meta = await replayToMeta(record, body);
  } else {
    // Make the skip visible instead of silently returning attribution only —
    // this is the exact failure a `=== true` check used to hide.
    response.meta = { sent: false, reason: 'sendLead not set' };
  }

  try {
    await markWaResolved(record);
  } catch {
    /* bookkeeping only — never fail the response on it */
  }

  return NextResponse.json(response);
}

/**
 * Replay the WhatsApp conversion to Meta using the identifiers captured at
 * click time. `event_time` is the CLICK, not now — that's what ties it to the
 * ad — which is also why anything past Meta's 7-day ceiling is dropped rather
 * than sent with a fudged timestamp.
 */
async function replayToMeta(record: WaAttribution, body: Record<string, unknown>) {
  const eventTime = Math.floor(record.clickedAt / 1000);
  const ageSeconds = Math.floor(Date.now() / 1000) - eventTime;
  if (ageSeconds > META_MAX_EVENT_AGE_SECONDS) {
    return { sent: false, reason: 'Click is older than Meta\'s 7-day limit' };
  }

  // The click's own host decides the subdomain index — the visitor may have
  // been on nwl.mx rather than nwl.com.mx, which uses a different one.
  let clickHost: string | undefined;
  try {
    clickHost = record.href ? new URL(record.href).hostname : undefined;
  } catch {
    /* stored href unparseable — fall back to host-free derivation */
  }
  const fbc = resolveFbc({
    fbcCookie: record.fbc,
    fbpCookie: record.fbp,
    fbclid: record.fbclid,
    fbclidTs: record.fbclidTs,
    host: clickHost,
  });

  // Without a click ID Meta has almost nothing to match on, and an unmatched
  // Lead only drags the dataset's match quality down. Skip it.
  if (!fbc && !record.fbp && !cleanField(body.email) && !cleanField(body.phone)) {
    return { sent: false, reason: 'No usable identifier (no fbc/fbp/email/phone)' };
  }

  const eventName = typeof body.eventName === 'string' ? body.eventName : 'Lead';

  const result = await sendMetaEvent({
    eventName,
    // Supplied by GHL when it also fires its own copy, so the two dedup.
    eventId: typeof body.eventId === 'string' ? body.eventId : `wa-${record.token}`,
    eventSourceUrl: record.href,
    eventTime,
    // The identifiers are all website-session signals from the click, so
    // `website` keeps the event consistent with them (and with the `Contact`
    // event already fired at click time).
    actionSource: 'website',
    userData: {
      fbc,
      fbp: record.fbp,
      client_ip_address: record.ip,
      client_user_agent: record.ua,
      // cleanField drops empty strings and unrendered `{{merge.tags}}`, which
      // would otherwise be hashed and sent to Meta as garbage identifiers.
      email: cleanField(body.email),
      phone: cleanField(body.phone),
    },
    customData: {
      lead_source: 'whatsapp',
      wa_token: record.token,
      ...(record.utm?.utm_campaign && { campaign: record.utm.utm_campaign }),
    },
  });

  return result.ok
    ? { sent: true, eventName, eventTime }
    : { sent: false, reason: result.error, details: result.details };
}
