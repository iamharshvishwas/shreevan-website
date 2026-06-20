"use client";

import { FormEvent, useState } from "react";

export function ContactEnquiryForm() {
  const [status, setStatus] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Thank you. Connect this form to your CRM or inbox before launch.");
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="form-row">
          <label htmlFor="contact-name">Full name</label>
          <input id="contact-name" name="name" autoComplete="name" required />
        </div>
        <div className="form-row">
          <label htmlFor="contact-email">Email address</label>
          <input id="contact-email" name="email" type="email" autoComplete="email" required />
        </div>
      </div>

      <div className="form-grid">
        <div className="form-row">
          <label htmlFor="contact-country">Country / time zone</label>
          <input id="contact-country" name="country" placeholder="US, Canada, UK..." autoComplete="country-name" />
        </div>
        <div className="form-row">
          <label htmlFor="contact-topic">Reason for contact</label>
          <select id="contact-topic" name="topic" defaultValue="Retreat enquiry">
            <option>Retreat enquiry</option>
            <option>Travel or stay question</option>
            <option>Media or partnership</option>
            <option>General support</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <label htmlFor="contact-message">Message</label>
        <textarea id="contact-message" name="message" placeholder="A short note is enough." required />
      </div>

      <label className="checkbox-row">
        <input type="checkbox" name="consent" required />
        <span>I understand this contact form is for general enquiries and not medical advice.</span>
      </label>

      <button className="button button-primary" type="submit">
        Send enquiry
      </button>
      <p className="form-status" aria-live="polite">
        {status}
      </p>
    </form>
  );
}
