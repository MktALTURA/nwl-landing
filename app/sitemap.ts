import type { MetadataRoute } from 'next';
import { campuses } from '@/lib/campus-data';
import { SITE_URL } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  // Static level pages
  const levelPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE_URL}/maternal`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/kinder`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/elementary`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/middle-school`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/high-school`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
  ];

  // Dynamic campus pages
  const campusPages: MetadataRoute.Sitemap = Object.keys(campuses).map(
    (slug) => ({
      url: `${SITE_URL}/campus/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }),
  );

  return [...levelPages, ...campusPages];
}
