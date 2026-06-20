import Link from "next/link";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { siteConfig } from "@/config/site";

export type LegalSection = {
  title: string;
  copy?: string[];
  bullets?: string[];
  items?: Array<{
    title: string;
    copy: string;
  }>;
};

type LegalPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  lastUpdated: string;
  summary: Array<{
    label: string;
    value: string;
  }>;
  sections: LegalSection[];
};

export function LegalPage({ eyebrow, title, intro, lastUpdated, summary, sections }: LegalPageProps) {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />

      <main id="main">
        <section className="section legal-hero" aria-labelledby="legal-title">
          <div className="container legal-hero-inner">
            <p className="eyebrow">{eyebrow}</p>
            <h1 id="legal-title">{title}</h1>
            <p className="hero-lede">{intro}</p>
            <div className="legal-meta" aria-label="Policy metadata">
              <span>Last updated: {lastUpdated}</span>
              <span>Legal review required before launch</span>
            </div>
          </div>
        </section>

        <section className="section legal-body-section">
          <div className="container legal-grid">
            <aside className="legal-aside" aria-label="Policy summary">
              <h2>At a glance</h2>
              <dl>
                {summary.map((item) => (
                  <div key={item.label}>
                    <dt>{item.label}</dt>
                    <dd>{item.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="legal-note">
                <h3>Important</h3>
                <p>
                  These pages are launch-ready drafts based on the business roadmap. Ask a qualified
                  legal/compliance professional to review the final version before accepting bookings.
                </p>
              </div>
            </aside>

            <div className="legal-content">
              {sections.map((section) => (
                <section className="legal-section" key={section.title} aria-labelledby={slugify(section.title)}>
                  <h2 id={slugify(section.title)}>{section.title}</h2>
                  {section.copy?.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.bullets ? (
                    <ul>
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  ) : null}
                  {section.items ? (
                    <div className="legal-card-list">
                      {section.items.map((item) => (
                        <article key={item.title}>
                          <h3>{item.title}</h3>
                          <p>{item.copy}</p>
                        </article>
                      ))}
                    </div>
                  ) : null}
                </section>
              ))}

              <section className="legal-section legal-contact-block" aria-labelledby="legal-contact">
                <h2 id="legal-contact">Contact</h2>
                <p>
                  For questions about this page, contact{" "}
                  <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>. For program suitability,
                  start with the{" "}
                  <Link href="/book-consultation">consultation request</Link>.
                </p>
              </section>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
