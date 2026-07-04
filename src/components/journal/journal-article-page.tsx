import Link from "next/link";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import type { PublicJournalArticle } from "@/lib/site/public-content-trust-types";

function JournalBlock({ block }: Readonly<{ block: PublicJournalArticle["blocks"][number] }>) {
  if (block.type === "heading") {
    return block.level === 3 ? <h3>{block.content}</h3> : <h2>{block.content}</h2>;
  }

  if (block.type === "image") {
    return block.url ? (
      <figure className="journal-richtext-image">
        <img src={block.url} alt={block.alt || block.caption || ""} />
        {block.caption ? <figcaption>{block.caption}</figcaption> : null}
      </figure>
    ) : null;
  }

  if (block.type === "quote") {
    return <blockquote>{block.content}</blockquote>;
  }

  if (block.type === "button") {
    return block.href ? (
      <p>
        <Link className="button button-primary" href={block.href}>
          {block.label || block.content || "Read more"}
        </Link>
      </p>
    ) : null;
  }

  if (block.type === "divider") {
    return <hr />;
  }

  if (block.type === "embed") {
    return block.content ? <pre className="journal-richtext-embed">{block.content}</pre> : null;
  }

  return <p>{block.content}</p>;
}

export function JournalArticlePage({
  article,
  relatedArticles,
}: Readonly<{
  article: PublicJournalArticle;
  relatedArticles: Array<Pick<PublicJournalArticle, "id" | "title">>;
}>) {
  const hasBuilderBlocks = article.blocks.length > 0;
  const hasArticleBody = article.body.length > 0;

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />

      <main id="main">
        <article className="section journal-detail-hero" aria-labelledby="journal-article-title">
          <div className="container journal-detail-hero-grid">
            <div>
              <Link className="text-link" href="/journal">
                Journal
              </Link>
              <p className="eyebrow">{article.category}</p>
              <h1 id="journal-article-title">{article.title}</h1>
              <p className="hero-lede">{article.excerpt}</p>
              <div className="journal-detail-meta" aria-label="Article details">
                <span>{article.date}</span>
                <span>{article.readTime}</span>
                <span>{article.audience}</span>
              </div>
            </div>

            <aside className="journal-detail-aside" aria-label="Recommended next step">
              <span>Next step</span>
              <h2>Use this article to choose with clarity, not urgency.</h2>
              <p>
                If the topic matches your current situation, compare the connected program or speak with
                the team before making a travel decision.
              </p>
              <Link className="button button-primary" href={article.relatedHref}>
                {article.relatedLabel}
              </Link>
            </aside>
          </div>
        </article>

        <section className="section journal-detail-section" aria-labelledby="article-body-title">
          <div className="container journal-detail-layout">
            <div className="journal-detail-body">
              <h2 id="article-body-title">What this article helps you evaluate</h2>
              {article.coverMedia.src ? (
                <figure className="journal-detail-cover">
                  <img src={article.coverMedia.src} alt={article.coverMedia.alt || article.title} />
                  {article.coverMedia.caption ? <figcaption>{article.coverMedia.caption}</figcaption> : null}
                </figure>
              ) : null}

              {hasBuilderBlocks ? (
                <div className="journal-detail-richtext">
                  {article.blocks.map((block) => (
                    <JournalBlock block={block} key={block.id} />
                  ))}
                </div>
              ) : hasArticleBody ? (
                <div className="journal-detail-richtext">
                  {article.body.map((block, index) =>
                    block.startsWith("## ") ? (
                      <h2 key={`${block}-${index}`}>{block.replace(/^##\s+/, "")}</h2>
                    ) : (
                      <p key={`${block}-${index}`}>{block}</p>
                    ),
                  )}
                </div>
              ) : (
                <>
                  <p>
                    Shreevan Wellness articles are written to help serious international visitors understand
                    retreat fit, practice expectations, stay comfort and responsible wellness boundaries before
                    they book a consultation or commit to a program.
                  </p>

                  <div className="journal-detail-points">
                    {article.keyPoints.map((point, index) => (
                      <section key={point} aria-labelledby={`point-${index + 1}`}>
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <h3 id={`point-${index + 1}`}>{point}</h3>
                        <p>
                          Treat this as a practical decision filter. Notice whether the point applies to your
                          current rhythm, travel effort, support needs and readiness for a structured retreat
                          environment.
                        </p>
                      </section>
                    ))}
                  </div>
                </>
              )}

              <div className="journal-detail-tags" aria-label="Article topics">
                {article.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>

            <aside className="journal-detail-sidebar" aria-label="Related journal paths">
              <div className="journal-sidebar-card journal-contact-card">
                <span>Decision support</span>
                <h2>Still comparing options?</h2>
                <p>
                  A suitability call can confirm whether a short reset, deeper transformation program or
                  advanced residency is the right level of commitment.
                </p>
                <Link className="button button-primary" href="/book-consultation">
                  Book consultation
                </Link>
              </div>

              <div className="journal-sidebar-card">
                <span>Keep reading</span>
                <div className="journal-most-read">
                  {relatedArticles.map((relatedArticle, index) => (
                    <Link key={relatedArticle.id} href={`/journal/${relatedArticle.id}`}>
                      <strong>{String(index + 1).padStart(2, "0")}</strong>
                      <span>{relatedArticle.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="section journal-exit-section" aria-labelledby="journal-article-exit-title">
          <div className="container journal-exit-panel">
            <div>
              <p className="eyebrow">Continue with structure</p>
              <h2 id="journal-article-exit-title">Move from reading to the right next step.</h2>
              <p>
                Review program depth, ask logistics questions or request a fit check before you plan travel
                or payment.
              </p>
            </div>
            <div className="journal-exit-actions">
              <Link className="button button-primary" href="/programs">
                Explore programs
              </Link>
              <Link className="button button-secondary" href="/contact">
                Contact the team
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
