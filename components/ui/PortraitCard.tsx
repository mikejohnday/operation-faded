import Image from "next/image";
import type { TeamMember } from "@/content/site-content";
import RevealOnScroll from "./RevealOnScroll";
import CornerFrame from "./CornerFrame";

export default function PortraitCard({ member }: { member: TeamMember }) {
  return (
    <RevealOnScroll className="group w-full shrink-0 snap-center sm:w-auto sm:shrink">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-surface p-1.5">
        <CornerFrame />
        <div className="relative h-full w-full overflow-hidden">
          <Image
            src={member.portrait}
            alt={member.alt}
            fill
            sizes="(min-width: 640px) 400px, 85vw"
            className="object-cover object-top grayscale transition-transform duration-500 ease-out [@media(hover:hover)]:group-hover:scale-[1.04]"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg via-bg/60 to-transparent pt-16 pb-5 pl-2">
            <h3 className="font-display text-4xl tracking-wide text-fg sm:text-5xl">
              {member.name}
            </h3>
            <p className="text-xs font-medium tracking-[0.2em] text-muted uppercase">
              {member.title}
            </p>
          </div>
        </div>
      </div>
    </RevealOnScroll>
  );
}
