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

      window.gtag?.('event', 'cta_click', {
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
  useEffect(() => {
    if (!pathname) return;

    const fired = new Set<number>();
    let ticking = false;

    const measure = () => {
      ticking = false;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;

      const pct = ((window.scrollY / scrollable) * 100);
      for (const m of SCROLL_MILESTONES) {
        if (pct >= m && !fired.has(m)) {
          fired.add(m);
          window.gtag?.('event', 'scroll_depth', {
            percent_scrolled: m,
            page_path: pathname,
            ...readExperiment(),
          });
        }
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(measure);
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    // hero_exit: the hero section has scrolled fully out of view, i.e. the
    // visitor read the hero and chose to keep going. Fires at most once.
    let heroObserver: IntersectionObserver | undefined;
    const hero = document.getElementById('home');
    if (hero && 'IntersectionObserver' in window) {
      let wasVisible = false;
      heroObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              wasVisible = true;
            } else if (wasVisible) {
              window.gtag?.('event', 'hero_exit', {
                page_path: pathname,
                ...readExperiment(),
              });
              heroObserver?.disconnect();
            }
          }
        },
        { threshold: 0 }
      );
      heroObserver.observe(hero);
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      heroObserver?.disconnect();
    };
  }, [pathname]);

  // ── 3. Experiment impression — fired here, not in the inline assignment
  //       script, because an event pushed before gtag('config') runs is
  //       never delivered to the measurement ID. ──
  useEffect(() => {
    const exp = readExperiment();
    if (!exp) return;
    window.gtag?.('event', 'experiment_impression', exp);
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
