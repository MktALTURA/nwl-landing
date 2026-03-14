import type { Metadata } from 'next';
import { SITE_URL, PAGE_SEO } from '@/lib/seo';
import { BreadcrumbJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: PAGE_SEO.middleSchool.title,
  description: PAGE_SEO.middleSchool.description,
  openGraph: {
    title: PAGE_SEO.middleSchool.title,
    description: PAGE_SEO.middleSchool.description,
    url: `${SITE_URL}/middle-school`,
    images: [
      {
        url: PAGE_SEO.middleSchool.ogImage,
        width: 1200,
        height: 630,
        alt: 'Newland School Middle School — Ages 12–15',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_SEO.middleSchool.title,
    description: PAGE_SEO.middleSchool.description,
    images: [PAGE_SEO.middleSchool.ogImage],
  },
  alternates: {
    canonical: `${SITE_URL}/middle-school`,
    languages: {
      en: `${SITE_URL}/middle-school`,
      es: `${SITE_URL}/middle-school`,
      'x-default': `${SITE_URL}/middle-school`,
    },
  },
};

export default function MiddleSchoolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Newland School', url: SITE_URL },
          { name: 'Middle School', url: `${SITE_URL}/middle-school` },
        ]}
      />
      {children}
    </>
  );
}
