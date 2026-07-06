import "server-only";

import { unstable_cache } from "next/cache";
import { CACHE_TAGS } from "@/lib/site/content-cache";
import { defaultAdminHomeContent, readAdminHomeContent } from "@/lib/admin/home-content";
import type {
  AdminHomeContentStore,
  AdminHomeDifferentiationCard,
  AdminHomeMedia,
  AdminHomeProgramItem,
  AdminHomeTaggedCard,
  AdminHomeTestimonial,
  AdminHomeTextItem,
  AdminHomeTitleCopyItem,
} from "@/lib/admin/home-content";
import type { PublicHomeContent } from "@/lib/site/public-home-types";

function cleanText(value: string, fallback: string) {
  return value.trim() || fallback;
}

function cleanMedia(media: AdminHomeMedia, fallback: AdminHomeMedia): AdminHomeMedia {
  const kind = media.kind === "image" || media.kind === "video" ? media.kind : fallback.kind;

  return {
    kind: media.src.trim() ? kind : "",
    src: media.src.trim(),
    alt: cleanText(media.alt, fallback.alt),
    caption: cleanText(media.caption, fallback.caption),
    placeholder: cleanText(media.placeholder, fallback.placeholder),
  };
}

function cleanTextItems(items: AdminHomeTextItem[], fallback: AdminHomeTextItem[]) {
  return items.map((item, index) => ({
    id: cleanText(item.id, fallback[index]?.id ?? `text-${index + 1}`),
    text: cleanText(item.text, fallback[index]?.text ?? ""),
  }));
}

function cleanTitleCopyItems(items: AdminHomeTitleCopyItem[], fallback: AdminHomeTitleCopyItem[]) {
  return items.map((item, index) => ({
    id: cleanText(item.id, fallback[index]?.id ?? `card-${index + 1}`),
    title: cleanText(item.title, fallback[index]?.title ?? ""),
    copy: cleanText(item.copy, fallback[index]?.copy ?? ""),
  }));
}

function cleanProgramItems(items: AdminHomeProgramItem[], fallback: AdminHomeProgramItem[]) {
  return items.map((item, index) => ({
    id: cleanText(item.id, fallback[index]?.id ?? `program-${index + 1}`),
    title: cleanText(item.title, fallback[index]?.title ?? "Program"),
    copy: cleanText(item.copy, fallback[index]?.copy ?? ""),
    href: cleanText(item.href, fallback[index]?.href ?? "/programs"),
    duration: cleanText(item.duration, fallback[index]?.duration ?? ""),
    summary: cleanText(item.summary, fallback[index]?.summary ?? ""),
    outcome: cleanText(item.outcome, fallback[index]?.outcome ?? ""),
    label: item.label.trim(),
  }));
}

function cleanDifferentiationCards(
  items: AdminHomeDifferentiationCard[],
  fallback: AdminHomeDifferentiationCard[],
) {
  return items.map((item, index) => ({
    id: cleanText(item.id, fallback[index]?.id ?? `differentiation-${index + 1}`),
    title: cleanText(item.title, fallback[index]?.title ?? ""),
    copy: cleanText(item.copy, fallback[index]?.copy ?? ""),
    highlighted: item.highlighted,
  }));
}

function cleanTaggedCards(items: AdminHomeTaggedCard[], fallback: AdminHomeTaggedCard[]) {
  return items.map((item, index) => ({
    id: cleanText(item.id, fallback[index]?.id ?? `tagged-${index + 1}`),
    tag: cleanText(item.tag, fallback[index]?.tag ?? ""),
    title: cleanText(item.title, fallback[index]?.title ?? ""),
    copy: cleanText(item.copy, fallback[index]?.copy ?? ""),
  }));
}

function cleanTestimonials(items: AdminHomeTestimonial[], fallback: AdminHomeTestimonial[]) {
  return items.map((item, index) => ({
    id: cleanText(item.id, fallback[index]?.id ?? `testimonial-${index + 1}`),
    quote: cleanText(item.quote, fallback[index]?.quote ?? ""),
    attribution: cleanText(item.attribution, fallback[index]?.attribution ?? ""),
  }));
}

function toPublicHomeContent(store: AdminHomeContentStore, fallback: AdminHomeContentStore): PublicHomeContent {
  return {
    hero: {
      eyebrow: cleanText(store.hero.eyebrow, fallback.hero.eyebrow),
      title: cleanText(store.hero.title, fallback.hero.title),
      lede: cleanText(store.hero.lede, fallback.hero.lede),
      primaryCtaLabel: cleanText(store.hero.primaryCtaLabel, fallback.hero.primaryCtaLabel),
      primaryCtaHref: cleanText(store.hero.primaryCtaHref, fallback.hero.primaryCtaHref),
      secondaryCtaLabel: cleanText(store.hero.secondaryCtaLabel, fallback.hero.secondaryCtaLabel),
      secondaryCtaHref: cleanText(store.hero.secondaryCtaHref, fallback.hero.secondaryCtaHref),
      trustItems: cleanTextItems(store.hero.trustItems, fallback.hero.trustItems),
    },
    mediaBand: {
      media: cleanMedia(store.mediaBand.media, fallback.mediaBand.media),
    },
    proofStrip: {
      items: cleanTitleCopyItems(store.proofStrip.items, fallback.proofStrip.items),
    },
    intro: {
      sectionNumber: cleanText(store.intro.sectionNumber, fallback.intro.sectionNumber),
      heading: cleanText(store.intro.heading, fallback.intro.heading),
      paragraphs: cleanTextItems(store.intro.paragraphs, fallback.intro.paragraphs),
    },
    programPathways: {
      eyebrow: cleanText(store.programPathways.eyebrow, fallback.programPathways.eyebrow),
      heading: cleanText(store.programPathways.heading, fallback.programPathways.heading),
      copy: cleanText(store.programPathways.copy, fallback.programPathways.copy),
      items: cleanProgramItems(store.programPathways.items, fallback.programPathways.items),
    },
    differentiation: {
      eyebrow: cleanText(store.differentiation.eyebrow, fallback.differentiation.eyebrow),
      heading: cleanText(store.differentiation.heading, fallback.differentiation.heading),
      cards: cleanDifferentiationCards(store.differentiation.cards, fallback.differentiation.cards),
    },
    rhythm: {
      eyebrow: cleanText(store.rhythm.eyebrow, fallback.rhythm.eyebrow),
      heading: cleanText(store.rhythm.heading, fallback.rhythm.heading),
      body: cleanText(store.rhythm.body, fallback.rhythm.body),
      items: cleanTextItems(store.rhythm.items, fallback.rhythm.items),
    },
    team: {
      eyebrow: cleanText(store.team.eyebrow, fallback.team.eyebrow),
      heading: cleanText(store.team.heading, fallback.team.heading),
      body: cleanText(store.team.body, fallback.team.body),
      media: cleanMedia(store.team.media, fallback.team.media),
      bullets: cleanTextItems(store.team.bullets, fallback.team.bullets),
    },
    travel: {
      eyebrow: cleanText(store.travel.eyebrow, fallback.travel.eyebrow),
      heading: cleanText(store.travel.heading, fallback.travel.heading),
      body: cleanText(store.travel.body, fallback.travel.body),
      cards: cleanTaggedCards(store.travel.cards, fallback.travel.cards),
    },
    location: {
      eyebrow: cleanText(store.location.eyebrow, fallback.location.eyebrow),
      heading: cleanText(store.location.heading, fallback.location.heading),
      body: cleanText(store.location.body, fallback.location.body),
      media: cleanMedia(store.location.media, fallback.location.media),
      cards: cleanTitleCopyItems(store.location.cards, fallback.location.cards),
    },
    testimonials: {
      eyebrow: cleanText(store.testimonials.eyebrow, fallback.testimonials.eyebrow),
      heading: cleanText(store.testimonials.heading, fallback.testimonials.heading),
      items: cleanTestimonials(store.testimonials.items, fallback.testimonials.items),
    },
    consultation: {
      eyebrow: cleanText(store.consultation.eyebrow, fallback.consultation.eyebrow),
      heading: cleanText(store.consultation.heading, fallback.consultation.heading),
      body: cleanText(store.consultation.body, fallback.consultation.body),
      ctaLabel: cleanText(store.consultation.ctaLabel, fallback.consultation.ctaLabel),
      ctaHref: cleanText(store.consultation.ctaHref, fallback.consultation.ctaHref),
      steps: cleanTitleCopyItems(store.consultation.steps, fallback.consultation.steps),
    },
    leadForm: {
      eyebrow: cleanText(store.leadForm.eyebrow, fallback.leadForm.eyebrow),
      heading: cleanText(store.leadForm.heading, fallback.leadForm.heading),
      body: cleanText(store.leadForm.body, fallback.leadForm.body),
    },
  };
}

export const getPublicHomeContent = unstable_cache(
  async function getPublicHomeContent() {
    const store = await readAdminHomeContent();

    return toPublicHomeContent(store, defaultAdminHomeContent);
  },
  ["public-home-content"],
  { tags: [CACHE_TAGS.home] },
);
