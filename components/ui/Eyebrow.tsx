import type { CSSProperties, ReactNode } from 'react';

/**
 * NWL Australian School — Eyebrow
 * The signature monospaced kicker: uppercase, wide tracking, gold,
 * preceded by a short rule. Sits above headings and section titles.
 */
export default function Eyebrow({
  children,
  rule = true,
  color = 'var(--nwl-gold)',
  style = {},
  className = '',
}: {
  children: ReactNode;
  rule?: boolean;
  color?: string;
  style?: CSSProperties;
  className?: string;
}) {
  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '12px',
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--fs-eyebrow)',
        letterSpacing: 'var(--ls-eyebrow)',
        textTransform: 'uppercase',
        color,
        ...style,
      }}
    >
      {rule && (
        <span
          aria-hidden="true"
          style={{ width: '38px', height: '1px', background: 'currentColor', flexShrink: 0 }}
        />
      )}
      {children}
    </span>
  );
}
