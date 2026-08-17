import { reviews } from "@/content/site-content";
import ReviewBlock from "@/components/ui/ReviewBlock";

export default function SocialProofSection() {
  return (
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
      className="px-4 py-20 sm:px-8 sm:py-28"
    >
      <div className="mx-auto max-w-4xl">
        <p className="text-xs font-medium tracking-[0.2em] text-muted uppercase">
          Social proof
        </p>
        <h2
          id="reviews-heading"
          className="mt-2 font-display text-5xl tracking-wide text-fg sm:text-7xl"
        >
          Don&apos;t take our word for it.
        </h2>

        <div className="relative mt-14 sm:mt-20">
          <span
            aria-hidden="true"
            className="absolute -top-10 -left-2 font-display text-[8rem] text-fg/10 select-none sm:-top-16 sm:text-[12rem]"
          >
            &ldquo;
          </span>
          <blockquote className="relative max-w-2xl text-2xl leading-snug font-semibold text-fg sm:text-4xl">
            {reviews.quote}
          </blockquote>
        </div>

        <div className="mt-14 flex flex-wrap gap-x-12 gap-y-8 border-t border-border pt-10 sm:mt-20">
          <ReviewBlock
            label={reviews.google.label}
            rating={reviews.google.rating}
            count={reviews.google.count}
          />
          <ReviewBlock
            label={reviews.squire.label}
            rating={reviews.squire.rating}
            count={reviews.squire.count}
          />
        </div>
      </div>
    </section>
  );
}
