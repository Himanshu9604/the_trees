"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/ui";
import { Icon } from "./Icon";

export interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  /** Property name shown as a badge on the image. */
  label?: string;
}

interface GalleryProps {
  images: GalleryImage[];
  /** Masonry columns at large widths. */
  columns?: 3 | 4;
  /** "collage" composes a fixed editorial pattern of mixed spans and aspect ratios. */
  layout?: "masonry" | "collage" | "bento";
}

// Editorial collage: mobile pairs wide and narrow frames; desktop staggers mixed proportions.
const collage = [
  { cell: "col-span-2 md:col-span-7", ratio: "aspect-[4/3]" },
  { cell: "col-span-1 md:col-span-5 md:mt-32", ratio: "aspect-[4/5]" },
  { cell: "col-span-1 md:col-span-4", ratio: "aspect-[3/4]" },
  { cell: "col-span-2 md:col-span-5 md:mt-24", ratio: "aspect-square" },
  { cell: "col-span-1 md:col-span-3 md:mt-48", ratio: "aspect-[3/4]" },
  { cell: "col-span-1 md:col-span-6 md:col-start-2", ratio: "aspect-[16/10]" },
  { cell: "col-span-2 md:col-span-4 md:col-start-9 md:-mt-16", ratio: "aspect-[4/5]" },
];

// Bento: one large feature frame plus smaller frames, all rounded with a property badge.
const bento = [
  "col-span-2 row-span-2 md:col-span-2 md:row-span-2",
  "col-span-1",
  "col-span-1",
  "col-span-1",
  "col-span-1",
];

function Badge({ label }: { label?: string }) {
  if (!label) return null;
  return (
    <span className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-[0.78rem] font-semibold text-navy shadow-[0_6px_16px_-8px_rgba(23,33,61,0.4)]">
      <span className="size-1.5 rounded-full bg-gradient-to-r from-violet to-royal" aria-hidden="true" />
      {label}
    </span>
  );
}

export function Gallery({ images, columns = 3, layout = "masonry" }: GalleryProps) {
  const [index, setIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  const close = useCallback(() => {
    setIndex(null);
    triggerRef.current?.focus();
  }, []);

  const open = (el: HTMLButtonElement, i: number) => {
    triggerRef.current = el;
    setDirection(0);
    setIndex(i);
  };

  const step = useCallback(
    (delta: number) => {
      setDirection(delta);
      setIndex((i) => (i === null ? i : (i + delta + images.length) % images.length));
    },
    [images.length],
  );

  const isOpen = index !== null;

  useEffect(() => {
    if (!isOpen) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close, step]);

  const current = index === null ? null : images[index];
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <>
      {layout === "bento" ? (
        <ul className="grid auto-rows-[9.5rem] grid-cols-2 gap-3 sm:auto-rows-[12rem] sm:gap-4 md:grid-cols-4 lg:auto-rows-[14rem]">
          {images.map((img, i) => (
            <li key={img.src} className={bento[i % bento.length]}>
              <button
                type="button"
                onClick={(e) => open(e.currentTarget, i)}
                className="group relative block h-full w-full overflow-hidden rounded-[1.25rem] bg-stone"
                aria-label={`Open image: ${img.alt}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes={i % bento.length === 0 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-navy/55 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true" />
                {i % bento.length === 0 && <Badge label={img.label} />}
                {img.caption && (
                  <span className="absolute inset-x-3 bottom-3 translate-y-2 text-left text-[0.85rem] font-medium text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    {img.caption}
                  </span>
                )}
                <span className="absolute right-3 bottom-3 flex size-9 items-center justify-center rounded-full bg-white/95 text-navy opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true">
                  <Icon name="expand" size={15} />
                </span>
              </button>
            </li>
          ))}
        </ul>
      ) : layout === "collage" ? (
        <ul className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-12 md:gap-x-6 md:gap-y-10">
          {images.map((img, i) => {
            const slot = collage[i % collage.length];
            return (
              <li key={img.src} className={slot.cell}>
                <button
                  type="button"
                  onClick={(e) => open(e.currentTarget, i)}
                  className={cn("group relative block w-full overflow-hidden bg-stone", slot.ratio)}
                  aria-label={`Open image: ${img.alt}`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-[1.8s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                  />
                  <Badge label={img.label} />
                </button>
                {img.caption && <p className="caption mt-3 hidden text-ink-muted md:block">{img.caption}</p>}
              </li>
            );
          })}
        </ul>
      ) : (
      <ul className={cn("columns-2 gap-3 sm:gap-4", columns === 4 ? "md:columns-3 xl:columns-4" : "md:columns-3")}>
        {images.map((img, i) => (
          <li key={img.src} className="mb-3 break-inside-avoid sm:mb-4">
            <button
              type="button"
              onClick={(e) => open(e.currentTarget, i)}
              className="group relative block w-full overflow-hidden rounded-[1rem] bg-stone"
              aria-label={`Open image: ${img.alt}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={img.width}
                height={img.height}
                sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
                className="h-auto w-full transition-transform duration-[1.2s] ease-out group-hover:scale-105"
              />
              <Badge label={img.label} />
              <span className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-ink/70 via-transparent to-transparent p-4 text-left text-ivory opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                <span className="text-xs">{img.caption}</span>
                <Icon name="expand" size={18} />
              </span>
            </button>
          </li>
        ))}
      </ul>
      )}

      {mounted &&
        createPortal(
      <AnimatePresence>
        {current && index !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Image viewer"
            className="fixed inset-0 z-[90] flex flex-col bg-ink/[0.97]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={close}
          >
            <div className="flex items-center justify-between px-4 py-4 text-ivory sm:px-8" onClick={(e) => e.stopPropagation()}>
              <p className="text-xs text-ivory/70" aria-live="polite">
                {index + 1} / {images.length}
                {(current.label || current.caption) && <span className="ml-3 text-brass-soft">{[current.label, current.caption].filter(Boolean).join(" · ")}</span>}
              </p>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                className="flex size-12 items-center justify-center rounded-full border border-ivory/25 transition-colors hover:border-brass-soft"
                aria-label="Close image viewer"
              >
                <Icon name="close" size={20} />
              </button>
            </div>

            <div className="relative flex flex-1 items-center justify-center overflow-hidden px-4 pb-6 sm:px-20">
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.figure
                  key={current.src}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 60, scale: 0.97 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: direction * -60, scale: 0.97 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="relative flex h-full w-full max-w-6xl flex-col items-center justify-center"
                  onClick={(e) => e.stopPropagation()}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.4}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -80) step(1);
                    else if (info.offset.x > 80) step(-1);
                  }}
                >
                  <div className="relative h-[68svh] w-full">
                    <Image src={current.src} alt={current.alt} fill sizes="100vw" className="object-contain" priority />
                  </div>
                  <figcaption className="mt-4 max-w-2xl text-center text-sm text-ivory/80">{current.alt}</figcaption>
                </motion.figure>
              </AnimatePresence>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  step(-1);
                }}
                className="absolute top-1/2 left-2 flex size-12 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/25 bg-ink/60 text-ivory transition-colors hover:border-brass-soft sm:left-6"
                aria-label="Previous image"
              >
                <Icon name="arrow-left" size={20} />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  step(1);
                }}
                className="absolute top-1/2 right-2 flex size-12 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/25 bg-ink/60 text-ivory transition-colors hover:border-brass-soft sm:right-6"
                aria-label="Next image"
              >
                <Icon name="arrow-right" size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
