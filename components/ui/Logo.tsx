/**
 * NWL Australian School — primary logo lockup (official art).
 *
 * Renders the official horizontal lockup (gold kangaroo + navy "NWL Australian
 * School"). `variant="navy"` uses the full-color navy+gold lockup (for light /
 * Paper surfaces); `variant="white"` uses the all-white lockup (for dark /
 * outback-dawn surfaces). `markOnly` shows just the gold kangaroo isotype.
 */

const LOCKUP = {
  navy: '/images/brand/nwl-as-logo-color.png', // navy wordmark + gold kangaroo
  white: '/images/brand/nwl-as-logo-white.png',
};
const KANGAROO = {
  navy: '/images/brand/nwl-as-kangaroo-gold.png',
  white: '/images/brand/nwl-as-kangaroo-white.png',
};

type LogoProps = {
  variant?: 'navy' | 'white';
  /** rendered height in px */
  height?: number;
  /** show only the kangaroo isotype */
  markOnly?: boolean;
  className?: string;
};

export default function Logo({
  variant = 'navy',
  height = 44,
  markOnly = false,
  className = '',
}: LogoProps) {
  const src = markOnly
    ? KANGAROO[variant] ?? KANGAROO.navy
    : LOCKUP[variant] ?? LOCKUP.navy;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt="NWL Australian School"
      style={{ height, width: 'auto', display: 'block' }}
      className={className}
    />
  );
}
