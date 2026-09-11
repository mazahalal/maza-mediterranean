import { MAZA_GOOGLE_MAPS_URL } from "@/lib/maza-maps";
import { MAZA_RATING_VALUE, MAZA_REVIEW_COUNT } from "@/lib/maza-rating";

/**
 * Visible counterpart to the Restaurant aggregateRating in JSON-LD.
 * Both read the same constants from lib/maza-rating.ts (MAZ-113).
 * Server-rendered so it is in the HTML without any JS or interaction.
 */
export default function GoogleRating({ className = "" }: { className?: string }) {
  return (
    <p className={className}>
      <a
        href={MAZA_GOOGLE_MAPS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-[#D3AB5E] transition-colors"
      >
        {MAZA_RATING_VALUE}{" "}
        <span className="text-[#D3AB5E] tracking-[0.15em]" aria-hidden="true">
          ★★★★★
        </span>{" "}
        on Google · {MAZA_REVIEW_COUNT} reviews
      </a>
    </p>
  );
}
