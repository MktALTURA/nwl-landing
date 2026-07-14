import type { Metadata } from 'next';
import { SITE_URL, SITE_NAME, PAGE_SEO } from '@/lib/seo';
import { ArticleJsonLd, BreadcrumbJsonLd } from '@/components/JsonLd';

const URL = `${SITE_URL}/noticias/nwl-australian-school`;
const HEADLINE = 'Newland es ahora NWL Australian School';

export const metadata: Metadata = {
  title: PAGE_SEO.nwlAustralianSchool.title,
  description: PAGE_SEO.nwlAustralianSchool.description,
  openGraph: {
    type: 'article',
    title: PAGE_SEO.nwlAustralianSchool.title,
    description: PAGE_SEO.nwlAustralianSchool.description,
    url: URL,
    siteName: SITE_NAME,
    images: [
      {
        url: PAGE_SEO.nwlAustralianSchool.ogImage,
        width: 1200,
        height: 630,
        alt: HEADLINE,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_SEO.nwlAustralianSchool.title,
    description: PAGE_SEO.nwlAustralianSchool.description,
    images: [PAGE_SEO.nwlAustralianSchool.ogImage],
  },
  alternates: {
    canonical: URL,
  },
};

export default function NwlAustralianSchoolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ArticleJsonLd
        headline={HEADLINE}
        description={PAGE_SEO.nwlAustralianSchool.description}
        url={URL}
        image={PAGE_SEO.nwlAustralianSchool.ogImage}
        datePublished="2026-07-14"
        section="Institucional"
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'NWL Australian School', url: SITE_URL },
          { name: 'Noticias', url: `${SITE_URL}/noticias` },
          { name: 'NWL Australian School', url: URL },
        ]}
      />
      {children}
    </>
  );
}
