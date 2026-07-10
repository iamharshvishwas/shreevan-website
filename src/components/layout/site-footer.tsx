"use client";

import Image from "next/image";
import Link from "next/link";
import { AtSign, Camera, CirclePlay, CircleUserRound, MapPinned, MessageCircle, Star } from "lucide-react";
import { siteConfig } from "@/config/site";
import { usePublicSiteSettings } from "@/components/site/public-settings-provider";

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
    { label: "Instagram", href: settings.social.instagram, Icon: Camera },
    { label: "Facebook", href: settings.social.facebook, Icon: MessageCircle },
    { label: "YouTube", href: settings.social.youtube, Icon: CirclePlay },
    { label: "X", href: settings.social.x, Icon: AtSign },
    { label: "LinkedIn", href: settings.social.linkedin, Icon: CircleUserRound },
    { label: "Trustpilot", href: settings.social.trustpilot, Icon: Star },
    { label: "Tripadvisor", href: settings.social.tripadvisor, Icon: MapPinned },
  ].filter((item) => Boolean(item.href));

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Image src={siteConfig.logos.markOnForest} alt="Shreevan Wellness" width={160} height={160} />
          <p>{settings.brand.tagline}</p>
          <span>{settings.brand.location}</span>
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

          <div>
            <h2>Contact</h2>
            <a href={`mailto:${settings.contact.email}`}>{settings.contact.email}</a>
            {phoneLink ? <a href={phoneLink}>{settings.contact.phone}</a> : null}
            {whatsappLink ? (
              <a href={whatsappLink} rel="noopener noreferrer" target="_blank">
                WhatsApp us
              </a>
            ) : null}
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
                    <Icon aria-hidden="true" size={18} strokeWidth={1.9} />
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </footer>
  );
}
