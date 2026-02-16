'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,          // scroll deceleration — higher = smoother/slower coast
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // premium exponential ease-out
      smoothWheel: true,
      touchMultiplier: 1.5,   // keep touch/mobile feeling natural
    });

    lenisRef.current = lenis;

    // Sync Lenis scroll position with GSAP ScrollTrigger every frame
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(lenis.raf as any);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
