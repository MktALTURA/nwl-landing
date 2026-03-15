import type { Metadata } from 'next';
import SmoothScroll from '@/components/SmoothScroll';
import Navigation from '@/components/Navigation';
import FixedCTAButton from '@/components/FixedCTAButton';
import { LanguageProvider } from '@/lib/i18n/LanguageContext';
import { BrochureProvider } from '@/lib/BrochureContext';
import MetadataUpdater from '@/components/MetadataUpdater';
import BrochureModal from '@/components/BrochureModal';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import { SITE_URL, SITE_NAME, PAGE_SEO } from '@/lib/seo';

const seo = PAGE_SEO.careers;
const url = `${SITE_URL}/trabaja-con-nosotros`;

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  openGraph: {
    title: seo.title,
    description: seo.description,
    url,
    images: [{ url: seo.ogImage, width: 1200, height: 630, alt: `Work with Us — ${SITE_NAME}` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: seo.title,
    description: seo.description,
    images: [seo.ogImage],
  },
  alternates: {
    canonical: url,
  },
};

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <BrochureProvider>
        <BreadcrumbJsonLd
          items={[
            { name: 'Newland School', url: SITE_URL },
            { name: 'Trabaja con Nosotros', url },
          ]}
        />
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
