import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { properties, propertyHref, type AmenityKey, type Property } from "@/data/properties";
import { whatsappLink } from "@/lib/site";
import { cn } from "@/lib/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Icon, type IconName } from "@/components/ui/Icon";

const has = (p: Property, a: AmenityKey) => p.amenities.includes(a);

// Facilities compared across the three properties — all from the property data.
const facilities: { key: AmenityKey; label: string }[] = [
  { key: "pool", label: "Swimming pool" },
  { key: "banquet", label: "Banquet hall" },
  { key: "garden", label: "Garden" },
  { key: "kitchen", label: "Villa kitchen" },
  { key: "reception", label: "24-hour reception" },
  { key: "cafe", label: "Café" },
  { key: "wifi", label: "Wi-Fi" },
  { key: "parking", label: "Parking" },
];

function Spec({ icon, label, children }: { icon: IconName; label: string; children: ReactNode }) {
  return (
    <div className="flex gap-3 border-b border-line py-4 lg:min-h-[5.75rem]">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-lavender text-violet">
        <Icon name={icon} size={16} />
      </span>
      <div className="min-w-0">
        <p className="text-[0.78rem] font-medium text-slate">{label}</p>
        <p className="mt-0.5 text-[0.93rem] leading-[1.5] text-navy">{children}</p>
      </div>
    </div>
  );
}

/** Compare at a glance — three side-by-side property cards with aligned specs and facility checks. */
export function Comparison() {
  return (
    <section aria-labelledby="compare-title" className="bg-mist py-24 lg:py-32">
      <div className="container-site">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-violet-text">Compare at a glance</p>
            <h2 id="compare-title" className="mt-4 text-[2.2rem] leading-[1.12] font-bold tracking-[-0.03em] text-navy sm:text-5xl">
              Which Tree is <span className="text-gradient">right for you?</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-[1rem] leading-[1.7] text-slate">
              Three different stays, side by side. Pick the one that suits your plans — then enquire directly.
            </p>
          </Reveal>
        </div>

        <Stagger className="mt-12 grid gap-6 lg:grid-cols-3">
          {properties.map((p) => {
            const dining = [has(p, "restaurant") && "In-house restaurant", has(p, "cafe") && "Café", p.mealPlan && "Villa meal plan"]
              .filter(Boolean)
              .join(" · ");
            return (
              <StaggerItem
                key={p.slug}
                as="article"
                className="group flex flex-col overflow-hidden rounded-[1.5rem] border border-line bg-white shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:border-violet/30 hover:shadow-[var(--shadow-float)]"
              >
                {/* Header */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={p.heroImage.src}
                    alt={p.heroImage.alt}
                    fill
                    sizes="(min-width: 1024px) 30vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute top-4 left-4 rounded-full bg-white/95 px-3 py-1 text-[0.78rem] font-semibold text-violet-text">
                    {p.type === "Villa" ? "Villa resort" : "City hotel"}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-[1.35rem] leading-tight font-semibold text-navy">
                    <Link href={propertyHref(p)} className="transition-colors hover:text-violet">
                      {p.name}
                    </Link>
                  </h3>
                  <p className="mt-1.5 flex items-center gap-1.5 text-sm text-slate">
                    <Icon name="pin" size={14} className="text-violet" /> {p.cityLabel}
                  </p>

                  <div className="mt-4">
                    <Spec icon="bed" label={p.type === "Villa" ? "Villas & cottages" : "Room types"}>
                      {p.rooms.map((r) => r.name).join(", ")}
                    </Spec>
                    <Spec icon="users" label="Best for">
                      {p.bestFor.join(", ")}
                    </Spec>
                    <Spec icon="restaurant" label="Dining">
                      {dining}
                    </Spec>
                  </div>

                  {/* Facility checks */}
                  <ul className="mt-5 grid grid-cols-2 gap-x-3 gap-y-2.5" aria-label={`Facilities at ${p.name}`}>
                    {facilities.map((f) => {
                      const yes = has(p, f.key);
                      return (
                        <li key={f.key} className={cn("flex items-center gap-2 text-[0.88rem]", yes ? "text-navy" : "text-slate/50")}>
                          <span
                            className={cn(
                              "flex size-5 shrink-0 items-center justify-center rounded-full",
                              yes ? "bg-gradient-to-br from-violet to-royal text-white" : "bg-line text-slate/60",
                            )}
                            aria-hidden="true"
                          >
                            <Icon name={yes ? "check" : "close"} size={11} strokeWidth={2.4} />
                          </span>
                          <span className={yes ? "" : "line-through decoration-slate/30"}>{f.label}</span>
                          <span className="sr-only">{yes ? "available" : "not available"}</span>
                        </li>
                      );
                    })}
                  </ul>

                  {/* Actions */}
                  <div className="mt-auto grid grid-cols-2 gap-3 pt-7">
                    <Link
                      href={propertyHref(p)}
                      className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full border border-line text-[0.92rem] font-semibold text-navy transition-colors hover:border-violet hover:text-violet"
                    >
                      View details
                    </Link>
                    <a
                      href={whatsappLink(p.whatsapp, `Hello, I would like to enquire about a stay at ${p.name}.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-violet to-royal text-[0.92rem] font-semibold text-white shadow-[0_10px_24px_-12px_rgba(53,36,244,0.6)]"
                      aria-label={`Enquire about ${p.name} on WhatsApp`}
                    >
                      <Icon name="whatsapp" size={15} /> Enquire
                    </a>
                  </div>
                  <a href={`tel:${p.phone.tel}`} className="mt-3 text-center text-sm text-slate hover:text-violet">
                    or call {p.phone.display}
                  </a>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
