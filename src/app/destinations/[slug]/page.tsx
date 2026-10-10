import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { destinations, getDestination } from "@/data/content";
import { getPropertiesByDestination, propertyHref } from "@/data/properties";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { PropertyCard } from "@/components/property/PropertyCard";
import { EnquirySection } from "@/components/home/EnquirySection";
import { FaqSection } from "@/components/home/FaqSection";
import { MaskLines, Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/ui";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const d = getDestination(slug);
  if (!d) return {};
  return pageMetadata({
    title: d.seo.title,
    description: d.seo.description,
    path: `/destinations/${d.slug}`,
    image: d.image.src,
    imageAlt: d.image.alt,
  });
}

export default async function DestinationPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const d = getDestination(slug);
  if (!d) notFound();

  const stays = getPropertiesByDestination(d.slug);
  const other = destinations.find((o) => o.slug !== d.slug)!;
  const faqs = stays.flatMap((p) => p.faqs);
  const pune = d.slug === "pune";

  return (
    <>
      <PageHero
        eyebrow={`${d.eyebrow} — ${d.region}`}
        title={d.headline}
        italic={pune ? "Pune" : "Lonavala"}
        intro={d.intro}
        image={d.image}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Destinations", path: "/destinations" },
          { name: d.name, path: `/destinations/${d.slug}` },
        ]}
      />

      {/* Long-form introduction set beside an oversized line */}
      <section aria-labelledby="dest-intro-title" className="bg-paper py-24 lg:py-40">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow text-brass-text">Why {d.name}</p>
            </Reveal>
            <MaskLines
              id="dest-intro-title"
              className="display mt-6 text-[2.6rem] text-ink sm:text-6xl"
              lines={
                pune
                  ? ["Two city bases", <span key="l2">in <em>west</em> Pune.</span>]
                  : ["Space to breathe,", <span key="l2">in the <em>hills.</em></span>]
              }
            />
          </div>
          <Reveal delay={0.1} className="space-y-6 text-[1.05rem] leading-[1.9] text-ink/85 lg:col-span-6 lg:col-start-7 lg:pt-16">
            {d.paragraphs.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="dest-stays-title" className="bg-stone-soft py-24 lg:py-36">
        <div className="container-site">
          <Reveal>
            <p id="dest-stays-title" className="eyebrow text-brass-text">
              Where to stay in {d.name}
            </p>
          </Reveal>
          <div className="mt-12 grid gap-16 md:grid-cols-12 md:gap-x-8">
            {stays.map((p, i) => (
              <Reveal
                key={p.slug}
                delay={i * 0.1}
                className={cn(
                  stays.length === 1 ? "md:col-span-8" : i === 0 ? "md:col-span-7" : "md:col-span-4 md:col-start-9 md:mt-40",
                )}
              >
                <PropertyCard
                  property={p}
                  headingLevel="h2"
                  ratio={stays.length === 1 ? "aspect-[16/10]" : i === 0 ? "aspect-[4/3]" : "aspect-[3/4]"}
                  sizes="(min-width: 768px) 55vw, 100vw"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FaqSection faqs={faqs} title={`Staying in ${d.name}`} eyebrow="Good to know" />

      <section aria-label="Other destination" className="border-t border-ink/10 bg-paper py-16">
        <div className="container-site flex flex-col items-start justify-between gap-6 md:flex-row md:items-baseline">
          <p className="text-3xl text-ink sm:text-4xl">
            Also: <em>{other.name}</em> — {other.region}
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-[0.92rem] font-semibold">
            <Link href={`/destinations/${other.slug}`} className="link-line text-ink">
              {other.name} stays
            </Link>
            {getPropertiesByDestination(other.slug).map((p) => (
              <Link key={p.slug} href={propertyHref(p)} className="link-draw text-ink-muted hover:text-ink">
                {p.shortName}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <EnquirySection defaultProperty={stays.length === 1 ? stays[0].slug : undefined} />
    </>
  );
}
