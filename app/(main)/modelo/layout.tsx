import type { Metadata } from 'next';
import { SITE_URL, SITE_NAME, PAGE_SEO } from '@/lib/seo';
import { BreadcrumbJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: PAGE_SEO.modelo.title,
  description: PAGE_SEO.modelo.description,
  openGraph: {
    title: PAGE_SEO.modelo.title,
    description: PAGE_SEO.modelo.description,
    url: `${SITE_URL}/modelo`,
    images: [
      {
        url: PAGE_SEO.modelo.ogImage,
        width: 1200,
        height: 630,
        alt: 'NWL Australian School — The NWL Academic Model',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_SEO.modelo.title,
    description: PAGE_SEO.modelo.description,
    images: [PAGE_SEO.modelo.ogImage],
  },
  alternates: {
    canonical: `${SITE_URL}/modelo`,
  },
};

export default function ModeloLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: SITE_NAME, url: SITE_URL },
          { name: 'Modelo Académico NWL', url: `${SITE_URL}/modelo` },
        ]}
      />
      {children}
    </>
  );
}
