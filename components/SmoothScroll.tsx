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

    return () => {
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
