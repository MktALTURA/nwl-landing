import type { Metadata } from 'next';
import Script from 'next/script';
import SmoothScroll from '@/components/SmoothScroll';
import Navigation from '@/components/Navigation';
import FixedCTAButton from '@/components/FixedCTAButton';
import { LanguageProvider } from '@/lib/i18n/LanguageContext';
import { BrochureProvider } from '@/lib/BrochureContext';
import MetadataUpdater from '@/components/MetadataUpdater';
import BrochureModal from '@/components/BrochureModal';
import { getInformacionBySlug, getAllInformacionSlugs } from '@/lib/informacion-data';
import { SITE_URL } from '@/lib/seo';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import { InformacionJsonLd, FAQPageJsonLd } from '@/components/JsonLd';

export async function generateStaticParams() {
  return getAllInformacionSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getInformacionBySlug(slug);

  if (!page) {
    return { title: 'Page Not Found' };
  }

  const url = `${SITE_URL}/informacion/${slug}`;

  // Build hreflang alternates if this page has a bilingual pair
  const languages: Record<string, string> | undefined = page.hreflangPair
    ? {
        'es-MX': `${SITE_URL}/informacion/${page.lang === 'es' ? slug : page.hreflangPair}`,
        en: `${SITE_URL}/informacion/${page.lang === 'en' ? slug : page.hreflangPair}`,
      }
    : undefined;

  return {
    title: page.title,
    description: page.description,
    openGraph: {
      title: page.title,
      description: page.description,
      url,
      images: [
        {
          url: page.images.hero,
          width: 1200,
          height: 630,
          alt: page.h1,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description,
      images: [page.images.hero],
    },
    alternates: {
      canonical: url,
      languages,
    },
  };
}

export default async function InformacionLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getInformacionBySlug(slug);

  return (
    <LanguageProvider>
      <BrochureProvider>
        {page && (
          <>
            <InformacionJsonLd page={page} />
            {page.faqs.length > 0 && <FAQPageJsonLd faqs={page.faqs} />}
            <BreadcrumbJsonLd
              items={[
                { name: 'Newland School', url: SITE_URL },
                {
                  name: page.lang === 'es' ? 'Información' : 'Information',
                  url: `${SITE_URL}/informacion`,
                },
                { name: page.h1, url: `${SITE_URL}/informacion/${slug}` },
              ]}
            />
          </>
        )}
        {/* External team GA4 — tracks /informacion pages only (Ricardo/BPS property) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-NGW2FC7GG6"
          strategy="afterInteractive"
        />
        <Script id="ext-gtag-info" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('config', 'G-NGW2FC7GG6');
          `}
        </Script>
        <MetadataUpdater />
        <Navigation />
        <FixedCTAButton />
        <BrochureModal />
        <SmoothScroll>{children}</SmoothScroll>
      </BrochureProvider>
    </LanguageProvider>
  );
}
