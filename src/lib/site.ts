const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://the-tree-test2.vercel.app";

export const siteConfig = {
  name: "The Tree Hotels & Resorts",
  shortName: "The Tree",
  url: rawSiteUrl.replace(/\/+$/, ""),
  description:
    "Owner-run hotels in Ravet and Hinjewadi Phase 3, Pune, and a private-villa resort in Lonavala. Enquire directly by call or WhatsApp with zero booking commission.",
  logo: "/images/brand/logo.png",
  ogImage: "/images/lonavala/hero.jpg",
  region: "Pune & Lonavala, Maharashtra, India",
  instagram: {
    handle: "@thetreehotel_ravet",
    url: "https://www.instagram.com/thetreehotel_ravet",
  },
  /** Primary contact used in the site header (as on the original site). */
  primaryPhone: { display: "+91 93719 62999", tel: "+919371962999" },
  primaryWhatsApp: "919371962999",
  googleVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
} as const;

export function absoluteUrl(path = "/") {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export function whatsappLink(number: string, message?: string) {
  const base = `https://wa.me/${number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const navLinks = [
  { href: "/properties", label: "Properties" },
  { href: "/destinations", label: "Destinations" },
  { href: "/#experiences", label: "Experiences" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
] as const;

/** Secondary links shown in the mobile menu and footer. */
export const secondaryLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
] as const;
