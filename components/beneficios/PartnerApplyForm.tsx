'use client';

import { useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiFileText } from 'react-icons/fi';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useGHLFormTracking } from '@/lib/hooks/useGHLFormTracking';
import { injectUTMsIntoURL } from '@/lib/utm';

/**
 * "Become an NWL partner" section. The right column hosts the GHL lead form.
 *
 * The form stays a styled placeholder until a real GHL form ID is set in the
 * i18n `beneficios.applyFormId`. The moment that value is non-empty the iframe
 * is built imperatively (same pattern as components/FinalCTA.tsx) — no other
 * code change needed to go live.
 */
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
      iframe.src = `https://api.nwl.com.mx/widget/form/${id}`;
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

      const cleanupUTMs = injectUTMsIntoURL();

      const script = document.createElement('script');
      script.src = 'https://api.nwl.com.mx/js/form_embed.js';
      script.async = true;
      document.body.appendChild(script);

      return () => {
        cleanupUTMs?.();
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
      className="section-padding bg-gradient-to-br from-wine to-wine/90 text-white relative overflow-hidden animate-section"
    >
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-eucalyptus rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-mustard rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-center max-w-6xl mx-auto">
          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-5 leading-tight">
              {t.beneficios.applyTitle}{' '}
              <span className="text-mustard">{t.beneficios.applyTitleAccent}</span>
            </h2>
            <p className="text-white/85 text-lg leading-relaxed mb-8">
              {t.beneficios.applySubtitle}
            </p>
            <ul className="space-y-4">
              {t.beneficios.applyBenefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-mustard text-charcoal flex items-center justify-center mt-0.5">
                    <FiCheck size={14} strokeWidth={3} />
                  </span>
                  <span className="text-white/90">{benefit}</span>
                </li>
              ))}
            </ul>
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
              <div className="rounded-xl shadow-2xl overflow-hidden bg-white">
                {/* GHL iframe injected imperatively */}
                <div ref={formContainerRef} />
              </div>
            ) : (
              <div className="rounded-xl border-2 border-dashed border-white/40 bg-white/5 backdrop-blur-sm min-h-[380px] flex flex-col items-center justify-center text-center px-8 py-16">
                {/* Hidden ref so the iframe can mount here the moment a form ID exists */}
                <div ref={formContainerRef} className="hidden" />
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-5">
                  <FiFileText size={28} className="text-mustard" />
                </div>
                <p className="font-display text-2xl font-bold mb-2">
                  {t.beneficios.applyFormPlaceholder}
                </p>
                <p className="text-white/70 max-w-sm">
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
