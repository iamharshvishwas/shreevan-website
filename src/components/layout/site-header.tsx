"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Mail, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { usePublicSiteSettings } from "@/components/site/public-settings-provider";
import type { PublicNavLink } from "@/lib/site/public-settings-types";
import { SocialIcon, type SocialIconName } from "@/components/social/social-icons";
import styles from "./site-header.module.css";

type ActiveMenu = string | null;
type SocialLink = { label: string; href: string; icon: SocialIconName };

const joinClassUrl = "https://class.shreevanwellness.com";

function phoneHref(value: string) {
  const normalized = value.replace(/[^\d+]/g, "");

  return normalized ? `tel:${normalized}` : "";
}

export function SiteHeader() {
  const settings = usePublicSiteSettings();
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<ActiveMenu>(null);
  const phoneLink = settings.contact.phone ? phoneHref(settings.contact.phone) : "";
  const allSocialLinks: SocialLink[] = [
    { label: "Instagram", href: settings.social.instagram, icon: "instagram" },
    { label: "Facebook", href: settings.social.facebook, icon: "facebook" },
    { label: "YouTube", href: settings.social.youtube, icon: "youtube" },
    { label: "X", href: settings.social.x, icon: "x" },
    { label: "Trustpilot", href: settings.social.trustpilot, icon: "trustpilot" },
    { label: "Tripadvisor", href: settings.social.tripadvisor, icon: "tripadvisor" },
  ];
  const socialLinks = allSocialLinks.filter((item) => Boolean(item.href));

  function handleMenuHover(menu: ActiveMenu) {
    setActiveMenu(menu);
  }

  function handleMenuLeave(menu: ActiveMenu) {
    setActiveMenu((current) => (current === menu ? null : current));
  }

  function handleMenuToggle(menu: string) {
    setActiveMenu((current) => (current === menu ? null : menu));
  }

  function closeMenus() {
    setActiveMenu(null);
    setIsOpen(false);
  }

  useEffect(() => {
    document.body.classList.toggle("nav-open", isOpen);

    return () => {
      document.body.classList.remove("nav-open");
    };
  }, [isOpen]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        setActiveMenu(null);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function renderNavItem(item: PublicNavLink) {
    if (item.children?.length) {
      const isMenuOpen = activeMenu === item.id;

      return (
        <div
          className={`nav-group${isMenuOpen ? " is-open" : ""}`}
          key={item.id}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setActiveMenu(null);
            }
          }}
          onMouseEnter={() => handleMenuHover(item.id)}
          onMouseLeave={() => handleMenuLeave(item.id)}
        >
          <button
            className="nav-summary"
            type="button"
            aria-expanded={isMenuOpen}
            onClick={() => handleMenuToggle(item.id)}
          >
            {item.label}
          </button>
          <div className="nav-menu" aria-label={`${item.label} navigation`}>
            {item.children.map((child) => (
              <Link key={child.id} href={child.href} onClick={closeMenus}>
                {child.label}
              </Link>
            ))}
          </div>
        </div>
      );
    }

    return (
      <Link key={item.id} href={item.href} onClick={closeMenus}>
        {item.label}
      </Link>
    );
  }

  return (
    <>
      <div className="announcement">
        <div className="container announcement-inner">
          <div className="announcement-contact" aria-label="Contact Shreevan Wellness">
            <a href={`mailto:${settings.contact.email}`}>
              <Mail aria-hidden="true" size={14} strokeWidth={2} />
              <span>{settings.contact.email}</span>
            </a>
            {phoneLink ? (
              <a href={phoneLink}>
                <Phone aria-hidden="true" size={14} strokeWidth={2} />
                <span>{settings.contact.phone}</span>
              </a>
            ) : null}
          </div>
          <p>Now accepting enquiries for upcoming Shreevan Wellness retreats.</p>
          {socialLinks.length ? (
            <div className="announcement-social" aria-label="Follow Shreevan Wellness">
              {socialLinks.map(({ label, href, icon }) => (
                <a
                  aria-label={`Follow Shreevan Wellness on ${label}`}
                  href={href}
                  key={label}
                  rel="noopener noreferrer"
                  target="_blank"
                  title={label}
                >
                  <SocialIcon height={16} name={icon} width={16} />
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <header className="site-header">
        <div className="container header-inner">
          <Link className="brand" href="/" aria-label="Shreevan Wellness home">
            <Image
              className="brand-logo"
              src={siteConfig.logos.horizontalLockup}
              alt="Shreevan Wellness"
              width={214}
              height={62}
              priority
            />
          </Link>

          <nav className="main-nav" aria-label="Primary navigation">
            {settings.navigation.headerItems.map(renderNavItem)}
            <div className={styles.mobileNavActions}>
              <a
                className={`button button-secondary button-small ${styles.navSecondaryCta} ${styles.mobileNavButton}`}
                href={joinClassUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenus}
              >
                Join Class
              </a>
              {settings.navigation.headerCta ? (
                <Link
                  className={`button button-primary button-small ${styles.mobileNavButton}`}
                  href={settings.navigation.headerCta.href}
                  onClick={closeMenus}
                >
                  {settings.navigation.headerCta.label}
                </Link>
              ) : null}
            </div>
          </nav>

          <div className="header-actions">
            <a
              className={`button button-secondary button-small ${styles.desktopActionButton} ${styles.navSecondaryCta}`}
              href={joinClassUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Join Class
            </a>
            {settings.navigation.headerCta ? (
              <Link
                className={`button button-primary button-small ${styles.desktopActionButton}`}
                href={settings.navigation.headerCta.href}
              >
                {settings.navigation.headerCta.label}
              </Link>
            ) : null}
            <button
              className="menu-toggle"
              type="button"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              onClick={() => {
                setActiveMenu(null);
                setIsOpen((current) => !current);
              }}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
