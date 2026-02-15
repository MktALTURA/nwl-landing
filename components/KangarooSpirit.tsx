'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { Flip } from 'gsap/Flip';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, Flip);
}

// Dust particle component
function DustBurst({ id }: { id: string }) {
  return (
    <div id={id} className="absolute pointer-events-none" style={{ opacity: 0 }}>
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="dust-particle absolute w-2 h-2 rounded-full bg-wine/30"
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
    </div>
  );
}

export default function KangarooSpirit() {
  const containerRef = useRef<HTMLDivElement>(null);
  const kangarooRef = useRef<HTMLImageElement>(null);
  const shimmerRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const ringOuterRef = useRef<HTMLDivElement>(null);
  const circleAreaRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const jumpTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const hasJumpedRef = useRef(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const animateDust = useCallback((dustId: string, originX: number, originY: number) => {
    const dustEl = document.getElementById(dustId);
    if (!dustEl) return;
    
    gsap.set(dustEl, { x: originX - 20, y: originY - 20, opacity: 1 });
    
    const particles = dustEl.querySelectorAll('.dust-particle');
    particles.forEach((p, i) => {
      const angle = (i / particles.length) * Math.PI * 2;
      const distance = 30 + Math.random() * 50;
      gsap.fromTo(p,
        { x: 0, y: 0, scale: 1, opacity: 0.8 },
        {
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance - 20,
          scale: 0,
          opacity: 0,
          duration: 0.6 + Math.random() * 0.3,
          ease: 'power2.out',
        }
      );
    });
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const ctx = gsap.context(() => {
      // ---- Phase 1: Reveal animations (same as before) ----
      gsap.fromTo(
        '.kangaroo-reveal',
        { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0.3 },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          opacity: 1,
          duration: 1,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            end: 'top 30%',
            scrub: 1.5,
          },
        }
      );

      gsap.fromTo(
        ringRef.current,
        { scale: 0.6, opacity: 0 },
        {
          scale: 1, opacity: 1,
          duration: 1, ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
            end: 'top 30%',
            scrub: 1.5,
          },
        }
      );

      gsap.fromTo(
        ringOuterRef.current,
        { scale: 0.5, opacity: 0 },
        {
          scale: 1, opacity: 1,
          duration: 1, ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 65%',
            end: 'top 25%',
            scrub: 1.5,
          },
        }
      );

      // Shimmer sweep
      gsap.fromTo(
        shimmerRef.current,
        { x: '-100%', opacity: 0 },
        {
          x: '200%', opacity: 0.5,
          duration: 0.8, ease: 'power2.inOut',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 25%',
            end: 'top 5%',
            scrub: 1,
          },
        }
      );

      // Text elements
      gsap.fromTo(
        '.spirit-text',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 60%',
            end: 'top 30%',
            scrub: 1,
          },
        }
      );

      // Trait pills
      gsap.fromTo(
        '.spirit-trait',
        { opacity: 0, scale: 0.8, y: 15 },
        {
          opacity: 1, scale: 1, y: 0,
          duration: 0.4, stagger: 0.1, ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 40%',
            end: 'top 20%',
            scrub: 1,
          },
        }
      );

      // ---- Phase 2: Kangaroo JUMP to navbar ----
      // This triggers when the user scrolls past the spirit section
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

    return () => ctx.revert();
  }, [isMounted]);

  const performJump = useCallback((direction: 'forward' | 'reverse') => {
    const kangaroo = kangarooRef.current;
    const navTarget = document.getElementById('nav-kangaroo-target');
    const circleArea = circleAreaRef.current;
    if (!kangaroo || !navTarget || !circleArea) return;

    // Kill any existing jump
    if (jumpTimelineRef.current) {
      jumpTimelineRef.current.kill();
    }

    const tl = gsap.timeline();
    jumpTimelineRef.current = tl;

    if (direction === 'forward') {
      // Get positions
      const kangarooRect = kangaroo.getBoundingClientRect();
      const navRect = navTarget.getBoundingClientRect();

      // Calculate the jump path
      const startX = kangarooRect.left + kangarooRect.width / 2;
      const startY = kangarooRect.top + kangarooRect.height / 2;
      const endX = navRect.left + navRect.width / 2;
      const endY = navRect.top + navRect.height / 2;

      // Mid-point for the arc (bounce point — right side of screen, lower)
      const bounceX = startX + (endX - startX) * 0.6;
      const bounceY = Math.max(startY, endY) + 100;

      // Make kangaroo position fixed for the animation
      const currentRect = kangaroo.getBoundingClientRect();
      
      // Takeoff dust
      animateDust('dust-takeoff', currentRect.left + currentRect.width / 2, currentRect.top + currentRect.height);

      // Squash before jump
      tl.to(kangaroo, {
        scaleY: 0.7,
        scaleX: 1.2,
        duration: 0.15,
        ease: 'power2.in',
      });

      // Stretch on takeoff
      tl.to(kangaroo, {
        scaleY: 1.3,
        scaleX: 0.8,
        duration: 0.1,
        ease: 'power2.out',
      });

      // Switch to fixed positioning for cross-page travel
      tl.call(() => {
        kangaroo.style.position = 'fixed';
        kangaroo.style.left = `${currentRect.left}px`;
        kangaroo.style.top = `${currentRect.top}px`;
        kangaroo.style.width = `${currentRect.width}px`;
        kangaroo.style.height = `${currentRect.height}px`;
        kangaroo.style.zIndex = '9999';
        kangaroo.style.margin = '0';
        // Hide the circle area placeholder
        circleArea.style.visibility = 'hidden';
      });

      // First arc — jump to the right and down
      tl.to(kangaroo, {
        left: bounceX,
        top: bounceY,
        rotation: 15,
        scaleY: 1.1,
        scaleX: 0.95,
        duration: 0.4,
        ease: 'power1.out',
        motionPath: {
          path: [
            { left: currentRect.left, top: currentRect.top },
            { left: (currentRect.left + bounceX) / 2, top: currentRect.top - 150 },
            { left: bounceX, top: bounceY },
          ],
          type: 'cubic',
        },
      });

      // Landing squash at bounce point
      tl.to(kangaroo, {
        scaleY: 0.75,
        scaleX: 1.25,
        rotation: 0,
        duration: 0.1,
        ease: 'power3.in',
      });

      // Dust at bounce
      tl.call(() => {
        animateDust('dust-bounce', bounceX, bounceY + 40);
      });

      // Second arc — jump up to navbar
      tl.to(kangaroo, {
        scaleY: 1.2,
        scaleX: 0.85,
        duration: 0.08,
        ease: 'power2.out',
      });

      tl.to(kangaroo, {
        left: endX - 24,
        top: endY - 24,
        width: 48,
        height: 48,
        rotation: 0,
        scaleY: 1,
        scaleX: 1,
        duration: 0.45,
        ease: 'power2.inOut',
        motionPath: {
          path: [
            { left: bounceX, top: bounceY },
            { left: (bounceX + endX) / 2, top: Math.min(bounceY, endY) - 200 },
            { left: endX - 24, top: endY - 24 },
          ],
          type: 'cubic',
        },
      });

      // Landing squash in navbar
      tl.to(kangaroo, {
        scaleY: 0.85,
        scaleX: 1.15,
        duration: 0.08,
        ease: 'power3.in',
      });

      // Settle bounce
      tl.to(kangaroo, {
        scaleY: 1.05,
        scaleX: 0.97,
        duration: 0.1,
        ease: 'power2.out',
      });

      tl.to(kangaroo, {
        scaleY: 1,
        scaleX: 1,
        duration: 0.15,
        ease: 'elastic.out(1, 0.5)',
      });

      // Dust at landing
      tl.call(() => {
        animateDust('dust-landing', endX, endY + 20);
      }, [], '<-0.15');

      // Final: snap into nav position
      tl.call(() => {
        kangaroo.style.position = 'fixed';
        kangaroo.style.left = `${navRect.left}px`;
        kangaroo.style.top = `${navRect.top}px`;
        kangaroo.style.width = `${navRect.width}px`;
        kangaroo.style.height = `${navRect.height}px`;
        // Show the nav kangaroo
        navTarget.style.opacity = '1';
        // Hide the flying one
        kangaroo.style.opacity = '0';
      });

    } else {
      // REVERSE — jump back from navbar to circle
      const navRect = navTarget.getBoundingClientRect();
      const circleRect = circleArea.getBoundingClientRect();

      const startX = navRect.left + navRect.width / 2;
      const startY = navRect.top + navRect.height / 2;
      const endX = circleRect.left + circleRect.width / 2;
      const endY = circleRect.top + circleRect.height / 2;
      const bounceX = startX + (endX - startX) * 0.4;
      const bounceY = Math.max(startY, endY) * 0.5 + 100;

      // Hide nav kangaroo, show flying one
      tl.call(() => {
        navTarget.style.opacity = '0';
        kangaroo.style.opacity = '1';
        kangaroo.style.position = 'fixed';
        kangaroo.style.left = `${navRect.left}px`;
        kangaroo.style.top = `${navRect.top}px`;
        kangaroo.style.width = `${navRect.width}px`;
        kangaroo.style.height = `${navRect.height}px`;
        kangaroo.style.zIndex = '9999';
      });

      // Takeoff dust from navbar
      tl.call(() => {
        animateDust('dust-landing', startX, startY + 20);
      });

      // Squash before jump
      tl.to(kangaroo, {
        scaleY: 0.75, scaleX: 1.2,
        duration: 0.12, ease: 'power2.in',
      });

      // Stretch on takeoff
      tl.to(kangaroo, {
        scaleY: 1.3, scaleX: 0.8,
        duration: 0.08, ease: 'power2.out',
      });

      // First arc — down to bounce point
      tl.to(kangaroo, {
        left: bounceX,
        top: bounceY,
        width: 120,
        height: 120,
        rotation: -10,
        scaleY: 1.1, scaleX: 0.95,
        duration: 0.4,
        ease: 'power1.out',
        motionPath: {
          path: [
            { left: navRect.left, top: navRect.top },
            { left: (navRect.left + bounceX) / 2, top: navRect.top - 120 },
            { left: bounceX, top: bounceY },
          ],
          type: 'cubic',
        },
      });

      // Bounce squash
      tl.to(kangaroo, {
        scaleY: 0.75, scaleX: 1.25, rotation: 0,
        duration: 0.1, ease: 'power3.in',
      });

      tl.call(() => {
        animateDust('dust-bounce', bounceX, bounceY + 40);
      });

      // Second arc — back to circle
      const circleSize = circleRect.width * 0.85;
      tl.to(kangaroo, {
        scaleY: 1.2, scaleX: 0.85,
        duration: 0.08, ease: 'power2.out',
      });

      tl.to(kangaroo, {
        left: endX - circleSize / 2,
        top: endY - circleSize / 2,
        width: circleSize,
        height: circleSize,
        rotation: 0,
        scaleY: 1, scaleX: 1,
        duration: 0.45,
        ease: 'power2.inOut',
        motionPath: {
          path: [
            { left: bounceX, top: bounceY },
            { left: (bounceX + endX) / 2, top: bounceY - 180 },
            { left: endX - circleSize / 2, top: endY - circleSize / 2 },
          ],
          type: 'cubic',
        },
      });

      // Landing settle
      tl.to(kangaroo, {
        scaleY: 0.9, scaleX: 1.1,
        duration: 0.08, ease: 'power3.in',
      });

      tl.to(kangaroo, {
        scaleY: 1, scaleX: 1,
        duration: 0.2, ease: 'elastic.out(1, 0.5)',
      });

      tl.call(() => {
        animateDust('dust-takeoff', endX, endY + circleSize / 2);
      }, [], '<-0.15');

      // Reset to normal positioning
      tl.call(() => {
        kangaroo.style.position = '';
        kangaroo.style.left = '';
        kangaroo.style.top = '';
        kangaroo.style.width = '';
        kangaroo.style.height = '';
        kangaroo.style.zIndex = '';
        kangaroo.style.margin = '';
        circleArea.style.visibility = 'visible';
      });
    }
  }, [animateDust]);

  if (!isMounted) return null;

  return (
    <div
      ref={containerRef}
      className="relative py-24 overflow-visible"
      id="our-spirit"
    >
      {/* Dust particle containers */}
      <DustBurst id="dust-takeoff" />
      <DustBurst id="dust-bounce" />
      <DustBurst id="dust-landing" />

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-sand/30 to-ivory" />

      <div className="container-custom relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Kangaroo Image */}
          <div className="relative flex-shrink-0">
            <div ref={circleAreaRef} className="relative w-[280px] h-[280px] md:w-[360px] md:h-[360px]">
              {/* The actual kangaroo — this element flies */}
              <div className="kangaroo-reveal w-full h-full flex items-center justify-center">
                <img
                  ref={kangarooRef}
                  id="spirit-kangaroo"
                  src="/images/brand/kangaroo-wine.png"
                  alt="NWL Kangaroo — Our Spirit"
                  className="w-[85%] h-[85%] object-contain drop-shadow-lg"
                />
              </div>

              {/* Shimmer overlay */}
              <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
                <div
                  ref={shimmerRef}
                  className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full"
                />
              </div>

              {/* Decorative rings */}
              <div ref={ringRef} className="absolute -inset-4 border border-wine/15 rounded-full" />
              <div ref={ringOuterRef} className="absolute -inset-10 border border-wine/8 rounded-full" />
            </div>
          </div>

          {/* Text content */}
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
                <span
                  key={trait}
                  className="spirit-trait px-5 py-2 bg-wine/5 text-wine text-sm font-medium rounded-full border border-wine/15 hover:bg-wine/10 transition-colors"
                >
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
