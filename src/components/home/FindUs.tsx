"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { properties, type Property } from "@/data/properties";
import { whatsappLink } from "@/lib/site";
import { cn } from "@/lib/ui";
import { Icon } from "@/components/ui/Icon";

// Keyless Google Maps embed for each property's real location.
function embedUrl(p: Property) {
  const q = p.geo ? `${p.geo.lat},${p.geo.lng}` : `${p.name}, ${p.address.full}`;
  return `https://www.google.com/maps?q=${encodeURIComponent(q)}&z=15&output=embed`;
}

/** Find us: a tabbed map with address, directions and direct contact for each property. */
export function FindUs() {
  const [active, setActive] = useState(properties[0].slug);
  const p = properties.find((x) => x.slug === active)!;

  return (
    <section aria-labelledby="findus-title" className="bg-mist py-24 lg:py-28">
      <div className="container-site">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="eyebrow text-violet-text">Find us</p>
            <h2 id="findus-title" className="mt-4 text-[2.2rem] leading-[1.12] font-bold tracking-[-0.03em] text-navy sm:text-5xl">
              Easy to reach, <span className="text-gradient">easy to love</span>
            </h2>
          </div>
          <div role="tablist" aria-label="Choose a property" className="flex flex-wrap gap-2 rounded-full border border-line bg-white p-1.5">
            {properties.map((x) => (
              <button
                key={x.slug}
                type="button"
                role="tab"
                aria-selected={active === x.slug}
                onClick={() => setActive(x.slug)}
                className={cn(
                  "min-h-10 rounded-full px-4 text-sm font-medium transition-all duration-300",
                  active === x.slug ? "bg-gradient-to-r from-violet to-royal text-white" : "text-slate hover:text-violet",
                )}
              >
                {x.locality}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.6fr]">
          <AnimatePresence mode="wait">
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col rounded-[1.5rem] border border-line bg-white p-7 shadow-[var(--shadow-soft)]"
            >
              <p className="flex items-center gap-1.5 text-sm font-medium text-violet-text">
                <Icon name="pin" size={14} /> {p.cityLabel}
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-navy">{p.name}</h3>
              <p className="mt-3 leading-[1.7] text-slate">{p.address.full}</p>
              <p className="mt-3 text-[0.93rem] leading-[1.65] text-slate">{p.locationNotes[0]}</p>
              <div className="mt-auto grid gap-3 pt-7">
                <a
                  href={p.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet to-royal px-6 font-semibold text-white"
                >
                  <Icon name="map" size={17} /> Get directions
                </a>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={`tel:${p.phone.tel}`}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-line font-medium text-navy hover:border-violet hover:text-violet"
                  >
                    <Icon name="phone" size={15} /> Call
                  </a>
                  <a
                    href={whatsappLink(p.whatsapp, `Hello, I would like directions to ${p.name}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-line font-medium text-navy hover:border-violet hover:text-violet"
                  >
                    <Icon name="whatsapp" size={15} /> WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="relative min-h-[22rem] overflow-hidden rounded-[1.5rem] border border-line bg-white shadow-[var(--shadow-soft)]">
            <iframe
              key={p.slug}
              title={`Map showing ${p.name}`}
              src={embedUrl(p)}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
