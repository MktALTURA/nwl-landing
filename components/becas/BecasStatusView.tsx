'use client';

import { useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { FiCheck, FiClock, FiDownload } from 'react-icons/fi';
import Footer from '@/components/Footer';
import Stat from '@/components/ui/Stat';
import Tag from '@/components/ui/Tag';
import type { BecasStatusResponse } from '@/lib/becas/contract';
import { BECAS_COPY, categoryName } from '@/lib/becas/copy';
import { formatCiclo, formatDateTime, formatDayKey } from '@/lib/becas/format';
import { campusPhones } from '@/lib/campus-data';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { sendGA4Event } from '@/lib/analytics';
import { BECAS_WHATSAPP } from './BecasFinalCTA';

/* Campus WhatsApp numbers exist in campus-data under slightly different keys. */
const WA_BY_CAMPUS: Record<string, string> = {
  juriquilla: campusPhones.juriquilla.whatsapp,
  milenio: campusPhones.milenio.whatsapp,
  corregidora: campusPhones.corregidora.whatsapp,
  'san-miguel': campusPhones.sanmiguel.whatsapp,
};

const TONE: Record<BecasStatusResponse['status'], string> = {
  en_revision: 'gold',
  lista_espera: 'wattle',
  aprobada: 'eucalyptus',
  inscrita: 'eucalyptus',
  vencida: 'navy',
  no_aprobada: 'navy',
  cancelada: 'navy',
};

export default function BecasStatusView({ status, unavailable }: { status: BecasStatusResponse | null; unavailable: boolean }) {
  const { locale } = useLanguage();
  const copy = BECAS_COPY[locale];
  const s = copy.status;

  useEffect(() => {
    sendGA4Event('becas_status_view', { page_path: '/becas/solicitud', status: status?.status ?? (unavailable ? 'unavailable' : 'not_found') });
  }, [status?.status, unavailable]);

  const wa = status ? WA_BY_CAMPUS[status.campus.siteSlug] ?? BECAS_WHATSAPP : BECAS_WHATSAPP;

  return (
    <>
      <main className="min-h-screen bg-paper pb-24" data-clarity-mask="true">
        {/* Dark header band: the site nav is designed over a dark hero. */}
        <div className="nwl-bg-dawn-deep pt-32 pb-12 md:pt-36 md:pb-14">
          <div className="container-custom max-w-3xl">
            <span className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-gold">
              <span className="w-9 h-px bg-gold" />
              {s.eyebrow}
            </span>
            {status ? (
              <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h1 className="font-display font-bold text-4xl md:text-5xl text-paper leading-[1.05]">
                    {status.alumno.nombre} {status.alumno.inicial}
                  </h1>
                  <p className="mt-2 text-paper/70">
                    {categoryName(status.categoria, locale)} · {status.campus.label} · {status.grado.label} · {formatCiclo(status.ciclo)}
                  </p>
                </div>
                <div className="text-right">
                  <Tag tone={TONE[status.status]} solid>
                    {s.labels[status.status]}
                  </Tag>
                  <div className="mt-2 font-mono text-xs text-paper/60">
                    {s.folio} <span className="text-paper">{status.folio}</span>
                  </div>
                </div>
              </div>
            ) : (
              <h1 className="font-display font-bold text-4xl md:text-5xl text-paper mt-4">{s.title}</h1>
            )}
          </div>
        </div>

        <div className="container-custom max-w-3xl">
          {!status ? (
            <div className="mt-8 rounded-3xl bg-white border border-n-200 p-8 md:p-10 shadow-navy-sm">
              <h2 className="font-display font-bold text-3xl text-navy">{s.notFound.title}</h2>
              <p className="mt-3 text-n-600 leading-relaxed">{unavailable ? copy.apply.errors.upstream : s.notFound.body}</p>
              <a href={`https://wa.me/${BECAS_WHATSAPP}?text=${encodeURIComponent(copy.finalCta.whatsappText)}`} target="_blank" rel="noopener noreferrer" className="btn-primary mt-6 inline-flex items-center gap-2">
                <FaWhatsapp /> {s.notFound.cta}
              </a>
            </div>
          ) : (
            <>
              <div className="-mt-6 grid lg:grid-cols-12 gap-6 relative z-[1]">
                {/* timeline */}
                <ol className="lg:col-span-7 rounded-3xl bg-white border border-n-200 p-6 md:p-8 shadow-navy-sm space-y-0">
                  {status.timeline.map((t, i) => {
                    const last = i === status.timeline.length - 1;
                    return (
                      <li key={t.key} className="relative flex gap-4 pb-7 last:pb-0">
                        {!last && <span aria-hidden="true" className={`absolute left-[15px] top-8 bottom-0 w-px ${t.done ? 'bg-gold' : 'bg-n-200'}`} />}
                        <span
                          className={`relative z-[1] inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 ${
                            t.done ? 'bg-gold border-gold text-[#1C0F00]' : 'bg-white border-n-300 text-n-400'
                          }`}
                        >
                          {t.done ? <FiCheck size={14} /> : <FiClock size={14} />}
                        </span>
                        <div className="min-w-0">
                          <div className={`font-semibold ${t.done ? 'text-navy' : 'text-n-500'}`}>{t.label}</div>
                          <div className="font-mono text-[11px] text-n-500 mt-0.5">
                            {t.at ? formatDateTime(t.at, locale) : t.dueAt ? formatDateTime(t.dueAt, locale) : ''}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ol>

                {/* window / next step */}
                <div className="lg:col-span-5 space-y-4">
                  {status.ventana && (status.status === 'aprobada' || status.status === 'vencida') && (
                    <div className="rounded-3xl nwl-bg-dawn p-6 md:p-7 text-paper">
                      <Stat
                        tone="navy"
                        value={status.status === 'vencida' ? '0' : String(status.ventana.diasRestantes)}
                        unit={status.status === 'vencida' ? undefined : null}
                        label={`${s.daysLeft(status.ventana.diasRestantes).replace(/^\d+\s*/, '')} ${s.deadline}`}
                      />
                      <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-paper/60">{formatDayKey(status.ventana.venceDia, locale)}</div>
                      {status.ventana.extendida && (
                        <div className="mt-2">
                          <Tag tone="gold" solid>
                            {s.extended}
                          </Tag>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="rounded-3xl bg-white border border-n-200 p-6 md:p-7 shadow-navy-sm">
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold-600">{s.nextStep}</div>
                    <p className="mt-2 text-navy leading-relaxed">{status.siguientePaso}</p>
                    <div className="mt-5 flex flex-col gap-2">
                      {status.carta && (
                        <a href={status.carta.url} data-cta="becas_status_carta" className="btn-primary inline-flex items-center justify-center gap-2 text-sm" target="_blank" rel="noopener noreferrer">
                          <FiDownload /> {s.carta}
                        </a>
                      )}
                      <a
                        href={`https://wa.me/${wa}?text=${encodeURIComponent(s.whatsappText(status.folio))}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cta="becas_status_whatsapp"
                        className="btn-secondary inline-flex items-center justify-center gap-2 text-sm"
                      >
                        <FaWhatsapp className="text-[#25D366]" /> {s.whatsapp}
                        {status.asesor && <span className="text-n-500">· {status.asesor.nombre}</span>}
                      </a>
                    </div>
                  </div>

                  <div className="rounded-3xl bg-white border border-n-200 p-6 md:p-7 shadow-navy-sm">
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold-600">
                      {s.conditions} · {status.beca.pct}%
                    </div>
                    <ul className="mt-2 space-y-1.5 text-sm text-n-700">
                      {status.beca.condiciones.map((c) => (
                        <li key={c} className="flex gap-2">
                          <span aria-hidden="true" className="mt-[7px] h-1 w-1 rounded-full bg-gold shrink-0" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
