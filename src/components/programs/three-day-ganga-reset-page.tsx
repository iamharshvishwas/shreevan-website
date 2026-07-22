import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { siteConfig } from "@/config/site";

const idealParticipants = [
  "Busy professionals",
  "Entrepreneurs",
  "Corporate employees",
  "First-time retreat attendees",
  "Solo travelers",
  "People experiencing stress or burnout",
];

const outcomes = [
  "Sleep better",
  "Feel mentally lighter",
  "Learn a simple yoga practice",
  "Learn basic breathwork",
  "Experience meditation",
  "Understand sattvic living",
  "Create a personal morning routine",
  "Leave refreshed and clear",
];

const dayPlans = [
  {
    day: "Day 1",
    title: "Arriving Into Presence",
    objective: "Move from external busyness into internal awareness.",
    sessions: [
      ["12:00 PM", "Arrival and check-in", "Welcome herbal tea, room allocation and meeting fellow participants."],
      ["1:00 PM", "Sattvic lunch", "Introduction to mindful eating and the idea of sattva, rajas and tamas."],
      ["3:00 PM", "Opening circle", "Who am I beyond my roles, personal intentions and reflection work."],
      ["4:30 PM", "Ganga awareness walk", "Silent walk, nature observation and grounding exercises."],
      ["6:00 PM", "Sunset yoga and breathwork", "Joint mobility, basic asanas and diaphragmatic breathing."],
      ["8:30 PM", "Fire ceremony and intention setting", "Guided reflection, release statements and mental decluttering."],
      ["9:30 PM", "Yoga Nidra", "Deep relaxation before rest."],
    ],
  },
  {
    day: "Day 2",
    title: "Reconnecting With Self",
    objective: "Build awareness of body, breath, emotions and thought patterns.",
    sessions: [
      ["6:00 AM", "Herbal tea", "A quiet start before morning practice."],
      ["6:30 AM", "Sunrise yoga at Ganga", "Surya Namaskar, standing postures, stretching and pranayama."],
      ["9:30 AM", "Stress, burnout and the modern mind", "Nervous-system education, yogic stress understanding and self-assessment."],
      ["11:30 AM", "Guided journaling", "What drains my energy, what nourishes me and what needs to change."],
      ["3:00 PM", "Personal energy system", "Sleep, food, movement and recovery as a practical wellness blueprint."],
      ["4:30 PM", "Laughter yoga and group activities", "Emotional release through light, guided group practice."],
      ["6:00 PM", "Meditation training", "Beginner method, common mistakes and a 20-minute guided meditation."],
      ["8:30 PM", "Sharing circle", "What am I discovering about myself."],
    ],
  },
  {
    day: "Day 3",
    title: "Designing Life After The Retreat",
    objective: "Convert insights into sustainable habits that continue at home.",
    sessions: [
      ["6:00 AM", "Herbal tea", "Simple morning reset before practice."],
      ["6:30 AM", "Sunrise yoga", "A 20-minute home practice participants can continue."],
      ["9:30 AM", "The art of conscious living", "Daily routine, stress management, habit building and digital boundaries."],
      ["11:00 AM", "Personal action plan", "Daily wellness blueprint for wake time, yoga, meditation, food and sleep."],
      ["12:30 PM", "Closing circle", "Key learnings, commitments and feedback."],
      ["1:00 PM", "Celebration lunch", "A final sattvic meal with the group."],
      ["2:30 PM", "Graduation and photograph", "Certificate distribution and group photograph slot."],
      ["3:00 PM", "Departure", "Travel onward with a simple plan."],
    ],
  },
];

const onlineSessions = [
  {
    time: "7 days before",
    title: "Preparing for Your Reset",
    copy: "What to expect, packing guide, pre-retreat preparation and final practical questions.",
  },
  {
    time: "7 days after",
    title: "Integration and Accountability",
    copy: "Morning routine review, meditation consistency and the first challenges after returning home.",
  },
  {
    time: "30 days after",
    title: "Progress Review and Community Circle",
    copy: "A follow-up checkpoint to reinforce habits and reconnect with the retreat intention.",
  },
];

const modalities = [
  {
    title: "Yoga and Breathwork",
    href: "/modalities/yoga-therapy",
    copy: "Joint mobility, basic asanas, Surya Namaskar and foundational pranayama for daily practice.",
  },
  {
    title: "Meditation and Yoga Nidra",
    href: "/modalities/guided-meditation",
    copy: "Beginner-friendly meditation training, guided reflection and deep relaxation practices.",
  },
  {
    title: "Sattvic Living and Ritual",
    href: "/modalities/spiritual-sadhanas",
    copy: "Mindful eating, intention setting, Ganga awareness, fire ceremony and simple conscious-living habits.",
  },
];

const inclusions = [
  "Structured 3-day retreat curriculum",
  "Sattvic meals during the program",
  "Yoga, breathwork, meditation and Yoga Nidra",
  "Journaling prompts and personal action plan",
  "Certificate distribution and group photograph slot",
  "Three online support sessions around the retreat",
];

export function ThreeDayGangaResetPage() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />

      <main id="main">
        <section className="section program-hero" aria-labelledby="program-title">
          <div className="container program-hero-grid">
            <div>
              <p className="eyebrow">3-Day Retreat Program</p>
              <h1 id="program-title">Ganga Sattva Reset</h1>
              <p className="program-theme">Pause. Breathe. Reconnect.</p>
              <p className="hero-lede">
                A short but complete reset for people who need to slow down, release stress, reconnect
                with themselves and leave with a simple wellness routine they can continue at home.
              </p>
              <div className="hero-actions">
                <Link className="button button-primary" href="/book-consultation">
                  Book a suitability call
                </Link>
                <a className="button button-secondary" href="#day-by-day">
                  View 3-day rhythm
                </a>
              </div>
              <ul className="hero-trust" aria-label="Program trust points">
                <li>First-timer friendly</li>
                <li>Consultation before payment</li>
                <li>Responsible wellness boundaries</li>
              </ul>
            </div>

            <div className="program-hero-media">
              <figure className="intent-image program-hero-slot">
                <Image
                  src="/images/programs/3-day-ganga-reset-arrival-calm.jpeg"
                  alt="Guest arriving into a calm Ganga-side retreat setting in Rishikesh"
                  width={1195}
                  height={1600}
                  priority
                  sizes="(max-width: 720px) 100vw, 50vw"
                />
              </figure>
              <aside className="program-summary-card" aria-label="Program summary">
                <Image src={siteConfig.logos.symbol} alt="" width={72} height={72} />
                <dl>
                  <div>
                    <dt>Duration</dt>
                    <dd>3 days</dd>
                  </div>
                  <div>
                    <dt>Purpose</dt>
                    <dd>Reset, rest and practical daily routine</dd>
                  </div>
                  <div>
                    <dt>Price</dt>
                    <dd>Confirmed during consultation</dd>
                  </div>
                </dl>
              </aside>
            </div>
          </div>
        </section>

        <section className="program-proof-strip" aria-label="3-day reset promise">
          <div className="container program-proof-grid">
            <div>
              <strong>Not a weekend yoga class</strong>
              <span>A complete short transformation journey with clear arrival, integration and departure rhythm.</span>
            </div>
            <div>
              <strong>Made for modern pressure</strong>
              <span>Designed for professionals, founders, solo travelers and first-time retreat guests.</span>
            </div>
            <div>
              <strong>Leaves with routine</strong>
              <span>The endpoint is a simple morning practice and a personal wellness blueprint.</span>
            </div>
          </div>
        </section>

        <section className="section program-intent-section" aria-labelledby="program-intent-title">
          <div className="container editorial-grid">
            <p className="section-number">01 The reset</p>
            <div className="reading-column">
              <h2 id="program-intent-title">A short retreat should feel complete, not rushed</h2>
              <p>
                The roadmap is clear: the 3-day retreat should not try to do everything. Its purpose is
                to help a participant pause, release stress, reconnect with their inner rhythm and return
                home with practices simple enough to repeat.
              </p>
              <p>
                This is the right entry point for someone who is curious about retreat work, carrying
                stress or burnout, or travelling with limited time but still wants a meaningful reset.
              </p>
            </div>
          </div>
        </section>

        <section className="section program-fit-section" aria-labelledby="fit-title">
          <div className="container program-fit-grid">
            <div>
              <p className="eyebrow">Ideal participants</p>
              <h2 id="fit-title">Who this 3-day reset is designed for</h2>
              <ul className="program-chip-list">
                {idealParticipants.map((participant) => (
                  <li key={participant}>{participant}</li>
                ))}
              </ul>
            </div>

            <div className="program-outcome-panel">
              <p className="eyebrow">Primary outcomes</p>
              <h3>By the end of 3 days, participants should leave with:</h3>
              <div className="program-outcome-grid">
                {outcomes.map((outcome) => (
                  <span key={outcome}>{outcome}</span>
                ))}
              </div>
              <p>
                Individual experience varies. These are wellness-oriented goals, not medical promises or
                guaranteed treatment outcomes.
              </p>
            </div>
          </div>
        </section>

        <section className="section program-schedule-section" id="day-by-day" aria-labelledby="schedule-title">
          <div className="container">
            <div className="section-heading split-heading">
              <div>
                <p className="eyebrow light">Day-by-day curriculum</p>
                <h2 id="schedule-title">The full 3-day retreat rhythm</h2>
              </div>
              <p>
                The schedule moves from arrival and presence, into self-awareness, then into a practical
                life-after-retreat plan.
              </p>
            </div>

            <div className="program-day-grid">
              {dayPlans.map((day) => (
                <article className="program-day-card" key={day.day}>
                  <span>{day.day}</span>
                  <h3>{day.title}</h3>
                  <p>{day.objective}</p>
                  <ol className="program-schedule-list">
                    {day.sessions.map(([time, title, copy]) => (
                      <li key={`${day.day}-${time}-${title}`}>
                        <time>{time}</time>
                        <div>
                          <h4>{title}</h4>
                          <p>{copy}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section program-online-section" aria-labelledby="online-title">
          <div className="container">
            <div className="section-heading centered">
              <p className="eyebrow">Before and after support</p>
              <h2 id="online-title">The reset begins before arrival and continues after homecoming</h2>
            </div>
            <div className="program-online-grid">
              {onlineSessions.map((session, index) => (
                <article key={session.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{session.time}</p>
                  <h3>{session.title}</h3>
                  <p>{session.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section program-inclusions-section" aria-labelledby="included-title">
          <div className="container program-inclusions-grid">
            <div style={{ minWidth: 0 }}>
              <p className="eyebrow">Stay and inclusions</p>
              <h2 id="included-title">Your Stay at Shreevan</h2>
              <p>
                Guests should be able to see the standard of comfort, privacy and simplicity before they
                enquire. Final room category, transfers, dates and package specifics can still be confirmed
                during consultation.
              </p>
            </div>
            <div style={{ minWidth: 0 }}>
              <figure className="international-image" style={{ marginBottom: 32 }}>
                <img
                  src="/images/programs/3-day-your-stay-at-shreevan.jpeg"
                  alt="Quiet room at Shreevan Wellness with garden view and simple retreat comforts"
                  width="2200"
                  height="1642"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
              <ul className="program-inclusion-list">
                {inclusions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="section program-media-section" aria-labelledby="media-title">
          <div className="container program-media-grid">
            <div className="image-slot program-video-slot">
              <span>Video slot</span>
              <p>1-minute 3-Day Reset overview video: who it is for and what guests leave with</p>
            </div>
            <div>
              <p className="eyebrow">Trust content to add</p>
              <h2 id="media-title">Show the real place, food and pace</h2>
              <p>
                Add real visuals of arrival, rooms, Ganga-side practice, meals, journaling, group spaces
                and the closing circle. International guests should not have to imagine comfort, safety
                or daily rhythm.
              </p>
              <div className="program-media-slots">
                <div className="image-slot home-media-slot has-media">
                  <img
                    src="/images/programs/3-day-beginner-friendly-daily-practice.jpeg"
                    alt="Beginner-friendly guided daily practice in a calm Ganga-side retreat space"
                    width="2200"
                    height="1642"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="home-media-caption">
                    <span>Beginner-friendly daily practice</span>
                  </div>
                </div>
                <div className="image-slot home-media-slot has-media">
                  <img
                    src="/images/programs/3-day-sattvic-meal-care-comfort.jpeg"
                    alt="Fresh sattvic meal served as part of a calm retreat dining experience"
                    width="2200"
                    height="1642"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="home-media-caption">
                    <span>Food, care and comfort proof</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section program-modality-section" aria-labelledby="modalities-title">
          <div className="container">
            <div className="section-heading split-heading">
              <div>
                <p className="eyebrow">Practices inside the reset</p>
                <h2 id="modalities-title">The methods are simple, guided and beginner-aware</h2>
              </div>
              <p>
                This program should link back to educational modality pages so commercial and
                informational search intent stay separate.
              </p>
            </div>
            <div className="program-modality-grid">
              {modalities.map((modality) => (
                <article key={modality.title}>
                  <h3>{modality.title}</h3>
                  <p>{modality.copy}</p>
                  <Link className="text-link" href={modality.href}>
                    Read the modality
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section program-cta-section" aria-labelledby="program-cta-title">
          <div className="container program-cta-panel">
            <div>
              <p className="eyebrow light">Consultation-first enrolment</p>
              <h2 id="program-cta-title">Not sure if 3 days is enough? Start with a fit conversation.</h2>
              <p>
                The call should confirm your goals, travel window, health boundaries, expectations and
                whether this reset is the right entry point or whether a longer program is more suitable.
              </p>
            </div>
            <div className="program-cta-actions">
              <Link className="button button-light" href="/book-consultation">
                Book a suitability call
              </Link>
              <Link className="text-link" href="/wellness-disclaimer">
                Read wellness disclaimer
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
