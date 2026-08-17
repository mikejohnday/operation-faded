import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import GrainOverlay from "@/components/ui/GrainOverlay";
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

export const metadata: Metadata = {
  title: "Faded Barbers Selby — Book Your Next Cut",
  description:
    "Faded Barbers Selby — a Micklegate barbershop run by co-owners Elliot and Bailey. See the team, the work, and book your next cut via Squire.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-bg text-fg">
        <GrainOverlay />
        {children}
      </body>
    </html>
  );
}
