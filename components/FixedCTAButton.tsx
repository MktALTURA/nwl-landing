'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { FaWhatsapp } from 'react-icons/fa';
import { useLanguage } from '@/lib/i18n/LanguageContext';

/**
 * Persistent CTAs — pinned to the viewport.
 *
 * Desktop (md+): floating pill, bottom-right (unchanged behavior).
 * Mobile (<md): sticky bottom bar with WhatsApp + "Agenda tu visita".
 *   ~84% of traffic is mobile and previously had NO persistent CTA.
 *
 * Both appear only after the visitor scrolls past the hero CTAs, and
 * hide while the #admissions form section is on screen so the bar
 * never covers the form it links to.
 *
 * Lives outside #smooth-wrapper (rendered in layout.tsx) so that
 * position: fixed works relative to the viewport, not the
 * ScrollSmoother transform context. Anchor clicks are intercepted by
 * the document-level handler in SmoothScroll, so #admissions scrolls
 * smoothly on the home page.
 */
export default function FixedCTAButton() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [formOnScreen, setFormOnScreen] = useState(false);

  // #admissions only exists on the homepage — from subpages, navigate there.
  const admissionsHref = pathname === '/' ? '#admissions' : '/#admissions';

  useEffect(() => {
    const onScroll = () => {
      setScrolledPastHero(window.scrollY > window.innerHeight * 0.6);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const form = document.getElementById('admissions');
    if (!form) return;
    const observer = new IntersectionObserver(
      ([entry]) => setFormOnScreen(entry.isIntersecting),
      { threshold: 0.05 },
    );
    observer.observe(form);
    return () => observer.disconnect();
  }, []);

  const visible = scrolledPastHero && !formOnScreen;

  return (
    <>
      {/* Desktop floating pill */}
      <a
        href={admissionsHref}
        data-cta="fixed_schedule_visit"
        className={`fixed bottom-8 right-8 bg-wine text-white px-6 py-3 rounded-full shadow-2xl hover:bg-wine/90 transition-all duration-300 font-bold z-40 hidden md:block ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        {t.footer.scheduleVisitFixed}
      </a>

      {/* Mobile sticky bottom bar */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-40 md:hidden transition-transform duration-300 ${
          visible ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="bg-white/95 backdrop-blur-sm border-t border-charcoal/10 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-3 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <div className="grid grid-cols-2 gap-2">
            <a
              href="https://wa.me/5214421227791"
              target="_blank"
              rel="noopener noreferrer"
              data-cta="sticky_whatsapp"
              className="inline-flex items-center justify-center gap-2 py-3 rounded-sm font-medium text-charcoal border border-[#25D366]/50 bg-white"
            >
              <FaWhatsapp className="text-[#25D366]" size={20} />
              WhatsApp
            </a>
            <a
              href={admissionsHref}
              data-cta="sticky_schedule_visit"
              className="inline-flex items-center justify-center py-3 rounded-sm font-bold text-white bg-wine"
            >
              {t.hero.ctaPrimary}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
