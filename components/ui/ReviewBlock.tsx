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
          className="h-4 w-4"
          aria-hidden="true"
        >
          <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6-4.6-4.1 6.1-.6z" />
        </svg>
      ))}
    </div>
  );
}

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
    <div className="rounded-sm border border-border bg-surface p-6 sm:p-8">
      <p className="text-xs font-medium tracking-[0.15em] text-muted uppercase">
        via {label}
      </p>
      <div className="mt-3 flex items-center gap-3">
        <Stars rating={rating} />
        <span className="font-display text-2xl tracking-wide">
          {rating.toFixed(1)}
        </span>
      </div>
      <p className="mt-1 text-sm text-muted">{count} reviews</p>
    </div>
  );
}
