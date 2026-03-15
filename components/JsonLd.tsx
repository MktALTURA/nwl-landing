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
    '@type': ['EducationalOrganization', 'School'],
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: 'Colegio Newland',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/images/brand/nwl-combo.png`,
    },
    image: `${SITE_URL}/images/og/home.jpg`,
    description:
      'Bilingual private school in Querétaro & San Miguel de Allende. Maternal through High School. English immersion, project-based learning, 5 campuses.',
    foundingDate: '2009',
    telephone: '+52-442-454-1010',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Admissions',
      telephone: '+52-442-454-1010',
      availableLanguage: ['en', 'es'],
    },
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      minValue: 200,
    },
    address: [
      {
        '@type': 'PostalAddress',
        streetAddress: 'Anillo Vial Fray Junípero Serra',
        addressLocality: 'Juriquilla, Querétaro',
        addressRegion: 'Querétaro',
        addressCountry: 'MX',
      },
      {
        '@type': 'PostalAddress',
        streetAddress: 'Cerrada Panorámica, Distrito Piamonte',
        addressLocality: 'Querétaro',
        addressRegion: 'Querétaro',
        addressCountry: 'MX',
      },
      {
        '@type': 'PostalAddress',
        streetAddress: 'Carr. SMA – Querétaro, San José de la Posta',
        addressLocality: 'San Miguel de Allende',
        addressRegion: 'Guanajuato',
        addressCountry: 'MX',
      },
      {
        '@type': 'PostalAddress',
        streetAddress: 'Libramiento Sur Poniente, El Pueblito',
        addressLocality: 'Corregidora',
        addressRegion: 'Querétaro',
        addressCountry: 'MX',
      },
      {
        '@type': 'PostalAddress',
        streetAddress: 'Paseo de las Pitahayas',
        addressLocality: 'Zibatá, El Marqués',
        addressRegion: 'Querétaro',
        addressCountry: 'MX',
      },
    ],
    areaServed: [
      { '@type': 'City', name: 'Querétaro' },
      { '@type': 'City', name: 'San Miguel de Allende' },
    ],
    sameAs: [
      'https://www.facebook.com/ColegioNewland',
      'https://www.instagram.com/colegionewland',
    ],
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'Accreditation',
        name: 'Cognia Accreditation',
        recognizedBy: {
          '@type': 'Organization',
          name: 'Cognia',
          url: 'https://www.cognia.org',
        },
      },
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'Certification',
        name: 'Apple Distinguished School',
        recognizedBy: {
          '@type': 'Organization',
          name: 'Apple Inc.',
          url: 'https://www.apple.com/education/apple-distinguished-schools/',
        },
      },
    ],
    subOrganization: [
      { '@id': `${SITE_URL}/#campus-juriquilla` },
      { '@id': `${SITE_URL}/#campus-milenio` },
      { '@id': `${SITE_URL}/#campus-san-miguel` },
      { '@id': `${SITE_URL}/#campus-corregidora` },
      { '@id': `${SITE_URL}/#campus-zibata` },
    ],
  };

  return <JsonLdScript data={data} />;
}

/* ── WebSite — enables sitelinks in SERPs ── */
export function WebSiteJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    alternateName: 'Colegio Newland',
    url: SITE_URL,
    publisher: { '@id': `${SITE_URL}/#organization` },
    inLanguage: ['es-MX', 'en'],
  };

  return <JsonLdScript data={data} />;
}

/* ── School + LocalBusiness — used on each campus page ── */
export function CampusJsonLd({ campus }: { campus: CampusData }) {
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': ['School', 'LocalBusiness'],
    '@id': `${SITE_URL}/#campus-${campus.slug}`,
    name: `Newland School — Campus ${campus.name}`,
    url: `${SITE_URL}/campus/${campus.slug}`,
    image: `${SITE_URL}/images/og/campus-${campus.slug}.jpg`,
    description: `${campus.tagline.en}. ${campus.levels.en}.`,
    telephone: `+52${campus.phoneLink}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: campus.address,
      addressLocality: campus.city || 'Querétaro',
      addressRegion: campus.state || 'Querétaro',
      addressCountry: 'MX',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: campus.googleRating,
      bestRating: 5,
      ratingCount: campus.googleReviewCount,
    },
    parentOrganization: {
      '@id': `${SITE_URL}/#organization`,
    },
    hasMap: campus.mapUrl,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '07:00',
        closes: '14:30',
      },
    ],
    priceRange: '$$$',
  };

  if (campus.geo) {
    data.geo = {
      '@type': 'GeoCoordinates',
      latitude: campus.geo.lat,
      longitude: campus.geo.lng,
    };
  }

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
