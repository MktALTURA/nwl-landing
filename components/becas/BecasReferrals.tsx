'use client';

import { useBecas } from './BecasProvider';
import SectionHeading from './SectionHeading';

export default function BecasReferrals() {
  const { copy, catalog } = useBecas();
  const r = copy.referrals;
  const base = catalog?.programa.becaPct ?? 30;
  const step = catalog?.programa.referidoPct ?? 10;
  const steps = Math.min(catalog?.programa.referidoMax ?? 7, Math.ceil((100 - base) / step));

  return (
    <section id="referidos" className="section-padding nwl-bg-dawn animate-section">
      <div className="container-custom grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6">
          <SectionHeading eyebrow={r.eyebrow} title={r.title} accent={r.titleAccent} tone="navy" />
          <p className="mt-5 text-lg text-paper/80 leading-relaxed">{r.body}</p>
          <p className="mt-4 text-sm text-paper/55 leading-relaxed">{r.note}</p>
        </div>

        <div className="lg:col-span-6">
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold mb-4">{r.ladder}</div>
          <ol className="flex items-end gap-2 h-44" aria-label={r.ladder}>
            {Array.from({ length: steps + 1 }, (_, n) => {
              const pct = Math.min(100, base + step * n);
              const h = 28 + (pct / 100) * 72;
              return (
                <li key={n} className="flex-1 flex flex-col items-center gap-2 min-w-0">
                  <span className="font-display font-bold text-paper text-sm sm:text-base tabular-nums">{pct}%</span>
                  <div className="w-full rounded-t-md bg-gold/90" style={{ height: `${h}%`, opacity: 0.55 + (n / steps) * 0.45 }} />
                  <span className="font-mono text-[10px] text-paper/55 tabular-nums">{n === 0 ? 'base' : `+${n}`}</span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
