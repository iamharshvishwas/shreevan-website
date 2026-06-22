export type PublicPageHero = {
  eyebrow: string;
  title: string;
  lede: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
};

export type PublicManagedPageContent = {
  id: string;
  path: string;
  status: "draft" | "published" | "archived";
  seo: {
    title: string;
    description: string;
    canonicalPath: string;
    noindex: boolean;
  };
  hero: PublicPageHero;
};
