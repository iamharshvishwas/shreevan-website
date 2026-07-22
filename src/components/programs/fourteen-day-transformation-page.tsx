import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { siteConfig } from "@/config/site";

const transformationLadder = [
  ["3 Days", "Reset"],
  ["7 Days", "Rebuild"],
  ["14 Days", "Transform"],
  ["28 Days", "Awaken"],
  ["60 Days", "Embody"],
];

const targetAudience = [
  "Burned-out professionals",
  "Corporate leaders",
  "Entrepreneurs",
  "Career transition seekers",
  "Divorce or breakup recovery",
  "Mid-life transition",
  "Spiritual seekers wanting structure",
];

const outcomeGroups = [
  {
    title: "Physical",
    items: ["Better sleep", "Improved energy", "Better digestion", "Increased flexibility", "Sustainable wellness habits"],
  },
  {
    title: "Mental",
    items: ["Reduced anxiety", "Reduced overthinking", "Improved focus", "Increased self-awareness", "Better decision making"],
  },
  {
    title: "Emotional",
    items: ["Emotional release", "Healing from stress and burnout", "Greater confidence", "Improved emotional regulation"],
  },
  {
    title: "Spiritual",
    items: ["Daily meditation practice", "Understanding of yogic philosophy", "Connection with inner stillness", "Stronger sense of purpose"],
  },
];

const weekStructure = [
  {
    week: "Week 1",
    title: "Awareness and Healing",
    copy: "Participants understand who they are today, what patterns are controlling them and what is draining their energy.",
  },
  {
    week: "Week 2",
    title: "Transformation and Life Design",
    copy: "Participants build new habits, a new mindset and a new lifestyle blueprint for the next chapter of life.",
  },
];

const dayPlans = [
  {
    day: "Day 1",
    title: "Arriving and Slowing Down",
    theme: "From Doing to Being",
    focus: "Opening circle, life assessment, intention setting and evening fire ceremony.",
  },
  {
    day: "Day 2",
    title: "Understanding Energy",
    theme: "Where Does My Energy Go?",
    focus: "Sleep, food, stress, recovery and a personal energy audit.",
  },
  {
    day: "Day 3",
    title: "Understanding the Mind",
    theme: "You Are Not Your Thoughts",
    focus: "Yogic psychology, ego, mind, awareness, conditioning and mindfulness meditation.",
  },
  {
    day: "Day 4",
    title: "Emotional Detox",
    theme: "Feeling Without Suppressing",
    focus: "Emotional intelligence, breathwork, journaling, partner reflection and sound healing.",
  },
  {
    day: "Day 5",
    title: "Relationships",
    theme: "Healing Relationship Patterns",
    focus: "Boundaries, communication, expectations, attachment and relationship mapping.",
  },
  {
    day: "Day 6",
    title: "The Inner Critic",
    theme: "Breaking Limiting Beliefs",
    focus: "Shadow work, limiting belief exercises and self-compassion practices.",
  },
  {
    day: "Day 7",
    title: "Silence and Reflection",
    theme: "Meeting Yourself",
    focus: "Half-day silence with silent yoga, silent meals, nature walk and evening integration circle.",
  },
  {
    day: "Day 8",
    title: "Purpose and Meaning",
    theme: "Why Am I Here?",
    focus: "Purpose discovery framework, values assessment, strength identification and future vision.",
  },
  {
    day: "Day 9",
    title: "Yogic Living",
    theme: "Ancient Wisdom for Modern Life",
    focus: "Dharma, karma, awareness, conscious living and guided group discussion.",
  },
  {
    day: "Day 10",
    title: "Sattvic Lifestyle Mastery",
    theme: "Food as Medicine",
    focus: "Cooking workshop for sattvic meal preparation, herbal drinks and meal planning.",
  },
  {
    day: "Day 11",
    title: "Habit Transformation",
    theme: "Rewiring Daily Life",
    focus: "Building sustainable habits and designing a personal daily routine.",
  },
  {
    day: "Day 12",
    title: "Future Self Design",
    theme: "Creating the Next Version of You",
    focus: "Vision creation, life wheel assessment and practical goal setting.",
  },
  {
    day: "Day 13",
    title: "Integration Day",
    theme: "Bringing It All Together",
    focus: "Personal transformation blueprint with daily routine, weekly practices, monthly goals, self-care system and meditation plan.",
  },
  {
    day: "Day 14",
    title: "Graduation",
    theme: "Beginning Again",
    focus: "Celebration yoga, commitment ceremony, certificates, group sharing and closing lunch.",
  },
];

const experienceGroups = [
  {
    title: "Physical Practices",
    items: ["14 yoga classes", "14 pranayama sessions", "14 meditation sessions", "7 Yoga Nidra sessions"],
  },
  {
    title: "Transformational Workshops",
    items: ["Yogic psychology", "Emotional intelligence", "Purpose discovery", "Habit design", "Conscious relationships", "Stress mastery", "Life visioning"],
  },
  {
    title: "Experiential Activities",
    items: ["Fire ceremony", "Sound bath", "Silent half-day retreat", "Ganga nature walks", "Sattvic cooking workshop", "Group coaching circles"],
  },
];

const onlineSessions = [
  ["21 days before", "Understanding the Journey", "Founder/team orientation, philosophy, transformation expectations and questions before travel."],
  ["14 days before", "Preparing Mind and Body", "Sleep, caffeine/alcohol reduction, simple movement, meditation introduction and mindset preparation."],
  ["7 days before", "Meet Your Community", "A calm group introduction so participants arrive with more comfort and less uncertainty."],
  ["7 days after", "Reintegration Support", "Support for returning home without losing the clarity created during the retreat."],
  ["30 days after", "Progress Review", "A check-in on practices, obstacles, routines and personal transformation blueprint."],
  ["60 days after", "Transformation Check-In", "A deeper checkpoint for habit sustainability and life-design choices."],
  ["90 days after", "Alumni Circle", "Community reconnection, questions and continued guided practice."],
];

const modalities = [
  {
    title: "Yoga Therapy and Pranayama",
    href: "/modalities/yoga-therapy",
    copy: "Daily practice supports flexibility, breath awareness, energy and sustainable movement habits.",
  },
  {
    title: "Guided Meditation and Mind Mastery",
    href: "/modalities/guided-meditation",
    copy: "Mindfulness, silent reflection, Yoga Nidra and inner-stillness practices are central to the arc.",
  },
  {
    title: "Sound Healing",
    href: "/modalities/sound-healing",
    copy: "Sound bath supports the emotional detox and release-focused middle of the retreat.",
  },
  {
    title: "Spiritual Sadhanas and Yogic Philosophy",
    href: "/modalities/spiritual-sadhanas",
    copy: "Dharma, karma, awareness, fire ceremony, values and conscious living shape the deeper transformation work.",
  },
];

const inclusions = [
  "14-day structured transformation curriculum",
  "Daily yoga, pranayama and meditation",
  "7 Yoga Nidra sessions",
  "Transformational workshops and group coaching circles",
  "Fire ceremony, sound bath, silent half-day retreat and Ganga walks",
  "Personal transformation blueprint and seven online support sessions",
];

export function FourteenDayTransformationPage() {
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
              <p className="eyebrow">14-Day Retreat Program</p>
              <h1 id="program-title">Ganga Sattva Transformation</h1>
              <p className="program-theme">Transform Your Mind, Body & Life</p>
              <p className="hero-lede">
                A guided transformation journey for people who know they need more than a vacation but
                less than a month-long immersion. In 14 days, participants begin releasing limiting
                patterns, building daily rituals and creating a roadmap for the next chapter of life.
              </p>
              <div className="hero-actions">
                <Link className="button button-primary" href="/book-consultation">
                  Book a suitability call
                </Link>
                <a className="button button-secondary" href="#day-by-day">
                  View 14-day journey
                </a>
              </div>
              <ul className="hero-trust" aria-label="Program trust points">
                <li>Two-week transformation arc</li>
                <li>Life-design blueprint</li>
                <li>Consultation before payment</li>
              </ul>
            </div>

            <div className="program-hero-media">
              <div className="image-slot home-media-slot has-media program-hero-slot">
                <Image
                  src="/images/programs/14-day-transformation-hero-arrival.webp"
                  alt="Guest arriving at Shreevan Wellness for the 14-day Ganga Sattva Transformation retreat in Rishikesh"
                  width={2400}
                  height={1792}
                  priority
                  sizes="(max-width: 720px) 100vw, 50vw"
                />
              </div>
              <aside className="program-summary-card" aria-label="Program summary">
                <Image src={siteConfig.logos.symbol} alt="" width={72} height={72} />
                <dl>
                  <div>
                    <dt>Duration</dt>
                    <dd>14 days</dd>
                  </div>
                  <div>
                    <dt>Purpose</dt>
                    <dd>Release patterns and design a new life rhythm</dd>
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

        <section className="program-proof-strip" aria-label="14-day transformation positioning">
          <div className="container program-proof-grid">
            <div>
              <strong>More than a vacation</strong>
              <span>Positioned for people seeking guided transformation, not a general wellness break.</span>
            </div>
            <div>
              <strong>Two-week arc</strong>
              <span>Week 1 builds awareness and healing; Week 2 builds transformation and life design.</span>
            </div>
            <div>
              <strong>Blueprint to take home</strong>
              <span>The endpoint is a personal transformation blueprint with routines, goals and practices.</span>
            </div>
          </div>
        </section>

        <section className="section program-intent-section" aria-labelledby="program-intent-title">
          <div className="container editorial-grid">
            <p className="section-number">01 The transformation</p>
            <div className="reading-column">
              <h2 id="program-intent-title">Fourteen days creates room to change your relationship with yourself</h2>
              <p>
                The roadmap is explicit: this retreat should not be framed as simply learning yoga and
                meditation. It is a supported space where participants identify limiting patterns,
                understand what drains their energy and begin rebuilding daily life from a clearer place.
              </p>
              <p>
                It is designed for life transitions, burnout, relationship recovery, leadership pressure
                and seekers who want structure without committing to a month-long immersion.
              </p>
            </div>
          </div>
        </section>

        <section className="section program-fit-section" aria-labelledby="audience-title">
          <div className="container program-fit-grid">
            <div>
              <p className="eyebrow">Target audience</p>
              <h2 id="audience-title">Who this 14-day transformation is designed for</h2>
              <ul className="program-chip-list">
                {targetAudience.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <p className="eyebrow">Transformation ladder</p>
              <div className="program-ladder">
                {transformationLadder.map(([duration, label]) => (
                  <div className={duration === "14 Days" ? "active" : undefined} key={duration}>
                    <span>{duration}</span>
                    <strong>{label}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section program-online-section" aria-labelledby="outcomes-title">
          <div className="container">
            <div className="section-heading centered">
              <p className="eyebrow">Transformation outcomes</p>
              <h2 id="outcomes-title">The outcomes are practical, emotional and inward-facing</h2>
            </div>
            <div className="program-outcome-category-grid">
              {outcomeGroups.map((group) => (
                <article key={group.title}>
                  <h3>{group.title}</h3>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
            <p className="program-outcome-note centered-note">
              These are wellness-oriented transformation goals. Individual experience varies, and this
              program does not promise medical treatment, cure or therapy-substitute outcomes.
            </p>
          </div>
        </section>

        <section className="section program-inclusions-section" aria-labelledby="structure-title">
          <div className="container program-inclusions-grid">
            <div>
              <p className="eyebrow">Two-week structure</p>
              <h2 id="structure-title">Awareness first, life design second</h2>
              <p>
                The page should make the journey feel intentionally sequenced, so guests understand why
                14 days is different from a shorter foundation retreat.
              </p>
            </div>
            <div className="program-week-grid">
              {weekStructure.map((week) => (
                <article key={week.week}>
                  <span>{week.week}</span>
                  <h3>{week.title}</h3>
                  <p>{week.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section program-schedule-section" id="day-by-day" aria-labelledby="schedule-title">
          <div className="container">
            <div className="section-heading split-heading">
              <div>
                <p className="eyebrow light">14-day curriculum</p>
                <h2 id="schedule-title">A complete transformation journey, day by day</h2>
              </div>
              <p>
                The curriculum moves from slowing down and pattern awareness into purpose, yogic living,
                habit design and a personal transformation blueprint.
              </p>
            </div>

            <div className="program-day-grid fourteen-grid">
              {dayPlans.map((day) => (
                <article className="program-day-card" key={day.day}>
                  <span>{day.day}</span>
                  <h3>{day.title}</h3>
                  <p>{day.theme}</p>
                  <ol className="program-schedule-list">
                    <li>
                      <time>Focus</time>
                      <div>
                        <h4>Practice and workshop</h4>
                        <p>{day.focus}</p>
                      </div>
                    </li>
                  </ol>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section program-online-section" aria-labelledby="experiences-title">
          <div className="container">
            <div className="section-heading centered">
              <p className="eyebrow">Special experiences included</p>
              <h2 id="experiences-title">The transformation is supported by practice, workshops and lived experience</h2>
            </div>
            <div className="program-experience-group-grid">
              {experienceGroups.map((group) => (
                <article key={group.title}>
                  <h3>{group.title}</h3>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section program-inclusions-section" aria-labelledby="included-title">
          <div className="container program-inclusions-grid">
            <div>
              <p className="eyebrow">What is included</p>
              <h2 id="included-title">A deeper retreat package for serious life recalibration</h2>
              <p>
                Keep final venue, accommodation category, dates, room type, pricing and transfer details
                confirmed during consultation until the operational package is finalized.
              </p>
            </div>
            <ul className="program-inclusion-list">
              {inclusions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section program-media-section" aria-labelledby="media-title">
          <div className="container program-media-grid">
            <div className="image-slot program-video-slot">
              <span>Video slot</span>
              <p>2-minute 14-Day Transformation video: emotional healing and life redesign</p>
            </div>
            <div>
              <p className="eyebrow">Trust content to add</p>
              <h2 id="media-title">Show the depth without making exaggerated promises</h2>
              <p>
                Add real visuals of workshops, Ganga walks, quiet practice, meals, sound bath, group
                coaching and graduation. The page should feel grounded, not mystical or overpromising.
              </p>
              <div className="program-media-slots">
                <div className="image-slot home-media-slot has-media">
                  <img
                    src="/images/programs/14-day-transformation-coaching-circle.webp"
                    alt="Small group coaching circle with notebooks during the 14-day transformation retreat"
                    width="2400"
                    height="1792"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="home-media-caption">
                    <span>Group coaching circle</span>
                  </div>
                </div>
                <div className="image-slot home-media-slot has-media">
                  <img
                    src="/images/programs/14-day-transformation-silent-reflection.webp"
                    alt="Guest in silent reflection beside mountain-facing windows during the 14-day retreat"
                    width="2400"
                    height="1792"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="home-media-caption">
                    <span>Silent reflection</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section program-online-section" aria-labelledby="online-title">
          <div className="container">
            <div className="section-heading centered">
              <p className="eyebrow">Online live support</p>
              <h2 id="online-title">Seven touchpoints support preparation and integration</h2>
            </div>
            <div className="program-online-grid seven-up">
              {onlineSessions.map(([time, title, copy], index) => (
                <article key={title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{time}</p>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section program-modality-section" aria-labelledby="modalities-title">
          <div className="container">
            <div className="section-heading split-heading">
              <div>
                <p className="eyebrow">Practices inside the transformation</p>
                <h2 id="modalities-title">The methods support the journey without replacing medical care</h2>
              </div>
              <p>
                The commercial program links back to educational modality pages so visitors can learn
                methodology without mixing informational and booking intent.
              </p>
            </div>
            <div className="program-modality-grid four-up">
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
              <h2 id="program-cta-title">Need more than a foundation, but not a month-long immersion?</h2>
              <p>
                The suitability call should confirm your goals, transition context, travel window, health
                boundaries and whether the 14-day transformation is the right depth.
              </p>
            </div>
            <div className="program-cta-actions">
              <Link className="button button-light" href="/book-consultation">
                Book a suitability call
              </Link>
              <Link className="text-link" href="/programs/7-day-foundation">
                Compare with 7-day foundation
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
