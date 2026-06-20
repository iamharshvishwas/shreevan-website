import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

const implementedRoutes = [
  { href: "/", priority: 1 },
  { href: "/about-founder", priority: 0.78 },
  { href: "/accommodation-inclusions", priority: 0.74 },
  { href: "/book-consultation", priority: 0.86 },
  { href: "/programs/3-day-ganga-reset", priority: 0.82 },
  { href: "/programs/7-day-foundation", priority: 0.82 },
  { href: "/programs/14-day-transformation", priority: 0.82 },
  { href: "/programs/28-day-inner-awakening", priority: 0.84 },
  { href: "/programs/60-day-rishi-residency", priority: 0.84 },
  { href: "/testimonials", priority: 0.7 },
  { href: "/journal", priority: 0.72 },
  { href: "/faqs", priority: 0.7 },
  { href: "/contact", priority: 0.72 },
  { href: "/privacy-policy", priority: 0.38 },
  { href: "/terms-conditions", priority: 0.38 },
  { href: "/refund-policy", priority: 0.38 },
  { href: "/wellness-disclaimer", priority: 0.38 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-06-20T00:00:00.000Z");

  return implementedRoutes.map((route) => ({
    url: `${siteConfig.url}${route.href === "/" ? "" : route.href}`,
    lastModified,
    changeFrequency: route.href === "/" ? "weekly" : "monthly",
    priority: route.priority,
  }));
}
