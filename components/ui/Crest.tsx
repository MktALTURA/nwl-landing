import type { CSSProperties } from 'react';

type Level = 'brand' | 'gold' | 'kinder' | 'elementary' | 'middle' | 'high';

const LEVELS: Record<Level, { color: string; label: string }> = {
  brand: { color: 'var(--nwl-navy)', label: 'NWL' },
  gold: { color: 'var(--nwl-gold)', label: 'NWL' },
  kinder: { color: 'var(--nwl-galah)', label: 'Kinder / Maternal' },
  elementary: { color: 'var(--nwl-bondi)', label: 'Elementary' },
  middle: { color: 'var(--nwl-coral-sea)', label: 'Middle School' },
  high: { color: 'var(--nwl-jacaranda)', label: 'High School' },
};
const DARK_TEXT: Partial<Record<Level, boolean>> = { elementary: true, kinder: true };

/* Official construction (crest hierarchy art): a thin open-book bar (dipping
   at the center spine) floats above a compact navy escutcheon bearing a large
   white kangaroo; the bottom is layered — navy over a white chevron band over
   the level-colored chevron. */
const BOOK =
  'M5 10 L42 10 Q49 10 50 15 Q51 10 58 10 L95 10 L95 15 L58 15 Q51 15 50 20 Q49 15 42 15 L5 15 Z';
/* Same top/side contour (with the spine divot), three bottom depths — stacked color → white → navy */
const TOP = 'M8 22 L43 22 Q49 22 50 27 Q51 22 57 22 L92 22 Q95 22 95 25 ';
const SHIELD_COLOR = TOP + 'V70 Q95 98 50 128 Q5 98 5 70 V25 Q5 22 8 22 Z';
const SHIELD_WHITE = TOP + 'V68 Q95 93 50 120 Q5 93 5 68 V25 Q5 22 8 22 Z';
const SHIELD_NAVY = TOP + 'V66 Q95 88 50 112 Q5 88 5 66 V25 Q5 22 8 22 Z';

/**
 * NWL Australian School — Crest (Escudo)
 * The level crest: navy shield + white kangaroo + open book, banded in the
 * level color. Auxiliary to the main logo. Provide `kangarooSrc`.
 */
export default function Crest({
  level = 'brand',
  kangarooSrc = '/images/brand/nwl-as-kangaroo-white.png',
  size = 132,
  showBanner = true,
  showBook = true,
  label,
  style = {},
  className = '',
}: {
  level?: Level;
  kangarooSrc?: string;
  size?: number;
  showBanner?: boolean;
  showBook?: boolean;
  label?: string;
  style?: CSSProperties;
  className?: string;
}) {
  const lv = LEVELS[level] || LEVELS.brand;
  const text = label != null ? label : lv.label;

  return (
    <div
      className={className}
      style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', ...style }}
    >
      <div style={{ position: 'relative', width: size, height: size * 1.3 }}>
        <svg
          viewBox="0 0 100 130"
          width={size}
          height={size * 1.3}
          role="img"
          aria-label={'Escudo NWL — ' + text}
          style={{ display: 'block', filter: 'drop-shadow(0 10px 18px rgba(7,22,56,.28))' }}
        >
          {showBook && <path d={BOOK} fill={lv.color} />}
          <path d={SHIELD_COLOR} fill={lv.color} />
          <path d={SHIELD_WHITE} fill="var(--nwl-white)" />
          <path d={SHIELD_NAVY} fill="var(--nwl-navy)" />
        </svg>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={kangarooSrc}
          alt=""
          style={{
            position: 'absolute',
            left: '15%',
            top: '32%',
            width: '70%',
            height: '30%',
            objectFit: 'contain',
            filter: 'brightness(0) invert(1)',
            pointerEvents: 'none',
          }}
        />
      </div>
      {showBanner && (
        <div
          className="font-mono"
          style={{
            position: 'relative',
            zIndex: 2,
            marginTop: size * 0.03,
            background: lv.color,
            color: DARK_TEXT[level] ? 'var(--text-on-gold)' : 'var(--nwl-paper)',
            fontSize: Math.max(9, size * 0.082),
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            padding: `${size * 0.055}px ${size * 0.14}px`,
            borderRadius: 'var(--radius-sm)',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          {text}
        </div>
      )}
    </div>
  );
}
