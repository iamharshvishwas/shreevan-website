import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ModalityDetailPage } from "@/components/seo/modalities-pages";
import { siteConfig } from "@/config/site";
import { getModalityBySlug, modalities } from "@/lib/content/modalities";
import { JsonLd } from "@/lib/schema/json-ld";
import { breadcrumbSchema, educationalServiceSchema, faqPageSchema, webPageSchema } from "@/lib/schema/site-schema";
import { buildPageMetadata } from "@/lib/seo/page-metadata";

export const revalidate = 3600;

type ModalityPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return modalities.map((modality) => ({
    slug: modality.slug,
  }));
}

export async function generateMetadata({ params }: ModalityPageProps): Promise<Metadata> {
  const { slug } = await params;
  const modality = getModalityBySlug(slug);

  if (!modality) {
    return {};
  }

  return buildPageMetadata({
    title: modality.seoTitle,
    description: modality.seoDescription,
    path: modality.path,
    absoluteTitle: true,
  });
}

export default async function Page({ params }: ModalityPageProps) {
  const { slug } = await params;
  const modality = getModalityBySlug(slug);

  if (!modality) {
    notFound();
  }

  const pageUrl = `${siteConfig.url}${modality.path}`;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: siteConfig.url },
          { name: "Modalities", url: `${siteConfig.url}/modalities` },
          { name: modality.shortTitle, url: pageUrl },
        ])}
      />
      <JsonLd
        data={webPageSchema({
          name: modality.title,
          url: pageUrl,
          description: modality.seoDescription,
        })}
      />
      <JsonLd
        data={educationalServiceSchema({
          name: modality.title,
          url: modality.path,
          description: modality.description,
          keywords: modality.keywords,
          relatedPrograms: modality.relatedPrograms.map((program) => ({
            name: program.name,
            url: program.href,
          })),
        })}
      />
      <JsonLd data={faqPageSchema(modality.faqs)} />
      <ModalityDetailPage modality={modality} />
    </>
  );
}
