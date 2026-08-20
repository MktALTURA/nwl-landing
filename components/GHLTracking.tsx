'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';

/* ------------------------------------------------------------------ */
/*  GoHighLevel external tracking — everywhere EXCEPT the admin app    */
/*                                                                     */
/*  This script hooks EVERY <form> on the page: querySelectorAll on    */
/*  load, plus a MutationObserver for forms added later, plus a click  */
/*  listener on every submit button. Each submit is posted to GHL as   */
/*  an "external form" submission, which creates a contact — even when */
/*  the form has nothing to do with lead capture and posts nowhere.    */
/*                                                                     */
/*  The admin app (/admin/login, the job editor) is exactly that: real */
/*  <form> elements that submit via fetch(). Left alone, every staff   */
/*  login and every job posting created a blank `external_form`        */
/*  contact in the CRM.                                                */
/* ------------------------------------------------------------------ */

/**
 * Routes the tracker must never load on.
 *
 * ⚠️ Path gating only works because NOTHING links into /admin from a public
 * page — every visit is a fresh document load, so the script is never fetched
 * and its observer never exists. If you ever add a <Link href="/admin"> to a
 * public page, this protection silently dies: the script will already be
 * running from the previous page and its MutationObserver will pick the admin
 * forms up on client-side navigation.
 *
 * That is exactly why /padres is NOT in this list. It is linked from
 * /campus/*, so gating could not have worked there — its password gate had to
 * stop being a <form> instead. See components/padres/PasswordGate.tsx.
 */
const UNTRACKED_PREFIXES = ['/admin'];

export default function GHLTracking() {
  const pathname = usePathname();

  if (pathname && UNTRACKED_PREFIXES.some((p) => pathname.startsWith(p))) {
    return null;
  }

  return (
    <Script
      src="https://link.msgsndr.com/js/external-tracking.js"
      data-tracking-id="tk_f326b262f9234006b24833e8cfb32b39"
      strategy="lazyOnload"
    />
  );
}
