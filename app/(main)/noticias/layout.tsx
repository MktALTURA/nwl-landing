import type { Metadata } from 'next';
import { SITE_URL, PAGE_SEO } from '@/lib/seo';

export const metadata: Metadata = {
  title: PAGE_SEO.noticias.title,
  description: PAGE_SEO.noticias.description,
  openGraph: {
    title: PAGE_SEO.noticias.title,
    description: PAGE_SEO.noticias.description,
    url: `${SITE_URL}/noticias`,
    images: [
      {
        url: PAGE_SEO.noticias.ogImage,
        width: 1200,
        height: 630,
        alt: PAGE_SEO.noticias.title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_SEO.noticias.title,
    description: PAGE_SEO.noticias.description,
    images: [PAGE_SEO.noticias.ogImage],
  },
  alternates: {
    canonical: `${SITE_URL}/noticias`,
  },
};

export default function NoticiasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
