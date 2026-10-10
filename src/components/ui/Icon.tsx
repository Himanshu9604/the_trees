import type { ReactNode, SVGProps } from "react";
import type { AmenityKey } from "@/data/properties";

export type IconName =
  | AmenityKey
  | "phone"
  | "whatsapp"
  | "mail"
  | "pin"
  | "arrow-right"
  | "arrow-left"
  | "arrow-up-right"
  | "chevron-down"
  | "close"
  | "search"
  | "instagram"
  | "bed"
  | "leaf"
  | "sparkle"
  | "check"
  | "users"
  | "map"
  | "expand";

const paths: Record<IconName, ReactNode> = {
  phone: (
    <path d="M5 4h3.5l1.5 4-2 1.5a11 11 0 0 0 6.5 6.5L16 14l4 1.5V19a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  ),
  whatsapp: (
    <>
      <path d="M3.5 20.5 5 16.3A8.5 8.5 0 1 1 8 19.2l-4.5 1.3Z" />
      <path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1.2-1.5-2-1-1 .8a4.5 4.5 0 0 1-2.5-2.5l.8-1-1-2L9.5 8Z" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="m3.5 6 8.5 7 8.5-7" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
  map: (
    <>
      <path d="m9 4-6 2.5v13.5l6-2.5 6 2.5 6-2.5V4l-6 2.5L9 4Z" />
      <path d="M9 4v13.5M15 6.5V20" />
    </>
  ),
  "arrow-right": <path d="M4 12h16m-6-6 6 6-6 6" />,
  "arrow-left": <path d="M20 12H4m6-6-6 6 6 6" />,
  "arrow-up-right": <path d="M7 17 17 7M8 7h9v9" />,
  "chevron-down": <path d="m6 9 6 6 6-6" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-4.3-4.3" />
    </>
  ),
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r=".6" fill="currentColor" />
    </>
  ),
  expand: <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />,
  bed: (
    <>
      <path d="M3 18V6M3 14h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5" />
      <circle cx="7" cy="11" r="1.8" />
    </>
  ),
  leaf: (
    <>
      <path d="M5 19c0-8 5-13 15-14-1 10-6 15-14 15" />
      <path d="M5 19 13 11" />
    </>
  ),
  sparkle: <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  users: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14.5a6.5 6.5 0 0 1 3.5 5.5" />
    </>
  ),
  restaurant: <path d="M6 3v7a2 2 0 0 0 2 2v9M10 3v7a2 2 0 0 1-2 2M8 3v6M17 21V3c-2 1-3 4-3 8h3" />,
  cafe: (
    <>
      <path d="M4 9h12v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V9ZM16 10h1.5a2.5 2.5 0 0 1 0 5H16" />
      <path d="M8 3v3M12 3v3" />
    </>
  ),
  wifi: (
    <>
      <path d="M2.5 9a14 14 0 0 1 19 0M5.5 12.5a9.5 9.5 0 0 1 13 0M8.5 16a5 5 0 0 1 7 0" />
      <circle cx="12" cy="19" r=".8" fill="currentColor" />
    </>
  ),
  ac: (
    <>
      <rect x="3" y="4" width="18" height="8" rx="1.5" />
      <path d="M7 9h10M8 15.5c0 1.5-1 2.5-1 4M12 15.5v4M16 15.5c0 1.5 1 2.5 1 4" />
    </>
  ),
  parking: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="2" />
      <path d="M9.5 17V7h3.5a3 3 0 0 1 0 6H9.5" />
    </>
  ),
  "room-service": <path d="M3 18h18M5 18a7 7 0 0 1 14 0M12 8V6M10 6h4" />,
  tv: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="1.5" />
      <path d="m8 2 4 4 4-4M8 21h8" />
    </>
  ),
  intercom: (
    <>
      <rect x="6" y="3" width="12" height="18" rx="2" />
      <path d="M9.5 7h5M10 11h.01M14 11h.01M10 14.5h.01M14 14.5h.01M12 18h.01" />
    </>
  ),
  laundry: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <circle cx="12" cy="13" r="4.5" />
      <path d="M7.5 6.5h.01M10.5 6.5h3" />
    </>
  ),
  reception: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  garden: (
    <>
      <path d="M12 21v-8M12 13c0-4 2.5-6 6-6.5-.3 4-2.5 6.5-6 6.5ZM12 15c0-3-2-5-5.5-5.5.2 3.5 2.2 5.5 5.5 5.5Z" />
      <path d="M5 21h14" />
    </>
  ),
  banquet: (
    <>
      <path d="M8 3h8l-1 6a3 3 0 0 1-6 0L8 3ZM12 12v8M8.5 20.5h7" />
    </>
  ),
  pool: (
    <>
      <path d="M2.5 18c1.6 0 1.6-1 3.2-1s1.6 1 3.2 1 1.6-1 3.1-1 1.6 1 3.2 1 1.6-1 3.2-1 1.6 1 3.1 1" />
      <path d="M8 15V5.5a2 2 0 0 1 4 0M16 15V5.5a2 2 0 0 0-4 0M8 9h8M8 12.5h8" />
    </>
  ),
  "indoor-games": (
    <>
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <circle cx="9" cy="9" r=".9" fill="currentColor" />
      <circle cx="15" cy="15" r=".9" fill="currentColor" />
      <circle cx="15" cy="9" r=".9" fill="currentColor" />
      <circle cx="9" cy="15" r=".9" fill="currentColor" />
    </>
  ),
  kitchen: (
    <>
      <path d="M4 10h16v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19v-9ZM2.5 10h19" />
      <path d="M9 3.5c-.5 1 .5 1.5 0 2.5M12.5 3.5c-.5 1 .5 1.5 0 2.5M16 3.5c-.5 1 .5 1.5 0 2.5" />
    </>
  ),
};

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number;
}

export function Icon({ name, size = 20, strokeWidth = 1.5, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}
