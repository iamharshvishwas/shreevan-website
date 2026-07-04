export type PublicFaqLink = {
  href: string;
  label: string;
  external?: boolean;
};

export type PublicFaqItem = {
  question: string;
  answer: string[];
  links?: PublicFaqLink[];
};

export type PublicFaqCategory = {
  id: string;
  label: string;
  intent: string;
  faqs: PublicFaqItem[];
};

export type PublicTrustStandard = {
  id: string;
  title: string;
  copy: string;
};

export type PublicFaqContent = {
  categories: PublicFaqCategory[];
  researchSignals: string[];
  responsibleStandards: PublicTrustStandard[];
};

export type PublicStorySlot = {
  id: string;
  label: string;
  title: string;
  context: string;
  proof: string;
};

export type PublicVideoSlot = {
  id: string;
  title: string;
  copy: string;
};

export type PublicStoryContent = {
  trustMarkers: PublicTrustStandard[];
  storySlots: PublicStorySlot[];
  videoSlots: PublicVideoSlot[];
  outcomeRows: PublicTrustStandard[];
  consentStandards: string[];
};

export type PublicJournalArticle = {
  id: string;
  slug: string;
  category: string;
  categoryId: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  audience: string;
  tags: string[];
  keyPoints: string[];
  content: string;
  contentHtml: string;
  body: string[];
  blocks: Array<{
    id: string;
    type: "paragraph" | "heading" | "image" | "quote" | "button" | "divider" | "embed";
    content: string;
    level?: 2 | 3;
    url?: string;
    alt?: string;
    caption?: string;
    label?: string;
    href?: string;
  }>;
  coverMedia: {
    kind: "" | "image";
    src: string;
    alt: string;
    caption: string;
    description: string;
  };
  seoTitle: string;
  seoDescription: string;
  canonicalPath: string;
  canonicalUrl: string;
  publishedAt: string;
  scheduledAt: string;
  updatedAt: string;
  indexStatus: "index" | "noindex";
  authorId: string;
  author: string;
  redirectEnabled: boolean;
  redirectUrl: string;
  redirectStatusCode: 301 | 302;
  schemaJson: string;
  relatedHref: string;
  relatedLabel: string;
  contactLabel: string;
};

export type PublicJournalContent = {
  categories: string[];
  articles: PublicJournalArticle[];
  editorPicks: string[];
};
