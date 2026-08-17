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
          className="mt-2 font-display text-4xl tracking-wide text-fg sm:text-6xl"
        >
          Don&apos;t take our word for it.
        </h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
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

        <blockquote className="mt-10 border-l-2 border-fg/30 pl-6 font-display text-2xl leading-snug tracking-wide text-fg sm:text-3xl">
          &ldquo;{reviews.quote}&rdquo;
        </blockquote>
      </div>
    </section>
  );
}
