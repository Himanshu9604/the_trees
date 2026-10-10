import Image from "next/image";
import { whyChoose } from "@/data/content";
import { ImageReveal, MaskLines, Reveal } from "@/components/ui/Reveal";

/** Why The Tree — a typographic index beside a single tall photograph. */
export function WhyChoose() {
  return (
    <section aria-labelledby="why-title" className="bg-stone-soft py-24 lg:py-36">
      <div className="container-site grid gap-16 lg:grid-cols-12 lg:gap-x-8">
        <div className="lg:col-span-4">
          <Reveal>
            <p className="eyebrow text-brass-text">Why The Tree</p>
          </Reveal>
          <MaskLines
            id="why-title"
            className="display mt-6 text-[2.6rem] text-ink sm:text-6xl"
            lines={[
              "Hospitality,",
              <span key="line-1">
                <em>directly.</em>
              </span>,
            ]}
          />
          <ImageReveal className="relative mt-12 hidden aspect-[3/4] overflow-hidden lg:block rounded-[1.25rem]">
            <Image
              src="/images/lonavala/gallery-10.jpg"
              alt="Bedroom with four-poster bed and balcony doors at The Tree Resort Lonavala"
              fill
              sizes="30vw"
              className="object-cover"
            />
          </ImageReveal>
        </div>

        <ol className="border-t border-ink/15 lg:col-span-7 lg:col-start-6">
          {whyChoose.map((w, i) => (
            <li key={w.title} className="border-b border-ink/15">
              <Reveal delay={i * 0.04} className="grid gap-3 py-7 sm:grid-cols-[4rem_1fr_1.2fr] sm:items-baseline sm:gap-6">
                <span className="caption text-brass-text">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-[1.75rem] leading-tight text-ink">{w.title}</h3>
                <p className="text-[0.95rem] leading-[1.8] text-ink-muted">{w.copy}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
