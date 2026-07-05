'use client';

import { useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FiEye, FiBookOpen, FiUsers, FiTarget, FiFileText } from 'react-icons/fi';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useGHLFormTracking } from '@/lib/hooks/useGHLFormTracking';
import { buildGHLFormSrc } from '@/lib/utm';
import SouthernCross from '@/components/ui/SouthernCross';

/**
 * "Become an NWL partner" section. The right column hosts the GHL lead form.
 *
 * The form stays a styled placeholder until a real GHL form ID is set in the
 * i18n `beneficios.applyFormId`. The moment that value is non-empty the iframe
 * is built imperatively (same pattern as components/FinalCTA.tsx) — no other
 * code change needed to go live.
 */
const BENEFIT_ICONS = [FiEye, FiBookOpen, FiUsers, FiTarget];

export default function PartnerApplyForm() {
  const { locale, t } = useLanguage();
  const formContainerRef = useRef<HTMLDivElement>(null);
  const formId = t.beneficios.applyFormId;

  const buildIframe = useCallback(
    (id: string, formName: string, formTitle: string) => {
      const container = formContainerRef.current;
      if (!container) return;

      container.innerHTML = '';

      const iframe = document.createElement('iframe');
      // Append tracking params directly to the iframe src — cross-origin
      // iframes don't inherit the parent URL, so this is how GHL sees them.
      iframe.src = buildGHLFormSrc(`https://api.nwl.com.mx/widget/form/${id}`);
      iframe.style.cssText = 'width:100%;height:1344px;border:none;';
      iframe.id = `inline-${id}`;
      iframe.setAttribute('data-layout', "{'id':'INLINE'}");
      iframe.setAttribute('data-trigger-type', 'alwaysShow');
      iframe.setAttribute('data-trigger-value', '');
      iframe.setAttribute('data-activation-type', 'alwaysActivated');
      iframe.setAttribute('data-activation-value', '');
      iframe.setAttribute('data-deactivation-type', 'neverDeactivate');
      iframe.setAttribute('data-deactivation-value', '');
      iframe.setAttribute('data-form-name', formName);
      iframe.setAttribute('data-height', '1344');
      iframe.setAttribute('data-layout-iframe-id', `inline-${id}`);
      iframe.setAttribute('data-form-id', id);
      iframe.title = formTitle;

      container.appendChild(iframe);

      const script = document.createElement('script');
      script.src = 'https://api.nwl.com.mx/js/form_embed.js';
      script.async = true;
      document.body.appendChild(script);

      return () => {
        try {
          script.parentNode?.removeChild(script);
        } catch {
          /* noop */
        }
        container.innerHTML = '';
      };
    },
    []
  );

  // Build the iframe only once a real form ID is configured.
  useEffect(() => {
    if (!formId) return;
    const cleanup = buildIframe(formId, t.beneficios.applyFormName, t.beneficios.applyFormTitle);
    return cleanup;
  }, [locale, formId, t.beneficios.applyFormName, t.beneficios.applyFormTitle, buildIframe]);

  useGHLFormTracking(formContainerRef, 'beneficios_partner_form');

  return (
    <section
      id="ser-aliado"
      className="section-padding nwl-bg-dawn text-paper relative overflow-hidden animate-section"
    >
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-eucalyptus rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold rounded-full blur-3xl" />
      </div>

      {/* Southern Cross motif */}
      <div className="absolute top-10 right-[6%] z-[1] pointer-events-none hidden md:block">
        <SouthernCross height={110} color="var(--nwl-gold)" opacity={0.3} />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-center max-w-6xl mx-auto">
          {/* Copy: the "Become a Partner" pitch */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <span className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-gold mb-6">
              <span className="w-9 h-px bg-gold" />
              NWL Australian School
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-5 leading-tight">
              {t.careers.partnerTitle}{' '}
              <span className="italic text-gold">{t.careers.partnerTitleAccent}</span>
            </h2>
            <p className="text-paper/80 text-lg leading-relaxed mb-4">
              {t.careers.partnerSubtitle}
            </p>
            <p className="text-paper/60 leading-relaxed mb-8">
              {t.careers.partnerDescription}
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {t.careers.partnerBenefits.map((benefit, index) => {
                const Icon = BENEFIT_ICONS[index];
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white/[0.06] backdrop-blur-sm rounded-xl p-4 border border-white/10"
                  >
                    <Icon size={22} className="text-gold mb-2" />
                    <h3 className="text-sm font-bold text-paper mb-1">{benefit.title}</h3>
                    <p className="text-xs text-paper/50 leading-relaxed">{benefit.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Form / placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            {formId ? (
              <div className="rounded-2xl shadow-navy-xl overflow-hidden bg-white">
                {/* GHL iframe injected imperatively */}
                <div ref={formContainerRef} />
              </div>
            ) : (
              <div className="rounded-3xl border border-white/10 bg-white/[0.06] backdrop-blur-sm min-h-[380px] flex flex-col items-center justify-center text-center px-8 py-16">
                {/* Hidden ref so the iframe can mount here the moment a form ID exists */}
                <div ref={formContainerRef} className="hidden" />
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-5">
                  <FiFileText size={28} className="text-gold" />
                </div>
                <p className="font-display text-2xl font-bold mb-2">
                  {t.beneficios.applyFormPlaceholder}
                </p>
                <p className="text-paper/70 max-w-sm">
                  {t.beneficios.applyFormPlaceholderNote}
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
