import type { Metadata } from 'next';
import SmoothScroll from "@/components/SmoothScroll";
import Navigation from "@/components/Navigation";
import FixedCTAButton from "@/components/FixedCTAButton";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { BrochureProvider } from "@/lib/BrochureContext";
import MetadataUpdater from "@/components/MetadataUpdater";
import BrochureModal from "@/components/BrochureModal";
import { campuses } from '@/lib/campus-data';
import { SITE_URL, SITE_NAME } from '@/lib/seo';
import { CampusJsonLd, BreadcrumbJsonLd } from '@/components/JsonLd';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const campus = campuses[slug];

  if (!campus) {
    return { title: 'Campus Not Found' };
  }

  const title = `Campus ${campus.name} | ${SITE_NAME}`;
  const description = `${campus.tagline.en}. ${campus.levels.en}. ${campus.address}. Google rating: ${campus.googleRating}/5.`;
  const ogImage = `/images/og/campus-${slug}.jpg`;
  const url = `${SITE_URL}/campus/${slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [{ url: ogImage, width: 1200, height: 630, alt: `Newland School Campus ${campus.name}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: url,
      languages: { en: url, es: url, 'x-default': url },
    },
  };
}

export default async function CampusLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const campus = campuses[slug];

  return (
    <LanguageProvider>
      <BrochureProvider>
        {campus && (
          <>
            <CampusJsonLd campus={campus} />
            <BreadcrumbJsonLd
              items={[
                { name: 'Newland School', url: SITE_URL },
                { name: `Campus ${campus.name}`, url: `${SITE_URL}/campus/${slug}` },
              ]}
            />
          </>
        )}
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
