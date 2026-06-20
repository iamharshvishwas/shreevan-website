import Image from "next/image";
import Link from "next/link";
import { coreRoutes, modalityRoutes, programRoutes, utilityRoutes } from "@/config/routes";
import { siteConfig } from "@/config/site";

const footerCoreRoutes = coreRoutes.filter((route) => route.href !== "/");
const footerActionRoutes = utilityRoutes.filter((route) => route.intent === "transactional");
const footerLegalRoutes = utilityRoutes.filter((route) => route.intent === "legal");

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Image src={siteConfig.logos.markOnForest} alt="Shreevan Wellness" width={160} height={160} />
          <p>{siteConfig.tagline}</p>
          <span>{siteConfig.location}</span>
        </div>

        <nav aria-label="Core footer navigation">
          <h2>Core Pages</h2>
          {footerCoreRoutes.map((route) => (
            <Link href={route.href} key={route.href}>
              {route.label}
            </Link>
          ))}
        </nav>

        <nav aria-label="Program footer navigation">
          <h2>Programs</h2>
          {programRoutes.map((route) => (
            <Link href={route.href} key={route.href}>
              {route.label}
            </Link>
          ))}
        </nav>

        <nav aria-label="Modality footer navigation">
          <h2>Modalities</h2>
          {modalityRoutes.map((route) => (
            <Link href={route.href} key={route.href}>
              {route.label}
            </Link>
          ))}
        </nav>

        <div className="footer-stack">
          <nav aria-label="Conversion footer navigation">
            <h2>Conversion</h2>
            {footerActionRoutes.map((route) => (
              <Link href={route.href} key={route.href}>
                {route.label}
              </Link>
            ))}
          </nav>

          <nav aria-label="Legal footer navigation">
            <h2>Legal</h2>
            {footerLegalRoutes.map((route) => (
              <Link href={route.href} key={route.href}>
                {route.label}
              </Link>
            ))}
          </nav>

          <div>
            <h2>Contact</h2>
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
