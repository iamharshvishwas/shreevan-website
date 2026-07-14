import Image from "next/image";
import Link from "next/link";
import { CalendarDays, CheckCircle2, Clock3, IndianRupee, MapPin, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import { SawanRetreatForm, SawanWhatsAppLink } from "@/components/campaigns/sawan-retreat-form";
import { siteConfig } from "@/config/site";

type CampaignVideo = {
  mp4: string;
  webm?: string;
  poster: string;
};

const phoneNumber = "+91 91155 17667";
const isSawanBookingClosed = () => new Date() >= new Date("2026-08-30T18:30:00.000Z");

function getHeroVideo(): CampaignVideo | null {
  return null;
}

function SawanMediaFrame({
  eyebrow,
  title,
  copy,
  variant = "landscape",
}: Readonly<{
  eyebrow: string;
  title: string;
  copy: string;
  variant?: "landscape" | "portrait" | "wide";
}>) {
  return (
    <div className={`sawan-media-frame sawan-media-frame-${variant}`} role="img" aria-label={`${title} media placeholder`}>
      <div>
        <span>{eyebrow}</span>
        <strong>{title}</strong>
        <p>{copy}</p>
      </div>
    </div>
  );
}

function SawanCampaignImage({
  src,
  alt,
  variant = "landscape",
  priority = false,
}: Readonly<{
  src: string;
  alt: string;
  variant?: "landscape" | "portrait" | "wide";
  priority?: boolean;
}>) {
  return (
    <div
      className={`sawan-media-frame sawan-media-frame-${variant}`}
      style={{ background: "var(--white)", borderStyle: "solid", padding: 0, position: "relative" }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={
          variant === "portrait"
            ? "(max-width: 720px) 100vw, (max-width: 1100px) 42vw, 28vw"
            : "(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 34vw"
        }
        style={{ objectFit: "cover" }}
      />
    </div>
  );
}

function SawanCampaignHeader() {
  return (
    <header className="sawan-campaign-header" aria-label="Sawan retreat campaign header">
      <div className="container sawan-campaign-header-inner">
        <Link className="sawan-campaign-logo" href="/sawan-shiv-sadhana-retreat" aria-label="Shreevan Wellness Sawan Retreat">
          <Image
            src={siteConfig.logos.horizontalLockup}
            alt="Shreevan Wellness"
            width={626}
            height={160}
            priority
          />
        </Link>
        <div className="sawan-campaign-contact" aria-label="Booking contact">
          <a href="tel:+919115517667">
            <Phone aria-hidden="true" size={18} />
            {phoneNumber}
          </a>
          <SawanWhatsAppLink className="button button-primary sawan-header-whatsapp" label="Header_WhatsAppClick">
            <MessageCircle aria-hidden="true" size={18} />
            WhatsApp
          </SawanWhatsAppLink>
        </div>
      </div>
    </header>
  );
}

function SawanCampaignFooter() {
  return (
    <footer className="sawan-campaign-footer">
      <div className="container sawan-campaign-footer-inner">
        <div>
          <Image
            src={siteConfig.logos.avatar}
            alt=""
            width={72}
            height={72}
            loading="lazy"
          />
          <p>Shreevan Wellness</p>
          <span>Rishikesh, India</span>
        </div>
        <nav aria-label="Campaign legal links">
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms-conditions">Terms & Conditions</Link>
          <Link href="/refund-policy">Refund Policy</Link>
          <Link href="/wellness-disclaimer">Wellness Disclaimer</Link>
        </nav>
        <address>
          <a href="tel:+919115517667">{phoneNumber}</a>
          <SawanWhatsAppLink className="text-link" label="Footer_WhatsAppClick">
            WhatsApp for booking details
          </SawanWhatsAppLink>
          <a href="mailto:contact@shreevanwellness.com">contact@shreevanwellness.com</a>
        </address>
      </div>
    </footer>
  );
}

const facts = [
  { icon: Clock3, label: "Duration", value: "3 Nights / 4 Days" },
  { icon: CalendarDays, label: "Dates", value: "30 July - 30 August" },
  { icon: IndianRupee, label: "Starting from", value: "₹21,000 only" },
  { icon: MapPin, label: "Location", value: "Rishikesh, India" },
];

const highlights = [
  {
    title: "Daily Shivling Rudra Abhishek",
    copy: "A guided devotional ritual rhythm for guests who want to participate respectfully during Sawan.",
  },
  {
    title: "Rudri Path and Shri Rudram Chanting",
    copy: "Structured mantra participation with guidance, pacing and clear expectations for beginners.",
  },
  {
    title: "Guided Meditation and Silence",
    copy: "Simple meditation and quiet reflection blocks to help guests settle into the retreat rhythm.",
  },
  {
    title: "Ganga Aarti Darshan",
    copy: "An evening devotional experience connected to Rishikesh and the sacred banks of Maa Ganga.",
  },
  {
    title: "Sattvik Yogic Meals",
    copy: "Simple vegetarian meals planned to support a calm, devotional and retreat-focused stay.",
  },
  {
    title: "Nature and Self-Reflection",
    copy: "Time for journaling, mindful walks and guided reflection without making forced promises.",
  },
  {
    title: "Comfortable Stay",
    copy: "Accommodation details, room type and availability are confirmed clearly before payment.",
  },
];

const highlightMediaSlots = [
  {
    title: "Rudra Abhishek / Shivling ritual moment",
    alt: "Guest performing a respectful Rudra Abhishek ritual at the Shreevan Wellness retreat in Rishikesh",
    src: "/images/campaigns/sawan-shiv-sadhana/rudra-abhishek.webp",
  },
  {
    title: "Guided meditation and silence practice",
    alt: "Small guided meditation group seated together in a Himalayan retreat setting",
    src: "/images/campaigns/sawan-shiv-sadhana/guided-meditation-group.webp",
  },
  {
    title: "Ganga Aarti / Rishikesh context",
    alt: "Guests attending an evening Ganga Aarti on the riverbank in Rishikesh",
    src: "/images/campaigns/sawan-shiv-sadhana/ganga-aarti-rishikesh.webp",
  },
];

const rhythm = [
  {
    day: "Day 1",
    title: "Arrival and grounding",
    copy: "Arrival, welcome, settling into the stay, retreat orientation and a simple evening grounding practice.",
  },
  {
    day: "Day 2",
    title: "Devotional practice",
    copy: "Morning Sadhana, Rudra Abhishek, chanting, sattvik meals, guided meditation and evening Ganga Aarti.",
  },
  {
    day: "Day 3",
    title: "Silence and reflection",
    copy: "Practice rhythm, mantra, guided silence, nature time and simple self-reflection without overloading the day.",
  },
  {
    day: "Day 4",
    title: "Integration and departure",
    copy: "Closing practice, practical integration guidance and departure as per the final confirmed schedule.",
  },
];

const goodFit = [
  "You want a short Sawan spiritual retreat in Rishikesh.",
  "You are interested in Shiva devotion, chanting, meditation or Ganga Aarti.",
  "You prefer a guided environment instead of arranging rituals and stay separately.",
  "You are comfortable with simple sattvik living and a structured daily rhythm.",
  "You want a calm spiritual break from work, noise or daily pressure.",
];

const notFit = [
  "You are looking only for sightseeing or luxury tourism.",
  "You are not comfortable with devotional or spiritual practices.",
  "You expect medical, psychological or guaranteed spiritual outcomes.",
  "You need urgent mental health, medical or emergency support.",
];

const careItems = [
  "Comfortable stay clarity before confirmation",
  "Sattvik meals during the retreat",
  "Guided devotional practice environment",
  "Rishikesh setting near the Ganga retreat rhythm",
  "Pre-arrival communication before payment",
];

const faqs = [
  {
    question: "What is included in the Shiv Sadhana Retreat?",
    answer:
      "The retreat includes a guided 3 nights / 4 days devotional stay experience with Shivling Rudra Abhishek, Rudri Path or Shri Rudram chanting, guided meditation, silence practice, Ganga Aarti experience, sattvik meals and comfortable stay. Final room category, date availability and package details are confirmed before booking.",
  },
  {
    question: "Is this suitable for beginners?",
    answer:
      "Yes, beginners can enquire. The retreat is designed as a guided devotional experience, so prior expertise in mantra chanting, meditation or ritual practice is not required. Guests should be open to simple spiritual discipline, sattvik food, group rhythm and respectful participation.",
  },
  {
    question: "Do I need prior mantra or meditation experience?",
    answer:
      "No prior experience is required. The practices are introduced in a guided way. If you are completely new, you can participate at a comfortable pace and ask questions before confirming your booking.",
  },
  {
    question: "Is accommodation included?",
    answer:
      "Accommodation is part of the retreat package, but final room type and availability should be confirmed with the team before payment. The stay is intended to be simple, comfortable and aligned with the retreat rhythm.",
  },
  {
    question: "Are meals included?",
    answer:
      "Yes, sattvik meals are part of the retreat experience. The food is planned to support a simple devotional retreat rhythm. If you have dietary restrictions or allergies, you should mention them before booking.",
  },
  {
    question: "Is this a medical or healing treatment?",
    answer:
      "No. This retreat is not a medical treatment, therapy, diagnosis, detox program or guaranteed healing experience. It is a spiritual wellness retreat built around devotional practice, meditation, reflection, sattvik food and guided retreat structure.",
  },
  {
    question: "How do I book my slot?",
    answer:
      "The fastest way is to WhatsApp the team at +91 91155 17667. You can ask for available dates, room details, package confirmation and payment next steps. Booking should be confirmed only after your preferred dates and package details are clear.",
  },
  {
    question: "Can I speak to someone before paying?",
    answer:
      "Yes. You should speak to the team before payment. The retreat is suitability-led, so date availability, room details, inclusions and any personal questions can be clarified first.",
  },
];

export const sawanRetreatFaqs = faqs;

export function SawanShivSadhanaPage() {
  const bookingClosed = isSawanBookingClosed();
  const heroVideo = getHeroVideo();

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SawanCampaignHeader />
      <main id="main" className="sawan-page">
        <section className="sawan-hero" aria-labelledby="sawan-title">
          <div className="container sawan-hero-grid">
            <div className="sawan-hero-copy">
              <p className="eyebrow">Sawan Special Retreat in Rishikesh</p>
              <h1 id="sawan-title">Shiv Sadhana Retreat</h1>
              <p className="sawan-hero-lede">
                A 3 nights / 4 days guided devotional retreat with Rudra Abhishek, Shri Rudram chanting,
                meditation, Ganga Aarti, sattvik meals and quiet stay in Rishikesh.
              </p>
              <div className="sawan-hero-actions">
                <SawanWhatsAppLink className="button button-primary" label="Hero_WhatsAppClick">
                  <MessageCircle aria-hidden="true" size={20} />
                  WhatsApp for Booking Details
                </SawanWhatsAppLink>
                <a className="button button-secondary" href="#retreat-highlights">
                  View Retreat Highlights
                </a>
              </div>
              <p className="sawan-trust-note">
                Final date availability, room type and package details are confirmed before payment.
              </p>
            </div>
            <div className="sawan-hero-card" aria-label="Retreat key facts">
              {heroVideo ? (
                <video
                  aria-label="Short preview of the Sawan Shiv Sadhana Retreat experience"
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster={heroVideo.poster}
                  preload="metadata"
                >
                  {heroVideo.webm ? <source src={heroVideo.webm} type="video/webm" /> : null}
                  <source src={heroVideo.mp4} type="video/mp4" />
                </video>
              ) : (
                <SawanCampaignImage
                  src="/images/campaigns/sawan-shiv-sadhana/hero-shiv-sadhana-retreat.webp"
                  alt="Guest in quiet meditation beside a Shivling at a Rishikesh retreat overlooking the Ganga"
                  variant="portrait"
                  priority
                />
              )}
            </div>
          </div>
          <div className="container sawan-fact-grid" aria-label="Retreat details">
            {facts.map(({ icon: Icon, label, value }) => (
              <div className="sawan-fact" key={label}>
                <Icon aria-hidden="true" size={22} strokeWidth={1.9} />
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="section sawan-sawan-section" aria-labelledby="why-sawan-title">
          <div className="container sawan-split">
            <div>
              <p className="eyebrow">Why Sawan</p>
              <h2 id="why-sawan-title">A short retreat for devotion, rhythm and reflection</h2>
            </div>
            <div className="sawan-reading-card">
              <p>
                Sawan is traditionally observed as a sacred period for Shiva devotion, inner discipline and
                simple spiritual practice. This retreat creates a guided way to participate through daily ritual,
                mantra, meditation, silence, sattvik meals and time in Rishikesh near Maa Ganga.
              </p>
              <p>
                The experience is devotional and structured, but not extreme. It is designed for guests who want
                a clear retreat rhythm, practical care and transparent booking details before they travel.
              </p>
              <SawanWhatsAppLink className="text-link sawan-text-cta" label="WhySawan_WhatsAppClick">
                Ask if this retreat suits you
              </SawanWhatsAppLink>
            </div>
          </div>
        </section>

        <section className="section sawan-highlights-section" id="retreat-highlights" aria-labelledby="highlights-title">
          <div className="container">
            <div className="section-heading centered">
              <p className="eyebrow">Retreat Highlights</p>
              <h2 id="highlights-title">What the Sawan retreat includes</h2>
              <p>
                Each element is included to create a simple devotional rhythm, not to make exaggerated spiritual
                or medical promises.
              </p>
            </div>
            <div className="sawan-media-strip" aria-label="Retreat media slots">
              {highlightMediaSlots.map((slot) => (
                <SawanCampaignImage key={slot.title} {...slot} />
              ))}
            </div>
            <div className="sawan-highlight-grid">
              {highlights.map((item) => (
                <article className="sawan-highlight-card" key={item.title}>
                  <CheckCircle2 aria-hidden="true" size={24} strokeWidth={1.8} />
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section sawan-rhythm-section" aria-labelledby="rhythm-title">
          <div className="container sawan-rhythm-grid">
            <div>
              <p className="eyebrow light">4-Day Flow</p>
              <h2 id="rhythm-title">What your 4 days may look like</h2>
              <p>
                The final schedule may vary slightly based on date, group size and local arrangements. The core
                rhythm remains simple: arrival, devotional practice, meditation, reflection, meals and rest.
              </p>
              <SawanMediaFrame
                eyebrow="Video slot"
                title="4-day retreat rhythm preview"
                copy="Use a short vertical-to-horizontal edit showing arrival, practice space, meal, quiet walk and Ganga context."
              />
            </div>
            <div className="sawan-timeline">
              {rhythm.map((item) => (
                <article key={item.day}>
                  <span>{item.day}</span>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section sawan-fit-section" aria-labelledby="fit-title">
          <div className="container">
            <div className="section-heading centered">
              <p className="eyebrow">Suitability</p>
              <h2 id="fit-title">Check if this retreat is the right fit</h2>
            </div>
            <div className="sawan-fit-grid">
              <article>
                <h3>This may suit you if</h3>
                <ul>
                  {goodFit.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
              <article className="sawan-boundary-card">
                <h3>This may not suit you if</h3>
                <ul>
                  {notFit.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section className="section sawan-care-section" aria-labelledby="care-title">
          <div className="container sawan-care-grid">
            <div>
              <p className="eyebrow">Stay, Food and Care</p>
              <h2 id="care-title">Simple support before you confirm</h2>
              <p>
                The retreat is designed to feel simple, clean and supported. Accommodation, meals and daily
                rhythm are explained before confirmation so guests know what to expect before they travel.
              </p>
              <ul className="sawan-care-list">
                {careItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="sawan-poster-stack">
              <SawanMediaFrame
                eyebrow="Image slot"
                title="Comfortable stay / room clarity"
                copy="Show the actual room, bedding, bathroom standard or stay environment that guests can expect before payment."
                variant="portrait"
              />
              <SawanCampaignImage
                src="/images/campaigns/sawan-shiv-sadhana/sattvik-meal-care.webp"
                alt="Sattvik vegetarian meal served with care at the Shreevan Wellness retreat"
                variant="portrait"
              />
            </div>
          </div>
        </section>

        <section className="section sawan-responsible-section" aria-labelledby="responsible-title">
          <div className="container sawan-responsible-panel">
            <ShieldCheck aria-hidden="true" size={34} strokeWidth={1.8} />
            <div>
              <p className="eyebrow light">Responsible Spiritual Wellness</p>
              <h2 id="responsible-title">Devotional practice, not medical treatment</h2>
              <div className="sawan-proof-grid" aria-label="Retreat credibility proof to verify before launch">
                {/* [INSERT VERIFIED DATA] Replace these placeholders only with documented founder credentials, operating history, ratings or testimonials. */}
                <article>
                  <span>Facilitator</span>
                  <strong>Led by Dr. Isha Dutta</strong>
                  <p>[INSERT VERIFIED CREDENTIAL LINE]</p>
                </article>
                <article>
                  <span>Retreat history</span>
                  <strong>[INSERT VERIFIED DATA]</strong>
                  <p>Years operating or retreats hosted count.</p>
                </article>
                <article>
                  <span>Guest proof</span>
                  <strong>[INSERT VERIFIED DATA]</strong>
                  <p>Google rating badge or short verified testimonial quote.</p>
                </article>
              </div>
              <p>
                Shreevan Wellness presents this as a devotional spiritual wellness retreat, not as medical
                treatment, therapy, diagnosis, detox or guaranteed healing. Practices such as chanting,
                meditation, ritual participation and silence may support reflection and calm, but they do not
                replace medical care, therapy, medication or professional advice.
              </p>
            </div>
          </div>
        </section>

        <section className="section sawan-booking-section" id="booking" aria-labelledby="booking-title">
          <div className="container sawan-booking-grid">
            <div className="sawan-price-card">
              <p className="eyebrow">Booking Details</p>
              <h2 id="booking-title">
                {bookingClosed ? "This Sawan batch is now closed" : "Reserve your Sawan retreat slot"}
              </h2>
              <div className="sawan-price">{bookingClosed ? "Next dates by request" : "Starts from ₹21,000 only"}</div>
              <p className="sawan-urgency-line">
                {bookingClosed
                  ? "This Sawan batch is now closed — message us about the next available dates."
                  : "Sawan retreat batches run only until 30 August."}
              </p>
              <ul>
                <li>3 Nights / 4 Days</li>
                <li>Available between 30 July - 30 August</li>
                <li>Rishikesh, India</li>
                <li>Date availability and stay details confirmed before payment</li>
              </ul>
              <SawanWhatsAppLink className="button button-primary" label="PriceSection_WhatsAppClick">
                WhatsApp +91 91155 17667
              </SawanWhatsAppLink>
            </div>
            <div className="sawan-form-card">
              <p className="eyebrow">Request Details</p>
              <h2>Ask before you book</h2>
              <p>
                {bookingClosed
                  ? "Share a few details and the team will guide you toward the next available dates."
                  : "Share a few details and the team will confirm availability, stay details, inclusions and next booking steps."}
              </p>
              <SawanRetreatForm />
            </div>
          </div>
        </section>

        <section className="section sawan-faq-section" aria-labelledby="sawan-faq-title">
          <div className="container">
            <div className="section-heading centered">
              <p className="eyebrow">Questions Before Booking</p>
              <h2 id="sawan-faq-title">Clear answers for first-time guests</h2>
            </div>
            <div className="faq-list">
              {faqs.map((faq) => (
                <details key={faq.question}>
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
            <div className="sawan-faq-cta">
              <SawanWhatsAppLink className="button button-secondary" label="FAQ_WhatsAppClick">
                Ask a booking question on WhatsApp
              </SawanWhatsAppLink>
            </div>
          </div>
        </section>

        <section className="section sawan-final-section" aria-labelledby="final-title">
          <div className="container sawan-final-panel">
            <div>
              <p className="eyebrow light">Sawan Special</p>
              <h2 id="final-title">
                {bookingClosed
                  ? "This Sawan batch is now closed — message us about the next available dates."
                  : "Spend Sawan in a guided rhythm of devotion, silence and reflection."}
              </h2>
              <p>
                {bookingClosed
                  ? "Saved links and shared posts can still help you reach the team for the next retreat window."
                  : "Booking window closes with Sawan on 30 August. If the dates, practice and stay feel aligned, message the team and confirm whether this retreat is suitable for you."}
              </p>
            </div>
            <div className="sawan-final-actions">
              <SawanWhatsAppLink className="button button-light" label="FinalCTA_WhatsAppClick">
                {bookingClosed ? "Ask for next retreat dates" : "Book your Sawan retreat slot"}
              </SawanWhatsAppLink>
              <Link className="button button-secondary" href="/contact">
                Ask questions before booking
              </Link>
            </div>
          </div>
        </section>
      </main>
      <div className="sawan-sticky-cta">
        <SawanWhatsAppLink className="button button-primary" label="StickyMobile_WhatsAppClick">
          WhatsApp for retreat details
        </SawanWhatsAppLink>
      </div>
      <SawanCampaignFooter />
    </>
  );
}
