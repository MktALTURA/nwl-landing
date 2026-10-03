'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Scroll reveals for the becas page, same recipe as the beneficios page, but
 * wrapped in gsap.matchMedia so a visitor who asked for reduced motion gets
 * the content in place with no animation at all.
 */
export default function BecasScrollAnimations({ children }: { children: React.ReactNode }) {
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>('.animate-section').forEach((section) => {
          gsap.from(section, {
            opacity: 0,
            y: 40,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: { trigger: section, start: 'top 85%', once: true },
          });
        });
        gsap.utils.toArray<HTMLElement>('.wine-divider').forEach((divider) => {
          gsap.from(divider, { width: 0, duration: 0.8, scrollTrigger: { trigger: divider, start: 'top 85%' } });
        });
      }, mainRef);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  return <main ref={mainRef}>{children}</main>;
}
