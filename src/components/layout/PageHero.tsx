import Image from "next/image";
import type { ReactNode } from "react";
import type { Crumb } from "@/lib/seo";
import { ImageReveal, Reveal } from "@/components/ui/Reveal";
import { Breadcrumbs } from "./Breadcrumbs";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  /** Optional words inside the title to highlight with the brand gradient. */
  italic?: string;
  intro?: string;
  image: { src: string; alt: string };
  crumbs: Crumb[];
  children?: ReactNode;
}

function renderTitle(title: string, highlight?: string): ReactNode {
  if (!highlight || !title.includes(highlight)) return title;
  const [before, after] = title.split(highlight);
  return (
    <>
      {before}
      <span className="text-gradient">{highlight}</span>
      {after}
    </>
  );
}

/** Inner-page opening: soft gradient surface, text left, rounded photograph right. */
export function PageHero({ eyebrow, title, italic, intro, image, crumbs, children }: PageHeroProps) {
  return (
    <section className="bg-aurora relative overflow-hidden">
      <div className="container-site grid items-center gap-10 py-12 lg:grid-cols-[1fr_1.1fr] lg:gap-14 lg:py-16">
        <div>
          <Breadcrumbs items={crumbs} />
          <Reveal className="mt-8">
            <p className="eyebrow text-violet-text">{eyebrow}</p>
            <h1 className="mt-4 text-[2.3rem] leading-[1.1] font-bold tracking-[-0.03em] text-navy sm:text-5xl lg:text-[3.4rem]">
              {renderTitle(title, italic)}
            </h1>
            {intro && <p className="mt-5 max-w-xl text-[1.05rem] leading-[1.75] text-slate">{intro}</p>}
            {children}
          </Reveal>
        </div>
        <ImageReveal className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] shadow-[var(--shadow-float)] lg:aspect-[5/4]">
          <Image src={image.src} alt={image.alt} fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        </ImageReveal>
      </div>
    </section>
  );
}
