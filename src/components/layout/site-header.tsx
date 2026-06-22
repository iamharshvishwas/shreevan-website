"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import { usePublicSiteSettings } from "@/components/site/public-settings-provider";
import type { PublicNavLink } from "@/lib/site/public-settings-types";

type ActiveMenu = string | null;

export function SiteHeader() {
  const settings = usePublicSiteSettings();
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<ActiveMenu>(null);

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
        <p>Now accepting enquiries for upcoming Shreevan Wellness retreats.</p>
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
          </nav>

          <div className="header-actions">
            {settings.navigation.headerCta ? (
              <Link className="button button-primary button-small" href={settings.navigation.headerCta.href}>
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
