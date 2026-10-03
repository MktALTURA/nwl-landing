/* ------------------------------------------------------------------ */
/*  GA4 event sender shared by every tracker on the site.              */
/*                                                                     */
/*  Moved out of components/EngagementTracking.tsx so native UI (the   */
/*  becas calculator and application) can send events the same safe   */
/*  way. Behaviour is unchanged.                                       */
/*                                                                     */
/*  `window.gtag?.('event', ...)` looks safe and is not: the gtag      */
/*  script is `afterInteractive`, so it has NOT loaded when a mount    */
/*  effect runs, and the optional call silently drops the event. That  */
/*  is how `experiment_impression` — the denominator for every         */
/*  experiment — recorded zero during the smoke test while the code    */
/*  read as correct.                                                   */
/*                                                                     */
/*  Pushing to dataLayer directly is not a fix either: an event queued */
/*  ahead of gtag('config') is never delivered to the measurement ID.  */
/*  So we wait for gtag itself, which the init script defines in the   */
/*  same breath as its js/config calls.                                */
/* ------------------------------------------------------------------ */

const pending: Array<[string, Record<string, unknown>]> = [];
let draining = false;

export function sendGA4Event(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;
  if (typeof window.gtag === 'function') {
    window.gtag('event', name, params);
    return;
  }
  pending.push([name, params]);
  if (draining) return;
  draining = true;

  const startedAt = Date.now();
  const timer = setInterval(() => {
    if (typeof window.gtag === 'function') {
      clearInterval(timer);
      draining = false;
      while (pending.length) {
        const next = pending.shift();
        if (next) window.gtag('event', next[0], next[1]);
      }
    } else if (Date.now() - startedAt > 15000) {
      // gtag blocked (ad blocker, consent tooling). Drop rather than leak.
      clearInterval(timer);
      draining = false;
      pending.length = 0;
    }
  }, 200);
}
