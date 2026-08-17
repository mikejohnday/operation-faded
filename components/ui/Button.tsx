import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.08em] transition-transform duration-200 ease-out motion-safe:hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-4";

const variants = {
  primary: "bg-fg text-bg hover:bg-white",
  secondary:
    "border border-fg/40 bg-transparent text-fg hover:border-fg hover:bg-fg/5",
};

/**
 * The single CTA component reused everywhere a booking or Instagram link
 * appears, so external link targets/attributes stay consistent by
 * construction (build plan §4).
 */
export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </a>
  );
}
