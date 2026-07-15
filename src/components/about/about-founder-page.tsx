import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { siteConfig } from "@/config/site";
import type { AdminAboutStoryContent } from "@/lib/admin/about-story-content";

export function AboutFounderPage({ content }: Readonly<{ content: AdminAboutStoryContent }>) {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />

      <main id="main">
        <section className="section story-hero" aria-labelledby="story-hero-title">
          <div className="container story-hero-grid">
            <div className="story-hero-copy">
              <p className="eyebrow">{content.hero.eyebrow}</p>
              <h1 id="story-hero-title">{content.hero.title}</h1>
              <p className="hero-lede">{content.hero.lede}</p>
              <div className="hero-actions">
                <Link className="button button-primary" href={content.hero.primaryCtaHref}>
                  {content.hero.primaryCtaLabel}
                </Link>
                <Link className="button button-secondary" href={content.hero.secondaryCtaHref}>
                  {content.hero.secondaryCtaLabel}
                </Link>
              </div>
            </div>

            <div className="story-hero-media">
              {content.hero.media.src ? (
                <img src={content.hero.media.src} alt={content.hero.media.alt} className="story-portrait-image" />
              ) : (
                <div className="image-slot story-portrait-slot">
                  <span>Image slot</span>
                  <p>{content.hero.media.caption}</p>
                </div>
              )}
              <div className="story-founder-card">
                <Image src={siteConfig.logos.symbol} alt="" width={74} height={74} />
                <div>
                  <span>Founder</span>
                  <strong>{siteConfig.founder}</strong>
                  <p>Guiding Shreevan Wellness as a responsible retreat experience for international guests.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="story-proof-strip" aria-label="Story trust markers">
          <div className="container story-marker-grid">
            {content.pillars.map((item) => (
              <article key={item.id}>
                <h2>{item.title}</h2>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section identity-section" aria-labelledby="identity-title">
          <div className="container identity-grid">
            <div>
              <p className="eyebrow">{content.positioning.eyebrow}</p>
              <h2 id="identity-title">{content.positioning.heading}</h2>
            </div>
            <div className="identity-list">
              {content.positioning.rows.map((item) => (
                <article key={item.id}>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section founder-section" aria-labelledby="founder-title">
          <div className="container editorial-grid intent-grid">
            <p className="section-number">{content.founder.sectionNumber}</p>
            <div className="reading-column">
              <h2 id="founder-title">{content.founder.heading}</h2>
              {content.founder.paragraphs.map((paragraph) => <p key={paragraph.id}>{paragraph.text}</p>)}
            </div>
            <figure className="intent-image">
              <img
                src={content.founder.media.src || "/images/about/founder-intention-journal.jpeg"}
                alt={content.founder.media.alt || "Founder intention notes and retreat planning materials on a wooden table"}
                width="1195"
                height="1600"
                loading="lazy"
                decoding="async"
              />
            </figure>
          </div>
        </section>

        <section className="section founder-principles-section" aria-labelledby="principles-title">
          <div className="container">
            <div className="section-heading split-heading">
              <div>
                <p className="eyebrow">{content.principles.eyebrow}</p>
                <h2 id="principles-title">{content.principles.heading}</h2>
              </div>
              <p>
                {content.principles.body}
              </p>
            </div>

            <figure className="program-pathways-image">
              <img
                src={content.principles.media.src || "/images/about/founder-principles-practice-cues.jpeg"}
                alt={content.principles.media.alt || "Practice cues for awareness, breath, stillness and integration displayed in a retreat practice space"}
                width="2200"
                height="1643"
                loading="lazy"
                decoding="async"
              />
            </figure>
            <div className="principle-grid">
              {content.principles.items.map((item, index) => (
                <article key={item.id}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section origin-section" aria-labelledby="origin-title">
          <div className="container origin-grid">
            <figure className="intent-image origin-image">
              <img
                src={content.roots.media.src || "/images/about/rishikesh-roots-origin.jpeg"}
                alt={content.roots.media.alt || "Open retreat practice corridor in Rishikesh with mats facing the mountain and river landscape"}
                width="1195"
                height="1600"
                loading="lazy"
                decoding="async"
              />
            </figure>
            <div>
              <p className="eyebrow">{content.roots.eyebrow}</p>
              <h2 id="origin-title">{content.roots.heading}</h2>
              {content.roots.paragraphs.map((paragraph) => <p key={paragraph.id}>{paragraph.text}</p>)}
            </div>
          </div>
        </section>

        <section className="section care-section" aria-labelledby="care-title">
          <div className="container">
            <div className="section-heading centered">
              <p className="eyebrow">{content.guestCare.eyebrow}</p>
              <h2 id="care-title">{content.guestCare.heading}</h2>
            </div>
            <figure className="program-pathways-image">
              <img
                src={content.guestCare.media.src || "/images/about/guest-care-pathway.jpeg"}
                alt={content.guestCare.media.alt || "International retreat guests in a calm guest-care conversation with a Shreevan facilitator"}
                width="2200"
                height="1228"
                loading="lazy"
                decoding="async"
              />
            </figure>
            <div className="care-path">
              {content.guestCare.steps.map((step, index) => (
                <article key={step.id}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section standards-section" aria-labelledby="standards-title">
          <div className="container standards-grid">
            <div>
              <p className="eyebrow light">{content.standards.eyebrow}</p>
              <h2 id="standards-title">{content.standards.heading}</h2>
              <p>{content.standards.body}</p>
              <figure className="international-image">
                <img
                  src={content.standards.media.src || "/images/about/responsible-wellness-standards.jpeg"}
                  alt={content.standards.media.alt || "Responsible wellness documents and guest-care materials arranged on a wooden retreat table"}
                  width="1600"
                  height="1195"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            </div>
            <ul className="standards-list">
              {content.standards.items.map((standard) => (
                <li key={standard.id}>{standard.text}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section story-cta-section" aria-labelledby="story-cta-title">
          <div className="container story-cta">
            <p className="eyebrow">{content.closingCta.eyebrow}</p>
            <h2 id="story-cta-title">{content.closingCta.heading}</h2>
            <p>{content.closingCta.body}</p>
            <Link className="button button-primary" href={content.closingCta.href}>
              {content.closingCta.label}
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
