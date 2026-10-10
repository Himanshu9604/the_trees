import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { BrandStatement } from "@/components/home/BrandStatement";
import { FeaturedStays } from "@/components/home/FeaturedStays";
import { Destinations } from "@/components/home/Destinations";
import { Experiences } from "@/components/home/Experiences";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { Testimonials } from "@/components/home/Testimonials";
import { EnquirySection } from "@/components/home/EnquirySection";
import { BenefitsStrip, LonavalaPromo, Occasions } from "@/components/home/Marketing";
import { BookDirect, HowItWorks, InstagramFeed } from "@/components/home/Growth";
import { FindUs } from "@/components/home/FindUs";
import { FaqSection } from "@/components/home/FaqSection";
import { generalFaqs } from "@/data/content";
import { StayDirectory } from "@/components/property/StayDirectory";
import { MaskLines, Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/ui/JsonLd";
import { properties } from "@/data/properties";
import { faqSchema, propertySchema } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={[...properties.map(propertySchema), faqSchema(generalFaqs)]} />
      <Hero />
      <BenefitsStrip />
      {/* A */}
      <BrandStatement />
      {/* B */}
      <FeaturedStays />
      {/* C */}
      <Destinations />
      <Occasions />
      {/* D. Signature experiences */}
      <Experiences />

      <HowItWorks />

      {/* E. Explore your stay */}
      <section id="properties" aria-labelledby="directory-title" className="bg-white py-24 lg:py-32">
        <div className="container-site">
          <div className="mb-12 grid gap-6 lg:mb-16 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="eyebrow text-violet-text">Explore all stays</p>
              </Reveal>
              <MaskLines
                id="directory-title"
                className="display mt-5 text-[2.3rem] text-navy sm:text-5xl lg:text-[3.4rem]"
                lines={[<span key="line-1">Find the stay that <em>fits.</em></span>]}
              />
            </div>
            <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
              <p className="text-[1rem] leading-[1.75] text-body">
                Filter by location or stay type, then enquire directly. Rates are shared by the property on enquiry.
              </p>
            </Reveal>
          </div>
          <StayDirectory />
        </div>
      </section>

      {/* G */}
      <BookDirect />
      <GalleryPreview />
      <LonavalaPromo />
      {/* H */}
      <Testimonials />
      <FaqSection faqs={generalFaqs} />
      <FindUs />
      <InstagramFeed />
      {/* I */}
      <EnquirySection />
    </>
  );
}
