"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { WhatsAppPhoneFields } from "@/components/forms/whatsapp-phone-fields";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import type { PublicJournalArticle, PublicJournalContent } from "@/lib/site/public-content-trust-types";

function formatArticleSearch(article: PublicJournalArticle) {
  return [
    article.category,
    article.title,
    article.excerpt,
    article.audience,
    article.content,
    ...article.tags,
    ...article.keyPoints,
    ...article.blocks.map((block) => [block.content, block.label, block.caption, block.alt].filter(Boolean).join(" ")),
  ]
    .join(" ")
    .toLowerCase();
}

function articleHref(article: PublicJournalArticle) {
  return `/journal/${article.slug || article.id}`;
}

export function JournalPage({ content }: Readonly<{ content: PublicJournalContent }>) {
  const categories = content.categories;
  const articles = content.articles;
  const editorPicks = content.editorPicks.length ? content.editorPicks : articles.slice(0, 3).map((article) => article.id);
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
              <span>Editor’s path</span>
              {editorPicks.map((articleId, index) => {
                const article = articles.find((item) => item.id === articleId) ?? articles[index] ?? articles[0];
                return (
                  <Link key={article.id} href={articleHref(article)}>
                    <strong>{String(index + 1).padStart(2, "0")}</strong>
                    <span>{article.title}</span>
                  </Link>
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
                  {activeArticle.coverMedia.src ? (
                    <img
                      src={activeArticle.coverMedia.src}
                      alt=""
                    />
                  ) : null}
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
                  <article className="journal-article-card" id={`article-${article.id}`} key={article.id}>
                    <button
                      type="button"
                      className="journal-article-media"
                      onClick={() => openArticle(article.id)}
                      aria-label={`Read ${article.title}`}
                    >
                      {article.coverMedia.src ? (
                        <img
                          src={article.coverMedia.src}
                          alt=""
                        />
                      ) : null}
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
                        <Link className="journal-read-button" href={articleHref(article)}>
                          Read article
                        </Link>
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
                    const article = articles.find((item) => item.id === articleId) ?? articles[index] ?? articles[0];
                    return (
                      <Link key={article.id} href={articleHref(article)}>
                        <strong>{String(index + 1).padStart(2, "0")}</strong>
                        <span>{article.title}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="journal-sidebar-card">
                <span>Weekly wisdom</span>
                <h2>Get one calm note before the next program update.</h2>
                <form className="journal-subscribe-form" data-veda-form="Journal subscription">
                  <input aria-label="Email address" name="email" type="email" placeholder="Email address" />
                  <WhatsAppPhoneFields idPrefix="journal" />
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
