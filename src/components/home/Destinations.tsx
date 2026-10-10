import Image from "next/image";
import Link from "next/link";
import { properties, propertyHref } from "@/data/properties";
import { MaskLines, Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/ui";

// Three equal panels, one per property.
const panels: Record<string, { src: string; alt: string; line: string; layout: string; position: string }> = {
  "resort-lonavala": {
    src: "/images/lonavala/gallery-1.jpg",
    alt: "Four-poster villa bedroom with carved wooden bench at The Tree Resort Lonavala",
    line: "Private villas, a garden and a pool in the hills.",
    layout: "lg:col-span-4 lg:h-[34rem]",
    position: "object-[40%_50%]",
  },
  "hotel-ravet-pune": {
    src: "/images/ravet/gallary-8.jpg",
    alt: "Twin room with teal curtains and a botanical mural at The Tree Hotel Ravet",
    line: "Suites, a café and easy reach of the expressway.",
    layout: "lg:col-span-4 lg:h-[34rem]",
    position: "object-center",
  },
  "hotel-hinjewadi-phase-3-pune": {
    src: "/images/hinjewadi-phase-3/gallary-8.jpg",
    alt: "Hotel The Tree Hinjewadi Phase 3 lit up against the night sky",
    line: "A composed base beside Pune's business district.",
    layout: "lg:col-span-4 lg:h-[34rem]",
    position: "object-[50%_40%]",
  },
};

const order = ["resort-lonavala", "hotel-ravet-pune", "hotel-hinjewadi-phase-3-pune"];

/** C. Three tall photographic panels in differing proportions; a swipeable rail on mobile. */
export function Destinations() {
  return (
    <section id="destinations" aria-labelledby="destinations-title" className="bg-aurora pt-24 pb-24 lg:pt-32 lg:pb-32">
      <div className="container-site">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow text-brass-text">Discover our destinations</p>
            </Reveal>
            <MaskLines
              id="destinations-title"
              className="display mt-5 text-[2.3rem] text-navy sm:text-5xl lg:text-[3.4rem]"
              lines={[
                <span key="line-1">
                  From the <em>city</em>
                </span>,
                "to the hills.",
              ]}
            />
          </div>
          <Reveal delay={0.15} className="flex items-end lg:col-span-4 lg:col-start-9">
            <p className="caption text-ink-muted">
              Ravet and Hinjewadi Phase 3 in{" "}
              <Link href="/destinations/pune" className="link-line text-ink">
                Pune
              </Link>
              ; private villas near{" "}
              <Link href="/destinations/lonavala" className="link-line text-ink">
                Lonavala
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </div>

      {/* Mobile: horizontal rail. Desktop: an asymmetric 12-column composition. */}
      <ul className="mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:px-8 lg:container-site lg:mt-20 lg:grid lg:grid-cols-12 lg:items-start lg:gap-6 lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden">
        {order.map((slug, i) => {
          const p = properties.find((x) => x.slug === slug)!;
          const panel = panels[slug];
          return (
            <li key={slug} className={cn("w-[80vw] shrink-0 snap-start sm:w-[58vw] lg:w-auto", panel.layout)}>
              <Reveal delay={i * 0.12} className="h-full">
                <Link
                  href={propertyHref(p)}
                  className="group relative block aspect-[3/4] h-full overflow-hidden bg-ink text-paper lg:aspect-auto rounded-[1.25rem]"
                  aria-label={`${p.locality} — ${p.name}`}
                >
                  <Image
                    src={panel.src}
                    alt={panel.alt}
                    fill
                    sizes="(min-width: 1024px) 40vw, 80vw"
                    className={cn(
                      "object-cover transition-transform duration-[2.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]",
                      panel.position,
                    )}
                  />
                  <span
                    className="absolute inset-0 bg-[linear-gradient(to_top,rgba(16,31,45,0.85),rgba(16,31,45,0.05)_55%)] transition-opacity duration-1000 group-hover:opacity-100 lg:opacity-80"
                    aria-hidden="true"
                  />
                  <span className="absolute inset-x-5 bottom-6 sm:inset-x-7 sm:bottom-8">
                    <span className="eyebrow block text-[0.92rem] text-brass-soft">
                      {p.destination === "pune" ? "Pune" : "Maharashtra"}
                    </span>
                    <span className="mt-3 block text-[2.6rem] leading-[1.04] sm:text-5xl xl:text-6xl">
                      {p.locality}
                    </span>
                    {/* Revealed on hover (always visible on touch screens). */}
                    <span className="grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr] lg:group-focus-visible:grid-rows-[1fr]">
                      <span className="overflow-hidden">
                        <span className="flex items-end justify-between gap-4 pt-4">
                          <span className="max-w-[16rem] text-lg leading-snug text-paper/85">{panel.line}</span>
                          <Icon name="arrow-up-right" size={18} className="shrink-0 text-brass-soft" />
                        </span>
                      </span>
                    </span>
                  </span>
                </Link>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
