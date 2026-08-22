import Image from "next/image";
import Link from "next/link";
import { TAKEOUT_URL } from "@/lib/ordering";
import {
  getActiveHomepagePromo,
  type ActivePromo,
} from "@/lib/promos";
import PhoneLink from "@/components/PhoneLink";

function BannerInner({ promo }: { promo: ActivePromo }) {
  return (
    <section
      aria-label={`${promo.itemName} ${promo.title}`}
      className="border-b border-[#D3AB5E]/35 bg-[#0A1F1E]"
    >
      <div className="mx-auto grid max-w-6xl gap-0 md:grid-cols-2 md:items-stretch">
        {/* Visible plate photo */}
        <div className="relative min-h-[200px] w-full aspect-[16/10] md:aspect-auto md:min-h-[320px]">
          <Image
            src="/images/maza/promos/samak-plate.jpg"
            alt={promo.imageAlt}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-[center_40%]"
          />
        </div>

        <div className="flex flex-col justify-center gap-5 px-4 py-8 md:px-8 md:py-10">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#D3AB5E]">
              {promo.title} · {promo.whenLabel}
            </p>
            <h2 className="font-display text-3xl tracking-wide text-[#F5F1E8] md:text-4xl">
              {promo.itemName}{" "}
              <span className="text-[#D3AB5E]">{promo.salePrice}</span>
            </h2>
            <p className="mt-2 text-[#F5F1E8]/85">
              {promo.blurb}.{" "}
              <span className="text-[#B8B8B8] line-through">
                {promo.regularPrice}
              </span>
            </p>
            <p className="mt-3 text-sm font-semibold text-[#E9C87B] md:text-base">
              {promo.waitNote}. {promo.orderAheadNote}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={TAKEOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded bg-[#D3AB5E] px-6 py-3 text-center text-sm font-semibold tracking-wide text-[#0A1F1E] transition-colors hover:bg-[#C49A4D]"
            >
              Order Ahead
            </a>
            <PhoneLink className="inline-flex items-center justify-center rounded border border-[#D3AB5E] px-6 py-3 text-center text-sm font-semibold tracking-wide text-[#D3AB5E] transition-colors hover:bg-[#D3AB5E] hover:text-[#0A1F1E]">
              Call to Order
            </PhoneLink>
            <Link
              href="/menu#samak-weekend"
              className="inline-flex items-center justify-center rounded border border-[#D3AB5E]/40 px-6 py-3 text-center text-sm font-semibold tracking-wide text-[#F5F1E8]/90 transition-colors hover:border-[#D3AB5E] hover:text-[#D3AB5E]"
            >
              See on Menu
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Homepage / menu strip — only while the weekend special window is open. */
export default function SamakWeekendBanner() {
  const promo = getActiveHomepagePromo();
  if (!promo) return null;
  return <BannerInner promo={promo} />;
}
