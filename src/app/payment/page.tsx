import type { Metadata } from "next";
import { PaymentPage } from "@/components/payment/payment-page";
import { buildPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Secure Payment",
  description:
    "Secure Shreevan Wellness checkout for approved retreat bookings after consultation, program confirmation and invoice review.",
  path: "/payment",
  robots: {
    index: false,
    follow: true,
  },
});

type PaymentSearchParams = Promise<{
  booking?: string;
  program?: string;
}>;

export default async function Page({ searchParams }: { searchParams?: PaymentSearchParams }) {
  const params = searchParams ? await searchParams : {};

  return <PaymentPage initialBookingId={params.booking} initialProgramSlug={params.program} />;
}
