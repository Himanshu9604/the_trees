import type { ReactNode } from "react";
import { cn } from "@/lib/ui";
import { MaskLines, Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  /** A word within the title to set in light italic. */
  italic?: string;
  intro?: string;
  tone?: "dark" | "light";
  size?: "lg" | "md";
  as?: "h1" | "h2";
  id?: string;
  className?: string;
  /** Kept for compatibility; headings are always left-aligned in this identity. */
  align?: "left" | "center";
}

function withItalic(title: string, italic?: string): ReactNode {
  if (!italic || !title.includes(italic)) return title;
  const [before, after] = title.split(italic);
  return (
    <>
      {before}
      <em>{italic}</em>
      {after}
    </>
  );
}

/** Left-aligned editorial heading: micro-label, serif title with an optional italic word, short intro. */
export function SectionHeading({
  eyebrow,
  title,
  italic,
  intro,
  tone = "dark",
  size = "md",
  as = "h2",
  id,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", className)}>
      <Reveal>
        <p className={cn("eyebrow", tone === "light" ? "text-brass-soft" : "text-brass-text")}>{eyebrow}</p>
      </Reveal>
      <MaskLines
        as={as}
        id={id}
        className={cn(
          "display mt-6 text-balance",
          size === "lg" ? "text-[2.4rem] sm:text-5xl lg:text-[3.6rem]" : "text-[2rem] sm:text-[2.6rem] lg:text-[3rem]",
          tone === "light" ? "text-paper" : "text-ink",
        )}
        lines={[<span key="title">{withItalic(title, italic)}</span>]}
      />
      {intro && (
        <Reveal delay={0.15}>
          <p className={cn("mt-6 max-w-xl text-[0.98rem] leading-[1.85]", tone === "light" ? "text-paper/75" : "text-ink-muted")}>
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}
