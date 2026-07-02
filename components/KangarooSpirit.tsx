'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/lib/i18n/LanguageContext';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// DS Outback Gold (#CB8606) at low alpha — kicked-up dust on the dark dawn surface
function burstDust(x: number, y: number, color = 'rgba(203,134,6,0.4)') {
  for (let i = 0; i < 8; i++) {
    const dot = document.createElement('div');
    const size = 3 + Math.random() * 5;
    dot.style.cssText = `
      position:fixed;left:${x}px;top:${y}px;width:${size}px;height:${size}px;
      border-radius:50%;background:${color};pointer-events:none;z-index:10000;
    `;
    document.body.appendChild(dot);
    const angle = (i / 8) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
    const dist = 20 + Math.random() * 40;
    gsap.to(dot, {
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist - 15 * Math.random(),
      scale: 0, opacity: 0,
      duration: 0.5 + Math.random() * 0.3,
      ease: 'power2.out',
      onComplete: () => dot.remove(),
    });
  }
}

// Parabolic arc helper: returns keyframe array with a natural jump curve
// from (x0,y0) to (x1,y1) with peak height above the higher point
function arcKeyframes(
  x0: number, y0: number,
  x1: number, y1: number,
  peakOffset: number, // how far above the higher point
  steps: number = 8,
) {
  const frames: { left: number; top: number }[] = [];
  const peakY = Math.min(y0, y1) - peakOffset;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    // Quadratic bezier: P0 -> Ppeak -> P1
    const x = (1 - t) * (1 - t) * x0 + 2 * (1 - t) * t * ((x0 + x1) / 2) + t * t * x1;
    const y = (1 - t) * (1 - t) * y0 + 2 * (1 - t) * t * peakY + t * t * y1;
    frames.push({ left: x, top: y });
  }
  return frames;
}

export default function KangarooSpirit() {
  const containerRef = useRef<HTMLDivElement>(null);
  const kangarooImgRef = useRef<HTMLDivElement>(null);
  const shimmerRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const ringOuterRef = useRef<HTMLDivElement>(null);
  const circleAreaRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const jumpTlRef = useRef<gsap.core.Timeline | null>(null);
  const hasJumpedRef = useRef(false);
  const flyerRef = useRef<HTMLDivElement | null>(null);
  const { t } = useLanguage();

  useEffect(() => { setIsMounted(true); }, []);

  const getFlyer = useCallback(() => {
    if (flyerRef.current) return flyerRef.current;
    // Gold-masked kangaroo silhouette so the in-flight mascot matches the DS Outback Gold mascot
    const flyer = document.createElement('div');
    flyer.style.cssText = `
      position:fixed;pointer-events:none;z-index:10000;opacity:0;
      background:var(--nwl-gold);
      -webkit-mask:url('/images/brand/nwl-as-kangaroo-white.png') center / contain no-repeat;
      mask:url('/images/brand/nwl-as-kangaroo-white.png') center / contain no-repeat;
      filter:drop-shadow(0 6px 16px rgba(11,34,78,0.35));
    `;
    document.body.appendChild(flyer);
    flyerRef.current = flyer;
    return flyer;
  }, []);

  const performJump = useCallback((direction: 'forward' | 'reverse') => {
    const srcImg = kangarooImgRef.current;
    const navTarget = document.getElementById('nav-kangaroo-target');
    const circleArea = circleAreaRef.current;
    if (!srcImg || !navTarget || !circleArea) return;

    if (jumpTlRef.current) jumpTlRef.current.kill();
    const tl = gsap.timeline();
    jumpTlRef.current = tl;
    const flyer = getFlyer();
    const vw = window.innerWidth;

    if (direction === 'forward') {
      const srcRect = srcImg.getBoundingClientRect();
      const navRect = navTarget.getBoundingClientRect();

      // Pre-transform dimensions (getBoundingClientRect inflates due to rotation)
      const srcW = srcImg.offsetWidth;
      const srcH = srcImg.offsetHeight;
      const navW = navTarget.offsetWidth;
      const navH = navTarget.offsetHeight;

      const sx = srcRect.left + srcRect.width / 2;
      const sy = srcRect.top + srcRect.height / 2;
      const ex = navRect.left + navRect.width / 2;
      const ey = navRect.top + navRect.height / 2;

      // Flight size
      const flightSize = 80;
      const halfFlight = flightSize / 2;

      // Bounce point: right side of screen
      const bx = vw * 0.78;
      const by = (sy + ey) / 2 + 40;

      gsap.set(flyer, {
        left: sx - srcW / 2, top: sy - srcH / 2,
        width: srcW, height: srcH,
        opacity: 0, scaleX: 1, scaleY: 1, rotation: 15,
      });

      // Show flyer, hide source
      tl.call(() => {
        srcImg.style.visibility = 'hidden';
        flyer.style.opacity = '1';
      });

      // Squash wind-up + shrink
      tl.to(flyer, {
        scaleY: 0.85, scaleX: 1.1,
        width: flightSize, height: flightSize,
        left: sx - halfFlight, top: sy - halfFlight,
        duration: 0.25, ease: 'power2.in',
      });

      // Stretch takeoff + dust
      tl.to(flyer, { scaleY: 1.15, scaleX: 0.9, duration: 0.1, ease: 'power2.out' });
      tl.call(() => burstDust(sx, sy + halfFlight));

      // First arc: parabolic curve to bounce point (right side)
      const arc1 = arcKeyframes(sx - halfFlight, sy - halfFlight, bx - halfFlight, by - halfFlight, 180);
      tl.to(flyer, {
        duration: 0.65,
        ease: 'none',
        keyframes: arc1.map((f, i) => {
          const t1 = i / (arc1.length - 1);
          return {
            left: f.left, top: f.top,
            rotation: 15 + 12 * Math.sin(t1 * Math.PI),
            scaleY: 1 + 0.08 * Math.sin(t1 * Math.PI),
            scaleX: 1 - 0.05 * Math.sin(t1 * Math.PI),
            duration: 0.65 / arc1.length,
          };
        }),
      });

      // Bounce squash + dust
      tl.to(flyer, { scaleY: 0.8, scaleX: 1.15, rotation: 15, duration: 0.1, ease: 'power2.in' });
      tl.call(() => burstDust(bx, by + halfFlight));

      // Stretch for second jump
      tl.to(flyer, { scaleY: 1.1, scaleX: 0.92, duration: 0.08, ease: 'power2.out' });

      // Second arc: parabolic curve to navbar
      const arc2 = arcKeyframes(
        bx - halfFlight, by - halfFlight,
        ex - navW / 2, ey - navH / 2,
        220,
      );
      tl.to(flyer, {
        duration: 0.6,
        ease: 'none',
        keyframes: arc2.map((f, i) => {
          const t = i / (arc2.length - 1);
          const w = flightSize + (navW - flightSize) * t;
          const h = flightSize + (navH - flightSize) * t;
          return {
            left: f.left + (halfFlight - w / 2) * (1 - t),
            top: f.top + (halfFlight - h / 2) * (1 - t),
            width: w, height: h,
            rotation: 15 + (-8 * Math.sin(t * Math.PI) * (1 - t)),
            scaleY: 1 + 0.06 * Math.sin(t * Math.PI),
            scaleX: 1 - 0.04 * Math.sin(t * Math.PI),
            duration: 0.6 / arc2.length,
          };
        }),
      });

      // Snap to exact nav target position before landing effects
      tl.set(flyer, {
        left: ex - navW / 2, top: ey - navH / 2,
        width: navW, height: navH,
        rotation: 15,
      });

      // Landing squash + dust
      tl.to(flyer, { scaleY: 0.88, scaleX: 1.12, duration: 0.08, ease: 'power2.in' });
      tl.call(() => burstDust(ex, ey + navH / 2));

      // Elastic settle
      tl.to(flyer, { scaleY: 1.04, scaleX: 0.97, duration: 0.1, ease: 'power2.out' });
      tl.to(flyer, { scaleY: 1, scaleX: 1, duration: 0.25, ease: 'elastic.out(1, 0.5)' });

      // Crossfade into nav — show target first, then hide flyer
      tl.set(navTarget, { opacity: 1 });
      tl.to(flyer, { opacity: 0, duration: 0.15, ease: 'power1.out' });

    } else {
      // === REVERSE ===
      const navRect = navTarget.getBoundingClientRect();
      // Pre-transform dimensions (getBoundingClientRect inflates due to rotation)
      const navW = navTarget.offsetWidth;
      const navH = navTarget.offsetHeight;
      const sx = navRect.left + navRect.width / 2;
      const sy = navRect.top + navRect.height / 2;

      const flightSize = 80;
      const halfFlight = flightSize / 2;

      // Wait for scroll to settle, then read the circle's actual position
      let ex = 0, ey = 0, targetW = 0, targetH = 0;
      let circlePosition = () => {
        const circleRect = circleArea.getBoundingClientRect();
        targetW = circleRect.width * 0.85;
        targetH = circleRect.height * 0.85;
        ex = circleRect.left + (circleRect.width - targetW) / 2 + targetW / 2;
        ey = circleRect.top + (circleRect.height - targetH) / 2 + targetH / 2;
      };

      // Read position immediately
      circlePosition();

      // Helper: pin flyer to circle's real-time viewport position
      const pinToCircle = () => {
        const cr = circleArea.getBoundingClientRect();
        const tw = cr.width * 0.85;
        const th = cr.height * 0.85;
        gsap.set(flyer, {
          left: cr.left + (cr.width - tw) / 2,
          top: cr.top + (cr.height - th) / 2,
          width: tw, height: th,
        });
      };

      // Scroll listener keeps flyer locked to circle during landing phase
      let scrollPinActive = false;
      const onScrollPin = () => { if (scrollPinActive) pinToCircle(); };

      // --- Cancel guard: if user scrolls past the spirit section, abort gracefully ---
      let reverseAborted = false;
      const cleanupAllListeners = () => {
        window.removeEventListener('scroll', cancelReverse);
        if (scrollPinActive) {
          scrollPinActive = false;
          window.removeEventListener('scroll', onScrollPin);
        }
      };
      const cancelReverse = () => {
        const cr = circleArea.getBoundingClientRect();
        // Spirit section is fully below the viewport — user scrolled past it
        if (cr.top > window.innerHeight) {
          reverseAborted = true;
          tl.kill();
          // Quietly reset: hide flyer, restore source kangaroo in circle
          gsap.set(flyer, { opacity: 0 });
          srcImg.style.visibility = 'visible';
          cleanupAllListeners();
        }
      };
      window.addEventListener('scroll', cancelReverse, { passive: true });

      gsap.set(flyer, {
        left: sx - navW / 2, top: sy - navH / 2,
        width: navW, height: navH,
        opacity: 0, scaleX: 1, scaleY: 1, rotation: 15,
      });

      // Show flyer, hide nav — simultaneous swap via GSAP
      tl.set(flyer, { opacity: 1 });
      tl.set(navTarget, { opacity: 0 });

      // Squash takeoff
      tl.to(flyer, { scaleY: 0.85, scaleX: 1.1, duration: 0.15, ease: 'power2.in' });
      tl.to(flyer, { scaleY: 1.15, scaleX: 0.9, duration: 0.1, ease: 'power2.out' });
      tl.call(() => burstDust(sx, sy + navH / 2));

      // Compute arc keyframes synchronously so they're available for the timeline
      const arcR = arcKeyframes(sx, sy, ex, ey, 200);

      tl.to(flyer, {
        duration: 0.9,
        ease: 'none',
        keyframes: arcR.map((f, i) => {
          const t = i / (arcR.length - 1);
          const midT = Math.sin(t * Math.PI);
          const growT = t * t;
          const w = navW + (flightSize - navW) * midT * (1 - growT) + (targetW - navW) * growT;
          const h = navH + (flightSize - navH) * midT * (1 - growT) + (targetH - navH) * growT;
          return {
            left: f.left - w / 2,
            top: f.top - h / 2,
            width: w, height: h,
            rotation: 15 + (-10 * Math.sin(t * Math.PI) * (1 - t)),
            scaleY: 1 + 0.08 * Math.sin(t * Math.PI),
            scaleX: 1 - 0.05 * Math.sin(t * Math.PI),
            duration: 0.9 / arcR.length,
          };
        }),
      });

      // Snap to circle's REAL position (user may have scrolled during the arc)
      tl.call(() => {
        pinToCircle();
        gsap.set(flyer, { rotation: 15 });
        scrollPinActive = true;
        window.addEventListener('scroll', onScrollPin, { passive: true });
      });

      // Landing squash + dust
      tl.to(flyer, { scaleY: 0.88, scaleX: 1.1, duration: 0.08, ease: 'power2.in' });
      tl.call(() => {
        const cr = circleArea.getBoundingClientRect();
        burstDust(cr.left + cr.width / 2, cr.top + cr.height / 2);
      });

      // Elastic settle
      tl.to(flyer, { scaleY: 1.04, scaleX: 0.97, duration: 0.1, ease: 'power2.out' });
      tl.to(flyer, { scaleY: 1, scaleX: 1, duration: 0.25, ease: 'elastic.out(1, 0.5)' });

      // Show original, hide flyer — remove all scroll tracking
      tl.call(() => {
        cleanupAllListeners();
        pinToCircle();
      });
      tl.set(flyer, { opacity: 0 });
      tl.call(() => { srcImg.style.visibility = 'visible'; });
    }
  }, [getFlyer]);

  useEffect(() => {
    if (!isMounted) return;

    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      if (isMobile) {
        // Mobile: play-once animations, no reverse, no scrub.
        // 'play none none none' prevents the rapid play/reverse stutter
        // caused by touch momentum bouncing across trigger boundaries.
        // clipPath replaced with simple opacity (much cheaper on mobile GPU).
        const onceTrigger = { trigger: containerRef.current, start: 'top 80%', toggleActions: 'play none none none' as const };

        gsap.fromTo('.kangaroo-reveal',
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out', scrollTrigger: onceTrigger }
        );

        gsap.fromTo(ringRef.current,
          { scale: 0.6, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, ease: 'power2.out', scrollTrigger: onceTrigger }
        );

        gsap.fromTo(ringOuterRef.current,
          { scale: 0.5, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.7, ease: 'power2.out', scrollTrigger: onceTrigger }
        );

        gsap.fromTo('.spirit-text',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out', scrollTrigger: onceTrigger }
        );

        gsap.fromTo('.spirit-trait',
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out',
            scrollTrigger: { trigger: containerRef.current, start: 'top 60%', toggleActions: 'play none none none' as const },
          }
        );
        // Skip shimmer on mobile — it's decorative and adds GPU cost
      } else {
        // Desktop: scrub-based scroll animations (unchanged)
        gsap.fromTo('.kangaroo-reveal',
          { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0.3 },
          { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, duration: 1, ease: 'power3.inOut',
            scrollTrigger: { trigger: containerRef.current, start: 'top 80%', end: 'top 30%', scrub: 1.5 },
          }
        );

        gsap.fromTo(ringRef.current,
          { scale: 0.6, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1, ease: 'power2.out',
            scrollTrigger: { trigger: containerRef.current, start: 'top 70%', end: 'top 30%', scrub: 1.5 },
          }
        );

        gsap.fromTo(ringOuterRef.current,
          { scale: 0.5, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1, ease: 'power2.out',
            scrollTrigger: { trigger: containerRef.current, start: 'top 65%', end: 'top 25%', scrub: 1.5 },
          }
        );

        gsap.fromTo(shimmerRef.current,
          { x: '-100%', opacity: 0 },
          { x: '200%', opacity: 0.5, duration: 0.8, ease: 'power2.inOut',
            scrollTrigger: { trigger: containerRef.current, start: 'top 25%', end: 'top 5%', scrub: 1 },
          }
        );

        gsap.fromTo('.spirit-text',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: containerRef.current, start: 'top 60%', end: 'top 30%', scrub: 1 },
          }
        );

        gsap.fromTo('.spirit-trait',
          { opacity: 0, scale: 0.8, y: 15 },
          { opacity: 1, scale: 1, y: 0, duration: 0.4, stagger: 0.1, ease: 'back.out(1.7)',
            scrollTrigger: { trigger: containerRef.current, start: 'top 40%', end: 'top 20%', scrub: 1 },
          }
        );
      }

      if (isMobile) {
        // Mobile: simple in-place hop — squash, jump up, land with bounce
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top 60%',
          onEnter: () => {
            if (hasJumpedRef.current) return;
            hasJumpedRef.current = true;
            const img = kangarooImgRef.current;
            if (!img) return;
            const hop = gsap.timeline();
            // Squash before jump
            hop.to(img, { scaleY: 0.85, scaleX: 1.12, duration: 0.15, ease: 'power2.in' });
            // Stretch + jump up
            hop.to(img, { scaleY: 1.15, scaleX: 0.9, y: -60, rotation: 5, duration: 0.3, ease: 'power2.out' });
            // Fall + squash on land
            hop.to(img, { y: 0, scaleY: 0.88, scaleX: 1.1, rotation: 15, duration: 0.25, ease: 'power2.in' });
            // Elastic settle
            hop.to(img, { scaleY: 1, scaleX: 1, duration: 0.4, ease: 'elastic.out(1, 0.4)' });
          },
        });
      } else {
        // Desktop: full kangaroo jump to navbar
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'bottom 60%',
          onEnter: () => {
            if (hasJumpedRef.current) return;
            hasJumpedRef.current = true;
            performJump('forward');
          },
          onLeaveBack: () => {
            if (!hasJumpedRef.current) return;
            hasJumpedRef.current = false;
            performJump('reverse');
          },
        });
      }
    }, containerRef);

    return () => {
      ctx.revert();
      if (flyerRef.current) { flyerRef.current.remove(); flyerRef.current = null; }
    };
  }, [isMounted, performJump]);

  if (!isMounted) return null;

  return (
    <div ref={containerRef} className="relative py-24 overflow-visible nwl-bg-dawn" id="our-spirit">
      <div className="absolute inset-0 nwl-bg-dawn-deep opacity-70" />
      <div className="container-custom relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="relative flex-shrink-0">
            <div ref={circleAreaRef} className="relative w-[280px] h-[280px] md:w-[360px] md:h-[360px]">
              <div className="kangaroo-reveal w-full h-full flex items-center justify-center">
                <div ref={kangarooImgRef} id="spirit-kangaroo"
                  role="img" aria-label="NWL Kangaroo - Our Spirit"
                  className="w-[85%] h-[85%] drop-shadow-lg"
                  style={{
                    backgroundColor: 'var(--nwl-gold)',
                    WebkitMask: "url('/images/brand/nwl-as-kangaroo-white.png') center / contain no-repeat",
                    mask: "url('/images/brand/nwl-as-kangaroo-white.png') center / contain no-repeat",
                  }} />
              </div>
              <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
                <div ref={shimmerRef} className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-gold/30 to-transparent -translate-x-full" />
              </div>
              <div ref={ringRef} className="absolute -inset-4 border border-gold/25 rounded-full" />
              <div ref={ringOuterRef} className="absolute -inset-10 border border-gold/10 rounded-full" />
            </div>
          </div>
          <div className="text-center lg:text-left max-w-lg">
            <div className="spirit-text wine-divider mb-6 mx-auto lg:mx-0" />
            <h2 className="spirit-text font-display text-3xl md:text-4xl font-bold text-paper mb-4">
              {t.kangarooSpirit.titleBefore} <span className="italic text-gold">{t.kangarooSpirit.titleAccent}</span>
            </h2>
            <p className="spirit-text text-paper/70 text-lg leading-relaxed mb-6">
              {t.kangarooSpirit.description}
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              {t.kangarooSpirit.traits.map((trait) => (
                <span key={trait} className="spirit-trait px-5 py-2 bg-gold/10 text-gold text-sm font-medium rounded-full border border-gold/30 hover:bg-gold/20 transition-colors">
                  {trait}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
