import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: false,
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
