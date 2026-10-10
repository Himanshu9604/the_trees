import type { Metadata } from "next";
import Link from "next/link";
import { properties, propertyHref } from "@/data/properties";
import { buttonClasses } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="bg-aurora">
      <div className="container-site flex min-h-[70svh] flex-col items-start justify-center py-20">
        <p className="eyebrow text-violet-text">Error 404</p>
        <h1 className="mt-4 text-[2.6rem] leading-[1.1] font-bold tracking-[-0.03em] text-navy sm:text-6xl">
          This page has <span className="text-gradient">moved on.</span>
        </h1>
        <p className="mt-5 max-w-lg text-[1.05rem] leading-[1.75] text-slate">
          The page you were looking for no longer exists. Let&apos;s find you a stay instead.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/" className={buttonClasses("gold")}>
            Back to home
          </Link>
          <Link href="/properties" className={buttonClasses("outline-dark")}>
            All properties
          </Link>
        </div>
        <ul className="mt-10 flex flex-wrap gap-3">
          {properties.map((p) => (
            <li key={p.slug}>
              <Link href={propertyHref(p)} className="inline-flex rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-navy hover:border-violet hover:text-violet">
                {p.shortName}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
