'use client';

import Tag from '@/components/ui/Tag';
import { useBecas } from './BecasProvider';
import SectionHeading from './SectionHeading';

export default function BecasHowItWorks() {
  const { copy, catalog } = useBecas();
  const h = copy.how;
  const dias = catalog?.programa.ventanaDias ?? 14;

  return (
    <section id="como-funciona" className="section-padding bg-white animate-section">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <SectionHeading eyebrow={h.eyebrow} title={h.title} accent={h.titleAccent} />
          <Tag tone="gold" solid>
            {h.limited}
          </Tag>
        </div>

        <ol className="mt-12 grid md:grid-cols-3 gap-8 md:gap-6 relative">
          {/* connecting rule (desktop) */}
          <span aria-hidden="true" className="hidden md:block absolute left-[8%] right-[8%] top-[22px] h-px bg-gradient-to-r from-gold/0 via-gold/60 to-gold/0" />
          {h.steps.map((s, i) => (
            <li key={s.n} className="relative">
              <div className="flex items-center gap-4">
                <span className="relative z-[1] inline-flex h-11 w-11 items-center justify-center rounded-full bg-navy text-gold font-mono text-sm tracking-wider shadow-navy-md">
                  {s.n}
                </span>
                <span className="wine-divider hidden md:block" />
              </div>
              <h3 className="font-display font-bold text-2xl text-navy mt-5">
                {i === 2 ? s.title.replace('14', String(dias)) : s.title}
              </h3>
              <p className="mt-2 text-n-600 leading-relaxed">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
