import { createHash } from 'crypto';

/* ------------------------------------------------------------------ */
/*  Meta Conversions API — shared server-side sender                   */
/*                                                                     */
/*  Used by:                                                           */
/*    app/api/meta-capi/route.ts   — browser-originated events         */
/*    app/api/wa-resolve/route.ts  — WhatsApp leads reconnected later  */
/* ------------------------------------------------------------------ */

const GRAPH_API_VERSION = 'v21.0';

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const ACCESS_TOKEN = process.env.META_CAPI_ACCESS_TOKEN;
const TEST_EVENT_CODE = process.env.META_CAPI_TEST_EVENT_CODE;

/** Meta rejects the WHOLE request if any event_time is older than 7 days. */
export const META_MAX_EVENT_AGE_SECONDS = 7 * 24 * 60 * 60;

const sha256 = (value: string) =>
  createHash('sha256').update(value.trim().toLowerCase()).digest('hex');

/* ── fbc subdomain index ──────────────────────────────────────────── */

/**
 * Meta's `fb.<subdomainIndex>.<creationTimeMs>.<fbclid>` encodes WHICH domain
 * the cookie was written on, counting labels from the TLD (mx=0, com=1, …).
 * The pixel writes the cookie on the registrable domain, so:
 *
 *   www.nwl.com.mx → cookie on nwl.com.mx → fb.2.…   (verified live)
 *   nwl.mx         → cookie on nwl.mx     → fb.1.…   (one label shorter)
 *
 * Both hosts serve this app, so the index is NOT a constant. Getting it wrong
 * produces a well-formed value that Meta simply fails to match.
 *
 * Only relevant when we synthesize; a real `_fbc` is always forwarded verbatim.
 */

// Public suffixes we actually serve under that span more than one label.
// `nwl.com.mx`'s registrable domain is 3 labels, not 2.
const MULTI_LABEL_SUFFIXES = ['com.mx', 'org.mx', 'net.mx', 'edu.mx', 'gob.mx'];

export function subdomainIndexForHost(host: string): number {
  const h = host.toLowerCase().replace(/\.$/, '').split(':')[0];
  const suffix = MULTI_LABEL_SUFFIXES.find((s) => h === s || h.endsWith('.' + s));
  const registrableLabels = suffix ? suffix.split('.').length + 1 : 2;
  return registrableLabels - 1;
}

/**
 * Read the index straight out of a cookie the pixel already wrote. `_fbp` has
 * the same `fb.<index>.…` shape as `_fbc` and is set on the same domain, so
 * when the pixel has run at all this beats any derivation — it's what Meta
 * actually observed for this visitor.
 */
export function subdomainIndexFromCookie(cookieValue?: string): number | null {
  if (!cookieValue) return null;
  const m = /^fb\.(\d+)\./.exec(cookieValue);
  return m ? Number(m[1]) : null;
}

/**
 * Build a Meta `fbc` from a raw fbclid.
 *
 * Creation time is in MILLISECONDS, matching what the pixel writes into
 * `_fbc`. Passing seconds produces a value Meta silently fails to match.
 *
 * `capturedAtMs` must be when the click was OBSERVED, not when the event is
 * sent — otherwise a click stored earlier in the visit gets a timestamp that
 * doesn't line up with the ad click Meta recorded.
 */
export function buildFbc(
  fbclid: string,
  capturedAtMs?: number,
  subdomainIndex = 1,
): string {
  const ts = Number.isFinite(capturedAtMs) ? Number(capturedAtMs) : Date.now();
  return `fb.${subdomainIndex}.${Math.round(ts)}.${fbclid}`;
}

/**
 * Resolve `fbc`, preferring reality over reconstruction:
 *   1. the real `_fbc` cookie, forwarded verbatim
 *   2. synthesized, with the index copied from `_fbp` (same domain, observed)
 *   3. synthesized, with the index derived from the host
 */
export function resolveFbc(opts: {
  fbcCookie?: string;
  fbpCookie?: string;
  fbclid?: string;
  fbclidTs?: number;
  host?: string;
}): string | undefined {
  if (opts.fbcCookie) return opts.fbcCookie;
  if (!opts.fbclid) return undefined;

  const index =
    subdomainIndexFromCookie(opts.fbpCookie) ??
    (opts.host ? subdomainIndexForHost(opts.host) : 1);

  return buildFbc(opts.fbclid, opts.fbclidTs, index);
}

export interface MetaUserData {
  client_ip_address?: string;
  client_user_agent?: string;
  fbp?: string;
  fbc?: string;
  email?: string;
  phone?: string;
}

export interface MetaEventInput {
  eventName: string;
  eventId?: string;
  eventSourceUrl?: string;
  /** Epoch SECONDS. Defaults to now. Must be within 7 days. */
  eventTime?: number;
  actionSource?: 'website' | 'chat' | 'phone_call' | 'email' | 'other';
  userData: MetaUserData;
  customData?: Record<string, unknown>;
}

export type MetaSendResult =
  | { ok: true; result: unknown }
  | { ok: false; status: number; error: string; details?: unknown };

export function isCapiConfigured(): boolean {
  return Boolean(PIXEL_ID && ACCESS_TOKEN);
}

export async function sendMetaEvent(input: MetaEventInput): Promise<MetaSendResult> {
  if (!PIXEL_ID || !ACCESS_TOKEN) {
    console.error('[meta-capi] Missing NEXT_PUBLIC_META_PIXEL_ID or META_CAPI_ACCESS_TOKEN');
    return { ok: false, status: 500, error: 'CAPI not configured' };
  }

  const nowSeconds = Math.floor(Date.now() / 1000);
  const eventTime = input.eventTime ?? nowSeconds;

  if (nowSeconds - eventTime > META_MAX_EVENT_AGE_SECONDS) {
    // Sending it would make Meta reject the entire batch, so drop it here.
    return { ok: false, status: 400, error: 'Event older than the 7-day limit' };
  }

  const u = input.userData;
  const userData: Record<string, unknown> = {
    ...(u.client_ip_address && { client_ip_address: u.client_ip_address }),
    ...(u.client_user_agent && { client_user_agent: u.client_user_agent }),
    ...(u.fbp && { fbp: u.fbp }),
    ...(u.fbc && { fbc: u.fbc }),
    ...(u.email && { em: [sha256(u.email)] }),
    ...(u.phone && { ph: [sha256(u.phone.replace(/\D/g, ''))] }),
  };

  const payload = {
    data: [
      {
        event_name: input.eventName,
        event_time: eventTime,
        ...(input.eventId && { event_id: input.eventId }),
        ...(input.eventSourceUrl && { event_source_url: input.eventSourceUrl }),
        action_source: input.actionSource ?? 'website',
        user_data: userData,
        ...(input.customData && { custom_data: input.customData }),
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
      return { ok: false, status: 502, error: 'Meta API error', details: result };
    }
    return { ok: true, result };
  } catch (err) {
    console.error('[meta-capi] Request failed:', err);
    return { ok: false, status: 500, error: 'Request failed' };
  }
}
