'use client';

import { useEffect, useRef, type RefObject } from 'react';
import { fireLeadConversion, toDetection, type DetectSignal, type FormKind } from '@/lib/conversions';

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
/*                                                                     */
/*  Two kinds of form share this hook:                                 */
/*   - 'lead'        admissions enquiries. Google Ads conversion,      */
/*                   GA4 generate_lead / form_submit, Meta Lead.       */
/*   - 'application' careers CVs and partner applications. One GA4     */
/*                   `application_submit` and nothing else — a job     */
/*                   applicant is not an admissions lead, and counting */
/*                   them as one was ~30% of reported "leads".         */
/* ------------------------------------------------------------------ */

export type GHLFormKind = FormKind;

export interface GHLFormTrackingOptions {
  /** Dedup id already handed to GHL via the iframe `event_id` param. */
  eventId?: string;
  /** Defaults to 'lead'. */
  kind?: GHLFormKind;
}

const GHL_TRUSTED_ORIGINS = [
  'https://api.leadconnectorhq.com',
  'https://widgets.gohighlevel.com',
  'https://link.msgsndr.com',
  // GHL white-label domain — serves the careers and partner-application forms.
  // Without it those submissions post a message we silently ignore.
  'https://api.nwl.com.mx',
];

// The conversion bundle itself (dataLayer, Ads, GA4, Meta Lead) lives in
// lib/conversions.ts so the native becas application fires the exact same
// events. This file only decides WHEN an iframe submission happened.
const fireConversion = fireLeadConversion;

export function useGHLFormTracking(
  formContainerRef: RefObject<HTMLDivElement | null>,
  formLabel: string,
  { eventId, kind = 'lead' }: GHLFormTrackingOptions = {},
) {
  const submittedRef = useRef(false);
  const mountTimeRef = useRef(Date.now());
  // When the visitor first put focus inside the CURRENT form iframe (null =
  // never). Cleared whenever the iframe is rebuilt — see Signal 2's observer.
  const interactedAtRef = useRef<number | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

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
        if (interactedAtRef.current === null) interactedAtRef.current = Date.now();
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

      // Only this hook's own form. Every GHL frame on the page posts to the
      // same `window` — a second form, the chat widget, an iframe that has
      // since been torn down — and GHL's messages come straight from the form
      // iframe's window (verified live), so `source` identifies it exactly.
      const ownIframe = formContainerRef.current?.querySelector('iframe');
      if (!ownIframe || event.source !== ownIframe.contentWindow) return;

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
      const sticky =
        Array.isArray(data) && data[0] === 'set-sticky-contacts' && data[1] === '_ud';
      const modifyUrl =
        (Array.isArray(data) && data[0] === 'modify-parent-url') ||
        data?.action === 'modify-parent-url';
      const heuristic = interactedAtRef.current !== null && (sticky || modifyUrl);

      const isSubmission = !tooEarly && (explicit || heuristic);

      if (isSubmission && !submittedRef.current) {
        submittedRef.current = true;
        const signal: DetectSignal = explicit ? 'explicit' : sticky ? 'sticky' : 'modify_url';
        fireConversion(formLabel, kind, toDetection(signal, interactedAtRef.current), eventId);

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
  }, [formContainerRef, formLabel, eventId, kind]);

  // ── Signal 2: MutationObserver on iframe height shrink (fallback) ──
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const container = formContainerRef.current;
      if (!container) return;
      const iframe = container.querySelector('iframe');
      if (!iframe) return;

      // The form components tear the iframe down and rebuild it on a language
      // switch. Focus and age belong to the iframe, not to the hook: without
      // this, a visitor who touched the old form carries "interacted" and
      // "older than 5s" over to a brand-new one that is still loading.
      if (iframe !== iframeRef.current) {
        iframeRef.current = iframe;
        interactedAtRef.current = null;
        mountTimeRef.current = Date.now();
        return;
      }

      const h = parseInt(iframe.style.height, 10);

      // GHL shrinks iframe after submission — enforce minimum height.
      // Same 5-second gate as Signal 1, plus the interaction gate: a form the
      // visitor never touched cannot have been submitted, whatever the embed
      // does to its own height.
      const tooEarly = Date.now() - mountTimeRef.current < 5000;
      if (h > 0 && h < 500) {
        iframe.style.height = '500px';
        if (!submittedRef.current && !tooEarly && interactedAtRef.current !== null) {
          submittedRef.current = true;
          fireConversion(formLabel, kind, toDetection('height', interactedAtRef.current), eventId);
        }
      }
    });

    const container = formContainerRef.current;
    if (container) {
      // The iframe is normally already in place (the component builds it in an
      // earlier effect) — adopt it so its first style mutation isn't mistaken
      // for a rebuild.
      iframeRef.current = container.querySelector('iframe');
      observer.observe(container, {
        subtree: true,
        childList: true,
        attributes: true,
        attributeFilter: ['style'],
      });
    }
    return () => observer.disconnect();
  }, [formContainerRef, formLabel, eventId, kind]);
}
