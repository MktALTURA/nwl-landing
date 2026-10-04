/**
 * The site's section heading pattern (mono gold eyebrow + rule, display
 * title with an italic gold accent), packaged so the becas sections stay
 * consistent with each other. Server-safe.
 */
export default function SectionHeading({
  eyebrow,
  title,
  accent,
  intro,
  tone = 'light',
  align = 'left',
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  intro?: string;
  tone?: 'light' | 'navy';
  align?: 'left' | 'center';
}) {
  const dark = tone === 'navy';
  return (
    <div className={align === 'center' ? 'text-center max-w-2xl mx-auto' : 'max-w-2xl'}>
      <span className={`inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-gold`}>
        <span className="w-9 h-px bg-gold" />
        {eyebrow}
      </span>
      <h2 className={`font-display font-bold text-4xl md:text-5xl leading-[1.05] mt-4 ${dark ? 'text-paper' : 'text-navy'}`}>
        {title} {accent && <span className="italic text-gold">{accent}</span>}
      </h2>
      {intro && <p className={`mt-4 text-lg leading-relaxed ${dark ? 'text-paper/75' : 'text-n-600'}`}>{intro}</p>}
    </div>
  );
}
