import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

type PageMetadataImage = {
  url: string;
  alt: string;
  width?: number;
  height?: number;
};

type PageMetadataArticle = {
  publishedTime: string;
  modifiedTime: string;
  authors: string[];
  section: string;
  tags: string[];
};

type BuildPageMetadataInput = {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
  robots?: Metadata["robots"];
  image?: PageMetadataImage;
  article?: PageMetadataArticle;
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
  image,
  article,
}: BuildPageMetadataInput): Metadata {
  const url = absoluteSiteUrl(path);
  const ogImage: PageMetadataImage = image ?? {
    url: absoluteSiteUrl(siteConfig.logos.logoOnForest),
    width: 1200,
    height: 900,
    alt: `${siteConfig.name} retreat brand mark`,
  };

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: article ? "article" : "website",
      siteName: siteConfig.name,
      title,
      description,
      url,
      images: [
        {
          url: ogImage.url,
          ...(ogImage.width ? { width: ogImage.width } : {}),
          ...(ogImage.height ? { height: ogImage.height } : {}),
          alt: ogImage.alt,
        },
      ],
      ...(article
        ? {
            publishedTime: article.publishedTime,
            modifiedTime: article.modifiedTime,
            authors: article.authors,
            section: article.section,
            tags: article.tags,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage.url],
    },
    ...(robots ? { robots } : {}),
  };
}
