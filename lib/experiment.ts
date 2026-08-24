/* ------------------------------------------------------------------ */
/*  A/B experiment harness                                             */
/*                                                                     */
/*  Rebuilt 2026-08-25 after the hero photo test (Jul–Aug 2026) came   */
/*  back inconclusive and the post-mortem found four assignment bugs.  */
/*  Each rule below exists because the old harness broke it:           */
/*                                                                     */
/*   1. Never default to the control on error. The old code did        */
/*      `catch (e) { v = 'a' }`, which deterministically routed every  */
/*      Safari-private / ITP-blocked / in-app-webview visitor into the */
/*      control arm. iOS is ~52% of this site's traffic; the split     */
/*      came out 51.2/48.8 (SRM p=0.06). Random on failure, always.    */
/*                                                                     */
/*   2. Scope assignment to the page under test. The old script ran in */
/*      the root layout and wrote a USER-scoped GA4 property, so GA4   */
/*      tagged every later session — including the 53% that landed on  */
/*      /kinder, /middle-school, /beneficios — with a variant of a     */
/*      hero they never saw. That manufactured a "significant" +198%   */
/*      on /middle-school, a page the test did not touch.              */
/*                                                                     */
/*   3. Event-scoped GA4 params, not user properties. `exp_id` /       */
/*      `exp_variant` ride only on events fired from the scoped page.  */
/*                                                                     */
/*   4. Cookie first, localStorage as backup. localStorage alone lost  */
/*      stickiness in Meta in-app browsers (13% of sessions, most of   */
/*      Paid Social), which re-rolled the coin per visit and           */
/*      cross-contaminated both arms.                                  */
/*                                                                     */
/*   5. Variants must be performance-equivalent. The old variant B     */
/*      shipped a preload the control did not, so the test confounded  */
/*      creative with LCP. If a variant adds bytes, either give the    */
/*      other arm equivalent weight or report LCP per arm as a         */
/*      guardrail metric.                                              */
/* ------------------------------------------------------------------ */

export type ExperimentConfig = {
  /** Stable id — GA4 `exp_id`, Clarity tag suffix, cookie key suffix. */
  id: string;
  /** Variant keys. First entry is the control by convention only — the
   *  assignment is uniform and has no fallback preference (rule 1). */
  variants: string[];
  /** Exact pathname the experiment runs on. Assignment does not fire
   *  anywhere else, so no other page can be attributed to it (rule 2). */
  scope: string;
};

/**
 * The experiment currently in the field, or `null` when none is running.
 *
 * `null` today: the hero photo test was ended 2026-08-25 (inconclusive —
 * no cut reached significance; the site can only resolve ~+40-50% effects
 * on lead CVR at current traffic, so a background image was never
 * detectable). The dawn-gradient hero now serves 100% of traffic.
 */
export const ACTIVE_EXPERIMENT: ExperimentConfig | null = null;

/**
 * Inline, render-blocking assignment snippet. Must run before first paint
 * so the losing variant never flashes; keep it in the document head/body
 * top, not in a deferred bundle.
 */
export function experimentSnippet(cfg: ExperimentConfig): string {
  return `
(function () {
  var ID = ${JSON.stringify(cfg.id)};
  var VARIANTS = ${JSON.stringify(cfg.variants)};
  var SCOPE = ${JSON.stringify(cfg.scope)};

  // Rule 2 — assignment exists only on the page under test.
  var path = location.pathname.replace(/\\/+$/, '') || '/';
  if (path !== SCOPE) return;

  var KEY = 'nwl_exp_' + ID;
  var ok = function (x) { return VARIANTS.indexOf(x) !== -1; };
  var v = null;

  // Rule 4 — cookie is the source of truth, localStorage only backs it up.
  try {
    var m = document.cookie.match(new RegExp('(?:^|; )' + KEY + '=([^;]*)'));
    if (m) v = decodeURIComponent(m[1]);
  } catch (e) {}
  if (!ok(v)) { try { v = localStorage.getItem(KEY); } catch (e) {} }

  // Rule 1 — random on miss AND on error. Never biased toward an arm.
  if (!ok(v)) v = VARIANTS[Math.floor(Math.random() * VARIANTS.length)];

  try { document.cookie = KEY + '=' + v + ';path=/;max-age=31536000;SameSite=Lax'; } catch (e) {}
  try { localStorage.setItem(KEY, v); } catch (e) {}

  document.documentElement.setAttribute('data-exp', ID);
  document.documentElement.setAttribute('data-exp-variant', v);

  window.clarity = window.clarity || function () { (window.clarity.q = window.clarity.q || []).push(arguments); };
  window.clarity('set', 'exp_' + ID, v);

  // Rule 3 — event-scoped params. gtag 'set' state is applied to events
  // fired later in this page view; the impression event itself is sent
  // from EngagementTracking, after gtag config has run.
  // gtag() must push the arguments object itself — a plain array is not
  // an equivalent dataLayer entry.
  window.dataLayer = window.dataLayer || [];
  function g() { window.dataLayer.push(arguments); }
  g('set', { exp_id: ID, exp_variant: v });
})();`;
}
