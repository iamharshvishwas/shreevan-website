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

const lifeDomains = [
  {
    title: "Body",
    items: ["Strength", "Mobility", "Energy", "Sleep", "Nutrition"],
  },
  {
    title: "Mind",
    items: ["Focus", "Emotional resilience", "Discipline", "Clarity"],
  },
  {
    title: "Spirit",
    items: ["Meditation", "Awareness", "Presence", "Inner peace"],
  },
  {
    title: "Life",
    items: ["Purpose", "Relationships", "Habits", "Daily routine"],
  },
];

const idealParticipants = [
  "Burned-out executives",
  "Entrepreneurs",
  "Life transition seekers",
  "Wellness professionals",
  "Spiritual seekers",
  "Digital nomads",
  "Gap year participants",
  "Retired professionals",
];

const phases = [
  {
    phase: "Phase 1",
    title: "Reset",
    days: "Days 1-12",
    theme: "Slow Down",
    goal: "Detach from modern overload.",
    focus: "Nervous system recovery, sleep restoration, digital detox, basic yoga and foundational meditation.",
    workshops: "Science of Stress, Breath and Energy, Sattvic Living, Mindfulness.",
    milestone: "Participants experience calmness and mental space.",
  },
  {
    phase: "Phase 2",
    title: "Heal",
    days: "Days 13-24",
    theme: "Release the Past",
    goal: "Emotional healing.",
    focus: "Emotional awareness, self-forgiveness, relationship patterns and self-worth.",
    workshops: "Emotional Intelligence, Inner Child Work, Relationship Dynamics, Boundaries.",
    milestone: "Participants stop carrying old emotional weight.",
  },
  {
    phase: "Phase 3",
    title: "Awaken",
    days: "Days 25-36",
    theme: "Know Yourself",
    goal: "Deep self-discovery.",
    focus: "Yogic philosophy, awareness, conscious living and dharma.",
    workshops: "Yogic Psychology, The Nature of Mind, Ego and Awareness, Purpose Discovery.",
    milestone: "Greater clarity about identity and purpose.",
  },
  {
    phase: "Phase 4",
    title: "Embody",
    days: "Days 37-48",
    theme: "Become What You Have Learned",
    goal: "Practice living consciously.",
    focus: "Discipline, consistency, leadership and service through daily behavior.",
    workshops: "Habit Mastery, Conscious Leadership, Communication Skills, Living Your Values.",
    milestone: "Transformation becomes behavior.",
  },
  {
    phase: "Phase 5",
    title: "Integrate",
    days: "Days 49-60",
    theme: "Design Your Future",
    goal: "Create life after retreat.",
    focus: "Goal setting, purpose, business, relationships and lifestyle design.",
    workshops: "Life Vision Planning, Personal Mission Statement, Financial Wellness, optional Wellness Business Design.",
    milestone: "Participants leave with a complete roadmap.",
  },
];

const curriculumTracks = [
  {
    title: "Yoga Curriculum",
    stages: [
      ["Month 1", "Alignment, mobility, breath awareness and Surya Namaskar."],
      ["Month 2", "Strength, balance, endurance and flow."],
      ["Final goal", "Participants can confidently maintain a 60-minute home practice."],
    ],
  },
  {
    title: "Pranayama Curriculum",
    stages: [
      ["Week 1", "Breath awareness."],
      ["Week 2", "Nadi Shodhana."],
      ["Week 3", "Ujjayi."],
      ["Week 4", "Bhramari."],
      ["Week 5", "Kapalabhati."],
      ["Week 6", "Bhastrika."],
      ["Weeks 7-8", "Integrated practice."],
    ],
  },
  {
    title: "Meditation Curriculum",
    stages: [
      ["Stage 1", "Attention training."],
      ["Stage 2", "Mindfulness."],
      ["Stage 3", "Witnessing thoughts."],
      ["Stage 4", "Self-inquiry."],
      ["Stage 5", "Silence and presence."],
    ],
  },
];

const mentoring = [
  ["Day 5", "Initial Assessment", "Baseline goals, current lifestyle, wellbeing snapshot and residency readiness."],
  ["Day 20", "Progress Review", "Review rhythm, resistance, emotional patterns and practical support needs."],
  ["Day 40", "Purpose Coaching", "Clarify identity, dharma, leadership questions and deeper life direction."],
  ["Day 55", "Life Design Session", "Finalize the life operating system and next 12-month action plan."],
];

const specialExperiences = [
  ["8", "Cooking Workshops"],
  ["4", "Fire Ceremonies"],
  ["4", "Silent Retreat Days"],
  ["2", "Multi-Day Nature Excursions"],
  ["2", "Boat Meditation Journeys"],
  ["Series", "Sound Healing"],
  ["Workshops", "Ayurveda"],
  ["Project", "Community Service"],
  ["Circles", "Leadership"],
  ["Sessions", "Personal Coaching"],
];

const graduationRequirements = [
  "Wellness Blueprint",
  "Personal Mission Statement",
  "Daily Sadhana Plan",
  "12-Month Action Plan",
  "Community Contribution Project",
];

const postProgramSupport = [
  ["Month 1", "Weekly Integration Calls", "Four support sessions while the participant re-enters normal life."],
  ["Month 2", "Bi-Weekly Coaching", "Two coaching sessions to keep habits, boundaries and rhythm alive."],
  ["Month 3", "Monthly Alumni Circle", "One alumni circle for community, reflection and long-term accountability."],
];

const modalities = [
  {
    title: "Yoga Therapy and Pranayama",
    href: "/modalities/yoga-therapy",
    copy: "A two-month progression from alignment and mobility into strength, endurance and home practice confidence.",
  },
  {
    title: "Guided Meditation and Mind Mastery",
    href: "/modalities/guided-meditation",
    copy: "Attention training, mindfulness, witnessing, self-inquiry, silence and presence.",
  },
  {
    title: "Spiritual Sadhanas and Yogic Philosophy",
    href: "/modalities/spiritual-sadhanas",
    copy: "Dharma, karma yoga, personal sadhana, fire ceremony, leadership and conscious living.",
  },
  {
    title: "Panchkarma and Deep Detox",
    href: "/modalities/panchkarma-detox",
    copy: "Educational grounding for detox, daily routine, sattvic living and Ayurvedic lifestyle workshops.",
  },
];

const inclusions = [
  "60-day conscious living residency in Rishikesh",
  "Five progressive phases from reset to integration",
  "One-on-one mentoring at four important milestones",
  "Yoga, pranayama, meditation, workshops, service and integration work",
  "Special experiences including silent retreat days, boat meditation and nature excursions",
  "Post-program support across the first three months after graduation",
];

export function SixtyDayRishiResidencyPage() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />

      <main id="main">
        <section className="section program-hero residency-hero" aria-labelledby="program-title">
          <div className="container program-hero-grid">
            <div>
              <p className="eyebrow">60-Day Advanced Residency</p>
              <h1 id="program-title">Rishi Tantra: A 60-Day Conscious Living Residency</h1>
              <p className="program-theme">From Seeking to Living</p>
              <p className="hero-lede">
                Do not just learn yoga. Learn how to live. This is Shreevan Wellness&apos;s most
                advanced residency for people who are not looking for relaxation, but reinvention.
              </p>
              <div className="hero-actions">
                <Link className="button button-primary" href="/book-consultation">
                  Apply for a suitability call
                </Link>
                <a className="button button-secondary" href="#residency-phases">
                  View residency structure
                </a>
              </div>
              <ul className="hero-trust" aria-label="Residency trust points">
                <li>Highest-depth program</li>
                <li>5-phase lifestyle transformation</li>
                <li>One-on-one mentoring included</li>
              </ul>
            </div>

            <div className="program-hero-media">
              <div className="image-slot program-hero-slot residency-slot">
                <span>Image slot</span>
                <p>Residency visuals: daily living rhythm, mentoring, service, Ganga practice and graduation</p>
              </div>
              <aside className="program-summary-card residency-summary" aria-label="Program summary">
                <Image src={siteConfig.logos.symbol} alt="" width={72} height={72} />
                <dl>
                  <div>
                    <dt>Duration</dt>
                    <dd>60 days</dd>
                  </div>
                  <div>
                    <dt>Positioning</dt>
                    <dd>Lifestyle transformation residency</dd>
                  </div>
                  <div>
                    <dt>Investment</dt>
                    <dd>Premium quote after suitability review</dd>
                  </div>
                </dl>
              </aside>
            </div>
          </div>
        </section>

        <section className="program-proof-strip" aria-label="60-day residency proof points">
          <div className="container program-proof-grid">
            <div>
              <strong>Not a retreat. A residency.</strong>
              <span>A long-form environment for changing daily behavior, not taking a spiritual holiday.</span>
            </div>
            <div>
              <strong>Complete life operating system</strong>
              <span>Health, food, productivity, meditation, purpose and 12-month growth planning.</span>
            </div>
            <div>
              <strong>Consultation-required enrolment</strong>
              <span>The fit call protects the guest, the group and the seriousness of the container.</span>
            </div>
          </div>
        </section>

        <section className="section residency-positioning-section" aria-labelledby="positioning-title">
          <div className="container residency-positioning-panel">
            <div>
              <p className="eyebrow light">Premium positioning</p>
              <h2 id="positioning-title">A residency for serious reinvention, not casual retreat browsing</h2>
              <p>
                The 60-day residency is not a longer version of the 28-day immersion. It is the advanced
                path for people who want a new way of living, with enough time for rhythm, service,
                discipline, purpose work and integration to become behavior.
              </p>
            </div>
            <ul>
              <li>Not a 60-day yoga retreat</li>
              <li>Not a long meditation holiday</li>
              <li>Not for casual wellness tourism</li>
              <li>Built for lifestyle reinvention</li>
            </ul>
          </div>
        </section>

        <section className="section program-fit-section" aria-labelledby="fit-title">
          <div className="container program-fit-grid">
            <div>
              <p className="eyebrow">Who this is for</p>
              <h2 id="fit-title">Ideal for people ready to pause life long enough to redesign it</h2>
              <p className="residency-fit-copy">
                Best-fit age range is typically 30-55, but the real qualifier is readiness: the guest
                must be able to commit time, attention and emotional honesty to a two-month container.
              </p>
              <ul className="program-chip-list">
                {idealParticipants.map((participant) => (
                  <li key={participant}>{participant}</li>
                ))}
              </ul>
            </div>

            <div>
              <p className="eyebrow">Transformation ladder</p>
              <div className="program-ladder">
                {transformationLadder.map(([duration, label]) => (
                  <div className={duration === "60 Days" ? "active" : undefined} key={duration}>
                    <span>{duration}</span>
                    <strong>{label}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section program-online-section" aria-labelledby="promise-title">
          <div className="container">
            <div className="section-heading centered">
              <p className="eyebrow">Expected outcomes</p>
              <h2 id="promise-title">A complete life operating system</h2>
              <p>
                At the end of 60 days, participants should leave with a daily routine, health system,
                food system, productivity system, meditation practice, personal mission statement,
                purpose blueprint and 12-month growth plan.
              </p>
            </div>
            <div className="residency-domain-grid">
              {lifeDomains.map((domain) => (
                <article key={domain.title}>
                  <h3>{domain.title}</h3>
                  <ul>
                    {domain.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
            <p className="program-outcome-note centered-note">
              These outcomes are the intended residency deliverables. They are not medical claims,
              therapy substitutes or guaranteed personal results.
            </p>
          </div>
        </section>

        <section className="section program-schedule-section" id="residency-phases" aria-labelledby="phases-title">
          <div className="container">
            <div className="section-heading split-heading">
              <div>
                <p className="eyebrow light">5-phase residency structure</p>
                <h2 id="phases-title">From reset to embodied living</h2>
              </div>
              <p>
                Each phase builds on the last so the residency does not stay at inspiration. It moves
                from recovery and release into self-knowledge, behavior change and life design.
              </p>
            </div>
            <div className="residency-phase-grid">
              {phases.map((phase) => (
                <article key={phase.phase}>
                  <span>{phase.phase}</span>
                  <strong>{phase.days}</strong>
                  <h3>{phase.title}</h3>
                  <p>{phase.theme}</p>
                  <dl>
                    <div>
                      <dt>Goal</dt>
                      <dd>{phase.goal}</dd>
                    </div>
                    <div>
                      <dt>Focus</dt>
                      <dd>{phase.focus}</dd>
                    </div>
                    <div>
                      <dt>Workshops</dt>
                      <dd>{phase.workshops}</dd>
                    </div>
                    <div>
                      <dt>Milestone</dt>
                      <dd>{phase.milestone}</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section program-inclusions-section" aria-labelledby="curriculum-title">
          <div className="container">
            <div className="section-heading split-heading">
              <div>
                <p className="eyebrow">Curriculum progression</p>
                <h2 id="curriculum-title">Practice develops from instruction into independence</h2>
              </div>
              <p>
                The advanced value is not only more sessions. It is that participants learn enough to
                maintain their practice after leaving Rishikesh.
              </p>
            </div>
            <div className="residency-curriculum-grid">
              {curriculumTracks.map((track) => (
                <article key={track.title}>
                  <h3>{track.title}</h3>
                  <dl>
                    {track.stages.map(([stage, copy]) => (
                      <div key={`${track.title}-${stage}`}>
                        <dt>{stage}</dt>
                        <dd>{copy}</dd>
                      </div>
                    ))}
                  </dl>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section program-online-section" aria-labelledby="mentoring-title">
          <div className="container">
            <div className="section-heading centered">
              <p className="eyebrow">One-on-one mentoring</p>
              <h2 id="mentoring-title">Personal guidance at the moments that matter</h2>
            </div>
            <div className="residency-mentoring-grid">
              {mentoring.map(([day, title, copy]) => (
                <article key={day}>
                  <span>{day}</span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section program-media-section" aria-labelledby="media-title">
          <div className="container program-media-grid">
            <div className="image-slot program-video-slot">
              <span>Video slot</span>
              <p>3-4 minute residency video: why 60 days, who it is for, and what life after graduation looks like</p>
            </div>
            <div>
              <p className="eyebrow">Residency environment</p>
              <h2 id="media-title">Review the living environment before you apply</h2>
              <p>
                Before committing to a two-month stay, guests should be able to see the accommodation,
                food rhythm, mentoring spaces, practice locations, service moments, excursions and the
                calm professionalism of the team.
              </p>
              <div className="program-media-slots">
                <div className="image-slot">
                  <span>Image slot</span>
                  <p>Mentoring space</p>
                </div>
                <div className="image-slot">
                  <span>Image slot</span>
                  <p>Daily living rhythm</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section program-online-section" aria-labelledby="experiences-title">
          <div className="container">
            <div className="section-heading centered">
              <p className="eyebrow">Special residency experiences</p>
              <h2 id="experiences-title">The advanced layer beyond daily practice</h2>
            </div>
            <div className="residency-experience-grid">
              {specialExperiences.map(([value, label]) => (
                <article key={label}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section program-inclusions-section" aria-labelledby="included-title">
          <div className="container program-inclusions-grid">
            <div>
              <p className="eyebrow">What is included</p>
              <h2 id="included-title">A serious container for conscious living</h2>
              <p>
                The final guest agreement should confirm room category, dates, mentoring scope,
                included excursions, transfer details, payment schedule and residency boundaries.
              </p>
            </div>
            <ul className="program-inclusion-list">
              {inclusions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section program-schedule-section" aria-labelledby="graduation-title">
          <div className="container residency-graduation-grid">
            <div>
              <p className="eyebrow light">Graduation requirements</p>
              <h2 id="graduation-title">Participants graduate with evidence of integration</h2>
              <p>
                This turns the 60-day offer from a long stay into a serious residency. Completion has
                defined outputs, so the participant knows what they are working toward.
              </p>
            </div>
            <div className="residency-requirement-grid">
              {graduationRequirements.map((item, index) => (
                <article key={item}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{item}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section program-online-section" aria-labelledby="support-title">
          <div className="container">
            <div className="section-heading centered">
              <p className="eyebrow">Post-program support</p>
              <h2 id="support-title">The first three months after graduation are designed too</h2>
            </div>
            <div className="residency-support-grid">
              {postProgramSupport.map(([month, title, copy]) => (
                <article key={month}>
                  <span>{month}</span>
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
                <p className="eyebrow">Methods inside the residency</p>
                <h2 id="modalities-title">The educational pages explain the practices in depth</h2>
              </div>
              <p>
                These modality pages help you understand the practices behind the residency before you
                decide whether this depth is right for your season of life.
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

        <section className="section program-pricing-section" aria-labelledby="investment-title">
          <div className="container program-pricing-panel residency-investment-panel">
            <div>
              <p className="eyebrow">Premium investment</p>
              <h2 id="investment-title">This is the highest-depth Shreevan Wellness offer</h2>
              <p>
                This residency is priced as a premium long-form experience because the participant is
                learning an entirely new way of living. Final investment, room category and payment
                schedule should be confirmed through a suitability call and verified invoice flow.
              </p>
            </div>
            <dl>
              <div>
                <dt>Price display</dt>
                <dd>Confirmed after suitability review</dd>
              </div>
              <div>
                <dt>Booking flow</dt>
                <dd>Application call, recommendation, invoice, payment</dd>
              </div>
              <div>
                <dt>Payment path</dt>
                <dd>Use secure checkout only after booking approval</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="section program-cta-section" aria-labelledby="program-cta-title">
          <div className="container program-cta-panel residency-cta-panel">
            <div>
              <p className="eyebrow light">Application-first enrolment</p>
              <h2 id="program-cta-title">This residency begins with a careful conversation</h2>
              <p>
                A 60-day residency is a major time, energy and financial commitment. The consultation
                should confirm readiness, travel window, health boundaries, privacy needs, accommodation
                expectations and whether this depth is truly appropriate.
              </p>
            </div>
            <div className="program-cta-actions">
              <Link className="button button-light" href="/book-consultation">
                Apply for a suitability call
              </Link>
              <Link className="text-link" href="/programs/28-day-inner-awakening">
                Compare with 28-day flagship
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
