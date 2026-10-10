import Image from "next/image";
import Link from "next/link";
import { destinations } from "@/data/content";
import { getPropertiesByDestination, propertyHref } from "@/data/properties";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { EnquirySection } from "@/components/home/EnquirySection";
import { ImageReveal, Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/ui";

export const metadata = pageMetadata({
  title: "Destinations — Pune & Lonavala",
  description:
    "Stay with The Tree in Pune (Ravet and Hinjewadi Phase 3) or in the hills near Lonavala. Explore each destination and its properties.",
  path: "/destinations",
  image: "/images/lonavala/gallery-5.jpg",
});

export default function DestinationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Destinations"
        title="From the city to the hills"
        italic="hills"
        intro="Two city hotels on Pune's western side, and a private-villa resort near Lonavala."
        image={{ src: "/images/lonavala/gallery-5.jpg", alt: "Poolside pavilion at The Tree Resort Lonavala in the evening" }}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Destinations", path: "/destinations" },
        ]}
      />

      <section aria-label="Our destinations" className="bg-ivory py-24 lg:py-36">
        <div className="container-site space-y-28 lg:space-y-40">
          {destinations.map((d, i) => {
            const stays = getPropertiesByDestination(d.slug);
            const flip = i % 2 === 1;
            return (
              <article key={d.slug} className="grid items-center gap-12 lg:grid-cols-12 lg:gap-x-10">
                <div className={cn("lg:col-span-7", flip && "lg:order-2 lg:col-start-6")}>
                  <ImageReveal from={flip ? "right" : "left"} className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem]">
                    <Image src={d.image.src} alt={d.image.alt} fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
                  </ImageReveal>
                </div>
                <Reveal delay={0.1} className={cn("lg:col-span-4", flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-9")}>
                  <p className="eyebrow text-champagne-text">{d.region}</p>
                  <h2 className="display mt-4 text-[2.4rem] text-navy sm:text-5xl">{d.name}</h2>
                  <p className="mt-5 text-[1rem] leading-[1.8] text-body">{d.intro}</p>
                  <ul className="mt-6 border-t border-stone">
                    {stays.map((p) => (
                      <li key={p.slug} className="border-b border-stone">
                        <Link href={propertyHref(p)} className="group flex items-center justify-between gap-4 py-4">
                          <span className="text-[1.2rem] text-navy">{p.name}</span>
                          <Icon name="arrow-right" size={15} className="text-champagne transition-transform group-hover:translate-x-1" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/destinations/${d.slug}`}
                    className="link-line mt-8 inline-block text-[0.92rem] font-semibold text-navy"
                  >
                    Explore {d.name}
                  </Link>
                </Reveal>
              </article>
            );
          })}
        </div>
      </section>

      <EnquirySection />
    </>
  );
}
