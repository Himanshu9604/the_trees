import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/ui";

/** The existing brand mark (tree) with a clean typeset wordmark. */
export function Logo({ tone = "dark", compact = false }: { tone?: "light" | "dark"; compact?: boolean }) {
  return (
    <Link
      href="/"
      className="group flex items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4"
      aria-label="The Tree Hotels & Resorts, home"
    >
      <span className={cn("relative block shrink-0 overflow-hidden transition-all duration-300", compact ? "h-[30px] w-[36px]" : "h-[36px] w-[42px]")}>
        <Image src="/images/brand/logo.png" alt="" width={347} height={446} className="absolute top-0 left-0 h-auto w-full" priority />
      </span>
      <span className="flex flex-col leading-none">
        <span className={cn("text-[1.15rem] font-bold tracking-[-0.01em]", tone === "light" ? "text-white" : "text-navy")}>The Tree</span>
        <span className={cn("mt-1 text-[0.68rem] font-medium tracking-[0.12em] uppercase", tone === "light" ? "text-white/75" : "text-slate")}>
          Hotels &amp; Resorts
        </span>
      </span>
    </Link>
  );
}
