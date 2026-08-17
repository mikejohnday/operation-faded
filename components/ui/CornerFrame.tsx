/**
 * Thin corner-bracket framing device, echoing the boxed "FADED." wordmark's
 * own rectangle-with-corners lockup (discovery §7). A reusable graphic
 * device rather than a one-off — used sparingly across a few key blocks
 * (creative refinement pass) so the page reads as more graphically
 * authored without literally rebuilding Instagram tiles.
 *
 * Place inside a `relative` parent with a little padding so the brackets
 * don't collide with the content they frame.
 */
export default function CornerFrame() {
  const base = "absolute h-4 w-4 border-fg/60 sm:h-5 sm:w-5";
  return (
    <span aria-hidden="true">
      <span className={`${base} top-0 left-0 border-t-2 border-l-2`} />
      <span className={`${base} top-0 right-0 border-t-2 border-r-2`} />
      <span className={`${base} bottom-0 left-0 border-b-2 border-l-2`} />
      <span className={`${base} bottom-0 right-0 border-b-2 border-r-2`} />
    </span>
  );
}
