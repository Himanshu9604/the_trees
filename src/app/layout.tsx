import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site";
import { organizationSchema, websiteSchema } from "@/lib/seo";
import { Header } from "@/components/layout/Header";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { MotionProvider } from "@/components/ui/MotionProvider";
import { JsonLd } from "@/components/ui/JsonLd";
import { ChatWidget } from "@/components/chat/ChatWidget";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "The Tree Hotels & Resorts — Hotels in Pune & Villa Resort in Lonavala",
    template: "%s | The Tree Hotels & Resorts",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "hotel in Ravet Pune",
    "hotel near Hinjewadi Phase 3",
    "resort in Lonavala",
    "villas in Lonavala",
    "private villa Lonavala celebration",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: siteConfig.name,
    url: "/",
    images: [{ url: siteConfig.ogImage, alt: "The Tree Resort Lonavala by night, with pool" }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  verification: siteConfig.googleVerification ? { google: siteConfig.googleVerification } : undefined,
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#6747f5",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={jakarta.variable}>
      <head>
        {/* Without JavaScript, reveal animations never run — keep content visible. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>
      </head>
      <body className="pb-16 md:pb-0">
        <a
          href="#main"
          className="sr-only z-[80] bg-paper px-4 py-3 text-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <MotionProvider>
          <ScrollProgress />
          <AnnouncementBar />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <MobileActionBar />
          <ChatWidget />
        </MotionProvider>
      </body>
    </html>
  );
}
