"use client";

import Image from "next/image";
import Link from "next/link";
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
    ["Instagram", settings.social.instagram],
    ["YouTube", settings.social.youtube],
    ["LinkedIn", settings.social.linkedin],
    ["Facebook", settings.social.facebook],
  ].filter((item): item is [string, string] => Boolean(item[1]));

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
            {whatsappLink ? <a href={whatsappLink}>WhatsApp</a> : null}
            {socialLinks.map(([label, href]) => (
              <a href={href} key={label} rel="noreferrer" target="_blank">
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
