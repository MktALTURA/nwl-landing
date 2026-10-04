import type { Metadata } from 'next';
import BecasPage from '@/components/becas/BecasPage';
import { BecasJsonLd } from '@/components/becas/BecasJsonLd';
import { getCatalogSafe } from '@/lib/becas/catalog';
import { BECAS_PUBLIC } from '@/lib/becas/preview';
import { PAGE_SEO, SITE_NAME, SITE_URL } from '@/lib/seo';

const seo = PAGE_SEO.becas;
const url = `${SITE_URL}/becas`;

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  openGraph: {
    title: `${seo.title} | ${SITE_NAME}`,
    description: seo.description,
    url,
    locale: 'es_MX',
    images: [{ url: seo.ogImage, width: 1200, height: 630, alt: `Programa de Becas — ${SITE_NAME}` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${seo.title} | ${SITE_NAME}`,
    description: seo.description,
    images: [seo.ogImage],
  },
  alternates: { canonical: url },
  // Private preview until launch — see lib/becas/preview.ts
  ...(BECAS_PUBLIC ? {} : { robots: { index: false, follow: false } }),
};

/**
 * Server component: the copy is in the initial HTML; the catalog (cupos, and
 * prices when the program shows them) comes from the worker through a 60 s
 * cache that the worker can also bust via /api/becas/revalidate.
 */
export const revalidate = 60;

export default async function Page() {
  const catalog = await getCatalogSafe();
  return (
    <>
      <BecasJsonLd />
      <BecasPage catalog={catalog} />
    </>
  );
}
