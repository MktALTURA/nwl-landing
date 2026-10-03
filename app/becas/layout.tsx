import SmoothScroll from '@/components/SmoothScroll';
import Navigation from '@/components/Navigation';
import FixedCTAButton from '@/components/FixedCTAButton';
import BrochureModal from '@/components/BrochureModal';
import { LanguageProvider } from '@/lib/i18n/LanguageContext';
import { BrochureProvider } from '@/lib/BrochureContext';

/**
 * Becas shell. Lives outside the (main) group so it can server-render in
 * Spanish (`initialLocale="es"`): this page receives Spanish-speaking ad and
 * CAP traffic, and the first paint must already be in their language. The
 * site-wide toggle still works after mount.
 *
 * No <MetadataUpdater/>: it overwrites document.title with the homepage title
 * after hydration, which would undo the page's own Spanish title.
 */
export default function BecasLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider initialLocale="es">
      <BrochureProvider>
        <Navigation />
        <FixedCTAButton />
        <BrochureModal />
        <SmoothScroll>{children}</SmoothScroll>
      </BrochureProvider>
    </LanguageProvider>
  );
}
