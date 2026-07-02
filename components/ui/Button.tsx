'use client';

import { useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';

/**
 * NWL Australian School — Button
 * Pill-shaped, Gabarito, with the brand's lift-on-hover motion.
 * Variants: primary (gold), secondary (navy), ghost (outline).
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  iconLeft = null,
  iconRight = null,
  type = 'button',
  onClick,
  href,
  style = {},
  className = '',
}: {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  /** when set, renders as an anchor */
  href?: string;
  style?: CSSProperties;
  className?: string;
}) {
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);

  const sizes = {
    sm: { padding: '8px 16px', font: '0.8125rem' },
    md: { padding: '12px 22px', font: '0.9375rem' },
    lg: { padding: '15px 30px', font: '1.0625rem' },
  };
  const s = sizes[size] || sizes.md;

  const palette = {
    primary: {
      bg: hover ? 'var(--nwl-gold-400)' : 'var(--nwl-gold)',
      color: 'var(--text-on-gold)',
      border: '1px solid transparent',
      shadow: hover ? 'var(--shadow-gold)' : 'var(--shadow-sm)',
    },
    secondary: {
      bg: hover ? 'var(--nwl-navy-700)' : 'var(--nwl-navy)',
      color: 'var(--nwl-paper)',
      border: '1px solid transparent',
      shadow: hover ? 'var(--shadow-md)' : 'var(--shadow-sm)',
    },
    ghost: {
      bg: 'transparent',
      color: hover ? 'var(--nwl-gold-600)' : 'var(--text-primary)',
      border: `1px solid ${hover ? 'var(--nwl-gold)' : 'var(--border-strong)'}`,
      shadow: 'none',
    },
  };
  const p = palette[variant] || palette.primary;

  const sharedStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '9px',
    fontFamily: 'var(--font-brand)',
    fontWeight: 600,
    fontSize: s.font,
    lineHeight: 1,
    whiteSpace: 'nowrap',
    padding: s.padding,
    borderRadius: 'var(--radius-pill)',
    background: p.bg,
    color: p.color,
    border: p.border,
    boxShadow: p.shadow,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.45 : 1,
    transform: disabled ? 'none' : active ? 'translateY(0)' : hover ? 'translateY(-2px)' : 'none',
    transition:
      'transform var(--dur-base) var(--ease-out), background var(--dur-base), box-shadow var(--dur-base), color var(--dur-base), border-color var(--dur-base)',
    textDecoration: 'none',
    ...style,
  };

  const handlers = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setActive(false);
    },
    onMouseDown: () => setActive(true),
    onMouseUp: () => setActive(false),
  };

  const inner = (
    <>
      {iconLeft}
      <span>{children}</span>
      {iconRight}
    </>
  );

  if (href && !disabled) {
    return (
      <a href={href} className={className} style={sharedStyle} {...handlers} onClick={onClick}>
        {inner}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={className}
      style={sharedStyle}
      {...handlers}
    >
      {inner}
    </button>
  );
}
