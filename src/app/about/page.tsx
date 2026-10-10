import Image from "next/image";
import Link from "next/link";
import { properties, propertyHref } from "@/data/properties";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { WhyChoose } from "@/components/home/WhyChoose";
import { Testimonials } from "@/components/home/Testimonials";
import { ImageReveal, MaskLines, Reveal } from "@/components/ui/Reveal";

export const metadata = pageMetadata({
  title: "About The Tree — Owner-run Hotels in Pune & Lonavala",
  description:
    "The Tree Hotels & Resorts runs three properties in Ravet, Hinjewadi Phase 3 and Lonavala. Learn how we host, and why guests book with us directly.",
  path: "/about",
  image: "/images/hinjewadi-phase-3/gallary-9.jpg",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About The Tree"
        title="Value. Stay. Experience."
        italic="Stay."
        intro="Three hand-run properties across Ravet, Hinjewadi Phase 3 and Lonavala — hosted by the people who own them."
        image={{ src: "/images/hinjewadi-phase-3/gallary-9.jpg", alt: "Reception at Hotel The Tree Hinjewadi with the tree emblem" }}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
      />

      {/* Story: a long-form column against an offset photograph */}
      <section aria-labelledby="story-title" className="bg-paper pt-24 pb-28 lg:pt-36 lg:pb-40">
        <div className="container-site grid gap-16 lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="eyebrow text-brass-text">Our approach</p>
            </Reveal>
            <MaskLines
              id="story-title"
              className="display mt-6 text-[2.8rem] text-ink sm:text-6xl lg:text-[4.4rem]"
              lines={[
                "A small group",
                <span key="line-1">
                  of stays, run <em>up close.</em>
                </span>,
              ]}
            />
            <Reveal delay={0.1} className="mt-12 max-w-xl space-y-6 text-[1.05rem] leading-[1.9] text-ink/85">
              <p>
                The Tree Hotels &amp; Resorts brings together two city hotels in west Pune and a private-villa resort near
                Lonavala. Each is owner-run, which means decisions are made close to the guest — whether that is an early
                check-in, a room preference or a celebration at the villa.
              </p>
              <p>
                We keep booking simple. There is no platform in between: you call or WhatsApp the property, speak to the
                team, and pay no booking commission.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 lg:pt-32">
            <ImageReveal className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem]">
              <Image
                src="/images/lonavala/gallery-11.jpg"
                alt="Villa living room at The Tree Resort Lonavala"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </ImageReveal>
            <p className="caption mt-4 text-ink-muted">
              <span className="text-brass-text">Fig. 01</span>&nbsp;&nbsp;A villa living room, Lonavala
            </p>
          </div>
        </div>
      </section>

      <WhyChoose />

      {/* The three addresses as a typographic list */}
      <section aria-labelledby="our-props-title" className="bg-paper py-24 lg:py-36">
        <div className="container-site">
          <Reveal>
            <p id="our-props-title" className="eyebrow text-brass-text">
              Where you&apos;ll find us
            </p>
          </Reveal>
          <ul className="mt-10 border-t border-ink/15">
            {properties.map((p, i) => (
              <li key={p.slug} className="border-b border-ink/15">
                <Link href={propertyHref(p)} className="group grid gap-2 py-8 sm:grid-cols-[4rem_1fr_auto] sm:items-baseline sm:gap-6">
                  <span className="caption text-brass-text">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-4xl leading-none text-ink transition-colors duration-500 group-hover:text-wine sm:text-6xl">
                    {p.name}
                  </span>
                  <span className="eyebrow text-[0.92rem] text-ink-muted">{p.cityLabel}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Reveal className="mt-12">
            <Link href="/contact" className="link-line text-[0.92rem] font-semibold text-ink">
              Contact us
            </Link>
          </Reveal>
        </div>
      </section>

      <Testimonials />
    </>
  );
}
