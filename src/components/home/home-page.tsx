import Image from "next/image";
import { SuitabilityForm } from "@/components/forms/suitability-form";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { homeAnswerSummary, homeFaqs, homeReferenceLinks } from "@/lib/content/home-aeo";
import type { PublicHomeMedia, PublicHomeContent } from "@/lib/site/public-home-types";

const includedMedia = [
  {
    src: "/images/home/included-guided-practice.webp",
    alt: "Small retreat group seated for guided meditation practice in a calm hall",
    caption: "Guided practice",
  },
  {
    src: "/images/home/included-sattvic-meals.webp",
    alt: "Simple sattvic vegetarian meal served at a wooden retreat table",
    caption: "Sattvic meals",
  },
  {
    src: "/images/home/included-accommodation.webp",
    alt: "Calm retreat bedroom with natural light and greenery outside",
    caption: "Stay clarity",
  },
];

export function HomePage({
  content,
}: Readonly<{ content: PublicHomeContent }>) {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />

      <main id="main">
        <section className="hero" id="home" aria-labelledby="hero-title">
          <div className="container hero-inner">
            <p className="eyebrow">{content.hero.eyebrow}</p>
            <h1 id="hero-title">{content.hero.title}</h1>
            <p className="hero-lede">{content.hero.lede}</p>
            <div className="hero-actions">
              <a className="button button-primary" href={content.hero.primaryCtaHref}>
                {content.hero.primaryCtaLabel}
              </a>
              <a className="button button-secondary" href={content.hero.secondaryCtaHref}>
                {content.hero.secondaryCtaLabel}
              </a>
            </div>
            <ul className="hero-trust" aria-label="Key trust points">
              {content.hero.trustItems.map((item) => (
                <li key={item.id}>{item.text}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="photo-band" aria-label="Photography placeholder">
          <HomeMediaSlot
            className="image-slot-wide"
            media={content.mediaBand.media}
            priority
            sizes="100vw"
            width={1920}
            height={1072}
          />
        </section>

        <section className="proof-strip" aria-label="Business trust signals">
          <div className="container proof-grid">
            {content.proofStrip.items.map((item) => (
              <div key={item.id}>
                <strong>{item.title}</strong>
                <span>{item.copy}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="section home-answer-section" aria-labelledby="home-answer-title">
          <div className="container home-answer-panel">
            <div className="home-answer-copy">
              <p className="eyebrow">{homeAnswerSummary.eyebrow}</p>
              <h2 id="home-answer-title">{homeAnswerSummary.heading}</h2>
              <p>{homeAnswerSummary.answer}</p>
            </div>
            <div className="home-answer-cards" aria-label="Quick answer summary">
              {homeAnswerSummary.cards.map((card) => (
                <article key={card.id}>
                  <span>{card.label}</span>
                  <p>{card.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section intent-section" aria-labelledby="intent-title">
          <div className="container editorial-grid intent-grid">
            <p className="section-number">{content.intro.sectionNumber}</p>
            <div className="reading-column">
              <h2 id="intent-title">{content.intro.heading}</h2>
              {content.intro.paragraphs.map((paragraph) => (
                <p key={paragraph.id}>{paragraph.text}</p>
              ))}
            </div>
            <figure className="intent-image">
              <Image
                src="/images/home/woman-journaling-at-retreat-window.jpeg"
                alt="Guest journaling beside a retreat window with the Ganga landscape outside"
                width={896}
                height={1152}
                loading="lazy"
                sizes="(max-width: 720px) 100vw, 30vw"
              />
            </figure>
          </div>
        </section>

        <section className="section programs-section" id="programs" aria-labelledby="programs-title">
          <div className="container">
            <div className="section-heading split-heading">
              <div>
                <p className="eyebrow">{content.programPathways.eyebrow}</p>
                <h2 id="programs-title">{content.programPathways.heading}</h2>
              </div>
              <p>{content.programPathways.copy}</p>
            </div>

            <div className="program-card-grid">
              <div className="program-card-row">
                {content.programPathways.items.slice(0, 3).map((program) => (
                  <article className="program-card" key={program.id}>
                    <ProgramDuration duration={program.duration} />
                    <h3>{program.title}</h3>
                    <p>{program.summary}</p>
                    <a className="program-card-link" href={program.href}>
                      View program <span aria-hidden="true">→</span>
                    </a>
                  </article>
                ))}
              </div>

              <div className="program-card-feature-row">
                {content.programPathways.items[3] ? (
                  <article className="program-featured-card">
                    <p className="program-featured-label">{content.programPathways.items[3].label || "Flagship program"}</p>
                    <div className="program-featured-body">
                      <ProgramDuration duration={content.programPathways.items[3].duration} compact />
                      <h3>{content.programPathways.items[3].title}</h3>
                      <p>{content.programPathways.items[3].outcome}</p>
                      <p className="program-featured-for">
                        <strong>For:</strong> {withoutBestForPrefix(content.programPathways.items[3].summary)}
                      </p>
                      <a className="button button-primary program-featured-cta" href={content.programPathways.items[3].href}>
                        View the {content.programPathways.items[3].duration} program
                      </a>
                    </div>
                  </article>
                ) : null}

                {content.programPathways.items[4] ? (
                  <article className="program-card program-residency-card">
                    <ProgramDuration duration={content.programPathways.items[4].duration} />
                    <h3>{content.programPathways.items[4].title}</h3>
                    <p>{content.programPathways.items[4].summary}</p>
                    <a className="program-card-link" href={content.programPathways.items[4].href}>
                      View program <span aria-hidden="true">→</span>
                    </a>
                  </article>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        <section className="section fit-section" id="fit" aria-labelledby="fit-title">
          <div className="container">
            <div className="section-heading centered">
              <p className="eyebrow">03 — FIT</p>
              <h2 id="fit-title">Who this is for — and who it isn&apos;t</h2>
            </div>
            <div className="fit-grid">
              <article className="fit-card fit-card-for">
                <h3>Shreevan is for you if</h3>
                <ul className="fit-list">
                  <li>
                    <svg className="fit-icon fit-icon-check" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M6 10l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>You&apos;re a professional, founder or leader who needs to properly step away</span>
                  </li>
                  <li>
                    <svg className="fit-icon fit-icon-check" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M6 10l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>You&apos;re moving through a real transition — burnout, loss, a breakup, a milestone</span>
                  </li>
                  <li>
                    <svg className="fit-icon fit-icon-check" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M6 10l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>You want structure and guidance, not a loose, figure-it-out-yourself holiday</span>
                  </li>
                  <li>
                    <svg className="fit-icon fit-icon-check" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M6 10l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>You care about routines you can actually keep once you&apos;re home</span>
                  </li>
                </ul>
              </article>
              <article className="fit-card fit-card-not">
                <h3>It&apos;s probably not, if</h3>
                <ul className="fit-list">
                  <li>
                    <svg className="fit-icon fit-icon-cross" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M7 7l6 6M13 7l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    <span>You need medical diagnosis or treatment — we&apos;re not a clinical facility</span>
                  </li>
                  <li>
                    <svg className="fit-icon fit-icon-cross" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M7 7l6 6M13 7l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    <span>You want a luxury spa week with no structure or practice</span>
                  </li>
                  <li>
                    <svg className="fit-icon fit-icon-cross" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M7 7l6 6M13 7l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    <span>You&apos;re looking for a party trip or purely social travel</span>
                  </li>
                  <li>
                    <svg className="fit-icon fit-icon-cross" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M7 7l6 6M13 7l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    <span>You want a guaranteed outcome or an overnight fix</span>
                  </li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section className="section included-section" id="included" aria-labelledby="included-title">
          <div className="container">
            <div className="section-heading centered">
              <p className="eyebrow">{content.differentiation.eyebrow}</p>
              <h2 id="included-title">{content.differentiation.heading}</h2>
            </div>
            <div className="included-media-grid" aria-label="Included retreat experience images">
              {includedMedia.map((item) => (
                <figure key={item.src}>
                  <Image src={item.src} alt={item.alt} width={900} height={1205} sizes="(max-width: 720px) 100vw, 33vw" />
                  <figcaption>{item.caption}</figcaption>
                </figure>
              ))}
            </div>
            <div className="included-grid">
              {content.differentiation.cards.map((card) => (
                <article className={card.highlighted ? "boundary" : undefined} key={card.id}>
                  <h3>{card.title}</h3>
                  <p>{card.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section rhythm-section" aria-labelledby="rhythm-title">
          <div className="container">
            <div className="rhythm-top-header">
              <span className="eyebrow light">{content.rhythm.eyebrow}</span>
              <div className="rhythm-top-line" aria-hidden="true" />
            </div>
            <div className="rhythm-header-content">
              <h2 id="rhythm-title">{content.rhythm.heading}</h2>
              <p>{content.rhythm.body}</p>
            </div>
            <div className="rhythm-horizontal-grid">
              {content.rhythm.items.map((item) => (
                <article key={item.id} className="rhythm-horizontal-card">
                  <div className="rhythm-card-time">{item.time || item.text}</div>
                  <h3 className="rhythm-card-title">{item.title || item.text}</h3>
                  {item.copy && <p className="rhythm-card-copy">{item.copy}</p>}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section credibility-section" id="credibility" aria-labelledby="credibility-title">
          <div className="container credibility-grid">
            <div>
              <p className="eyebrow">{content.team.eyebrow}</p>
              <h2 id="credibility-title">{content.team.heading}</h2>
              <p>{content.team.body}</p>
            </div>
            <div className="team-panel">
              <HomeMediaSlot className="portrait-slot" media={content.team.media} />
              <ul>
                {content.team.bullets.map((item) => (
                  <li key={item.id}>{item.text}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="section international-section" id="international" aria-labelledby="international-title">
          <div className="container">
            <div className="section-heading centered">
              <p className="eyebrow">{content.travel.eyebrow}</p>
              <h2 id="international-title">{content.travel.heading}</h2>
              <p>{content.travel.body}</p>
            </div>

            <div className="travel-reassurance-wrapper">
              <div className="reassurance-list">
                {content.travel.cards.map((card, index) => (
                  <article key={card.id}>
                    {index === 0 && (
                      <svg className="travel-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                    {index === 1 && (
                      <svg className="travel-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" strokeLinecap="round" strokeLinejoin="round" />
                        <polyline points="9 22 9 12 15 12 15 22" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                    {index === 2 && (
                      <svg className="travel-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M18 8a6 6 0 0 1-6 6 6 6 0 0 1-6-6M12 2v12M12 22v-4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                    {index === 3 && (
                      <svg className="travel-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="6" y="8" width="12" height="12" rx="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M9 8V6a3 3 0 016 0v2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                    <h3>{card.title}</h3>
                    <p>{card.copy}</p>
                  </article>
                ))}
              </div>

              <div className="travel-advisories-bar" aria-label="Official travel advisories">
                <span className="advisories-label">OFFICIAL TRAVEL ADVISORIES</span>
                <div className="advisories-links">
                  <a href="https://travel.state.gov" target="_blank" rel="noopener noreferrer">US State Dept ↗</a>
                  <a href="https://www.gov.uk/foreign-travel-advice/india" target="_blank" rel="noopener noreferrer">UK FCDO ↗</a>
                  <a href="https://travel.gc.ca/destinations/india" target="_blank" rel="noopener noreferrer">Canada travel ↗</a>
                  <a href="https://indianvisaonline.gov.in/evisa/" target="_blank" rel="noopener noreferrer">India e-Visa ↗</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section safety-section" aria-labelledby="safety-title">
          <div className="container safety-grid">
            <HomeMediaSlot className="safety-image" media={content.location.media} />
            <div>
              <p className="eyebrow">{content.location.eyebrow}</p>
              <h2 id="safety-title">{content.location.heading}</h2>
              <p>{content.location.body}</p>
              <div className="safety-list">
                {content.location.cards.map((card) => (
                  <article key={card.id}>
                    <h3>{card.title}</h3>
                    <p>{card.copy}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section testimonials-section" aria-labelledby="testimonials-title">
          <div className="container">
            <div className="section-heading centered">
              <p className="eyebrow">{content.testimonials.eyebrow}</p>
              <h2 id="testimonials-title">{content.testimonials.heading}</h2>
            </div>
            <figure className="testimonial-image">
              <Image
                src="/images/home/testimonials-healing-story-reflection.webp"
                alt="Retreat guest journaling quietly beside a window after guided reflection"
                width={1500}
                height={1120}
                sizes="(max-width: 720px) 100vw, 1180px"
              />
              <figcaption>Healing stories begin with lived reflection</figcaption>
            </figure>
            <div className="testimonial-grid">
              {content.testimonials.items.map((testimonial) => (
                <article key={testimonial.id}>
                  <p>“{testimonial.quote}”</p>
                  <span>{testimonial.attribution}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section home-faq-section" aria-labelledby="home-faq-title">
          <div className="container home-faq-grid">
            <div className="home-faq-intro">
              <p className="eyebrow">Common questions</p>
              <h2 id="home-faq-title">Quick answers before you enquire</h2>
              <p>
                These answers are intentionally direct so guests can understand fit, boundaries and next steps before
                starting a suitability call.
              </p>
              <a className="button button-secondary" href="/faqs">
                View all FAQs
              </a>
            </div>
            <div className="faq-question-list">
              {homeFaqs.map((faq, index) => (
                <details className="faq-item" key={faq.question} open={index === 0}>
                  <summary>{faq.question}</summary>
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="section consultation-section" id="consultation" aria-labelledby="consultation-title">
          <div className="container consultation-grid">
            <div>
              <p className="eyebrow light">{content.consultation.eyebrow}</p>
              <h2 id="consultation-title">{content.consultation.heading}</h2>
              <p>{content.consultation.body}</p>
              <a className="button button-light" href={content.consultation.ctaHref}>
                {content.consultation.ctaLabel}
              </a>
            </div>
            <ol className="consultation-steps">
              {content.consultation.steps.map((step, index) => (
                <li key={step.id}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section form-section" id="suitability-form" aria-labelledby="form-title">
          <div className="container form-shell">
            <div className="form-intro">
              <p className="eyebrow">{content.leadForm.eyebrow}</p>
              <h2 id="form-title">{content.leadForm.heading}</h2>
              <p>{content.leadForm.body}</p>
            </div>
            <SuitabilityForm />
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}

function ProgramDuration({ duration, compact = false }: Readonly<{ duration: string; compact?: boolean }>) {
  const [value, ...unit] = duration.trim().split(/\s+/);

  return (
    <p className={`program-card-duration${compact ? " compact" : ""}`}>
      <strong>{value}</strong>
      <span>{unit.join(" ") || "days"}</span>
    </p>
  );
}

function withoutBestForPrefix(value: string) {
  return value.replace(/^best for\s*/i, "");
}

function HomeMediaSlot({
  className,
  media,
  priority = false,
  sizes = "(max-width: 720px) 100vw, 50vw",
  width,
  height,
}: Readonly<{
  className: string;
  media: PublicHomeMedia;
  priority?: boolean;
  sizes?: string;
  width?: number;
  height?: number;
}>) {
  const classes = `image-slot home-media-slot ${className}${media.src ? " has-media" : ""}`;

  if (!media.src) {
    return (
      <div className={classes}>
        <span>{media.placeholder}</span>
        <p>{media.caption}</p>
      </div>
    );
  }

  return (
    <div className={classes}>
      {media.kind === "video" ? (
        <video aria-label={media.alt || media.caption} controls muted playsInline preload="metadata" src={media.src} />
      ) : width && height ? (
        <Image src={media.src} alt={media.alt} width={width} height={height} priority={priority} sizes={sizes} />
      ) : (
        <img src={media.src} alt={media.alt} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} />
      )}
      {media.caption ? (
        <div className="home-media-caption">
          <span>{media.caption}</span>
        </div>
      ) : null}
    </div>
  );
}
