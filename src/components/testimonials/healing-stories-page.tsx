import Link from "next/link";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import type { PublicStoryContent } from "@/lib/site/public-content-trust-types";

function stageLabel(id: string) {
  return id.slice(0, 1).toUpperCase() + id.slice(1);
}

export function HealingStoriesPage({ content }: Readonly<{ content: PublicStoryContent }>) {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />

      <main id="main">
        <section className="section stories-hero" aria-labelledby="stories-title">
          <div className="container stories-hero-grid">
            <div>
              <p className="eyebrow">Healing stories</p>
              <h1 id="stories-title">Real guest reflections, held with honesty and care</h1>
              <p className="hero-lede">
                This page should become the trust library for Shreevan Wellness: consent-approved
                reflections from guests who came for structure, stillness, practice and reconnection.
              </p>
              <div className="hero-actions">
                <Link className="button button-primary" href="/book-consultation">
                  Book consultation
                </Link>
                <Link className="button button-secondary" href="/wellness-disclaimer">
                  Read wellness disclaimer
                </Link>
              </div>
            </div>

            <div className="image-slot stories-hero-media">
              <span>Image or video slot</span>
              <p>Hero guest reflection, retreat atmosphere, Maa Ganga setting or quiet practice moment</p>
            </div>
          </div>
        </section>

        <section className="story-proof-strip" aria-label="Healing story standards">
          <div className="container story-marker-grid">
            {content.trustMarkers.map((marker) => (
              <article key={marker.id}>
                <h2>{marker.title}</h2>
                <p>{marker.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section featured-story-section" aria-labelledby="featured-story-title">
          <div className="container featured-story-panel">
            <div className="image-slot featured-story-media">
              <span>Image or video slot</span>
              <p>Primary guest story portrait, calm interview still or retreat setting</p>
            </div>
            <div>
              <p className="eyebrow">Featured reflection</p>
              <h2 id="featured-story-title">Lead with one deep, specific story before showing many</h2>
              <p>
                Use this block for the strongest consent-approved story. It should explain what the
                guest was seeking, what supported them during the retreat and what they carried home.
              </p>
              <dl className="story-meta-list">
                <div>
                  <dt>Program</dt>
                  <dd>7, 14, 28 or 60-day pathway</dd>
                </div>
                <div>
                  <dt>Guest context</dt>
                  <dd>Country, profession or life stage if consented</dd>
                </div>
                <div>
                  <dt>Proof focus</dt>
                  <dd>Rhythm, clarity, rest, practice, travel confidence</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        <section className="section story-library-section" aria-labelledby="story-library-title">
          <div className="container">
            <div className="section-heading split-heading">
              <div>
                <p className="eyebrow">Guest story library</p>
                <h2 id="story-library-title">Show different guest journeys without making promises</h2>
              </div>
              <p>
                Each story should feel specific enough to be believable and careful enough to stay within
                responsible wellness boundaries.
              </p>
            </div>

            <div className="story-card-grid">
              {content.storySlots.map((story) => (
                <article className="story-card" key={story.id}>
                  <div className="image-slot story-card-media">
                    <span>Image slot</span>
                    <p>Guest portrait, practice detail or retreat environment</p>
                  </div>
                  <div>
                    <span>{story.label}</span>
                    <h3>{story.title}</h3>
                    <p>{story.context}</p>
                    <strong>{story.proof}</strong>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section video-stories-section" aria-labelledby="video-stories-title">
          <div className="container">
            <div className="section-heading centered">
              <p className="eyebrow light">Video proof</p>
              <h2 id="video-stories-title">Let future guests see the environment, not just read about it</h2>
            </div>
            <div className="video-story-grid">
              {content.videoSlots.map((video) => (
                <article key={video.id}>
                  <div className="image-slot video-slot">
                    <span>Video slot</span>
                    <p>{video.title}</p>
                  </div>
                  <h3>{video.title}</h3>
                  <p>{video.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section outcome-story-section" aria-labelledby="outcome-story-title">
          <div className="container outcome-story-grid">
            <div>
              <p className="eyebrow">Expected outcomes, responsibly framed</p>
              <h2 id="outcome-story-title">The strongest stories show a journey, not a miracle</h2>
              <p>
                This structure helps the page convert without drifting into unsupported claims. It gives
                prospects a clear way to imagine the experience and decide if the retreat is right for
                them.
              </p>
            </div>
            <div className="outcome-map">
              {content.outcomeRows.map((row) => (
                <article key={row.id}>
                  <span>{stageLabel(row.id)}</span>
                  <h3>{row.title}</h3>
                  <p>{row.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section consent-section" aria-labelledby="consent-title">
          <div className="container consent-grid">
            <div>
              <p className="eyebrow light">Responsible publishing</p>
              <h2 id="consent-title">A trustworthy story page needs a clear consent standard</h2>
              <p>
                Before launch, replace every placeholder with real media, real words and documented
                permission. This keeps the page premium and protects guest privacy.
              </p>
            </div>
            <ul className="standards-list">
              {content.consentStandards.map((standard) => (
                <li key={standard}>{standard}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section story-cta-section" aria-labelledby="healing-cta-title">
          <div className="container story-cta">
            <p className="eyebrow">Start with fit</p>
            <h2 id="healing-cta-title">Your story should begin with a careful conversation</h2>
            <p>
              A suitability call helps clarify whether the program depth, daily rhythm and guest-care
              boundaries are right for you before travel or payment.
            </p>
            <Link className="button button-primary" href="/book-consultation">
              Book a consultation
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
