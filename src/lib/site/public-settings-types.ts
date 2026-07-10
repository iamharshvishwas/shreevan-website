export type PublicNavLink = {
  id: string;
  label: string;
  href: string;
  children?: PublicNavLink[];
};

export type PublicFooterColumn = {
  id: string;
  title: string;
  links: PublicNavLink[];
};

export type PublicSiteSettings = {
  brand: {
    name: string;
    tagline: string;
    founder: string;
    location: string;
    primaryDomain: string;
    adminDomain: string;
    description: string;
  };
  contact: {
    email: string;
    phone: string;
    whatsapp: string;
    address: string;
    responseTime: string;
  };
  social: {
    instagram: string;
    youtube: string;
    linkedin: string;
    facebook: string;
    x: string;
    trustpilot: string;
    tripadvisor: string;
  };
  crm: {
    enabled: boolean;
    scriptUrl: string;
    apiUrl: string;
  };
  launch: {
    indexingMode: "noindex" | "indexable";
    robotsPolicy: "blocked" | "public";
    sitemapEnabled: boolean;
  };
  navigation: {
    headerCta: PublicNavLink | null;
    headerItems: PublicNavLink[];
    footerColumns: PublicFooterColumn[];
  };
};
