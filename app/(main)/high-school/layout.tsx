import type { Metadata } from 'next';
import { SITE_URL, SITE_NAME, PAGE_SEO } from '@/lib/seo';
import { BreadcrumbJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: PAGE_SEO.highSchool.title,
  description: PAGE_SEO.highSchool.description,
  openGraph: {
    title: PAGE_SEO.highSchool.title,
    description: PAGE_SEO.highSchool.description,
    url: `${SITE_URL}/high-school`,
    images: [
      {
        url: PAGE_SEO.highSchool.ogImage,
        width: 1200,
        height: 630,
        alt: 'NWL Australian School — Senior School, Prepa NWL',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_SEO.highSchool.title,
    description: PAGE_SEO.highSchool.description,
    images: [PAGE_SEO.highSchool.ogImage],
  },
  alternates: {
    canonical: `${SITE_URL}/high-school`,
  },
};

export default function HighSchoolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: SITE_NAME, url: SITE_URL },
          { name: 'Senior School', url: `${SITE_URL}/high-school` },
        ]}
      />
      {children}
    </>
  );
}
