import { offer, urls } from "@/content/site-content";
import Button from "@/components/ui/Button";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import CornerFrame from "@/components/ui/CornerFrame";

export default function OfferSection() {
  return (
    <section
      id="offer"
      aria-labelledby="offer-heading"
      className="px-4 py-20 sm:px-8 sm:py-28"
    >
      <div className="mx-auto max-w-2xl">
        <RevealOnScroll>
          <div className="relative overflow-hidden border border-border bg-surface px-6 py-14 text-center sm:px-16 sm:py-20">
            <CornerFrame />

            <p className="text-xs font-medium tracking-[0.25em] text-muted uppercase">
              A little something extra
            </p>

            <h2
              id="offer-heading"
              className="mt-2 font-display text-fg"
            >
              <span className="block text-[6.5rem] leading-none tracking-tight sm:text-[9rem]">
                {offer.percentage}
              </span>
              <span className="mt-1 block text-2xl tracking-wide sm:text-4xl">
                {offer.headlineRest}
              </span>
            </h2>

            <p className="mt-5 text-sm text-muted sm:text-base">
              {offer.description}
            </p>

            <p className="mt-7 inline-block border border-fg/50 px-6 py-2 font-display text-xl tracking-[0.2em] text-fg">
              {offer.code}
            </p>
            <p className="mt-4 text-xs text-muted">{offer.eligibilityText}</p>

            <div className="mt-9">
              <Button href={urls.squireBooking}>Book via Squire</Button>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
