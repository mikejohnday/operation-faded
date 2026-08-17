import Image from "next/image";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import CornerFrame from "@/components/ui/CornerFrame";

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
          className="mt-2 font-display text-5xl tracking-wide text-fg sm:text-7xl"
        >
          In the chair.
        </h2>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:mt-20 sm:grid-cols-3 sm:gap-8">
          <RevealOnScroll className="relative col-span-1 row-span-2 sm:row-span-1">
            <div className="relative aspect-[3/4] overflow-hidden bg-surface p-1.5 sm:mt-10 sm:-rotate-1">
              <CornerFrame />
              <div className="relative h-full w-full overflow-hidden">
                <Image
                  src="/images/work/work-1.webp"
                  alt="A barber cutting hair from behind, mid-fade, in the studio chair"
                  fill
                  sizes="(min-width: 640px) 33vw, 50vw"
                  className="object-cover grayscale"
                />
              </div>
            </div>
            <p className="mt-3 text-[0.65rem] font-medium tracking-[0.2em] text-muted uppercase">
              In progress &mdash; fade, from behind
            </p>
          </RevealOnScroll>

          <RevealOnScroll className="relative col-span-1 sm:col-span-2">
            <div className="relative aspect-[4/3] overflow-hidden bg-surface p-1.5">
              <div className="relative h-full w-full overflow-hidden">
                <Image
                  src="/images/work/work-2.webp"
                  alt="A barber trimming a young client's hairline in the shop"
                  fill
                  sizes="(min-width: 640px) 66vw, 50vw"
                  className="object-cover grayscale"
                />
              </div>
            </div>
            <p className="mt-3 text-[0.65rem] font-medium tracking-[0.2em] text-muted uppercase">
              Mid-cut &mdash; hairline, in the chair
            </p>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
