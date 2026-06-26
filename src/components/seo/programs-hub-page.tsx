import Link from "next/link";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import type { PublicProgramSummary } from "@/lib/site/public-programs-types";

export function ProgramsHubPage({ programs }: Readonly<{ programs: PublicProgramSummary[] }>) {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />

      <main id="main">
        <section className="section seo-hub-hero" aria-labelledby="programs-title">
          <div className="container seo-hub-hero-grid">
            <div>
              <p className="eyebrow">Immersive Programs</p>
              <h1 id="programs-title">Choose the depth of your Shreevan Wellness retreat</h1>
              <p className="hero-lede">
                A clear comparison path for guests deciding between a short reset, a structured foundation,
                a deeper transformation, the flagship 28-day immersion or the advanced 60-day residency.
              </p>
              <div className="hero-actions">
                <Link className="button button-primary" href="/book-consultation">
                  Book a suitability call
                </Link>
                <Link className="button button-secondary" href="/faqs">
                  Read FAQs
                </Link>
              </div>
            </div>
            <aside className="seo-hub-note" aria-label="Program selection guidance">
              <span>Fit first</span>
              <p>
                Do not choose only by duration. The team should understand your travel window, current life
                context, wellness boundaries, food comfort and readiness before recommending a program.
              </p>
            </aside>
          </div>
        </section>

        <section className="section seo-list-section" aria-labelledby="program-list-title">
          <div className="container">
            <div className="section-heading split-heading">
              <div>
                <p className="eyebrow">Program ladder</p>
                <h2 id="program-list-title">Each duration has a distinct job</h2>
              </div>
              <p>
                This page protects search intent by comparing program depth without replacing each dedicated
                commercial program page.
              </p>
            </div>

            <div className="program-index">
              {programs.map((program) => (
                <article className="program-row" key={program.id}>
                  <span className="program-no">{program.no}</span>
                  <div>
                    <p className="program-label">{program.label || program.duration}</p>
                    <h3>{program.title}</h3>
                    <p>{program.summary}</p>
                  </div>
                  <dl>
                    <div>
                      <dt>Duration</dt>
                      <dd>{program.duration}</dd>
                    </div>
                    <div>
                      <dt>Outcome</dt>
                      <dd>{program.outcome}</dd>
                    </div>
                  </dl>
                  <Link className="text-link" href={program.href}>
                    View program
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section seo-final-cta" aria-labelledby="programs-cta-title">
          <div className="container seo-final-panel">
            <div>
              <p className="eyebrow light">Consultation first</p>
              <h2 id="programs-cta-title">If you are unsure, do not force the decision on the page</h2>
              <p>
                The safest next step is a fit conversation before travel planning, payment or final duration
                selection.
              </p>
            </div>
            <Link className="button button-light" href="/book-consultation">
              Book consultation
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
