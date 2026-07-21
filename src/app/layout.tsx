import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import { JsonLd } from "@/lib/schema/json-ld";
import { localBusinessSchema, organizationSchema, websiteSchema } from "@/lib/schema/site-schema";
import { siteConfig } from "@/config/site";
import { CrmWidget } from "@/components/integrations/crm-widget";
import { PublicTrackingScripts } from "@/components/integrations/public-tracking-scripts";
import { PublicSiteSettingsProvider } from "@/components/site/public-settings-provider";
import { getPublicSiteOrigin, getPublicSiteSettings } from "@/lib/site/public-settings";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getPublicSiteSettings();
  const siteOrigin = getPublicSiteOrigin(settings);
  const isIndexable = settings.launch.indexingMode === "indexable";

  return {
    metadataBase: new URL(siteOrigin),
    title: {
      default: `${settings.brand.name} | ${settings.brand.tagline}`,
      template: `%s | ${settings.brand.name}`,
    },
    description: settings.brand.description,
    applicationName: settings.brand.name,
    publisher: settings.brand.name,
    openGraph: {
      type: "website",
      siteName: settings.brand.name,
      title: `${settings.brand.name} | ${settings.brand.tagline}`,
      description: settings.brand.description,
      locale: "en_US",
      images: [
        {
          url: `${siteOrigin}${siteConfig.logos.logoOnForest}`,
          width: 1200,
          height: 900,
          alt: `${settings.brand.name} logo`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${settings.brand.name} | ${settings.brand.tagline}`,
      description: settings.brand.description,
      images: [`${siteOrigin}${siteConfig.logos.logoOnForest}`],
    },
    icons: {
      icon: siteConfig.logos.favicon,
      shortcut: siteConfig.logos.favicon,
      apple: siteConfig.logos.appIcon,
    },
    alternates: {
      canonical: "/",
    },
    verification: {
      google: "SGcPYDiXLPqRd7yveC07VE6Rn3tZ_Y2q00DQmy-KlFQ",
    },
    robots: isIndexable
      ? {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        }
      : {
          index: false,
          follow: false,
          nocache: true,
          googleBot: {
            index: false,
            follow: false,
            noimageindex: true,
            "max-image-preview": "none",
            "max-snippet": -1,
          },
        },
  };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const settings = await getPublicSiteSettings();

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <JsonLd data={organizationSchema(settings)} />
        <JsonLd data={websiteSchema(settings)} />
        <JsonLd data={localBusinessSchema(settings)} />
      </head>
      <body className={`${inter.variable} ${lora.variable}`}>
        <PublicTrackingScripts />
        <PublicSiteSettingsProvider settings={settings}>
          {children}
          <CrmWidget />
        </PublicSiteSettingsProvider>
      </body>
    </html>
  );
}
