import { SuitabilityForm } from "@/components/forms/suitability-form";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

const programs = [
  {
    no: "01",
    title: "3-day reset retreat",
    copy: "Best for a short pause and reconnection.",
    duration: "3 days",
    outcome: "A gentle return to breath, rhythm and perspective.",
    href: "/programs/3-day-ganga-reset",
  },
  {
    no: "02",
    title: "7-day foundation retreat",
    copy: "Best for beginners who want structure and clarity.",
    duration: "7 days",
    outcome: "A practical base for everyday wellness practices.",
    href: "/programs/7-day-foundation",
  },
  {
    no: "03",
    title: "14-day transformation retreat",
    copy: "Best for a deeper mind-body-emotional reset.",
    duration: "14 days",
    outcome: "More time for practice, reflection and integration.",
    href: "/programs/14-day-transformation",
  },
  {
    no: "04",
    title: "28-day immersive personal reset",
    copy: "Best for a complete structured retreat experience.",
    duration: "28 days",
    outcome: "A sustained reset with daily rhythm, guided practice and reflection.",
    label: "Signature",
    href: "/programs/28-day-inner-awakening",
  },
  {
    no: "05",
    title: "60-day yogic living immersion",
    copy: "Advanced residency for serious lifestyle reinvention.",
    duration: "60 days",
    outcome: "A conscious living residency with mentoring, service and integration.",
    label: "Advanced",
    href: "/programs/60-day-rishi-residency",
  },
];

const includedItems = [
  ["Daily guided practice", "Yoga, pranayama, meditation, Yoga Nidra and reflective practices."],
  ["Structured daily rhythm", "Practice, workshops, meals, rest, journaling and sharing circles."],
  ["Sattvic meals", "Simple vegetarian food with clear dietary guidance before arrival."],
  ["Accommodation clarity", "Room photos, privacy level, amenities and stay expectations should be shown."],
  ["Integration support", "Practical routines and tools that participants may continue after returning home."],
  ["Responsible boundary", "No cure claim, therapy substitute or guaranteed transformation promise."],
];

const dailyRhythm = [
  "Morning yoga and pranayama",
  "Intention circle",
  "Workshop or learning session",
  "Sattvic meals",
  "Reflection and journaling",
  "Meditation or Yoga Nidra",
  "Evening sharing circle",
];

const reassuranceItems = [
  ["Arrival", "Airport and transfer guidance", "Nearest airport, travel time, arrival window and transfer support."],
  ["Stay", "Accommodation and daily life", "Rooms, bathrooms, climate, laundry, quiet hours, internet policy and packing."],
  ["Food", "Sattvic meals explained plainly", "Vegetarian food, caffeine, alcohol, spice level and dietary suitability."],
  ["Fit", "Suitability before payment", "Goals, expectations, health context and whether the retreat is responsible for them."],
];

export function HomePage() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />

      <main id="main">
        <section className="hero" id="home" aria-labelledby="hero-title">
          <div className="container hero-inner">
            <p className="eyebrow">Premium wellness retreats in India</p>
            <h1 id="hero-title">Return to Your True Self</h1>
            <p className="hero-lede">
              Structured retreat experiences for professionals, founders, serious practitioners and
              life-transition seekers who want space, rhythm and guided reconnection.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#consultation">
                Book a consultation
              </a>
              <a className="button button-secondary" href="#programs">
                Explore programs
              </a>
            </div>
            <ul className="hero-trust" aria-label="Key trust points">
              <li>Consultation-first enrolment</li>
              <li>International guest ready</li>
              <li>Responsible wellness boundaries</li>
            </ul>
          </div>
        </section>

        <section className="photo-band" aria-label="Photography placeholder">
          <div className="image-slot image-slot-wide">
            <span>Image slot</span>
            <p>Real retreat setting, accommodation, practice space, meals or soft morning nature.</p>
          </div>
        </section>

        <section className="proof-strip" aria-label="Business trust signals">
          <div className="container proof-grid">
            <div>
              <strong>Clear programs</strong>
              <span>3, 7, 14, 28 and future 60-day pathways</span>
            </div>
            <div>
              <strong>Human-led fit check</strong>
              <span>Consultation before commitment</span>
            </div>
            <div>
              <strong>International reassurance</strong>
              <span>Travel, stay, food and safety clarity</span>
            </div>
            <div>
              <strong>Responsible wellness</strong>
              <span>No cure or guaranteed transformation claims</span>
            </div>
          </div>
        </section>

        <section className="section intent-section" aria-labelledby="intent-title">
          <div className="container editorial-grid">
            <p className="section-number">01 The intent</p>
            <div className="reading-column">
              <h2 id="intent-title">A calmer way to begin again</h2>
              <p>
                Shreevan Wellness is for people who do not need more noise, pressure or quick fixes.
                They need space, structure, guidance and a clear rhythm that supports reconnection.
              </p>
              <p>
                The experience is grounded in yoga, meditation, sattvic living, reflection and nature,
                while clearly distinguishing wellness education from medical advice.
              </p>
            </div>
          </div>
        </section>

        <section className="section programs-section" id="programs" aria-labelledby="programs-title">
          <div className="container">
            <div className="section-heading split-heading">
              <div>
                <p className="eyebrow">Program pathways</p>
                <h2 id="programs-title">Choose the depth of your reset</h2>
              </div>
              <p>
                All programs matter. The 28-day immersive reset is the signature offer, but shorter
                pathways help guests enter at the right level of readiness.
              </p>
            </div>

            <div className="program-index">
              {programs.map((program) => (
                <article className={`program-row${program.label ? " signature" : ""}`} key={program.no}>
                  <span className="program-no">{program.no}</span>
                  <div>
                    {program.label ? <p className="program-label">{program.label}</p> : null}
                    <h3>{program.title}</h3>
                    <p>{program.copy}</p>
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
              <p className="eyebrow">What guests should understand</p>
              <h2 id="included-title">Make the retreat feel real before the call</h2>
            </div>
            <div className="included-grid">
              {includedItems.map(([title, copy], index) => (
                <article className={index === includedItems.length - 1 ? "boundary" : undefined} key={title}>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section rhythm-section" aria-labelledby="rhythm-title">
          <div className="container rhythm-grid">
            <div>
              <p className="eyebrow light">Retreat experience</p>
              <h2 id="rhythm-title">A daily rhythm designed for clarity</h2>
              <p>
                The day is intentionally paced between practice, learning, meals, rest and reflection.
                The experience should feel structured, not crowded.
              </p>
            </div>
            <ol className="rhythm-list">
              {dailyRhythm.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section credibility-section" id="credibility" aria-labelledby="credibility-title">
          <div className="container credibility-grid">
            <div>
              <p className="eyebrow">Founder, team and responsible wellness</p>
              <h2 id="credibility-title">Trust starts with knowing who is holding the space</h2>
              <p>
                Add founder credentials, facilitator experience, training, guest-care standards and how
                suitability concerns are handled. This keeps trust personal without turning the page into
                a heavy "why us" block.
              </p>
            </div>
            <div className="team-panel">
              <div className="image-slot portrait-slot">
                <span>Image slot</span>
                <p>Founder, lead facilitator or retreat team portrait</p>
              </div>
              <ul>
                <li>Years of practice and relevant training</li>
                <li>Professional retreat management standards</li>
                <li>Clear wellness boundaries and guest-care process</li>
                <li>Health disclaimer and suitability screening</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="section international-section" id="international" aria-labelledby="international-title">
          <div className="container international-grid">
            <div>
              <p className="eyebrow">International visitor reassurance</p>
              <h2 id="international-title">A guest travelling from abroad needs practical confidence</h2>
              <p>
                The page should answer the questions a US, Canada or UK visitor will silently ask before
                booking a consultation.
              </p>
            </div>
            <div className="reassurance-list">
              {reassuranceItems.map(([tag, title, copy]) => (
                <article key={tag}>
                  <span>{tag}</span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section safety-section" aria-labelledby="safety-title">
          <div className="container safety-grid">
            <div className="image-slot safety-image">
              <span>Image slot</span>
              <p>Location exterior, accommodation, entrance, dining area or practice hall</p>
            </div>
            <div>
              <p className="eyebrow">Location and safety clarity</p>
              <h2 id="safety-title">Trust increases when the place feels real</h2>
              <p>
                Replace placeholder content with verified location details, guest support flow, policies
                and real photography before launch.
              </p>
              <div className="safety-list">
                <article>
                  <h3>Where guests stay</h3>
                  <p>Room options, privacy, cleaning and basic amenities.</p>
                </article>
                <article>
                  <h3>Who is available</h3>
                  <p>On-site support and emergency contact process.</p>
                </article>
                <article>
                  <h3>What policies apply</h3>
                  <p>Health disclaimer, refund policy and code of conduct.</p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="section testimonials-section" aria-labelledby="testimonials-title">
          <div className="container">
            <div className="section-heading centered">
              <p className="eyebrow">Social proof placeholders</p>
              <h2 id="testimonials-title">Use specific proof, not generic praise</h2>
            </div>
            <div className="testimonial-grid">
              <article>
                <p>"The structure gave me space to slow down without feeling lost."</p>
                <span>Guest reflection placeholder</span>
              </article>
              <article>
                <p>"Add an international guest note about travel comfort, safety and support."</p>
                <span>International guest placeholder</span>
              </article>
              <article>
                <p>"Add operational proof that the retreat is professionally managed."</p>
                <span>Operational proof placeholder</span>
              </article>
            </div>
          </div>
        </section>

        <section className="section consultation-section" id="consultation" aria-labelledby="consultation-title">
          <div className="container consultation-grid">
            <div>
              <p className="eyebrow light">Free suitability call</p>
              <h2 id="consultation-title">The consultation is the conversion point. Make it feel safe.</h2>
              <p>
                Visitors should understand that the call is not a sales trap. It is a responsible fit
                conversation before travel, payment or commitment.
              </p>
              <a className="button button-light" href="#suitability-form">
                Book a free suitability call
              </a>
            </div>
            <ol className="consultation-steps">
              <li>
                <span>01</span>
                <h3>Understand your context</h3>
                <p>Goals, work pressure, travel plans, prior practice and current lifestyle.</p>
              </li>
              <li>
                <span>02</span>
                <h3>Check suitability</h3>
                <p>Health boundaries, retreat expectations, food, schedule and comfort with the rhythm.</p>
              </li>
              <li>
                <span>03</span>
                <h3>Recommend the next step</h3>
                <p>Program depth, booking path and what information you need before deciding.</p>
              </li>
            </ol>
          </div>
        </section>

        <section className="section form-section" id="suitability-form" aria-labelledby="form-title">
          <div className="container form-shell">
            <div className="form-intro">
              <p className="eyebrow">Request the call</p>
              <h2 id="form-title">Share a little context before we speak</h2>
              <p>
                Keep this short. The goal is to route serious enquiries, understand country and program
                fit, and avoid asking for sensitive health details on the homepage.
              </p>
            </div>
            <SuitabilityForm />
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
