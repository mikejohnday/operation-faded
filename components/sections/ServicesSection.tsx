import { services } from "@/content/site-content";
import PriceRow from "@/components/ui/PriceRow";

export default function ServicesSection() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="px-4 py-20 sm:px-8 sm:py-28"
    >
      <div className="mx-auto max-w-2xl">
        <p className="text-xs font-medium tracking-[0.2em] text-muted uppercase">
          Services at a glance
        </p>
        <h2
          id="services-heading"
          className="mt-2 font-display text-4xl tracking-wide text-fg sm:text-6xl"
        >
          Simple, honest pricing.
        </h2>

        <ul className="mt-10">
          {services.map((service) => (
            <PriceRow key={service.name} service={service} />
          ))}
        </ul>
      </div>
    </section>
  );
}
