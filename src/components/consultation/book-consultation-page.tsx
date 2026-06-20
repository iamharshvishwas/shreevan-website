import Link from "next/link";
import { ConsultationQualificationForm } from "@/components/forms/consultation-qualification-form";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

const conversationSignals = [
  ["No payment here", "This page only starts a suitability conversation."],
  ["Human review", "Your request should be read before a program is recommended."],
  ["International aware", "Country, time zone, travel window and food comfort matter."],
];

const callPath = [
  {
    prompt: "Where are you in life right now?",
    copy: "Work pressure, life transition, spiritual seeking, burnout recovery or a need for deeper lifestyle redesign.",
  },
  {
    prompt: "What level of retreat depth fits?",
    copy: "We compare your readiness with the 3, 7, 14, 28 and 60-day paths instead of pushing the highest-ticket option.",
  },
  {
    prompt: "What should be clarified before payment?",
    copy: "Stay, food, health boundaries, travel timing, room comfort and what information you need before deciding.",
  },
];

const rightFit = [
  "You are considering India travel and want clarity before booking.",
  "You are not sure which duration matches your current season.",
  "You have food, stay, comfort or health-boundary questions.",
  "You want a serious retreat, not a rushed wellness holiday.",
];

const notFit = [
  "You need emergency support or urgent medical advice.",
  "You want guaranteed healing, cure claims or instant transformation.",
  "You are looking for a casual holiday without daily structure.",
];

const afterSubmit = [
  ["1", "Your context is reviewed", "The team should look for program fit, travel readiness and any obvious safety boundary."],
  ["2", "Call times are shared", "You should receive a calm next-step reply rather than pressure to pay immediately."],
  ["3", "A program path is recommended", "Only after fit is clearer should the booking or payment path be discussed."],
];

export function BookConsultationPage() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />

      <main id="main">
        <section className="section booking-conversation-hero" aria-labelledby="booking-title">
          <div className="container booking-conversation-grid">
            <div>
              <p className="eyebrow">Free suitability call</p>
              <h1 id="booking-title">Before you choose a retreat, let us understand the person arriving</h1>
              <p className="hero-lede">
                This is not a checkout page. It is a calm first conversation to understand your season of
                life, travel context, comfort needs and whether Shreevan Wellness is the right container
                for you.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#qualification-form">
                  Start the fit request
                </a>
                <Link className="button button-secondary" href="/programs/28-day-inner-awakening">
                  Compare programs
                </Link>
              </div>
            </div>

            <aside className="booking-conversation-card" aria-label="Consultation promise">
              <span>What happens here</span>
              <h2>You are not committing to a retreat yet.</h2>
              <p>
                You are giving enough context for a responsible recommendation, so travel and payment
                happen only after fit feels clear.
              </p>
              <div className="booking-signal-list">
                {conversationSignals.map(([title, copy]) => (
                  <article key={title}>
                    <strong>{title}</strong>
                    <span>{copy}</span>
                  </article>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section className="booking-path-strip" aria-label="Consultation conversation path">
          <div className="container booking-path-grid">
            {callPath.map((item, index) => (
              <article key={item.prompt}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h2>{item.prompt}</h2>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section booking-fit-section" aria-labelledby="fit-title">
          <div className="container booking-fit-grid">
            <div>
              <p className="eyebrow">Fit before form</p>
              <h2 id="fit-title">This page should make the right guest feel safer, not rushed</h2>
              <p>
                High-value international visitors often leave when the page feels like a generic lead
                form. The consultation request should feel like a thoughtful intake before a meaningful
                journey.
              </p>
            </div>

            <div className="booking-fit-lists">
              <article>
                <h3>This is a good next step if:</h3>
                <ul>
                  {rightFit.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
              <article className="booking-boundary-card">
                <h3>This is not the right path if:</h3>
                <ul>
                  {notFit.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section className="section qualification-section booking-form-redesign" id="qualification-form" aria-labelledby="qualification-title">
          <div className="container qualification-shell booking-form-shell">
            <div className="booking-form-intro">
              <p className="eyebrow light">Start the conversation</p>
              <h2 id="qualification-title">Share enough context for a responsible reply</h2>
              <p>
                Keep it short. The goal is not to collect every private detail on the website. The goal
                is to route your enquiry to the right program conversation.
              </p>
              <div className="booking-form-note">
                <span>Important</span>
                <p>
                  This request is wellness suitability only. It is not medical advice, therapy, diagnosis
                  or emergency care.
                </p>
              </div>
            </div>
            <ConsultationQualificationForm />
          </div>
        </section>

        <section className="section booking-after-section" aria-labelledby="after-title">
          <div className="container">
            <div className="section-heading centered">
              <p className="eyebrow">After you submit</p>
              <h2 id="after-title">The next step should feel calm and specific</h2>
            </div>
            <div className="booking-after-grid">
              {afterSubmit.map(([number, title, copy]) => (
                <article key={title}>
                  <span>{number}</span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section booking-last-word-section" aria-labelledby="last-word-title">
          <div className="container booking-last-word-panel">
            <div>
              <p className="eyebrow">Still deciding?</p>
              <h2 id="last-word-title">If you are not ready to request a call, ask a practical question first</h2>
              <p>
                Room comfort, food needs, travel timing and program fit are all valid questions before
                you commit to a retreat path.
              </p>
            </div>
            <div className="booking-last-actions">
              <Link className="button button-primary" href="/contact">
                Contact the team
              </Link>
              <Link className="button button-secondary" href="/accommodation-inclusions">
                Check stay & food
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
