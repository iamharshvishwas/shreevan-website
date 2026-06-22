import Link from "next/link";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import type { PublicFaqContent, PublicFaqLink } from "@/lib/site/public-content-trust-types";

const decisionCards = [
  {
    label: "01",
    title: "Choose the right depth",
    copy: "Compare retreat duration without pushing every visitor toward the longest program.",
    href: "#program-fit",
  },
  {
    label: "02",
    title: "Protect health boundaries",
    copy: "Understand what Shreevan can support, and what must stay with qualified clinicians.",
    href: "#health-boundaries",
  },
  {
    label: "03",
    title: "Plan international travel",
    copy: "Know what to ask before flights, visas, arrival windows and payment decisions.",
    href: "#travel-arrival",
  },
];

const responsibleStandards = [
  {
    title: "No cure claims",
    copy: "The retreat can support lifestyle rhythm, awareness and guided practice, but it is not framed as a medical cure.",
  },
  {
    title: "No payment before clarity",
    copy: "Serious guests should understand program fit, stay, food, terms and travel practicalities before checkout.",
  },
  {
    title: "No hidden travel advice",
    copy: "Visa, immigration and changing travel rules should be checked through official government sources.",
  },
];

function FaqLinkList({ links }: { links?: PublicFaqLink[] }) {
  if (!links?.length) {
    return null;
  }

  return (
    <div className="faq-link-row" aria-label="Related links">
      {links.map((link) =>
        link.external ? (
          <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
            {link.label}
          </a>
        ) : (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ),
      )}
    </div>
  );
}

export function FaqsPage({ content }: Readonly<{ content: PublicFaqContent }>) {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />

      <main id="main">
        <section className="section faq-hero" aria-labelledby="faq-title">
          <div className="container faq-hero-grid">
            <div>
              <p className="eyebrow">Frequently asked questions</p>
              <h1 id="faq-title">Answers that help you decide with clarity</h1>
              <p className="hero-lede">
                For international guests considering a premium wellness retreat in Rishikesh,
                these answers cover program fit, payment readiness, stay, food, travel and
                responsible wellness boundaries before you book.
              </p>
              <div className="hero-actions">
                <Link className="button button-primary" href="/book-consultation">
                  Book consultation
                </Link>
                <Link className="button button-secondary" href="/contact">
                  Ask a question
                </Link>
              </div>
            </div>

            <aside className="faq-hero-card" aria-label="Visitor decision signals">
              <span>What visitors search before trust</span>
              <h2>Most doubts are not objections. They are risk checks.</h2>
              <ul>
                {content.researchSignals.map((signal) => (
                  <li key={signal}>{signal}</li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        <section className="faq-decision-strip" aria-labelledby="decision-title">
          <div className="container faq-decision-grid">
            {decisionCards.map((card) => (
              <a key={card.label} href={card.href}>
                <span>{card.label}</span>
                <h2 id={card.label === "01" ? "decision-title" : undefined}>{card.title}</h2>
                <p>{card.copy}</p>
              </a>
            ))}
          </div>
        </section>

        <section className="section faq-library-section" aria-labelledby="faq-library-title">
          <div className="container faq-layout">
            <aside className="faq-category-nav" aria-label="FAQ categories">
              <p className="eyebrow">Find answers by concern</p>
              <nav>
                {content.categories.map((category) => (
                  <a key={category.id} href={`#${category.id}`}>
                    {category.label}
                  </a>
                ))}
              </nav>
              <div>
                <h2>Still unsure?</h2>
                <p>
                  Share your situation first. The consultation is the safest place to choose
                  the right program depth.
                </p>
                <Link className="button button-primary" href="/book-consultation">
                  Start with fit check
                </Link>
              </div>
            </aside>

            <div className="faq-main-column">
              <div className="section-heading">
                <p className="eyebrow">Clear answers</p>
                <h2 id="faq-library-title">The questions serious guests ask before they commit</h2>
              </div>

              {content.categories.map((category) => (
                <section className="faq-topic-block" id={category.id} key={category.id}>
                  <div className="faq-topic-heading">
                    <span>{category.label}</span>
                    <p>{category.intent}</p>
                  </div>

                  <div className="faq-question-list">
                    {category.faqs.map((faq, index) => (
                      <details key={faq.question} className="faq-item" open={index === 0}>
                        <summary>
                          <span>{faq.question}</span>
                        </summary>
                        <div className="faq-answer">
                          {faq.answer.map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                          ))}
                          <FaqLinkList links={faq.links} />
                        </div>
                      </details>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </section>

        <section className="section faq-responsible-section" aria-labelledby="responsible-title">
          <div className="container faq-responsible-grid">
            <div>
              <p className="eyebrow light">Responsible wellness</p>
              <h2 id="responsible-title">Trust grows when the page says what it will not fake</h2>
              <p>
                A premium retreat should feel calm, precise and honest. These standards keep
                Shreevan Wellness away from exaggerated health claims, pressured checkouts and
                unclear international travel promises.
              </p>
            </div>
            <div className="faq-standard-grid">
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

        <section className="section faq-final-section" aria-labelledby="faq-final-title">
          <div className="container faq-final-panel">
            <div>
              <p className="eyebrow">Next step</p>
              <h2 id="faq-final-title">If your question affects fit, do not guess</h2>
              <p>
                Program duration, health boundaries, food needs and travel timing should be
                clarified before payment. A short suitability call is the cleanest way to decide.
              </p>
            </div>
            <div className="faq-final-actions">
              <Link className="button button-primary" href="/book-consultation">
                Book consultation
              </Link>
              <Link className="button button-secondary" href="/wellness-disclaimer">
                Read disclaimer
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
