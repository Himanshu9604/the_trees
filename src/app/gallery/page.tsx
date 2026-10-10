import Link from "next/link";
import { properties, propertyHref } from "@/data/properties";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { Gallery } from "@/components/ui/Gallery";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = pageMetadata({
  title: "Photo Gallery — Rooms, Villas & Pool",
  description:
    "Photos of The Tree Hotel Ravet, Hotel The Tree Hinjewadi Phase 3 and The Tree Resort Lonavala: rooms, suites, villas, dining and the swimming pool.",
  path: "/gallery",
  image: "/images/lonavala/gallery-5.jpg",
});

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Vibes & memories"
        title="The visual journal"
        italic="visual"
        intro="Rooms, villas, dining and the quiet corners in between — photographed at our three properties."
        image={{ src: "/images/lonavala/gallery-5.jpg", alt: "Poolside gazebo at The Tree Resort Lonavala at night" }}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Gallery", path: "/gallery" },
        ]}
      />

      <nav aria-label="Jump to property" className="sticky top-[64px] z-30 border-b border-ink/10 bg-paper/95 backdrop-blur">
        <ul className="container-site flex gap-10 overflow-x-auto py-4 text-[0.92rem] font-semibold whitespace-nowrap">
          {properties.map((p) => (
            <li key={p.slug}>
              <a href={`#${p.slug}`} className="link-draw text-ink">
                {p.shortName}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {properties.map((p, i) => (
        <section
          key={p.slug}
          id={p.slug}
          aria-labelledby={`${p.slug}-gallery-title`}
          className={`py-24 lg:py-32 ${i % 2 ? "bg-stone-soft" : "bg-paper"}`}
        >
          <div className="container-site">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <SectionHeading id={`${p.slug}-gallery-title`} eyebrow={`${String(i + 1).padStart(2, "0")} — ${p.cityLabel}`} title={p.name} />
              <Reveal>
                <Link
                  href={propertyHref(p)}
                  className="link-line text-[0.92rem] font-semibold text-ink"
                >
                  View property details
                </Link>
              </Reveal>
            </div>
            <Reveal className="mt-10">
              <Gallery images={[p.heroImage, ...p.gallery].map((g) => ({ ...g, label: p.shortName }))} columns={4} />
            </Reveal>
          </div>
        </section>
      ))}
    </>
  );
}
