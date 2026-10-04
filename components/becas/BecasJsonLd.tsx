import { BreadcrumbJsonLd, FAQPageJsonLd } from '@/components/JsonLd';
import { BECAS_FAQ_ES } from '@/lib/becas/copy';
import { PAGE_SEO, SITE_LAST_UPDATED, SITE_NAME, SITE_URL } from '@/lib/seo';

/**
 * Structured data for /becas. A WebPage about the organisation plus the FAQ
 * and breadcrumb. Deliberately no Grant, funder, sponsor or price nodes: the
 * page claims a discount program, not a foundation, and the endorsing entity
 * is not confirmed.
 */
export function BecasJsonLd() {
  const url = `${SITE_URL}/becas`;
  const seo = PAGE_SEO.becas;
  const webPage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: seo.title,
    description: seo.description,
    inLanguage: 'es-MX',
    dateModified: SITE_LAST_UPDATED,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#organization` },
    primaryImageOfPage: { '@type': 'ImageObject', url: `${SITE_URL}${seo.ogImage}` },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }} />
      <BreadcrumbJsonLd
        items={[
          { name: SITE_NAME, url: SITE_URL },
          { name: 'Programa de Becas', url },
        ]}
      />
      <FAQPageJsonLd faqs={BECAS_FAQ_ES.map((f) => ({ question: f.q, answer: f.a }))} />
    </>
  );
}
