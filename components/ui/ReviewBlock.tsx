function Stars({ rating }: { rating: number }) {
  return (
    <div
      className="flex gap-1 text-fg"
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-3.5 w-3.5"
          aria-hidden="true"
        >
          <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6-4.6-4.1 6.1-.6z" />
        </svg>
      ))}
    </div>
  );
}

/**
 * A quiet, label-first stat rather than a boxed dashboard card — reserves
 * the section's visual weight for the real review quote (creative
 * refinement pass).
 */
export default function ReviewBlock({
  label,
  rating,
  count,
}: {
  label: string;
  rating: number;
  count: number;
}) {
  return (
    <div>
      <p className="text-xs font-medium tracking-[0.2em] text-muted uppercase">
        via {label}
      </p>
      <div className="mt-2 flex items-baseline gap-3">
        <span className="font-display text-5xl tracking-wide text-fg sm:text-6xl">
          {rating.toFixed(1)}
        </span>
        <Stars rating={rating} />
      </div>
      <p className="mt-1 text-sm text-muted">{count} reviews</p>
    </div>
  );
}
