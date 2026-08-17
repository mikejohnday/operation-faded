"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * The one client component the motion plan needs (build plan §4/§9).
 * Toggles a CSS class on intersection; the CSS transition itself lives in
 * globals.css and is guarded by prefers-reduced-motion. Content is visible
 * by default in the underlying markup, so a JS failure never hides it.
 */
export default function RevealOnScroll({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal
      className={`${revealed ? "is-revealed" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
