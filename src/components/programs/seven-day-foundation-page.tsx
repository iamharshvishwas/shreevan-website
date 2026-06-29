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

const outcomes = [
  "Establish a consistent yoga practice",
  "Learn 5 core pranayama techniques",
  "Build a meditation habit",
  "Improve sleep quality",
  "Understand sattvic nutrition",
  "Identify personal stress triggers",
  "Create a personalized wellness routine",
  "Experience emotional release",
  "Gain clarity on priorities and life direction",
];

const dayPlans = [
  {
    day: "Day 1",
    title: "Arrival and Awareness",
    theme: "Slowing Down",
    focus: "Opening circle, current life assessment, retreat expectations, fire ceremony and intention setting.",
    outcome: "Awareness precedes transformation.",
  },
  {
    day: "Day 2",
    title: "Understanding the Body",
    theme: "Your Body as a Temple",
    focus: "Yoga foundations, alignment, breathing, mobility, energy management, sleep, food, movement and recovery.",
    outcome: "Understanding how lifestyle affects wellbeing.",
  },
  {
    day: "Day 3",
    title: "Understanding the Mind",
    theme: "Mastering Thoughts",
    focus: "Yogic science of the mind, thought patterns, overthinking, anxiety, attention and mindfulness training.",
    outcome: "Participants learn they are not their thoughts.",
  },
  {
    day: "Day 4",
    title: "Emotional Detox",
    theme: "Releasing Emotional Baggage",
    focus: "Emotions as energy, emotional suppression, triggers, journaling, partner exercises, breathwork and sound healing.",
    outcome: "Emotional release and inner lightness.",
  },
  {
    day: "Day 5",
    title: "Conscious Living",
    theme: "Creating a Better Lifestyle",
    focus: "Science of habits, habit stacking, consistency, sattvic cooking, khichdi, herbal teas and seasonal vegetables.",
    outcome: "Practical wellness skills participants can use at home.",
  },
  {
    day: "Day 6",
    title: "Discovering Purpose",
    theme: "What Truly Matters?",
    focus: "Silent sunrise practice, values assessment, life wheel exercise, future-self visualization and Ganga reflection walk.",
    outcome: "Greater clarity and direction.",
  },
  {
    day: "Day 7",
    title: "Integration and Commitment",
    theme: "Taking Transformation Home",
    focus: "Wellness blueprint, daily routine, weekly practices, monthly commitments, graduation, certificate and celebration lunch.",
    outcome: "A structured plan to continue the foundation after departure.",
  },
];

const dailyRhythm = [
  ["6:00 AM", "Herbal Tea"],
  ["6:30 AM", "Yoga and Pranayama"],
  ["8:00 AM", "Breakfast"],
  ["9:30 AM", "Workshop Session"],
  ["11:00 AM", "Reflection / Journaling"],
  ["1:00 PM", "Lunch"],
  ["3:00 PM", "Practical Activity"],
  ["5:00 PM", "Meditation / Yoga Nidra"],
  ["6:30 PM", "Dinner"],
  ["8:00 PM", "Evening Circle"],
  ["10:00 PM", "Lights Out"],
];

const experiences = [
  "Daily Ganga-side yoga",
  "Guided meditation",
  "Yoga Nidra",
  "Fire ceremony",
  "Sound healing",
  "Sattvic cooking workshop",
  "Silent morning",
  "Nature walks",
  "Group coaching",
  "Wellness blueprint creation",
];

const onlineSessions = [
  ["14 days before", "Preparing Your Mind and Body", "Simple preparation so participants arrive with better sleep, calmer habits and realistic expectations."],
  ["7 days before", "Meet Your Community", "A gentle orientation to reduce uncertainty and introduce the people sharing the retreat space."],
  ["7 days after", "Integration Coaching", "Support for returning home without losing the daily rhythm created during the retreat."],
  ["30 days after", "Habit Reinforcement", "A practical review of obstacles, consistency and the wellness routine."],
  ["90 days after", "Alumni Circle", "Community reconnection, Q&A and a guided practice to continue the foundation."],
];

const modalities = [
  {
    title: "Yoga Therapy and Pranayama",
    href: "/modalities/yoga-therapy",
    copy: "Alignment, mobility, daily Ganga-side practice and five core breathing techniques.",
  },
  {
    title: "Guided Meditation and Yoga Nidra",
    href: "/modalities/guided-meditation",
    copy: "Mindfulness training, silent reflection, meditation habit-building and deep rest practices.",
  },
  {
    title: "Sound Healing",
    href: "/modalities/sound-healing",
    copy: "A guided sound session supporting emotional release and inner lightness inside the retreat arc.",
  },
  {
    title: "Spiritual Sadhanas and Sattvic Living",
    href: "/modalities/spiritual-sadhanas",
    copy: "Fire ceremony, conscious living, values reflection, Ganga walk and sattvic cooking practice.",
  },
];

const inclusions = [
  "7-day structured foundation curriculum",
  "Daily yoga, pranayama, meditation and Yoga Nidra",
  "Sattvic meals and cooking workshop",
  "Fire ceremony, sound healing and nature walks",
  "Personal wellness blueprint creation",
  "Five online live support sessions around the retreat",
];

export function SevenDayFoundationPage() {
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
              <p className="eyebrow">7-Day Retreat Program</p>
              <h1 id="program-title">Ganga Sattva Foundation</h1>
              <p className="program-theme">Rebuild Your Life From Within</p>
              <p className="hero-lede">
                A true foundation program for guests who want more than a reset. This 7-day retreat
                helps participants break unhealthy patterns and establish practical habits for physical,
                mental and emotional wellbeing.
              </p>
              <div className="hero-actions">
                <Link className="button button-primary" href="/book-consultation">
                  Book a suitability call
                </Link>
                <a className="button button-secondary" href="#day-by-day">
                  View 7-day curriculum
                </a>
              </div>
              <ul className="hero-trust" aria-label="Program trust points">
                <li>Foundation program</li>
                <li>Habit-building focus</li>
                <li>Consultation before payment</li>
              </ul>
            </div>

            <div className="program-hero-media">
              <div className="image-slot home-media-slot has-media program-hero-slot">
                <img
                  src="/images/programs/7-day-foundation-hero.jpeg"
                  alt="Guest arriving into a calm Ganga-side practice space during the 7-day foundation retreat"
                  width="1194"
                  height="1600"
                  loading="eager"
                  decoding="async"
                />
              </div>
              <aside className="program-summary-card" aria-label="Program summary">
                <Image src={siteConfig.logos.symbol} alt="" width={72} height={72} />
                <dl>
                  <div>
                    <dt>Duration</dt>
                    <dd>7 days</dd>
                  </div>
                  <div>
                    <dt>Purpose</dt>
                    <dd>Rebuild habits and establish a wellness foundation</dd>
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

        <section className="program-proof-strip" aria-label="7-day foundation positioning">
          <div className="container program-proof-grid">
            <div>
              <strong>Not a longer 3-day reset</strong>
              <span>The roadmap positions 7 days as Rebuild: a deeper arc for changing daily patterns.</span>
            </div>
            <div>
              <strong>Built around habit formation</strong>
              <span>Yoga, pranayama, meditation, sleep, food and reflection become a practical routine.</span>
            </div>
            <div>
              <strong>Designed for continuation</strong>
              <span>Guests leave with a personalized wellness blueprint, not just a good retreat memory.</span>
            </div>
          </div>
        </section>

        <section className="section program-intent-section" aria-labelledby="program-intent-title">
          <div className="container editorial-grid">
            <p className="section-number">01 The foundation</p>
            <div className="reading-column">
              <h2 id="program-intent-title">Seven days gives enough space to rebuild the basics</h2>
              <p>
                The goal of the 7-day retreat is to help participants move beyond temporary relief and
                establish sustainable foundations for physical, mental and emotional wellbeing.
              </p>
              <p>
                Participants should leave not only refreshed, but with actual practices they can continue:
                a yoga rhythm, breathwork tools, meditation habit, clearer sleep and food awareness, and a
                personal wellness blueprint.
              </p>
            </div>
          </div>
        </section>

        <section className="section program-fit-section" aria-labelledby="ladder-title">
          <div className="container program-fit-grid">
            <div>
              <p className="eyebrow">Transformation ladder</p>
              <h2 id="ladder-title">Where the 7-day retreat fits</h2>
              <div className="program-ladder">
                {transformationLadder.map(([duration, label]) => (
                  <div className={duration === "7 Days" ? "active" : undefined} key={duration}>
                    <span>{duration}</span>
                    <strong>{label}</strong>
                  </div>
                ))}
              </div>
            </div>

            <div className="program-outcome-panel">
              <p className="eyebrow">Primary outcomes</p>
              <h3>By the end of 7 days, participants should leave with:</h3>
              <div className="program-outcome-grid">
                {outcomes.map((outcome) => (
                  <span key={outcome}>{outcome}</span>
                ))}
              </div>
              <p>
                These are wellness-oriented goals. This page avoids medical cure claims, guaranteed
                transformation promises or therapy-substitute positioning.
              </p>
            </div>
          </div>
        </section>

        <section className="section program-schedule-section" id="day-by-day" aria-labelledby="schedule-title">
          <div className="container">
            <div className="section-heading split-heading">
              <div>
                <p className="eyebrow light">7-day curriculum</p>
                <h2 id="schedule-title">A deeper arc from slowing down to taking it home</h2>
              </div>
              <p>
                Each day has a distinct theme, workshop focus and outcome so the experience feels like a
                complete foundation program.
              </p>
            </div>

            <div className="program-day-grid">
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
                    <li>
                      <time>Outcome</time>
                      <div>
                        <h4>What this day builds</h4>
                        <p>{day.outcome}</p>
                      </div>
                    </li>
                  </ol>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section program-inclusions-section" aria-labelledby="rhythm-title">
          <div className="container program-inclusions-grid">
            <div>
              <p className="eyebrow">Daily schedule</p>
              <h2 id="rhythm-title">A clear rhythm for body, mind and integration</h2>
              <p>
                The daily structure balances practice, food, workshops, reflection, practical activities
                and evening integration.
              </p>
            </div>
            <div className="program-rhythm-table">
              {dailyRhythm.map(([time, activity]) => (
                <div key={`${time}-${activity}`}>
                  <span>{time}</span>
                  <strong>{activity}</strong>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section program-online-section" aria-labelledby="experiences-title">
          <div className="container">
            <div className="section-heading centered">
              <p className="eyebrow">Special experiences</p>
              <h2 id="experiences-title">Foundation is built through repeated practice and memorable moments</h2>
            </div>
            <div className="program-experience-grid">
              {experiences.map((experience) => (
                <span key={experience}>{experience}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="section program-inclusions-section" aria-labelledby="included-title">
          <div className="container program-inclusions-grid">
            <div>
              <p className="eyebrow">What is included</p>
              <h2 id="included-title">A complete foundation package</h2>
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
              <p>1-2 minute 7-Day Foundation video: why seven days, who benefits, what changes</p>
            </div>
            <div>
              <p className="eyebrow">Trust content to add</p>
              <h2 id="media-title">Show guests what one week in rhythm looks like</h2>
              <p>
                Add real visuals of morning practice, workshops, cooking, sound healing, nature walks,
                rooms, meals and quiet time. This page should make international guests feel clear before
                they book a call.
              </p>
              <div className="program-media-slots">
                <div className="image-slot home-media-slot has-media">
                  <img
                    src="/images/programs/7-day-foundation-workshop-circle.jpeg"
                    alt="Guided workshop circle during the 7-day foundation retreat with group reflection and journaling"
                    width="2200"
                    height="1642"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="home-media-caption">
                    <span>Workshop circle</span>
                  </div>
                </div>
                <div className="image-slot">
                  <span>Image slot</span>
                  <p>Cooking session</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section program-online-section" aria-labelledby="online-title">
          <div className="container">
            <div className="section-heading centered">
              <p className="eyebrow">Online live support</p>
              <h2 id="online-title">The foundation is supported before and after the retreat</h2>
            </div>
            <div className="program-online-grid five-up">
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
                <p className="eyebrow">Practices inside the foundation</p>
                <h2 id="modalities-title">The methods deepen without becoming overwhelming</h2>
              </div>
              <p>
                The program page links into modality pages so visitors can learn the method separately
                from the commercial program decision.
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
              <h2 id="program-cta-title">Is the 7-day foundation the right depth for you?</h2>
              <p>
                The suitability call should confirm your goals, current lifestyle, travel window, health
                boundaries and whether you need a reset, foundation or deeper transformation pathway.
              </p>
            </div>
            <div className="program-cta-actions">
              <Link className="button button-light" href="/book-consultation">
                Book a suitability call
              </Link>
              <Link className="text-link" href="/programs/3-day-ganga-reset">
                Compare with 3-day reset
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
