'use client';

import { useEffect, useRef } from 'react';
import { FiMinus, FiPlus, FiArrowRight, FiInfo } from 'react-icons/fi';
import { motion, useReducedMotion } from 'framer-motion';
import type { SiteCampusSlug } from '@/lib/becas/contract';
import { formatCiclo, formatMXN, formatPct } from '@/lib/becas/format';
import { useBecas } from './BecasProvider';
import PillGroup from './PillGroup';
import SectionHeading from './SectionHeading';
import AnimatedAmount from './AnimatedAmount';
import { BECAS_WHATSAPP } from './BecasFinalCTA';

/* ------------------------------------------------------------------ */
/*  Calculator. Two variants decided by the catalog:                   */
/*   - 'precios': pure lookup of the worker's precomputed quote table  */
/*     (the site never does money math, so rounding matches the hoja). */
/*   - 'ahorro': percentages and "N of 10 colegiaturas" bars; no peso  */
/*     amount exists anywhere in this bundle in that mode.             */
/* ------------------------------------------------------------------ */

export default function BecasCalculator() {
  const { catalog, copy, calc, setCampus, setCiclo, setGrado, setReferrals, selection, scrollTo, track, demo } = useBecas();
  const c = copy.calculator;
  const startedRef = useRef(false);
  const resultRef = useRef(false);

  const markStart = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    track('becas_calc_start');
  };

  useEffect(() => {
    if (selection && !resultRef.current) {
      resultRef.current = true;
      track('becas_calc_result', {
        campus: selection.campus.slug,
        ciclo: selection.ciclo,
        level: selection.grado.nivel,
        referrals: calc.referrals,
      });
    }
  }, [selection, calc.referrals, track]);

  if (!catalog || !catalog.open) {
    return (
      <section id="calculadora" className="section-padding bg-n-50 animate-section">
        <div className="container-custom">
          <SectionHeading eyebrow={c.eyebrow} title={c.title} accent={c.titleAccent} />
          <ClosedNotice />
        </div>
      </section>
    );
  }

  const campusOptions = catalog.campuses.map((cp) => ({ value: cp.slug as SiteCampusSlug, label: cp.label }));
  const cicloOptions = catalog.ciclos.map((ci) => ({
    value: ci.key,
    label: ci.tipo === 'actual' ? c.cicloActual : c.cicloSiguiente,
    hint: formatCiclo(ci.key),
  }));
  const campusData = calc.campus ? catalog.campuses.find((cp) => cp.slug === calc.campus) : undefined;
  const cicloData = campusData && calc.ciclo ? campusData.ciclos[calc.ciclo] : undefined;
  const grados = cicloData?.grados ?? [];
  const max = catalog.programa.referidoMax;

  return (
    <section id="calculadora" className="section-padding bg-n-50 animate-section">
      <div className="container-custom">
        <SectionHeading eyebrow={c.eyebrow} title={c.title} accent={c.titleAccent} intro={c.intro} />

        <div className="mt-10 rounded-3xl bg-white shadow-navy-lg border border-n-200 overflow-hidden grid lg:grid-cols-12">
          {/* ── Inputs ── */}
          <div className="lg:col-span-6 p-6 md:p-10 space-y-8">
            <PillGroup
              label={c.campus}
              options={campusOptions}
              value={calc.campus}
              onChange={(v) => {
                markStart();
                setCampus(v);
              }}
              columns={2}
            />
            <PillGroup
              label={c.ciclo}
              options={cicloOptions}
              value={calc.ciclo}
              onChange={(v) => {
                markStart();
                setCiclo(v);
              }}
              columns={2}
            />

            <div>
              <label htmlFor="becas-grado" className="block font-mono text-[11px] uppercase tracking-[0.2em] text-n-500 mb-2.5">
                {c.grado}
              </label>
              <div className="relative">
                <select
                  id="becas-grado"
                  value={calc.grado ?? ''}
                  disabled={!campusData}
                  onChange={(e) => {
                    markStart();
                    setGrado(e.target.value);
                  }}
                  className="w-full appearance-none min-h-[48px] rounded-xl border border-n-300 bg-white px-4 pr-10 text-base text-navy focus:outline-none focus:ring-2 focus:ring-gold/60 focus:border-gold disabled:opacity-50"
                >
                  <option value="" disabled>
                    {c.gradoPlaceholder}
                  </option>
                  {grados.map((g) => (
                    <option key={g.key} value={g.key}>
                      {g.label}
                    </option>
                  ))}
                </select>
                <span aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-n-500">
                  ▾
                </span>
              </div>
              {cicloData?.referencia && (
                <p className="mt-2.5 flex gap-2 text-sm text-n-600 leading-snug">
                  <FiInfo className="mt-[3px] shrink-0 text-gold-600" />
                  <span>
                    {c.referencia
                      .replace('{ciclo}', formatCiclo(calc.ciclo ?? ''))
                      .replace('{ref}', formatCiclo(cicloData.referencia.ciclo))
                      .replace('{ajuste}', cicloData.referencia.ajusteEstimado)}
                  </span>
                </p>
              )}
            </div>

            <ReferralStepper
              value={calc.referrals}
              max={max}
              onChange={(n) => {
                markStart();
                setReferrals(n);
                track('becas_calc_referrals', { referrals: n });
              }}
              label={c.referrals}
              hint={calc.referrals >= max || (catalog.programa.becaPct + catalog.programa.referidoPct * calc.referrals) >= 100 ? c.referralsMax : c.referralsHint}
            />
          </div>

          {/* ── Result ── */}
          <div className="lg:col-span-6 nwl-bg-dawn p-6 md:p-10 flex flex-col">
            {catalog.variant === 'precios' ? <ResultPrices /> : <ResultSavings />}

            <ul className="mt-8 space-y-1.5 text-[13px] leading-snug text-paper/60 border-t border-paper/15 pt-5">
              {c.finePrint.map((line) => (
                <li key={line} className="flex gap-2">
                  <span aria-hidden="true" className="mt-[7px] h-1 w-1 rounded-full bg-gold shrink-0" />
                  {line}
                </li>
              ))}
            </ul>

            <button
              type="button"
              data-cta="becas_calc_apply"
              disabled={!selection}
              onClick={() => {
                track('becas_calc_apply', { referrals: calc.referrals });
                scrollTo('solicitud');
              }}
              className="btn-primary mt-7 inline-flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {c.cta}
              <FiArrowRight />
            </button>
            {demo && <span className="sr-only">{copy.demoRibbon}</span>}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────── pieces ───────────────────────────── */

function ReferralStepper({
  value,
  max,
  onChange,
  label,
  hint,
}: {
  value: number;
  max: number;
  onChange: (n: number) => void;
  label: string;
  hint: string;
}) {
  const atMax = value >= max;
  return (
    <div>
      <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-n-500 mb-2.5">{label}</div>
      <div className="flex items-center gap-4">
        <div className="inline-flex items-center rounded-full border border-n-300 bg-white" role="group" aria-label={label}>
          <button
            type="button"
            aria-label="−"
            disabled={value <= 0}
            onClick={() => onChange(Math.max(0, value - 1))}
            className="h-12 w-12 inline-flex items-center justify-center rounded-full text-navy hover:text-gold-600 disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
          >
            <FiMinus />
          </button>
          <output className="w-12 text-center font-display font-bold text-2xl text-navy tabular-nums" aria-live="polite">
            {value}
          </output>
          <button
            type="button"
            aria-label="+"
            disabled={atMax}
            onClick={() => onChange(Math.min(max, value + 1))}
            className="h-12 w-12 inline-flex items-center justify-center rounded-full text-navy hover:text-gold-600 disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
          >
            <FiPlus />
          </button>
        </div>
        <span className="text-sm text-n-600 leading-snug">{hint}</span>
      </div>
    </div>
  );
}

function ResultPrices() {
  const { catalog, copy, calc, selection } = useBecas();
  const c = copy.calculator;
  if (!catalog) return null;
  const rowsQ = selection?.grado.quote?.beca ?? [];
  const row = rowsQ.find((b) => b.referidos === calc.referrals) ?? rowsQ[rowsQ.length - 1];
  const lista = selection?.grado.quote?.lista;

  if (!row || !lista) {
    return <Placeholder text={c.pickToSee} />;
  }

  return (
    <div className="flex-1">
      <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold">{c.withBeca} · {formatPct(row.pct)}</div>
      <div className="mt-3 flex items-baseline gap-3 flex-wrap">
        <AnimatedAmount value={row.colegiatura1a10} format={formatMXN} className="font-display font-bold text-6xl md:text-7xl leading-none text-gold" />
        <span className="text-paper/55 line-through text-lg tabular-nums">{formatMXN(lista.colegiaturaBase)}</span>
      </div>
      <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-paper/65">{c.perMonth}</div>

      <div className="mt-7 grid grid-cols-2 gap-3">
        <Metric label={c.savingsMonth} value={<AnimatedAmount value={row.ahorroMensualVsLista} format={formatMXN} />} />
        <Metric label={c.savingsYear} value={<AnimatedAmount value={row.ahorroCicloVsLista} format={formatMXN} />} highlight />
      </div>

      <table className="sr-only">
        <caption>{c.srTable.caption}</caption>
        <thead>
          <tr>
            <th scope="col">{c.srTable.concept}</th>
            <th scope="col">{c.srTable.amount}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">{c.listPrice}</th>
            <td>{formatMXN(lista.colegiaturaBase)}</td>
          </tr>
          <tr>
            <th scope="row">{c.withBeca}</th>
            <td>{formatMXN(row.colegiatura1a10)}</td>
          </tr>
          <tr>
            <th scope="row">{c.savingsYear}</th>
            <td>{formatMXN(row.ahorroCicloVsLista)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function ResultSavings() {
  const { catalog, copy, calc, selection } = useBecas();
  const reduce = useReducedMotion();
  const c = copy.calculator;
  if (!catalog) return null;
  const rows = catalog.programa.ahorro ?? [];
  const row = rows[Math.min(calc.referrals, rows.length - 1)];
  const bars = catalog.programa.pagosPorCiclo;

  if (!row || !selection) {
    return <Placeholder text={c.pickToSee} />;
  }

  // "Equivale a N de M colegiaturas": the share of the year's payments the
  // beca covers, drawn as bars so the number has a shape.
  const covered = (row.pctBeca / 100) * bars;

  return (
    <div className="flex-1">
      <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-gold">{c.withBeca}</div>
      <div className="mt-3 flex items-baseline gap-3">
        <AnimatedAmount value={row.pctBeca} format={(n) => formatPct(n)} className="font-display font-bold text-7xl md:text-8xl leading-none text-gold" />
        <span className="text-paper/75 max-w-[10rem] leading-snug">{c.pctOff}</span>
      </div>

      <div className="mt-8">
        <div className="flex items-baseline justify-between">
          <span className="font-display font-bold text-2xl text-paper tabular-nums">
            <AnimatedAmount value={covered} format={(n) => n.toFixed(1).replace(/\.0$/, '')} /> <span className="text-base font-normal text-paper/70">{c.bars}</span>
          </span>
        </div>
        <div className="mt-3 grid gap-1.5" style={{ gridTemplateColumns: `repeat(${bars}, minmax(0, 1fr))` }} aria-hidden="true">
          {Array.from({ length: bars }, (_, i) => {
            const fill = Math.max(0, Math.min(1, covered - i));
            return (
              <div key={i} className="h-14 rounded-md bg-paper/10 overflow-hidden relative">
                <motion.div
                  className="absolute inset-x-0 bottom-0 bg-gold"
                  initial={false}
                  animate={{ height: `${fill * 100}%` }}
                  transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 160, damping: 20, delay: i * 0.03 }}
                />
              </div>
            );
          })}
        </div>
        <p className="mt-3 text-sm text-paper/60">{c.barsHint}</p>
      </div>
    </div>
  );
}

function Metric({ label, value, highlight = false }: { label: string; value: React.ReactNode; highlight?: boolean }) {
  return (
    <div className={`rounded-2xl p-4 ${highlight ? 'bg-gold text-[#1C0F00] shadow-gold' : 'bg-paper/[0.07] text-paper border border-paper/15'}`}>
      <div className={`font-mono text-[10px] uppercase tracking-[0.18em] ${highlight ? 'text-[#1C0F00]/70' : 'text-paper/60'}`}>{label}</div>
      <div className="mt-1 font-display font-bold text-2xl md:text-3xl leading-none">{value}</div>
    </div>
  );
}

function Placeholder({ text }: { text: string }) {
  return (
    <div className="flex-1 flex items-center">
      <div className="rounded-2xl border border-dashed border-paper/25 p-6 text-paper/70 leading-relaxed w-full">{text}</div>
    </div>
  );
}

function ClosedNotice() {
  const { copy } = useBecas();
  return (
    <div className="mt-10 rounded-3xl bg-white border border-n-200 p-8 md:p-10 max-w-2xl">
      <h3 className="font-display font-bold text-2xl text-navy">{copy.closed.title}</h3>
      <p className="mt-3 text-n-600 leading-relaxed">{copy.closed.body}</p>
      <a
        href={`https://wa.me/${BECAS_WHATSAPP}?text=${encodeURIComponent(copy.finalCta.whatsappText)}`}
        target="_blank"
        rel="noopener noreferrer"
        data-cta="becas_closed_whatsapp"
        className="btn-primary mt-6 inline-flex"
      >
        {copy.closed.cta}
      </a>
    </div>
  );
}
