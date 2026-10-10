"use client";

import { useId, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/ui";

export function Accordion({ items }: { items: readonly { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const uid = useId();

  return (
    <div className="border-t border-ink/15">
      {items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${uid}-q-${i}`;
        const panelId = `${uid}-a-${i}`;
        return (
          <div key={item.q} className="border-b border-ink/15">
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span
                  className={cn(
                    "text-[1.45rem] leading-snug transition-colors sm:text-[1.75rem]",
                    isOpen ? "text-wine" : "text-ink group-hover:text-wine",
                  )}
                >
                  {item.q}
                </span>
                <span
                  className={cn(
                    "relative flex size-10 shrink-0 items-center justify-center transition-colors duration-300",
                    isOpen ? "text-wine" : "text-ink",
                  )}
                  aria-hidden="true"
                >
                  <span className="absolute h-px w-3.5 bg-current" />
                  <span className={cn("absolute h-3.5 w-px bg-current transition-transform duration-300", isOpen && "scale-y-0")} />
                </span>
              </button>
            </h3>
            {/* Answers stay in the DOM (collapsed) so they remain crawlable. */}
            <motion.div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              aria-hidden={!isOpen}
              inert={!isOpen}
              initial={false}
              animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <p className="max-w-2xl pb-8 text-[0.98rem] leading-[1.85] text-ink-muted">{item.a}</p>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
