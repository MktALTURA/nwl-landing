'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * Counts from 0 to `value` once the element enters the viewport. Renders the
 * final value immediately for reduced-motion visitors and on the server, so
 * the number is never missing from the HTML.
 */
export default function CountUp({
  value,
  duration = 1100,
  className = '',
  format = (n: number) => String(n),
}: {
  value: number;
  duration?: number;
  className?: string;
  format?: (n: number) => string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);
  const started = useRef(false);
  const raf = useRef<number | null>(null);
  // Always animate toward the LATEST value: the live counter can arrive
  // mid-animation and must win over the ISR figure the animation started with.
  const target = useRef(value);
  target.current = value;

  useEffect(() => {
    if (reduce || started.current || !ref.current) return;
    const el = ref.current;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        io.disconnect();
        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - t0) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setShown(Math.round(target.current * eased));
          raf.current = p < 1 ? requestAnimationFrame(tick) : null;
        };
        setShown(0);
        raf.current = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (raf.current !== null) cancelAnimationFrame(raf.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration, reduce]);

  // Once the animation is over (or never ran), mirror the value directly.
  useEffect(() => {
    if (reduce || (started.current && raf.current === null)) setShown(value);
  }, [value, reduce]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {format(shown)}
    </span>
  );
}
