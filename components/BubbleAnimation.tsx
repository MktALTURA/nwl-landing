'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* ── Bubble layout ────────────────────────────────────────────
   Start near/below viewport bottom, float upward on first
   scroll, then the whole layer fades and unmounts.             */
const BUBBLES = [
  { size: 72, x: 5,  y: 92,  delay: 0.1,  drift: -360 },
  { size: 28, x: 15, y: 105, delay: 0.55, drift: -280 },
  { size: 56, x: 24, y: 88,  delay: 0.3,  drift: -330 },
  { size: 40, x: 37, y: 100, delay: 0.75, drift: -260 },
  { size: 84, x: 48, y: 90,  delay: 0.15, drift: -400 },
  { size: 20, x: 58, y: 108, delay: 1.1,  drift: -240 },
  { size: 48, x: 68, y: 95,  delay: 0.4,  drift: -310 },
  { size: 64, x: 80, y: 86,  delay: 0.2,  drift: -370 },
  { size: 32, x: 90, y: 102, delay: 0.65, drift: -270 },
  { size: 18, x: 43, y: 110, delay: 1.3,  drift: -220 },
  { size: 52, x: 10, y: 98,  delay: 0.85, drift: -320 },
  { size: 36, x: 75, y: 96,  delay: 0.48, drift: -290 },
];

export default function BubbleAnimation() {
  const [phase, setPhase] = useState<'idle' | 'active' | 'fading' | 'done'>('idle');
  const [mounted, setMounted] = useState(false);
  const triggered = useRef(false);

  useEffect(() => {
    setMounted(true);

    let fadeTimer: ReturnType<typeof setTimeout>;
    let doneTimer: ReturnType<typeof setTimeout>;

    /* ScrollTrigger events work with ScrollSmoother —
       native window scroll events do NOT fire when
       ScrollSmoother drives the page via CSS transforms. */
    const onScrollStart = () => {
      if (triggered.current) return;
      triggered.current = true;
      setPhase('active');
      fadeTimer = setTimeout(() => setPhase('fading'), 6000);
      doneTimer = setTimeout(() => setPhase('done'), 8000);
      ScrollTrigger.removeEventListener('scrollStart', onScrollStart);
    };

    ScrollTrigger.addEventListener('scrollStart', onScrollStart);

    return () => {
      ScrollTrigger.removeEventListener('scrollStart', onScrollStart);
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  if (!mounted || phase === 'done') return null;

  const active = phase === 'active' || phase === 'fading';

  /* Portal to document.body so the fixed layer lives outside
     #smooth-wrapper's CSS transform context. */
  return createPortal(
    <motion.div
      className="fixed inset-0 pointer-events-none z-[40]"
      animate={{ opacity: phase === 'fading' ? 0 : 1 }}
      transition={{ duration: phase === 'fading' ? 2 : 0 }}
    >
      {active &&
        BUBBLES.map((b, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: b.size,
              height: b.size,
              left: `${b.x}%`,
              top: `${b.y}%`,
              background: [
                /* solid tinted base for contrast on light backgrounds */
                'radial-gradient(circle, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.18) 70%, transparent 100%)',
                /* glare highlight — bright white spot upper-left */
                'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.15) 35%, transparent 55%)',
                /* iridescent rainbow sheen — punched up */
                'conic-gradient(from 130deg at 50% 50%, rgba(255,140,140,0.3), rgba(255,210,100,0.3), rgba(140,255,170,0.3), rgba(110,200,255,0.3), rgba(175,140,255,0.3), rgba(255,150,190,0.3), rgba(255,140,140,0.3))',
              ].join(', '),
              border: '2px solid rgba(255,255,255,0.45)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              boxShadow: [
                `inset 0 0 ${b.size / 2.5}px rgba(255,255,255,0.25)`,
                `inset ${b.size / 4}px -${b.size / 4}px ${b.size / 3}px rgba(255,180,255,0.12)`,
                '0 4px 20px rgba(0,0,0,0.08)',
                '0 0 40px rgba(255,255,255,0.15)',
              ].join(', '),
            }}
            initial={{ opacity: 0, y: 0, scale: 0.3 }}
            animate={{
              opacity: [0, 1, 0.85, 0],
              y: b.drift,
              scale: [0.3, 1, 0.97, 0.9],
            }}
            transition={{
              duration: 6,
              delay: b.delay,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          />
        ))}
    </motion.div>,
    document.body,
  );
}
