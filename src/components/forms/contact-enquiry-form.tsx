"use client";

import { FormEvent, useState } from "react";
import { formatPhoneWithCountryCode, WhatsAppPhoneFields } from "@/components/forms/whatsapp-phone-fields";

export function ContactEnquiryForm() {
  const [status, setStatus] = useState("");
  const [locked, setLocked] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (locked) {
      return;
    }

    setLocked(true);
    setStatus("Sending...");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const phoneCountryCode = String(formData.get("phoneCountryCode") ?? "");
    const whatsapp = String(formData.get("whatsapp") ?? "");
    void fetch("/api/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source: "contact",
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formatPhoneWithCountryCode(phoneCountryCode, whatsapp),
        country: formData.get("country"),
        topic: formData.get("topic"),
        message: formData.get("message"),
        consent: formData.get("consent") === "on",
      }),
    }).catch(() => {});

    form.reset();
    setStatus("Thank you. Your enquiry has been received.");
  }

  return (
    <form
      className="contact-form"
      data-veda-form="Contact form"
      onSubmit={handleSubmit}
      onChange={() => setLocked(false)}
    >
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

      <WhatsAppPhoneFields idPrefix="contact" />

      <div className="form-row">
        <label htmlFor="contact-message">Message</label>
        <textarea id="contact-message" name="message" placeholder="A short note is enough." required />
      </div>

      <label className="checkbox-row">
        <input type="checkbox" name="consent" required />
        <span>I understand this contact form is for general enquiries and not medical advice.</span>
      </label>

      <button className="button button-primary" type="submit" disabled={locked}>
        Send enquiry
      </button>
      <p className="form-status" aria-live="polite">
        {status}
      </p>
    </form>
  );
}
