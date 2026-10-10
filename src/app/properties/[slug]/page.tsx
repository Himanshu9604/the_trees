import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProperty, properties, propertyHref } from "@/data/properties";
import { getDestination } from "@/data/content";
import { faqSchema, pageMetadata, propertySchema } from "@/lib/seo";
import { whatsappLink } from "@/lib/site";
import { buttonClasses } from "@/lib/ui";
import { PageHero } from "@/components/layout/PageHero";
import { AmenityGrid, ContactPanel, MealPlanCard, RoomList } from "@/components/property/PropertyDetails";
import { PropertyCard } from "@/components/property/PropertyCard";
import { FaqSection } from "@/components/home/FaqSection";
import { EnquirySection } from "@/components/home/EnquirySection";
import { Gallery } from "@/components/ui/Gallery";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ImageReveal, Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { JsonLd } from "@/components/ui/JsonLd";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return properties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProperty(slug);
  if (!p) return {};
  return pageMetadata({
    title: p.seo.title,
    description: p.seo.description,
    path: propertyHref(p),
    image: p.heroImage.src,
    imageAlt: p.heroImage.alt,
  });
}

export default async function PropertyPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const p = getProperty(slug);
  if (!p) notFound();

  const destination = getDestination(p.destination)!;
  const others = properties.filter((o) => o.slug !== p.slug);
  const [feature1, feature2] = p.gallery;

  return (
    <>
      <JsonLd data={[propertySchema(p), faqSchema(p.faqs)]} />
      <PageHero
        eyebrow={`${p.type} — ${p.cityLabel}`}
        title={p.name}
        intro={p.tagline}
        image={p.heroImage}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Properties", path: "/properties" },
          { name: p.shortName, path: propertyHref(p) },
        ]}
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={whatsappLink(p.whatsapp, `Hello, I would like to enquire about a stay at ${p.name}.`)}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClasses("gold", "min-h-13 px-7")}
          >
            <Icon name="whatsapp" size={18} /> Enquire on WhatsApp
          </a>
          <a href={`tel:${p.phone.tel}`} className={buttonClasses("outline-dark", "min-h-13 px-7")}>
            <Icon name="phone" size={17} /> {p.phone.display}
          </a>
        </div>
      </PageHero>

      {/* Overview: text column, staggered pair of photographs, sticky contact panel */}
      <section aria-labelledby="overview-title" className="bg-paper pt-24 pb-28 lg:pt-36 lg:pb-40">
        <div className="container-site grid gap-16 lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-7">
            <SectionHeading id="overview-title" eyebrow="The stay" title={`About ${p.shortName}`} italic="About" size="lg" />
            <Reveal delay={0.1} className="mt-10 max-w-2xl space-y-6 text-[1.05rem] leading-[1.9] text-ink/85">
              {p.description.map((para, i) => (
                <p key={para} className={i === 0 ? "" : ""}>
                  {para}
                </p>
              ))}
            </Reveal>
            <Reveal delay={0.15} className="mt-10 border-t border-ink/15 pt-5">
              <p className="caption text-ink-muted">
                <span className="eyebrow mr-4 text-[0.92rem] text-brass-text">Best for</span>
                {p.bestFor.join(" · ")}
              </p>
            </Reveal>

            {feature1 && feature2 && (
              <div className="mt-16 grid grid-cols-12 gap-4 sm:gap-6">
                <figure className="col-span-7">
                  <ImageReveal className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem]">
                    <Image src={feature1.src} alt={feature1.alt} fill sizes="(min-width: 1024px) 32vw, 58vw" className="object-cover" />
                  </ImageReveal>
                  <figcaption className="caption mt-3 text-ink-muted">{feature1.alt}</figcaption>
                </figure>
                <figure className="col-span-5 mt-24 sm:mt-40">
                  <ImageReveal delay={0.15} className="relative aspect-[3/4] overflow-hidden rounded-[1.25rem]">
                    <Image src={feature2.src} alt={feature2.alt} fill sizes="(min-width: 1024px) 22vw, 40vw" className="object-cover" />
                  </ImageReveal>
                </figure>
              </div>
            )}
          </div>

          <aside aria-label={`Contact ${p.name}`} className="lg:sticky lg:top-28 lg:col-span-4 lg:col-start-9 lg:self-start">
            <Reveal delay={0.1}>
              <ContactPanel property={p} />
            </Reveal>
          </aside>
        </div>
      </section>

      {/* Rooms */}
      <section aria-labelledby="rooms-title" className="bg-stone-soft py-24 lg:py-36">
        <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-4">
            <SectionHeading
              id="rooms-title"
              eyebrow={p.type === "Villa" ? "Villas & cottages" : "Room types"}
              title={p.type === "Villa" ? "Choose your villa" : "Choose your room"}
              italic="your"
              intro="Rates depend on dates and occupancy — message the property for current availability."
            />
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <RoomList property={p} />
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section aria-labelledby="amenities-title" className="bg-paper py-24 lg:py-32">
        <div className="container-site">
          <SectionHeading id="amenities-title" eyebrow="Amenities" title="Everything in its place" italic="in its place" />
          <div className="mt-12">
            <AmenityGrid property={p} />
          </div>
        </div>
      </section>

      {p.mealPlan && (
        <section id="meal-plan" aria-label="Villa meal plan" className="bg-paper pb-24 lg:pb-32">
          <div className="container-site">
            <MealPlanCard plan={p.mealPlan} />
          </div>
        </section>
      )}

      {/* Location: typography-led, address set large */}
      <section aria-labelledby="location-title" className="border-t border-ink/10 bg-paper py-24 lg:py-36">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-5">
            <SectionHeading id="location-title" eyebrow="Location" title={`Staying in ${p.locality}`} italic={p.locality} />
            <Reveal delay={0.1} className="mt-8 max-w-md space-y-4 text-[0.98rem] leading-[1.85] text-ink-muted">
              {p.locationNotes.map((n) => (
                <p key={n}>{n}</p>
              ))}
            </Reveal>
          </div>
          <Reveal delay={0.15} className="lg:col-span-6 lg:col-start-7 lg:pt-16">
            <p className="text-[1.5rem] leading-[1.35] font-semibold text-navy sm:text-[1.9rem]">{p.address.full}</p>
            <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4 text-[0.92rem] font-semibold">
              <a href={p.mapUrl} target="_blank" rel="noopener noreferrer" className="link-line text-ink">
                Open in Google Maps
              </a>
              <Link href={`/destinations/${destination.slug}`} className="link-line text-ink">
                More about {destination.name}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Gallery */}
      <section aria-labelledby="property-gallery-title" className="bg-stone-soft py-24 lg:py-36">
        <div className="container-site">
          <SectionHeading id="property-gallery-title" eyebrow="Visual journal" title={`Inside ${p.shortName}`} italic="Inside" />
          <Reveal className="mt-14">
            <Gallery images={p.gallery.map((g) => ({ ...g, caption: p.shortName }))} layout="collage" />
          </Reveal>
        </div>
      </section>

      <FaqSection faqs={p.faqs} title={`${p.shortName}, answered`} />

      {/* Other properties — two entries in deliberately different proportions */}
      <section aria-labelledby="others-title" className="border-t border-ink/10 bg-paper py-24 lg:py-36">
        <div className="container-site">
          <SectionHeading id="others-title" eyebrow="Also from The Tree" title="Continue the journey" italic="journey" />
          <div className="mt-14 grid gap-16 md:grid-cols-12 md:gap-x-8">
            {others.map((o, i) => (
              <Reveal key={o.slug} delay={i * 0.1} className={i === 0 ? "md:col-span-6" : "md:col-span-5 md:col-start-8 md:mt-32"}>
                <PropertyCard property={o} ratio={i === 0 ? "aspect-[4/3]" : "aspect-[4/5]"} sizes="(min-width: 768px) 45vw, 100vw" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <EnquirySection defaultProperty={p.slug} />
    </>
  );
}
