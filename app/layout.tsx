import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import GrainOverlay from "@/components/ui/GrainOverlay";
import SiteHeader from "@/components/layout/SiteHeader";
import FloatingBookButton from "@/components/ui/FloatingBookButton";
import { business, urls } from "@/content/site-content";
import "./globals.css";

/**
 * Prototype substitute typefaces (build plan §7/§16) — Anton and Inter are
 * NOT confirmed Faded brand fonts. Anton stands in for a bold condensed
 * grotesk close to the boxed "FADED." wordmark's own compression; Archivo
 * Black and Bebas Neue remain valid one-line swaps here later.
 */
const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const title = "Faded Barbers Selby — Book Your Next Cut";
const description =
  "Faded Barbers Selby — a Micklegate barbershop run by co-owners Elliot and Bailey. See the team, the work, and book your next cut via Squire.";

// Vercel sets VERCEL_URL at build time; falls back to localhost outside of
// that environment. Avoids hardcoding a production domain that isn't
// confirmed yet.
const metadataBase = process.env.VERCEL_URL
  ? new URL(`https://${process.env.VERCEL_URL}`)
  : new URL("http://localhost:3000");

export const metadata: Metadata = {
  metadataBase,
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

/**
 * LocalBusiness structured data (build plan §11) — only confirmed facts
 * from discovery §2. Opening hours are deliberately omitted: discovery only
 * confirms one half of most days' hours (e.g. Saturday's opening time but
 * not its closing time), and schema.org's openingHours format requires a
 * full open/close pair per day. Inventing the missing half would violate
 * the "no invented business facts" rule, so this prototype leaves hours as
 * the plain-text lines in the footer rather than fabricating structured
 * times. AggregateRating is omitted for the same reason (§11) — the review
 * counts are discovery-snapshot figures, not live data.
 */
const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: business.name,
  address: {
    "@type": "PostalAddress",
    streetAddress: business.addressLine1,
    addressLocality: "Selby",
    postalCode: "YO8 4EQ",
    addressCountry: "GB",
  },
  telephone: business.phone,
  sameAs: [urls.instagram],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-bg text-fg">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />
        <GrainOverlay />
        <SiteHeader />
        {children}
        <FloatingBookButton />
      </body>
    </html>
  );
}
