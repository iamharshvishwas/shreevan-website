import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import Script from "next/script";
import { JsonLd } from "@/lib/schema/json-ld";
import { localBusinessSchema, organizationSchema, websiteSchema } from "@/lib/schema/site-schema";
import { siteConfig } from "@/config/site";
import { CrmWidget } from "@/components/integrations/crm-widget";
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

export const dynamic = "force-dynamic";

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
        <Script id="google-tag-manager" strategy="beforeInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-NGPZPVNW');
          `}
        </Script>
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="T/r3nCE6XddTFkbdGXJD7w"
          strategy="beforeInteractive"
        />
      </head>
      <body className={`${inter.variable} ${lora.variable}`}>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-86YTRFY4KK" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-86YTRFY4KK');
          `}
        </Script>
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "xbidosyg3u");
          `}
        </Script>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NGPZPVNW"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <PublicSiteSettingsProvider settings={settings}>
          <JsonLd data={organizationSchema(settings)} />
          <JsonLd data={websiteSchema(settings)} />
          <JsonLd data={localBusinessSchema(settings)} />
          {children}
          <CrmWidget />
        </PublicSiteSettingsProvider>
      </body>
    </html>
  );
}
