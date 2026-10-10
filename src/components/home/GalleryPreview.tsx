"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { properties, propertyHref, type Property } from "@/data/properties";
import { Gallery, type GalleryImage } from "@/components/ui/Gallery";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/ui";

const ease = [0.22, 1, 0.36, 1] as const;

// Display order: the resort first, then the two city hotels.
const order = ["resort-lonavala", "hotel-ravet-pune", "hotel-hinjewadi-phase-3-pune"];

function photosFor(p: Property, limit = 5): GalleryImage[] {
  return [p.heroImage, ...p.gallery].slice(0, limit).map((g) => ({ ...g, label: p.shortName, caption: g.alt }));
}

/** One labelled block per property: header with location and count, then a bento of its photographs. */
function PropertyBlock({ p }: { p: Property }) {
  const total = p.gallery.length + 1;
  return (
    <div>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4 border-b border-line pb-4">
        <div>
          <p className="flex items-center gap-1.5 text-sm text-slate">
            <Icon name="pin" size={14} className="text-violet" /> {p.cityLabel}
          </p>
          <h3 className="mt-1 text-[1.5rem] leading-tight font-semibold text-navy">{p.name}</h3>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="rounded-full bg-lavender px-3 py-1 font-medium text-violet-text">{total} photos</span>
          <Link href={`/gallery#${p.slug}`} className="inline-flex items-center gap-1 font-semibold text-violet hover:text-royal">
            See all <Icon name="arrow-right" size={14} />
          </Link>
          <Link href={propertyHref(p)} className="hidden font-medium text-navy hover:text-violet sm:inline">
            View property
          </Link>
        </div>
      </div>
      <Gallery images={photosFor(p)} layout="bento" />
    </div>
  );
}

/** F. Gallery: filter by property, with each property's photographs clearly separated and labelled. */
export function GalleryPreview() {
  const [active, setActive] = useState<string>("all");
  const tabs = [{ id: "all", label: "All properties" }, ...order.map((slug) => ({ id: slug, label: properties.find((p) => p.slug === slug)!.shortName }))];
  const shown = active === "all" ? order : [active];

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="bg-mist py-24 lg:py-32">
      <div className="container-site">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-violet-text">The gallery</p>
            <h2 id="gallery-title" className="mt-4 text-[2.2rem] leading-[1.12] font-bold tracking-[-0.03em] text-navy sm:text-5xl">
              A look inside <span className="text-gradient">every stay</span>
            </h2>
            <p className="mt-4 text-[1.02rem] leading-[1.75] text-slate">
              Real photographs from each property. Pick a stay, or tap any photo to view it full-screen.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div role="tablist" aria-label="Choose a property" className="flex flex-wrap gap-2 rounded-full border border-line bg-white p-1.5 shadow-[var(--shadow-soft)]">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={active === t.id}
                  onClick={() => setActive(t.id)}
                  className={cn(
                    "min-h-10 rounded-full px-4 text-sm font-medium transition-all duration-300",
                    active === t.id
                      ? "bg-gradient-to-r from-violet to-royal text-white shadow-[0_8px_20px_-10px_rgba(53,36,244,0.7)]"
                      : "text-slate hover:text-violet",
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.45, ease }}
            className="mt-12 space-y-14 lg:space-y-16"
          >
            {shown.map((slug) => (
              <PropertyBlock key={slug} p={properties.find((p) => p.slug === slug)!} />
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="mt-12 text-center">
          <Link
            href="/gallery"
            className="inline-flex min-h-12 items-center gap-2 rounded-full border border-line bg-white px-7 font-semibold text-navy transition-colors hover:border-violet hover:text-violet"
          >
            Open the full gallery <Icon name="arrow-right" size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
