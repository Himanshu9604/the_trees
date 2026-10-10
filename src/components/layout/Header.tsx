"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { navLinks, secondaryLinks, siteConfig, whatsappLink } from "@/lib/site";
import { properties } from "@/data/properties";
import { buttonClasses, cn } from "@/lib/ui";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "./Logo";

const ease = [0.22, 1, 0.36, 1] as const;

/** Clean white sticky navigation with a fine bottom border and an animated mobile menu. */
export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);

  // Close the menu whenever the route changes.
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : href.startsWith("/#") ? false : pathname.startsWith(href);
  const menuLinks = [secondaryLinks[0], ...navLinks, secondaryLinks[1]];

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur-md transition-shadow duration-300",
        scrolled && "shadow-[0_10px_30px_-20px_rgba(23,33,61,0.25)]",
      )}
    >
      <div className={cn("container-site flex items-center justify-between gap-6 transition-[height] duration-300", scrolled ? "h-16" : "h-20")}>
        <Logo tone="dark" compact={scrolled} />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1 rounded-full border border-line bg-mist/80 p-1.5">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative block rounded-full px-4 py-2 text-[0.93rem] font-medium transition-all duration-300",
                      active
                        ? "bg-white text-violet shadow-[0_6px_16px_-10px_rgba(53,36,244,0.55)]"
                        : "text-navy hover:bg-white hover:text-violet",
                    )}
                  >
                    {link.label}
                    {active && <span className="absolute inset-x-4 -bottom-px h-[2px] rounded-full bg-gradient-to-r from-violet to-royal" aria-hidden="true" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${siteConfig.primaryPhone.tel}`}
            className="hidden items-center gap-2.5 rounded-full py-1 pr-2 text-navy transition-colors hover:text-violet xl:flex"
            aria-label={`Call ${siteConfig.primaryPhone.display}`}
          >
            <span className="flex size-10 items-center justify-center rounded-full bg-lavender text-violet">
              <Icon name="phone" size={16} />
            </span>
            <span className="leading-tight">
              <span className="block text-[0.72rem] text-slate">Call us</span>
              <span className="block text-[0.9rem] font-semibold">{siteConfig.primaryPhone.display}</span>
            </span>
          </a>
          <Link href="/properties" className={buttonClasses("gold", "min-h-11 px-6 max-sm:hidden")}>
            Explore Stays
            <Icon name="arrow-up-right" size={15} className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative z-[60] flex size-11 items-center justify-center rounded-full border border-line bg-white text-navy transition-colors hover:border-violet hover:text-violet lg:hidden"
          >
            <span className="relative block h-3 w-5" aria-hidden="true">
              <span className={cn("absolute left-0 h-[1.5px] w-5 rounded bg-current transition-all duration-300", open ? "top-1.5 rotate-45" : "top-0")} />
              <span className={cn("absolute top-1.5 left-0 h-[1.5px] rounded bg-current transition-all duration-300", open ? "w-0 opacity-0" : "w-3.5")} />
              <span className={cn("absolute left-0 h-[1.5px] w-5 rounded bg-current transition-all duration-300", open ? "top-1.5 -rotate-45" : "top-3")} />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 top-0 z-40 bg-navy/20 backdrop-blur-[2px] lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              id="site-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              className="fixed inset-x-3 top-3 z-50 max-h-[calc(100svh-1.5rem)] overflow-y-auto rounded-[1.5rem] border border-line bg-white p-5 pt-20 shadow-[var(--shadow-float)] lg:hidden"
              initial={{ opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.35, ease }}
            >
              <nav aria-label="Mobile">
                <ul className="space-y-1">
                  {menuLinks.map((link, i) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.04, duration: 0.3 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        aria-current={isActive(link.href) ? "page" : undefined}
                        className={cn(
                          "flex items-center justify-between rounded-xl px-4 py-3.5 text-lg font-medium transition-colors",
                          isActive(link.href) ? "bg-lavender text-violet" : "text-navy hover:bg-mist",
                        )}
                      >
                        {link.label}
                        <Icon name="arrow-right" size={16} className="text-violet/70" />
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <div className="mt-5 rounded-2xl bg-aurora p-4">
                <p className="eyebrow text-violet-text">Call or WhatsApp directly</p>
                <ul className="mt-3 space-y-2">
                  {properties.map((p) => (
                    <li key={p.slug} className="flex items-center justify-between gap-3 rounded-xl bg-white/80 px-3 py-2.5">
                      <span className="text-sm font-medium text-navy">{p.shortName}</span>
                      <span className="flex gap-2">
                        <a
                          href={`tel:${p.phone.tel}`}
                          className="flex size-10 items-center justify-center rounded-full border border-line text-navy"
                          aria-label={`Call ${p.name}`}
                        >
                          <Icon name="phone" size={16} />
                        </a>
                        <a
                          href={whatsappLink(p.whatsapp)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex size-10 items-center justify-center rounded-full bg-violet text-white"
                          aria-label={`WhatsApp ${p.name}`}
                        >
                          <Icon name="whatsapp" size={16} />
                        </a>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link href="/properties" onClick={() => setOpen(false)} className={buttonClasses("gold", "mt-5 w-full")}>
                Explore Stays
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
