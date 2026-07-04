import Link from "next/link";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import type { ModalitiesHubContent, ModalityContent, ModalityLink } from "@/lib/content/modalities";

function anchorId(prefix: string, title: string, index: number) {
  return `${prefix}-${index}-${title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")}`;
}

function LinkCards({ links, label }: Readonly<{ links: ModalityLink[]; label: string }>) {
  return (
    <div className="modality-link-list" aria-label={label}>
      {links.map((item) => (
        <Link className="modality-link-card" href={item.href} key={item.href}>
          <span>{item.note}</span>
          <strong>{item.name}</strong>
        </Link>
      ))}
    </div>
  );
}

function FaqList({ faqs }: Readonly<{ faqs: ModalityContent["faqs"] }>) {
  return (
    <div className="faq-question-list">
      {faqs.map((faq) => (
        <details className="faq-item" key={faq.question}>
          <summary>{faq.question}</summary>
          <div className="faq-answer">
            <p>{faq.answer}</p>
          </div>
        </details>
      ))}
    </div>
  );
}

export function ModalitiesHubPage({
  modalities,
  content,
}: Readonly<{ modalities: ModalityContent[]; content: ModalitiesHubContent }>) {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />

      <main id="main">
        <section className="section seo-hub-hero" aria-labelledby="modalities-title">
          <div className="container seo-hub-hero-grid">
            <div>
              <p className="eyebrow">{content.hero.eyebrow}</p>
              <h1 id="modalities-title">{content.hero.title}</h1>
              <p className="hero-lede">{content.hero.answer}</p>
              <div className="hero-actions">
                <Link className="button button-primary" href="/book-consultation">
                  Check suitability
                </Link>
                <Link className="button button-secondary" href="/programs">
                  Compare programs
                </Link>
              </div>
            </div>
            <aside className="seo-hub-note" aria-label="Responsible wellness boundary">
              <span>Responsible boundary</span>
              <p>{content.hero.boundaryNote}</p>
            </aside>
          </div>
        </section>

        <section className="section modality-quick-section" aria-labelledby="modalities-quick-title">
          <div className="container">
            <div className="section-heading split-heading">
              <div>
                <p className="eyebrow">Quick answer</p>
                <h2 id="modalities-quick-title">Modalities explain method. Programs explain the container.</h2>
              </div>
              <p>{content.quickAnswer.simpleTerms}</p>
            </div>

            <div className="modality-quick-grid">
              <article className="modality-quick-card">
                <span>Best for</span>
                <ul>
                  {content.quickAnswer.bestFor.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
              <article className="modality-quick-card">
                <span>What to expect</span>
                <ul>
                  {content.quickAnswer.whatToExpect.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
              <article className="modality-quick-card">
                <span>What it is not</span>
                <ul>
                  {content.quickAnswer.whatItIsNot.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
              <article className="modality-quick-card accent-card">
                <span>Next step</span>
                <p>
                  If you already know your current life context, use the consultation flow. If you need method
                  clarity first, read one of the practice pages below.
                </p>
                <Link className="text-link" href="/book-consultation">
                  Start suitability review
                </Link>
              </article>
            </div>
          </div>
        </section>

        <section className="section modality-article-section" aria-labelledby="modalities-article-title">
          <div className="container modality-article-grid">
            <aside className="modality-article-nav" aria-label="Modality hub article sections">
              <p className="eyebrow">Guide</p>
              <h2 id="modalities-article-title">How to read this practice library</h2>
              <nav>
                {content.articleSections.map((section, index) => (
                  <a href={`#${anchorId("hub", section.title, index)}`} key={section.title}>
                    {section.title}
                  </a>
                ))}
              </nav>
            </aside>
            <div className="modality-article-body">
              {content.articleSections.map((section, index) => (
                <article className="modality-article-block" id={anchorId("hub", section.title, index)} key={section.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{section.title}</h3>
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section seo-list-section" aria-labelledby="modalities-list-title">
          <div className="container">
            <div className="section-heading split-heading">
              <div>
                <p className="eyebrow">Practice library</p>
                <h2 id="modalities-list-title">Choose the practice question you need answered first</h2>
              </div>
              <p>
                Each modality page links back to the programs where that practice is applied. This keeps the
                site architecture clean while helping visitors move from education to action.
              </p>
            </div>

            <div className="seo-card-grid">
              {modalities.map((modality) => (
                <article className="seo-info-card" key={modality.slug}>
                  <span>{modality.category}</span>
                  <h3>{modality.title}</h3>
                  <p>{modality.description}</p>
                  <Link className="text-link" href={modality.path}>
                    Read modality
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section modality-decision-section" aria-labelledby="modalities-decision-title">
          <div className="container">
            <div className="section-heading centered">
              <p className="eyebrow">Decision support</p>
              <h2 id="modalities-decision-title">A simple map for first-time visitors</h2>
            </div>
            <div className="modality-decision-grid">
              {content.decisionCards.map((card) => (
                <Link className="modality-decision-card" href={card.href} key={card.href}>
                  <h3>{card.title}</h3>
                  <p>{card.copy}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section modality-standards-section" aria-labelledby="modalities-standards-title">
          <div className="container">
            <div className="section-heading split-heading">
              <div>
                <p className="eyebrow">Responsible wellness</p>
                <h2 id="modalities-standards-title">How Shreevan keeps education trustworthy</h2>
              </div>
              <p>
                Premium does not mean exaggerated. It means clear practice language, clear boundaries and a
                consultation path that respects the guest’s real context.
              </p>
            </div>
            <div className="modality-standards-grid">
              {content.responsibleStandards.map((standard, index) => (
                <article key={standard.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{standard.title}</h3>
                  <p>{standard.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section modality-faq-section" aria-labelledby="modalities-faq-title">
          <div className="container faq-layout">
            <aside className="faq-category-nav">
              <div>
                <p className="eyebrow">FAQs</p>
                <h2 id="modalities-faq-title">Questions before choosing a practice</h2>
                <p>
                  These answers are written for international visitors who need clear method, safety and program
                  context before booking a retreat in Rishikesh.
                </p>
              </div>
            </aside>
            <div className="faq-main-column">
              <FaqList faqs={content.faqs} />
            </div>
          </div>
        </section>

        <section className="section seo-final-cta" aria-labelledby="modalities-final-title">
          <div className="container seo-final-panel">
            <div>
              <p className="eyebrow">Next step</p>
              <h2 id="modalities-final-title">{content.finalCta.title}</h2>
              <p>{content.finalCta.copy}</p>
            </div>
            <div className="hero-actions">
              <Link className="button button-primary" href="/book-consultation">
                Check suitability
              </Link>
              <Link className="button button-secondary" href="/programs">
                Compare programs
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}

export function ModalityDetailPage({ modality }: Readonly<{ modality: ModalityContent }>) {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />

      <main id="main">
        <section className="section seo-hub-hero" aria-labelledby="modality-title">
          <div className="container seo-hub-hero-grid">
            <div>
              <p className="eyebrow">{modality.hero.eyebrow}</p>
              <h1 id="modality-title">{modality.title}</h1>
              <p className="hero-lede">{modality.hero.answer}</p>
              <div className="hero-actions">
                <Link className="button button-primary" href="/book-consultation">
                  Check suitability
                </Link>
                <Link className="button button-secondary" href="/programs">
                  Compare programs
                </Link>
              </div>
            </div>
            <aside className="seo-hub-note" aria-label="Responsible wellness boundary">
              <span>Responsible boundary</span>
              <p>{modality.hero.boundaryNote}</p>
            </aside>
          </div>
        </section>

        <section className="section modality-quick-section" aria-labelledby="modality-quick-title">
          <div className="container">
            <div className="section-heading split-heading">
              <div>
                <p className="eyebrow">Quick answer</p>
                <h2 id="modality-quick-title">In simple terms</h2>
              </div>
              <p>{modality.quickAnswer.simpleTerms}</p>
            </div>
            <div className="modality-quick-grid">
              <article className="modality-quick-card">
                <span>Best for</span>
                <ul>
                  {modality.quickAnswer.bestFor.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
              <article className="modality-quick-card">
                <span>What to expect</span>
                <ul>
                  {modality.quickAnswer.whatToExpect.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
              <article className="modality-quick-card">
                <span>What it is not</span>
                <ul>
                  {modality.quickAnswer.whatItIsNot.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
              <article className="modality-quick-card accent-card">
                <span>Program fit</span>
                <p>
                  The practice is applied differently by duration. Short programs use it gently; longer programs
                  allow more repetition and integration.
                </p>
                <Link className="text-link" href="/programs">
                  Compare programs
                </Link>
              </article>
            </div>
          </div>
        </section>

        <section className="section modality-article-section" aria-labelledby="modality-article-title">
          <div className="container modality-article-grid">
            <aside className="modality-article-nav" aria-label={`${modality.shortTitle} article sections`}>
              <p className="eyebrow">Educational guide</p>
              <h2 id="modality-article-title">What to understand before booking</h2>
              <nav>
                {modality.articleSections.map((section, index) => (
                  <a href={`#${anchorId(modality.slug, section.title, index)}`} key={section.title}>
                    {section.title}
                  </a>
                ))}
              </nav>
            </aside>
            <div className="modality-article-body">
              {modality.articleSections.map((section, index) => (
                <article
                  className="modality-article-block"
                  id={anchorId(modality.slug, section.title, index)}
                  key={section.title}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{section.title}</h3>
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section modality-retreat-section" aria-labelledby="retreat-experience-title">
          <div className="container">
            <div className="section-heading split-heading">
              <div>
                <p className="eyebrow">Retreat experience</p>
                <h2 id="retreat-experience-title">How this practice is held in the daily rhythm</h2>
              </div>
              <p>
                A modality is not only a session. It has a before, during and after. The integration determines
                whether the practice becomes useful beyond the retreat.
              </p>
            </div>
            <div className="modality-retreat-grid">
              {modality.retreatExperience.map((step, index) => (
                <article className="modality-retreat-card" key={step.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{step.stage}</p>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section modality-suitability-section" aria-labelledby="suitability-title">
          <div className="container">
            <div className="section-heading centered">
              <p className="eyebrow">Suitability</p>
              <h2 id="suitability-title">Who this may suit, and when to slow down</h2>
            </div>
            <div className="modality-suitability-grid">
              <article>
                <h3>May suit you if</h3>
                <ul className="seo-check-list">
                  {modality.suitability.maySuitYouIf.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
              <article>
                <h3>Be careful if</h3>
                <ul className="seo-check-list boundary-list">
                  {modality.suitability.beCarefulIf.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
              <article>
                <h3>Consult a professional if</h3>
                <ul className="seo-check-list boundary-list">
                  {modality.suitability.consultProfessionalIf.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section className="section modality-connection-section" aria-labelledby="connection-map-title">
          <div className="container">
            <div className="section-heading split-heading">
              <div>
                <p className="eyebrow">Connection map</p>
                <h2 id="connection-map-title">Where to go next</h2>
              </div>
              <p>
                Related pages keep the learning path clear: modality pages explain method, and program pages
                explain the duration-based retreat container.
              </p>
            </div>
            <div className="modality-connection-grid">
              <article>
                <span>Related modalities</span>
                <h3>Build context around the practice</h3>
                <LinkCards links={modality.relatedModalities} label="Related modality pages" />
              </article>
              <article>
                <span>Related programs</span>
                <h3>See where this is applied</h3>
                <LinkCards links={modality.relatedPrograms} label="Related program pages" />
              </article>
              <article>
                <span>Future journal topics</span>
                <h3>Questions this page can expand into</h3>
                <ul className="modality-blog-topics">
                  {modality.futureBlogTopics.map((topic) => (
                    <li key={topic}>{topic}</li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section className="section modality-faq-section" aria-labelledby="modality-faq-title">
          <div className="container faq-layout">
            <aside className="faq-category-nav">
              <div>
                <p className="eyebrow">FAQs</p>
                <h2 id="modality-faq-title">Search questions answered clearly</h2>
                <p>
                  These answers are intentionally direct. They help guests understand the practice, the limits and
                  the right next step before choosing a retreat.
                </p>
              </div>
            </aside>
            <div className="faq-main-column">
              <FaqList faqs={modality.faqs} />
            </div>
          </div>
        </section>

        <section className="section seo-final-cta" aria-labelledby="modality-final-title">
          <div className="container seo-final-panel">
            <div>
              <p className="eyebrow">Calm next step</p>
              <h2 id="modality-final-title">{modality.finalCta.title}</h2>
              <p>{modality.finalCta.copy}</p>
            </div>
            <div className="hero-actions">
              <Link className="button button-primary" href="/book-consultation">
                Check suitability
              </Link>
              <Link className="button button-secondary" href="/programs">
                Compare programs
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
