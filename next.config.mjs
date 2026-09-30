/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // Static export: `next build` writes a plain out/ folder that any web server
  // can serve, which is what Hostinger's Git deploy needs -- it clones the
  // repository and serves files, it does not run Node.
  output: 'export',

  // Every route becomes a directory with an index.html, so Apache resolves
  // /pricing without a rewrite rule. Without this the build emits pricing.html
  // and the clean URL 404s.
  trailingSlash: true,

  // next/image's optimiser is a server, and there isn't one. Images are served
  // exactly as they are committed.
  images: { unoptimized: true },
};

// The redirects() block that used to live here is gone: static export has no
// server to run it. The same rules are in public/.htaccess, which ships to
// out/.htaccess and is read by Hostinger's Apache. Change them there.

export default nextConfig;
