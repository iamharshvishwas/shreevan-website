import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

type BuildPageMetadataInput = {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
  robots?: Metadata["robots"];
};

export function absoluteSiteUrl(path: string) {
  if (path === "/") {
    return siteConfig.url;
  }

  return new URL(path, siteConfig.url).toString();
}

export function buildPageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  robots,
}: BuildPageMetadataInput): Metadata {
  const url = absoluteSiteUrl(path);
  const imageUrl = absoluteSiteUrl(siteConfig.logos.logoOnForest);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title,
      description,
      url,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 900,
          alt: `${siteConfig.name} retreat brand mark`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    ...(robots ? { robots } : {}),
  };
}
