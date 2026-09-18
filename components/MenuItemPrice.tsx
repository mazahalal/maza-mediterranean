import { getActivePromoForItem } from "@/lib/promos";

type Props = {
  itemName: string;
  /** Permanent menu price from menu.json / data/menu.ts */
  price: string;
  className?: string;
  /** Larger gold sale price (card / lightbox) */
  size?: "card" | "lightbox" | "compact";
};

/**
 * Shows permanent price, or during a matching flash promo:
 * crossed-out regular + gold sale ($8 etc).
 */
export default function MenuItemPrice({
  itemName,
  price,
  className = "",
  size = "card",
}: Props) {
  const promo = getActivePromoForItem(itemName);
  const regular = promo?.regularPrice ?? price;
  const sale = promo?.salePrice;

  if (!sale) {
    const base =
      size === "lightbox"
        ? "text-[#D3AB5E] text-xl font-bold"
        : size === "compact"
          ? "font-mono text-[#D3AB5E] font-medium whitespace-nowrap"
          : "text-[#D3AB5E] font-bold text-lg sm:text-xl shrink-0";
    return <span className={`${base} ${className}`.trim()}>{price}</span>;
  }

  if (size === "lightbox") {
    return (
      <p className={`mb-2 flex items-baseline justify-center gap-2 ${className}`.trim()}>
        <span className="text-[#D3AB5E] text-xl font-bold">{sale}</span>
        <span className="text-[#B8B8B8] text-base line-through">{regular}</span>
      </p>
    );
  }

  if (size === "compact") {
    return (
      <span
        className={`inline-flex items-baseline gap-1.5 font-mono whitespace-nowrap shrink-0 ${className}`.trim()}
      >
        <span className="text-[#D3AB5E] font-semibold">{sale}</span>
        <span className="text-[#B8B8B8] text-sm line-through">{regular}</span>
      </span>
    );
  }

  // card (default MenuLightbox grid)
  return (
    <span
      className={`inline-flex flex-col items-end shrink-0 leading-tight ${className}`.trim()}
    >
      <span className="text-[#D3AB5E] font-bold text-lg sm:text-xl">{sale}</span>
      <span className="text-[#B8B8B8] text-sm line-through">{regular}</span>
    </span>
  );
}
