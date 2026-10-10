import type { MetadataRoute } from "next";
import { properties, propertyHref } from "@/data/properties";
import { destinations } from "@/data/content";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const page = (path: string, priority: number, images?: string[]) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency: "monthly" as const,
    priority,
    ...(images ? { images: images.map((src) => absoluteUrl(src)) } : {}),
  });

  return [
    page("/", 1),
    page("/properties", 0.9),
    ...properties.map((p) => page(propertyHref(p), 0.9, [p.heroImage.src, ...p.gallery.slice(0, 5).map((g) => g.src)])),
    page("/destinations", 0.8),
    ...destinations.map((d) => page(`/destinations/${d.slug}`, 0.8, [d.image.src])),
    page("/gallery", 0.6),
    page("/about", 0.5),
    page("/contact", 0.7),
  ];
}
