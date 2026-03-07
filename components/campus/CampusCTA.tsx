'use client';

import { useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaPhone } from 'react-icons/fa';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface CampusCTAProps {
  campusName?: string;
  whatsapp?: string;
  phone?: string;
  phoneLink?: string;
}

export default function CampusCTA({ campusName, whatsapp, phone, phoneLink }: CampusCTAProps) {
  const { locale, t } = useLanguage();
  const formContainerRef = useRef<HTMLDivElement>(null);

  // Imperatively manage iframe + GHL script (same pattern as FinalCTA)
  const buildIframe = useCallback((formId: string, formName: string, formTitle: string) => {
    const container = formContainerRef.current;
    if (!container) return;

    container.innerHTML = '';

    // GHL iframe embeds do not support URL parameter pre-fill on external sites.
    // The form_embed.js script reads params from window.location (parent page), not iframe src.
    const iframeSrc = `https://api.leadconnectorhq.com/widget/form/${formId}`;

    const iframe = document.createElement('iframe');
    iframe.src = iframeSrc;
    iframe.style.cssText = 'width:100%;height:1400px;border:none;';
    iframe.id = `campus-inline-${formId}`;
    iframe.setAttribute('data-layout', "{'id':'INLINE'}");
    iframe.setAttribute('data-trigger-type', 'alwaysShow');
    iframe.setAttribute('data-trigger-value', '');
    iframe.setAttribute('data-activation-type', 'alwaysActivated');
    iframe.setAttribute('data-activation-value', '');
    iframe.setAttribute('data-deactivation-type', 'neverDeactivate');
    iframe.setAttribute('data-deactivation-value', '');
    iframe.setAttribute('data-form-name', formName);
    iframe.setAttribute('data-height', '1400');
    iframe.setAttribute('data-layout-iframe-id', `campus-inline-${formId}`);
    iframe.setAttribute('data-form-id', formId);
    iframe.title = formTitle;

    container.appendChild(iframe);

    const script = document.createElement('script');
    script.src = 'https://link.msgsndr.com/js/form_embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      try { script.parentNode?.removeChild(script); } catch { /* noop */ }
      container.innerHTML = '';
    };
  }, []);

  useEffect(() => {
    const cleanup = buildIframe(t.finalCta.formId, t.finalCta.formName, t.finalCta.formTitle);
    return cleanup;
  }, [locale, t.finalCta.formId, t.finalCta.formName, t.finalCta.formTitle, buildIframe]);

  // Watch for GHL iframe resize after form submission: enforce min height + track conversion
  useEffect(() => {
    let submitted = false;
    const observer = new MutationObserver(() => {
      const container = formContainerRef.current;
      if (!container) return;
      const iframe = container.querySelector('iframe');
      if (!iframe) return;
      const h = parseInt(iframe.style.height, 10);
      if (h > 0 && h < 500) {
        iframe.style.height = '500px';
        // Fire virtual pageview once for Google Ads conversion tracking
        if (!submitted) {
          submitted = true;
          const original = window.location.pathname + window.location.search;
          window.history.pushState({}, '', '/form-submitted');
          console.log('[NWL] Form submission tracked — virtual pageview /form-submitted');
          // Restore the real URL after a short delay so analytics captures the hit
          setTimeout(() => window.history.replaceState({}, '', original), 2000);
        }
      }
    });

    const container = formContainerRef.current;
    if (container) {
      observer.observe(container, { subtree: true, attributes: true, attributeFilter: ['style'] });
    }
    return () => observer.disconnect();
  }, [locale]);

  return (
    <section id="campus-admissions" className="py-12 md:py-16 bg-gradient-to-br from-wine to-wine/90 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-mustard rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-eucalyptus rounded-full blur-3xl" />
      </div>

      {/* Kangaroo Watermark */}
      <div className="absolute right-[-5%] bottom-[-10%] w-[40vh] h-[40vh] opacity-[0.06] pointer-events-none">
        <img
          src="/images/brand/kangaroo-white-transparent.png"
          alt=""
          className="w-full h-full object-contain rotate-[15deg]"
        />
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">
            {t.campusDetail.ctaTitle}{' '}
            <span className="text-mustard">{campusName}?</span>
          </h2>
          <p className="text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
            {t.campusDetail.ctaSubtitle}
          </p>
        </motion.div>

        {/* Two-column: Form + WhatsApp */}
        <div className="grid lg:grid-cols-5 gap-10 items-start max-w-6xl mx-auto">
          {/* Form — takes 3 of 5 columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-3 rounded-lg shadow-2xl overflow-hidden"
          >
            <div ref={formContainerRef} />
          </motion.div>

          {/* Right column — WhatsApp card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            <a
              href={`https://wa.me/${whatsapp || '5214421227791'}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-left bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-colors duration-300 group block"
            >
              <div className="text-mustard group-hover:text-green-400 transition-colors mb-3">
                <FaWhatsapp size={28} />
              </div>
              <h3 className="font-bold text-lg mb-2 group-hover:text-green-400 transition-colors">
                {t.campusDetail.ctaWhatsapp}
              </h3>
              <p className="text-white/80 text-sm leading-relaxed">
                {t.campusDetail.ctaSubtitle}
              </p>
            </a>

            {/* Phone card */}
            {phone && (
              <a
                href={`tel:+52${phoneLink}`}
                className="w-full text-left bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-colors duration-300 group block"
              >
                <div className="text-mustard group-hover:text-white transition-colors mb-3">
                  <FaPhone size={24} />
                </div>
                <h3 className="font-bold text-lg mb-2 group-hover:text-white transition-colors">
                  {locale === 'es' ? 'Llámanos' : 'Call Us'}
                </h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  {phone}
                </p>
              </a>
            )}

            {/* Trust badges */}
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 space-y-4">
              <h3 className="font-bold text-lg text-mustard">
                {locale === 'es' ? '¿Por qué NWL?' : 'Why NWL?'}
              </h3>
              <ul className="space-y-3 text-white/80 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-mustard mt-0.5">✓</span>
                  {locale === 'es' ? '100% Programa Bilingüe' : '100% Bilingual Program'}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-mustard mt-0.5">✓</span>
                  {locale === 'es' ? 'Docentes Certificados' : 'Certified Teachers'}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-mustard mt-0.5">✓</span>
                  {locale === 'es' ? 'Instalaciones de Primer Nivel' : 'World-Class Facilities'}
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-mustard mt-0.5">✓</span>
                  {locale === 'es' ? '+16 Años de Experiencia' : '16+ Years of Experience'}
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
