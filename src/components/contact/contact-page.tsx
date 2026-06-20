import Link from "next/link";
import { ContactEnquiryForm } from "@/components/forms/contact-enquiry-form";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { siteConfig } from "@/config/site";

const contactChannels = [
  {
    label: "Email",
    title: siteConfig.email,
    copy: "Best for retreat questions, collaboration enquiries and details you want answered carefully.",
    href: `mailto:${siteConfig.email}`,
    action: "Email Shreevan",
  },
  {
    label: "Consultation",
    title: "Free suitability call",
    copy: "Best if you are considering a retreat and want help choosing the right program depth.",
    href: "/book-consultation",
    action: "Book consultation",
  },
  {
    label: "WhatsApp",
    title: "Official WhatsApp before launch",
    copy: "Add the verified WhatsApp Business number here once the support workflow is connected.",
    href: "#contact-form",
    action: "Use enquiry form",
  },
];

const visitorQuestions = [
  ["Where exactly is the retreat?", "Rishikesh, Uttarakhand, India. The exact stay address should be shared with confirmed guests after suitability and booking steps."],
  ["Can international guests ask travel questions?", "Yes. Use the enquiry form for arrival windows, airport transfer guidance, room comfort, food suitability and packing questions."],
  ["Should I send health details here?", "No. Keep this form general. Sensitive suitability questions should be handled through the consultation process."],
];

const responseStandards = [
  "Enquiries are reviewed by a real person, not treated as an instant booking commitment.",
  "International guests should mention country, preferred dates and program interest.",
  "Medical emergencies or urgent health questions should go to qualified local services, not this website.",
];

export function ContactPage() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />

      <main id="main">
        <section className="section contact-hero" aria-labelledby="contact-title">
          <div className="container contact-hero-grid">
            <div>
              <p className="eyebrow">Contact us</p>
              <h1 id="contact-title">Begin with a clear, calm conversation</h1>
              <p className="hero-lede">
                Whether you are exploring a retreat from the US, Canada, the UK or India, write to us
                with your context. We will help you understand next steps without pressure or fake urgency.
              </p>
              <div className="hero-actions">
                <Link className="button button-primary" href="/book-consultation">
                  Book consultation
                </Link>
                <a className="button button-secondary" href={`mailto:${siteConfig.email}`}>
                  Email us
                </a>
              </div>
            </div>

            <aside className="contact-summary" aria-label="Contact summary">
              <span>{siteConfig.location}</span>
              <p>
                Premium structured wellness retreats on the sacred banks of Maa Ganga in Rishikesh,
                India.
              </p>
              <dl>
                <div>
                  <dt>Primary email</dt>
                  <dd>
                    <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
                  </dd>
                </div>
                <div>
                  <dt>Best next step</dt>
                  <dd>Book a suitability call before travel or payment.</dd>
                </div>
              </dl>
            </aside>
          </div>
        </section>

        <section className="section contact-channels-section" aria-labelledby="channels-title">
          <div className="container">
            <div className="section-heading split-heading">
              <div>
                <p className="eyebrow">Choose the right channel</p>
                <h2 id="channels-title">Different questions need different paths</h2>
              </div>
              <p>
                Keep the first step simple. Serious retreat fit questions should move toward a
                consultation, while logistics can begin by email or the form below.
              </p>
            </div>

            <div className="contact-channel-grid">
              {contactChannels.map((channel) => (
                <article key={channel.label}>
                  <span>{channel.label}</span>
                  <h3>{channel.title}</h3>
                  <p>{channel.copy}</p>
                  <Link className="text-link" href={channel.href}>
                    {channel.action}
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section location-section" aria-labelledby="location-title">
          <div className="container location-grid">
            <div className="image-slot map-slot">
              <span>Map slot</span>
              <p>Rishikesh location map, approach route or verified geolocation embed</p>
            </div>
            <div>
              <p className="eyebrow">Rishikesh location clarity</p>
              <h2 id="location-title">Make the place easy to understand before someone travels</h2>
              <p>
                International visitors need practical confidence: nearest airport, transfer options,
                arrival windows, local support and what details are shared before booking.
              </p>
              <div className="location-details">
                <article>
                  <h3>General location</h3>
                  <p>Rishikesh, Uttarakhand, India, near the spiritual landscape of Maa Ganga.</p>
                </article>
                <article>
                  <h3>Exact stay address</h3>
                  <p>Share only after suitability, booking and guest communication steps are complete.</p>
                </article>
                <article>
                  <h3>Map integration</h3>
                  <p>Connect a verified Google Maps embed or custom geolocation block before launch.</p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="section visitor-section" aria-labelledby="visitor-title">
          <div className="container visitor-grid">
            <div>
              <p className="eyebrow">Before you write</p>
              <h2 id="visitor-title">Useful answers for serious visitors</h2>
            </div>
            <div className="visitor-question-list">
              {visitorQuestions.map(([title, copy]) => (
                <article key={title}>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section contact-form-section" id="contact-form" aria-labelledby="contact-form-title">
          <div className="container contact-form-shell">
            <div>
              <p className="eyebrow light">General enquiry</p>
              <h2 id="contact-form-title">Send a short note and the team can route it properly</h2>
              <p>
                This is for general contact, logistics and partnership questions. For program suitability,
                the consultation path is still the cleaner conversion flow.
              </p>
              <ul className="response-standards">
                {responseStandards.map((standard) => (
                  <li key={standard}>{standard}</li>
                ))}
              </ul>
            </div>
            <ContactEnquiryForm />
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
