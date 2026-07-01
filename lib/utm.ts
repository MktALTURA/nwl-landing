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

/* ── Self-referral detection ──────────────────────────────────────── */

// Our own hosts. Traffic coming from these is internal navigation, not a
// real referral — it must NEVER become a utm_source, or it overwrites the
// genuine inbound source (e.g. facebook) in last-touch storage.
// The current hostname is added dynamically at call time so this never
// goes stale when the production domain changes.
const SELF_HOSTS = [
  'nwl.com.mx',
  'newlandschool.com',
  'newlandschool.edu.mx',
  'localhost',
  'vercel.app',
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

/* ── Public API ───────────────────────────────────────────────────── */

/**
 * Capture UTMs from the current URL and persist to localStorage.
 * When no UTM params are present, infers source from document.referrer
 * (e.g. google/organic, facebook/social, other-site.com/referral).
 * Call on every page load (in layout or a top-level component).
 */
export function captureUTMs(): void {
  if (typeof window === 'undefined') return;

  // 1. Try explicit UTM params in URL first
  let utms = parseUTMsFromURL();

  // 2. Fallback: infer from referrer (organic, social, referral)
  if (!utms) {
    utms = inferUTMsFromReferrer();
  }

  if (!utms) return; // direct traffic with no referrer — nothing to store

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

// Click IDs and other non-UTM tracking params worth forwarding to GHL.
// These live only in the inbound URL (never in our UTM storage), so we
// persist them to sessionStorage to survive internal navigation within
// the visit.
const CLICK_ID_PARAMS = ['fbclid', 'gclid', 'gbraid', 'wbraid', 'msclkid'];
const SESSION_PREFIX = 'nwl_track_';

function safeSessionGet(key: string): string | null {
  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSessionSet(key: string, value: string): void {
  try {
    sessionStorage.setItem(key, value);
  } catch {
    /* sessionStorage unavailable — fail silently */
  }
}

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
 * Pass the bare form URL; returns it with a query string appended.
 */
export function buildGHLFormSrc(baseUrl: string): string {
  if (typeof window === 'undefined') return baseUrl;

  const url = new URL(window.location.href);
  const params = new URLSearchParams();

  // 1. Click IDs (fbclid, gclid, …): capture from URL → sessionStorage,
  //    then read back so they persist across internal navigation.
  for (const key of CLICK_ID_PARAMS) {
    const fromUrl = url.searchParams.get(key);
    if (fromUrl) safeSessionSet(`${SESSION_PREFIX}${key}`, fromUrl);
    const value = fromUrl || safeSessionGet(`${SESSION_PREFIX}${key}`);
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
    if (firstTouch.landing_page) params.set('ft_landing_page', firstTouch.landing_page);
  }

  const qs = params.toString();
  if (!qs) return baseUrl;
  return `${baseUrl}${baseUrl.includes('?') ? '&' : '?'}${qs}`;
}
