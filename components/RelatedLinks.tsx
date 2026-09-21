import Link from "next/link";
import {
  RELATED_BY_ROUTE,
  type RelatedChip,
} from "@/lib/menu-item-links";

type Props = {
  /** Key into RELATED_BY_ROUTE, e.g. "menu/plates" or "gallery". */
  routeKey: string;
  /** Optional override chips. */
  links?: RelatedChip[];
  heading?: string;
  className?: string;
};

export default function RelatedLinks({
  routeKey,
  links,
  heading = "Explore more",
  className = "",
}: Props) {
  const chips = links ?? RELATED_BY_ROUTE[routeKey] ?? [];
  if (chips.length === 0) return null;

  return (
    <section
      aria-label={heading}
      className={`mt-12 ${className}`.trim()}
    >
      <h2 className="font-display text-xl md:text-2xl font-bold text-[#D3AB5E] mb-4 tracking-wide text-center">
        {heading}
      </h2>
      <ul className="flex flex-wrap justify-center gap-3">
        {chips.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="inline-block px-4 py-2 rounded-full border border-[#D3AB5E]/30 text-[#F5F1E8] hover:border-[#D3AB5E] hover:text-[#D3AB5E] transition-colors text-sm tracking-wide"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
