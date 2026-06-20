"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

type Article = {
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

const categories = [
  "All",
  "Program Fit",
  "Burnout & Rhythm",
  "Meditation",
  "Sattvic Living",
  "Rishikesh Travel",
  "Detox",
  "Founder Notes",
];

const articles: Article[] = [
  {
    id: "choose-retreat-duration",
    category: "Program Fit",
    title: "How to choose between a 3, 7, 14, 28 or 60-day retreat",
    excerpt:
      "A clear decision guide for matching your current life season with the right level of reset, transformation or residency.",
    date: "June 20, 2026",
    readTime: "8 min read",
    audience: "Executives, founders and international guests comparing program depth.",
    tags: ["Program selection", "Retreat planning", "Duration"],
    keyPoints: [
      "Short resets work best when the goal is recovery, quiet and a clean re-entry into daily rhythm.",
      "Longer retreats are better when the guest needs practice consistency, deeper mentoring and structured integration.",
      "The right duration should be chosen after readiness, travel effort and emotional bandwidth are discussed.",
    ],
    relatedHref: "/programs/28-day-inner-awakening",
    relatedLabel: "Compare flagship program",
    contactLabel: "Ask which duration fits",
  },
  {
    id: "vacation-vs-retreat",
    category: "Burnout & Rhythm",
    title: "Why a retreat can reset rhythm in a way a vacation rarely can",
    excerpt:
      "A grounded look at why structure, practice, food, rest and environment matter when someone is truly depleted.",
    date: "June 18, 2026",
    readTime: "7 min read",
    audience: "Busy professionals who keep resting but do not feel restored.",
    tags: ["Burnout", "Daily rhythm", "Reset"],
    keyPoints: [
      "A vacation can give distance, but a retreat gives a repeatable rhythm.",
      "Daily practice reduces decision fatigue because the guest is held by a clear schedule.",
      "The strongest outcome is not escape. It is a steadier way to return.",
    ],
    relatedHref: "/programs/7-day-foundation",
    relatedLabel: "Explore 7-day foundation",
    contactLabel: "Discuss reset timing",
  },
  {
    id: "sattvic-living-guide",
    category: "Sattvic Living",
    title: "A beginner's guide to sattvic food, sleep and daily rhythm",
    excerpt:
      "What sattvic living means inside a retreat, and why food, rest and routine are part of the transformation process.",
    date: "June 15, 2026",
    readTime: "6 min read",
    audience: "Guests who want to understand stay, food and lifestyle before arrival.",
    tags: ["Food", "Lifestyle", "Sattvic"],
    keyPoints: [
      "Sattvic living is not only a diet. It is a calmer relationship with input, pace and daily choices.",
      "Simple meals, sleep rhythm and quiet mornings support the work done in practice sessions.",
      "Guests should understand food boundaries before booking, especially when travelling internationally.",
    ],
    relatedHref: "/accommodation-inclusions",
    relatedLabel: "See stay and food",
    contactLabel: "Ask about food comfort",
  },
  {
    id: "guided-meditation-first-time",
    category: "Meditation",
    title: "What guided meditation feels like for first-time seekers",
    excerpt:
      "A calm explanation of what to expect when meditation is new, uncomfortable or difficult to maintain alone.",
    date: "June 12, 2026",
    readTime: "5 min read",
    audience: "Beginners and thoughtful skeptics who want meditation without pressure.",
    tags: ["Meditation", "Mind mastery", "Beginners"],
    keyPoints: [
      "Guided meditation gives the mind a safe structure instead of demanding instant silence.",
      "Discomfort is not failure. It is often the first honest point of awareness.",
      "The aim is practice continuity, not a dramatic spiritual experience.",
    ],
    relatedHref: "/modalities/guided-meditation",
    relatedLabel: "Understand meditation",
    contactLabel: "Check practice readiness",
  },
  {
    id: "rishikesh-preparation",
    category: "Rishikesh Travel",
    title: "Preparing for a Ganga-side wellness stay in Rishikesh",
    excerpt:
      "What international visitors should know about arrival mindset, location questions, practical comfort and retreat boundaries.",
    date: "June 10, 2026",
    readTime: "9 min read",
    audience: "US, Canada and UK guests planning India travel for wellness.",
    tags: ["Rishikesh", "Travel", "Safety"],
    keyPoints: [
      "A premium retreat page should make the setting, food, communication and safety expectations easy to understand.",
      "Travel readiness matters because the transformation begins before the guest arrives.",
      "The right questions should be asked before payment, not after booking pressure.",
    ],
    relatedHref: "/contact",
    relatedLabel: "View contact and location",
    contactLabel: "Ask travel questions",
  },
  {
    id: "panchkarma-responsible-detox",
    category: "Detox",
    title: "The role of Panchkarma in a responsible detox retreat",
    excerpt:
      "How to speak about detox clearly, traditionally and responsibly without drifting into cure claims.",
    date: "June 08, 2026",
    readTime: "7 min read",
    audience: "Guests considering deeper cleansing or Ayurveda-supported programs.",
    tags: ["Panchkarma", "Detox", "Responsible wellness"],
    keyPoints: [
      "Detox language should be careful, specific and free from guaranteed medical promises.",
      "Panchkarma education needs clear suitability checks and boundaries.",
      "Guests should disclose relevant health context during consultation before deeper practices are recommended.",
    ],
    relatedHref: "/modalities/panchkarma-detox",
    relatedLabel: "Read Panchkarma modality",
    contactLabel: "Check detox suitability",
  },
  {
    id: "structure-not-pressure",
    category: "Founder Notes",
    title: "Why serious seekers need structure, not pressure",
    excerpt:
      "A founder-led reflection on why Shreevan Wellness prioritises rhythm, consent and discernment over intensity.",
    date: "June 05, 2026",
    readTime: "6 min read",
    audience: "Seekers who want depth without hype, urgency or spiritual performance.",
    tags: ["Founder", "Retreat ethics", "Trust"],
    keyPoints: [
      "Transformation is better supported by steady rhythm than emotional overwhelm.",
      "A good retreat should make people feel held, not pushed.",
      "Trust grows when boundaries, expectations and the guide's role are visible.",
    ],
    relatedHref: "/about-founder",
    relatedLabel: "Read our story",
    contactLabel: "Speak with the team",
  },
  {
    id: "long-residency-fit",
    category: "Program Fit",
    title: "When a longer residency makes more sense than a short reset",
    excerpt:
      "How to know when the 60-day path is appropriate for integration, identity work and a serious lifestyle redesign.",
    date: "June 02, 2026",
    readTime: "10 min read",
    audience: "High-commitment guests considering the deepest Shreevan pathway.",
    tags: ["60-day residency", "Lifestyle redesign", "Integration"],
    keyPoints: [
      "A long residency should be chosen for defined outputs, not simply because it sounds more powerful.",
      "The guest needs enough life space to practise, reflect and integrate without rushing.",
      "Completion should create a practical blueprint for the next 12 months.",
    ],
    relatedHref: "/programs/60-day-rishi-residency",
    relatedLabel: "Explore 60-day residency",
    contactLabel: "Discuss residency fit",
  },
  {
    id: "sound-healing-silence",
    category: "Meditation",
    title: "Sound healing, silence and nervous-system rest",
    excerpt:
      "A practical introduction to why sound, silence and stillness are used in retreat spaces for deep rest.",
    date: "May 29, 2026",
    readTime: "5 min read",
    audience: "Guests curious about gentle support practices beyond physical yoga.",
    tags: ["Sound healing", "Rest", "Stillness"],
    keyPoints: [
      "Sound work should be positioned as supportive wellness education, not a medical intervention.",
      "Silence gives the body and mind fewer demands to process.",
      "The value is often felt in the combination of environment, rhythm and guided rest.",
    ],
    relatedHref: "/modalities/sound-healing",
    relatedLabel: "Explore sound healing",
    contactLabel: "Ask about gentle practices",
  },
];

const editorPicks = ["choose-retreat-duration", "vacation-vs-retreat", "rishikesh-preparation"];

function formatArticleSearch(article: Article) {
  return [
    article.category,
    article.title,
    article.excerpt,
    article.audience,
    ...article.tags,
    ...article.keyPoints,
  ]
    .join(" ")
    .toLowerCase();
}

export function JournalPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [activeArticleId, setActiveArticleId] = useState(articles[0].id);

  const activeArticle = articles.find((article) => article.id === activeArticleId) ?? articles[0];

  const filteredArticles = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return articles.filter((article) => {
      const matchesCategory = activeCategory === "All" || article.category === activeCategory;
      const matchesQuery = !normalizedQuery || formatArticleSearch(article).includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  function openArticle(articleId: string) {
    setActiveArticleId(articleId);
    window.requestAnimationFrame(() => {
      document.getElementById("journal-reader")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function chooseCategory(category: string) {
    setActiveCategory(category);
    setQuery("");
  }

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />

      <main id="main">
        <section className="section journal-archive-hero" aria-labelledby="journal-title">
          <div className="container journal-archive-hero-grid">
            <div>
              <p className="eyebrow">Shreevan Journal</p>
              <h1 id="journal-title">Read deeper before you choose your retreat path</h1>
              <p className="hero-lede">
                Thoughtful articles on retreat selection, burnout rhythm, meditation, sattvic living and
                preparing for Rishikesh. Stay with the journal, then move only when a program or a
                conversation feels right.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#journal-feed">
                  Start reading
                </a>
                <Link className="button button-secondary" href="/programs/28-day-inner-awakening">
                  Explore programs
                </Link>
              </div>
            </div>

            <aside className="journal-hero-board" aria-label="Journal highlights">
              <span>Editor's path</span>
              {editorPicks.map((articleId, index) => {
                const article = articles.find((item) => item.id === articleId) ?? articles[index];
                return (
                  <button type="button" key={article.id} onClick={() => openArticle(article.id)}>
                    <strong>{String(index + 1).padStart(2, "0")}</strong>
                    <span>{article.title}</span>
                  </button>
                );
              })}
            </aside>
          </div>
        </section>

        <section className="journal-filter-band" aria-label="Journal filters">
          <div className="container journal-filter-shell">
            <div className="journal-category-row" role="tablist" aria-label="Browse by topic">
              {categories.map((category) => (
                <button
                  type="button"
                  key={category}
                  className={category === activeCategory ? "is-active" : ""}
                  onClick={() => chooseCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
            <input
              aria-label="Search journal articles"
              type="search"
              value={query}
              placeholder="Search burnout, meditation, Rishikesh..."
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
        </section>

        <section className="section journal-feed-section" id="journal-feed" aria-labelledby="journal-feed-title">
          <div className="container journal-layout">
            <div className="journal-main-column">
              <article className="journal-reader-panel" id="journal-reader" aria-labelledby="journal-reader-title">
                <div className="journal-reader-media" aria-hidden="true">
                  <span>{activeArticle.category}</span>
                </div>
                <div className="journal-reader-copy">
                  <div className="journal-card-topline">
                    <span>{activeArticle.category}</span>
                    <small>
                      {activeArticle.date} / {activeArticle.readTime}
                    </small>
                  </div>
                  <h2 id="journal-reader-title">{activeArticle.title}</h2>
                  <p>{activeArticle.excerpt}</p>
                  <div className="journal-audience">
                    <strong>Best for</strong>
                    <span>{activeArticle.audience}</span>
                  </div>
                  <ul className="journal-key-points">
                    {activeArticle.keyPoints.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                  <div className="journal-reader-actions">
                    <Link className="button button-primary" href={activeArticle.relatedHref}>
                      {activeArticle.relatedLabel}
                    </Link>
                    <Link className="button button-secondary" href="/contact">
                      {activeArticle.contactLabel}
                    </Link>
                  </div>
                </div>
              </article>

              <div className="section-heading split-heading journal-feed-heading">
                <div>
                  <p className="eyebrow">All articles</p>
                  <h2 id="journal-feed-title">Choose the next read</h2>
                </div>
                <p>
                  {filteredArticles.length} article{filteredArticles.length === 1 ? "" : "s"} shown.
                  Every card keeps the next step close: keep reading, compare a program or contact the team.
                </p>
              </div>

              <div className="journal-article-grid">
                {filteredArticles.map((article) => (
                  <article className="journal-article-card" key={article.id}>
                    <button
                      type="button"
                      className="journal-article-media"
                      onClick={() => openArticle(article.id)}
                      aria-label={`Read ${article.title}`}
                    >
                      <span>{article.category}</span>
                    </button>
                    <div className="journal-article-body">
                      <div className="journal-card-topline">
                        <span>{article.category}</span>
                        <small>{article.readTime}</small>
                      </div>
                      <h3>{article.title}</h3>
                      <p>{article.excerpt}</p>
                      <div className="journal-tag-row">
                        {article.tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                      <div className="journal-card-actions">
                        <button type="button" className="journal-read-button" onClick={() => openArticle(article.id)}>
                          Read article
                        </button>
                        <Link href={article.relatedHref}>{article.relatedLabel}</Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <aside className="journal-sidebar" aria-label="Journal conversion paths">
              <div className="journal-sidebar-card journal-program-card">
                <span>Find your path</span>
                <h2>Reading is useful. The right program makes it practical.</h2>
                <div className="journal-program-links">
                  <Link href="/programs/3-day-ganga-reset">Quick reset</Link>
                  <Link href="/programs/14-day-transformation">Deep transformation</Link>
                  <Link href="/programs/60-day-rishi-residency">Advanced residency</Link>
                </div>
              </div>

              <div className="journal-sidebar-card">
                <span>Most read</span>
                <div className="journal-most-read">
                  {editorPicks.map((articleId, index) => {
                    const article = articles.find((item) => item.id === articleId) ?? articles[index];
                    return (
                      <button type="button" key={article.id} onClick={() => openArticle(article.id)}>
                        <strong>{String(index + 1).padStart(2, "0")}</strong>
                        <span>{article.title}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="journal-sidebar-card">
                <span>Weekly wisdom</span>
                <h2>Get one calm note before the next program update.</h2>
                <form className="journal-subscribe-form">
                  <input aria-label="Email address" type="email" placeholder="Email address" />
                  <button type="submit">Subscribe</button>
                </form>
              </div>

              <div className="journal-sidebar-card journal-contact-card">
                <span>Still deciding?</span>
                <h2>Ask the team before you travel or pay.</h2>
                <Link className="button button-light" href="/contact">
                  Contact Shreevan
                </Link>
              </div>
            </aside>
          </div>
        </section>

        <section className="section journal-exit-section" aria-labelledby="journal-exit-title">
          <div className="container journal-exit-panel">
            <div>
              <p className="eyebrow">Next step</p>
              <h2 id="journal-exit-title">If an article speaks to your situation, move into the right path</h2>
            </div>
            <div className="journal-exit-actions">
              <Link className="button button-primary" href="/programs/28-day-inner-awakening">
                View flagship program
              </Link>
              <Link className="button button-secondary" href="/book-consultation">
                Book consultation
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
