'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Scroll reveals for the becas page.
 *
 * Sections fade/rise in through an IntersectionObserver rather than a
 * ScrollTrigger tween: the page jumps between sections programmatically
 * (hero CTAs, calculator → application, step changes) and a tween driven by
 * scroll updates can be left half-played by a ScrollSmoother jump. IO is
 * layout-based, so it fires the same whether the visitor wheeled or we
 * scrolled for them. The content is in the HTML at full opacity until JS
 * runs, so nothing is hidden from crawlers or no-JS visitors.
 *
 * The gold rule (.wine-divider) keeps its GSAP draw-in, which is harmless if
 * it ends up skipped.
 */
export default function BecasScrollAnimations({ children }: { children: React.ReactNode }) {
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = mainRef.current;
    if (!root) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const sections = Array.from(root.querySelectorAll<HTMLElement>('.animate-section'));
    const vh = window.innerHeight;
    for (const el of sections) {
      // Anything already on screen at load stays put; only below-the-fold
      // sections get the entrance.
      if (el.getBoundingClientRect().top < vh * 0.9) continue;
      el.style.opacity = '0';
      el.style.transform = 'translateY(32px)';
      el.style.transition = 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)';
      el.dataset.reveal = 'pending';
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.style.opacity = '1';
          el.style.transform = 'none';
          el.dataset.reveal = 'done';
          io.unobserve(el);
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -8% 0px' },
    );
    sections.forEach((el) => el.dataset.reveal === 'pending' && io.observe(el));

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.wine-divider').forEach((divider) => {
        gsap.from(divider, { width: 0, duration: 0.8, scrollTrigger: { trigger: divider, start: 'top 90%', once: true } });
      });
    }, root);

    return () => {
      io.disconnect();
      ctx.revert();
      sections.forEach((el) => {
        el.style.opacity = '';
        el.style.transform = '';
        el.style.transition = '';
        delete el.dataset.reveal;
      });
    };
  }, []);

  return <main ref={mainRef}>{children}</main>;
}
