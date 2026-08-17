/**
 * Site-wide film-grain texture, recreated from scratch as an SVG feTurbulence
 * filter rather than reused from any screenshot's compressed pixels
 * (build plan §7/§9). Pure CSS-driven animation, so no client JS is needed.
 */
export default function GrainOverlay() {
  return (
    <div className="grain-overlay" aria-hidden="true">
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <filter id="faded-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves={3}
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#faded-grain)" />
      </svg>
    </div>
  );
}
