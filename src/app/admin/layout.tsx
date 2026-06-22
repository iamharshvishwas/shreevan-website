import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Admin | Shreevan Wellness",
    template: "%s | Shreevan Admin",
  },
  description: "Private administration panel for Shreevan Wellness website operations.",
  alternates: {
    canonical: "/admin",
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
