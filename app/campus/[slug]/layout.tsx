import SmoothScroll from "@/components/SmoothScroll";
import Navigation from "@/components/Navigation";
import FixedCTAButton from "@/components/FixedCTAButton";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { BrochureProvider } from "@/lib/BrochureContext";
import MetadataUpdater from "@/components/MetadataUpdater";
import BrochureModal from "@/components/BrochureModal";

export default function CampusLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider>
      <BrochureProvider>
        <MetadataUpdater />
        <Navigation />
        <FixedCTAButton />
        <BrochureModal />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </BrochureProvider>
    </LanguageProvider>
  );
}
