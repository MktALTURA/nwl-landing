import SmoothScroll from '@/components/SmoothScroll';
import Navigation from '@/components/Navigation';
import FixedCTAButton from '@/components/FixedCTAButton';
import BrochureModal from '@/components/BrochureModal';
import { LanguageProvider } from '@/lib/i18n/LanguageContext';
import { BrochureProvider } from '@/lib/BrochureContext';

/**
 * Same shell as /becas: server-renders in Spanish, the language of the
 * notices themselves, and skips <MetadataUpdater/> so the page keeps its own
 * title after hydration.
 */
export default function AvisoLayout({ children }: { children: React.ReactNode }) {
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
