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
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  audience: string;
  tags: string[];
  keyPoints: string[];
  relatedHref: string;
  relatedLabel: string;
  contactLabel: string;
};

export type PublicJournalContent = {
  categories: string[];
  articles: PublicJournalArticle[];
  editorPicks: string[];
};
