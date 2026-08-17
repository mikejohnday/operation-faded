import Image from "next/image";

/**
 * A small rotated wordmark stamp, referencing the diagonal "FADED BARBERS"
 * stamp graphic seen on Faded's own cape/post imagery (visible in the
 * Instagram Bridge tiles) without literally rebuilding that tile as a
 * section. Purely decorative — the accessible wordmark lives in the header.
 */
export default function FadedStamp({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none -rotate-6 opacity-80 select-none ${className}`}
    >
      <Image
        src="/images/wordmark.webp"
        alt=""
        width={165}
        height={110}
        className="h-auto w-24 object-contain sm:w-28"
      />
    </div>
  );
}
