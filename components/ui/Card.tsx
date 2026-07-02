'use client';

import { useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';

/**
 * NWL Australian School — Card
 * White (or Paper) surface, 16px radius, hairline navy-tinted border and a
 * soft navy shadow. `tone="navy"` flips to the dark atmospheric register.
 * `accent` paints a top edge in a level color.
 */
export default function Card({
  children,
  tone = 'light',
  accent = null,
  hover = false,
  padding = 'var(--space-5)',
  style = {},
  className = '',
}: {
  children: ReactNode;
  tone?: 'light' | 'navy';
  accent?: string | null;
  hover?: boolean;
  padding?: string;
  style?: CSSProperties;
  className?: string;
}) {
  const [over, setOver] = useState(false);
  const dark = tone === 'navy';
  return (
    <div
      className={className}
      onMouseEnter={() => hover && setOver(true)}
      onMouseLeave={() => hover && setOver(false)}
      style={{
        position: 'relative',
        background: dark ? 'rgba(244,238,226,0.045)' : 'var(--surface-card)',
        color: dark ? 'var(--text-on-navy)' : 'var(--text-primary)',
        border: `1px solid ${dark ? 'var(--border-on-navy)' : 'var(--border-subtle)'}`,
        borderRadius: 'var(--radius-lg)',
        boxShadow: over ? 'var(--shadow-lg)' : dark ? 'none' : 'var(--shadow-sm)',
        padding,
        overflow: 'hidden',
        transform: over ? 'translateY(-3px)' : 'none',
        transition: 'transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base)',
        ...style,
      }}
    >
      {accent && (
        <span
          aria-hidden="true"
          style={{ position: 'absolute', insetInline: 0, top: 0, height: '3px', background: accent }}
        />
      )}
      {children}
    </div>
  );
}
