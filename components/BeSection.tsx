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

  // GSAP ScrollTrigger.pin() + timeline (desktop) or auto-cycle (mobile)
  useEffect(() => {
    if (!isMounted || !triggerRef.current || !sectionRef.current) return;

    // Treat any touch-primary device (phones + iPads) as "mobile" for this
    // section. Width-based checks miss iPad, which then gets pin+scrub and
    // fights iPadOS native scroll.
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

    const ctx = gsap.context(() => {
      const wordEls = gsap.utils.toArray('.be-word') as HTMLElement[];
      const totalWords = wordEls.length;

      if (isTouch) {
        // Touch devices: NO pin, NO scrub. Auto-cycle words on a timer when
        // the section enters the viewport. Pin + scrub fundamentally
        // fights native touch scroll and causes bounce/jitter.
        let currentIndex = -1;
        let intervalId: ReturnType<typeof setInterval> | null = null;

        const cycleWord = () => {
          const prevIndex = currentIndex;
          currentIndex = (currentIndex + 1) % totalWords;

          // Fade out previous word
          if (prevIndex >= 0 && wordEls[prevIndex]) {
            gsap.to(wordEls[prevIndex], {
              yPercent: -30, opacity: 0, scale: 0.9,
              duration: 0.35, ease: 'power2.in',
            });
          }

          // Fade in current word
          if (wordEls[currentIndex]) {
            gsap.fromTo(wordEls[currentIndex],
              { yPercent: 30, opacity: 0, scale: 0.9 },
              { yPercent: 0, opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' },
            );
          }
        };

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top 80%',
          onEnter: () => {
            if (!intervalId) {
              cycleWord(); // Show first word immediately
              // NWL (last word) gets a longer hold — 2s vs 1s
              const smartInterval = () => {
                const isNwl = currentIndex === totalWords - 1;
                intervalId = setTimeout(() => {
                  cycleWord();
                  smartInterval();
                }, isNwl ? 2000 : 1000);
              };
              smartInterval();
            }
          },
          onLeave: () => {
            if (intervalId) { clearTimeout(intervalId); intervalId = null; }
          },
          onEnterBack: () => {
            if (!intervalId) {
              const smartInterval = () => {
                const isNwl = currentIndex === totalWords - 1;
                intervalId = setTimeout(() => {
                  cycleWord();
                  smartInterval();
                }, isNwl ? 2000 : 1000);
              };
              smartInterval();
            }
          },
          onLeaveBack: () => {
            if (intervalId) { clearTimeout(intervalId); intervalId = null; }
          },
        });

        // Cleanup timer on unmount
        return () => { if (intervalId) clearTimeout(intervalId); };
      } else {
        // Desktop: pin + scrub scroll-driven word cycling (unchanged)
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: triggerRef.current,
            pin: sectionRef.current,
            start: 'top top',
            end: `+=${window.innerHeight * totalWords * 0.5}`,
            scrub: 0.8,
            pinSpacing: true,
            anticipatePin: 1,
          },
        });

        const regularWords = totalWords - 1;
        const regularSegDuration = 0.68 / regularWords;
        const nwlStart = regularSegDuration * regularWords;
        const nwlDuration = 1 - nwlStart;

        wordEls.forEach((wordEl, i) => {
          const isLast = i === totalWords - 1;
          const segDuration = isLast ? nwlDuration : regularSegDuration;
          const segStart = isLast ? nwlStart : i * regularSegDuration;

          tl.fromTo(wordEl,
            { yPercent: 50, opacity: 0, scale: 0.85 },
            { yPercent: 0, opacity: 1, scale: 1, duration: segDuration * 0.2, ease: 'power3.out' },
            segStart
          );

          if (!isLast) {
            tl.to(wordEl,
              { yPercent: -40, opacity: 0, scale: 0.9, duration: segDuration * 0.25, ease: 'power2.in' },
              segStart + segDuration * 0.7
            );
          }

          if (isLast) {
            tl.to(wordEl,
              { scale: 1.08, duration: nwlDuration * 0.1, ease: 'power2.out' },
              nwlStart + nwlDuration * 0.25
            );
            tl.to(wordEl,
              { scale: 1, duration: nwlDuration * 0.12, ease: 'elastic.out(1, 0.6)' },
              nwlStart + nwlDuration * 0.35
            );
          }
        });
      }
    }, triggerRef);

    return () => ctx.revert();
  }, [isMounted]);

  if (!isMounted) return null;

  return (
    <div ref={triggerRef}>
      <div
        ref={sectionRef}
        className="min-h-[60vh] md:min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-ivory to-white relative overflow-hidden"
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
