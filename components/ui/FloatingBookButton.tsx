"use client";

import { useEffect, useState } from "react";
import { urls } from "@/content/site-content";
import Button from "./Button";

/**
 * Compact, corner-anchored floating "Book" button (build plan §8) — not a
 * full-width sticky bar, which would read as an advert banner and cut
 * against Direction C's calmer, trust-through-people feel. Hidden while the
 * hero (which already carries the primary CTA) is in view, and hidden again
 * once the footer (which repeats a "Book" link) is in view, so only one
 * booking prompt is ever on screen at once.
 */
export default function FloatingBookButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    const footer = document.getElementById("site-footer");
    if (!hero || !footer) return;

    let heroVisible = true;
    let footerVisible = false;

    const update = () => setVisible(!heroVisible && !footerVisible);

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        heroVisible = entry.isIntersecting;
        update();
      },
      { threshold: 0.05 },
    );
    const footerObserver = new IntersectionObserver(
      ([entry]) => {
        footerVisible = entry.isIntersecting;
        update();
      },
      { threshold: 0.05 },
    );

    heroObserver.observe(hero);
    footerObserver.observe(footer);

    return () => {
      heroObserver.disconnect();
      footerObserver.disconnect();
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed right-4 bottom-5 z-40 sm:right-6 sm:bottom-6">
      <Button
        href={urls.squireBooking}
        variant="primary"
        className="px-5 py-3 text-xs shadow-md shadow-black/40"
      >
        Book
      </Button>
    </div>
  );
}
