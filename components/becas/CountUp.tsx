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

  useEffect(() => {
    if (reduce || started.current || !ref.current) return;
    const el = ref.current;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        io.disconnect();
        const t0 = performance.now();
        const from = 0;
        const tick = (now: number) => {
          const p = Math.min(1, (now - t0) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setShown(Math.round(from + (value - from) * eased));
          if (p < 1) requestAnimationFrame(tick);
        };
        setShown(0);
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, duration, reduce]);

  // Keep in sync if the live value changes after the count-up ran.
  useEffect(() => {
    if (started.current || reduce) setShown(value);
  }, [value, reduce]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {format(shown)}
    </span>
  );
}
