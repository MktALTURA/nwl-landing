'use client';

import { useBecas } from './BecasProvider';
import CountUp from './CountUp';
import { formatCiclo } from '@/lib/becas/format';

/**
 * The "becas disponibles" card. Every figure is real: cupo minus the hojas
 * and approvals already holding a spot, per campus. Absent entirely when the
 * program has no cupo configured, so the page never shows a made-up number.
 */
export default function BecasCounter() {
  const { catalog, copy, live } = useBecas();
  if (!catalog) return null;

  const actual = catalog.ciclos.find((c) => c.tipo === 'actual')?.key;
  const total = live?.cuposTotal ?? catalog.cuposTotal;
  if (total === null || total === undefined) return null;

  const perCampus = catalog.campuses.map((c) => {
    const liveValue = live?.cupos?.[c.slug];
    const fromCatalog = actual ? c.ciclos[actual]?.cupo : undefined;
    const value = liveValue !== undefined ? liveValue : fromCatalog?.visible ? fromCatalog.restante : null;
    return { slug: c.slug, label: c.label, value };
  });

  return (
    <div
      className="relative rounded-3xl border border-paper/15 bg-paper/[0.05] backdrop-blur-sm p-6 md:p-8 shadow-navy-xl"
      aria-live="polite"
    >
      <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold">
        {copy.counter.eyebrow}
        {actual && <span className="text-paper/50"> · {formatCiclo(actual)}</span>}
      </div>

      <div className="mt-3 flex items-end gap-3">
        <CountUp value={total} className="font-display font-bold text-6xl md:text-7xl leading-none text-gold" />
        <span className="mb-2 text-paper/70 text-sm md:text-base">{copy.counter.label}</span>
      </div>

      <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2.5" aria-label={copy.counter.perCampus}>
        {perCampus.map((c) => (
          <li key={c.slug} className="flex items-baseline justify-between gap-3 border-b border-paper/10 pb-1.5">
            <span className="text-sm text-paper/80">{c.label}</span>
            <span className="font-mono text-sm tabular-nums text-paper">
              {c.value === null ? <span className="text-paper/50">—</span> : c.value === 0 ? copy.counter.full : c.value}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-paper/55">
        <span className="relative flex h-1.5 w-1.5">
          <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-eucalyptus opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-eucalyptus" />
        </span>
        {copy.counter.updated}
      </div>
    </div>
  );
}
