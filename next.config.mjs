/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 80, 90],
    remotePatterns: [
      { protocol: 'https', hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },

  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          // Force HTTPS for 2 years + allow HSTS preload list submission
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          // Prevent MIME-type sniffing
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          // Block site from being rendered inside iframes (clickjacking protection)
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          // Control what referrer info is sent with requests
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          // Disable browser features the site doesn't use
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=()',
          },
          // CSP in REPORT-ONLY mode first — logs violations without blocking
          // Move to Content-Security-Policy once verified in production
          {
            key: 'Content-Security-Policy-Report-Only',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://link.msgsndr.com https://va.vercel-scripts.com https://cdn.jsdelivr.net https://www.googletagmanager.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https://prod-files-secure.s3.us-west-2.amazonaws.com https://images.unsplash.com https://storage.googleapis.com https://assets.cdn.filesafe.space",
              "frame-src https://api.leadconnectorhq.com https://heyzine.com https://www.google.com",
              "connect-src 'self' https://api.leadconnectorhq.com https://link.msgsndr.com https://va.vercel-scripts.com https://vitals.vercel-insights.com https://fonts.googleapis.com https://fonts.gstatic.com https://www.googletagmanager.com https://www.google-analytics.com https://analytics.google.com",
            ].join('; '),
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      // Safety net: /form-submitted is a virtual URL for analytics — redirect to home if hit directly
      { source: '/form-submitted', destination: '/', permanent: false },

      // ── Old nwl.com.mx level pages ──
      { source: '/nwl-nivel-maternal', destination: '/maternal', permanent: true },
      { source: '/nwl-nivel-kinder', destination: '/kinder', permanent: true },
      { source: '/nwl-nivel-primaria', destination: '/elementary', permanent: true },
      { source: '/nwl-nivel-secundaria', destination: '/middle-school', permanent: true },
      { source: '/nwl-nivel-preparatoria', destination: '/high-school', permanent: true },

      // ── Old campus pages (+ subpages like /instalaciones, /directorio, /epad, etc.) ──
      { source: '/Juriquilla', destination: '/campus/juriquilla', permanent: true },
      { source: '/Juriquilla/:path*', destination: '/campus/juriquilla', permanent: true },
      { source: '/Milenio', destination: '/campus/milenio', permanent: true },
      { source: '/Milenio/:path*', destination: '/campus/milenio', permanent: true },
      { source: '/san-miguel-de-allende', destination: '/campus/san-miguel', permanent: true },
      { source: '/san-miguel-de-allende/:path*', destination: '/campus/san-miguel', permanent: true },
      { source: '/Corregidora', destination: '/campus/corregidora', permanent: true },
      { source: '/Corregidora/:path*', destination: '/campus/corregidora', permanent: true },
      { source: '/zibata/:path*', destination: '/campus/zibata', permanent: true },

      // ── Old general pages → home (no direct equivalent in new site) ──
      { source: '/rectoria', destination: '/', permanent: true },
      { source: '/modelo-educativo', destination: '/', permanent: true },
      { source: '/experiencias-internacionales', destination: '/', permanent: true },
      { source: '/grupos-representativos', destination: '/', permanent: true },
      { source: '/inscripcion', destination: '/', permanent: true },
      // /trabaja-con-nosotros now has its own page — redirect removed
      { source: '/noticias', destination: '/', permanent: true },
      { source: '/noticias/:path*', destination: '/', permanent: true },
      { source: '/venta-nocturna', destination: '/', permanent: true },

      // ── Old SEO landing pages (/docs/*) → best-match destinations ──
      { source: '/docs/colegio-privado-en-juriquilla-con-maternal', destination: '/maternal', permanent: true },
      { source: '/docs/escuela-maternal-en-san-miguel-de-allende', destination: '/maternal', permanent: true },
      { source: '/docs/escuela-con-maternal-y-kinder-en-queretaro', destination: '/maternal', permanent: true },
      { source: '/docs/private-bilingual-pre-kinder-in-queretaro', destination: '/maternal', permanent: true },
      { source: '/docs/colegio-privado-con-kinder-en-juriquilla', destination: '/kinder', permanent: true },
      { source: '/docs/el-mejor-kinder-privado-en-queretaro', destination: '/kinder', permanent: true },
      { source: '/docs/kinder-en-milenio-queretaro', destination: '/kinder', permanent: true },
      { source: '/docs/kinder-en-san-miguel-de-allende', destination: '/kinder', permanent: true },
      { source: '/docs/kinder-cerca-de-loma-dorada', destination: '/kinder', permanent: true },
      { source: '/docs/kinder-en-centro-sur-queretaro', destination: '/kinder', permanent: true },
      { source: '/docs/private-bilingual-kindergarten-in-queretaro', destination: '/kinder', permanent: true },
      { source: '/docs/colegio-con-kinder-y-maternal-en-corregidora-queretaro', destination: '/kinder', permanent: true },
      { source: '/docs/la-mejor-primaria-bilingue-en-queretaro', destination: '/elementary', permanent: true },
      { source: '/docs/primarias-cerca-de-milenio-queretaro', destination: '/elementary', permanent: true },
      { source: '/docs/escuela-primaria-en-san-miguel-de-allende', destination: '/elementary', permanent: true },
      { source: '/docs/primaria-cerca-de-loma-dorada', destination: '/elementary', permanent: true },
      { source: '/docs/escuela-primaria-en-centro-sur-queretaro', destination: '/elementary', permanent: true },
      { source: '/docs/primaria-privada-en-centro-sur-queretaro', destination: '/elementary', permanent: true },
      { source: '/docs/private-bilingual-elementary-school-in-queretaro', destination: '/elementary', permanent: true },
      { source: '/docs/colegio-privado-con-secundaria-en-juriquilla', destination: '/middle-school', permanent: true },
      { source: '/docs/la-mejor-secundaria-particular-en-queretaro', destination: '/middle-school', permanent: true },
      { source: '/docs/secundaria-en-milenio-queretaro', destination: '/middle-school', permanent: true },
      { source: '/docs/secundaria-en-san-miguel-de-allende', destination: '/middle-school', permanent: true },
      { source: '/docs/secundaria-cerca-de-loma-dorada-queretaro', destination: '/middle-school', permanent: true },
      { source: '/docs/secundaria-en-centro-sur', destination: '/middle-school', permanent: true },
      { source: '/docs/secundarias-cerca-de-el-mirador-queretaro', destination: '/middle-school', permanent: true },
      { source: '/docs/private-bilingual-junior-high-school-in-queretaro', destination: '/middle-school', permanent: true },
      { source: '/docs/escuela-con-primaria-y-secundaria-en-corregidora-queretaro', destination: '/middle-school', permanent: true },
      { source: '/docs/preparatoria-bilingue-privada-en-queretaro', destination: '/high-school', permanent: true },
      { source: '/docs/preparatoria-bilingue-privada-en-san-miguel-de-allende', destination: '/high-school', permanent: true },
      { source: '/docs/preparatoria-bilingue-privada-en-corregidora-queretaro', destination: '/high-school', permanent: true },
      { source: '/docs/preparatoria-bilingue-privada-en-juriquilla-queretaro', destination: '/high-school', permanent: true },
      { source: '/docs/preparatoria-bilingue-privada-en-zibata-queretaro', destination: '/high-school', permanent: true },
      { source: '/docs/excellence-bilingual-high-school-in-san-miguel-de-allende', destination: '/high-school', permanent: true },
      { source: '/docs/escuela-particular-y-bilingue-en-juriquilla', destination: '/campus/juriquilla', permanent: true },
      { source: '/docs/escuela-privada-cerca-de-zibata-queretaro', destination: '/campus/zibata', permanent: true },
      { source: '/docs/escuela-privada-cerca-de-milenio', destination: '/campus/milenio', permanent: true },
      { source: '/docs/escuelas-en-el-mirador-queretaro', destination: '/campus/milenio', permanent: true },
      { source: '/docs/escuela-bilingue-en-san-miguel-de-allende', destination: '/campus/san-miguel', permanent: true },
      { source: '/docs/escuela-particular-cerca-de-loma-dorada-queretaro', destination: '/campus/corregidora', permanent: true },
      { source: '/docs/colegio-privado-bilingue-en-queretaro', destination: '/', permanent: true },
      { source: '/docs/el-mejor-colegio-particular-en-queretaro', destination: '/', permanent: true },
      { source: '/docs/escuela-privada-en-queretaro-con-kinder-primaria-y-secundaria', destination: '/', permanent: true },
      { source: '/docs/escuela-privada-cerca-del-refugio-queretaro', destination: '/', permanent: true },
      { source: '/docs/private-bilingual-school-in-queretaro', destination: '/', permanent: true },
      // Catch-all for remaining /docs/* and /pdf/*
      { source: '/docs/:path*', destination: '/', permanent: true },
      { source: '/pdf/:path*', destination: '/', permanent: true },
    ];
  },

  async rewrites() {
    return [
      { source: '/secundaria', destination: '/middle-school' },
      { source: '/be_nwl', destination: '/be_nwl.html' },
      { source: '/golden_ticket', destination: '/golden_ticket.html' },
      { source: '/golden_ticket_cap', destination: '/golden_ticket_cap.html' },
    ];
  },
};

export default nextConfig;
