import Link from "next/link";
import { properties, propertyHref } from "@/data/properties";
import { destinations } from "@/data/content";
import { navLinks, secondaryLinks, siteConfig, whatsappLink } from "@/lib/site";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "./Logo";

/** I. Footer — pale lavender, clear navigation, real contact details. */
export function Footer() {
  return (
    <footer className="border-t border-line bg-lavender/60">
      <div className="container-site py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-5 max-w-sm text-[0.95rem] leading-[1.75] text-slate">
              Owner-run hotels in Ravet and Hinjewadi Phase 3, Pune, and a private-villa resort near Lonavala. Book directly —
              zero commission.
            </p>
            <a
              href={siteConfig.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-navy transition-colors hover:border-violet hover:text-violet"
            >
              <Icon name="instagram" size={16} /> {siteConfig.instagram.handle}
            </a>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 lg:col-span-3">
            <div>
              <p className="text-sm font-semibold text-navy">Explore</p>
              <ul className="mt-4 space-y-2.5 text-[0.95rem]">
                {[...secondaryLinks, ...navLinks].map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-slate transition-colors hover:text-violet">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-navy">Destinations</p>
              <ul className="mt-4 space-y-2.5 text-[0.95rem]">
                {destinations.map((d) => (
                  <li key={d.slug}>
                    <Link href={`/destinations/${d.slug}`} className="text-slate transition-colors hover:text-violet">
                      {d.name}
                    </Link>
                  </li>
                ))}
                {properties.map((p) => (
                  <li key={p.slug}>
                    <Link href={propertyHref(p)} className="text-slate transition-colors hover:text-violet">
                      {p.shortName}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <div className="lg:col-span-5">
            <p className="text-sm font-semibold text-navy">Contact the properties</p>
            <ul className="mt-4 grid gap-3">
              {properties.map((p) => (
                <li key={p.slug} className="rounded-2xl border border-line bg-white p-4">
                  <Link href={propertyHref(p)} className="font-semibold text-navy hover:text-violet">
                    {p.name}
                  </Link>
                  <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-slate">
                    <a href={`tel:${p.phone.tel}`} className="inline-flex items-center gap-1.5 hover:text-violet">
                      <Icon name="phone" size={14} /> {p.phone.display}
                    </a>
                    <a
                      href={whatsappLink(p.whatsapp)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-violet hover:text-royal"
                      aria-label={`WhatsApp ${p.name}`}
                    >
                      <Icon name="whatsapp" size={14} /> WhatsApp
                    </a>
                    <a href={`mailto:${p.email}`} className="inline-flex min-w-0 items-center gap-1.5 break-all hover:text-violet">
                      <Icon name="mail" size={14} className="shrink-0" /> {p.email}
                    </a>
                  </div>
                  <a href={p.mapUrl} target="_blank" rel="noopener noreferrer" className="mt-1.5 flex items-start gap-1.5 text-[0.82rem] text-slate/90 hover:text-violet">
                    <Icon name="pin" size={13} className="mt-0.5 shrink-0" /> {p.address.full}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-line pt-6 text-sm text-slate sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p className="inline-flex items-center gap-2 self-start rounded-full border border-line bg-white px-4 py-1.5 sm:self-auto">
            <span className="size-1.5 rounded-full bg-gradient-to-r from-violet to-royal" aria-hidden="true" />
            Designed &amp; developed by <span className="text-gradient font-semibold">Shyam</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
