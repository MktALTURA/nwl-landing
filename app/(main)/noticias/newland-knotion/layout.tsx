import type { Metadata } from 'next';
import { SITE_URL, SITE_NAME, PAGE_SEO } from '@/lib/seo';
import { ArticleJsonLd, BreadcrumbJsonLd } from '@/components/JsonLd';

const URL = `${SITE_URL}/noticias/newland-knotion`;
const HEADLINE =
  'Newland × Knotion: A Smarter, Braver Way to Learn';

export const metadata: Metadata = {
  title: PAGE_SEO.newlandKnotion.title,
  description: PAGE_SEO.newlandKnotion.description,
  openGraph: {
    type: 'article',
    title: PAGE_SEO.newlandKnotion.title,
    description: PAGE_SEO.newlandKnotion.description,
    url: URL,
    siteName: SITE_NAME,
    images: [
      {
        url: PAGE_SEO.newlandKnotion.ogImage,
        width: 1200,
        height: 630,
        alt: HEADLINE,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_SEO.newlandKnotion.title,
    description: PAGE_SEO.newlandKnotion.description,
    images: [PAGE_SEO.newlandKnotion.ogImage],
  },
  alternates: {
    canonical: URL,
  },
};

export default function NewlandKnotionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ArticleJsonLd
        headline={HEADLINE}
        description={PAGE_SEO.newlandKnotion.description}
        url={URL}
        image={PAGE_SEO.newlandKnotion.ogImage}
        datePublished="2026-06-18"
        section="Metodología"
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Newland School', url: SITE_URL },
          { name: 'Noticias', url: `${SITE_URL}/noticias` },
          { name: 'Newland × Knotion', url: URL },
        ]}
      />
      {children}
    </>
  );
}
