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

    // Skip self-referrals
    if (
      host.includes('newlandschool.com') ||
      host.includes('newlandschool.edu.mx') ||
      host.includes('localhost') ||
      host.includes('vercel.app')
    ) {
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
  return loadUTMData(STORAGE_FIRST);
}

/** Retrieve last-touch UTM data, or null if never captured. */
export function getLastTouchUTMs(): UTMData | null {
  return loadUTMData(STORAGE_LAST);
}

/**
 * Inject stored UTMs into the current URL via history.replaceState.
 *
 * Last-touch UTMs → standard params (utm_source, etc.)
 * First-touch UTMs → prefixed params (ft_utm_source, etc.)
 * Landing pages → landing_page & ft_landing_page params
 *
 * Returns a cleanup function that restores the original URL.
 * Call this BEFORE loading form_embed.js so GHL picks up the params.
 */
export function injectUTMsIntoURL(): (() => void) | null {
  if (typeof window === 'undefined') return null;

  const originalURL = window.location.pathname + window.location.search;

  const firstTouch = getFirstTouchUTMs();
  const lastTouch = getLastTouchUTMs();

  if (!firstTouch && !lastTouch) return null;

  // Start from current params (preserve non-UTM params like locale, etc.)
  const params = new URLSearchParams(window.location.search);

  // Inject last-touch as standard UTM params (only if not already in URL)
  if (lastTouch) {
    for (const key of UTM_PARAMS) {
      const value = lastTouch[key];
      if (value && !params.has(key)) {
        params.set(key, value);
      }
    }
    // Pass landing page so GHL stores which page brought the lead in
    if (lastTouch.landing_page) {
      params.set('landing_page', lastTouch.landing_page);
    }
  }

  // Inject first-touch as ft_ prefixed params
  if (firstTouch) {
    for (const key of UTM_PARAMS) {
      const value = firstTouch[key];
      if (value) {
        params.set(`ft_${key}`, value);
      }
    }
    if (firstTouch.landing_page) {
      params.set('ft_landing_page', firstTouch.landing_page);
    }
  }

  const newSearch = params.toString();
  const newURL = newSearch
    ? `${window.location.pathname}?${newSearch}`
    : window.location.pathname;

  if (newURL !== originalURL) {
    window.history.replaceState(null, '', newURL);
  }

  // Return cleanup that restores original URL
  return () => {
    window.history.replaceState(null, '', originalURL);
  };
}
