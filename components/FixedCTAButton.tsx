'use client';

import { useLanguage } from '@/lib/i18n/LanguageContext';

/**
 * Floating "Schedule Visit" button — pinned bottom-right.
 *
 * Lives outside #smooth-wrapper (rendered in layout.tsx) so that
 * position: fixed works relative to the viewport, not the
 * ScrollSmoother transform context.
 */
export default function FixedCTAButton() {
  const { t } = useLanguage();

  return (
    <a
      href="#admissions"
      className="fixed bottom-8 right-8 bg-wine text-white px-6 py-3 rounded-full shadow-2xl hover:bg-wine/90 transition-colors font-bold z-40 hidden md:block"
    >
      {t.footer.scheduleVisitFixed}
    </a>
  );
}
