import type { Service } from "@/content/site-content";

/**
 * One "NAME £PRICE" unit in the services list. Styled to translate Faded's
 * real Instagram services graphic — a dense, pipe-separated, condensed
 * uppercase list — into a responsive web list, rather than a SaaS-style
 * price table. `isLast` suppresses the trailing pipe separator.
 */
export default function PriceRow({
  service,
  isLast = false,
}: {
  service: Service;
  isLast?: boolean;
}) {
  return (
    <li className="inline-flex items-baseline gap-2 sm:gap-3">
      <span className="font-display text-xl tracking-wide text-fg uppercase sm:text-3xl">
        {service.name}
      </span>
      <span className="text-xl font-bold text-fg sm:text-3xl">
        {service.price}
      </span>
      {!isLast && (
        <span aria-hidden="true" className="text-xl text-muted/40 sm:text-3xl">
          |
        </span>
      )}
    </li>
  );
}
