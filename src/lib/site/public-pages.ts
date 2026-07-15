import "server-only";

import { unstable_cache } from "next/cache";
import { readAdminPageContent } from "@/lib/admin/page-content";
import type { AdminManagedPage } from "@/lib/admin/page-content";
import { normalizeAdminAboutStoryContent } from "@/lib/admin/about-story-content";
import { CACHE_TAGS } from "@/lib/site/content-cache";
import type { PublicManagedPageContent } from "@/lib/site/public-pages-types";

function cleanText(value: string, fallback: string) {
  return value.trim() || fallback;
}

function toPublicPage(page: AdminManagedPage, fallback: AdminManagedPage): PublicManagedPageContent {
  const source = page.status === "published" ? page : fallback;

  return {
    id: source.id,
    path: cleanText(source.path, fallback.path),
    status: source.status,
    seo: {
      title: cleanText(source.seo.title, fallback.seo.title),
      description: cleanText(source.seo.description, fallback.seo.description),
      canonicalPath: cleanText(source.seo.canonicalPath, fallback.seo.canonicalPath),
      noindex: source.seo.noindex,
    },
    hero: {
      eyebrow: cleanText(source.hero.eyebrow, fallback.hero.eyebrow),
      title: cleanText(source.hero.title, fallback.hero.title),
      lede: cleanText(source.hero.lede, fallback.hero.lede),
      primaryCtaLabel: cleanText(source.hero.primaryCtaLabel, fallback.hero.primaryCtaLabel),
      primaryCtaHref: cleanText(source.hero.primaryCtaHref, fallback.hero.primaryCtaHref),
      secondaryCtaLabel: cleanText(source.hero.secondaryCtaLabel, fallback.hero.secondaryCtaLabel),
      secondaryCtaHref: cleanText(source.hero.secondaryCtaHref, fallback.hero.secondaryCtaHref),
    },
  };
}

export const getPublicPageContent = unstable_cache(
  async function getPublicPageContent(pageId: string) {
    const store = await readAdminPageContent();
    const fallback = store.pages.find((page) => page.id === pageId) ?? store.pages[0];
    const page = store.pages.find((item) => item.id === pageId) ?? fallback;

    return toPublicPage(page, fallback);
  },
  ["public-page-content"],
  { tags: [CACHE_TAGS.pages] },
);

export const getPublicAboutStoryContent = unstable_cache(
  async function getPublicAboutStoryContent() {
    const store = await readAdminPageContent();
    const page = store.pages.find((item) => item.id === "about-founder");
    return normalizeAdminAboutStoryContent(page?.content?.aboutStory);
  },
  ["public-about-story-content"],
  { tags: [CACHE_TAGS.pages] },
);
