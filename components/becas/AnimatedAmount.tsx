'use client';

import { useEffect, useState } from 'react';
import { animate, useReducedMotion } from 'framer-motion';

/** A number that eases to its new value (money, percentages). Static under reduced motion. */
export default function AnimatedAmount({
  value,
  format,
  className = '',
}: {
  value: number;
  format: (n: number) => string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(value);

  useEffect(() => {
    if (reduce) {
      setShown(value);
      return;
    }
    const controls = animate(shown, value, {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setShown(v),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, reduce]);

  return <span className={`tabular-nums ${className}`}>{format(shown)}</span>;
}
