import type { CSSProperties } from 'react';

function starPath(cx: number, cy: number, rOuter: number, points: number, rotDeg = 0) {
  const rInner = (rOuter * 4) / 9; // Commonwealth star ratio
  const n = points * 2;
  const rot = ((rotDeg - 90) * Math.PI) / 180;
  let d = '';
  for (let i = 0; i < n; i++) {
    const r = i % 2 === 0 ? rOuter : rInner;
    const a = rot + (Math.PI * i) / points;
    d += (i === 0 ? 'M' : 'L') + (cx + r * Math.cos(a)).toFixed(2) + ' ' + (cy + r * Math.sin(a)).toFixed(2);
  }
  return d + 'Z';
}

/* Positions follow the Australian flag's fly half: Gamma (top), Alpha
   (bottom), Beta (left), Delta (right), Epsilon (small, 5-pointed). */
const STARS = [
  { x: 100, y: 26, r: 16, p: 7 },
  { x: 100, y: 234, r: 16, p: 7 },
  { x: 32, y: 118, r: 16, p: 7 },
  { x: 168, y: 96, r: 16, p: 7 },
  { x: 124, y: 148, r: 9, p: 5 },
];

/**
 * NWL Australian School — SouthernCross
 * The constellation that names the brand navy, with correct Australian-flag
 * geometry (7-pointed Commonwealth stars + the small 5-pointed Epsilon).
 * A quiet motif for dark surfaces.
 */
export default function SouthernCross({
  height = 120,
  color = 'var(--nwl-paper)',
  opacity = 0.5,
  style = {},
  className = '',
}: {
  height?: number;
  color?: string;
  opacity?: number;
  style?: CSSProperties;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 200 260"
      role="img"
      aria-label="Southern Cross constellation"
      className={className}
      style={{ height, width: 'auto', display: 'block', opacity, ...style }}
    >
      {STARS.map((s, i) => (
        <path key={i} d={starPath(s.x, s.y, s.r, s.p)} fill={color} />
      ))}
    </svg>
  );
}
