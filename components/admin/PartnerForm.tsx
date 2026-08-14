'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiAlertTriangle } from 'react-icons/fi';
import BilingualField from './BilingualField';
import ImageUploadField from './ImageUploadField';
import PartnerCardPreview from './PartnerCardPreview';
import { slugify } from '@/lib/validations/beneficios';
import type { BenefitCategory, BenefitPartner } from '@/lib/beneficios/types';

/**
 * Create/edit a partner benefit.
 *
 * Everything is in Spanish and every field carries a one-line instruction,
 * because the person using this is the one who negotiates the convenios, not
 * the one who maintains the site. The live card preview on the right is the
 * real safety net — it shows exactly what parents will see before saving.
 */
interface PartnerFormProps {
  categories: BenefitCategory[];
  initial?: BenefitPartner;
}

export default function PartnerForm({ categories, initial }: PartnerFormProps) {
  const router = useRouter();
  const isEditing = !!initial;

  const [form, setForm] = useState({
    name: initial?.name ?? '',
    slug: initial?.slug ?? '',
    categoryKey: initial?.categoryKey ?? categories[0]?.key ?? '',
    logo: initial?.logo ?? null,
    logoStyle: (initial?.logoStyle ?? 'wordmark') as 'wordmark' | 'badge',
    discountEs: initial?.discount?.es ?? '',
    discountEn: initial?.discount?.en ?? '',
    detailEs: initial?.detail?.es ?? '',
    detailEn: initial?.detail?.en ?? '',
    restrictionsEs: initial?.restrictions?.es ?? '',
    restrictionsEn: initial?.restrictions?.en ?? '',
    vigenciaEs: initial?.vigencia?.es ?? '',
    vigenciaEn: initial?.vigencia?.en ?? '',
    url: initial?.url ?? '',
    promoImages: initial?.promoImages ?? [],
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((p) => ({ ...p, [k]: v }));

  // The slug follows the name until someone edits it by hand.
  const effectiveSlug = form.slug || slugify(form.name);

  const category = categories.find((c) => c.key === form.categoryKey);

  /** Non-blocking things worth knowing before publishing. */
  const warnings = useMemo(() => {
    const w: string[] = [];
    if (!form.logo) w.push('No subiste logo — la tarjeta mostrará un recuadro con las iniciales.');
    if (!form.discountEn && form.discountEs)
      w.push('No llenaste el inglés — en la versión en inglés se mostrará el texto en español.');
    if (form.discountEs.length > 45)
      w.push('El descuento es largo; en celular puede ocupar tres líneas.');
    if (!form.detailEs) w.push('Sin detalle, la tarjeta se ve muy vacía.');
    if (form.promoImages.length > 2)
      w.push('Con más de 2 imágenes la tarjeta crece bastante.');
    return w;
  }, [form]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    const localized = (es: string, en: string) =>
      es || en ? { es, ...(en ? { en } : {}) } : undefined;

    const payload = {
      name: form.name.trim(),
      slug: effectiveSlug,
      categoryKey: form.categoryKey,
      logo: form.logo,
      logoStyle: form.logoStyle,
      discount: { es: form.discountEs.trim(), ...(form.discountEn ? { en: form.discountEn.trim() } : {}) },
      detail: localized(form.detailEs.trim(), form.detailEn.trim()),
      restrictions: localized(form.restrictionsEs.trim(), form.restrictionsEn.trim()),
      vigencia: localized(form.vigenciaEs.trim(), form.vigenciaEn.trim()),
      ...(form.url.trim() ? { url: form.url.trim() } : {}),
      promoImages: form.promoImages,
    };

    try {
      const res = await fetch(
        isEditing ? `/api/beneficios/partners/${initial.id}` : '/api/beneficios/partners',
        {
          method: isEditing ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );
      if (res.ok) {
        router.push('/admin/beneficios');
        router.refresh();
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? 'No se pudo guardar');
      }
    } catch {
      setError('Error de conexión. Intenta de nuevo.');
    }
    setSaving(false);
  };

  const inputClass =
    'w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-wine/50 focus:border-wine transition-colors';

  return (
    <div className="grid lg:grid-cols-[minmax(0,1fr)_360px] gap-8 items-start">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nombre */}
        <div>
          <label className="block text-sm font-medium text-charcoal/80">
            Nombre del aliado <span className="text-wine">*</span>
          </label>
          <p className="text-xs text-charcoal/50 mt-0.5 mb-2">
            Como aparece en la tarjeta. Ej: Carl&apos;s Jr., MVS Music Center.
          </p>
          <input
            type="text"
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
            maxLength={60}
            required
            className={inputClass}
          />
          <p className="text-[11px] text-charcoal/40 mt-1">
            Identificador: <code>{effectiveSlug || '—'}</code>
          </p>
        </div>

        {/* Categoría */}
        <div>
          <label className="block text-sm font-medium text-charcoal/80">
            Categoría <span className="text-wine">*</span>
          </label>
          <p className="text-xs text-charcoal/50 mt-0.5 mb-2">
            Define el color de la tarjeta y el filtro donde aparece.
          </p>
          <select
            value={form.categoryKey}
            onChange={(e) => set('categoryKey', e.target.value)}
            className={`${inputClass} bg-white`}
          >
            {categories.map((c) => (
              <option key={c.key} value={c.key}>
                {c.label.es}
              </option>
            ))}
          </select>
        </div>

        {/* Logo */}
        <ImageUploadField
          label="Logo"
          help="PNG, JPG o WebP. Idealmente con fondo blanco o transparente. Se comprime solo."
          kind="logo"
          nameHint={form.name}
          value={form.logo}
          onChange={(url) => set('logo', url)}
        />

        {/* Estilo del logo */}
        <div>
          <label className="block text-sm font-medium text-charcoal/80">Estilo del logo</label>
          <p className="text-xs text-charcoal/50 mt-0.5 mb-2">
            <strong>Normal</strong>: logos con fondo blanco o transparente.{' '}
            <strong>Placa</strong>: logos que traen su propio fondo de color (como Dorado) — se
            muestran como recuadro redondeado.
          </p>
          <div className="flex gap-3">
            {(['wordmark', 'badge'] as const).map((style) => (
              <button
                key={style}
                type="button"
                onClick={() => set('logoStyle', style)}
                className={`px-4 py-2 rounded-xl border-2 text-sm transition-colors ${
                  form.logoStyle === style
                    ? 'border-wine bg-wine/5 text-wine font-medium'
                    : 'border-gray-300 text-charcoal/60'
                }`}
              >
                {style === 'wordmark' ? 'Normal' : 'Placa'}
              </button>
            ))}
          </div>
        </div>

        <BilingualField
          label="Descuento principal"
          help="El texto grande dorado. Corto y directo. Ej: 50% de descuento en inscripción."
          required
          max={80}
          softMax={45}
          placeholder="50% de descuento en inscripción"
          valueEs={form.discountEs}
          valueEn={form.discountEn}
          onChangeEs={(v) => set('discountEs', v)}
          onChangeEn={(v) => set('discountEn', v)}
        />

        <BilingualField
          label="Detalle"
          help="Qué incluye, para quién y montos. Separa puntos con  ·  para que se lea fácil."
          multiline
          max={500}
          softMax={350}
          valueEs={form.detailEs}
          valueEn={form.detailEn}
          onChangeEs={(v) => set('detailEs', v)}
          onChangeEn={(v) => set('detailEn', v)}
        />

        <BilingualField
          label="Restricciones / letra chica"
          help="Sucursales, horarios, a quién aplica y qué hay que presentar. Se muestra en gris pequeño."
          multiline
          max={500}
          valueEs={form.restrictionsEs}
          valueEn={form.restrictionsEn}
          onChangeEs={(v) => set('restrictionsEs', v)}
          onChangeEn={(v) => set('restrictionsEn', v)}
        />

        <BilingualField
          label="Vigencia"
          help="Solo si el beneficio tiene fecha. Ej: 10% vigente desde el 15 de julio."
          max={60}
          valueEs={form.vigenciaEs}
          valueEn={form.vigenciaEn}
          onChangeEs={(v) => set('vigenciaEs', v)}
          onChangeEn={(v) => set('vigenciaEn', v)}
        />

        {/* Sitio web */}
        <div>
          <label className="block text-sm font-medium text-charcoal/80">Sitio web</label>
          <p className="text-xs text-charcoal/50 mt-0.5 mb-2">
            Aparece como &quot;Visitar aliado&quot;. Debe empezar con https://
          </p>
          <input
            type="url"
            value={form.url}
            onChange={(e) => set('url', e.target.value)}
            placeholder="https://ejemplo.com"
            className={inputClass}
          />
        </div>

        {/* Promociones */}
        <div>
          <label className="block text-sm font-medium text-charcoal/80">Promociones / flyers</label>
          <p className="text-xs text-charcoal/50 mt-0.5 mb-2">
            Las imágenes que manda el aliado. Se ven recortadas y se abren en grande al hacer clic.
            Con 1 o 2 se ve mejor (máximo 4).
          </p>
          <div className="space-y-3">
            {form.promoImages.map((src, i) => (
              <div key={src} className="flex items-center gap-3">
                <div className="h-16 w-28 rounded-lg ring-1 ring-gray-200 overflow-hidden bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="" className="w-full h-full object-cover object-top" />
                </div>
                <button
                  type="button"
                  onClick={() =>
                    set(
                      'promoImages',
                      form.promoImages.filter((_, k) => k !== i)
                    )
                  }
                  className="text-sm text-red-600 hover:text-red-700"
                >
                  Quitar
                </button>
              </div>
            ))}
            {form.promoImages.length < 4 && (
              <ImageUploadField
                label=""
                help=""
                kind="promo"
                nameHint={`${form.name}-promo`}
                value={null}
                onChange={(url) => url && set('promoImages', [...form.promoImages, url])}
              />
            )}
          </div>
        </div>

        {warnings.length > 0 && (
          <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3">
            <p className="flex items-center gap-2 text-sm font-medium text-amber-800 mb-1">
              <FiAlertTriangle size={15} /> Antes de guardar
            </p>
            <ul className="list-disc list-inside text-xs text-amber-800/90 space-y-0.5">
              {warnings.map((w) => (
                <li key={w}>{w}</li>
              ))}
            </ul>
            <p className="text-[11px] text-amber-700/70 mt-2">
              Son sugerencias — puedes guardar de todos modos.
            </p>
          </div>
        )}

        {error && <p className="text-red-600 text-sm bg-red-50 px-4 py-2 rounded-lg">{error}</p>}

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 bg-wine text-white rounded-xl font-medium hover:bg-wine/90 disabled:opacity-50 transition-colors"
          >
            {saving ? 'Guardando…' : isEditing ? 'Guardar cambios' : 'Publicar aliado'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin/beneficios')}
            className="px-6 py-3 rounded-xl border border-gray-300 text-charcoal/70 hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </form>

      {/* Live preview */}
      <div className="lg:sticky lg:top-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-charcoal/40 mb-3">
          Así se verá en la página
        </p>
        <div className="bg-paper p-4 rounded-2xl">
          <PartnerCardPreview
            name={form.name}
            category={category}
            logo={form.logo}
            logoStyle={form.logoStyle}
            discount={form.discountEs}
            detail={form.detailEs}
            restrictions={form.restrictionsEs}
            vigencia={form.vigenciaEs}
            url={form.url}
            promoImages={form.promoImages}
          />
        </div>
      </div>
    </div>
  );
}
