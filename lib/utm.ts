/* ------------------------------------------------------------------ */
/*  UTM Tracking Utility                                               */
/*                                                                     */
/*  Captures, persists, and injects UTM parameters for attribution.    */
/*  First-touch UTMs are stored once (never overwritten).              */
/*  Last-touch UTMs are updated on every visit that carries UTMs.      */
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

function parseUTMsFromURL(): Record<UTMKey, string> | null {
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

  return found ? (utms as Record<UTMKey, string>) : null;
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
 * Call on every page load (in layout or a top-level component).
 */
export function captureUTMs(): void {
  if (typeof window === 'undefined') return;

  const utms = parseUTMsFromURL();
  if (!utms) return;

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
  }

  // Inject first-touch as ft_ prefixed params
  if (firstTouch) {
    for (const key of UTM_PARAMS) {
      const value = firstTouch[key];
      if (value) {
        params.set(`ft_${key}`, value);
      }
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
