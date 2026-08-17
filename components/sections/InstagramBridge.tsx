import Image from "next/image";
import { instagramHandle, urls } from "@/content/site-content";
import Button from "@/components/ui/Button";

const tiles = [
  {
    src: "/images/instagram/tile-1.webp",
    alt: "Instagram post: the FADED25 offer graphic",
  },
  {
    src: "/images/instagram/tile-2.webp",
    alt: "Instagram post: Our Services, paired with a work-in-progress photo",
  },
  {
    src: "/images/instagram/tile-3.webp",
    alt: "Instagram post: 5 signs it's time for a haircut",
  },
  {
    src: "/images/instagram/tile-4.webp",
    alt: "Instagram post: a culturally-topical graphic from the Faded feed",
  },
];

export default function InstagramBridge() {
  return (
    <section
      id="instagram"
      aria-labelledby="instagram-heading"
      className="px-4 py-20 sm:px-8 sm:py-24"
    >
      <div className="mx-auto max-w-5xl">
        <p className="text-xs font-medium tracking-[0.2em] text-muted uppercase">
          {instagramHandle}
        </p>
        <h2
          id="instagram-heading"
          className="mt-2 font-display text-4xl tracking-wide text-fg sm:text-6xl"
        >
          More of this on Instagram.
        </h2>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {tiles.map((tile) => (
            <div
              key={tile.src}
              className="relative aspect-[4/5] overflow-hidden rounded-sm bg-surface"
            >
              <Image
                src={tile.src}
                alt={tile.alt}
                fill
                sizes="(min-width: 640px) 25vw, 50vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Button href={urls.instagram} variant="secondary">
            View {instagramHandle}
          </Button>
        </div>
      </div>
    </section>
  );
}
