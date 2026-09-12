import Link from "next/link";
import type { Faq, PriceRow } from "@/data/offerings";
import { MAZA_GOOGLE_MAPS_URL } from "@/lib/maza-maps";
import {
  MAZA_DOORDASH_URL,
  MAZA_GRUBHUB_URL,
  MAZA_UBEREATS_URL,
} from "@/lib/maza-profiles";

export type SeoLandingPageProps = {
  breadcrumb: { name: string; href: string }[];
  h1: string;
  /** Bible §2.2 data hook — rendered above the fold, first 100 words. */
  hook: string;
  intro: string;
  priceHeading: string;
  priceRows: PriceRow[];
  faqs: Faq[];
  image?: string;
  imageAlt?: string;
  /** Extra context block, e.g. neighborhood directions. */
  aside?: { heading: string; body: string };
  /** Internal links back into the site. */
  related: { label: string; href: string }[];
};

export default function SeoLandingPage({
  breadcrumb,
  h1,
  hook,
  intro,
  priceHeading,
  priceRows,
  faqs,
  image,
  imageAlt,
  aside,
  related,
}: SeoLandingPageProps) {
  return (
    <div className="py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-[#B8B8B8]">
            {breadcrumb.map((crumb, index) => (
              <li key={crumb.href} className="flex items-center gap-2">
                {index > 0 && <span aria-hidden="true">/</span>}
                {index === breadcrumb.length - 1 ? (
                  <span className="text-[#D3AB5E]">{crumb.name}</span>
                ) : (
                  <Link href={crumb.href} className="hover:text-[#D3AB5E]">
                    {crumb.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <h1 className="font-display text-3xl md:text-5xl font-bold text-[#D3AB5E] mb-6 tracking-wide">
          {h1}
        </h1>

        <div className="border-l-4 border-[#D3AB5E] bg-[#0F2A28] rounded-r-lg p-5 mb-8">
          <p className="text-[#F5F1E8] text-lg leading-relaxed">{hook}</p>
        </div>

        {image && (
          <img
            src={image}
            alt={imageAlt ?? h1}
            width={1200}
            height={800}
            loading="lazy"
            className="w-full rounded-xl border border-[#D3AB5E]/20 mb-8 object-cover"
          />
        )}

        <p className="text-[#B8B8B8] text-lg leading-relaxed mb-10">{intro}</p>

        <section className="mb-10">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-[#D3AB5E] mb-4">
            {priceHeading}
          </h2>
          <div className="overflow-hidden rounded-xl border border-[#D3AB5E]/20">
            <table className="w-full text-left">
              <caption className="sr-only">
                {priceHeading} — Maza Mediterranean Cuisine, Chandler AZ
              </caption>
              <thead className="bg-[#0F2A28]">
                <tr>
                  <th scope="col" className="px-4 py-3 text-sm font-semibold text-[#F5F1E8]">
                    Item
                  </th>
                  <th scope="col" className="px-4 py-3 text-sm font-semibold text-[#F5F1E8] text-right whitespace-nowrap">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {priceRows.map((row) => (
                  <tr key={row.label} className="border-t border-[#D3AB5E]/10">
                    <td className="px-4 py-3 align-top">
                      <span className="text-[#F5F1E8] font-medium">{row.label}</span>
                      {row.note && (
                        <span className="block text-sm text-[#B8B8B8] mt-1">
                          {row.note}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 align-top text-right font-mono text-[#D3AB5E] whitespace-nowrap">
                      {row.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-[#B8B8B8] mt-2">
            Prices from the Maza register menu. Menu items and prices may change —
            call to confirm today&apos;s pricing.
          </p>
        </section>

        {aside && (
          <section className="mb-10 rounded-xl border border-[#D3AB5E]/20 bg-[#0F2A28] p-5">
            <h2 className="font-display text-xl font-bold text-[#D3AB5E] mb-2">
              {aside.heading}
            </h2>
            <p className="text-[#B8B8B8] leading-relaxed">{aside.body}</p>
          </section>
        )}

        <section className="mb-10">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-[#D3AB5E] mb-4">
            Frequently asked
          </h2>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="rounded-lg border border-[#D3AB5E]/20 bg-[#0F2A28] p-4"
              >
                <summary className="cursor-pointer font-semibold text-[#F5F1E8]">
                  {faq.question}
                </summary>
                <p className="mt-3 text-[#B8B8B8] leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mb-10 rounded-xl border border-[#D3AB5E]/30 bg-[#0F2A28] p-6 text-center">
          <h2 className="font-display text-2xl font-bold text-[#D3AB5E] mb-2">
            Order from Maza
          </h2>
          <p className="text-[#B8B8B8] mb-5">
            3491 W Frye Rd, Suite 2, Chandler, AZ 85226 · Tue–Sun 10am–10pm ·
            Closed Mondays
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="tel:+14805346550"
              className="px-6 py-3 bg-[#D3AB5E] text-[#0A1F1E] font-semibold rounded-lg hover:bg-[#C49A4D] transition-colors"
            >
              Call (480) 534-6550
            </a>
            <a
              href={MAZA_GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-[#D3AB5E] text-[#D3AB5E] font-semibold rounded-lg hover:bg-[#D3AB5E]/10 transition-colors"
            >
              Get directions
            </a>
          </div>
          <p className="mt-4 text-sm text-[#B8B8B8]">
            Delivery:{" "}
            <a href={MAZA_DOORDASH_URL} target="_blank" rel="noopener noreferrer" className="text-[#D3AB5E] hover:underline">
              DoorDash
            </a>{" "}
            ·{" "}
            <a href={MAZA_UBEREATS_URL} target="_blank" rel="noopener noreferrer" className="text-[#D3AB5E] hover:underline">
              Uber Eats
            </a>{" "}
            ·{" "}
            <a href={MAZA_GRUBHUB_URL} target="_blank" rel="noopener noreferrer" className="text-[#D3AB5E] hover:underline">
              Grubhub
            </a>
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-[#D3AB5E] mb-3">
            Keep looking
          </h2>
          <ul className="flex flex-wrap gap-3">
            {related.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-block px-4 py-2 rounded-full border border-[#D3AB5E]/30 text-[#F5F1E8] hover:border-[#D3AB5E] hover:text-[#D3AB5E] transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
