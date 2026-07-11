"use client";

import type { FormEvent, ReactNode } from "react";
import { useState } from "react";
import { formatPhoneWithCountryCode, WhatsAppPhoneFields } from "@/components/forms/whatsapp-phone-fields";

type WhatsAppTrackingLabel =
  | "Hero_WhatsAppClick"
  | "WhySawan_WhatsAppClick"
  | "PriceSection_WhatsAppClick"
  | "FAQ_WhatsAppClick"
  | "FinalCTA_WhatsAppClick"
  | "StickyMobile_WhatsAppClick"
  | "Header_WhatsAppClick"
  | "Footer_WhatsAppClick";

type TrackingLabel = WhatsAppTrackingLabel | "FormSubmit_Lead";

function trackCampaignEvent(label: TrackingLabel, kind: "whatsapp" | "lead") {
  const trackedWindow = window as typeof window & {
    fbq?: (eventType: "track" | "trackCustom", eventName: string, data?: Record<string, string>) => void;
    dataLayer?: Array<Record<string, string>>;
  };

  trackedWindow.fbq?.("trackCustom", label, {
    content_name: "Sawan Special Shiv Sadhana Retreat",
    content_category: "seasonal_retreat",
  });

  if (kind === "whatsapp") {
    trackedWindow.fbq?.("track", "Contact", {
      content_name: "Sawan Special Shiv Sadhana Retreat",
      content_category: "seasonal_retreat",
      label,
    });
  }

  if (kind === "lead") {
    trackedWindow.fbq?.("track", "Lead", {
      content_name: "Sawan Special Shiv Sadhana Retreat",
      content_category: "seasonal_retreat",
      label,
    });
  }

  trackedWindow.dataLayer?.push({
    event: label,
    campaign: "sawan_shiv_sadhana_retreat",
    interaction_type: kind,
  });
}

export function SawanRetreatForm() {
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
    const name = String(formData.get("name") ?? "");
    const phoneCountryCode = String(formData.get("phoneCountryCode") ?? "");
    const whatsapp = String(formData.get("whatsapp") ?? "");
    const phone = formatPhoneWithCountryCode(phoneCountryCode, whatsapp);
    const preferredDate = String(formData.get("preferredDate") ?? "");
    const guests = String(formData.get("guests") ?? "");
    const message = String(formData.get("message") ?? "");

    void fetch("/api/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        source: "home-suitability",
        name,
        email: "",
        phone,
        country: "India",
        program: "Sawan Special Shiv Sadhana Retreat",
        topic: "Sawan retreat enquiry",
        dates: preferredDate,
        season: "Sawan",
        message: `Preferred date: ${preferredDate || "Not specified"}\nGuests: ${guests || "Not specified"}\n${message}`,
        consent: formData.get("wellnessConsent") === "on" && formData.get("contactConsent") === "on",
      }),
    }).catch(() => {});

    void fetch("https://api.shreevanwellness.com/api/v1/intake/form", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        form: "Sawan Shiv Sadhana Retreat enquiry",
        name,
        email: "",
        phone,
        phoneCountryCode,
        whatsapp,
        country: "India",
        program: "Sawan Special Shiv Sadhana Retreat",
        message: `Preferred date: ${preferredDate || "Not specified"}\nGuests: ${guests || "Not specified"}\n${message}`,
        wellnessConsent: formData.get("wellnessConsent") === "on",
        contactConsent: formData.get("contactConsent") === "on",
      }),
      keepalive: true,
    }).catch(() => {});

    trackCampaignEvent("FormSubmit_Lead", "lead");
    form.reset();
    setStatus("Thank you. Our team will share availability, stay details and booking next steps.");
  }

  return (
    <form
      className="sawan-form"
      data-veda-form="Sawan Shiv Sadhana Retreat enquiry"
      onChange={() => setLocked(false)}
      onSubmit={handleSubmit}
    >
      <div className="form-grid">
        <div className="form-row">
          <label htmlFor="sawan-name">Full name</label>
          <input id="sawan-name" name="name" autoComplete="name" required />
        </div>
      </div>

      <WhatsAppPhoneFields defaultCode="+91" idPrefix="sawan" required />

      <div className="form-grid">
        <div className="form-row">
          <label htmlFor="sawan-date">Preferred date</label>
          <input id="sawan-date" name="preferredDate" placeholder="Between 30 July and 30 August" />
        </div>
        <div className="form-row">
          <label htmlFor="sawan-guests">Number of guests</label>
          <select id="sawan-guests" name="guests" defaultValue="1">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4+</option>
            <option>Not sure yet</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <label htmlFor="sawan-message">Question or note</label>
        <textarea id="sawan-message" name="message" rows={3} placeholder="Ask about dates, stay, inclusions or booking." />
      </div>

      <label className="checkbox-row">
        <input type="checkbox" name="wellnessConsent" required />
        <span>I understand this is a spiritual wellness retreat enquiry, not medical advice.</span>
      </label>
      <label className="checkbox-row">
        <input type="checkbox" name="contactConsent" required />
        <span>I agree to be contacted via WhatsApp/Email regarding this enquiry.</span>
      </label>

      <button className="button button-primary" type="submit" disabled={locked}>
        Request retreat details
      </button>
      <p className="form-status" aria-live="polite">
        {status}
      </p>
    </form>
  );
}

export function trackSawanWhatsAppClick(label: WhatsAppTrackingLabel) {
  if (typeof window === "undefined") {
    return;
  }

  trackCampaignEvent(label, "whatsapp");
}

export function SawanWhatsAppLink({
  children,
  className,
  label,
}: Readonly<{
  children: ReactNode;
  className: string;
  label: WhatsAppTrackingLabel;
}>) {
  return (
    <a
      className={className}
      href="https://wa.me/919115517667?text=Namaste%20Shreevan%20Wellness%2C%20I%20want%20details%20for%20the%20Sawan%20Special%20Shiv%20Sadhana%20Retreat."
      onClick={() => trackCampaignEvent(label, "whatsapp")}
      rel="noopener noreferrer"
      target="_blank"
    >
      {children}
    </a>
  );
}
