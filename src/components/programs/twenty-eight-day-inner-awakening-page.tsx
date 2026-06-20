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

const corePromises = [
  "Reset the nervous system",
  "Release accumulated stress and emotional baggage",
  "Learn authentic yogic living",
  "Establish powerful daily rituals",
  "Discover greater clarity and purpose",
  "Build a sustainable wellness lifestyle",
  "Experience inner stillness and self-awareness",
  "Return home with a complete life blueprint",
];

const phases = [
  {
    week: "Week 1",
    title: "Detox and Foundation",
    theme: "Slow Down and Become Aware",
    question: "What is currently controlling my life?",
    outcome: "Participants become aware of patterns, habits, stressors and conditioning.",
  },
  {
    week: "Week 2",
    title: "Healing and Release",
    theme: "Let Go of What No Longer Serves You",
    question: "What am I carrying that I need to release?",
    outcome: "Emotional healing, nervous-system regulation, forgiveness and acceptance.",
  },
  {
    week: "Week 3",
    title: "Awakening and Discovery",
    theme: "Who Am I Beneath the Noise?",
    question: "What is my authentic self trying to express?",
    outcome: "Purpose, self-awareness, deeper meditation and inner clarity.",
  },
  {
    week: "Week 4",
    title: "Integration and Life Design",
    theme: "Creating Life By Design",
    question: "How do I live differently when I return home?",
    outcome: "Personal transformation blueprint and long-term sustainability.",
  },
];

const weekPlans = [
  {
    week: "Week 1",
    title: "Detox and Foundation",
    objective: "Disconnect from autopilot living.",
    days: [
      ["Day 1", "Arrival and Intention Setting", "Life audit, opening circle and fire ceremony."],
      ["Day 2", "Science of Stress", "Burnout, nervous system and recovery."],
      ["Day 3", "Understanding the Body", "Energy management, sleep optimization and movement."],
      ["Day 4", "Understanding Food", "Sattva, rajas, tamas and cooking workshop 1."],
      ["Day 5", "Breath and Energy", "Nadi Shodhana, Ujjayi and breath awareness."],
      ["Day 6", "Mindfulness and Journaling", "Observation, self-inquiry and silent morning."],
      ["Day 7", "Sacred Fire Ceremony", "Reflection, release and recommitment."],
    ],
  },
  {
    week: "Week 2",
    title: "Healing and Emotional Release",
    objective: "Heal emotional exhaustion and unresolved patterns.",
    days: [
      ["Day 8", "Emotional Intelligence", "Understanding emotions."],
      ["Day 9", "Relationships", "Boundaries, communication and attachment."],
      ["Day 10", "Neelkanth Mahadev Trek", "Resilience and surrender."],
      ["Day 11", "Healing the Inner Critic", "Self-worth and self-compassion."],
      ["Day 12", "Cooking Workshop 2", "Sattvic healing foods."],
      ["Day 13", "Mantra and Sound Healing", "Kirtan and singing bowls."],
      ["Day 14", "Half-Day Silence", "Reflection and integration."],
    ],
  },
  {
    week: "Week 3",
    title: "Awakening and Self-Discovery",
    objective: "Move beyond healing into conscious living.",
    days: [
      ["Day 15", "Yogic Psychology", "Mind, ego and awareness."],
      ["Day 16", "Laughter and Joy", "Playfulness and presence."],
      ["Day 17", "Trust and Connection", "Partner practices."],
      ["Day 18", "Designing Your Sadhana", "Personal spiritual practice."],
      ["Day 19", "Cooking Workshop 3", "Full sattvic meal creation."],
      ["Day 20", "Life Mapping Workshop", "Past, present and future."],
      ["Day 21", "Silent Boat Journey", "Witness consciousness."],
    ],
  },
  {
    week: "Week 4",
    title: "Integration and Life Design",
    objective: "Build the next chapter of life.",
    days: [
      ["Day 22", "Ayurvedic Lifestyle Principles", "Guest expert session."],
      ["Day 23", "Mandala and Creative Reflection", "Creative reflection and integration."],
      ["Day 24", "Breaking Through Limitations", "Fear, procrastination and resistance."],
      ["Day 25", "Full-Day Ganga Immersion", "Sunrise yoga, kirtan, silent sitting, nature reflection and picnic dinner."],
      ["Day 26", "Cooking Workshop 4", "Design your own sattvic meal."],
      ["Day 27", "Graduation Preparation", "Reflection, sharing and commitment ceremony."],
      ["Day 28", "Graduation Day", "Closing circle, certificates, group photos and farewell lunch."],
    ],
  },
];

const dailyStructure = [
  ["6:30 AM - 8:00 AM", "Yoga and Pranayama", "Foundation, energy, strength and independent practice progression."],
  ["9:30 AM - 11:00 AM", "Workshop Session", "Daily transformational topics with 24+ structured workshops."],
  ["3:00 PM - 5:00 PM", "Experiential Learning", "Trek, cooking, nature immersion, partner work, life mapping and group coaching."],
  ["5:00 PM - 6:00 PM", "Meditation", "Breath awareness, mindfulness, witnessing and silent meditation progression."],
];

const participantExperience = [
  ["Yoga Classes", "28"],
  ["Meditation / Yoga Nidra", "28"],
  ["Workshops", "24-26"],
  ["Group Sharing Circles", "24-25"],
  ["Sattvic Meal Preparation", "4"],
  ["Fire Ceremonies", "3"],
  ["Trekking Excursions", "1"],
  ["Boat Ride Experience", "1"],
  ["Sound Bath Healing", "1"],
  ["Karma Yoga Sessions", "4"],
  ["Silent Practice Days", "3"],
  ["Full-Day Immersion Retreat", "1"],
  ["Graduation and Integration", "1"],
];

const takeHome = [
  {
    title: "Personal Wellness Blueprint",
    copy: "Morning routine, sleep protocol, nutrition guidelines, exercise plan and meditation schedule.",
  },
  {
    title: "Personal Sadhana Plan",
    copy: "A daily spiritual practice designed for life after the retreat.",
  },
  {
    title: "Sattvic Recipe Collection",
    copy: "Recipes and meal ideas from the cooking workshops.",
  },
  {
    title: "Stress Management Toolkit",
    copy: "Breathwork, journaling, meditation and Yoga Nidra tools.",
  },
  {
    title: "90-Day Integration Roadmap",
    copy: "A step-by-step implementation guide after returning home.",
  },
];

const onlineSessions = [
  ["21 days before", "Orientation and Welcome", "Founder/team orientation, journey framing and arrival confidence."],
  ["14 days before", "Preparing Body and Mind", "Sleep, food, movement, caffeine/alcohol reduction and mindset preparation."],
  ["7 days before", "Community Introduction", "Meet the group and reduce uncertainty before travel."],
  ["7 days after", "Reintegration Circle", "Support for translating the retreat rhythm into ordinary life."],
  ["30 days after", "Progress Review", "A review of routines, obstacles, practices and next adjustments."],
  ["60 days after", "Lifestyle Coaching Session", "A deeper check-in on sustainable lifestyle design."],
  ["90 days after", "Alumni Mastermind", "Community, accountability and continued guided practice."],
];

const modalities = [
  {
    title: "Yoga Therapy and Pranayama",
    href: "/modalities/yoga-therapy",
    copy: "Daily asana, mobility, breathwork and energy-balancing progression across four weeks.",
  },
  {
    title: "Guided Meditation and Mind Mastery",
    href: "/modalities/guided-meditation",
    copy: "Breath awareness, mindfulness, witnessing, Yoga Nidra and silent meditation progression.",
  },
  {
    title: "Sound Healing",
    href: "/modalities/sound-healing",
    copy: "Mantra, kirtan, singing bowls and sound bath healing in the release-focused arc.",
  },
  {
    title: "Spiritual Sadhanas and Yogic Philosophy",
    href: "/modalities/spiritual-sadhanas",
    copy: "Fire ceremony, sadhana design, karma yoga, witness consciousness and conscious living.",
  },
];

const inclusions = [
  "28-day personal transformation immersion",
  "120-140 structured sessions and guided activities",
  "Daily yoga, pranayama, meditation and reflection circles",
  "Four sattvic cooking workshops and recipe collection",
  "Trek, boat journey, sound healing, silent practice and Ganga immersion",
  "Complete life blueprint and 90-day integration support roadmap",
];

export function TwentyEightDayInnerAwakeningPage() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />

      <main id="main">
        <section className="section program-hero flagship-hero" aria-labelledby="program-title">
          <div className="container program-hero-grid">
            <div>
              <p className="eyebrow">28-Day Flagship Immersion</p>
              <h1 id="program-title">Sattva Ganga: 28 Days to Your True Self</h1>
              <p className="program-theme">Awaken. Heal. Transform. Integrate.</p>
              <p className="hero-lede">
                A 28-day personal transformation immersion for individuals seeking clarity, healing,
                purpose and a sustainable path to holistic wellbeing. This is not positioned as a long
                yoga retreat; it is Shreevan Wellness&apos;s flagship inner-awakening journey.
              </p>
              <div className="hero-actions">
                <Link className="button button-primary" href="/book-consultation">
                  Book a suitability call
                </Link>
                <a className="button button-secondary" href="#phases">
                  View four phases
                </a>
              </div>
              <ul className="hero-trust" aria-label="Program trust points">
                <li>Flagship 28-day immersion</li>
                <li>120-140 guided experiences</li>
                <li>Consultation before payment</li>
              </ul>
            </div>

            <div className="program-hero-media">
              <div className="image-slot program-hero-slot flagship-slot">
                <span>Image slot</span>
                <p>Full retreat arc: Ganga practice, trek, silent sitting, cooking, community and graduation</p>
              </div>
              <aside className="program-summary-card flagship-summary" aria-label="Program summary">
                <Image src={siteConfig.logos.symbol} alt="" width={72} height={72} />
                <dl>
                  <div>
                    <dt>Duration</dt>
                    <dd>28 days</dd>
                  </div>
                  <div>
                    <dt>Standard investment</dt>
                    <dd>$2,200 USD</dd>
                  </div>
                  <div>
                    <dt>Positioning</dt>
                    <dd>Personal transformation immersion</dd>
                  </div>
                </dl>
              </aside>
            </div>
          </div>
        </section>

        <section className="program-proof-strip" aria-label="28-day flagship positioning">
          <div className="container program-proof-grid">
            <div>
              <strong>More than 125 guided experiences</strong>
              <span>Designed to restore the body, calm the mind and reconnect guests with themselves.</span>
            </div>
            <div>
              <strong>Four transformational phases</strong>
              <span>Detox, healing, awakening and integration build a complete retreat arc.</span>
            </div>
            <div>
              <strong>Life after retreat</strong>
              <span>Participants leave with a wellness blueprint, sadhana plan and 90-day roadmap.</span>
            </div>
          </div>
        </section>

        <section className="section program-intent-section" aria-labelledby="program-intent-title">
          <div className="container editorial-grid">
            <p className="section-number">01 The flagship</p>
            <div className="reading-column">
              <h2 id="program-intent-title">This is the page that should sell transformation, not itinerary length</h2>
              <p>
                The roadmap is clear: participants are not buying 28 days of yoga. They are buying a
                personal reset and transformation experience with enough density and time to rebuild
                daily rhythm, emotional clarity and self-connection.
              </p>
              <p>
                The itinerary supports the promise, but the offer is the feeling of returning home to
                yourself with a clear, practical blueprint for life after Rishikesh.
              </p>
            </div>
          </div>
        </section>

        <section className="section program-fit-section" aria-labelledby="promise-title">
          <div className="container program-fit-grid">
            <div>
              <p className="eyebrow">Expected outcomes</p>
              <h2 id="promise-title">What participants may leave with after 28 days</h2>
              <ul className="program-chip-list">
                {corePromises.map((promise) => (
                  <li key={promise}>{promise}</li>
                ))}
              </ul>
              <p className="program-outcome-note">
                These are wellness-oriented outcomes supported by the retreat structure. Individual
                experience varies, and the program does not promise medical treatment, cure or guaranteed
                emotional results.
              </p>
            </div>

            <div>
              <p className="eyebrow">Transformation ladder</p>
              <div className="program-ladder">
                {transformationLadder.map(([duration, label]) => (
                  <div className={duration === "28 Days" ? "active" : undefined} key={duration}>
                    <span>{duration}</span>
                    <strong>{label}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section program-schedule-section" id="phases" aria-labelledby="phases-title">
          <div className="container">
            <div className="section-heading split-heading">
              <div>
                <p className="eyebrow light">Program architecture</p>
                <h2 id="phases-title">Four phases from slowing down to life design</h2>
              </div>
              <p>
                The flagship structure makes the page easier to trust: each week has a question, a theme
                and a concrete outcome.
              </p>
            </div>
            <div className="program-phase-grid">
              {phases.map((phase) => (
                <article key={phase.week}>
                  <span>{phase.week}</span>
                  <h3>{phase.title}</h3>
                  <p>{phase.theme}</p>
                  <dl>
                    <div>
                      <dt>Question</dt>
                      <dd>{phase.question}</dd>
                    </div>
                    <div>
                      <dt>Outcome</dt>
                      <dd>{phase.outcome}</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section program-online-section" aria-labelledby="density-title">
          <div className="container">
            <div className="section-heading centered">
              <p className="eyebrow">Participant experience density</p>
              <h2 id="density-title">The value is structural, not vague</h2>
            </div>
            <div className="program-metric-grid">
              {participantExperience.map(([label, value]) => (
                <article key={label}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </article>
              ))}
            </div>
            <p className="program-density-note">
              Total guided experiences: 120-140 structured sessions and activities across 28 days.
            </p>
          </div>
        </section>

        <section className="section program-inclusions-section" aria-labelledby="daily-title">
          <div className="container program-inclusions-grid">
            <div>
              <p className="eyebrow">Daily curriculum structure</p>
              <h2 id="daily-title">A full day rhythm that compounds over four weeks</h2>
              <p>
                The daily rhythm combines core practice, learning, experiential activity and evening
                integration so transformation has both structure and space.
              </p>
            </div>
            <div className="program-rhythm-table flagship-rhythm">
              {dailyStructure.map(([time, title, copy]) => (
                <div key={title}>
                  <span>{time}</span>
                  <strong>{title}</strong>
                  <p>{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section program-schedule-section" id="day-by-day" aria-labelledby="journey-title">
          <div className="container">
            <div className="section-heading split-heading">
              <div>
                <p className="eyebrow light">28-day journey</p>
                <h2 id="journey-title">The flagship journey, week by week</h2>
              </div>
              <p>
                This view gives the visitor confidence that the 28-day immersion has a real arc and not
                just repeated classes.
              </p>
            </div>
            <div className="program-week-journey">
              {weekPlans.map((week) => (
                <article key={week.week}>
                  <div>
                    <span>{week.week}</span>
                    <h3>{week.title}</h3>
                    <p>{week.objective}</p>
                  </div>
                  <ol>
                    {week.days.map(([day, title, copy]) => (
                      <li key={`${week.week}-${day}`}>
                        <time>{day}</time>
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

        <section className="section program-online-section" aria-labelledby="deliverables-title">
          <div className="container">
            <div className="section-heading centered">
              <p className="eyebrow">What participants take home</p>
              <h2 id="deliverables-title">The retreat continues through practical tools</h2>
            </div>
            <div className="program-deliverable-grid">
              {takeHome.map((item) => (
                <article key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section program-inclusions-section" aria-labelledby="included-title">
          <div className="container program-inclusions-grid">
            <div>
              <p className="eyebrow">What is included</p>
              <h2 id="included-title">A complete flagship immersion package</h2>
              <p>
                The final guest agreement should confirm dates, accommodation, inclusions, transfer
                details, registration fee and payment deadline before checkout.
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
              <p>3-minute flagship video: the offer, the four phases and why this is not just a yoga retreat</p>
            </div>
            <div>
              <p className="eyebrow">Trust content to add</p>
              <h2 id="media-title">Show the complete immersion honestly</h2>
              <p>
                Add real visuals of rooms, meals, Ganga practice, workshops, trek, boat journey, silent
                practice, cooking sessions and graduation. The page should feel premium because the
                structure is clear, not because it overpromises.
              </p>
              <div className="program-media-slots">
                <div className="image-slot">
                  <span>Image slot</span>
                  <p>Ganga immersion</p>
                </div>
                <div className="image-slot">
                  <span>Image slot</span>
                  <p>Life mapping workshop</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section program-online-section" aria-labelledby="online-title">
          <div className="container">
            <div className="section-heading centered">
              <p className="eyebrow">Online live support</p>
              <h2 id="online-title">Preparation and 90-day integration support</h2>
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
                <p className="eyebrow">Practices inside the flagship</p>
                <h2 id="modalities-title">The methods are woven into the full immersion</h2>
              </div>
              <p>
                The program page links back to educational modality pages so guests can understand the
                methodology without mixing commercial and informational search intent.
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

        <section className="section program-pricing-section" aria-labelledby="pricing-title">
          <div className="container program-pricing-panel">
            <div>
              <p className="eyebrow">Pricing clarity</p>
              <h2 id="pricing-title">Standard investment: $2,200 USD</h2>
              <p>
                The roadmap sets the 28-day standard price at $2,200, with no selling price below $2,000
                without founder approval. Final invoice, registration fee, room category and payment
                deadline should be confirmed after suitability review.
              </p>
            </div>
            <dl>
              <div>
                <dt>Standard</dt>
                <dd>$2,200</dd>
              </div>
              <div>
                <dt>Minimum selling price</dt>
                <dd>$2,000</dd>
              </div>
              <div>
                <dt>Booking flow</dt>
                <dd>Consultation first, payment second</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="section program-cta-section" aria-labelledby="program-cta-title">
          <div className="container program-cta-panel">
            <div>
              <p className="eyebrow light">Consultation-first enrolment</p>
              <h2 id="program-cta-title">Is the 28-day flagship the right depth for this season of life?</h2>
              <p>
                The suitability call should confirm goals, travel window, support needs, health
                boundaries, program readiness and whether this immersion is the right next step.
              </p>
            </div>
            <div className="program-cta-actions">
              <Link className="button button-light" href="/book-consultation">
                Book a suitability call
              </Link>
              <Link className="text-link" href="/programs/14-day-transformation">
                Compare with 14-day transformation
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
