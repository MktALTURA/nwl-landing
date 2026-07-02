import type { Metadata } from 'next';
import { SITE_URL, SITE_NAME, PAGE_SEO } from '@/lib/seo';
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
        alt: 'NWL Australian School — Elementary, Ages 6–11',
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
          { name: SITE_NAME, url: SITE_URL },
          { name: 'Elementary', url: `${SITE_URL}/elementary` },
        ]}
      />
      {children}
    </>
  );
}
