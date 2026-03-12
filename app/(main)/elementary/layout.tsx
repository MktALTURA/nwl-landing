import type { Metadata } from 'next';
import { SITE_URL, PAGE_SEO } from '@/lib/seo';
import { BreadcrumbJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: PAGE_SEO.elementary.title,
  description: PAGE_SEO.elementary.description,
  openGraph: {
    title: PAGE_SEO.elementary.title,
    description: PAGE_SEO.elementary.description,
    url: `${SITE_URL}/elementary`,
    images: [
      {
        url: PAGE_SEO.elementary.ogImage,
        width: 1200,
        height: 630,
        alt: 'Newland School Elementary — Ages 6–11',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_SEO.elementary.title,
    description: PAGE_SEO.elementary.description,
    images: [PAGE_SEO.elementary.ogImage],
  },
  alternates: {
    canonical: `${SITE_URL}/elementary`,
    languages: {
      en: `${SITE_URL}/elementary`,
      es: `${SITE_URL}/elementary`,
      'x-default': `${SITE_URL}/elementary`,
    },
  },
};

export default function ElementaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Newland School', url: SITE_URL },
          { name: 'Elementary', url: `${SITE_URL}/elementary` },
        ]}
      />
      {children}
    </>
  );
}
