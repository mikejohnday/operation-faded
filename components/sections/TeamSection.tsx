import { team } from "@/content/site-content";
import PortraitCard from "@/components/ui/PortraitCard";

export default function TeamSection() {
  return (
    <section
      id="team"
      aria-labelledby="team-heading"
      className="px-4 py-20 sm:px-8 sm:py-28"
    >
      <div className="mx-auto max-w-5xl">
        <p className="text-xs font-medium tracking-[0.2em] text-muted uppercase">
          Meet the team
        </p>
        <h2
          id="team-heading"
          className="mt-2 font-display text-5xl tracking-wide text-fg sm:text-7xl"
        >
          Meet the faces behind the fades
        </h2>
        <p className="mt-4 max-w-xl text-muted">
          Faded&apos;s co-owners, and two of the faces behind the fades.
        </p>

        <div className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 sm:mt-16 sm:grid sm:grid-cols-[repeat(auto-fit,minmax(280px,1fr))] sm:gap-10 sm:overflow-visible sm:pb-0">
          {team.map((member) => (
            <PortraitCard key={member.name} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}
