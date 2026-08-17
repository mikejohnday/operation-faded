import Image from "next/image";
import { hero, urls } from "@/content/site-content";
import Button from "@/components/ui/Button";

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
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/70 to-bg/20" />

      <div className="relative z-10 max-w-2xl">
        <p className="text-xs font-medium tracking-[0.2em] text-muted uppercase">
          Faded Barbers &middot; Selby
        </p>
        <h1
          id="hero-heading"
          className="mt-3 font-display text-6xl leading-[0.95] tracking-wide text-fg sm:text-8xl"
        >
          {hero.headline}
        </h1>
        <p className="mt-5 max-w-md text-base text-muted sm:text-lg">
          {hero.supporting}
        </p>
        <div className="mt-8">
          <Button href={urls.squireBooking}>Book via Squire</Button>
        </div>
      </div>
    </section>
  );
}
