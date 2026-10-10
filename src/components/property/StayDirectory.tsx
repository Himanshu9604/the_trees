"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { amenityLabels, properties, propertyHref, type DestinationSlug, type PropertyType } from "@/data/properties";
import { whatsappLink } from "@/lib/site";
import { cn } from "@/lib/ui";
import { Icon } from "@/components/ui/Icon";

const locations: { id: "all" | DestinationSlug; label: string }[] = [
  { id: "all", label: "All locations" },
  { id: "pune", label: "Pune" },
  { id: "lonavala", label: "Lonavala" },
];

const types: { id: "All" | PropertyType; label: string }[] = [
  { id: "All", label: "All stays" },
  { id: "Hotel", label: "Hotels" },
  { id: "Villa", label: "Villas" },
];

const ease = [0.22, 1, 0.36, 1] as const;

function Segmented<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { id: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div role="group" aria-label={label} className="flex rounded-full border border-line bg-white p-1">
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          aria-pressed={value === o.id}
          onClick={() => onChange(o.id)}
          className={cn(
            "min-h-10 flex-1 rounded-full px-4 text-sm font-medium whitespace-nowrap transition-all duration-300",
            value === o.id
              ? "bg-gradient-to-r from-violet to-royal text-white shadow-[0_8px_20px_-10px_rgba(53,36,244,0.7)]"
              : "text-slate hover:text-violet",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

/** E. Explore all stays: functional search with location and type filters, clean white cards. */
export function StayDirectory({ headingLevel = "h3" }: { headingLevel?: "h2" | "h3" }) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<"All" | PropertyType>("All");
  const [location, setLocation] = useState<"all" | DestinationSlug>("all");
  const searchId = useId();
  const H = headingLevel;

  // Apply ?location= and ?type= from the hero search.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const loc = params.get("location");
    const t = params.get("type");
    if (loc === "pune" || loc === "lonavala") setLocation(loc);
    if (t === "Hotel" || t === "Villa") setType(t);
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return properties.filter((p) => {
      if (type !== "All" && p.type !== type) return false;
      if (location !== "all" && p.destination !== location) return false;
      if (!q) return true;
      const haystack = [p.name, p.shortName, p.locality, p.cityLabel, p.address.full, p.destination, ...p.rooms.map((r) => r.name)]
        .join(" ")
        .toLowerCase();
      return q.split(/\s+/).every((w) => haystack.includes(w));
    });
  }, [query, type, location]);

  const reset = () => {
    setQuery("");
    setType("All");
    setLocation("all");
  };

  return (
    <div id="stays-list" className="scroll-mt-28">
      <div className="flex flex-col gap-3 rounded-[1.5rem] border border-line bg-mist p-3 shadow-[var(--shadow-soft)] lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <label htmlFor={searchId} className="sr-only">
            Search properties by name or location
          </label>
          <Icon name="search" size={18} className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-violet" />
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Ravet, Hinjewadi, Lonavala"
            className="h-12 w-full rounded-full border border-line bg-white pr-4 pl-11 text-[0.95rem] text-navy placeholder:text-slate/70 focus:border-violet focus:outline-none"
          />
        </div>
        <Segmented label="Filter by location" options={locations} value={location} onChange={setLocation} />
        <Segmented label="Filter by type" options={types} value={type} onChange={setType} />
      </div>

      <p className="mt-5 text-sm text-slate" aria-live="polite">
        Showing <span className="font-semibold text-navy">{results.length}</span> of {properties.length} properties
      </p>

      <ul className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {results.map((p, i) => (
            <motion.li
              key={p.slug}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease, delay: i * 0.06 } }}
              exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.2 } }}
            >
              <article className="group flex h-full flex-col overflow-hidden rounded-[1.25rem] border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:border-violet/30 hover:shadow-[var(--shadow-float)]">
                <Link href={propertyHref(p)} className="relative block aspect-[4/3] overflow-hidden" tabIndex={-1} aria-hidden="true">
                  <Image
                    src={p.heroImage.src}
                    alt={p.heroImage.alt}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 rounded-full bg-white/95 px-3 py-1 text-[0.78rem] font-semibold text-violet-text">
                    {p.type}
                  </span>
                </Link>
                <div className="flex flex-1 flex-col p-6">
                  <p className="flex items-center gap-1.5 text-sm text-slate">
                    <Icon name="pin" size={14} className="text-violet" /> {p.cityLabel}
                  </p>
                  <H className="mt-2 text-xl leading-snug font-semibold text-navy">
                    <Link href={propertyHref(p)} className="transition-colors hover:text-violet">
                      {p.name}
                    </Link>
                  </H>
                  <p className="mt-2 text-[0.95rem] leading-[1.65] text-slate">{p.summary}</p>
                  <ul className="mt-4 flex flex-wrap gap-2" aria-label="Key amenities">
                    {p.amenities.slice(0, 3).map((a) => (
                      <li key={a} className="inline-flex items-center gap-1.5 rounded-full bg-lavender px-3 py-1 text-[0.8rem] text-navy">
                        <Icon name={a} size={13} className="text-violet" />
                        {amenityLabels[a]}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex items-center justify-between gap-3 border-t border-line pt-5">
                    <Link href={propertyHref(p)} className="inline-flex items-center gap-1.5 text-[0.95rem] font-semibold text-violet hover:text-royal">
                      View Property <Icon name="arrow-right" size={15} className="transition-transform group-hover:translate-x-0.5" />
                    </Link>
                    <a
                      href={whatsappLink(p.whatsapp, `Hello, I would like to enquire about a stay at ${p.name}.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-line px-4 text-sm font-medium text-navy transition-colors hover:border-violet hover:text-violet"
                      aria-label={`Enquire about ${p.name} on WhatsApp`}
                    >
                      <Icon name="whatsapp" size={15} /> Enquire
                    </a>
                  </div>
                </div>
              </article>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      {results.length === 0 && (
        <div className="mt-6 rounded-[1.25rem] border border-dashed border-violet/30 bg-mist p-10 text-center">
          <p className="text-lg font-semibold text-navy">No stays match your search.</p>
          <button type="button" onClick={reset} className="mt-3 text-[0.95rem] font-semibold text-violet hover:text-royal">
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
