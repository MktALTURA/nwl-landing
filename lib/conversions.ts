'use client';

import { getFirstTouchUTMs, getLastTouchUTMs } from '@/lib/utm';
import { fireMetaEvent } from '@/lib/meta-pixel';
import { sendGA4Event } from '@/lib/analytics';

/* ------------------------------------------------------------------ */
/*  Lead conversion bundle, shared by the GHL iframe tracker and the    */
/*  native becas application. Moved out of useGHLFormTracking.ts; the   */
/*  behaviour for the iframe forms is unchanged.                        */
/*                                                                     */
/*  Two kinds of form share this:                                       */
/*   - 'lead'        admissions enquiries. Google Ads conversion,      */
/*                   GA4 generate_lead / form_submit, Meta Lead.       */
/*   - 'application' careers CVs and partner applications. One GA4     */
/*                   `application_submit` and nothing else.            */
/* ------------------------------------------------------------------ */

export type FormKind = 'lead' | 'application';

/** Which signal decided "this was a submission". Sent with every event so an
 *  over- or under-count can be pinned on one signal by reconciling GA4 against
 *  GHL's own submission log, instead of guessing. `native` = our own form
 *  received a 2xx from our own API. */
export type DetectSignal = 'explicit' | 'sticky' | 'modify_url' | 'height' | 'native';

export interface Detection {
  signal: DetectSignal;
  /** Whole seconds between first focus inside the form and the fire. */
  secsSinceInteract: number | null;
}

export function toDetection(signal: DetectSignal, interactedAt: number | null): Detection {
  return {
    signal,
    secsSinceInteract: interactedAt === null ? null : Math.round((Date.now() - interactedAt) / 1000),
  };
}

// Browser-side Meta `Lead`. Off unless explicitly enabled. Flip the env var
// off to fall back to server-only in one redeploy if Events Manager shows
// Lead volume doubling.
const BROWSER_LEAD_ENABLED = process.env.NEXT_PUBLIC_META_BROWSER_LEAD === 'true';

export interface LeadUserData {
  email?: string;
  /** Digits with country code. */
  phone?: string;
}

export function fireLeadConversion(
  formLabel: string,
  kind: FormKind,
  detection: Detection,
  eventId?: string,
  userData?: LeadUserData,
) {
  console.log(`[NWL] Form submission detected — ${formLabel} (${kind}, ${detection.signal})`);

  const firstTouch = getFirstTouchUTMs();
  const lastTouch = getLastTouchUTMs();

  const detectParams = {
    detect_signal: detection.signal,
    ...(detection.secsSinceInteract !== null && { secs_since_interact: detection.secsSinceInteract }),
  };

  // 1. dataLayer for GTM / gtag — include full UTM attribution
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: kind === 'lead' ? 'nwl_form_submission' : 'nwl_application_submission',
    form_label: formLabel,
    ...detectParams,
    ...(lastTouch && {
      utm_source: lastTouch.utm_source,
      utm_medium: lastTouch.utm_medium,
      utm_campaign: lastTouch.utm_campaign,
      utm_term: lastTouch.utm_term,
      utm_content: lastTouch.utm_content,
    }),
    ...(firstTouch && {
      ft_utm_source: firstTouch.utm_source,
      ft_utm_medium: firstTouch.utm_medium,
      ft_utm_campaign: firstTouch.utm_campaign,
    }),
  });

  const ga4Params = {
    form_label: formLabel,
    ...detectParams,
    ...(lastTouch && {
      utm_source: lastTouch.utm_source,
      utm_medium: lastTouch.utm_medium,
      utm_campaign: lastTouch.utm_campaign,
    }),
  };

  // Careers / partner applications stop here.
  if (kind === 'application') {
    sendGA4Event('application_submit', ga4Params);
    return;
  }

  // 2. Google Ads conversion
  sendGA4Event('conversion', { send_to: 'AW-17936345870/H9S4CJelm40cEI7W2-hC' });

  // 3. GA4 conversion events. generate_lead is GA4's recommended lead event.
  sendGA4Event('form_submit', ga4Params);
  sendGA4Event('generate_lead', ga4Params);

  // 4. Meta `Lead` — browser pixel AND our own server-side CAPI, sharing
  //    `eventId` so Meta collapses them into one event. GHL's CAPI action
  //    cannot send `event_id`, so its event is renamed `SubmitApplication`
  //    and we own `Lead` outright.
  if (BROWSER_LEAD_ENABLED && eventId) {
    fireMetaEvent('Lead', { form_label: formLabel }, { eventId, userData });
  }
}
