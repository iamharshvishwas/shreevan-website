import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { siteConfig } from "@/config/site";

const storyPillars = [
  ["Rooted in Rishikesh", "The retreat experience is shaped by the sacred rhythm of Maa Ganga, yogic practice and quiet daily structure."],
  ["Built for serious seekers", "Shreevan is for guests who want meaningful lifestyle recalibration, not a rushed wellness holiday."],
  ["Held responsibly", "The brand keeps wellness education separate from medical advice, cure claims or pressure-based selling."],
];

const identityRows = [
  {
    label: "What Shreevan Wellness is",
    copy:
      "A professionally managed, premium Indian wellness-retreat brand for professionals, founders, serious practitioners and life-transition seekers who want structure, practice and space to return with greater clarity.",
  },
  {
    label: "What Shreevan Wellness is not",
    copy:
      "It is not a medical centre, religious ashram, luxury spa vacation, budget yoga holiday or a brand built on fear, shame, fake urgency or guaranteed-healing claims.",
  },
];

const founderPrinciples = [
  ["Structure over intensity", "Depth is created through rhythm, consistency and guided reflection, not by overwhelming the guest."],
  ["Human fit before payment", "Every serious enquiry should move through a suitability conversation before travel or commitment."],
  ["Traditional practice, modern care", "Yoga, meditation, sattvic living and reflection are supported by clear communication and guest-care standards."],
  ["International clarity", "US, Canada and UK guests should understand stay, food, travel, boundaries and support before arriving."],
];

const guestCareSteps = [
  {
    title: "Before arrival",
    copy: "The team clarifies goals, travel plans, dietary comfort, room expectations, program suitability and practical questions.",
  },
  {
    title: "During the retreat",
    copy: "Guests follow a paced daily rhythm with practice, meals, rest, reflection and facilitator-led check-ins where appropriate.",
  },
  {
    title: "After completion",
    copy: "The intention is not dependency. Guests leave with routines and reflections they can carry back into everyday life.",
  },
];

const trustStandards = [
  "Founder and facilitator credentials should be shown clearly before launch.",
  "Program recommendations are based on readiness, not only duration or price.",
  "Health boundaries, disclaimers and emergency processes are communicated plainly.",
  "Real accommodation, food and location photography should support every claim.",
];

export function AboutFounderPage() {
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
              <p className="eyebrow">Our story</p>
              <h1 id="story-hero-title">A retreat brand built around trust, rhythm and inner return</h1>
              <p className="hero-lede">
                Shreevan Wellness was created by {siteConfig.founder} for people who need more than a
                beautiful escape. It is a structured space for reconnection on the sacred banks of Maa
                Ganga in Rishikesh, India.
              </p>
              <div className="hero-actions">
                <Link className="button button-primary" href="/book-consultation">
                  Book consultation
                </Link>
                <Link className="button button-secondary" href="/programs/28-day-inner-awakening">
                  Explore programs
                </Link>
              </div>
            </div>

            <div className="story-hero-media">
              <div className="image-slot story-portrait-slot">
                <span>Image slot</span>
                <p>Founder portrait, Ganga-side moment or calm retreat welcome image</p>
              </div>
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
            {storyPillars.map(([title, copy]) => (
              <article key={title}>
                <h2>{title}</h2>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section identity-section" aria-labelledby="identity-title">
          <div className="container identity-grid">
            <div>
              <p className="eyebrow">Clear positioning</p>
              <h2 id="identity-title">Calm, credible and specific by design</h2>
            </div>
            <div className="identity-list">
              {identityRows.map((item) => (
                <article key={item.label}>
                  <h3>{item.label}</h3>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section founder-section" aria-labelledby="founder-title">
          <div className="container editorial-grid intent-grid">
            <p className="section-number">01 Founder intention</p>
            <div className="reading-column">
              <h2 id="founder-title">The work begins with making the space feel safe</h2>
              <p>
                For a guest travelling from the US, Canada or the UK, trust is not created by big
                spiritual claims. It is created by clarity: who is guiding the experience, what the
                rhythm looks like, what is included, what is not promised and how questions are handled.
              </p>
              <p>
                Isha's role is to shape Shreevan as a grounded wellness platform where traditional
                practices are presented with respect, boundaries and practical guest care.
              </p>
            </div>
            <figure className="intent-image">
              <img
                src="/images/about/founder-intention-journal.jpeg"
                alt="Founder intention notes and retreat planning materials on a wooden table"
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
                <p className="eyebrow">What guides the brand</p>
                <h2 id="principles-title">A premium retreat should feel calm before the guest arrives</h2>
              </div>
              <p>
                The story is not only about the founder. It is about the standard of care that every
                program, modality and consultation should follow.
              </p>
            </div>

            <div className="principle-grid">
              {founderPrinciples.map(([title, copy], index) => (
                <article key={title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section origin-section" aria-labelledby="origin-title">
          <div className="container origin-grid">
            <div className="image-slot origin-image">
              <span>Image slot</span>
              <p>Rishikesh, Maa Ganga, practice hall or natural retreat surroundings</p>
            </div>
            <div>
              <p className="eyebrow">Rishikesh roots</p>
              <h2 id="origin-title">The location is part of the experience, not a background detail</h2>
              <p>
                Shreevan Wellness belongs to the spiritual landscape of Rishikesh. The setting supports
                slower mornings, reflective practice, sattvic food and a sense of distance from ordinary
                pressure.
              </p>
              <p>
                The page should eventually be supported with real photographs of the stay, practice
                spaces, meals, approach road and surrounding nature, so international guests can judge
                comfort and safety without guessing.
              </p>
            </div>
          </div>
        </section>

        <section className="section care-section" aria-labelledby="care-title">
          <div className="container">
            <div className="section-heading centered">
              <p className="eyebrow">Guest care pathway</p>
              <h2 id="care-title">A serious retreat needs a clear support rhythm</h2>
            </div>
            <div className="care-path">
              {guestCareSteps.map((step, index) => (
                <article key={step.title}>
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
              <p className="eyebrow light">Responsible wellness</p>
              <h2 id="standards-title">Trust grows when boundaries are visible</h2>
              <p>
                Shreevan Wellness should never need exaggerated promises to convert the right guest.
                The page should communicate discernment, care and professionalism from the first read.
              </p>
            </div>
            <ul className="standards-list">
              {trustStandards.map((standard) => (
                <li key={standard}>{standard}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section story-cta-section" aria-labelledby="story-cta-title">
          <div className="container story-cta">
            <p className="eyebrow">Begin with a fit conversation</p>
            <h2 id="story-cta-title">If the story resonates, the next step is a calm consultation</h2>
            <p>
              The call should help both sides understand whether Shreevan is the right environment,
              duration and rhythm for the guest's current season of life.
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
