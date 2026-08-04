import type { NextConfig } from "next";

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "form-action 'self' https://api.shreevanwellness.com",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://analytics.google.com https://www.clarity.ms https://*.clarity.ms https://analytics.ahrefs.com https://crm.shreevanwellness.com https://connect.facebook.net",
  "connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net https://www.clarity.ms https://*.clarity.ms https://analytics.ahrefs.com https://crm.shreevanwellness.com https://api.shreevanwellness.com https://www.facebook.com https://connect.facebook.net",
  "img-src 'self' data: blob: https://www.googletagmanager.com https://www.google-analytics.com https://*.clarity.ms https://c.bing.com https://www.facebook.com",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self' data:",
  "frame-src 'self' https://www.googletagmanager.com",
  "worker-src 'self' blob:",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: false,
  htmlLimitedBots: /.*/,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    deviceSizes: [360, 414, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [64, 96, 128, 256, 384],
  },
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/favicon.ico",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/llms.txt",
        headers: [{ key: "Cache-Control", value: "public, max-age=300, stale-while-revalidate=86400" }],
      },
      {
        source: "/llms-full.txt",
        headers: [{ key: "Cache-Control", value: "public, max-age=300, stale-while-revalidate=86400" }],
      },
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: contentSecurityPolicy,
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self), payment=(self)",
          },
        ],
      },
      {
        // RFC 8288 Web Linking: advertise the machine-readable, full-content
        // representations of the site for AI agents/crawlers. rel="alternate"
        // is the honest, IANA-registered relation here -- this site has no
        // public API, so an "api-catalog"/"service-doc" relation would be
        // inaccurate rather than genuinely useful.
        source: "/",
        headers: [
          {
            key: "Link",
            value:
              '</llms-full.txt>; rel="alternate"; type="text/plain", </llms.txt>; rel="alternate"; type="text/plain"',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      { source: "/our-story", destination: "/about-founder", permanent: true },
      { source: "/story", destination: "/about-founder", permanent: true },
      { source: "/about", destination: "/about-founder", permanent: true },
      { source: "/founder", destination: "/about-founder", permanent: true },
      { source: "/stay-food", destination: "/accommodation-inclusions", permanent: true },
      { source: "/stay-and-food", destination: "/accommodation-inclusions", permanent: true },
      { source: "/accommodations-inclusions", destination: "/accommodation-inclusions", permanent: true },
      { source: "/benefits-outcomes", destination: "/programs", permanent: true },
      { source: "/healing-stories", destination: "/testimonials", permanent: true },
      { source: "/stories", destination: "/testimonials", permanent: true },
      { source: "/consultation", destination: "/book-consultation", permanent: true },
      { source: "/book", destination: "/book-consultation", permanent: true },
      { source: "/booking", destination: "/book-consultation", permanent: true },
      { source: "/privacy", destination: "/privacy-policy", permanent: true },
      { source: "/terms", destination: "/terms-conditions", permanent: true },
      { source: "/refund", destination: "/refund-policy", permanent: true },
      { source: "/refunds", destination: "/refund-policy", permanent: true },
      { source: "/disclaimer", destination: "/wellness-disclaimer", permanent: true },
      {
        source: "/programs/3-day-ganga-sattva-reset",
        destination: "/programs/3-day-ganga-reset",
        permanent: true,
      },
      {
        source: "/programs/7-day-ganga-sattva-foundation",
        destination: "/programs/7-day-foundation",
        permanent: true,
      },
      {
        source: "/programs/14-day-ganga-sattva-transformation",
        destination: "/programs/14-day-transformation",
        permanent: true,
      },
      {
        source: "/programs/28-day-sattva-ganga-inner-awakening",
        destination: "/programs/28-day-inner-awakening",
        permanent: true,
      },
      {
        source: "/programs/60-day-rishi-tantra-residency",
        destination: "/programs/60-day-rishi-residency",
        permanent: true,
      },
      {
        source: "/programs/60-day-residency",
        destination: "/programs/60-day-rishi-residency",
        permanent: true,
      },
      { source: "/modalities/panchakarma-detox", destination: "/modalities/panchkarma-detox", permanent: true },
      { source: "/modality/:path*", destination: "/modalities/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
