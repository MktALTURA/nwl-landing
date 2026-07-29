'use client';

import { useEffect, useRef, type RefObject } from 'react';
import { getFirstTouchUTMs, getLastTouchUTMs } from '@/lib/utm';
import { fireMetaEvent } from '@/lib/meta-pixel';

/* ------------------------------------------------------------------ */
/*  GHL Form Submission Tracking Hook                                  */
/*                                                                     */
/*  Dual-signal detection:                                             */
/*   1. postMessage from GHL iframe (primary — catches                 */
/*      set-sticky-contacts which fires after form submit)             */
/*   2. MutationObserver on iframe height shrink (fallback)            */
/*                                                                     */
/*  Fires conversion events via dataLayer + gtag.                      */
/*  NEVER changes the browser URL.                                     */
/* ------------------------------------------------------------------ */

const GHL_TRUSTED_ORIGINS = [
  'https://api.leadconnectorhq.com',
  'https://widgets.gohighlevel.com',
  'https://link.msgsndr.com',
  // GHL white-label domain — serves the careers and partner-application forms.
  // Without it those submissions post a message we silently ignore.
  'https://api.nwl.com.mx',
];

// Browser-side Meta `Lead`. Off unless explicitly enabled, because it only
// deduplicates correctly once GHL echoes our `event_id` back on its own
// server-side Lead. Flip the env var off to fall back to server-only in one
// redeploy if Events Manager shows Lead volume doubling.
const BROWSER_LEAD_ENABLED = process.env.NEXT_PUBLIC_META_BROWSER_LEAD === 'true';

function fireConversion(formLabel: string, eventId?: string) {
  console.log(`[NWL] Form submission detected — ${formLabel}`);

  const firstTouch = getFirstTouchUTMs();
  const lastTouch = getLastTouchUTMs();

  // 1. dataLayer for GTM / gtag — include full UTM attribution
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'nwl_form_submission',
    form_label: formLabel,
    // Last-touch attribution
    ...(lastTouch && {
      utm_source: lastTouch.utm_source,
      utm_medium: lastTouch.utm_medium,
      utm_campaign: lastTouch.utm_campaign,
      utm_term: lastTouch.utm_term,
      utm_content: lastTouch.utm_content,
    }),
    // First-touch attribution (prefixed to avoid collision)
    ...(firstTouch && {
      ft_utm_source: firstTouch.utm_source,
      ft_utm_medium: firstTouch.utm_medium,
      ft_utm_campaign: firstTouch.utm_campaign,
    }),
  });

  // 2. Google Ads conversion (when gtag is installed)
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'conversion', {
      send_to: 'AW-17936345870/H9S4CJelm40cEI7W2-hC',
    });

    // 3. GA4 conversion events (G-0D697PBCB2 shares the same gtag).
    // GA4's enhanced-measurement form_submit can't see inside the GHL
    // iframe, so we fire it manually. generate_lead is GA4's recommended
    // lead event — mark it as a Key Event in GA4 admin.
    const ga4Params = {
      form_label: formLabel,
      ...(lastTouch && {
        utm_source: lastTouch.utm_source,
        utm_medium: lastTouch.utm_medium,
        utm_campaign: lastTouch.utm_campaign,
      }),
    };
    window.gtag('event', 'form_submit', ga4Params);
    window.gtag('event', 'generate_lead', ga4Params);
  }

  // 4. Meta `Lead` — browser pixel AND our own server-side CAPI, sharing
  //    `eventId` so Meta collapses them into one event.
  //
  // GHL's Conversions API action cannot send `event_id` (its custom mapping
  // exposes FBCLID only), so it cannot deduplicate against us — its event is
  // therefore renamed to `SubmitApplication` and we own `Lead` outright.
  //
  // Owning both halves is what makes the server copy safe: the dedup key is
  // literally the same variable on both sides. It also buys back the visitors
  // the browser pixel loses — an ad blocker that kills connect.facebook.net
  // does not touch a same-origin POST to /api/meta-capi, and that route
  // rebuilds `fbc` from the stored fbclid when the cookie is missing.
  if (BROWSER_LEAD_ENABLED && eventId) {
    fireMetaEvent('Lead', { form_label: formLabel }, { eventId });
  }
}

export function useGHLFormTracking(
  formContainerRef: RefObject<HTMLDivElement | null>,
  formLabel: string,
  /** Dedup id already handed to GHL via the iframe `event_id` param. */
  eventId?: string,
) {
  const submittedRef = useRef(false);
  const mountTimeRef = useRef(Date.now());
  // Whether the visitor has ever put focus inside the form iframe.
  const interactedRef = useRef(false);

  // ── Signal 0: did the visitor actually touch the form? ──
  // We can't see into a cross-origin iframe, but focus tells us enough: when
  // the window loses focus and the active element is our iframe, the click
  // went into the form. Nothing can be submitted without that happening
  // first, so this is the gate that keeps GHL's chattier lifecycle messages
  // from being mistaken for a conversion.
  useEffect(() => {
    const handleBlur = () => {
      const container = formContainerRef.current;
      const active = document.activeElement;
      if (container && active instanceof HTMLIFrameElement && container.contains(active)) {
        interactedRef.current = true;
      }
    };
    window.addEventListener('blur', handleBlur);
    return () => window.removeEventListener('blur', handleBlur);
  }, [formContainerRef]);

  // ── Signal 1: postMessage from GHL iframe ──
  useEffect(() => {
    mountTimeRef.current = Date.now();
    const originalPath = window.location.pathname + window.location.search;

    const handleMessage = (event: MessageEvent) => {
      if (!GHL_TRUSTED_ORIGINS.includes(event.origin)) return;

      let data = event.data;

      // Skip iFrameSizer string messages
      if (typeof data === 'string') {
        if (data.startsWith('[iFrameSizer]')) return;
        try { data = JSON.parse(data); } catch { return; }
      }

      // GHL sends set-sticky-contacts both on page load (syncing stored
      // contact data) and after actual form submission. Nobody can fill and
      // submit a form in under 5 seconds, so ignore early messages.
      const tooEarly = Date.now() - mountTimeRef.current < 5000;

      // Messages that mean "submitted" and nothing else — trusted on their own.
      const explicit =
        data?.type === 'form:submit' ||
        data?.type === 'FORM_SUBMITTED' ||
        data?.event === 'form_submitted';

      // Lifecycle messages that merely *correlate* with submission. GHL emits
      // set-sticky-contacts on load too, and it has been observed arriving
      // well past the 5s gate — so these additionally require that the
      // visitor actually interacted with the form.
      const heuristic =
        interactedRef.current &&
        ((Array.isArray(data) && data[0] === 'set-sticky-contacts' && data[1] === '_ud') ||
          (Array.isArray(data) && data[0] === 'modify-parent-url') ||
          data?.action === 'modify-parent-url');

      const isSubmission = !tooEarly && (explicit || heuristic);

      if (isSubmission && !submittedRef.current) {
        submittedRef.current = true;
        fireConversion(formLabel, eventId);

        // If GHL changed the URL via modify-parent-url, restore it.
        setTimeout(() => {
          if (window.location.pathname !== originalPath) {
            window.history.replaceState(null, '', originalPath);
          }
        }, 100);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [formLabel, eventId]);

  // ── Signal 2: MutationObserver on iframe height shrink (fallback) ──
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const container = formContainerRef.current;
      if (!container) return;
      const iframe = container.querySelector('iframe');
      if (!iframe) return;
      const h = parseInt(iframe.style.height, 10);

      // GHL shrinks iframe after submission — enforce minimum height.
      // Same 5-second gate as Signal 1, plus the interaction gate: a form the
      // visitor never touched cannot have been submitted, whatever the embed
      // does to its own height.
      const tooEarly = Date.now() - mountTimeRef.current < 5000;
      if (h > 0 && h < 500) {
        iframe.style.height = '500px';
        if (!submittedRef.current && !tooEarly && interactedRef.current) {
          submittedRef.current = true;
          fireConversion(formLabel, eventId);
        }
      }
    });

    const container = formContainerRef.current;
    if (container) {
      observer.observe(container, {
        subtree: true,
        attributes: true,
        attributeFilter: ['style'],
      });
    }
    return () => observer.disconnect();
  }, [formContainerRef, formLabel, eventId]);
}
