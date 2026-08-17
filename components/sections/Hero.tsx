import Image from "next/image";
import { hero, urls } from "@/content/site-content";
import Button from "@/components/ui/Button";
import CornerFrame from "@/components/ui/CornerFrame";
import GhostType from "@/components/ui/GhostType";

export default function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden px-4 pt-32 pb-16 sm:px-8 sm:pb-24"
    >
      <Image
        src="/images/hero.webp"
        alt="The Faded Barbers Selby shopfront sign above the shop's front door on Micklegate"
        fill
        priority
        sizes="100vw"
        className="object-cover object-top"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/75 to-bg/30" />

      <GhostType className="top-[-0.1em] -right-6 text-[9rem] tracking-tight sm:text-[16rem]">
        FADED
      </GhostType>

      <div className="relative z-10 max-w-2xl">
        <div className="relative inline-block px-4 py-2">
          <CornerFrame />
          <p className="text-xs font-medium tracking-[0.25em] text-muted uppercase">
            Faded Barbers &middot; Selby
          </p>
        </div>
        <h1
          id="hero-heading"
          className="mt-4 font-display text-7xl leading-[0.88] tracking-wide text-fg sm:text-9xl"
        >
          {hero.headline}
        </h1>
        <div className="mt-6 max-w-xs border-l-2 border-fg/30 pl-4 sm:max-w-sm">
          <p className="text-sm text-muted sm:text-base">{hero.supporting}</p>
        </div>
        <div className="mt-8">
          <Button href={urls.squireBooking}>Book via Squire</Button>
        </div>
      </div>
    </section>
  );
}
