const isWaitlist = process.env.NEXT_PUBLIC_LAUNCH_MODE !== 'live';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    // Old themindx.ai URLs (the Shopify App Store listing may link to these).
    const legacy = [
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/privacy-policy.html', destination: '/privacy', permanent: true },
      { source: '/terms-of-service.html', destination: '/terms', permanent: true },
    ];
    // While in waitlist mode, old or shared links to the Brain Scan and demo
    // pages land on the waitlist. Temporary (307) so they can change at launch.
    const waitlist = isWaitlist
      ? [
          { source: '/brain-scan', destination: '/waitlist', permanent: false },
          { source: '/demo', destination: '/waitlist?intent=demo', permanent: false },
        ]
      : [];
    return [...legacy, ...waitlist];
  },
};

export default nextConfig;
