import Image from "next/image";
import { urls } from "@/content/site-content";
import Button from "@/components/ui/Button";

/**
 * Minimal by design — the wordmark and a single booking link, no multi-item
 * nav menu (build plan §4). There is nothing else on this one-page
 * prototype to navigate to.
 */
export default function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-30 flex items-center justify-between px-4 py-4 sm:px-8 sm:py-5">
      <a href="#hero" className="block h-9 w-auto sm:h-11">
        <Image
          src="/images/wordmark.webp"
          alt="Faded Barbers"
          width={165}
          height={110}
          priority
          className="h-full w-auto object-contain"
        />
      </a>
      <Button
        href={urls.squireBooking}
        variant="secondary"
        className="border-fg/60 bg-bg/40 px-5 py-2.5 text-xs backdrop-blur-sm"
      >
        Book
      </Button>
    </header>
  );
}
