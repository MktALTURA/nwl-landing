'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* ── Sparkle palette ─────────────────────────────────────── */
const COLORS = [
  '#FFD93D', // gold / sunshine
  '#FFD93D',
  '#6C5CE7', // blueberry
  '#6C5CE7',
  '#FFFFFF', // white
  '#FFFFFF',
  '#FFFFFF',
  '#4ECDC4', // ocean (accent)
];

/* ── Generate sparkles with random properties ──────────── */
function generateSparkles(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    size: 3 + Math.random() * 6, // 3-9px
    x: 3 + Math.random() * 94, // spread across viewport
    y: 10 + Math.random() * 80, // avoid very top/bottom edges
    delay: Math.random() * 2.2, // staggered spawn over 2.2s
    driftX: (Math.random() - 0.5) * 80, // horizontal wobble ±40px
    driftY: -(40 + Math.random() * 100), // float upward 40-140px
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    pulses: 2 + Math.floor(Math.random() * 2), // 2-3 shimmer pulses
  }));
}

const SPARKLES_DESKTOP = generateSparkles(28);
const SPARKLES_MOBILE = generateSparkles(16);

export default function SparkleAnimation() {
  const [phase, setPhase] = useState<'idle' | 'active' | 'fading' | 'done'>('idle');
  const [mounted, setMounted] = useState(false);
  const triggered = useRef(false);

  useEffect(() => {
    setMounted(true);

    let fadeTimer: ReturnType<typeof setTimeout>;
    let doneTimer: ReturnType<typeof setTimeout>;

    const onScrollStart = () => {
      if (triggered.current) return;
      triggered.current = true;
      setPhase('active');
      fadeTimer = setTimeout(() => setPhase('fading'), 4000);
      doneTimer = setTimeout(() => setPhase('done'), 5500);
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
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const sparkles = isMobile ? SPARKLES_MOBILE : SPARKLES_DESKTOP;

  return createPortal(
    <motion.div
      className="fixed inset-0 pointer-events-none z-[40]"
      animate={{ opacity: phase === 'fading' ? 0 : 1 }}
      transition={{ duration: phase === 'fading' ? 1.5 : 0 }}
    >
      {active &&
        sparkles.map((s) => {
          const isGold = s.color === '#FFD93D';
          const glowColor = isGold
            ? 'rgba(255,217,61,0.6)'
            : s.color === '#6C5CE7'
            ? 'rgba(108,92,231,0.5)'
            : s.color === '#4ECDC4'
            ? 'rgba(78,205,196,0.5)'
            : 'rgba(255,255,255,0.6)';

          // Build shimmer keyframes: fade in, pulse, fade out
          const opacityKeys = [0];
          for (let p = 0; p < s.pulses; p++) {
            opacityKeys.push(0.9, 0.3);
          }
          opacityKeys.push(0);

          return (
            <motion.div
              key={s.id}
              className="absolute rounded-full"
              style={{
                width: s.size,
                height: s.size,
                left: `${s.x}%`,
                top: `${s.y}%`,
                background: s.color,
                boxShadow: `0 0 ${s.size * 2}px ${s.size}px ${glowColor}, 0 0 ${s.size * 4}px ${s.size * 1.5}px ${glowColor}`,
              }}
              initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
              animate={{
                opacity: opacityKeys,
                x: s.driftX,
                y: s.driftY,
                scale: [0, 1.2, 0.8, 1, 0.6, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 1.5,
                delay: s.delay,
                ease: 'easeOut',
              }}
            />
          );
        })}
    </motion.div>,
    document.body,
  );
}
