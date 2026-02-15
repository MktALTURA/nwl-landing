'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function burstDust(x: number, y: number, color = 'rgba(114,47,55,0.3)') {
  const count = 8;
  for (let i = 0; i < count; i++) {
    const dot = document.createElement('div');
    const size = 3 + Math.random() * 5;
    dot.style.cssText = `
      position:fixed;left:${x}px;top:${y}px;width:${size}px;height:${size}px;
      border-radius:50%;background:${color};pointer-events:none;z-index:10000;
    `;
    document.body.appendChild(dot);
    const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
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

      const sx = srcRect.left, sy = srcRect.top;
      const sw = srcRect.width, sh = srcRect.height;
      const ex = navRect.left, ey = navRect.top;
      const ew = navRect.width, eh = navRect.height;

      // Flight size: much smaller than source (40% of original)
      const flightW = sw * 0.35;
      const flightH = sh * 0.35;

      // Bounce point: far right of screen, mid-height
      const bx = vw * 0.75;
      const by = (sy + ey) / 2 + 60;

      gsap.set(flyer, {
        left: sx, top: sy, width: sw, height: sh,
        opacity: 0, scaleX: 1, scaleY: 1, rotation: 0,
      });

      // 1. Show flyer, hide source
      tl.call(() => {
        srcImg.style.visibility = 'hidden';
        flyer.style.opacity = '1';
      });

      // 2. Subtle squash wind-up + shrink
      tl.to(flyer, {
        scaleY: 0.85, scaleX: 1.1,
        width: flightW, height: flightH,
        left: sx + (sw - flightW) / 2,
        top: sy + (sh - flightH) / 2,
        duration: 0.25, ease: 'power2.in',
      });

      // 3. Stretch on takeoff + dust
      tl.to(flyer, { scaleY: 1.15, scaleX: 0.9, duration: 0.12, ease: 'power2.out' });
      tl.call(() => burstDust(sx + sw / 2, sy + sh * 0.8));

      // 4. First arc — graceful sweep to the right
      tl.to(flyer, {
        left: bx,
        top: by,
        rotation: 12,
        scaleY: 1.05, scaleX: 0.97,
        duration: 0.6,
        ease: 'power1.inOut',
      });

      // 5. Soft bounce squash + dust
      tl.to(flyer, { scaleY: 0.8, scaleX: 1.15, rotation: 0, duration: 0.1, ease: 'power2.in' });
      tl.call(() => burstDust(bx + flightW / 2, by + flightH * 0.8));

      // 6. Gentle stretch for second arc
      tl.to(flyer, { scaleY: 1.1, scaleX: 0.92, duration: 0.1, ease: 'power2.out' });

      // 7. Second arc — sweep up-left to navbar, shrinking to final size
      tl.to(flyer, {
        left: ex, top: ey,
        width: ew, height: eh,
        rotation: 0,
        scaleY: 1, scaleX: 1,
        duration: 0.55,
        ease: 'power2.inOut',
      });

      // 8. Landing squash
      tl.to(flyer, { scaleY: 0.88, scaleX: 1.12, duration: 0.08, ease: 'power2.in' });
      tl.call(() => burstDust(ex + ew / 2, ey + eh));

      // 9. Elastic settle
      tl.to(flyer, { scaleY: 1.04, scaleX: 0.97, duration: 0.1, ease: 'power2.out' });
      tl.to(flyer, { scaleY: 1, scaleX: 1, duration: 0.25, ease: 'elastic.out(1, 0.5)' });

      // 10. Snap into nav
      tl.call(() => {
        navTarget.style.opacity = '1';
        flyer.style.opacity = '0';
      });

    } else {
      // === REVERSE: one smooth arc from navbar back to circle ===
      const navRect = navTarget.getBoundingClientRect();
      const circleRect = circleArea.getBoundingClientRect();
      const targetW = circleRect.width * 0.85;
      const targetH = circleRect.height * 0.85;
      const ex = circleRect.left + (circleRect.width - targetW) / 2;
      const ey = circleRect.top + (circleRect.height - targetH) / 2;
      const sx = navRect.left, sy = navRect.top;
      const sw = navRect.width, sh = navRect.height;

      // Single arc: swing out right then curve back to circle
      const peakX = vw * 0.65;
      const peakY = Math.min(sy, ey) - 80;

      gsap.set(flyer, {
        left: sx, top: sy, width: sw, height: sh,
        opacity: 0, scaleX: 1, scaleY: 1, rotation: 0,
      });

      // 1. Show flyer, hide nav
      tl.call(() => {
        navTarget.style.opacity = '0';
        flyer.style.opacity = '1';
      });

      // 2. Subtle squash + takeoff dust
      tl.to(flyer, { scaleY: 0.85, scaleX: 1.1, duration: 0.15, ease: 'power2.in' });
      tl.to(flyer, { scaleY: 1.15, scaleX: 0.9, duration: 0.1, ease: 'power2.out' });
      tl.call(() => burstDust(sx + sw / 2, sy + sh));

      // 3. Single graceful arc — out right, peak, then curve down-left to circle
      // Phase A: rise to peak, growing
      tl.to(flyer, {
        left: peakX,
        top: peakY,
        width: targetW * 0.4,
        height: targetH * 0.4,
        rotation: -8,
        scaleY: 1.05, scaleX: 0.97,
        duration: 0.5,
        ease: 'power2.out',
      });

      // Phase B: descend to circle, growing to full size
      tl.to(flyer, {
        left: ex,
        top: ey,
        width: targetW,
        height: targetH,
        rotation: 0,
        scaleY: 1, scaleX: 1,
        duration: 0.55,
        ease: 'power2.in',
      });

      // 4. Landing squash + dust
      tl.to(flyer, { scaleY: 0.88, scaleX: 1.1, duration: 0.08, ease: 'power2.in' });
      tl.call(() => burstDust(ex + targetW / 2, ey + targetH));

      // 5. Elastic settle
      tl.to(flyer, { scaleY: 1.04, scaleX: 0.97, duration: 0.1, ease: 'power2.out' });
      tl.to(flyer, { scaleY: 1, scaleX: 1, duration: 0.25, ease: 'elastic.out(1, 0.5)' });

      // 6. Show original, hide flyer
      tl.call(() => {
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
