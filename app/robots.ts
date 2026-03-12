import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/maternal', '/kinder', '/elementary', '/middle-school', '/high-school', '/campus/'],
        disallow: ['/_next/', '/api/', '/brochures/', '/coming-soon'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
