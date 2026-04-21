'use client';

import { useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiFileText } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useGHLFormTracking } from '@/lib/hooks/useGHLFormTracking';
import { injectUTMsIntoURL } from '@/lib/utm';

export default function FinalCTA() {
  const { locale, t } = useLanguage();
  const formContainerRef = useRef<HTMLDivElement>(null);

  // Imperatively manage iframe + GHL script so React never reconciles DOM
  // that the GHL embed library may have mutated.
  const buildIframe = useCallback((formId: string, formName: string, formTitle: string) => {
    const container = formContainerRef.current;
    if (!container) return;

    // Wipe whatever the GHL script may have injected previously
    container.innerHTML = '';

    const iframe = document.createElement('iframe');
    iframe.src = `https://api.leadconnectorhq.com/widget/form/${formId}`;
    iframe.style.cssText = 'width:100%;height:1400px;border:none;';
    iframe.id = `inline-${formId}`;
    iframe.setAttribute('data-layout', "{'id':'INLINE'}");
    iframe.setAttribute('data-trigger-type', 'alwaysShow');
    iframe.setAttribute('data-trigger-value', '');
    iframe.setAttribute('data-activation-type', 'alwaysActivated');
    iframe.setAttribute('data-activation-value', '');
    iframe.setAttribute('data-deactivation-type', 'neverDeactivate');
    iframe.setAttribute('data-deactivation-value', '');
    iframe.setAttribute('data-form-name', formName);
    iframe.setAttribute('data-height', '1400');
    iframe.setAttribute('data-layout-iframe-id', `inline-${formId}`);
    iframe.setAttribute('data-form-id', formId);
    iframe.title = formTitle;

    container.appendChild(iframe);

    // Inject stored UTMs into URL so form_embed.js reads them as hidden fields
    const cleanupUTMs = injectUTMsIntoURL();

    // Load GHL embed script
    const script = document.createElement('script');
    script.src = 'https://link.msgsndr.com/js/form_embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      cleanupUTMs?.();
      try { script.parentNode?.removeChild(script); } catch { /* noop */ }
      container.innerHTML = '';
    };
  }, []);

  // Re-build iframe whenever locale changes
  useEffect(() => {
    const cleanup = buildIframe(t.finalCta.formId, t.finalCta.formName, t.finalCta.formTitle);
    return cleanup;
  }, [locale, t.finalCta.formId, t.finalCta.formName, t.finalCta.formTitle, buildIframe]);

  // Track GHL form submissions via postMessage + height-change fallback (no URL changes)
  useGHLFormTracking(formContainerRef, 'home_form');

  // Scroll the form into view (works with GSAP ScrollSmoother)
  const scrollToForm = () => {
    const container = formContainerRef.current;
    if (!container) return;
    container.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const cards = [
    {
      icon: <FiCalendar size={28} />,
      title: t.finalCta.campusVisitTitle,
      desc: t.finalCta.campusVisitDesc,
      label: 'schedule_visit',
    },
    {
      icon: <FiFileText size={28} />,
      title: t.finalCta.requestInfoTitle,
      desc: t.finalCta.requestInfoDesc,
      label: 'request_info',
    },
    {
      icon: <FaWhatsapp size={28} />,
      title: t.finalCta.whatsappTitle,
      desc: t.finalCta.whatsappDesc,
      label: 'whatsapp_chat',
      href: 'https://wa.me/5214421227791',
    },
  ];

  return (
    <section id="admissions" className="section-padding bg-gradient-to-br from-wine to-wine/90 text-white relative overflow-hidden animate-section">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-mustard rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-eucalyptus rounded-full blur-3xl" />
      </div>

      {/* Kangaroo Watermark */}
      <div className="absolute right-[-5%] bottom-[-10%] w-[50vh] h-[50vh] opacity-[0.06] pointer-events-none">
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
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">
            {t.finalCta.title} <span className="text-mustard">{t.finalCta.titleAccent}</span>
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            {t.finalCta.subtitle}
          </p>
        </motion.div>

        {/* Two-column: Form + Info */}
        <div className="grid lg:grid-cols-5 gap-10 items-start max-w-6xl mx-auto">

          {/* Form — takes 3 of 5 columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-3 rounded-lg shadow-2xl overflow-hidden"
          >
            {/* Ref container — iframe is injected imperatively so GHL script
                mutations never conflict with React's virtual DOM. */}
            <div ref={formContainerRef} />
          </motion.div>

          {/* Right column — 3 CTA cards, all link to the form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            {cards.map((card) =>
              card.href ? (
                <a
                  key={card.label}
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cta={card.label}
                  className="w-full text-left bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-colors duration-300 group block"
                >
                  <div className="text-mustard group-hover:text-green-400 transition-colors mb-3">
                    {card.icon}
                  </div>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-green-400 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed">
                    {card.desc}
                  </p>
                </a>
              ) : (
                <button
                  key={card.label}
                  onClick={scrollToForm}
                  data-cta={card.label}
                  className="w-full text-left bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-colors duration-300 group"
                >
                  <div className="text-mustard mb-3">
                    {card.icon}
                  </div>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-mustard transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed">
                    {card.desc}
                  </p>
                </button>
              )
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
