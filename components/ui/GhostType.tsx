import type { ReactNode } from "react";

/**
 * Oversized, low-opacity background display type — a poster-composition
 * device (creative refinement pass, Direction B influence) rather than a
 * new photograph. Purely decorative, so it's hidden from assistive tech;
 * the real heading text carrying the same meaning sits in normal flow
 * beside/above it.
 */
export default function GhostType({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute font-display leading-none text-fg/[0.06] select-none ${className}`}
    >
      {children}
    </span>
  );
}
