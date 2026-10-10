import { amenityLabels, type MealPlan, type Property } from "@/data/properties";
import { whatsappLink } from "@/lib/site";
import { buttonClasses } from "@/lib/ui";
import { Icon } from "@/components/ui/Icon";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";

export function RoomList({ property: p }: { property: Property }) {
  return (
    <Stagger as="ul" className="border-t border-ink/15">
      {p.rooms.map((room, i) => (
        <StaggerItem
          as="li"
          key={room.name}
          className="grid gap-4 border-b border-ink/15 py-8 sm:grid-cols-[4rem_1fr_auto] sm:items-baseline sm:gap-6"
        >
          <span className="text-3xl leading-none text-brass" aria-hidden="true">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className="text-[1.9rem] leading-tight text-ink">{room.name}</h3>
            <p className="mt-2 max-w-md text-[0.95rem] leading-[1.8] text-ink-muted">{room.note}</p>
            <p className="caption mt-3 text-brass-text">
              {room.units} {room.units === 1 ? "unit" : "units"} &nbsp;·&nbsp; Rates on enquiry
            </p>
          </div>
          <a
            href={whatsappLink(p.whatsapp, `Hello, I would like to check availability of the ${room.name} at ${p.name}.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="link-line self-start text-[0.92rem] font-semibold whitespace-nowrap text-ink sm:self-baseline"
            aria-label={`Check availability for ${room.name} on WhatsApp`}
          >
            Check availability
          </a>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

/** Amenities as a fine-ruled index rather than a grid of icon tiles. */
export function AmenityGrid({ property: p }: { property: Property }) {
  return (
    <Stagger as="ul" className="grid border-t border-ink/15 sm:grid-cols-2 sm:gap-x-12 lg:grid-cols-3" stagger={0.05}>
      {p.amenities.map((a) => (
        <StaggerItem as="li" key={a} className="flex items-center gap-4 border-b border-ink/15 py-5">
          <Icon name={a} size={20} strokeWidth={1.2} className="shrink-0 text-wine" />
          <span className="text-xl text-ink">{amenityLabels[a]}</span>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

export function MealPlanCard({ plan }: { plan: MealPlan }) {
  return (
    <Reveal className="relative overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-violet to-royal p-8 text-white shadow-[var(--shadow-float)] sm:p-12 lg:p-16">
      <div className="relative z-[2] grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="eyebrow text-brass-soft">Villa meal plan</p>
          <p className="display mt-6 text-7xl text-paper">{plan.price}</p>
          <p className="caption mt-3 text-paper/70">{plan.basis}</p>
          <ul className="mt-8 space-y-2 border-l border-brass/60 pl-4 text-sm text-paper/75">
            {plan.notes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </div>
        <div className="grid gap-10 sm:grid-cols-3 lg:col-span-8">
          {plan.courses.map((c) => (
            <div key={c.title}>
              <h3 className="border-b border-paper/20 pb-3 text-[1.7rem] text-paper">{c.title}</h3>
              <ul className="mt-4 space-y-2 text-[0.92rem] text-paper/80">
                {c.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

export function ContactPanel({ property: p }: { property: Property }) {
  return (
    <div className="border-t border-wine bg-stone-soft p-7 sm:p-9">
      <p className="eyebrow text-brass-text">Book directly</p>
      <p className="mt-4 text-[1.7rem] leading-snug text-ink">
        Call or WhatsApp {p.shortName}. <em>No middleman.</em>
      </p>
      <div className="mt-7 grid gap-3">
        <a
          href={whatsappLink(p.whatsapp, `Hello, I would like to enquire about a stay at ${p.name}.`)}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClasses("forest", "w-full")}
        >
          <Icon name="whatsapp" size={17} /> WhatsApp enquiry
        </a>
        <a href={`tel:${p.phone.tel}`} className={buttonClasses("outline-dark", "w-full")}>
          {p.phone.display}
        </a>
      </div>
      <dl className="mt-8 space-y-5 border-t border-ink/15 pt-6 text-sm">
        <div>
          <dt className="eyebrow text-[0.92rem] text-ink-muted">Email</dt>
          <dd className="mt-1.5">
            <a href={`mailto:${p.email}`} className="link-draw break-all text-ink">
              {p.email}
            </a>
          </dd>
        </div>
        <div>
          <dt className="eyebrow text-[0.92rem] text-ink-muted">Address</dt>
          <dd className="mt-1.5 leading-relaxed text-ink">
            {p.address.full}
            <a href={p.mapUrl} target="_blank" rel="noopener noreferrer" className="link-line mt-2 block w-fit text-[0.92rem] font-semibold">
              Open in Google Maps
            </a>
          </dd>
        </div>
      </dl>
    </div>
  );
}
