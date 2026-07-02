import type { CSSProperties, ReactNode } from 'react';

const LEVEL_COLORS: Record<string, string> = {
  navy: 'var(--nwl-navy)',
  gold: 'var(--nwl-gold)',
  eucalyptus: 'var(--nwl-eucalyptus)',
  wattle: 'var(--nwl-wattle)',
  coralSea: 'var(--nwl-coral-sea)',
  jacaranda: 'var(--nwl-jacaranda)',
};
const ON_LIGHT: Record<string, boolean> = { wattle: true, eucalyptus: true };

/**
 * NWL Australian School — Tag
 * A mono, uppercase pill for metadata, levels and categories.
 * `tone` accepts a brand level color; `solid` fills it, otherwise outlined.
 */
export default function Tag({
  children,
  tone = 'navy',
  solid = false,
  style = {},
  className = '',
}: {
  children: ReactNode;
  tone?: string;
  solid?: boolean;
  style?: CSSProperties;
  className?: string;
}) {
  const c = LEVEL_COLORS[tone] || tone;
  const textOnSolid = ON_LIGHT[tone] ? 'var(--text-on-gold)' : 'var(--nwl-paper)';
  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.625rem',
        fontWeight: 500,
        letterSpacing: 'var(--ls-label)',
        textTransform: 'uppercase',
        padding: '5px 11px',
        borderRadius: 'var(--radius-pill)',
        background: solid ? c : 'transparent',
        color: solid ? textOnSolid : c,
        border: solid ? '1px solid transparent' : `1px solid ${c}`,
        ...style,
      }}
    >
      {children}
    </span>
  );
}
