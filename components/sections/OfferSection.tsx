import { offer, urls } from "@/content/site-content";
import Button from "@/components/ui/Button";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

export default function OfferSection() {
  return (
    <section
      id="offer"
      aria-labelledby="offer-heading"
      className="px-4 py-20 sm:px-8 sm:py-28"
    >
      <div className="mx-auto max-w-2xl">
        <RevealOnScroll>
          <div className="rounded-sm border border-border bg-surface px-8 py-12 text-center sm:px-16 sm:py-16">
            <p className="text-xs font-medium tracking-[0.2em] text-muted uppercase">
              A little something extra
            </p>
            <h2
              id="offer-heading"
              className="mt-4 font-display text-4xl tracking-wide text-fg sm:text-5xl"
            >
              {offer.headline}
            </h2>
            <p className="mt-3 text-muted">{offer.description}</p>
            <p className="mt-6 inline-block rounded-full border border-fg/40 px-6 py-2 font-display text-xl tracking-[0.15em] text-fg">
              {offer.code}
            </p>
            <p className="mt-4 text-xs text-muted">{offer.eligibilityText}</p>
            <div className="mt-8">
              <Button href={urls.squireBooking}>Book via Squire</Button>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
