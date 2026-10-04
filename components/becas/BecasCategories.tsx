'use client';

import { FiArrowRight, FiCheck } from 'react-icons/fi';
import { useBecas } from './BecasProvider';
import { CATEGORY_THEME } from './categoryTheme';
import SectionHeading from './SectionHeading';

/**
 * The four category cards. Every card shares one grid skeleton (icon row,
 * title block, requirement, needs list, CTA) with fixed minimum heights so
 * the dividers and the CTA line up across the row at every breakpoint.
 */
export default function BecasCategories() {
  const { copy, catalog, prefill, scrollTo, track } = useBecas();
  const enabled = new Set(catalog?.categorias.filter((c) => c.enabled).map((c) => c.key) ?? copy.categories.items.map((c) => c.key));
  const minimo = catalog?.categorias.find((c) => c.key === 'academica')?.promedioMinimo;

  return (
    <section id="categorias" className="section-padding bg-paper animate-section">
      <div className="container-custom">
        <SectionHeading eyebrow={copy.categories.eyebrow} title={copy.categories.title} accent={copy.categories.titleAccent} intro={copy.categories.intro} />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4" role="list">
          {copy.categories.items
            .filter((c) => enabled.has(c.key))
            .map((c) => {
              const t = CATEGORY_THEME[c.key];
              const Icon = t.icon;
              const requirement = c.key === 'academica' && minimo ? c.requirement.replace('8.5', String(minimo)) : c.requirement;
              const muted = t.dark ? 'text-paper/60' : 'text-n-500';
              const body = t.dark ? 'text-paper/85' : 'text-n-700';
              const accent = t.dark ? 'var(--nwl-gold)' : t.color;
              return (
                <li key={c.key} className="group">
                  <article
                    className={`relative h-full grid grid-rows-[auto_auto_auto_1fr_auto] rounded-2xl border p-6 md:p-7 transition-[transform,box-shadow] duration-300 group-hover:-translate-y-1 ${
                      t.dark ? 'bg-navy text-paper border-navy shadow-navy-lg' : 'bg-white border-n-200 shadow-navy-sm group-hover:shadow-navy-lg'
                    }`}
                  >
                    <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px] rounded-t-2xl" style={{ background: accent }} />

                    {/* row 1: icon */}
                    <span
                      className="inline-flex h-12 w-12 items-center justify-center rounded-full"
                      style={{ background: t.dark ? 'rgba(244,238,226,0.08)' : `color-mix(in srgb, ${t.color} 16%, white)`, color: accent }}
                    >
                      <Icon size={22} />
                    </span>

                    {/* row 2: title block, fixed height so row 3 starts level */}
                    <div className="mt-5 min-h-[7.5rem]">
                      <h3 className="font-display font-bold text-2xl leading-tight">{c.name}</h3>
                      <p className={`mt-1 italic ${t.dark ? 'text-gold' : 'text-gold-600'}`}>{c.tagline}</p>
                      <p className={`mt-3 inline-flex rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] ${t.dark ? 'border-paper/20 text-paper/70' : 'border-n-200 text-n-600'}`}>
                        {c.forWhom}
                      </p>
                    </div>

                    {/* row 3: requirement, fixed height */}
                    <p className={`mt-2 leading-relaxed sm:min-h-[6.5rem] ${body}`}>{requirement}</p>

                    {/* row 4: needs list, stretches */}
                    <div className={`mt-4 pt-5 border-t ${t.dark ? 'border-paper/15' : 'border-n-200'}`}>
                      <div className={`font-mono text-[10px] uppercase tracking-[0.2em] ${muted}`}>{copy.categories.needsLabel}</div>
                      <ul className="mt-2.5 space-y-2 text-sm">
                        {c.needs.map((n) => (
                          <li key={n} className="flex gap-2.5">
                            <span aria-hidden="true" className="mt-[3px] inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full" style={{ background: `color-mix(in srgb, ${accent} ${t.dark ? '28%' : '18%'}, transparent)`, color: accent }}>
                              <FiCheck size={10} strokeWidth={3} />
                            </span>
                            <span className={body}>{n}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* row 5: CTA */}
                    <button
                      type="button"
                      data-cta={`becas_cat_${c.key}`}
                      onClick={() => {
                        prefill({ categoria: c.key });
                        track('becas_category_select', { category: c.key, source: 'card' });
                        scrollTo('solicitud');
                      }}
                      className={`mt-6 min-h-[44px] inline-flex items-center justify-between rounded-full border px-4 font-semibold transition-colors ${
                        t.dark ? 'border-gold/60 text-gold hover:bg-gold hover:text-navy' : 'border-n-200 text-navy hover:border-gold hover:bg-gold/10'
                      }`}
                    >
                      {copy.categories.choose}
                      <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                    </button>
                  </article>
                </li>
              );
            })}
        </ul>
      </div>
    </section>
  );
}
