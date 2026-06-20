import type { Metadata } from "next";
import { PaymentPage } from "@/components/payment/payment-page";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Secure Payment",
  description:
    "Secure Shreevan Wellness checkout for approved retreat bookings after consultation, program confirmation and invoice review.",
  alternates: {
    canonical: "/payment",
  },
  robots: {
    index: false,
    follow: false,
  },
};

type PaymentSearchParams = Promise<{
  booking?: string;
  program?: string;
}>;

export default async function Page({ searchParams }: { searchParams?: PaymentSearchParams }) {
  const params = searchParams ? await searchParams : {};

  return <PaymentPage initialBookingId={params.booking} initialProgramSlug={params.program} />;
}
