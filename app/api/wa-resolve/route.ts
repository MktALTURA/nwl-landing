import { NextRequest, NextResponse } from 'next/server';
import { timingSafeEqual } from 'crypto';
import {
  WA_TOKEN_RE,
  getWaAttribution,
  markWaResolved,
  type WaAttribution,
} from '@/lib/db/wa-attribution';
import { META_MAX_EVENT_AGE_SECONDS, resolveFbc, sendMetaEvent } from '@/lib/meta-capi';
import { markDirectWhatsApp, writeAttributionToContact } from '@/lib/ghl';

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

/**
 * GHL nests the workflow action's "DATOS PERSONALIZADOS" pairs under a
 * `customData` object — they are NOT merged into the top level alongside its
 * standard fields. Observed payload keys from a real execution:
 *
 *   contact_id, contact_type, country, customData, date_created, first_name,
 *   full_address, full_name, last_name, location, message, phone, tags,
 *   triggerData, workflow
 *
 * So `sendLead` lives at `customData.sendLead`, while `message` and `phone`
 * at the top level are GHL's own standard fields. Read both: custom pairs win,
 * then fall back to the standard field of the same name — which is how we get
 * a phone number for Meta matching even if the merge field never renders.
 */
function pickField(body: Record<string, unknown>, key: string): unknown {
  const cd = body.customData;
  let nested: Record<string, unknown> | undefined;

  if (cd && typeof cd === 'object') {
    nested = cd as Record<string, unknown>;
  } else if (typeof cd === 'string') {
    // Defensive: some GHL versions send customData as a JSON string.
    try {
      const parsed = JSON.parse(cd);
      if (parsed && typeof parsed === 'object') nested = parsed as Record<string, unknown>;
    } catch {
      /* not JSON — ignore */
    }
  }

  const fromCustom = nested?.[key];
  if (fromCustom !== undefined && fromCustom !== null && fromCustom !== '') return fromCustom;
  return body[key];
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

  // Last resort: scan the ENTIRE payload for a reference code.
  //
  // GHL's plain Webhook action merges our custom pairs with its own "datos
  // estándar", and we can't rely on `{{message.body}}` rendering inside that
  // action — it demonstrably didn't. But if the message text reaches us under
  // ANY key, whatever GHL happens to call it, the token is in there. The
  // format (`NW-` + 6 chars from a no-lookalike alphabet) is distinctive
  // enough that a false positive from an unrelated field isn't a real risk.
  const token =
    extractToken(pickField(body, 'token')) ??
    extractToken(pickField(body, 'message')) ??
    extractToken(JSON.stringify(body));

  if (!token) {
    // No reference code: this person never clicked the WhatsApp button on the
    // site. Name the channel instead of leaving them blank — but only if we
    // know nothing else about them. markDirectWhatsApp() refuses to touch a
    // contact that already carries any attribution, so this can never overwrite
    // a real source and never needs a priority order.
    const directContactId = pickField(body, 'contact_id');
    const marked = await markDirectWhatsApp(
      typeof directContactId === 'string' ? directContactId : '',
    );

    // 200, not 400: this is the normal case for any inbound message that
    // simply has no reference code. It lets the GHL workflow run WITHOUT a
    // message-body filter and branch on a single condition (`found`), instead
    // of needing to tell HTTP error codes apart. Nothing is wrong here.
    //
    // `_debug` echoes back WHAT WE RECEIVED, because Vercel does not log
    // request bodies and GHL's execution log does show the response. It is
    // the only way to see what GHL actually sent. Key names only, plus the
    // message value — no other field values, so no contact PII is echoed.
    return NextResponse.json(
      {
        found: false,
        reason: 'no_code',
        ghl: marked,
        _debug: {
          receivedKeys: Object.keys(body).sort(),
          messageSeen: typeof body.message === 'string' ? body.message.slice(0, 200) : null,
          messageType: typeof body.message,
        },
      },
      { status: 200 },
    );
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

  const fields = toContactFields(record);

  const response: Record<string, unknown> = {
    found: true,
    // Flat top-level copies alongside the nested object. GHL's webhook
    // response picker frequently can't address a nested path like
    // `attribution.utm_source`, so every field is also reachable as a
    // top-level key. Same values, two shapes — map whichever GHL offers.
    ...fields,
    attribution: fields,
  };

  // Stamp the attribution onto the GHL contact itself. The Meta replay below
  // rescues the ad platform's view of this lead; this is the half that fixes
  // CRM reporting, because GHL's own reports read the contact record — and a
  // WhatsApp lead lands there with nothing at all.
  //
  // Gated on first resolution: the "el cliente ha respondido" trigger fires on
  // EVERY inbound message, so an ongoing conversation would otherwise repeat
  // this write on every reply.
  const contactId = pickField(body, 'contact_id');
  response.ghl = record.resolvedAt
    ? { written: false, reason: 'already resolved' }
    : await writeAttributionToContact(typeof contactId === 'string' ? contactId : '', record);

  if (isTruthyFlag(pickField(body, 'sendLead'))) {
    response.meta = await replayToMeta(record, body);
  } else {
    // Make the skip visible instead of silently returning attribution only —
    // this is the exact failure a `=== true` check used to hide. Echo what
    // actually arrived: "not set" is ambiguous between the key being absent
    // entirely and it carrying a value we rejected, and those have different
    // fixes. `receivedKeys` shows whether GHL sent the pair at all.
    response.meta = {
      sent: false,
      reason: 'sendLead not set',
      sendLeadSeen: pickField(body, 'sendLead') ?? null,
      sendLeadType: typeof pickField(body, 'sendLead'),
      receivedKeys: Object.keys(body).sort(),
    };
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
  if (
    !fbc &&
    !record.fbp &&
    !cleanField(pickField(body, 'email')) &&
    !cleanField(pickField(body, 'phone'))
  ) {
    return { sent: false, reason: 'No usable identifier (no fbc/fbp/email/phone)' };
  }

  const eventNameRaw = pickField(body, 'eventName');
  const eventName = typeof eventNameRaw === 'string' && eventNameRaw ? eventNameRaw : 'Lead';

  const result = await sendMetaEvent({
    eventName,
    // Supplied by GHL when it also fires its own copy, so the two dedup.
    eventId: cleanField(pickField(body, 'eventId')) ?? `wa-${record.token}`,
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
      email: cleanField(pickField(body, 'email')),
      phone: cleanField(pickField(body, 'phone')),
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
