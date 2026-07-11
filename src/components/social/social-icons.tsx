import type { SVGProps } from "react";

export type SocialIconName = "instagram" | "facebook" | "youtube" | "x" | "linkedin" | "trustpilot" | "tripadvisor";

type SocialIconProps = SVGProps<SVGSVGElement> & {
  name: SocialIconName;
};

export function SocialIcon({ name, ...props }: SocialIconProps) {
  switch (name) {
    case "instagram":
      return (
        <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" {...props}>
          <rect height="16.5" rx="5" stroke="currentColor" strokeWidth="1.8" width="16.5" x="3.75" y="3.75" />
          <circle cx="12" cy="12" r="3.7" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="17" cy="7" fill="currentColor" r="1.1" />
        </svg>
      );
    case "facebook":
      return (
        <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" {...props}>
          <path
            d="M14.4 8.15h2.1V4.85c-.55-.08-1.72-.2-3.02-.2-3.03 0-5.02 1.82-5.02 5.13v2.2H5.4v3.67h3.06v5.7h3.78v-5.7h3.14l.5-3.67h-3.64v-1.83c0-1.32.47-2 2.16-2Z"
            fill="currentColor"
          />
        </svg>
      );
    case "youtube":
      return (
        <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" {...props}>
          <rect height="13" rx="4" stroke="currentColor" strokeWidth="1.8" width="18" x="3" y="5.5" />
          <path d="m10.4 9.1 5.05 2.9-5.05 2.9V9.1Z" fill="currentColor" />
        </svg>
      );
    case "x":
      return (
        <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" {...props}>
          <path
            d="m5.1 4.8 5.55 7.28L4.8 19.2h2.64l4.45-5.41 4.12 5.41h4.89l-5.86-7.7 5.47-6.7h-2.62l-4.07 4.98-3.8-4.98H5.1Zm3.02 1.54h1.14l8.6 11.32h-1.13L8.12 6.34Z"
            fill="currentColor"
          />
        </svg>
      );
    case "linkedin":
      return (
        <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" {...props}>
          <path
            d="M6.4 9.2h3.1v9.9H6.4V9.2Zm1.55-4.9a1.8 1.8 0 1 1 0 3.6 1.8 1.8 0 0 1 0-3.6Zm3.35 4.9h2.97v1.35h.04c.42-.8 1.43-1.65 2.95-1.65 3.15 0 3.74 2.08 3.74 4.78v5.42h-3.1v-4.8c0-1.15-.02-2.63-1.6-2.63-1.6 0-1.85 1.25-1.85 2.55v4.88H11.3V9.2Z"
            fill="currentColor"
          />
        </svg>
      );
    case "trustpilot":
      return (
        <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" {...props}>
          <path
            d="m12 3.8 2.08 4.58 4.98.56-3.69 3.38.99 4.92L12 14.73l-4.36 2.51.99-4.92-3.69-3.38 4.98-.56L12 3.8Z"
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="1.8"
          />
        </svg>
      );
    case "tripadvisor":
      return (
        <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" {...props}>
          <path d="M4.2 8.5A12.8 12.8 0 0 1 12 6a12.8 12.8 0 0 1 7.8 2.5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
          <circle cx="8.2" cy="12.5" r="4" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="15.8" cy="12.5" r="4" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="8.2" cy="12.5" fill="currentColor" r="1.2" />
          <circle cx="15.8" cy="12.5" fill="currentColor" r="1.2" />
          <path d="M10.8 16.2 12 18l1.2-1.8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
        </svg>
      );
  }
}
