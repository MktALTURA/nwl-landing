'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FiArrowDown, FiArrowLeft, FiArrowUp, FiPlus, FiTrash2 } from 'react-icons/fi';
import { COLOR, SELECTABLE_COLOR_KEYS } from '@/lib/beneficios/colors';
import type { BenefitCategory } from '@/lib/beneficios/types';

/**
 * Categories are edited as one list and saved together — that matches how they
 * live in Redis and makes ordering (which drives the filter chips) obvious.
 *
 * The color is a swatch picker, never free text: only the keys in COLOR have
 * real Tailwind classes behind them, and the swatch shows the actual rendered
 * color rather than the token name.
 */
export default function CategoriasPage() {
  const [cats, setCats] = useState<BenefitCategory[] | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/beneficios/categories')
      .then((r) => (r.ok ? r.json() : []))
      .then(setCats)
      .catch(() => setCats([]));
  }, []);

  const update = (i: number, patch: Partial<BenefitCategory>) =>
    setCats((prev) => prev!.map((c, k) => (k === i ? { ...c, ...patch } : c)));

  const move = (i: number, dir: -1 | 1) => {
    const t = i + dir;
    if (!cats || t < 0 || t >= cats.length) return;
    const next = [...cats];
    [next[i], next[t]] = [next[t], next[i]];
    setCats(next);
  };

  const save = async () => {
    setSaving(true);
    setError('');
    setSaved(false);
    const res = await fetch('/api/beneficios/categories', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ categories: cats }),
    });
    if (res.ok) {
      setSaved(true);
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? 'No se pudo guardar');
    }
    setSaving(false);
  };

  const inputClass =
    'w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-wine/50 focus:border-wine text-sm';

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Link
        href="/admin/beneficios"
        className="inline-flex items-center gap-1.5 text-sm text-charcoal/60 hover:text-charcoal mb-6"
      >
        <FiArrowLeft size={15} /> Volver
      </Link>
      <h1 className="font-display text-3xl font-bold text-charcoal">Categorías</h1>
      <p className="text-charcoal/60 text-sm mt-1 mb-8">
        El orden aquí es el orden de los filtros en la página. No puedes borrar una categoría que
        algún aliado esté usando.
      </p>

      {cats === null ? (
        <div className="h-64 bg-gray-200 rounded-xl animate-pulse" />
      ) : (
        <>
          <div className="space-y-3">
            {cats.map((c, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-xl p-4 grid md:grid-cols-[auto_1fr_1fr_170px_auto] gap-3 items-end"
              >
                <div className="flex gap-1 pb-1">
                  <button
                    onClick={() => move(i, -1)}
                    disabled={i === 0}
                    aria-label="Subir"
                    className="p-1.5 rounded-lg text-charcoal/50 hover:bg-gray-100 disabled:opacity-25"
                  >
                    <FiArrowUp size={14} />
                  </button>
                  <button
                    onClick={() => move(i, 1)}
                    disabled={i === cats.length - 1}
                    aria-label="Bajar"
                    className="p-1.5 rounded-lg text-charcoal/50 hover:bg-gray-100 disabled:opacity-25"
                  >
                    <FiArrowDown size={14} />
                  </button>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wide text-charcoal/40 mb-1">
                    Nombre (español)
                  </label>
                  <input
                    value={c.label.es}
                    onChange={(e) => update(i, { label: { ...c.label, es: e.target.value } })}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wide text-charcoal/40 mb-1">
                    Nombre (inglés, opcional)
                  </label>
                  <input
                    value={c.label.en ?? ''}
                    onChange={(e) => update(i, { label: { ...c.label, en: e.target.value } })}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wide text-charcoal/40 mb-1">
                    Color
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {SELECTABLE_COLOR_KEYS.map((key) => (
                      <button
                        key={key}
                        type="button"
                        title={COLOR[key].label}
                        aria-label={COLOR[key].label}
                        onClick={() => update(i, { color: key })}
                        style={{ backgroundColor: COLOR[key].hex }}
                        className={`w-6 h-6 rounded-full transition-transform ${
                          c.color === key
                            ? 'ring-2 ring-offset-2 ring-charcoal scale-110'
                            : 'hover:scale-110'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setCats(cats.filter((_, k) => k !== i))}
                  aria-label={`Borrar ${c.label.es}`}
                  className="p-2 rounded-lg text-red-500 hover:bg-red-50 mb-0.5"
                >
                  <FiTrash2 size={15} />
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={() =>
              setCats([
                ...cats,
                { key: `categoria-${Date.now().toString(36)}`, label: { es: '', en: '' }, color: 'mustard' },
              ])
            }
            className="mt-4 inline-flex items-center gap-1.5 text-sm text-wine hover:text-wine/80"
          >
            <FiPlus size={15} /> Agregar categoría
          </button>

          {error && <p className="mt-4 text-red-600 text-sm bg-red-50 px-4 py-2 rounded-lg">{error}</p>}
          {saved && (
            <p className="mt-4 text-green-700 text-sm bg-green-50 px-4 py-2 rounded-lg">
              Guardado. Ya se ve en la página.
            </p>
          )}

          <button
            onClick={save}
            disabled={saving}
            className="mt-6 px-6 py-3 bg-wine text-white rounded-xl font-medium hover:bg-wine/90 disabled:opacity-50 transition-colors"
          >
            {saving ? 'Guardando…' : 'Guardar categorías'}
          </button>
        </>
      )}
    </div>
  );
}
