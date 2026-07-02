import type { Metadata } from 'next';
import { SITE_URL, SITE_NAME, PAGE_SEO } from '@/lib/seo';
import { BreadcrumbJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: PAGE_SEO.maternal.title,
  description: PAGE_SEO.maternal.description,
  openGraph: {
    title: PAGE_SEO.maternal.title,
    description: PAGE_SEO.maternal.description,
    url: `${SITE_URL}/maternal`,
    images: [
      {
        url: PAGE_SEO.maternal.ogImage,
        width: 1200,
        height: 630,
        alt: 'NWL Australian School — Maternal Program, Ages 2–3',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_SEO.maternal.title,
    description: PAGE_SEO.maternal.description,
    images: [PAGE_SEO.maternal.ogImage],
  },
  alternates: {
    canonical: `${SITE_URL}/maternal`,
  },
};

export default function MaternalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: SITE_NAME, url: SITE_URL },
          { name: 'Maternal', url: `${SITE_URL}/maternal` },
        ]}
      />
      {children}
    </>
  );
}
