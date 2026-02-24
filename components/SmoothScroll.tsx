'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
}

/**
 * GSAP ScrollSmoother wrapper — replaces Lenis.
 *
 * ScrollSmoother uses CSS `transform: translateY()` to move #smooth-content,
 * instead of calling `window.scrollTo()` like Lenis does.  The browser
 * compositor handles the transform on the GPU, so the GHL iframe never gets
 * recomposited and there is zero jank at the iframe boundary.
 *
 * Important: `position: fixed` elements (Navigation, fixed CTA) must live
 * OUTSIDE #smooth-wrapper — a CSS transform context makes fixed positioning
 * relative to the transformed parent instead of the viewport.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const smootherRef = useRef<ScrollSmoother | null>(null);

  useEffect(() => {
    smootherRef.current = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1.5,          // seconds of deceleration (≈ Lenis duration: 1.4)
      effects: false,       // no parallax data-speed effects
      smoothTouch: false,   // native touch scroll on mobile — better for iframes
    });

    // Intercept anchor clicks so ScrollSmoother handles the scroll
    // instead of the browser's native hash navigation (which conflicts
    // with the CSS-transform-based smooth scroll and blanks the screen).
    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a[href^="#"]');
      if (!anchor) return;
      const hash = anchor.getAttribute('href');
      if (!hash || hash === '#') return;
      const target = document.querySelector(hash);
      if (!target || !smootherRef.current) return;

      e.preventDefault();
      smootherRef.current.scrollTo(target, true, 'top top');
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      smootherRef.current?.kill();
      smootherRef.current = null;
    };
  }, []);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        {children}
      </div>
    </div>
  );
}
