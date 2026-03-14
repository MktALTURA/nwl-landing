import { SITE_URL, SITE_NAME } from '@/lib/seo';
import type { CampusData } from '@/lib/campus-data';

/* ── Helper to render a JSON-LD script tag ── */
function JsonLdScript({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/* ── EducationalOrganization — used on the home page ── */
export function OrganizationJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: SITE_NAME,
    alternateName: 'Colegio Newland',
    url: SITE_URL,
    logo: `${SITE_URL}/images/brand/nwl-combo.png`,
    image: `${SITE_URL}/images/og/home.jpg`,
    description:
      'Bilingual private school in Querétaro & San Miguel de Allende. Maternal through High School. English immersion, project-based learning, 5 campuses.',
    foundingDate: '1992',
    address: [
      {
        '@type': 'PostalAddress',
        addressLocality: 'Querétaro',
        addressRegion: 'Querétaro',
        addressCountry: 'MX',
      },
      {
        '@type': 'PostalAddress',
        addressLocality: 'San Miguel de Allende',
        addressRegion: 'Guanajuato',
        addressCountry: 'MX',
      },
    ],
    sameAs: [
      'https://www.facebook.com/ColegioNewland',
      'https://www.instagram.com/colegionewland',
    ],
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      minValue: 200,
    },
    areaServed: [
      { '@type': 'City', name: 'Querétaro' },
      { '@type': 'City', name: 'San Miguel de Allende' },
    ],
  };

  return <JsonLdScript data={data} />;
}

/* ── School + LocalBusiness — used on each campus page ── */
export function CampusJsonLd({ campus }: { campus: CampusData }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': ['School', 'LocalBusiness'],
    name: `Newland School — Campus ${campus.name}`,
    url: `${SITE_URL}/campus/${campus.slug}`,
    image: `${SITE_URL}/images/og/campus-${campus.slug}.jpg`,
    description: `${campus.tagline.en}. ${campus.levels.en}.`,
    telephone: `+52${campus.phoneLink}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: campus.address,
      addressCountry: 'MX',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: campus.googleRating,
      bestRating: 5,
      ratingCount: campus.googleReviewCount,
    },
    parentOrganization: {
      '@type': 'EducationalOrganization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    hasMap: campus.mapUrl,
  };

  return <JsonLdScript data={data} />;
}

/* ── BreadcrumbList — used on all pages ── */
export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return <JsonLdScript data={data} />;
}
