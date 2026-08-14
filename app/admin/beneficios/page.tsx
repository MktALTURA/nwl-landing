'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiArrowDown, FiArrowUp, FiEdit2, FiExternalLink, FiPlus, FiTrash2 } from 'react-icons/fi';
import { getColor } from '@/lib/beneficios/colors';
import type { BenefitCategory, BenefitPartner } from '@/lib/beneficios/types';

export default function AdminBeneficiosPage() {
  const router = useRouter();
  const [partners, setPartners] = useState<BenefitPartner[]>([]);
  const [categories, setCategories] = useState<BenefitCategory[]>([]);
  const [source, setSource] = useState<'redis' | 'fallback'>('redis');
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState('');
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    try {
      const res = await fetch('/api/beneficios/partners');
      if (!res.ok) throw new Error();
      const data = await res.json();
      setPartners(data.partners);
      setCategories(data.categories);
      setSource(data.source);
    } catch {
      setError('No se pudo cargar el catálogo.');
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  /** Move a card up or down and persist the whole order. */
  const move = async (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= partners.length) return;

    const next = [...partners];
    [next[index], next[target]] = [next[target], next[index]];
    setPartners(next); // optimistic — the list is short and the write is fast
    setError('');

    const res = await fetch('/api/beneficios/partners/order', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids: next.map((p) => p.id) }),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? 'No se pudo guardar el orden.');
      load();
    }
  };

  const remove = async (p: BenefitPartner) => {
    if (!confirm(`¿Borrar "${p.name}"? Desaparecerá de la página de beneficios.`)) return;
    setBusy(p.id);
    const res = await fetch(`/api/beneficios/partners/${p.id}`, { method: 'DELETE' });
    if (!res.ok) setError('No se pudo borrar.');
    setBusy('');
    load();
  };

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <header className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-charcoal">Beneficios y Convenios</h1>
          <p className="text-charcoal/60 text-sm mt-1">
            Lo que edites aquí se publica en la página al instante.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="/beneficios"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-gray-300 text-charcoal/70 hover:bg-gray-50 text-sm transition-colors"
          >
            Ver página <FiExternalLink size={14} />
          </a>
          <button
            onClick={() => router.push('/admin/beneficios/categorias')}
            className="px-4 py-2.5 rounded-xl border border-gray-300 text-charcoal/70 hover:bg-gray-50 text-sm transition-colors"
          >
            Categorías
          </button>
          <button
            onClick={() => router.push('/admin/beneficios/nuevo')}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-wine text-white rounded-xl font-medium hover:bg-wine/90 text-sm transition-colors"
          >
            <FiPlus size={16} /> Nuevo aliado
          </button>
          <button onClick={logout} className="px-3 py-2.5 text-charcoal/50 hover:text-charcoal text-sm">
            Salir
          </button>
        </div>
      </header>

      {source === 'fallback' && (
        <div className="mb-6 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800">
          El catálogo todavía no se ha cargado en la base de datos: la página está mostrando la
          versión del código. Pídele a JP que ejecute la carga inicial.
        </div>
      )}

      {error && <p className="mb-4 text-red-600 text-sm bg-red-50 px-4 py-2 rounded-lg">{error}</p>}

      {loading ? (
        <div className="space-y-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-16 bg-gray-200 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : partners.length === 0 ? (
        <p className="text-charcoal/60">Todavía no hay aliados. Crea el primero.</p>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-charcoal/50 text-xs uppercase tracking-wide">
              <tr>
                <th className="text-left font-medium px-4 py-3 w-20">Orden</th>
                <th className="text-left font-medium px-4 py-3">Aliado</th>
                <th className="text-left font-medium px-4 py-3">Categoría</th>
                <th className="text-left font-medium px-4 py-3">Descuento</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {partners.map((p, i) => {
                const cat = categories.find((c) => c.key === p.categoryKey);
                return (
                  <tr key={p.id} className="hover:bg-gray-50/60">
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <button
                          onClick={() => move(i, -1)}
                          disabled={i === 0}
                          aria-label="Subir"
                          className="p-1.5 rounded-lg text-charcoal/50 hover:bg-gray-200 disabled:opacity-25"
                        >
                          <FiArrowUp size={14} />
                        </button>
                        <button
                          onClick={() => move(i, 1)}
                          disabled={i === partners.length - 1}
                          aria-label="Bajar"
                          className="p-1.5 rounded-lg text-charcoal/50 hover:bg-gray-200 disabled:opacity-25"
                        >
                          <FiArrowDown size={14} />
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {p.logo ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={p.logo} alt="" className="h-8 w-14 object-contain" />
                        ) : (
                          <div className="h-8 w-14 rounded bg-gray-100" />
                        )}
                        <span className="font-medium text-charcoal">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1.5 text-charcoal/70">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: getColor(cat?.color ?? '').hex }}
                        />
                        {cat?.label.es ?? p.categoryKey}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-charcoal/70">{p.discount?.es}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => router.push(`/admin/beneficios/${p.id}/editar`)}
                          aria-label={`Editar ${p.name}`}
                          className="p-2 rounded-lg text-charcoal/50 hover:bg-gray-200"
                        >
                          <FiEdit2 size={15} />
                        </button>
                        <button
                          onClick={() => remove(p)}
                          disabled={busy === p.id}
                          aria-label={`Borrar ${p.name}`}
                          className="p-2 rounded-lg text-red-500 hover:bg-red-50 disabled:opacity-40"
                        >
                          <FiTrash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
