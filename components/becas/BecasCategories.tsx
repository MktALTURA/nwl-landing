'use client';

import { FiActivity, FiAward, FiFeather, FiHeart, FiArrowRight } from 'react-icons/fi';
import type { BecaCategoria } from '@/lib/becas/contract';
import { useBecas } from './BecasProvider';
import SectionHeading from './SectionHeading';

/* Level colours are avoided on purpose: on this site they mean school levels.
   Categories get the brand accents instead. */
const ACCENT: Record<BecaCategoria, { color: string; icon: React.ComponentType<{ size?: number; className?: string }>; dark?: boolean }> = {
  deportiva: { color: 'var(--nwl-eucalyptus)', icon: FiActivity },
  academica: { color: 'var(--nwl-gold)', icon: FiAward },
  cultural: { color: 'var(--nwl-wattle)', icon: FiFeather },
  espiritu: { color: 'var(--nwl-navy)', icon: FiHeart, dark: true },
};

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
              const a = ACCENT[c.key];
              const Icon = a.icon;
              const requirement =
                c.key === 'academica' && minimo ? c.requirement.replace('8.5', String(minimo)) : c.requirement;
              return (
                <li key={c.key} className="group">
                  <article
                    className={`relative h-full flex flex-col rounded-2xl border p-6 md:p-7 transition-transform duration-300 group-hover:-translate-y-1 ${
                      a.dark ? 'bg-navy text-paper border-navy shadow-navy-lg' : 'bg-white border-n-200 shadow-navy-sm group-hover:shadow-navy-lg'
                    }`}
                  >
                    <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px] rounded-t-2xl" style={{ background: a.dark ? 'var(--nwl-gold)' : a.color }} />

                    <div className="flex items-center justify-between">
                      <span
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full"
                        style={{ background: a.dark ? 'rgba(244,238,226,0.08)' : `color-mix(in srgb, ${a.color} 16%, white)`, color: a.dark ? 'var(--nwl-gold)' : a.color }}
                      >
                        <Icon size={20} />
                      </span>
                      <span className={`font-mono text-[10px] uppercase tracking-[0.2em] ${a.dark ? 'text-paper/55' : 'text-n-500'}`}>{c.forWhom}</span>
                    </div>

                    <h3 className="font-display font-bold text-2xl mt-5 leading-tight">{c.name}</h3>
                    <p className={`mt-1 italic ${a.dark ? 'text-gold' : 'text-gold-600'}`}>{c.tagline}</p>
                    <p className={`mt-4 leading-relaxed ${a.dark ? 'text-paper/85' : 'text-n-700'}`}>{requirement}</p>

                    <div className={`mt-5 pt-5 border-t ${a.dark ? 'border-paper/15' : 'border-n-200'}`}>
                      <div className={`font-mono text-[10px] uppercase tracking-[0.2em] ${a.dark ? 'text-paper/55' : 'text-n-500'}`}>{copy.categories.needsLabel}</div>
                      <ul className="mt-2 space-y-1.5 text-sm">
                        {c.needs.map((n) => (
                          <li key={n} className="flex gap-2">
                            <span aria-hidden="true" className="mt-[7px] h-1.5 w-1.5 rounded-full shrink-0" style={{ background: a.dark ? 'var(--nwl-gold)' : a.color }} />
                            <span className={a.dark ? 'text-paper/85' : 'text-n-700'}>{n}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      type="button"
                      data-cta={`becas_cat_${c.key}`}
                      onClick={() => {
                        prefill({ categoria: c.key });
                        track('becas_category_select', { category: c.key, source: 'card' });
                        scrollTo('solicitud');
                      }}
                      className={`mt-auto pt-6 inline-flex items-center gap-2 font-semibold transition-colors ${a.dark ? 'text-gold hover:text-gold-400' : 'text-navy hover:text-gold-600'}`}
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
