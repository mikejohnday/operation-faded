import { services } from "@/content/site-content";
import PriceRow from "@/components/ui/PriceRow";
import FadedStamp from "@/components/ui/FadedStamp";

export default function ServicesSection() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="px-4 py-20 sm:px-8 sm:py-28"
    >
      <div className="mx-auto max-w-3xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium tracking-[0.2em] text-muted uppercase">
              Services at a glance
            </p>
            <h2
              id="services-heading"
              className="mt-2 font-display text-5xl tracking-wide text-fg sm:text-7xl"
            >
              Our Services
            </h2>
          </div>
          <FadedStamp className="mt-1 hidden sm:block" />
        </div>

        <ul className="mt-12 flex flex-wrap gap-x-3 gap-y-4 border-t border-border pt-10 sm:mt-16 sm:gap-x-4 sm:gap-y-6">
          {services.map((service, index) => (
            <PriceRow
              key={service.name}
              service={service}
              isLast={index === services.length - 1}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
