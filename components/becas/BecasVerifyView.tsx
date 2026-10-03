'use client';

import { useEffect } from 'react';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';
import Footer from '@/components/Footer';
import Crest from '@/components/ui/Crest';
import Tag from '@/components/ui/Tag';
import type { BecasVerifyResponse } from '@/lib/becas/contract';
import { BECAS_COPY, categoryName } from '@/lib/becas/copy';
import { formatCiclo, formatDateTime, formatDayKey } from '@/lib/becas/format';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { sendGA4Event } from '@/lib/analytics';

export default function BecasVerifyView({ folio, result, unavailable }: { folio: string; result: BecasVerifyResponse | null; unavailable: boolean }) {
  const { locale } = useLanguage();
  const copy = BECAS_COPY[locale];
  const v = copy.verify;
  const valid = Boolean(result?.valid);

  useEffect(() => {
    sendGA4Event('becas_verify_view', { page_path: '/becas/verificar', result: result ? result.estado : unavailable ? 'unavailable' : 'invalid' });
  }, [result, unavailable]);

  return (
    <>
      <main className="min-h-screen bg-paper pb-24">
        <div className="nwl-bg-dawn-deep pt-32 pb-16 md:pt-36 md:pb-20">
          <div className="container-custom max-w-2xl">
            <span className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-gold">
              <span className="w-9 h-px bg-gold" />
              {v.eyebrow}
            </span>
            <h1 className="font-display font-bold text-4xl md:text-5xl text-paper mt-4">{v.title}</h1>
          </div>
        </div>
        <div className="container-custom max-w-2xl">
          <div className={`-mt-8 relative z-[1] rounded-3xl p-8 md:p-10 shadow-navy-lg ${valid ? 'bg-navy text-paper' : 'bg-white border border-n-200'}`}>
            <div className="flex items-start gap-5">
              {valid ? <Crest level="gold" size={72} showBanner={false} /> : <FiXCircle className="text-[#77011B] shrink-0" size={40} />}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  {valid && <FiCheckCircle className="text-gold" size={22} />}
                  <h2 className={`font-display font-bold text-2xl ${valid ? 'text-paper' : 'text-navy'}`}>{valid ? v.valid : v.invalid}</h2>
                  {result && (
                    <Tag tone={result.estado === 'vigente' || result.estado === 'confirmada' ? 'eucalyptus' : 'navy'} solid>
                      {v.estado[result.estado]}
                    </Tag>
                  )}
                </div>
                {!valid && <p className="mt-3 text-n-600 leading-relaxed">{unavailable ? copy.apply.errors.upstream : v.invalidBody}</p>}
                <dl className={`mt-6 grid grid-cols-2 gap-x-6 gap-y-3 text-sm ${valid ? 'text-paper/85' : 'text-n-700'}`}>
                  <Row k={v.fields.folio} v={folio} mono />
                  {result && (
                    <>
                      <Row k={v.fields.alumno} v={result.alumno} />
                      <Row k={v.fields.categoria} v={categoryName(result.categoria, locale)} />
                      <Row k={v.fields.campus} v={result.campus} />
                      <Row k={v.fields.ciclo} v={formatCiclo(result.ciclo)} />
                      <Row k={v.fields.beca} v={`${result.pct}%`} />
                      {result.venceDia && <Row k={v.fields.vence} v={formatDayKey(result.venceDia, locale)} />}
                      <Row k={v.fields.emitida} v={formatDateTime(result.emitidaAt, locale)} />
                    </>
                  )}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Row({ k, v, mono = false }: { k: string; v: string; mono?: boolean }) {
  return (
    <div>
      <dt className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-60">{k}</dt>
      <dd className={`mt-0.5 ${mono ? 'font-mono' : 'font-semibold'}`}>{v}</dd>
    </div>
  );
}
