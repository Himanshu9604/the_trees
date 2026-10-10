import type { Metadata } from "next";
import { amenityLabels, type Property } from "@/data/properties";
import { absoluteUrl, siteConfig } from "./site";

interface PageMetaInput {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
}

export function pageMetadata({ title, description, path, image, imageAlt }: PageMetaInput): Metadata {
  const ogImage = image ?? siteConfig.ogImage;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: siteConfig.name,
      locale: "en_IN",
      type: "website",
      images: [{ url: ogImage, alt: imageAlt ?? title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbSchema(items: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": absoluteUrl("/#organization"),
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl(siteConfig.logo),
    telephone: siteConfig.primaryPhone.tel,
    sameAs: [siteConfig.instagram.url],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: siteConfig.name,
    url: siteConfig.url,
    publisher: { "@id": absoluteUrl("/#organization") },
    inLanguage: "en-IN",
  };
}

export function propertySchema(p: Property) {
  return {
    "@context": "https://schema.org",
    "@type": p.schemaType,
    "@id": absoluteUrl(`/properties/${p.slug}#lodging`),
    name: p.name,
    description: p.summary,
    url: absoluteUrl(`/properties/${p.slug}`),
    telephone: p.phone.tel,
    email: p.email,
    image: [p.heroImage, ...p.gallery.slice(0, 4)].map((i) => absoluteUrl(i.src)),
    address: {
      "@type": "PostalAddress",
      ...(p.address.street ? { streetAddress: p.address.street } : {}),
      addressLocality: p.address.locality,
      addressRegion: p.address.region,
      ...(p.address.postalCode ? { postalCode: p.address.postalCode } : {}),
      addressCountry: p.address.country,
    },
    ...(p.geo
      ? { geo: { "@type": "GeoCoordinates", latitude: p.geo.lat, longitude: p.geo.lng } }
      : {}),
    hasMap: p.mapUrl,
    amenityFeature: p.amenities.map((a) => ({
      "@type": "LocationFeatureSpecification",
      name: amenityLabels[a],
      value: true,
    })),
    containsPlace: p.rooms.map((r) => ({
      "@type": p.type === "Villa" ? "Accommodation" : "HotelRoom",
      name: r.name,
    })),
    parentOrganization: { "@id": absoluteUrl("/#organization") },
  };
}

export function faqSchema(faqs: readonly { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
