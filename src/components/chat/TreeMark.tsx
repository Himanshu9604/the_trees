import Image from "next/image";
import { cn } from "@/lib/ui";

/** The Tree brand mark in a soft circle — used for the header and bot avatar. */
export function TreeMark({ size = 36, className }: { size?: number; className?: string }) {
  return (
    <span
      className={cn("relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-line", className)}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <span className="relative block overflow-hidden" style={{ width: size * 0.62, height: size * 0.5 }}>
        <Image src="/images/brand/logo.png" alt="" width={347} height={446} className="absolute top-0 left-0 h-auto w-full" />
      </span>
    </span>
  );
}
