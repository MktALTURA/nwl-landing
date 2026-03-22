'use client';

import { useEffect, useRef, type RefObject } from 'react';
import { track } from '@vercel/analytics';
import { getFirstTouchUTMs, getLastTouchUTMs } from '@/lib/utm';

/* ------------------------------------------------------------------ */
/*  GHL Form Submission Tracking Hook                                  */
/*                                                                     */
/*  Dual-signal detection:                                             */
/*   1. postMessage from GHL iframe (primary — catches                 */
/*      set-sticky-contacts which fires after form submit)             */
/*   2. MutationObserver on iframe height shrink (fallback)            */
/*                                                                     */
/*  Fires conversion events via dataLayer + gtag + Vercel Analytics.   */
/*  NEVER changes the browser URL.                                     */
/* ------------------------------------------------------------------ */

const GHL_TRUSTED_ORIGINS = [
  'https://api.leadconnectorhq.com',
  'https://widgets.gohighlevel.com',
  'https://link.msgsndr.com',
];

function fireConversion(formLabel: string) {
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
  }

  // 3. Vercel Analytics custom event — include UTM source for dashboards
  try {
    track('form_submission', {
      form: formLabel,
      ...(lastTouch?.utm_source && { utm_source: lastTouch.utm_source }),
      ...(lastTouch?.utm_medium && { utm_medium: lastTouch.utm_medium }),
      ...(lastTouch?.utm_campaign && { utm_campaign: lastTouch.utm_campaign }),
      ...(firstTouch?.utm_source && { ft_source: firstTouch.utm_source }),
    });
  } catch {
    // Vercel Analytics unavailable — no-op
  }
}

export function useGHLFormTracking(
  formContainerRef: RefObject<HTMLDivElement | null>,
  formLabel: string,
) {
  const submittedRef = useRef(false);
  const mountTimeRef = useRef(Date.now());

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

      const isSubmission = !tooEarly && (
        (Array.isArray(data) && data[0] === 'set-sticky-contacts' && data[1] === '_ud') ||
        (Array.isArray(data) && data[0] === 'modify-parent-url') ||
        (data?.action === 'modify-parent-url') ||
        (data?.type === 'form:submit') ||
        (data?.event === 'form_submitted')
      );

      if (isSubmission && !submittedRef.current) {
        submittedRef.current = true;
        fireConversion(formLabel);

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
  }, [formLabel]);

  // ── Signal 2: MutationObserver on iframe height shrink (fallback) ──
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const container = formContainerRef.current;
      if (!container) return;
      const iframe = container.querySelector('iframe');
      if (!iframe) return;
      const h = parseInt(iframe.style.height, 10);

      // GHL shrinks iframe after submission — enforce minimum height.
      // Same 5-second gate as Signal 1 to avoid false positives on load.
      const tooEarly = Date.now() - mountTimeRef.current < 5000;
      if (h > 0 && h < 500) {
        iframe.style.height = '500px';
        if (!submittedRef.current && !tooEarly) {
          submittedRef.current = true;
          fireConversion(formLabel);
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
  }, [formContainerRef, formLabel]);
}
