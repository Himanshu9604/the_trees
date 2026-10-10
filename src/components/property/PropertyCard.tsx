import Image from "next/image";
import Link from "next/link";
import { propertyHref, type Property } from "@/data/properties";
import { whatsappLink } from "@/lib/site";
import { cn } from "@/lib/ui";
import { Icon } from "@/components/ui/Icon";

interface PropertyCardProps {
  property: Property;
  headingLevel?: "h2" | "h3";
  className?: string;
  sizes?: string;
  /** Image proportion — vary it between neighbours to avoid a uniform grid. */
  ratio?: string;
}

/** Editorial entry: photograph, caption line, serif name, short summary, two quiet actions. No box. */
export function PropertyCard({
  property: p,
  headingLevel: H = "h3",
  className,
  sizes = "(min-width: 1024px) 40vw, 100vw",
  ratio = "aspect-[4/3]",
}: PropertyCardProps) {
  return (
    <article className={cn("group", className)}>
      <Link href={propertyHref(p)} className={cn("relative block overflow-hidden bg-stone", ratio)} tabIndex={-1} aria-hidden="true">
        <Image
          src={p.heroImage.src}
          alt={p.heroImage.alt}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-[2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
        />
      </Link>
      <div className="mt-6 flex items-baseline justify-between gap-4 border-b border-stone pb-3">
        <p className="eyebrow text-[0.92rem] text-brass-text">{p.cityLabel}</p>
        <p className="caption text-ink-muted">{p.type}</p>
      </div>
      <H className="mt-5 text-[2rem] leading-[1.05] text-ink sm:text-[2.4rem]">
        <Link href={propertyHref(p)} className="link-draw">
          {p.name}
        </Link>
      </H>
      <p className="mt-4 max-w-md text-[0.95rem] leading-[1.85] text-ink-muted">{p.summary}</p>
      <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3 text-[0.92rem] font-semibold">
        <Link href={propertyHref(p)} className="group/l inline-flex items-center gap-2 text-ink">
          <span className="link-line">View the property</span>
          <Icon name="arrow-right" size={14} className="transition-transform duration-500 group-hover/l:translate-x-1" />
        </Link>
        <a
          href={whatsappLink(p.whatsapp, `Hello, I would like to enquire about a stay at ${p.name}.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="link-draw text-wine"
          aria-label={`Enquire about ${p.name} on WhatsApp`}
        >
          WhatsApp
        </a>
      </div>
    </article>
  );
}
