import type { Metadata } from 'next';
import { SITE_URL, PAGE_SEO } from '@/lib/seo';
import { BreadcrumbJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: PAGE_SEO.kinder.title,
  description: PAGE_SEO.kinder.description,
  openGraph: {
    title: PAGE_SEO.kinder.title,
    description: PAGE_SEO.kinder.description,
    url: `${SITE_URL}/kinder`,
    images: [
      {
        url: PAGE_SEO.kinder.ogImage,
        width: 1200,
        height: 630,
        alt: 'Newland School Kinder Program — Ages 3–5',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_SEO.kinder.title,
    description: PAGE_SEO.kinder.description,
    images: [PAGE_SEO.kinder.ogImage],
  },
  alternates: {
    canonical: `${SITE_URL}/kinder`,
    languages: {
      en: `${SITE_URL}/kinder`,
      es: `${SITE_URL}/kinder`,
      'x-default': `${SITE_URL}/kinder`,
    },
  },
};

export default function KinderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Newland School', url: SITE_URL },
          { name: 'Kinder', url: `${SITE_URL}/kinder` },
        ]}
      />
      {children}
    </>
  );
}
