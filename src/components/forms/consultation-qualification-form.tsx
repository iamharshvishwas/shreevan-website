"use client";

import { FormEvent, useState } from "react";

const steps = [
  {
    label: "Your context",
    title: "First, how can we reach you?",
    copy: "Share only the basics. The deeper fit conversation happens privately on the call.",
  },
  {
    label: "Retreat direction",
    title: "What are you hoping the retreat supports?",
    copy: "Choose the closest program if you know it. If not, leave it open and we will help you map the right depth.",
  },
  {
    label: "Safe next step",
    title: "Confirm this is a suitability request",
    copy: "No payment is taken here. This request helps the team decide what call path and program guidance makes sense.",
  },
];

const programOptions = [
  "Not sure yet",
  "3-Day Ganga Sattva Reset",
  "7-Day Ganga Sattva Foundation",
  "14-Day Ganga Sattva Transformation",
  "28-Day Inner Awakening",
  "60-Day Rishi Residency",
];

export function ConsultationQualificationForm() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [program, setProgram] = useState("Not sure yet");
  const [consent, setConsent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step < steps.length - 1) {
      setStep((current) => current + 1);
      return;
    }

    if (consent) {
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <div className="qualification-success" role="status">
        <span>Request received</span>
        <h2>Thank you. Your next step is a calm fit conversation.</h2>
        <p>
          The team will review your context and respond with suitable call times, program guidance and
          anything that should be clarified before travel or payment.
        </p>
        <a className="button button-primary" href="/contact">
          Contact the team
        </a>
      </div>
    );
  }

  return (
    <form className="qualification-form" onSubmit={handleSubmit}>
      <ol className="form-stepper" aria-label="Consultation request steps">
        {steps.map((item, index) => (
          <li className={index === step ? "active" : index < step ? "complete" : undefined} key={item.label}>
            <span>{index + 1}</span>
            <p>{item.label}</p>
          </li>
        ))}
      </ol>

      <div className="form-conversation-prompt">
        <span>Question {step + 1}</span>
        <h2>{steps[step].title}</h2>
        <p>{steps[step].copy}</p>
      </div>

      {step === 0 ? (
        <div className="form-step-panel">
          <div className="form-grid">
            <div className="form-row">
              <label htmlFor="consult-name">Full name</label>
              <input id="consult-name" name="name" autoComplete="name" required />
            </div>
            <div className="form-row">
              <label htmlFor="consult-email">Email address</label>
              <input id="consult-email" name="email" type="email" autoComplete="email" required />
            </div>
          </div>
          <div className="form-grid">
            <div className="form-row">
              <label htmlFor="consult-phone">Phone / WhatsApp</label>
              <input id="consult-phone" name="phone" autoComplete="tel" placeholder="+1..." />
            </div>
            <div className="form-row">
              <label htmlFor="consult-country">Country / time zone</label>
              <input id="consult-country" name="country" autoComplete="country-name" placeholder="US, Canada, UK..." required />
            </div>
          </div>
        </div>
      ) : null}

      {step === 1 ? (
        <div className="form-step-panel">
          <input type="hidden" name="program" value={program} />
          <div className="form-row">
            <span className="field-label">Preferred program</span>
            <div className="program-choice-grid" role="group" aria-label="Preferred program">
              {programOptions.map((option) => (
                <button
                  type="button"
                  className={option === program ? "selected" : undefined}
                  key={option}
                  onClick={() => setProgram(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          <div className="form-grid">
            <div className="form-row">
              <label htmlFor="consult-dates">Desired travel dates</label>
              <input id="consult-dates" name="dates" placeholder="Month or date range" />
            </div>
            <div className="form-row">
              <label htmlFor="consult-season">Current season of life</label>
              <select id="consult-season" name="season" defaultValue="">
                <option value="" disabled>
                  Choose the closest fit
                </option>
                <option>Work pressure or burnout</option>
                <option>Life transition</option>
                <option>Spiritual seeking</option>
                <option>Healthier daily rhythm</option>
                <option>Deep lifestyle redesign</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <label htmlFor="consult-goal">What would make this retreat worthwhile?</label>
            <textarea
              id="consult-goal"
              name="goal"
              rows={4}
              placeholder="A few honest lines are enough."
              required
            />
          </div>
          <div className="form-row">
            <label htmlFor="consult-health">Important comfort or health context, optional</label>
            <textarea
              id="consult-health"
              name="health"
              rows={3}
              placeholder="Keep this brief. Sensitive details can be discussed privately if needed."
            />
          </div>
        </div>
      ) : null}

      {step === 2 ? (
        <div className="form-step-panel">
          <div className="qualification-review">
            <span>Selected program</span>
            <strong>{program}</strong>
            <p>
              No payment is taken on this page. The consultation helps confirm fit, travel context,
              health boundaries and the right next step before any booking decision.
            </p>
          </div>

          <label className="checkbox-row">
            <input
              type="checkbox"
              name="wellness-consent"
              checked={consent}
              onChange={(event) => setConsent(event.target.checked)}
              required
            />
            <span>
              I understand this is a wellness suitability request, not medical advice, and I agree to
              be contacted about my enquiry.
            </span>
          </label>
        </div>
      ) : null}

      <div className="form-nav-actions">
        <button
          className="button button-secondary"
          type="button"
          onClick={() => (step === 0 ? null : setStep((current) => current - 1))}
          disabled={step === 0}
        >
          Back
        </button>
        <button className="button button-primary" type="submit" disabled={step === 2 && !consent}>
          {step === steps.length - 1 ? "Request consultation" : "Continue"}
        </button>
      </div>
    </form>
  );
}
