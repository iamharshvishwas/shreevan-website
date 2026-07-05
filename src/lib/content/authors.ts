// Author profiles for E-E-A-T signals (byline box + Person schema).
// Keep bios factual and responsible-wellness compliant: no invented
// credentials, no cure claims. Update bios/sameAs as real profiles go live.

export type ArticleAuthor = {
  id: string;
  name: string;
  role: string;
  bio: string;
  sameAs: string[];
};

export const articleAuthors: ArticleAuthor[] = [
  {
    id: "admin",
    name: "Shreevan Wellness",
    role: "Editorial",
    bio: "Retreat guidance and wellness education from the Shreevan Wellness team in Rishikesh, written to help guests choose responsibly before they book.",
    sameAs: [],
  },
  {
    id: "isha-dutta",
    name: "Isha Dutta",
    role: "Founder, Shreevan Wellness",
    bio: "Isha Dutta is the founder of Shreevan Wellness and shapes its retreat programs, guest-care standards and responsible wellness boundaries.",
    sameAs: [],
  },
  {
    id: "editorial-team",
    name: "Editorial Team",
    role: "Shreevan Journal",
    bio: "The Shreevan Journal editorial team writes practical, suitability-led articles on retreat preparation, daily rhythm and sattvic living.",
    sameAs: [],
  },
];

export function findArticleAuthor(authorId: string, fallbackName: string): ArticleAuthor {
  return (
    articleAuthors.find((author) => author.id === authorId) ?? {
      id: authorId || "admin",
      name: fallbackName || "Shreevan Wellness",
      role: "Shreevan Journal",
      bio: "",
      sameAs: [],
    }
  );
}
