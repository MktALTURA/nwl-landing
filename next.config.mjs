/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['prod-files-secure.s3.us-west-2.amazonaws.com', 'images.unsplash.com'],
  },
  async rewrites() {
    return [
      { source: '/be_nwl', destination: '/be_nwl.html' },
      { source: '/golden_ticket', destination: '/golden_ticket.html' },
      { source: '/golden_ticket_cap', destination: '/golden_ticket_cap.html' },
    ];
  },
};

export default nextConfig;
