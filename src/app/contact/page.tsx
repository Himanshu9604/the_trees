import Link from "next/link";
import { properties, propertyHref } from "@/data/properties";
import { pageMetadata } from "@/lib/seo";
import { siteConfig, whatsappLink } from "@/lib/site";
import { PageHero } from "@/components/layout/PageHero";
import { EnquirySection } from "@/components/home/EnquirySection";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = pageMetadata({
  title: "Contact & Enquiries — Call or WhatsApp Directly",
  description:
    "Phone, WhatsApp and email for The Tree Hotel Ravet, Hotel The Tree Hinjewadi Phase 3 and The Tree Resort Lonavala. Book directly with zero commission.",
  path: "/contact",
  image: "/images/lonavala/hero.jpg",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Speak to the property directly"
        italic="directly"
        intro="No call centres and no forms required — call or WhatsApp the property you'd like to stay at."
        image={{ src: "/images/lonavala/hero.jpg", alt: "The Tree Resort Lonavala at night" }}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
      />

      {/* A directory of direct lines — one fine-ruled row per property */}
      <section aria-label="Property contacts" className="bg-paper py-24 lg:py-36">
        <div className="container-site">
          <ol className="border-t border-ink/15">
            {properties.map((p, i) => (
              <li key={p.slug} className="border-b border-ink/15">
                <Reveal delay={i * 0.06} className="grid gap-8 py-12 lg:grid-cols-12 lg:gap-x-8 lg:py-16">
                  <div className="lg:col-span-5">
                    <p className="eyebrow text-brass-text">
                      {String(i + 1).padStart(2, "0")} &nbsp;·&nbsp; {p.cityLabel}
                    </p>
                    <h2 className="mt-4 text-[2.4rem] leading-[1] text-ink sm:text-5xl">
                      <Link href={propertyHref(p)} className="link-draw">
                        {p.name}
                      </Link>
                    </h2>
                  </div>
                  <dl className="grid gap-6 text-[0.95rem] sm:grid-cols-2 lg:col-span-5 lg:col-start-7">
                    <div>
                      <dt className="eyebrow text-[0.92rem] text-ink-muted">Phone &amp; WhatsApp</dt>
                      <dd className="mt-2">
                        <a href={`tel:${p.phone.tel}`} className="link-draw text-2xl text-ink">
                          {p.phone.display}
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt className="eyebrow text-[0.92rem] text-ink-muted">Email</dt>
                      <dd className="mt-2">
                        <a href={`mailto:${p.email}`} className="link-draw break-all text-ink">
                          {p.email}
                        </a>
                      </dd>
                    </div>
                    <div className="sm:col-span-2">
                      <dt className="eyebrow text-[0.92rem] text-ink-muted">Address</dt>
                      <dd className="mt-2 leading-relaxed text-ink-muted">
                        <a href={p.mapUrl} target="_blank" rel="noopener noreferrer" className="link-draw">
                          {p.address.full}
                        </a>
                      </dd>
                    </div>
                  </dl>
                  <div className="flex gap-8 text-[0.92rem] font-semibold lg:col-span-2 lg:flex-col lg:items-end lg:gap-4">
                    <a
                      href={whatsappLink(p.whatsapp, `Hello, I would like to enquire about a stay at ${p.name}.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-line text-wine"
                      aria-label={`WhatsApp ${p.name}`}
                    >
                      WhatsApp
                    </a>
                    <a href={`tel:${p.phone.tel}`} className="link-line text-ink">
                      Call
                    </a>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>

          <p className="caption mt-10 text-ink-muted">
            Follow along on Instagram —{" "}
            <a href={siteConfig.instagram.url} target="_blank" rel="noopener noreferrer" className="link-line text-ink">
              {siteConfig.instagram.handle}
            </a>
          </p>
        </div>
      </section>

      <EnquirySection formOpen />
    </>
  );
}
