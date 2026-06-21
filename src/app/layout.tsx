import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import { JsonLd } from "@/lib/schema/json-ld";
import { localBusinessSchema, organizationSchema } from "@/lib/schema/site-schema";
import { siteConfig } from "@/config/site";
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

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: siteConfig.logos.favicon,
    shortcut: siteConfig.logos.favicon,
    apple: siteConfig.logos.appIcon,
  },
  alternates: {
    canonical: "/",
  },
  robots: {
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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${lora.variable}`}>
        <JsonLd data={organizationSchema()} />
        <JsonLd data={localBusinessSchema()} />
        {children}
        <script
          src="https://crm.shreevanwellness.com/veda-widget.js"
          data-api="https://api.shreevanwellness.com/api/v1"
          defer
        />
      </body>
    </html>
  );
}
