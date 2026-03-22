'use client';

import { useEffect, useRef, useCallback } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useGHLFormTracking } from '@/lib/hooks/useGHLFormTracking';
import { injectUTMsIntoURL } from '@/lib/utm';
import type { InformacionPage } from '@/lib/informacion-data';
import { campuses } from '@/lib/campus-data';

interface InformacionCTAProps {
  page: InformacionPage;
}

export default function InformacionCTA({ page }: InformacionCTAProps) {
  const { locale, t } = useLanguage();
  const formContainerRef = useRef<HTMLDivElement>(null);

  const campus = page.targetCampus ? campuses[page.targetCampus] : null;
  const whatsappNumber = campus?.whatsapp ?? '5214424541010'; // Default admissions

  const buildIframe = useCallback((formId: string, formName: string, formTitle: string) => {
    const container = formContainerRef.current;
    if (!container) return;

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

    const cleanupUTMs = injectUTMsIntoURL();

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

  useEffect(() => {
    const cleanup = buildIframe(t.finalCta.formId, t.finalCta.formName, t.finalCta.formTitle);
    return cleanup;
  }, [locale, t.finalCta.formId, t.finalCta.formName, t.finalCta.formTitle, buildIframe]);

  useGHLFormTracking(formContainerRef, `informacion_${page.slug}`);

  return (
    <section id="informacion-form" className="py-16 md:py-24 bg-gradient-to-b from-ivory to-white">
      <div className="container-custom max-w-3xl text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal mb-4">
          {locale === 'es' ? '¿Listo para conocer NWL?' : 'Ready to discover NWL?'}
        </h2>
        <p className="text-charcoal/70 text-lg mb-8">
          {locale === 'es'
            ? 'Déjanos tus datos y un asesor se pondrá en contacto contigo.'
            : 'Leave your information and an advisor will contact you.'}
        </p>

        {/* WhatsApp button */}
        <a
          href={`https://wa.me/${whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#1ebe57] transition-colors mb-10"
        >
          <FaWhatsapp size={22} />
          {locale === 'es' ? 'Escríbenos por WhatsApp' : 'Message us on WhatsApp'}
        </a>

        {/* GHL Form */}
        <div ref={formContainerRef} className="text-left" />
      </div>
    </section>
  );
}
