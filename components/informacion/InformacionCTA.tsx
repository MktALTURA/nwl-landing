'use client';

import { useEffect, useRef, useCallback } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useGHLFormTracking } from '@/lib/hooks/useGHLFormTracking';
import { useFormEventId } from '@/lib/hooks/useFormEventId';
import { buildGHLFormSrc } from '@/lib/utm';
import SouthernCross from '@/components/ui/SouthernCross';
import type { InformacionPage } from '@/lib/informacion-data';


interface InformacionCTAProps {
  page: InformacionPage;
}

export default function InformacionCTA({ page }: InformacionCTAProps) {
  const { locale, t } = useLanguage();
  const formContainerRef = useRef<HTMLDivElement>(null);
  // Shared Meta event_id for this submission (browser pixel + GHL server side).
  const eventId = useFormEventId();

  const whatsappNumber = '5214421227791';

  const buildIframe = useCallback((formId: string, formName: string, formTitle: string) => {
    const container = formContainerRef.current;
    if (!container) return;

    container.innerHTML = '';

    const iframe = document.createElement('iframe');
    // Append tracking params directly to the iframe src — cross-origin
    // iframes don't inherit the parent URL, so this is how GHL sees them.
    iframe.src = buildGHLFormSrc(`https://api.leadconnectorhq.com/widget/form/${formId}`, {
      event_id: eventId,
    });
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

    const script = document.createElement('script');
    script.src = 'https://link.msgsndr.com/js/form_embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      try { script.parentNode?.removeChild(script); } catch { /* noop */ }
      container.innerHTML = '';
    };
  }, [eventId]);

  useEffect(() => {
    const cleanup = buildIframe(t.finalCta.formId, t.finalCta.formName, t.finalCta.formTitle);
    return cleanup;
  }, [locale, t.finalCta.formId, t.finalCta.formName, t.finalCta.formTitle, buildIframe]);

  useGHLFormTracking(formContainerRef, `informacion_${page.slug}`, eventId);

  return (
    <section id="informacion-form" className="py-16 md:py-24 nwl-bg-dawn text-paper relative overflow-hidden">
      {/* Southern Cross motif */}
      <div className="absolute top-10 right-[6%] z-[1] pointer-events-none hidden md:block">
        <SouthernCross height={110} color="var(--nwl-gold)" opacity={0.32} />
      </div>

      <div className="container-custom max-w-3xl text-center relative z-10">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-paper mb-4">
          {locale === 'es' ? (
            <>¿Listo para conocer <span className="italic text-gold">NWL</span>?</>
          ) : (
            <>Ready to discover <span className="italic text-gold">NWL</span>?</>
          )}
        </h2>
        <p className="text-paper/70 text-lg mb-8">
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
        <div ref={formContainerRef} className="text-left rounded-2xl overflow-hidden shadow-2xl" />
      </div>
    </section>
  );
}
