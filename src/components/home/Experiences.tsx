"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { experiences } from "@/data/content";
import { amenityLabels, properties, type AmenityKey } from "@/data/properties";
import { MaskLines, Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/ui";

const ease = [0.22, 1, 0.36, 1] as const;

// Amenities shown in the index — each one is listed in the property data.
const index: AmenityKey[] = ["wifi", "pool", "garden", "banquet", "kitchen", "restaurant", "cafe", "reception", "parking"];

/** F. Experiences & amenities — a photograph that follows an editorial list, then a fine-ruled amenity index. */
export function Experiences() {
  const [active, setActive] = useState(0);
  const current = experiences[active];

  return (
    <section id="experiences" aria-labelledby="experiences-title" className="bg-white py-24 lg:py-32">
      <div className="container-site">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-10">
          {/* Photograph — sticky on desktop, changes with the hovered or focused experience */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/5] overflow-hidden bg-navy sm:aspect-[5/4] lg:sticky lg:top-28 lg:aspect-[4/5] rounded-[1.25rem]">
              <AnimatePresence initial={false}>
                <motion.div
                  key={current.title}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9, ease }}
                >
                  <Image src={current.image.src} alt={current.image.alt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
                </motion.div>
              </AnimatePresence>
              <p className="caption absolute bottom-0 left-0 bg-ivory px-4 py-2.5 text-navy">{current.title}</p>
            </div>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal>
              <p className="eyebrow text-violet-text">Signature experiences</p>
            </Reveal>
            <MaskLines
              id="experiences-title"
              className="display mt-5 text-[2.3rem] text-navy sm:text-5xl lg:text-[3.2rem]"
              lines={["Small pleasures,", <span key="line-1">thoughtfully <em>placed.</em></span>]}
            />

            <ol className="mt-12 border-t border-navy/15">
              {experiences.map((e, i) => (
                <li key={e.title} className="border-b border-navy/15">
                  <Link
                    href={e.href}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-4 py-6"
                  >
                    <span className={cn("text-[0.85rem] tabular-nums transition-colors", i === active ? "text-champagne-text" : "text-body/60")}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className={cn("block text-[1.5rem] leading-snug transition-colors sm:text-[1.7rem]", i === active ? "text-navy" : "text-navy/70")}>
                        {e.title}
                      </span>
                      <span className="mt-2 block max-w-md text-[0.95rem] leading-[1.7] text-body">{e.copy}</span>
                    </span>
                    <Icon
                      name="arrow-up-right"
                      size={17}
                      className={cn("transition-all duration-500", i === active ? "text-champagne-text opacity-100" : "opacity-0 group-hover:opacity-100")}
                    />
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Amenity index — where each facility can be found */}
        <Reveal className="mt-20 lg:mt-28">
          <p className="eyebrow text-champagne-text">Where to find it</p>
          <ul className="mt-6 grid border-t border-navy/15 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-3">
            {index.map((a) => {
              const where = properties.filter((p) => p.amenities.includes(a));
              return (
                <li key={a} className="flex items-start gap-4 border-b border-navy/15 py-5">
                  <Icon name={a} size={20} strokeWidth={1.25} className="mt-1 shrink-0 text-champagne" />
                  <span>
                    <span className="block text-[1.2rem] text-navy">{amenityLabels[a]}</span>
                    <span className="mt-0.5 block text-[0.88rem] text-body">
                      {where.length === properties.length ? "All three properties" : where.map((p) => p.shortName).join(" · ")}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
