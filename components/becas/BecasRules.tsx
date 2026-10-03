'use client';

import { useBecas } from './BecasProvider';
import SectionHeading from './SectionHeading';

const NIVEL_LABEL: Record<string, { es: string; en: string }> = {
  Maternal: { es: 'Maternal', en: 'Maternal' },
  Kinder: { es: 'Kinder', en: 'Kinder' },
  Primaria: { es: 'Primaria', en: 'Primary' },
  Secundaria: { es: 'Secundaria', en: 'Secondary' },
  Prepa: { es: 'Preparatoria', en: 'Senior School' },
};

export default function BecasRules() {
  const { copy, catalog, locale } = useBecas();
  const r = copy.rules;
  const actual = catalog?.ciclos.find((c) => c.tipo === 'actual')?.key;

  const rows =
    catalog?.campuses.map((c) => {
      const grados = actual ? c.ciclos[actual]?.grados ?? [] : Object.values(c.ciclos)[0]?.grados ?? [];
      const niveles = Array.from(new Set(grados.map((g) => g.nivel)));
      return { slug: c.slug, label: c.label, niveles };
    }) ?? [];

  return (
    <section id="condiciones" className="section-padding bg-paper animate-section">
      <div className="container-custom grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5">
          <SectionHeading eyebrow={r.eyebrow} title={r.title} accent={r.titleAccent} intro={r.intro} />

          {rows.length > 0 && (
            <div className="mt-8 overflow-hidden rounded-2xl border border-n-200 bg-white shadow-navy-sm">
              <table className="w-full text-sm">
                <thead className="bg-navy text-paper">
                  <tr>
                    <th scope="col" className="text-left font-mono text-[10px] uppercase tracking-[0.18em] px-4 py-3">
                      {r.campus}
                    </th>
                    <th scope="col" className="text-left font-mono text-[10px] uppercase tracking-[0.18em] px-4 py-3">
                      {r.levels}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, i) => (
                    <tr key={row.slug} className={i % 2 ? 'bg-n-50' : 'bg-white'}>
                      <th scope="row" className="text-left font-semibold text-navy px-4 py-3">
                        {row.label}
                      </th>
                      <td className="px-4 py-3 text-n-700">
                        {row.niveles.length
                          ? `${NIVEL_LABEL[row.niveles[0]]?.[locale] ?? row.niveles[0]} – ${NIVEL_LABEL[row.niveles[row.niveles.length - 1]]?.[locale] ?? row.niveles[row.niveles.length - 1]}`
                          : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <ol className="lg:col-span-7 space-y-3">
          {r.items.map((item, i) => (
            <li key={item} className="flex gap-4 rounded-2xl bg-white border border-n-200 px-5 py-4">
              <span className="font-mono text-xs text-gold-600 mt-1 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
              <span className="text-navy leading-relaxed">{item}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
