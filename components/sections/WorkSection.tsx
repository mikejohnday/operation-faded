import Image from "next/image";
import { urls } from "@/content/site-content";
import Button from "@/components/ui/Button";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

export default function WorkSection() {
  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="px-4 py-20 sm:px-8 sm:py-28"
    >
      <div className="mx-auto max-w-5xl">
        <p className="text-xs font-medium tracking-[0.2em] text-muted uppercase">
          The work
        </p>
        <h2
          id="work-heading"
          className="mt-2 font-display text-4xl tracking-wide text-fg sm:text-6xl"
        >
          In the chair.
        </h2>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
          <RevealOnScroll className="relative col-span-1 row-span-2 aspect-[3/4] overflow-hidden rounded-sm bg-surface sm:row-span-1">
            <Image
              src="/images/work/work-1.webp"
              alt="A barber cutting hair from behind, mid-fade, in the studio chair"
              fill
              sizes="(min-width: 640px) 33vw, 50vw"
              className="object-cover grayscale"
            />
          </RevealOnScroll>
          <RevealOnScroll className="relative col-span-1 aspect-[4/3] overflow-hidden rounded-sm bg-surface sm:col-span-2">
            <Image
              src="/images/work/work-2.webp"
              alt="A barber trimming a young client's hairline in the shop"
              fill
              sizes="(min-width: 640px) 66vw, 50vw"
              className="object-cover grayscale"
            />
          </RevealOnScroll>
        </div>

        <div className="mt-10">
          <Button href={urls.squireBooking} variant="secondary">
            Book via Squire
          </Button>
        </div>
      </div>
    </section>
  );
}
