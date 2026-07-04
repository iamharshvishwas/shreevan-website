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
          <HomeMediaSlot className="image-slot-wide" media={content.mediaBand.media} />
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
              <img
                src="/images/home/woman-journaling-at-retreat-window.jpeg"
                alt="Guest journaling beside a retreat window with the Ganga landscape outside"
                width="896"
                height="1152"
                loading="lazy"
                decoding="async"
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

            <figure className="program-pathways-image">
              <img
                src="/images/home/program-pathways-retreat-corridor.webp"
                alt="Retreat guests walking through a calm wellness corridor in Rishikesh"
                width="1600"
                height="1195"
                loading="lazy"
                decoding="async"
              />
            </figure>

            <div className="program-index">
              {content.programPathways.items.map((program, index) => (
                <article className={`program-row${program.label ? " signature" : ""}`} key={program.id}>
                  <span className="program-no">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    {program.label ? <p className="program-label">{program.label}</p> : null}
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
                  <a className="text-link" href={program.href}>
                    View program
                  </a>
                </article>
              ))}
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
                  <img src={item.src} alt={item.alt} width="900" height="1205" loading="lazy" decoding="async" />
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
          <div className="container rhythm-grid">
            <div>
              <p className="eyebrow light">{content.rhythm.eyebrow}</p>
              <h2 id="rhythm-title">{content.rhythm.heading}</h2>
              <p>{content.rhythm.body}</p>
            </div>
            <ol className="rhythm-list">
              {content.rhythm.items.map((item) => (
                <li key={item.id}>{item.text}</li>
              ))}
            </ol>
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
          <div className="container international-grid">
            <div>
              <p className="eyebrow">{content.travel.eyebrow}</p>
              <h2 id="international-title">{content.travel.heading}</h2>
              <p>{content.travel.body}</p>
            </div>
            <div className="international-panel">
              <figure className="international-image">
                <img
                  src="/images/home/international-visitor-reassurance.webp"
                  alt="Retreat host explaining arrival and stay details to international guests"
                  width="1500"
                  height="1120"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
              <div className="reassurance-list">
                {content.travel.cards.map((card) => (
                  <article key={card.id}>
                    <span>{card.tag}</span>
                    <h3>{card.title}</h3>
                    <p>{card.copy}</p>
                  </article>
                ))}
              </div>
              <div className="source-link-panel" aria-label="Official travel references">
                <p>Official travel references for international visitors</p>
                <div>
                  {homeReferenceLinks.map((link) => (
                    <a key={link.id} href={link.href} target="_blank" rel="noopener noreferrer">
                      {link.label}
                    </a>
                  ))}
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
              <img
                src="/images/home/testimonials-healing-story-reflection.webp"
                alt="Retreat guest journaling quietly beside a window after guided reflection"
                width="1500"
                height="1120"
                loading="lazy"
                decoding="async"
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

function HomeMediaSlot({ className, media }: Readonly<{ className: string; media: PublicHomeMedia }>) {
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
      ) : (
        <img src={media.src} alt={media.alt} />
      )}
      {media.caption ? (
        <div className="home-media-caption">
          <span>{media.caption}</span>
        </div>
      ) : null}
    </div>
  );
}
