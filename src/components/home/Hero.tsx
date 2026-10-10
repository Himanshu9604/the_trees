"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { properties, propertyHref } from "@/data/properties";
import { buttonClasses } from "@/lib/ui";
import { Icon } from "@/components/ui/Icon";
import { HeroSearch } from "./HeroSearch";

const ease = [0.22, 1, 0.36, 1] as const;

// The photograph that represents each property in the hero composition.
const shots: Record<string, { src: string; alt: string }> = {
  "hotel-ravet-pune": { src: "/images/ravet/gallary-2.jpg", alt: "Suite lounge at The Tree Hotel Ravet with soft cove lighting" },
  "resort-lonavala": { src: "/images/lonavala/gallery-5.jpg", alt: "Poolside pavilion at The Tree Resort Lonavala in the evening" },
  "hotel-hinjewadi-phase-3-pune": {
    src: "/images/hinjewadi-phase-3/gallary-2.jpg",
    alt: "Deluxe room at Hotel The Tree Hinjewadi Phase 3",
  },
};

const order = ["hotel-ravet-pune", "resort-lonavala", "hotel-hinjewadi-phase-3-pune"];

const enter = (delay: number) => ({
  "data-reveal": true,
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease, delay },
});

export function Hero() {
  const reduce = useReducedMotion();
  const [lead, setLead] = useState(order[0]);
  const p = properties.find((x) => x.slug === lead)!;
  const others = order.filter((s) => s !== lead);

  return (
    <section aria-labelledby="hero-title" className="bg-aurora relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background-image:radial-gradient(rgba(103,71,245,0.18)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(70%_60%_at_30%_40%,black,transparent)]"
      />
      {/* Soft drifting light — the one animated accent */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-[-10%] size-[38rem] rounded-full bg-[radial-gradient(circle,rgba(103,71,245,0.22),transparent_65%)] blur-2xl"
        animate={reduce ? undefined : { x: [0, -40, 0], y: [0, 30, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container-site relative grid min-h-[calc(88svh-5rem)] items-center gap-14 py-14 lg:grid-cols-[1fr_1.05fr] lg:gap-10 lg:py-20">
        {/* LEFT — text */}
        <div className="max-w-xl">
          <motion.p {...enter(0.05)} className="eyebrow inline-flex items-center gap-2 rounded-full border border-violet/15 bg-white/70 px-3.5 py-1.5 text-violet-text">
            <span className="size-1.5 rounded-full bg-gradient-to-r from-violet to-royal" aria-hidden="true" />
            The Tree Hotels &amp; Resorts
          </motion.p>

          <motion.h1
            id="hero-title"
            {...enter(0.15)}
            className="mt-6 text-[2.6rem] leading-[1.08] font-bold tracking-[-0.035em] text-navy sm:text-[3.6rem] lg:text-[4.1rem] xl:text-[4.6rem]"
          >
            Your Next
            <br />
            <span className="text-gradient">Beautiful Escape.</span>
          </motion.h1>

          <motion.p {...enter(0.3)} className="mt-6 max-w-[34rem] text-[1.05rem] leading-[1.75] text-slate sm:text-lg">
            Discover welcoming stays, thoughtfully designed spaces, and memorable experiences across our destinations.
          </motion.p>

          <motion.div {...enter(0.45)} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/#properties" className={buttonClasses("gold", "min-h-13 px-8")}>
              Explore Our Stays
              <Icon name="arrow-right" size={17} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
            </Link>
            <Link href="/#destinations" className={buttonClasses("outline-dark", "min-h-13 px-8")}>
              Discover Destinations
            </Link>
          </motion.div>

          <motion.div {...enter(0.6)} className="mt-10">
            <HeroSearch />
          </motion.div>
        </div>

        {/* RIGHT — layered photography */}
        <div className="relative mx-auto w-full max-w-[36rem] lg:max-w-none">
          <motion.div
            data-reveal
            initial={{ opacity: 0, scale: 0.96, clipPath: "inset(8% 8% 8% 8% round 1.75rem)" }}
            animate={{ opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0% round 1.75rem)" }}
            transition={{ duration: 1.1, ease, delay: 0.2 }}
            className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-periwinkle shadow-[var(--shadow-float)] sm:aspect-[5/4] lg:ml-auto lg:aspect-[4/5] lg:w-[82%]"
          >
            <AnimatePresence initial={false}>
              <motion.div
                key={lead}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease }}
              >
                <Image src={shots[lead].src} alt={shots[lead].alt} fill priority sizes="(min-width: 1024px) 42vw, 100vw" className="object-cover" />
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Smaller overlapping property panels (desktop & tablet) — click to bring forward */}
          <div className="absolute top-[12%] left-0 hidden w-[34%] flex-col gap-4 sm:flex lg:-left-2">
            {others.map((slug, i) => {
              const x = properties.find((y) => y.slug === slug)!;
              return (
                <motion.button
                  key={slug}
                  type="button"
                  onClick={() => setLead(slug)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease, delay: 0.6 + i * 0.12 }}
                  className="group overflow-hidden rounded-2xl border-4 border-white bg-white text-left shadow-[var(--shadow-soft)] transition-transform duration-300 hover:-translate-y-1"
                  aria-label={`Show ${x.name}`}
                >
                  <span className="relative block aspect-[4/3]">
                    <Image src={shots[slug].src} alt="" fill sizes="16vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  </span>
                  <span className="block px-2.5 py-2 text-[0.8rem] leading-tight font-semibold text-navy">{x.shortName}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Floating destination label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.85 }}
            className="relative z-10 mx-4 -mt-12 sm:absolute sm:right-6 sm:bottom-8 sm:mx-0 sm:mt-0 sm:w-[19rem]"
          >
            <div className={reduce ? "" : "animate-float"}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={lead}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.35 }}
                  className="rounded-2xl border border-white/70 bg-white/95 p-4 shadow-[var(--shadow-float)] backdrop-blur"
                >
                  <p className="flex items-center gap-1.5 text-[0.8rem] font-medium text-violet-text">
                    <Icon name="pin" size={13} /> {p.cityLabel}
                  </p>
                  <p className="mt-1.5 text-[1.05rem] font-semibold text-navy">{p.name}</p>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <span className="text-[0.8rem] text-slate">{p.rooms.length} stay types · {p.type}</span>
                    <Link href={propertyHref(p)} className="inline-flex items-center gap-1 text-[0.85rem] font-semibold text-violet hover:text-royal">
                      View <Icon name="arrow-right" size={13} />
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Floating amenity chips — real facilities */}
          <motion.span
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease, delay: 1.1 }}
            className="absolute top-[38%] -right-3 hidden items-center gap-2 rounded-2xl bg-white px-3.5 py-2.5 text-[0.82rem] font-semibold text-navy shadow-[var(--shadow-float)] xl:flex"
          >
            <span className="flex size-8 items-center justify-center rounded-xl bg-lavender text-violet">
              <Icon name="pool" size={16} />
            </span>
            Shared pool · Lonavala
          </motion.span>
          <motion.span
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease, delay: 1.25 }}
            className="absolute top-[52%] -right-6 hidden items-center gap-2 rounded-2xl bg-white px-3.5 py-2.5 text-[0.82rem] font-semibold text-navy shadow-[var(--shadow-float)] xl:flex"
          >
            <span className="flex size-8 items-center justify-center rounded-xl bg-lavender text-violet">
              <Icon name="wifi" size={16} />
            </span>
            Wi-Fi at every stay
          </motion.span>

          {/* Small location indicator */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute top-4 right-4 hidden items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-[0.78rem] font-medium text-navy shadow-[var(--shadow-soft)] sm:flex lg:right-4"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-violet/40 motion-safe:animate-ping" />
              <span className="relative inline-flex size-2 rounded-full bg-violet" />
            </span>
            Pune &amp; Lonavala
          </motion.span>
        </div>
      </div>
    </section>
  );
}
