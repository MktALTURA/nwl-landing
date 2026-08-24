'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/* ------------------------------------------------------------------ */
/*  Engagement tracking — CTA clicks, scroll depth, hero exit           */
/*                                                                     */
/*  Added 2026-08-25. The hero photo A/B post-mortem found that the     */
/*  two things you most want to measure about a hero were both          */
/*  invisible:                                                          */
/*                                                                     */
/*   • The hero's PRIMARY CTA is `href="#admissions"` — a same-page     */
/*     anchor. GA4 enhanced measurement only records OUTBOUND link      */
/*     clicks, so the main button in the hero left no trace at all.     */
/*     Every CTA already carries a `data-cta` attribute and nothing     */
/*     read it. This wires them up as `cta_click`.                      */
/*                                                                     */
/*   • GA4 enhanced measurement `scroll` fires once, at 90% depth —     */
/*     it means "read to the bottom", not "got past the hero". It       */
/*     structurally cannot measure hero engagement, so the old          */
/*     report's flat 26.8% vs 26.5% said nothing about the hero.        */
/*     This adds 25/50/75 milestones plus an explicit `hero_exit`.      */
/*                                                                     */
/*  `hero_exit` is the metric to run future hero tests on: at ~27%      */
/*  baseline it resolves a +15% effect on a month of traffic, where     */
/*  lead CVR needs ~+50%. Only trust it once the assignment split is    */
/*  clean — at that sensitivity a population skew reads as a win.       */
/* ------------------------------------------------------------------ */

const SCROLL_MILESTONES = [25, 50, 75] as const;

/**
 * Send a GA4 event, queueing until gtag exists.
 *
 * `window.gtag?.('event', ...)` looks safe and is not: the gtag script is
 * `afterInteractive`, so it has NOT loaded when a mount effect runs, and the
 * optional call silently drops the event. That is how `experiment_impression`
 * — the denominator for every experiment — recorded zero during the smoke
 * test while the code read as correct.
 *
 * Pushing to dataLayer directly is not a fix either: an event queued ahead of
 * gtag('config') is never delivered to the measurement ID. So we wait for
 * gtag itself, which the init script defines in the same breath as its
 * js/config calls.
 */
const pending: Array<[string, Record<string, unknown>]> = [];
let draining = false;

function sendEvent(name: string, params: Record<string, unknown>) {
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

export default function EngagementTracking() {
  const pathname = usePathname();

  // ── 1. CTA clicks — delegated, reads the existing data-cta attributes ──
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const el = target?.closest?.('[data-cta]');
      if (!el) return;

      const ctaId = el.getAttribute('data-cta');
      if (!ctaId) return;

      sendEvent('cta_click', {
        cta_id: ctaId,
        page_path: window.location.pathname,
        // Present only on the page under test — see lib/experiment.ts rule 3.
        ...readExperiment(),
      });
    };

    // Capture phase: the WhatsApp anchors in MetaTracking rewrite their own
    // href on pointerdown, and target=_blank navigations can tear down the
    // page before a bubbled listener runs.
    document.addEventListener('click', handleClick, { capture: true });
    return () => document.removeEventListener('click', handleClick, { capture: true });
  }, []);

  // ── 2. Scroll depth + hero exit — reset per client-side navigation ──
  //
  //  MUST go through ScrollTrigger, not `window.addEventListener('scroll')`.
  //  This site drives the page with GSAP ScrollSmoother, which translates
  //  #smooth-content with a CSS transform instead of scrolling the window —
  //  so native scroll events never fire (same note as BubbleAnimation.tsx).
  //  A window scroll listener here would have logged exactly zero events
  //  for the whole baseline window while looking perfectly healthy in code
  //  review. ScrollTrigger reads the smoothed position and works on the
  //  pages that have no smoother too.
  useEffect(() => {
    if (!pathname) return;

    let disposed = false;
    let kill = () => {};

    (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);

      const fired = new Set<number>();
      const triggers: ScrollTrigger[] = [];

      triggers.push(
        ScrollTrigger.create({
          trigger: document.querySelector('#smooth-content') ?? document.body,
          start: 'top top',
          end: 'bottom bottom',
          onUpdate: (self) => {
            const pct = self.progress * 100;
            for (const m of SCROLL_MILESTONES) {
              if (pct >= m && !fired.has(m)) {
                fired.add(m);
                sendEvent('scroll_depth', {
                  percent_scrolled: m,
                  page_path: pathname,
                  ...readExperiment(),
                });
              }
            }
          },
        })
      );

      // hero_exit — the hero has scrolled fully past the top of the
      // viewport, i.e. the visitor read it and chose to keep going.
      const hero = document.getElementById('home');
      if (hero) {
        triggers.push(
          ScrollTrigger.create({
            trigger: hero,
            start: 'bottom top',
            once: true,
            onEnter: () => {
              sendEvent('hero_exit', {
                page_path: pathname,
                ...readExperiment(),
              });
            },
          })
        );
      }

      kill = () => triggers.forEach((t) => t.kill());
    })();

    return () => {
      disposed = true;
      kill();
    };
  }, [pathname]);

  // ── 3. Experiment impression — fired here, not in the inline assignment
  //       script, because an event pushed before gtag('config') runs is
  //       never delivered to the measurement ID. ──
  useEffect(() => {
    const exp = readExperiment();
    if (!exp) return;
    sendEvent('experiment_impression', exp);
  }, [pathname]);

  return null;
}

/** Variant params stamped on <html> by the inline snippet, or undefined. */
function readExperiment(): { exp_id: string; exp_variant: string } | undefined {
  if (typeof document === 'undefined') return undefined;
  const root = document.documentElement;
  const id = root.getAttribute('data-exp');
  const variant = root.getAttribute('data-exp-variant');
  return id && variant ? { exp_id: id, exp_variant: variant } : undefined;
}
