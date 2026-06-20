"use client";

import { FormEvent, useState } from "react";

export function SuitabilityForm() {
  const [status, setStatus] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Thank you. Connect this form to your email/CRM before launch.");
  }

  return (
    <form className="suitability-form" method="post" onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="form-row">
          <label htmlFor="guest-name">Full name</label>
          <input id="guest-name" name="name" type="text" autoComplete="name" required />
        </div>
        <div className="form-row">
          <label htmlFor="guest-email">Email address</label>
          <input id="guest-email" name="email" type="email" autoComplete="email" required />
        </div>
      </div>

      <div className="form-grid">
        <div className="form-row">
          <label htmlFor="guest-country">Country</label>
          <input
            id="guest-country"
            name="country"
            type="text"
            autoComplete="country-name"
            placeholder="US, Canada, UK..."
          />
        </div>
        <div className="form-row">
          <label htmlFor="guest-program">Program interest</label>
          <select id="guest-program" name="program" defaultValue="">
            <option value="">Not sure yet</option>
            <option>3 day reset</option>
            <option>7 day reset</option>
            <option>14 day reset</option>
            <option>28 day immersion</option>
            <option>Future 60 day pathway</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <label htmlFor="guest-note">What are you hoping to reset?</label>
        <textarea id="guest-note" name="note" rows={3} placeholder="A short note is enough." />
      </div>

      <label className="checkbox-row">
        <input type="checkbox" name="wellness-boundary" required />
        <span>I understand this is a wellness suitability request, not medical advice.</span>
      </label>

      <button className="button button-primary" type="submit">
        Request a suitability call
      </button>
      <p className="form-status" aria-live="polite">
        {status}
      </p>
    </form>
  );
}
