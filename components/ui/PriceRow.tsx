import type { Service } from "@/content/site-content";

export default function PriceRow({ service }: { service: Service }) {
  return (
    <li className="flex items-baseline justify-between gap-4 border-b border-border py-4 text-fg">
      <span className="text-base sm:text-lg">{service.name}</span>
      <span
        aria-hidden="true"
        className="h-px flex-1 border-t border-dotted border-border/80"
      />
      <span className="font-display text-lg tracking-wide sm:text-xl">
        {service.price}
      </span>
    </li>
  );
}
