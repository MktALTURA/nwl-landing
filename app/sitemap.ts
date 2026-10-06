import type { MetadataRoute } from 'next';
import { campuses } from '@/lib/campus-data';
import { getAllInformacionSlugs } from '@/lib/informacion-data';
import { SITE_URL } from '@/lib/seo';
import { RECTORIA_PUBLIC } from '@/lib/rectoria-preview';
import { BECAS_PUBLIC } from '@/lib/becas/preview';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}`, lastModified: now },
    { url: `${SITE_URL}/modelo`, lastModified: now },
    { url: `${SITE_URL}/maternal`, lastModified: now },
    { url: `${SITE_URL}/kinder`, lastModified: now },
    { url: `${SITE_URL}/elementary`, lastModified: now },
    { url: `${SITE_URL}/middle-school`, lastModified: now },
    { url: `${SITE_URL}/high-school`, lastModified: now },
    { url: `${SITE_URL}/trabaja-con-nosotros`, lastModified: now },
    { url: `${SITE_URL}/informacion`, lastModified: now },
    { url: `${SITE_URL}/beneficios`, lastModified: now },
    { url: `${SITE_URL}/noticias`, lastModified: now },
    {
      url: `${SITE_URL}/noticias/nwl-australian-school`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/noticias/newland-knotion`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ];

  // Rectoría joins the sitemap only once the launch flag is on
  if (RECTORIA_PUBLIC) {
    staticPages.push({ url: `${SITE_URL}/rectoria`, lastModified: now });
  }

  // Becas joins the sitemap only once its launch flag is on (lib/becas/preview.ts).
  // Its status, verify and demo routes are noindex and never listed.
  if (BECAS_PUBLIC) {
    staticPages.push({ url: `${SITE_URL}/becas`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.9 });
  }

  // Dynamic campus pages
  const campusPages: MetadataRoute.Sitemap = Object.keys(campuses).map(
    (slug) => ({
      url: `${SITE_URL}/campus/${slug}`,
      lastModified: now,
    }),
  );

  // SEO informacion pages
  const informacionPages: MetadataRoute.Sitemap = getAllInformacionSlugs().map(
    (slug) => ({
      url: `${SITE_URL}/informacion/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }),
  );

  // Parents portal — only the landing page (campus pages are password-gated)
  const padresPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/padres`, lastModified: now },
  ];

  return [...staticPages, ...campusPages, ...informacionPages, ...padresPages];
}
