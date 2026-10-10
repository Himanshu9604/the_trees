import Image from "next/image";
import Link from "next/link";
import { ImageReveal, MaskLines, Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";

/** A. Welcome — asymmetric two-column: editorial type beside a property photograph. */
export function BrandStatement() {
  return (
    <section id="welcome" aria-labelledby="welcome-title" className="bg-ivory py-24 lg:py-36">
      <div className="container-site grid items-center gap-14 lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow text-champagne-text">Welcome to The Tree</p>
          </Reveal>
          <MaskLines
            id="welcome-title"
            className="display mt-6 text-[2.4rem] text-navy sm:text-5xl lg:text-[3.6rem]"
            lines={[
              "Calm, considered",
              <span key="line-1">
                stays in Pune <em>&amp;</em>
              </span>,
              "Lonavala.",
            ]}
          />
          <Reveal delay={0.15}>
            <p className="mt-8 max-w-md text-[1.05rem] leading-[1.8] text-body">
              Two city hotels in Ravet and Hinjewadi Phase 3, and a private-villa resort in the Lonavala hills. Each one is
              run by its owners, so every stay is booked and looked after directly.
            </p>
            <Link
              href="/about"
              className="group mt-8 inline-flex items-center gap-2.5 text-[0.92rem] font-semibold text-navy"
            >
              <span className="link-line">Our story</span>
              <Icon name="arrow-right" size={15} className="transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        {/* A large frame with a smaller detail overlapping its lower edge. */}
        <div className="relative lg:col-span-6 lg:col-start-7">
          <ImageReveal className="relative aspect-[4/5] overflow-hidden sm:aspect-[5/4] lg:aspect-[4/5] rounded-[1.25rem]">
            <Image
              src="/images/lonavala/gallery-11.jpg"
              alt="Villa living room at The Tree Resort Lonavala with carved wooden sofas and warm light"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </ImageReveal>
          <Reveal delay={0.25} className="absolute -bottom-10 -left-4 hidden w-[42%] border-[6px] border-ivory sm:block lg:-left-16">
            <div className="relative aspect-square">
              <Image
                src="/images/ravet/gallary-13.jpg"
                alt="Bright double room with plants at The Tree Hotel Ravet"
                fill
                sizes="20vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <p className="caption mt-4 text-right text-body/80">A villa living room, The Tree Resort Lonavala</p>
        </div>
      </div>
    </section>
  );
}
