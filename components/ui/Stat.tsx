import type { CSSProperties, ReactNode } from 'react';

/**
 * NWL Australian School — Stat
 * Big Gabarito number with a mono label, in the brand's data-callout style.
 * Optional `unit` renders smaller + italic gold (e.g. %, /10).
 */
export default function Stat({
  value,
  unit = null,
  label,
  tone = 'light',
  align = 'left',
  style = {},
  className = '',
}: {
  value: ReactNode;
  unit?: ReactNode;
  label: ReactNode;
  tone?: 'light' | 'navy';
  align?: CSSProperties['textAlign'];
  style?: CSSProperties;
  className?: string;
}) {
  const dark = tone === 'navy';
  return (
    <div className={className} style={{ textAlign: align, ...style }}>
      <div
        className="font-display"
        style={{
          fontWeight: 500,
          fontSize: 'var(--fs-h1)',
          lineHeight: 1,
          letterSpacing: 'var(--ls-display)',
          color: dark ? 'var(--nwl-paper)' : 'var(--text-primary)',
        }}
      >
        {value}
        {unit && (
          <span style={{ fontSize: '0.46em', fontStyle: 'italic', color: 'var(--nwl-gold)', marginLeft: '2px' }}>
            {unit}
          </span>
        )}
      </div>
      <div
        className="font-mono"
        style={{
          fontSize: 'var(--fs-eyebrow)',
          letterSpacing: 'var(--ls-eyebrow)',
          textTransform: 'uppercase',
          color: dark ? 'var(--text-on-navy-muted)' : 'var(--text-muted)',
          marginTop: '8px',
        }}
      >
        {label}
      </div>
    </div>
  );
}
