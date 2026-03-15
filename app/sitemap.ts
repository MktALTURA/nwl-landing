import type { MetadataRoute } from 'next';
import { campuses } from '@/lib/campus-data';
import { SITE_URL } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}`, lastModified: now },
    { url: `${SITE_URL}/maternal`, lastModified: now },
    { url: `${SITE_URL}/kinder`, lastModified: now },
    { url: `${SITE_URL}/elementary`, lastModified: now },
    { url: `${SITE_URL}/middle-school`, lastModified: now },
    { url: `${SITE_URL}/high-school`, lastModified: now },
    { url: `${SITE_URL}/trabaja-con-nosotros`, lastModified: now },
  ];

  // Dynamic campus pages
  const campusPages: MetadataRoute.Sitemap = Object.keys(campuses).map(
    (slug) => ({
      url: `${SITE_URL}/campus/${slug}`,
      lastModified: now,
    }),
  );

  return [...staticPages, ...campusPages];
}
