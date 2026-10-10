import Image from "next/image";
import Link from "next/link";
import { testimonials } from "@/data/content";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";

// Photograph shown with each guest's story, matched to the property they stayed at.
const storyImage: Record<string, { src: string; alt: string }> = {
  "resort-lonavala": { src: "/images/lonavala/hero.jpg", alt: "The Tree Resort Lonavala with its pool in the evening" },
  "hotel-ravet-pune": { src: "/images/ravet/gallary-11.jpg", alt: "Guest room at The Tree Hotel Ravet" },
  "hotel-hinjewadi-phase-3-pune": { src: "/images/hinjewadi-phase-3/gallary-2.jpg", alt: "Deluxe room at Hotel The Tree Hinjewadi" },
};

function initials(name: string) {
  return name
    .split(/\s|&/)
    .filter(Boolean)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function QuoteMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 36" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="M0 36V22C0 10 6.5 2.6 19.4 0l2 4.4C14.6 6.6 11 10.6 10.4 16H20v20H0Zm27 0V22C27 10 33.5 2.6 46.4 0l2 4.4C41.6 6.6 38 10.6 37.4 16H47v20H27Z"
      />
    </svg>
  );
}

/** G. Guest testimonials — a featured story beside two supporting cards. Real reviews only. */
export function Testimonials() {
  const [lead, ...rest] = testimonials;
  const leadImage = storyImage[lead.propertySlug];

  return (
    <section aria-labelledby="stories-title" className="bg-mist py-24 lg:py-32">
      <div className="container-site">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-violet-text">Guest testimonials</p>
            <h2 id="stories-title" className="mt-4 text-[2.2rem] leading-[1.12] font-bold tracking-[-0.03em] text-navy sm:text-5xl">
              Loved by the guests <span className="text-gradient">who stayed</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-[1rem] leading-[1.7] text-slate">
              In their own words — from weekends in Lonavala to work trips in Pune.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.35fr_1fr]">
          {/* Featured story */}
          <Reveal className="relative overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-violet to-royal text-white shadow-[var(--shadow-float)]">
            <div className="grid h-full sm:grid-cols-[1fr_0.75fr]">
              <figure className="relative z-10 flex flex-col p-8 sm:p-10">
                <QuoteMark className="h-9 w-12 text-white/35" />
                <blockquote className="mt-6 text-[1.35rem] leading-[1.5] font-medium tracking-[-0.01em] sm:text-[1.55rem]">
                  “{lead.quote}”
                </blockquote>
                <figcaption className="mt-auto flex items-center gap-3 pt-10">
                  <span className="flex size-12 items-center justify-center rounded-full bg-white text-[0.95rem] font-bold text-violet">
                    {initials(lead.name)}
                  </span>
                  <span>
                    <span className="block font-semibold">{lead.name}</span>
                    <Link href={`/properties/${lead.propertySlug}`} className="inline-flex items-center gap-1 text-sm text-white/80 hover:text-white">
                      <Icon name="pin" size={13} /> Stayed at {lead.property}
                    </Link>
                  </span>
                </figcaption>
              </figure>
              <div className="relative hidden min-h-[18rem] sm:block">
                <Image src={leadImage.src} alt={leadImage.alt} fill sizes="25vw" className="object-cover" />
              </div>
            </div>
          </Reveal>

          {/* Supporting stories */}
          <Stagger className="grid gap-6">
            {rest.map((t) => {
              const img = storyImage[t.propertySlug];
              return (
                <StaggerItem key={t.name}>
                  <figure className="flex h-full flex-col rounded-[1.5rem] border border-line bg-white p-7 shadow-[var(--shadow-soft)] transition-transform duration-300 hover:-translate-y-1">
                    <QuoteMark className="h-6 w-8 text-violet/30" />
                    <blockquote className="mt-4 text-[1.05rem] leading-[1.65] text-navy">“{t.quote}”</blockquote>
                    <figcaption className="mt-6 flex items-center justify-between gap-4 border-t border-line pt-5">
                      <span className="flex items-center gap-3">
                        <span className="flex size-10 items-center justify-center rounded-full bg-lavender text-sm font-bold text-violet-text">
                          {initials(t.name)}
                        </span>
                        <span>
                          <span className="block text-[0.95rem] font-semibold text-navy">{t.name}</span>
                          <Link href={`/properties/${t.propertySlug}`} className="text-[0.85rem] text-slate hover:text-violet">
                            {t.property}
                          </Link>
                        </span>
                      </span>
                      <span className="relative size-12 shrink-0 overflow-hidden rounded-xl">
                        <Image src={img.src} alt={img.alt} fill sizes="48px" className="object-cover" />
                      </span>
                    </figcaption>
                  </figure>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
