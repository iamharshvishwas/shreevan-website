"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { modalityRoutes, programRoutes } from "@/config/routes";
import { siteConfig } from "@/config/site";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about-founder", label: "Our Story" },
  { href: "/testimonials", label: "Healing Stories" },
  { href: "/accommodation-inclusions", label: "Stay & Food" },
  { href: "/journal", label: "Journal" },
  { href: "/contact", label: "Contact Us" },
];

type ActiveMenu = "modalities" | "programs" | null;

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<ActiveMenu>(null);

  function handleMenuHover(menu: ActiveMenu) {
    setActiveMenu(menu);
  }

  function handleMenuLeave(menu: ActiveMenu) {
    setActiveMenu((current) => (current === menu ? null : current));
  }

  function handleMenuToggle(menu: Exclude<ActiveMenu, null>) {
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
            {navItems.slice(0, 2).map((item) => (
              <Link key={item.href} href={item.href} onClick={closeMenus}>
                {item.label}
              </Link>
            ))}

            <div
              className={`nav-group${activeMenu === "modalities" ? " is-open" : ""}`}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                  setActiveMenu(null);
                }
              }}
              onMouseEnter={() => handleMenuHover("modalities")}
              onMouseLeave={() => handleMenuLeave("modalities")}
            >
              <button
                className="nav-summary"
                type="button"
                aria-expanded={activeMenu === "modalities"}
                onClick={() => handleMenuToggle("modalities")}
              >
                Core Modalities
              </button>
              <div className="nav-menu" aria-label="Educational modality pages">
                {modalityRoutes.map((item) => (
                  <Link key={item.href} href={item.href} onClick={closeMenus}>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div
              className={`nav-group${activeMenu === "programs" ? " is-open" : ""}`}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                  setActiveMenu(null);
                }
              }}
              onMouseEnter={() => handleMenuHover("programs")}
              onMouseLeave={() => handleMenuLeave("programs")}
            >
              <button
                className="nav-summary"
                type="button"
                aria-expanded={activeMenu === "programs"}
                onClick={() => handleMenuToggle("programs")}
              >
                Immersive Programs
              </button>
              <div className="nav-menu" aria-label="Program package pages">
                {programRoutes.map((item) => (
                  <Link key={item.href} href={item.href} onClick={closeMenus}>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {navItems.slice(2).map((item) => (
              <Link key={item.href} href={item.href} onClick={closeMenus}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <Link className="button button-primary button-small" href="/book-consultation">
              BOOK CONSULTATION
            </Link>
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
