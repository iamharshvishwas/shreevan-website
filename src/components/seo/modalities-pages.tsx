import Link from "next/link";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import type { ModalityContent } from "@/lib/content/modalities";

export function ModalitiesHubPage({ modalities }: Readonly<{ modalities: ModalityContent[] }>) {
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
              <p className="eyebrow">Core Modalities</p>
              <h1 id="modalities-title">Understand the practices before choosing a program</h1>
              <p className="hero-lede">
                These pages explain the educational and traditional practice layers used inside Shreevan
                Wellness programs. They are intentionally separate from duration-based commercial program pages.
              </p>
              <div className="hero-actions">
                <Link className="button button-primary" href="/programs">
                  Compare programs
                </Link>
                <Link className="button button-secondary" href="/wellness-disclaimer">
                  Wellness boundaries
                </Link>
              </div>
            </div>
            <aside className="seo-hub-note" aria-label="Modality search intent note">
              <span>Educational intent</span>
              <p>
                Modality pages explain method, fit and boundaries. Program pages explain duration, inclusion,
                investment context and booking flow.
              </p>
            </aside>
          </div>
        </section>

        <section className="section seo-list-section" aria-labelledby="modalities-list-title">
          <div className="container">
            <div className="section-heading split-heading">
              <div>
                <p className="eyebrow">Practice library</p>
                <h2 id="modalities-list-title">Educational spokes for the retreat system</h2>
              </div>
              <p>
                Each practice page links back to the programs where that modality is used, which keeps the
                SEO silo clear and helps visitors move from learning to booking safely.
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
              <p className="eyebrow">{modality.category}</p>
              <h1 id="modality-title">{modality.title}</h1>
              <p className="hero-lede">{modality.summary}</p>
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
              <p>
                This modality is presented as wellness education and guided practice, not diagnosis,
                treatment, cure, therapy or emergency support.
              </p>
            </aside>
          </div>
        </section>

        <section className="section seo-list-section" aria-labelledby="modality-supports-title">
          <div className="container seo-two-column">
            <div>
              <p className="eyebrow">What it supports</p>
              <h2 id="modality-supports-title">Practical reasons this practice appears in retreat rhythm</h2>
              <ul className="seo-check-list">
                {modality.whatItSupports.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow">Boundaries</p>
              <h2>What the agent and website must not overclaim</h2>
              <ul className="seo-check-list boundary-list">
                {modality.boundaries.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="section seo-related-section" aria-labelledby="related-programs-title">
          <div className="container">
            <div className="section-heading split-heading">
              <div>
                <p className="eyebrow">Applied in programs</p>
                <h2 id="related-programs-title">Where this modality appears in the retreat ladder</h2>
              </div>
              <p>
                The program pages explain duration, inclusions and conversion flow. This page explains the
                practice logic.
              </p>
            </div>
            <div className="seo-card-grid">
              {modality.relatedPrograms.map((program) => (
                <article className="seo-info-card" key={program.href}>
                  <span>{program.note}</span>
                  <h3>{program.name}</h3>
                  <Link className="text-link" href={program.href}>
                    View program
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
