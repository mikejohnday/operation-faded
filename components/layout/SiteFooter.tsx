import Image from "next/image";
import { business, urls } from "@/content/site-content";
import Button from "@/components/ui/Button";

const mapsHref =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(`${business.addressLine1}, ${business.addressLine2}`);

export default function SiteFooter() {
  return (
    <footer
      id="site-footer"
      className="border-t border-border px-4 py-14 sm:px-8 sm:py-20"
    >
      <div className="mx-auto grid max-w-5xl gap-10 sm:grid-cols-3">
        <div>
          <Image
            src="/images/wordmark.webp"
            alt="Faded Barbers"
            width={165}
            height={110}
            className="h-9 w-auto object-contain"
          />
          <p className="mt-4 text-sm text-muted">
            {business.addressLine1}
            <br />
            {business.addressLine2}
          </p>
          <a
            href={mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-sm text-fg underline decoration-fg/40 underline-offset-4 hover:decoration-fg"
          >
            Get directions
          </a>
        </div>

        <div>
          <p className="text-xs font-medium tracking-[0.2em] text-muted uppercase">
            Hours
          </p>
          <ul className="mt-3 space-y-1.5 text-sm text-muted">
            {business.hours.map((entry) => (
              <li key={entry.days}>
                <span className="text-fg">{entry.days}</span> &mdash;{" "}
                {entry.time}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-medium tracking-[0.2em] text-muted uppercase">
            Contact
          </p>
          <a
            href={business.phoneHref}
            className="mt-3 block text-sm text-fg hover:underline"
          >
            {business.phone}
          </a>
          <a
            href={urls.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 block text-sm text-fg hover:underline"
          >
            Instagram
          </a>
          <Button
            href={urls.squireBooking}
            variant="secondary"
            className="mt-6"
          >
            Book via Squire
          </Button>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-5xl border-t border-border pt-6 text-xs text-muted">
        <p>{business.name} &mdash; a speculative Fruitbowl prototype.</p>
      </div>
    </footer>
  );
}
