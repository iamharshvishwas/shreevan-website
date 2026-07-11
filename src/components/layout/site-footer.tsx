"use client";

import Image from "next/image";
import Link from "next/link";
import type { SVGProps } from "react";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { usePublicSiteSettings } from "@/components/site/public-settings-provider";

type SocialIconProps = SVGProps<SVGSVGElement>;

function InstagramIcon(props: SocialIconProps) {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" {...props}>
      <rect height="16.5" rx="5" stroke="currentColor" strokeWidth="1.8" width="16.5" x="3.75" y="3.75" />
      <circle cx="12" cy="12" r="3.7" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17" cy="7" fill="currentColor" r="1.1" />
    </svg>
  );
}

function FacebookIcon(props: SocialIconProps) {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" {...props}>
      <path
        d="M14.4 8.15h2.1V4.85c-.55-.08-1.72-.2-3.02-.2-3.03 0-5.02 1.82-5.02 5.13v2.2H5.4v3.67h3.06v5.7h3.78v-5.7h3.14l.5-3.67h-3.64v-1.83c0-1.32.47-2 2.16-2Z"
        fill="currentColor"
      />
    </svg>
  );
}

function YoutubeIcon(props: SocialIconProps) {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" {...props}>
      <rect height="13" rx="4" stroke="currentColor" strokeWidth="1.8" width="18" x="3" y="5.5" />
      <path d="m10.4 9.1 5.05 2.9-5.05 2.9V9.1Z" fill="currentColor" />
    </svg>
  );
}

function XIcon(props: SocialIconProps) {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" {...props}>
      <path
        d="m5.1 4.8 5.55 7.28L4.8 19.2h2.64l4.45-5.41 4.12 5.41h4.89l-5.86-7.7 5.47-6.7h-2.62l-4.07 4.98-3.8-4.98H5.1Zm3.02 1.54h1.14l8.6 11.32h-1.13L8.12 6.34Z"
        fill="currentColor"
      />
    </svg>
  );
}

function LinkedinIcon(props: SocialIconProps) {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" {...props}>
      <path d="M6.4 9.2h3.1v9.9H6.4V9.2Zm1.55-4.9a1.8 1.8 0 1 1 0 3.6 1.8 1.8 0 0 1 0-3.6Zm3.35 4.9h2.97v1.35h.04c.42-.8 1.43-1.65 2.95-1.65 3.15 0 3.74 2.08 3.74 4.78v5.42h-3.1v-4.8c0-1.15-.02-2.63-1.6-2.63-1.6 0-1.85 1.25-1.85 2.55v4.88H11.3V9.2Z" fill="currentColor" />
    </svg>
  );
}

function TrustpilotIcon(props: SocialIconProps) {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" {...props}>
      <path
        d="m12 3.8 2.08 4.58 4.98.56-3.69 3.38.99 4.92L12 14.73l-4.36 2.51.99-4.92-3.69-3.38 4.98-.56L12 3.8Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function TripadvisorIcon(props: SocialIconProps) {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" {...props}>
      <path d="M4.2 8.5A12.8 12.8 0 0 1 12 6a12.8 12.8 0 0 1 7.8 2.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
      <circle cx="8.2" cy="12.5" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="15.8" cy="12.5" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="8.2" cy="12.5" fill="currentColor" r="1.2" />
      <circle cx="15.8" cy="12.5" fill="currentColor" r="1.2" />
      <path d="M10.8 16.2 12 18l1.2-1.8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
    </svg>
  );
}

function phoneHref(value: string) {
  const normalized = value.replace(/[^\d+]/g, "");

  return normalized ? `tel:${normalized}` : "";
}

function whatsappHref(value: string) {
  if (value.startsWith("http")) {
    return value;
  }

  const normalized = value.replace(/[^\d]/g, "");

  return normalized ? `https://wa.me/${normalized}` : "";
}

export function SiteFooter() {
  const settings = usePublicSiteSettings();
  const phoneLink = settings.contact.phone ? phoneHref(settings.contact.phone) : "";
  const whatsappLink = settings.contact.whatsapp ? whatsappHref(settings.contact.whatsapp) : "";
  const socialLinks = [
    { label: "Instagram", href: settings.social.instagram, Icon: InstagramIcon },
    { label: "Facebook", href: settings.social.facebook, Icon: FacebookIcon },
    { label: "YouTube", href: settings.social.youtube, Icon: YoutubeIcon },
    { label: "X", href: settings.social.x, Icon: XIcon },
    { label: "LinkedIn", href: settings.social.linkedin, Icon: LinkedinIcon },
    { label: "Trustpilot", href: settings.social.trustpilot, Icon: TrustpilotIcon },
    { label: "Tripadvisor", href: settings.social.tripadvisor, Icon: TripadvisorIcon },
  ].filter((item) => Boolean(item.href));

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand-block">
          <Image src={siteConfig.logos.markOnForest} alt="Shreevan Wellness" width={160} height={160} />
          <p>{settings.brand.tagline}</p>
          <span>{settings.brand.location}</span>
          {socialLinks.length ? (
            <div aria-label="Follow Shreevan Wellness" className="footer-social-links">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  aria-label={`Follow Shreevan Wellness on ${label}`}
                  className="footer-social-link"
                  href={href}
                  key={label}
                  rel="noopener noreferrer"
                  target="_blank"
                  title={label}
                >
                  <Icon height={20} width={20} />
                </a>
              ))}
            </div>
          ) : null}
        </div>

        {settings.navigation.footerColumns.slice(0, 3).map((column) => (
          <nav aria-label={`${column.title} footer navigation`} key={column.id}>
            <h2>{column.title}</h2>
            {column.links.map((route) => (
              <Link href={route.href} key={route.id}>
                {route.label}
              </Link>
            ))}
          </nav>
        ))}

        <div className="footer-stack">
          <div className="footer-contact-block">
            <h2>Contact</h2>
            <a className="footer-contact-link" href={`mailto:${settings.contact.email}`}>
              <Mail aria-hidden="true" size={18} strokeWidth={1.8} />
              <span>{settings.contact.email}</span>
            </a>
            {phoneLink ? (
              <a className="footer-contact-link" href={phoneLink}>
                <Phone aria-hidden="true" size={18} strokeWidth={1.8} />
                <span>{settings.contact.phone}</span>
              </a>
            ) : null}
            {whatsappLink ? (
              <a className="footer-contact-link" href={whatsappLink} rel="noopener noreferrer" target="_blank">
                <MessageCircle aria-hidden="true" size={18} strokeWidth={1.8} />
                <span>WhatsApp us</span>
              </a>
            ) : null}
          </div>

          {settings.navigation.footerColumns.slice(3).map((column) => (
            <nav aria-label={`${column.title} footer navigation`} key={column.id}>
              <h2>{column.title}</h2>
              {column.links.map((route) => (
                <Link href={route.href} key={route.id}>
                  {route.label}
                </Link>
              ))}
            </nav>
          ))}
        </div>
      </div>
    </footer>
  );
}
