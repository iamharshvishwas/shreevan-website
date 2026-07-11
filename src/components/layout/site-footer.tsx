"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { usePublicSiteSettings } from "@/components/site/public-settings-provider";
import { SocialIcon, type SocialIconName } from "@/components/social/social-icons";

type SocialLink = { label: string; href: string; icon: SocialIconName };

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
  const allSocialLinks: SocialLink[] = [
    { label: "Instagram", href: settings.social.instagram, icon: "instagram" },
    { label: "Facebook", href: settings.social.facebook, icon: "facebook" },
    { label: "YouTube", href: settings.social.youtube, icon: "youtube" },
    { label: "X", href: settings.social.x, icon: "x" },
    { label: "LinkedIn", href: settings.social.linkedin, icon: "linkedin" },
    { label: "Trustpilot", href: settings.social.trustpilot, icon: "trustpilot" },
    { label: "Tripadvisor", href: settings.social.tripadvisor, icon: "tripadvisor" },
  ];
  const socialLinks = allSocialLinks.filter((item) => Boolean(item.href));

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand-block">
          <Image src={siteConfig.logos.markOnForest} alt="Shreevan Wellness" width={160} height={160} />
          <p>{settings.brand.tagline}</p>
          <span>{settings.brand.location}</span>
          {socialLinks.length ? (
            <div aria-label="Follow Shreevan Wellness" className="footer-social-links">
              {socialLinks.map(({ label, href, icon }) => (
                <a
                  aria-label={`Follow Shreevan Wellness on ${label}`}
                  className="footer-social-link"
                  href={href}
                  key={label}
                  rel="noopener noreferrer"
                  target="_blank"
                  title={label}
                >
                  <SocialIcon height={20} name={icon} width={20} />
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
