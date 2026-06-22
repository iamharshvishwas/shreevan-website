"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { siteConfig } from "@/config/site";

const programs = [
  {
    slug: "3-day-ganga-reset",
    name: "3-Day Ganga Sattva Reset",
    duration: "3 days",
    focus: "Short reset before returning to work or travel.",
  },
  {
    slug: "7-day-foundation",
    name: "7-Day Ganga Sattva Foundation",
    duration: "7 days",
    focus: "Foundational rhythm, practice and lifestyle reset.",
  },
  {
    slug: "14-day-transformation",
    name: "14-Day Ganga Sattva Transformation",
    duration: "14 days",
    focus: "Deeper routine, reflection and guided transformation.",
  },
  {
    slug: "28-day-inner-awakening",
    name: "28-Day Sattva Ganga Inner Awakening",
    duration: "28 days",
    focus: "Flagship immersive reset for serious inner work.",
  },
  {
    slug: "60-day-rishi-residency",
    name: "60-Day Rishi Tantra Lifestyle Residency",
    duration: "60 days",
    focus: "Long-form lifestyle transformation residency.",
  },
];

const paymentTypes = [
  "Deposit / booking hold",
  "Balance payment",
  "Full program payment",
];

const paymentMethods = [
  {
    id: "card",
    title: "International card",
    copy: "Redirect to Stripe or the approved card gateway. Card data stays with the payment provider.",
  },
  {
    id: "wise",
    title: "Wise / bank transfer",
    copy: "Best for larger international transfers where invoice-assisted payment is preferred.",
  },
  {
    id: "invoice",
    title: "Manual invoice support",
    copy: "Use when the guest needs currency, tax, invoice or transfer clarification before paying.",
  },
];

const legalLinks = [
  { href: "/terms-conditions", label: "Terms" },
  { href: "/refund-policy", label: "Refunds" },
  { href: "/privacy-policy", label: "Privacy" },
  { href: "/wellness-disclaimer", label: "Disclaimer" },
];

type PaymentPageProps = {
  initialBookingId?: string;
  initialProgramSlug?: string;
};

export function PaymentPage({ initialBookingId = "", initialProgramSlug = "" }: PaymentPageProps) {
  const defaultProgram = programs.some((program) => program.slug === initialProgramSlug)
    ? initialProgramSlug
    : programs[1].slug;
  const [programSlug, setProgramSlug] = useState(defaultProgram);
  const [bookingId, setBookingId] = useState(initialBookingId);
  const [paymentType, setPaymentType] = useState(paymentTypes[0]);
  const [currency, setCurrency] = useState("USD");
  const [method, setMethod] = useState(paymentMethods[0].id);
  const [accepted, setAccepted] = useState(false);
  const [status, setStatus] = useState("");

  const selectedProgram = useMemo(
    () => programs.find((program) => program.slug === programSlug) ?? programs[0],
    [programSlug],
  );

  const canContinue = bookingId.trim().length >= 4 && accepted;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canContinue) {
      return;
    }

    setStatus(
      method === "card"
        ? "Gateway handoff ready: connect this submit action to your Stripe Checkout session API for the verified booking."
        : "Invoice route ready: connect this submit action to CRM, Wise payment instructions and WhatsApp/email follow-up.",
    );
  }

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />

      <main id="main">
        <section className="section payment-hero" aria-labelledby="payment-title">
          <div className="container payment-hero-grid">
            <div>
              <p className="eyebrow">Secure checkout</p>
              <h1 id="payment-title">Confirm your retreat booking and continue to payment</h1>
              <p className="hero-lede">
                Use this page after your consultation, program duration, dates and invoice have been
                confirmed by Shreevan Wellness. Payments are routed through secure external providers.
              </p>
              <div className="payment-alert" role="note">
                <strong>Important:</strong>
                <span> Pay only against a verified booking or invoice ID shared by the team.</span>
              </div>
            </div>

            <aside className="payment-summary-card" aria-label="Selected booking summary">
              <span>Selected program</span>
              <h2>{selectedProgram.name}</h2>
              <dl>
                <div>
                  <dt>Duration</dt>
                  <dd>{selectedProgram.duration}</dd>
                </div>
                <div>
                  <dt>Payment for</dt>
                  <dd>{paymentType}</dd>
                </div>
                <div>
                  <dt>Currency</dt>
                  <dd>{currency}</dd>
                </div>
                <div>
                  <dt>Amount</dt>
                  <dd>Final invoice amount</dd>
                </div>
              </dl>
              <p>{selectedProgram.focus}</p>
            </aside>
          </div>
        </section>

        <section className="section checkout-section" aria-labelledby="checkout-title">
          <div className="container checkout-grid">
            <form className="checkout-form" data-veda-form="Payment verification" onSubmit={handleSubmit}>
              <div>
                <p className="eyebrow">Payment details</p>
                <h2 id="checkout-title">Booking verification</h2>
              </div>

              <div className="form-grid">
                <div className="form-row">
                  <label htmlFor="booking-id">Booking / invoice ID</label>
                  <input
                    id="booking-id"
                    name="booking-id"
                    value={bookingId}
                    onChange={(event) => setBookingId(event.target.value)}
                    placeholder="SW-2026-..."
                    required
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="guest-email">Guest email</label>
                  <input id="guest-email" name="guest-email" type="email" placeholder="name@email.com" required />
                </div>
              </div>

              <div className="form-grid">
                <div className="form-row">
                  <label htmlFor="program">Program</label>
                  <select
                    id="program"
                    name="program"
                    value={programSlug}
                    onChange={(event) => setProgramSlug(event.target.value)}
                  >
                    {programs.map((program) => (
                      <option value={program.slug} key={program.slug}>
                        {program.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-row">
                  <label htmlFor="payment-type">Payment type</label>
                  <select
                    id="payment-type"
                    name="payment-type"
                    value={paymentType}
                    onChange={(event) => setPaymentType(event.target.value)}
                  >
                    {paymentTypes.map((type) => (
                      <option key={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-grid">
                <div className="form-row">
                  <label htmlFor="currency">Preferred currency</label>
                  <select id="currency" name="currency" value={currency} onChange={(event) => setCurrency(event.target.value)}>
                    <option>USD</option>
                    <option>GBP</option>
                    <option>CAD</option>
                    <option>EUR</option>
                    <option>INR</option>
                  </select>
                </div>
                <div className="form-row">
                  <label htmlFor="invoice-amount">Invoice amount</label>
                  <input id="invoice-amount" name="invoice-amount" value="Loaded from secure invoice" readOnly />
                </div>
              </div>

              <fieldset className="payment-method-picker">
                <legend>Choose payment method</legend>
                {paymentMethods.map((item) => (
                  <label className={method === item.id ? "active" : undefined} key={item.id}>
                    <input
                      type="radio"
                      name="payment-method"
                      value={item.id}
                      checked={method === item.id}
                      onChange={(event) => setMethod(event.target.value)}
                    />
                    <span>{item.title}</span>
                    <p>{item.copy}</p>
                  </label>
                ))}
              </fieldset>

              <label className="checkbox-row">
                <input
                  type="checkbox"
                  name="terms-accepted"
                  checked={accepted}
                  onChange={(event) => setAccepted(event.target.checked)}
                  required
                />
                <span>
                  I confirm my program, invoice and retreat terms are correct, and I understand this is
                  a wellness retreat booking, not medical care.
                </span>
              </label>

              <button className="button button-primary" type="submit" disabled={!canContinue}>
                Continue to secure payment
              </button>
              <p className="payment-status" role="status">
                {status || "Card details are entered only on the secure payment provider page."}
              </p>
            </form>

            <aside className="checkout-side-panel" aria-label="Checkout assurance">
              <span>How this works</span>
              <ol>
                <li>
                  <strong>Program page passes context</strong>
                  <p>
                    Each program CTA can link here with a program slug, for example
                    <code> /payment?program=28-day-inner-awakening</code>.
                  </p>
                </li>
                <li>
                  <strong>Booking ID verifies amount</strong>
                  <p>
                    The final amount should come from CRM or invoice data, not from editable page text.
                  </p>
                </li>
                <li>
                  <strong>Gateway takes the payment</strong>
                  <p>
                    Stripe, Wise or the approved provider handles money movement and card/bank details.
                  </p>
                </li>
              </ol>
              <nav aria-label="Payment legal documents">
                {legalLinks.map((item) => (
                  <Link href={item.href} key={item.href}>
                    {item.label}
                  </Link>
                ))}
              </nav>
            </aside>
          </div>
        </section>

        <section className="section payment-support-section" aria-labelledby="payment-support-title">
          <div className="container payment-support-grid">
            <div>
              <p className="eyebrow light">Payment support</p>
              <h2 id="payment-support-title">Need help before paying?</h2>
              <p>
                International payments can involve currency, transfer limits and invoice questions. The
                team should support guests before money is collected.
              </p>
            </div>
            <div className="payment-terms-card">
              <p>
                Email <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> with your booking
                ID, program name and preferred currency.
              </p>
              <Link className="button button-light" href="/contact">
                Contact payment support
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
