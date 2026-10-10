import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { StayDirectory } from "@/components/property/StayDirectory";
import { Comparison } from "@/components/home/Comparison";
import { EnquirySection } from "@/components/home/EnquirySection";
import { Reveal } from "@/components/ui/Reveal";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Hotels & Villas in Pune and Lonavala — All Properties",
  description:
    "Browse all The Tree properties: Hotel Ravet and Hotel Hinjewadi Phase 3 in Pune, and the private-villa Resort Lonavala. Compare rooms, amenities and contacts.",
  path: "/properties",
  image: "/images/ravet/hero.jpg",
});

export default function PropertiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our properties"
        title="Hotels in Pune, villas in Lonavala"
        italic="villas"
        intro="Three owner-run properties — each with its own character, all reachable directly by call or WhatsApp."
        image={{ src: "/images/ravet/hero.jpg", alt: "The Tree Hotel Ravet building in Pune" }}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Properties", path: "/properties" },
        ]}
      />
      <section aria-label="All properties" className="bg-paper pt-20 pb-28 lg:pt-28 lg:pb-40">
        <div className="container-site">
          <StayDirectory headingLevel="h2" />
          <Reveal className="mt-24 grid gap-6 border-t border-ink/15 pt-10 text-2xl text-ink sm:grid-cols-2">
            <p>
              Travelling to the city?{" "}
              <Link href="/destinations/pune" className="link-line">
                Compare our hotels in Pune
              </Link>
              .
            </p>
            <p>
              Planning a weekend in the hills?{" "}
              <Link href="/destinations/lonavala" className="link-line">
                See villas in Lonavala
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>
      <Comparison />
      <EnquirySection />
    </>
  );
}
