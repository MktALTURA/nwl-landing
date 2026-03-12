/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    qualities: [75, 80, 90],
    remotePatterns: [
      { protocol: 'https', hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },

  async headers() {
    return [
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
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://link.msgsndr.com https://va.vercel-scripts.com https://cdn.jsdelivr.net",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https://prod-files-secure.s3.us-west-2.amazonaws.com https://images.unsplash.com https://storage.googleapis.com https://assets.cdn.filesafe.space",
              "frame-src https://api.leadconnectorhq.com https://heyzine.com https://www.google.com",
              "connect-src 'self' https://api.leadconnectorhq.com https://link.msgsndr.com https://va.vercel-scripts.com https://vitals.vercel-insights.com https://fonts.googleapis.com https://fonts.gstatic.com",
            ].join('; '),
          },
        ],
      },
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
