import Image from "next/image";
import { siteConfig, whatsappLink } from "@/lib/site";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Icon, type IconName } from "@/components/ui/Icon";

const steps: { icon: IconName; title: string; copy: string }[] = [
  { icon: "search", title: "Choose your stay", copy: "Browse our three properties and pick the rooms or villa that suit your trip." },
  { icon: "whatsapp", title: "Message your dates", copy: "Send your dates and guest count on WhatsApp, any time of day or night." },
  { icon: "check", title: "Confirm directly", copy: "The property team shares availability and rates, and confirms your stay with you." },
];

/** How booking works: three clear steps. */
export function HowItWorks() {
  return (
    <section aria-labelledby="how-title" className="bg-white py-24 lg:py-28">
      <div className="container-site grid gap-12 lg:grid-cols-[0.9fr_1.4fr] lg:items-center">
        <Reveal>
          <p className="eyebrow text-violet-text">How booking works</p>
          <h2 id="how-title" className="mt-4 text-[2.2rem] leading-[1.12] font-bold tracking-[-0.03em] text-navy sm:text-5xl">
            Booked in <span className="text-gradient">three easy steps</span>
          </h2>
          <p className="mt-4 max-w-md text-[1.02rem] leading-[1.75] text-slate">
            No apps, no long forms, no middleman. Just a conversation with the people who run the property.
          </p>
        </Reveal>
        <Stagger as="ul" className="relative grid gap-5 md:grid-cols-3">
          {steps.map((s, i) => (
            <StaggerItem as="li" key={s.title} className="relative rounded-[1.25rem] border border-line bg-white p-6 shadow-[var(--shadow-soft)]">
              <span className="relative flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet to-royal text-white">
                <Icon name={s.icon} size={20} />
                <span className="absolute -top-2 -right-2 flex size-6 items-center justify-center rounded-full border border-line bg-white text-[0.75rem] font-bold text-violet">
                  {i + 1}
                </span>
              </span>
              <h3 className="mt-5 text-lg font-semibold text-navy">{s.title}</h3>
              <p className="mt-2 text-[0.93rem] leading-[1.65] text-slate">{s.copy}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

const directRows: { label: string; direct: string; platform: string }[] = [
  { label: "Booking commission", direct: "Zero, you deal with the property", platform: "A platform sits in between" },
  { label: "Who you speak to", direct: "The owner-run property team", platform: "Usually a support desk" },
  { label: "Special requests", direct: "Celebrations, meal plan and room preferences arranged directly", platform: "Passed on through the platform" },
  { label: "Reaching us", direct: "24×7 on WhatsApp", platform: "Depends on the platform" },
];

/** Why book direct: a clean side-by-side explaining the direct-booking promise. */
export function BookDirect() {
  return (
    <section aria-labelledby="direct-title" className="bg-mist py-24 lg:py-28">
      <div className="container-site">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-violet-text">Why book direct</p>
          <h2 id="direct-title" className="mt-4 text-[2.2rem] leading-[1.12] font-bold tracking-[-0.03em] text-navy sm:text-5xl">
            Direct is <span className="text-gradient">simply better</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-[1.5rem] border border-line bg-white shadow-[var(--shadow-soft)]">
          <div className="grid grid-cols-2 border-b border-line bg-lavender/60 text-sm font-semibold sm:grid-cols-[1fr_1.2fr_1fr]">
            <span className="hidden p-4 sm:block" />
            <span className="flex items-center gap-2 p-4 text-violet-text">
              <Icon name="check" size={16} /> With The Tree
            </span>
            <span className="p-4 text-slate">Through a platform</span>
          </div>
          {directRows.map((r) => (
            <div key={r.label} className="grid grid-cols-2 border-b border-line text-[0.93rem] last:border-0 sm:grid-cols-[1fr_1.2fr_1fr]">
              <span className="col-span-2 px-4 pt-4 font-semibold text-navy sm:col-span-1 sm:pb-4">{r.label}</span>
              <span className="flex items-start gap-2 p-4 text-navy">
                <Icon name="check" size={16} className="mt-0.5 shrink-0 text-violet" /> {r.direct}
              </span>
              <span className="p-4 text-slate">{r.platform}</span>
            </div>
          ))}
        </Reveal>
        <div className="mt-10 text-center">
          <a
            href={whatsappLink(siteConfig.primaryWhatsApp, "Hello The Tree, I would like to book directly.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-13 items-center gap-2 rounded-full bg-gradient-to-r from-violet to-royal px-8 font-semibold text-white shadow-[0_12px_30px_-12px_rgba(53,36,244,0.6)] transition-transform hover:-translate-y-0.5"
          >
            <Icon name="whatsapp" size={18} /> Book directly on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

const instaShots = [
  { src: "/images/lonavala/gallery-5.jpg", alt: "Poolside pavilion at The Tree Resort Lonavala" },
  { src: "/images/ravet/gallary-1.jpg", alt: "Guest room at The Tree Hotel Ravet" },
  { src: "/images/lonavala/gallery-1.jpg", alt: "Four-poster villa bedroom, Lonavala" },
  { src: "/images/hinjewadi-phase-3/gallary-9.jpg", alt: "Reception at Hotel The Tree Hinjewadi" },
  { src: "/images/lonavala/gallery-13.jpg", alt: "Villa kitchen at The Tree Resort Lonavala" },
  { src: "/images/ravet/gallary-8.jpg", alt: "Twin room at The Tree Hotel Ravet" },
];

/** Social: the brand's own Instagram with a follow CTA over a photo grid. */
export function InstagramFeed() {
  const { handle, url } = siteConfig.instagram;
  return (
    <section aria-labelledby="insta-title" className="bg-white py-24 lg:py-28">
      <div className="container-site">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <p className="eyebrow text-violet-text">Follow along</p>
            <h2 id="insta-title" className="mt-4 text-[2.2rem] leading-[1.12] font-bold tracking-[-0.03em] text-navy sm:text-5xl">
              Moments from <span className="text-gradient">The Tree</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-line bg-white px-6 font-semibold text-navy transition-colors hover:border-violet hover:text-violet"
            >
              <Icon name="instagram" size={18} /> Follow {handle}
            </a>
          </Reveal>
        </div>
        <Stagger as="ul" className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {instaShots.map((s) => (
            <StaggerItem as="li" key={s.src}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-square overflow-hidden rounded-[1.25rem]"
                aria-label={`${s.alt}, view on Instagram`}
              >
                <Image
                  src={s.src}
                  alt={s.alt}
                  fill
                  sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <span
                  className="absolute inset-0 flex items-center justify-center bg-violet/0 text-white opacity-0 transition-all duration-500 group-hover:bg-violet/55 group-hover:opacity-100"
                  aria-hidden="true"
                >
                  <Icon name="instagram" size={26} />
                </span>
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
