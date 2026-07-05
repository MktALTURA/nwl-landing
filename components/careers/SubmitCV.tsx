'use client';

import { useCallback, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle } from 'react-icons/fi';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useGHLFormTracking } from '@/lib/hooks/useGHLFormTracking';
import { buildGHLFormSrc } from '@/lib/utm';
import SouthernCross from '@/components/ui/SouthernCross';

/**
 * Careers closing section: general CV submission. Hosts the careers
 * application GHL form inline (same tracked-iframe pattern as
 * components/beneficios/PartnerApplyForm.tsx).
 */
export default function SubmitCV() {
  const { locale, t } = useLanguage();
  const formContainerRef = useRef<HTMLDivElement>(null);
  const formId = t.careers.applicationFormId;

  const buildIframe = useCallback(
    (id: string, formName: string, formTitle: string) => {
      const container = formContainerRef.current;
      if (!container) return;

      container.innerHTML = '';

      const iframe = document.createElement('iframe');
      // Tracking params go on the iframe src directly: cross-origin iframes
      // don't inherit the parent URL, so this is how GHL sees attribution.
      iframe.src = buildGHLFormSrc(`https://api.nwl.com.mx/widget/form/${id}`);
      iframe.style.cssText = 'width:100%;height:1000px;border:none;';
      iframe.id = `inline-${id}`;
      iframe.setAttribute('data-layout', "{'id':'INLINE'}");
      iframe.setAttribute('data-trigger-type', 'alwaysShow');
      iframe.setAttribute('data-trigger-value', '');
      iframe.setAttribute('data-activation-type', 'alwaysActivated');
      iframe.setAttribute('data-activation-value', '');
      iframe.setAttribute('data-deactivation-type', 'neverDeactivate');
      iframe.setAttribute('data-deactivation-value', '');
      iframe.setAttribute('data-form-name', formName);
      iframe.setAttribute('data-height', '1000');
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

  useEffect(() => {
    if (!formId) return;
    const cleanup = buildIframe(formId, t.careers.applicationFormName, t.careers.applicationFormTitle);
    return cleanup;
  }, [locale, formId, t.careers.applicationFormName, t.careers.applicationFormTitle, buildIframe]);

  useGHLFormTracking(formContainerRef, 'careers_cv_form');

  return (
    <section id="cv" className="section-padding nwl-bg-dawn text-paper relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(203,134,6,0.14),transparent_50%)] pointer-events-none" />

      {/* Southern Cross motif */}
      <div className="absolute top-10 right-[6%] z-[1] pointer-events-none hidden md:block">
        <SouthernCross height={110} color="var(--nwl-gold)" opacity={0.3} />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start max-w-6xl mx-auto">
          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <span className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-gold mb-6">
              <span className="w-9 h-px bg-gold" />
              NWL Australian School
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-5 leading-tight">
              {t.careers.cvTitle}{' '}
              <span className="italic text-gold">{t.careers.cvTitleAccent}</span>
            </h2>
            <p className="text-paper/80 text-lg leading-relaxed mb-6">{t.careers.cvSubtitle}</p>
            <div className="flex items-start gap-3">
              <FiCheckCircle size={20} className="text-gold flex-shrink-0 mt-0.5" />
              <p className="text-paper/60 text-sm leading-relaxed">{t.careers.cvNote}</p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="rounded-2xl shadow-navy-xl overflow-hidden bg-white">
              <div ref={formContainerRef} className="min-h-[300px]" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
