/* ------------------------------------------------------------------ */
/*  UTM Tracking Utility                                               */
/*                                                                     */
/*  Captures, persists, and injects UTM parameters for attribution.    */
/*  First-touch UTMs are stored once (never overwritten).              */
/*  Last-touch UTMs are updated on every visit that carries UTMs.      */
/*                                                                     */
/*  When no UTM params are present, we infer attribution from          */
/*  document.referrer (e.g. google/organic, bing/organic, social).     */
/*  Google Ads auto-tagged clicks (gclid) are detected as cpc.        */
/*                                                                     */
/*  GHL's form_embed.js reads params from window.location and passes   */
/*  them as hidden fields. We use history.replaceState to inject       */
/*  stored UTMs into the URL before the GHL script loads.              */
/* ------------------------------------------------------------------ */

const UTM_PARAMS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
] as const;

type UTMKey = (typeof UTM_PARAMS)[number];

export interface UTMData {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  landing_page: string;
  timestamp: string;
}

const STORAGE_FIRST = 'nwl_utm_first';
const STORAGE_LAST = 'nwl_utm_last';
// First landing page of the visit, kept separately from STORAGE_FIRST so a
// direct/untagged first visit never locks first-touch UTMs to "no source".
const STORAGE_FIRST_LANDING = 'nwl_landing_first';

/* ── Self-referral detection ──────────────────────────────────────── */

// Our own hosts. Traffic coming from these is internal navigation, not a
// real referral — it must NEVER become a utm_source, or it overwrites the
// genuine inbound source (e.g. facebook) in last-touch storage.
// The current hostname is added dynamically at call time so this never
// goes stale when the production domain changes.
const SELF_HOSTS = [
  'nwl.com.mx',
  // nwl.mx 308s to www.nwl.com.mx, but a visitor mid-session before that
  // redirect existed can still carry it as a referrer.
  'nwl.mx',
  'newlandschool.com',
  'newlandschool.edu.mx',
  'localhost',
  'vercel.app',
  // Our own tooling. Observed live: a first-touch of
  // {utm_source: 'vercel.com', utm_medium: 'referral'} was pinned in
  // localStorage from clicking through the Vercel dashboard — and because
  // first-touch never overwrites, it stuck for months. No real visitor's
  // journey begins at a deploy dashboard.
  'vercel.com',
];

function isSelfHost(host: string): boolean {
  const h = host.toLowerCase();
  const hosts = [...SELF_HOSTS];
  if (typeof window !== 'undefined' && window.location.hostname) {
    hosts.push(window.location.hostname.toLowerCase());
  }
  // Exact match or subdomain match (www., api., etc.) — no loose substring
  // matching, so a lookalike domain can't be misclassified as internal.
  return hosts.some((self) => h === self || h.endsWith('.' + self));
}

// A stored entry is a self-referral if it was inferred as a `referral`
// whose source is one of our own hosts. Used to retroactively discard
// polluted localStorage written before this bug was fixed.
function isSelfReferralData(data: UTMData | null): boolean {
  return (
    !!data &&
    data.utm_medium === 'referral' &&
    !!data.utm_source &&
    isSelfHost(data.utm_source)
  );
}

/* ── Parse UTMs from current URL ──────────────────────────────────── */

function parseUTMsFromURL(): Partial<Record<UTMKey, string>> | null {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  const utms: Partial<Record<UTMKey, string>> = {};
  let found = false;

  for (const key of UTM_PARAMS) {
    const value = params.get(key);
    if (value) {
      utms[key] = value;
      found = true;
    }
  }

  return found ? utms : null;
}

/* ── Infer attribution from document.referrer ────────────────────── */

function inferUTMsFromReferrer(): Partial<Record<UTMKey, string>> | null {
  if (typeof window === 'undefined') return null;

  const referrer = document.referrer;
  if (!referrer) return null; // direct traffic — nothing to infer

  try {
    const refURL = new URL(referrer);
    const host = refURL.hostname.toLowerCase();

    // Check for Google Ads auto-tagging (gclid/gbraid/wbraid)
    const params = new URLSearchParams(window.location.search);
    const hasGclid =
      params.has('gclid') || params.has('gbraid') || params.has('wbraid');

    // Google
    if (host.includes('google.')) {
      return {
        utm_source: 'google',
        utm_medium: hasGclid ? 'cpc' : 'organic',
        ...(hasGclid && { utm_campaign: 'google_ads_auto' }),
      };
    }

    // Bing / Microsoft
    if (host.includes('bing.com')) {
      return {
        utm_source: 'bing',
        utm_medium: params.has('msclkid') ? 'cpc' : 'organic',
      };
    }

    // Yahoo
    if (host.includes('yahoo.com') || host.includes('search.yahoo')) {
      return { utm_source: 'yahoo', utm_medium: 'organic' };
    }

    // DuckDuckGo
    if (host.includes('duckduckgo.com')) {
      return { utm_source: 'duckduckgo', utm_medium: 'organic' };
    }

    // Facebook / Instagram / social
    if (host.includes('facebook.com') || host.includes('fb.com') || host.includes('l.facebook.com')) {
      return { utm_source: 'facebook', utm_medium: 'social' };
    }
    if (host.includes('instagram.com') || host.includes('l.instagram.com')) {
      return { utm_source: 'instagram', utm_medium: 'social' };
    }
    if (host.includes('tiktok.com')) {
      return { utm_source: 'tiktok', utm_medium: 'social' };
    }
    if (host.includes('twitter.com') || host.includes('t.co') || host.includes('x.com')) {
      return { utm_source: 'twitter', utm_medium: 'social' };
    }
    if (host.includes('linkedin.com')) {
      return { utm_source: 'linkedin', utm_medium: 'social' };
    }

    // Skip self-referrals — internal navigation must never overwrite the
    // real inbound source (facebook, google, etc.) with our own domain.
    if (isSelfHost(host)) {
      return null;
    }

    // Any other external site → referral
    return {
      utm_source: host.replace(/^www\./, ''),
      utm_medium: 'referral',
    };
  } catch {
    return null;
  }
}

/* ── localStorage helpers ─────────────────────────────────────────── */

function saveUTMData(key: string, data: UTMData): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // localStorage full or unavailable — fail silently
  }
}

function loadUTMData(key: string): UTMData | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as UTMData) : null;
  } catch {
    return null;
  }
}

/* ── Click IDs (fbclid, gclid, …) ─────────────────────────────────── */

// Ad-platform click identifiers. These live only in the inbound URL, never in
// UTM storage, and they are the single most valuable attribution signal we get
// — `fbclid` is what lets Meta tie a conversion back to a specific ad.
const CLICK_ID_PARAMS = ['fbclid', 'gclid', 'gbraid', 'wbraid', 'msclkid'] as const;

type ClickIdKey = (typeof CLICK_ID_PARAMS)[number];

// Stored with the capture timestamp, because Meta's `fbc` is
// `fb.1.<capturedAtMs>.<fbclid>` — the timestamp must be when the click was
// observed, not when we happen to send the event.
interface StoredClickId {
  v: string;
  ts: number; // epoch ms at capture
}

const STORAGE_CLICK_IDS = 'nwl_click_ids';

// Meta's click-attribution window is 7 days; a click ID older than that can no
// longer be attributed, so we stop carrying it around.
const CLICK_ID_TTL_MS = 7 * 24 * 60 * 60 * 1000;

// Legacy location — click IDs used to live in sessionStorage, one key each.
// Still read (never written) so a visitor mid-session isn't dropped on deploy.
const LEGACY_SESSION_PREFIX = 'nwl_track_';

function safeLocalGet(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeLocalSet(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* localStorage full or unavailable — fail silently */
  }
}

function safeSessionGet(key: string): string | null {
  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function loadClickIds(): Partial<Record<ClickIdKey, StoredClickId>> {
  try {
    const raw = safeLocalGet(STORAGE_CLICK_IDS);
    const parsed = raw ? (JSON.parse(raw) as Partial<Record<ClickIdKey, StoredClickId>>) : {};
    const now = Date.now();
    const fresh: Partial<Record<ClickIdKey, StoredClickId>> = {};
    for (const key of CLICK_ID_PARAMS) {
      const entry = parsed[key];
      if (entry?.v && typeof entry.ts === 'number' && now - entry.ts < CLICK_ID_TTL_MS) {
        fresh[key] = entry;
      }
    }
    return fresh;
  } catch {
    return {};
  }
}

/**
 * Capture click IDs from the current URL into localStorage, stamped with the
 * time of capture. First-touch wins within the TTL: a click ID is only
 * replaced by a *newer* click, never by a stale re-read.
 */
export function captureClickIds(): void {
  if (typeof window === 'undefined') return;

  const params = new URLSearchParams(window.location.search);
  const stored = loadClickIds();
  let changed = false;

  for (const key of CLICK_ID_PARAMS) {
    const value = params.get(key);
    if (!value) continue;
    // A fresh click always wins — it's the most recent ad interaction.
    if (stored[key]?.v !== value) {
      stored[key] = { v: value, ts: Date.now() };
      changed = true;
    }
  }

  if (changed) safeLocalSet(STORAGE_CLICK_IDS, JSON.stringify(stored));
}

/**
 * Current click IDs: live URL params first, then stored (localStorage, then
 * the legacy sessionStorage keys). Values only — see `getFbclid()` when the
 * capture timestamp matters.
 */
export function getClickIds(): Partial<Record<ClickIdKey, string>> {
  if (typeof window === 'undefined') return {};

  const params = new URLSearchParams(window.location.search);
  const stored = loadClickIds();
  const out: Partial<Record<ClickIdKey, string>> = {};

  for (const key of CLICK_ID_PARAMS) {
    const value =
      params.get(key) ||
      stored[key]?.v ||
      safeSessionGet(`${LEGACY_SESSION_PREFIX}${key}`) ||
      undefined;
    if (value) out[key] = value;
  }
  return out;
}

/**
 * `fbclid` plus the epoch-ms timestamp at which it was captured — the two
 * halves Meta needs to reconstruct `fbc` as `fb.1.<ts>.<fbclid>` when the
 * `_fbc` cookie is missing (pixel blocked, or a cross-tab WhatsApp handoff).
 */
export function getFbclid(): { fbclid: string; ts: number } | null {
  if (typeof window === 'undefined') return null;

  const fromUrl = new URLSearchParams(window.location.search).get('fbclid');
  if (fromUrl) return { fbclid: fromUrl, ts: Date.now() };

  const stored = loadClickIds().fbclid;
  if (stored) return { fbclid: stored.v, ts: stored.ts };

  const legacy = safeSessionGet(`${LEGACY_SESSION_PREFIX}fbclid`);
  // No capture time recorded for legacy entries — "now" is the safest guess
  // and stays inside the 7-day window.
  return legacy ? { fbclid: legacy, ts: Date.now() } : null;
}

/** First landing page of the visitor, independent of whether it carried UTMs. */
export function getFirstLandingPage(): string | null {
  if (typeof window === 'undefined') return null;
  return safeLocalGet(STORAGE_FIRST_LANDING);
}

/* ── Public API ───────────────────────────────────────────────────── */

/**
 * Capture UTMs from the current URL and persist to localStorage.
 * When no UTM params are present, infers source from document.referrer
 * (e.g. google/organic, facebook/social, other-site.com/referral).
 * Call on every page load (in layout or a top-level component).
 */
export function captureUTMs(): void {
  if (typeof window === 'undefined') return;

  // 0. Click IDs and the landing page are captured unconditionally — they
  //    matter even when the visit carries no UTMs at all (Meta auto-tagging
  //    appends `fbclid` without any utm_*).
  captureClickIds();
  if (!safeLocalGet(STORAGE_FIRST_LANDING)) {
    safeLocalSet(STORAGE_FIRST_LANDING, window.location.pathname);
  }

  // 1. Try explicit UTM params in URL first
  let utms = parseUTMsFromURL();

  // 2. Fallback: infer from referrer (organic, social, referral)
  if (!utms) {
    utms = inferUTMsFromReferrer();
  }

  if (!utms) return; // direct traffic with no referrer — nothing more to store

  const data: UTMData = {
    ...utms,
    landing_page: window.location.pathname,
    timestamp: new Date().toISOString(),
  };

  // First-touch: only set if not already stored
  if (!loadUTMData(STORAGE_FIRST)) {
    saveUTMData(STORAGE_FIRST, data);
  }

  // Last-touch: always update
  saveUTMData(STORAGE_LAST, data);
}

/** Retrieve first-touch UTM data, or null if never captured. */
export function getFirstTouchUTMs(): UTMData | null {
  const data = loadUTMData(STORAGE_FIRST);
  // Discard legacy self-referral entries written before the bug was fixed.
  return isSelfReferralData(data) ? null : data;
}

/** Retrieve last-touch UTM data, or null if never captured. */
export function getLastTouchUTMs(): UTMData | null {
  const data = loadUTMData(STORAGE_LAST);
  // Discard legacy self-referral entries written before the bug was fixed.
  return isSelfReferralData(data) ? null : data;
}

/* ── GHL iframe param passing ─────────────────────────────────────── */

/**
 * Build the GHL form iframe `src` with tracking params appended.
 *
 * Cross-origin iframes do NOT inherit the parent page's URL, so GHL can't
 * read utm_* / fbclid from window.location on its own. We append them
 * directly to the iframe src instead — the reliable channel.
 *
 * Sources merged, in priority order per key:
 *   1. Current inbound URL params        (freshest ad/campaign click)
 *   2. sessionStorage                     (survives internal navigation)
 *   3. Stored last-touch UTMs (localStorage, cross-session)
 * Plus first-touch UTMs as ft_* params and landing_page / ft_landing_page.
 *
 * Pass the bare form URL; returns it with a query string appended. `extra`
 * carries per-form values that aren't attribution — notably `event_id`, the
 * dedup key shared with the browser-side Meta Lead (see lib/meta-pixel.ts).
 */
export function buildGHLFormSrc(
  baseUrl: string,
  extra?: Record<string, string | undefined>,
): string {
  if (typeof window === 'undefined') return baseUrl;

  const url = new URL(window.location.href);
  const params = new URLSearchParams();

  // 1. Click IDs (fbclid, gclid, …) — live URL, then 7-day localStorage.
  //    captureClickIds() runs on every page load via <UTMCapture />, so this
  //    is a read; calling it here too keeps forms correct if the visitor
  //    landed straight on a route that renders before the capture effect.
  captureClickIds();
  for (const [key, value] of Object.entries(getClickIds())) {
    if (value) params.set(key, value);
  }

  // 2. Last-touch UTMs: prefer live inbound URL params, fall back to the
  //    value we persisted. getLastTouchUTMs() already strips self-referrals.
  const lastTouch = getLastTouchUTMs();
  for (const key of UTM_PARAMS) {
    const value = url.searchParams.get(key) || lastTouch?.[key];
    if (value) params.set(key, value);
  }
  if (lastTouch?.landing_page) params.set('landing_page', lastTouch.landing_page);

  // 3. First-touch UTMs as ft_ prefixed params (never overwritten once set).
  const firstTouch = getFirstTouchUTMs();
  if (firstTouch) {
    for (const key of UTM_PARAMS) {
      const value = firstTouch[key];
      if (value) params.set(`ft_${key}`, value);
    }
  }
  // First landing page is tracked separately so it survives an untagged
  // first visit, which is exactly the case where GHL shows "sin identificar".
  const firstLanding = firstTouch?.landing_page ?? getFirstLandingPage();
  if (firstLanding) params.set('ft_landing_page', firstLanding);

  // 4. Per-form extras (event_id, …).
  for (const [key, value] of Object.entries(extra ?? {})) {
    if (value) params.set(key, value);
  }

  const qs = params.toString();
  if (!qs) return baseUrl;
  return `${baseUrl}${baseUrl.includes('?') ? '&' : '?'}${qs}`;
}
