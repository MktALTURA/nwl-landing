import { SITE_URL, SITE_NAME, SITE_LAST_UPDATED, SITE_LEGAL_NAME } from '@/lib/seo';
import type { CampusData } from '@/lib/campus-data';
import type { InformacionPage, InformacionFAQ } from '@/lib/informacion-data';

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
    legalName: SITE_LEGAL_NAME,
    alternateName: ['Colegio Newland', 'Colegio NWL', 'NWL Australian School'],
    url: SITE_URL,
    dateModified: SITE_LAST_UPDATED,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/images/brand/nwl-as-logo-color.png`,
    },
    image: `${SITE_URL}/images/og/nwl/home.jpg`,
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
      'https://www.facebook.com/ColegioNWL',
      'https://www.instagram.com/colegionwl',
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
    alternateName: ['Colegio Newland', 'Colegio NWL', 'NWL Australian School'],
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
    name: `NWL Australian School — Campus ${campus.name}`,
    url: `${SITE_URL}/campus/${campus.slug}`,
    image: `${SITE_URL}/images/og/nwl/campus-${campus.slug}.jpg`,
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

  // Name the campus director as an employee — an E-E-A-T signal, and the same
  // person the page shows. Skipped while the director section is hidden so the
  // markup never claims someone the page doesn't display.
  if (!campus.hideDirector) {
    data.employee = {
      '@type': 'Person',
      name: campus.director.name,
      jobTitle: campus.director.title.en,
      image: `${SITE_URL}${campus.director.image}`,
      worksFor: { '@id': `${SITE_URL}/#campus-${campus.slug}` },
    };
  }

  return <JsonLdScript data={data} />;
}

/* ── WebPage — used on /informacion/ pages ── */
export function InformacionJsonLd({ page }: { page: InformacionPage }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.h1,
    description: page.description,
    url: `${SITE_URL}/informacion/${page.slug}`,
    inLanguage: page.lang === 'es' ? 'es-MX' : 'en',
    dateModified: SITE_LAST_UPDATED,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#organization` },
    image: `${SITE_URL}${page.images.hero}`,
  };

  return <JsonLdScript data={data} />;
}

/* ── FAQPage — used on /informacion/ pages with FAQs ── */
export function FAQPageJsonLd({ faqs }: { faqs: InformacionFAQ[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return <JsonLdScript data={data} />;
}

/* ── NewsArticle — used on /noticias post pages ── */
export function ArticleJsonLd({
  headline,
  description,
  url,
  image,
  datePublished,
  dateModified,
  section,
}: {
  headline: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  section?: string;
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline,
    description,
    image: [image.startsWith('http') ? image : `${SITE_URL}${image}`],
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    datePublished,
    dateModified: dateModified || datePublished,
    ...(section ? { articleSection: section } : {}),
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/brand/nwl-as-logo-color.png`,
      },
    },
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
