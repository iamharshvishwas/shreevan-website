"use client";

import { FormEvent, useState } from "react";
import { formatPhoneWithCountryCode, WhatsAppPhoneFields } from "@/components/forms/whatsapp-phone-fields";

export function SuitabilityForm() {
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
    const fullName = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const country = String(formData.get("country") ?? "");
    const programInterest = String(formData.get("program") ?? "");
    const resetNote = String(formData.get("note") ?? "");
    const phoneCountryCode = String(formData.get("phoneCountryCode") ?? "");
    const whatsapp = String(formData.get("whatsapp") ?? "");
    const phone = formatPhoneWithCountryCode(phoneCountryCode, whatsapp);

    void fetch("/api/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source: "home-suitability",
        name: fullName,
        email,
        phone,
        country,
        program: programInterest,
        goal: resetNote,
        consent: formData.get("wellness-boundary") === "on",
      }),
    }).catch(() => {});

    void fetch("https://api.shreevanwellness.com/api/v1/intake/form", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        form: "Suitability call request",
        name: fullName,
        email,
        phone,
        phoneCountryCode,
        whatsapp,
        country,
        program: programInterest,
        message: resetNote,
      }),
      keepalive: true,
    }).catch(() => {});

    form.reset();
    setStatus("Thank you. Your request has been received.");
  }

  return (
    <form
      className="suitability-form"
      method="post"
      data-veda-form="Home suitability request"
      onSubmit={handleSubmit}
      onChange={() => setLocked(false)}
    >
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

      <WhatsAppPhoneFields idPrefix="guest" />

      <div className="form-row">
        <label htmlFor="guest-note">What are you hoping to reset?</label>
        <textarea id="guest-note" name="note" rows={3} placeholder="A short note is enough." />
      </div>

      <label className="checkbox-row">
        <input type="checkbox" name="wellness-boundary" required />
        <span>I understand this is a wellness suitability request, not medical advice.</span>
      </label>

      <button className="button button-primary" type="submit" disabled={locked}>
        Request a suitability call
      </button>
      <p className="form-status" aria-live="polite">
        {status}
      </p>
    </form>
  );
}
