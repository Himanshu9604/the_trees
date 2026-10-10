import Image from "next/image";
import Link from "next/link";
import { getProperty, propertyHref } from "@/data/properties";
import { whatsappLink } from "@/lib/site";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Icon, type IconName } from "@/components/ui/Icon";

// Every benefit below is a fact stated on the original website — no invented claims.
const benefits: { icon: IconName; title: string; copy: string }[] = [
  { icon: "check", title: "Zero commission", copy: "Book directly with the property — no booking platform in between." },
  { icon: "whatsapp", title: "24×7 on WhatsApp", copy: "Message any property, any time, for availability and rates." },
  { icon: "users", title: "Owner-run hospitality", copy: "Hosted by the people who own each property." },
  { icon: "restaurant", title: "In-house dining", copy: "Restaurants at every stay, a café at Ravet, a villa meal plan in Lonavala." },
];

/** Direct-booking benefits, set as a floating white strip under the hero. */
export function BenefitsStrip() {
  return (
    <section aria-label="Why book direct" className="relative z-10 bg-white">
      <div className="container-site -mt-10 lg:-mt-14">
        <Stagger className="grid gap-px overflow-hidden rounded-[1.5rem] border border-line bg-line shadow-[var(--shadow-float)] sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b) => (
            <StaggerItem key={b.title} className="flex items-start gap-4 bg-white p-6">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-lavender text-violet">
                <Icon name={b.icon} size={20} />
              </span>
              <span>
                <span className="block font-semibold text-navy">{b.title}</span>
                <span className="mt-1 block text-[0.92rem] leading-[1.6] text-slate">{b.copy}</span>
              </span>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

const occasions: {
  title: string;
  copy: string;
  slugs: string[];
  image: { src: string; alt: string };
  message: string;
  icon: IconName;
}[] = [
  {
    title: "Work trips",
    copy: "Wi-Fi, in-house dining and a 24-hour reception, close to Hinjewadi and the expressway.",
    slugs: ["hotel-hinjewadi-phase-3-pune", "hotel-ravet-pune"],
    image: { src: "/images/hinjewadi-phase-3/gallary-7.jpg", alt: "Restaurant at Hotel The Tree Hinjewadi" },
    message: "Hello, I am planning a work trip to Pune and would like to enquire about a stay.",
    icon: "users",
  },
  {
    title: "Family weekends",
    copy: "Private villas with a fully equipped kitchen, indoor games, a garden and a shared pool.",
    slugs: ["resort-lonavala"],
    image: { src: "/images/lonavala/gallery-11.jpg", alt: "Villa living room at The Tree Resort Lonavala" },
    message: "Hello, I am planning a family weekend at The Tree Resort Lonavala.",
    icon: "leaf",
  },
  {
    title: "Celebrations",
    copy: "Birthdays, anniversaries and get-togethers with a banquet hall, garden and 5 BHK villa.",
    slugs: ["resort-lonavala"],
    image: { src: "/images/lonavala/gallery-5.jpg", alt: "Poolside pavilion at The Tree Resort Lonavala" },
    message: "Hello, I would like to plan a celebration at The Tree Resort Lonavala.",
    icon: "sparkle",
  },
];

/** Plan by occasion — image-led cards, each with a pre-filled WhatsApp enquiry. */
export function Occasions() {
  return (
    <section aria-labelledby="occasions-title" className="bg-white py-24 lg:py-32">
      <div className="container-site">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-violet-text">Made for every occasion</p>
          <h2 id="occasions-title" className="mt-4 text-[2.2rem] leading-[1.12] font-bold tracking-[-0.03em] text-navy sm:text-5xl">
            What are you <span className="text-gradient">planning?</span>
          </h2>
        </Reveal>

        <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
          {occasions.map((o) => {
            const lead = getProperty(o.slugs[0])!;
            return (
              <StaggerItem key={o.title} as="article" className="group flex flex-col overflow-hidden rounded-[1.5rem] border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-float)]">
                <div className="relative aspect-[16/11] overflow-hidden">
                  <Image src={o.image.src} alt={o.image.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute top-4 left-4 flex size-10 items-center justify-center rounded-xl bg-white/95 text-violet shadow-[var(--shadow-soft)]">
                    <Icon name={o.icon} size={19} />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-semibold text-navy">{o.title}</h3>
                  <p className="mt-2 text-[0.95rem] leading-[1.65] text-slate">{o.copy}</p>
                  <p className="mt-4 text-sm text-slate">
                    Best at{" "}
                    {o.slugs.map((s, i) => {
                      const p = getProperty(s)!;
                      return (
                        <span key={s}>
                          {i > 0 && " · "}
                          <Link href={propertyHref(p)} className="font-medium text-violet hover:text-royal">
                            {p.shortName}
                          </Link>
                        </span>
                      );
                    })}
                  </p>
                  <a
                    href={whatsappLink(lead.whatsapp, o.message)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center gap-2 pt-6 font-semibold text-navy transition-colors hover:text-violet"
                  >
                    <Icon name="whatsapp" size={17} className="text-violet" /> Plan it on WhatsApp
                    <Icon name="arrow-right" size={15} className="transition-transform group-hover:translate-x-1" />
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

/** Promotional banner for the Lonavala villas, using the published meal plan price. */
export function LonavalaPromo() {
  const p = getProperty("resort-lonavala")!;
  const plan = p.mealPlan!;
  return (
    <section aria-labelledby="promo-title" className="bg-white pb-24 lg:pb-32">
      <div className="container-site">
        <Reveal className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-violet to-royal text-white shadow-[var(--shadow-float)]">
          <div className="grid lg:grid-cols-2">
            <div className="relative z-10 p-8 sm:p-12 lg:p-14">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-[0.8rem] font-semibold">
                <Icon name="sparkle" size={14} /> Weekend getaway
              </span>
              <h2 id="promo-title" className="mt-5 text-[2rem] leading-[1.15] font-bold tracking-[-0.03em] text-white sm:text-[2.6rem]">
                Your private villa in Lonavala, with meals sorted.
              </h2>
              <p className="mt-4 max-w-md text-[1.02rem] leading-[1.7] text-white/85">
                3 BHK and 5 BHK villas, a garden and a shared pool. Add the villa meal plan — hi-tea, dinner and breakfast.
              </p>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-sm text-white/80">{plan.basis} · meal plan</span>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={whatsappLink(p.whatsapp, `Hello, I would like to book a villa weekend at ${p.name}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-7 font-semibold text-violet transition-transform hover:-translate-y-0.5"
                >
                  <Icon name="whatsapp" size={18} /> Check villa availability
                </a>
                <Link href={propertyHref(p)} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/40 px-7 font-semibold text-white hover:bg-white/10">
                  Explore the resort
                </Link>
              </div>
            </div>
            <div className="relative min-h-[16rem] lg:min-h-full">
              <Image src="/images/lonavala/hero.jpg" alt="The Tree Resort Lonavala with its swimming pool in the evening" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
          </div>
        </Reveal>
        <p className="mt-4 text-center text-sm text-slate">
          Villa rates are shared on enquiry. Or call{" "}
          <a href={`tel:${p.phone.tel}`} className="font-medium text-violet hover:text-royal">
            {p.phone.display}
          </a>
          .
        </p>
      </div>
    </section>
  );
}
