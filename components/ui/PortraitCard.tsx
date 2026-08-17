import Image from "next/image";
import type { TeamMember } from "@/content/site-content";
import RevealOnScroll from "./RevealOnScroll";

export default function PortraitCard({ member }: { member: TeamMember }) {
  return (
    <RevealOnScroll className="group w-full shrink-0 snap-center sm:w-auto sm:shrink">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-surface sm:w-80">
        <Image
          src={member.portrait}
          alt={member.alt}
          fill
          sizes="(min-width: 640px) 320px, 85vw"
          className="object-cover object-top grayscale transition-transform duration-500 ease-out [@media(hover:hover)]:group-hover:scale-[1.04]"
        />
      </div>
      <div className="mt-4">
        <h3 className="font-display text-2xl tracking-wide text-fg">
          {member.name}
        </h3>
        <p className="text-xs font-medium tracking-[0.15em] text-muted uppercase">
          {member.title}
        </p>
      </div>
    </RevealOnScroll>
  );
}
