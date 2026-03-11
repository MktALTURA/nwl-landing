'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/lib/i18n/LanguageContext';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function BeSection() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // GSAP ScrollTrigger.pin() + timeline
  useEffect(() => {
    if (!isMounted || !triggerRef.current || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const wordEls = gsap.utils.toArray('.be-word') as HTMLElement[];
      const totalWords = wordEls.length;
      const isMobile = window.innerWidth < 768;
      // Mobile: shorter scroll distance + tighter scrub to reduce jitter
      const scrollMultiplier = isMobile ? 0.5 : 1;
      const scrubValue = isMobile ? 0.3 : 0.8;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          pin: sectionRef.current,
          start: 'top top',
          end: `+=${window.innerHeight * totalWords * scrollMultiplier * 0.5}`,
          scrub: scrubValue,
          pinSpacing: true,
          anticipatePin: 1,
        },
      });

      // "Be" text and divider are already visible — no entrance animation.
      // Words start cycling immediately at scroll position 0.

      // Give regular words 68% of the timeline, NWL gets 32% (extended hold)
      const regularWords = totalWords - 1;
      const regularSegDuration = 0.68 / regularWords;
      const nwlStart = regularSegDuration * regularWords; // ~0.68
      const nwlDuration = 1 - nwlStart;

      wordEls.forEach((wordEl, i) => {
        const isLast = i === totalWords - 1;
        const segDuration = isLast ? nwlDuration : regularSegDuration;
        const segStart = isLast ? nwlStart : i * regularSegDuration;

        // Enter — slide up from below + fade in
        tl.fromTo(
          wordEl,
          { yPercent: 50, opacity: 0, scale: 0.85 },
          {
            yPercent: 0,
            opacity: 1,
            scale: 1,
            duration: segDuration * 0.2,
            ease: 'power3.out',
          },
          segStart
        );

        // Exit — slide up + fade out (skip for last word)
        if (!isLast) {
          tl.to(
            wordEl,
            {
              yPercent: -40,
              opacity: 0,
              scale: 0.9,
              duration: segDuration * 0.25,
              ease: 'power2.in',
            },
            segStart + segDuration * 0.7
          );
        }

        // NWL finale — scale pulse, then long hold
        if (isLast) {
          tl.to(
            wordEl,
            {
              scale: 1.08,
              duration: nwlDuration * 0.1,
              ease: 'power2.out',
            },
            nwlStart + nwlDuration * 0.25
          );
          tl.to(
            wordEl,
            {
              scale: 1,
              duration: nwlDuration * 0.12,
              ease: 'elastic.out(1, 0.6)',
            },
            nwlStart + nwlDuration * 0.35
          );
          // Remaining ~50% of NWL segment is just a hold — no animation needed
        }
      });
    }, triggerRef);

    return () => ctx.revert();
  }, [isMounted]);

  if (!isMounted) return null;

  return (
    <div ref={triggerRef}>
      <div
        ref={sectionRef}
        className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-ivory to-white relative overflow-hidden"
      >
        {/* Faint kangaroo watermark for brand continuity */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vh] h-[50vh] opacity-[0.03] pointer-events-none">
          <img
            src="/images/brand/kangaroo-wine.png"
            alt=""
            className="w-full h-full object-contain rotate-[15deg]"
          />
        </div>

        <div className="text-center relative z-10 w-full px-4">
          {/* Wine accent divider — always visible */}
          <div className="be-divider-pin w-16 h-[2px] bg-wine mx-auto mb-8" />

          {/* "Be" / "Sé" static label — always visible */}
          <div className="be-static font-display text-7xl md:text-8xl lg:text-9xl font-bold text-charcoal leading-none">
            {t.beSection.be}
          </div>

          {/* Cycling word — stacked below, same size */}
          <div className="relative h-[86px] md:h-[115px] lg:h-[154px] mt-2 w-full">
            {t.beSection.words.map((word) => (
              <span
                key={word}
                className="be-word absolute inset-0 flex items-start justify-center font-display text-7xl md:text-8xl lg:text-9xl font-bold text-wine leading-none opacity-0"
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
