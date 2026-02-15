'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function burstDust(x: number, y: number, color = 'rgba(114,47,55,0.3)') {
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
  const kangarooImgRef = useRef<HTMLImageElement>(null);
  const shimmerRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const ringOuterRef = useRef<HTMLDivElement>(null);
  const circleAreaRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const jumpTlRef = useRef<gsap.core.Timeline | null>(null);
  const hasJumpedRef = useRef(false);
  const flyerRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => { setIsMounted(true); }, []);

  const getFlyer = useCallback(() => {
    if (flyerRef.current) return flyerRef.current;
    const flyer = document.createElement('img');
    flyer.src = '/images/brand/kangaroo-wine.png';
    flyer.alt = '';
    flyer.style.cssText = `
      position:fixed;pointer-events:none;z-index:10000;
      object-fit:contain;opacity:0;filter:drop-shadow(0 4px 12px rgba(0,0,0,0.15));
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
        left: srcRect.left, top: srcRect.top,
        width: srcRect.width, height: srcRect.height,
        opacity: 0, scaleX: 1, scaleY: 1, rotation: 0,
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
        keyframes: arc1.map((f, i) => ({
          left: f.left, top: f.top,
          rotation: 12 * Math.sin((i / arc1.length) * Math.PI),
          scaleY: 1 + 0.08 * Math.sin((i / arc1.length) * Math.PI),
          scaleX: 1 - 0.05 * Math.sin((i / arc1.length) * Math.PI),
          duration: 0.65 / arc1.length,
        })),
      });

      // Bounce squash + dust
      tl.to(flyer, { scaleY: 0.8, scaleX: 1.15, rotation: 0, duration: 0.1, ease: 'power2.in' });
      tl.call(() => burstDust(bx, by + halfFlight));

      // Stretch for second jump
      tl.to(flyer, { scaleY: 1.1, scaleX: 0.92, duration: 0.08, ease: 'power2.out' });

      // Second arc: parabolic curve to navbar
      const arc2 = arcKeyframes(
        bx - halfFlight, by - halfFlight,
        ex - navRect.width / 2, ey - navRect.height / 2,
        220,
      );
      const navW = navRect.width, navH = navRect.height;
      tl.to(flyer, {
        duration: 0.6,
        ease: 'none',
        keyframes: arc2.map((f, i) => {
          const t = i / arc2.length;
          const w = flightSize + (navW - flightSize) * t;
          const h = flightSize + (navH - flightSize) * t;
          return {
            left: f.left + (halfFlight - w / 2) * (1 - t),
            top: f.top + (halfFlight - h / 2) * (1 - t),
            width: w, height: h,
            rotation: -8 * Math.sin(t * Math.PI) * (1 - t),
            scaleY: 1 + 0.06 * Math.sin(t * Math.PI),
            scaleX: 1 - 0.04 * Math.sin(t * Math.PI),
            duration: 0.6 / arc2.length,
          };
        }),
      });

      // Landing squash + dust
      tl.to(flyer, { scaleY: 0.88, scaleX: 1.12, duration: 0.08, ease: 'power2.in' });
      tl.call(() => burstDust(ex, ey + navH / 2));

      // Elastic settle
      tl.to(flyer, { scaleY: 1.04, scaleX: 0.97, duration: 0.1, ease: 'power2.out' });
      tl.to(flyer, { scaleY: 1, scaleX: 1, duration: 0.25, ease: 'elastic.out(1, 0.5)' });

      // Snap into nav
      tl.call(() => {
        navTarget.style.opacity = '1';
        flyer.style.opacity = '0';
      });

    } else {
      // === REVERSE ===
      // First, scroll the spirit section into view so the circle is properly positioned
      const navRect = navTarget.getBoundingClientRect();
      const sx = navRect.left + navRect.width / 2;
      const sy = navRect.top + navRect.height / 2;

      // Get circle's page-absolute position (not viewport-relative)
      const circlePageTop = circleArea.offsetTop + (circleArea.offsetParent as HTMLElement)?.offsetTop || 0;

      // We need to figure out where the circle WILL be after scroll settles.
      // Since onLeaveBack fires during scroll, let's get the section's position
      // and compute the circle center relative to the viewport after the section is in view.
      const container = containerRef.current!;
      const containerRect = container.getBoundingClientRect();
      const circleRect = circleArea.getBoundingClientRect();

      // Circle center relative to its container
      const circleOffsetX = circleRect.left - containerRect.left + circleRect.width / 2;
      const circleOffsetY = circleRect.top - containerRect.top + circleRect.height / 2;

      // The trigger fires at 'bottom 60%', meaning the container bottom is at 60% viewport.
      // When scrolling back, the container will be roughly centered. 
      // Use current viewport position but clamp it to be on-screen.
      const targetW = circleRect.width * 0.85;
      const targetH = circleRect.height * 0.85;
      
      // Use the circle's current screen position, but if it's off-screen, 
      // animate toward where it should end up
      let ex = circleRect.left + (circleRect.width - targetW) / 2;
      let ey = circleRect.top + (circleRect.height - targetH) / 2;
      const vh = window.innerHeight;
      
      // If circle is off-screen, estimate its on-screen position
      // The trigger fires when container bottom crosses 60% viewport
      // So the container bottom ≈ 0.6 * vh, container top ≈ 0.6 * vh - containerRect.height
      if (ey < -100 || ey > vh + 100) {
        const estimatedContainerTop = 0.6 * vh - containerRect.height;
        ex = containerRect.left + circleOffsetX - targetW / 2;
        ey = estimatedContainerTop + circleOffsetY - targetH / 2;
      }

      const flightSize = 80;
      const halfFlight = flightSize / 2;

      // Single smooth parabolic arc with a rightward peak
      const peakX = vw * 0.6;
      const peakY = Math.min(sy, ey) - 150;

      gsap.set(flyer, {
        left: navRect.left, top: navRect.top,
        width: navRect.width, height: navRect.height,
        opacity: 0, scaleX: 1, scaleY: 1, rotation: 0,
      });

      // Show flyer, hide nav
      tl.call(() => {
        navTarget.style.opacity = '0';
        flyer.style.opacity = '1';
      });

      // Squash takeoff
      tl.to(flyer, { scaleY: 0.85, scaleX: 1.1, duration: 0.15, ease: 'power2.in' });
      tl.to(flyer, { scaleY: 1.15, scaleX: 0.9, duration: 0.1, ease: 'power2.out' });
      tl.call(() => burstDust(sx, sy + navRect.height / 2));

      // Single parabolic arc back to circle
      // Arc from nav center to circle center
      const arcR = arcKeyframes(sx, sy, ex + targetW / 2, ey + targetH / 2, 200);
      tl.to(flyer, {
        duration: 0.9,
        ease: 'none',
        keyframes: arcR.map((f, i) => {
          const t = i / arcR.length;
          // Grow from nav size → flight size → target size
          const midT = Math.sin(t * Math.PI); // peaks at 0.5
          const growT = t * t; // accelerates toward end
          const w = navRect.width + (flightSize - navRect.width) * midT * (1 - growT) + (targetW - navRect.width) * growT;
          const h = navRect.height + (flightSize - navRect.height) * midT * (1 - growT) + (targetH - navRect.height) * growT;
          // f.left/f.top are center positions, convert to top-left for CSS positioning
          return {
            left: f.left - w / 2,
            top: f.top - h / 2,
            width: w, height: h,
            rotation: -10 * Math.sin(t * Math.PI) * (1 - t),
            scaleY: 1 + 0.08 * Math.sin(t * Math.PI),
            scaleX: 1 - 0.05 * Math.sin(t * Math.PI),
            duration: 0.9 / arcR.length,
          };
        }),
      });

      // Force exact nav position on landing
      tl.to(flyer, {
        left: navRect.left,
        top: navRect.top,
        width: navRect.width,
        height: navRect.height,
        duration: 0.01,
      }, '<0.05');

      // Landing squash + dust
      tl.to(flyer, { scaleY: 0.88, scaleX: 1.1, duration: 0.08, ease: 'power2.in' });
      tl.call(() => burstDust(ex + targetW / 2, ey + targetH));

      // Elastic settle
      tl.to(flyer, { scaleY: 1.04, scaleX: 0.97, duration: 0.1, ease: 'power2.out' });
      tl.to(flyer, { scaleY: 1, scaleX: 1, duration: 0.25, ease: 'elastic.out(1, 0.5)' });

      // Show original, hide flyer — but wait a tick for scroll to settle
      tl.call(() => {
        // Re-read circle position now that scroll has settled more
        flyer.style.opacity = '0';
        srcImg.style.visibility = 'visible';
      });
    }
  }, [getFlyer]);

  useEffect(() => {
    if (!isMounted) return;

    const ctx = gsap.context(() => {
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
    }, containerRef);

    return () => {
      ctx.revert();
      if (flyerRef.current) { flyerRef.current.remove(); flyerRef.current = null; }
    };
  }, [isMounted, performJump]);

  if (!isMounted) return null;

  return (
    <div ref={containerRef} className="relative py-24 overflow-visible" id="our-spirit">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-sand/30 to-ivory" />
      <div className="container-custom relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="relative flex-shrink-0">
            <div ref={circleAreaRef} className="relative w-[280px] h-[280px] md:w-[360px] md:h-[360px]">
              <div className="kangaroo-reveal w-full h-full flex items-center justify-center">
                <img ref={kangarooImgRef} id="spirit-kangaroo"
                  src="/images/brand/kangaroo-wine.png" alt="NWL Kangaroo — Our Spirit"
                  className="w-[85%] h-[85%] object-contain drop-shadow-lg" />
              </div>
              <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
                <div ref={shimmerRef} className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full" />
              </div>
              <div ref={ringRef} className="absolute -inset-4 border border-wine/15 rounded-full" />
              <div ref={ringOuterRef} className="absolute -inset-10 border border-wine/8 rounded-full" />
            </div>
          </div>
          <div className="text-center lg:text-left max-w-lg">
            <div className="spirit-text wine-divider mb-6 mx-auto lg:mx-0" />
            <h2 className="spirit-text font-display text-3xl md:text-4xl font-bold text-charcoal mb-4">
              Our <span className="text-wine">Spirit</span>
            </h2>
            <p className="spirit-text text-charcoal/70 text-lg leading-relaxed mb-6">
              The kangaroo embodies the NWL spirit — strength, forward
              momentum, and carrying those we nurture closest to our hearts.
              Always leaping toward new horizons.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              {['Strength', 'Nurture', 'Progress'].map((trait) => (
                <span key={trait} className="spirit-trait px-5 py-2 bg-wine/5 text-wine text-sm font-medium rounded-full border border-wine/15 hover:bg-wine/10 transition-colors">
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
