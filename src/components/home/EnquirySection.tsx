import Image from "next/image";
import { getProperty, properties } from "@/data/properties";
import { siteConfig, whatsappLink } from "@/lib/site";
import { buttonClasses } from "@/lib/ui";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { EnquiryDisclosure } from "./EnquiryDisclosure";

/** H. Plan your stay — a lavender gradient CTA panel with a working WhatsApp enquiry. */
export function EnquirySection({ defaultProperty, formOpen = false }: { defaultProperty?: string; formOpen?: boolean }) {
  const focus = defaultProperty ? getProperty(defaultProperty) : undefined;
  const wa = focus
    ? whatsappLink(focus.whatsapp, `Hello, I would like to enquire about a stay at ${focus.name}.`)
    : whatsappLink(siteConfig.primaryWhatsApp, "Hello The Tree, I would like to enquire about a stay.");

  return (
    <section id="enquiry" aria-labelledby="enquiry-title" className="bg-white py-20 lg:py-28">
      <div className="container-site">
        <Reveal className="bg-aurora relative overflow-hidden rounded-[2rem] border border-white p-7 shadow-[var(--shadow-soft)] sm:p-12 lg:p-16">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="eyebrow text-violet-text">Plan your stay</p>
              <h2 id="enquiry-title" className="mt-4 text-[2.2rem] leading-[1.12] font-bold tracking-[-0.03em] text-navy sm:text-5xl">
                Ready for your <span className="text-gradient">next escape?</span>
              </h2>
              <p className="mt-5 max-w-lg text-[1.05rem] leading-[1.75] text-slate">
                Message {focus ? focus.shortName : "us"} on WhatsApp — open 24×7. You book directly with the property, with zero
                commission.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href={wa} target="_blank" rel="noopener noreferrer" className={buttonClasses("gold", "min-h-13 px-8")}>
                  <Icon name="whatsapp" size={18} /> Enquire on WhatsApp
                </a>
                <a
                  href={`tel:${(focus ?? { phone: siteConfig.primaryPhone }).phone.tel}`}
                  className={buttonClasses("outline-dark", "min-h-13 px-8")}
                >
                  <Icon name="phone" size={17} /> {(focus ?? { phone: siteConfig.primaryPhone }).phone.display}
                </a>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="relative ml-auto aspect-[4/3] w-[88%] overflow-hidden rounded-[1.5rem] shadow-[var(--shadow-float)]">
                <Image src="/images/lonavala/gallery-10.jpg" alt="Bedroom with four-poster bed at The Tree Resort Lonavala" fill sizes="35vw" className="object-cover" />
              </div>
              <div className="absolute -bottom-6 left-0 rounded-2xl bg-white p-4 shadow-[var(--shadow-float)]">
                <p className="text-[0.8rem] font-medium text-slate">Reply on WhatsApp</p>
                <p className="mt-0.5 text-lg font-semibold text-navy">Open 24×7</p>
              </div>
            </div>
          </div>

          {/* Direct lines */}
          <ul className="mt-12 grid gap-3 sm:grid-cols-3">
            {properties.map((p) => (
              <li key={p.slug} className="flex items-center justify-between gap-3 rounded-2xl bg-white/80 px-5 py-4">
                <span>
                  <span className="block text-[0.8rem] text-slate">{p.locality}</span>
                  <a href={`tel:${p.phone.tel}`} className="mt-0.5 block font-semibold text-navy hover:text-violet">
                    {p.phone.display}
                  </a>
                </span>
                <a
                  href={whatsappLink(p.whatsapp, `Hello, I would like to enquire about a stay at ${p.name}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-violet to-royal text-white"
                  aria-label={`WhatsApp ${p.name}`}
                >
                  <Icon name="whatsapp" size={17} />
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <EnquiryDisclosure defaultProperty={defaultProperty} defaultOpen={formOpen} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
