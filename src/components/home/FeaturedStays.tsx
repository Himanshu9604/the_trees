import Image from "next/image";
import Link from "next/link";
import { amenityLabels, getProperty, propertyHref, type Property } from "@/data/properties";
import { ImageReveal, MaskLines, Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";

function DetailLink({ p, label = "View property" }: { p: Property; label?: string }) {
  return (
    <Link
      href={propertyHref(p)}
      className="group inline-flex items-center gap-2.5 text-[0.92rem] font-semibold text-navy"
      aria-label={`${label}: ${p.name}`}
    >
      <span className="link-line">{label}</span>
      <Icon name="arrow-right" size={15} className="transition-transform duration-500 group-hover:translate-x-1" />
    </Link>
  );
}

/** B. Featured properties — one dominant feature, then a contrasting pair of smaller city stays. */
export function FeaturedStays() {
  const lonavala = getProperty("resort-lonavala")!;
  const pune = [getProperty("hotel-ravet-pune")!, getProperty("hotel-hinjewadi-phase-3-pune")!];

  return (
    <section id="stays" aria-labelledby="featured-title" className="bg-white py-24 lg:py-36">
      <div className="container-site">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <p className="eyebrow text-champagne-text">Featured properties</p>
            </Reveal>
            <MaskLines
              id="featured-title"
              className="display mt-5 text-[2.3rem] text-navy sm:text-5xl lg:text-[3.4rem]"
              lines={[<span key="line-1">Our signature <em>stays</em></span>]}
            />
          </div>
          <Reveal delay={0.1}>
            <Link href="/properties" className="link-line text-[0.92rem] font-semibold text-navy">
              All properties
            </Link>
          </Reveal>
        </div>

        {/* Dominant feature: wide photograph with an overlapping information panel */}
        <article className="relative mt-14 lg:mt-20">
          <ImageReveal className="relative aspect-[4/5] overflow-hidden sm:aspect-[16/10] lg:w-[78%] lg:aspect-[16/10] rounded-[1.25rem]">
            <Link href={propertyHref(lonavala)} tabIndex={-1} aria-hidden="true" className="group relative block h-full">
              <Image
                src="/images/lonavala/gallery-5.jpg"
                alt="Poolside pavilion at The Tree Resort Lonavala in the evening"
                fill
                sizes="(min-width: 1024px) 70vw, 100vw"
                className="object-cover transition-transform duration-[1.8s] ease-out group-hover:scale-[1.04]"
              />
            </Link>
          </ImageReveal>

          <Reveal
            delay={0.15}
            className="relative mx-4 -mt-20 bg-ivory p-7 sm:mx-10 sm:p-10 lg:absolute lg:top-1/2 lg:right-0 lg:mx-0 lg:mt-0 lg:w-[40%] lg:-translate-y-1/2"
          >
            <p className="flex items-center gap-2 text-[0.85rem] text-champagne-text">
              <Icon name="pin" size={14} /> {lonavala.cityLabel}
            </p>
            <h3 className="mt-4 text-[2rem] leading-[1.15] text-navy sm:text-[2.5rem]">{lonavala.name}</h3>
            <p className="mt-4 text-[1rem] leading-[1.8] text-body">{lonavala.summary}</p>
            <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-stone pt-6 text-[0.92rem] text-navy">
              {lonavala.amenities.slice(0, 6).map((a) => (
                <li key={a} className="flex items-center gap-2.5">
                  <Icon name={a} size={17} strokeWidth={1.3} className="shrink-0 text-champagne" />
                  {amenityLabels[a]}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <DetailLink p={lonavala} label="Discover the resort" />
            </div>
          </Reveal>
        </article>

        {/* Contrasting composition: two smaller city stays, image beside text */}
        <div className="mt-24 grid gap-14 lg:mt-32 lg:grid-cols-2 lg:gap-12">
          {pune.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.12} className={i === 1 ? "lg:mt-16" : ""}>
              <article className="grid gap-6 sm:grid-cols-[minmax(0,0.9fr)_1fr] sm:items-center sm:gap-8">
                <Link href={propertyHref(p)} tabIndex={-1} aria-hidden="true" className="group relative block aspect-[4/5] overflow-hidden rounded-[1.25rem]">
                  <Image
                    src={p.heroImage.src}
                    alt={p.heroImage.alt}
                    fill
                    sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw"
                    className="object-cover transition-transform duration-[1.8s] ease-out group-hover:scale-[1.05]"
                  />
                </Link>
                <div>
                  <p className="flex items-center gap-2 text-[0.85rem] text-champagne-text">
                    <Icon name="pin" size={14} /> {p.cityLabel}
                  </p>
                  <h3 className="mt-3 text-[1.75rem] leading-[1.2] text-navy">{p.name}</h3>
                  <p className="mt-3 text-[0.98rem] leading-[1.75] text-body">{p.summary}</p>
                  <p className="mt-4 text-[0.88rem] text-body/85">
                    {p.amenities
                      .slice(0, 4)
                      .map((a) => amenityLabels[a])
                      .join(" · ")}
                  </p>
                  <div className="mt-6">
                    <DetailLink p={p} />
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
