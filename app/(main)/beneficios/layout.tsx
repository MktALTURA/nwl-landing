import type { Metadata } from 'next';
import { SITE_URL, PAGE_SEO } from '@/lib/seo';
import { BreadcrumbJsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: PAGE_SEO.beneficios.title,
  description: PAGE_SEO.beneficios.description,
  openGraph: {
    title: PAGE_SEO.beneficios.title,
    description: PAGE_SEO.beneficios.description,
    url: `${SITE_URL}/beneficios`,
    images: [
      {
        url: PAGE_SEO.beneficios.ogImage,
        width: 1200,
        height: 630,
        alt: 'Catálogo de Beneficios — Comunidad Newland',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_SEO.beneficios.title,
    description: PAGE_SEO.beneficios.description,
    images: [PAGE_SEO.beneficios.ogImage],
  },
  alternates: {
    canonical: `${SITE_URL}/beneficios`,
  },
};

export default function BeneficiosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Newland School', url: SITE_URL },
          { name: 'Beneficios', url: `${SITE_URL}/beneficios` },
        ]}
      />
      {children}
    </>
  );
}
