'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Holds the page's scroll animations so app/(main)/beneficios/page.tsx can be a
 * server component and fetch the catalog.
 *
 * The children are an RSC slot — they still render on the server and stream
 * into the initial HTML. The GSAP scope is unchanged because the ref sits on
 * the same <main> wrapping the same .animate-section / .wine-divider nodes.
 */
export default function BeneficiosScrollAnimations({
  children,
}: {
  children: React.ReactNode;
}) {
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.animate-section').forEach((section: any) => {
        gsap.from(section, {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      });

      gsap.utils.toArray('.wine-divider').forEach((divider: any) => {
        gsap.from(divider, {
          width: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: divider,
            start: 'top 85%',
          },
        });
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return <main ref={mainRef}>{children}</main>;
}
