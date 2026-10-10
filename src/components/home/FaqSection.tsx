import Link from "next/link";
import { Accordion } from "@/components/ui/Accordion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

interface FaqSectionProps {
  faqs: readonly { q: string; a: string }[];
  title?: string;
  eyebrow?: string;
}

export function FaqSection({ faqs, title = "Questions, answered", eyebrow = "FAQ" }: FaqSectionProps) {
  return (
    <section aria-labelledby="faq-title" className="bg-paper py-24 lg:py-36">
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-x-8">
        <div className="lg:col-span-4">
          <SectionHeading id="faq-title" eyebrow={eyebrow} title={title} italic="answered" />
          <Reveal delay={0.1}>
            <p className="mt-6 text-[0.95rem] text-ink-muted">
              Still wondering about something?{" "}
              <Link href="/contact" className="link-line text-ink">
                Contact the property
              </Link>{" "}
              directly.
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
          <Accordion items={faqs} />
        </Reveal>
      </div>
    </section>
  );
}
