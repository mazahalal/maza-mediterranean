import type { Metadata } from "next";
import PhoneLink from "@/components/PhoneLink";
import { MAZA_GOOGLE_MAPS_URL } from "@/lib/maza-maps";
import CateringRequestForm from "./CateringRequestForm";

/**
 * Catering landing page at /catering
 *
 * QR destination for the catering flyer ("SCAN TO SEND A CATERING REQUEST").
 * The visitor is an office manager, event planner or school organizer on a
 * phone, so the page leads with the phone number and the tray prices, then
 * hands off to a short nine-field request form.
 */

export const metadata: Metadata = {
  alternates: { canonical: "https://mazahalalfood.com/catering" },
  title: "Catering by Maza | Tray & Kebab Prices | Chandler, AZ",
  description:
    "Catering by Maza Mediterranean Cuisine in Chandler, AZ. Shish kebab, rice, hummus, baba ghanoush, tzatziki and salad trays for offices, parties, weddings and schools. 100% halal, fresh, family meal size. Call (480) 534-6550.",
  icons: {
    icon: "/maza_ornate_logo.webp",
  },
};

const CARD =
  "bg-[#0E0E0E] rounded-lg border border-[rgba(211,171,94,0.15)] p-6";

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <h2 className="font-display text-sm tracking-[3px] text-[#D3AB5E]">
        {children}
      </h2>
      <div className="mt-2 h-px w-full bg-[#D3AB5E]/30" />
    </div>
  );
}

/** Exact prices from the catering brief — do not add or change. */
const ORDER_ITEMS: { name: string; price: string }[] = [
  { name: "Shish kebab", price: "$5 per piece" },
  { name: "Rice tray", price: "$40" },
  { name: "Hummus tray", price: "$40" },
  { name: "Baba ghanoush tray", price: "$40" },
  { name: "Tzatziki tray", price: "$40" },
  { name: "Salad tray", price: "$20" },
  { name: "Whole lamb add-on", price: "+$750" },
];

const STEPS: { title: string; body: string }[] = [
  {
    title: "Call or send a request",
    body: "Tell us your menu, headcount and date. Call or use the form below.",
  },
  {
    title: "Give us 24 hours",
    body: "At least 24 hours ahead so the kitchen can prep fresh.",
  },
  {
    title: "Pickup or delivery",
    body: "Pickup at Maza, or ask about delivery when you book.",
  },
  {
    title: "We confirm your total",
    body: "We confirm your total before the event.",
  },
];

export default function CateringPage() {
  return (
    <div className="min-h-[100dvh] bg-[#0A1F1E] text-[#F5F1E8] px-5 py-10">
      <div className="mx-auto w-full max-w-md">
        {/* Above the fold */}
        <header className="text-center mb-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/MAZA_logo_trans.webp"
            alt="Maza Mediterranean Cuisine"
            width={180}
            height={60}
            className="mx-auto w-40 h-auto mb-6"
          />
          <h1 className="font-display text-[38px] leading-none font-bold tracking-[1px] text-[#D3AB5E] mb-5">
            CATERING BY MAZA
          </h1>
          <div className="mx-auto mb-5 h-px w-24 bg-[#D3AB5E]/60" />
          <p className="text-[13px] tracking-[2px] text-[#F5F1E8]">
            OFFICES / PARTIES / WEDDINGS / SCHOOLS
          </p>
          <p className="mt-3 text-sm text-[#B8B8B8]">
            100% Halal - Fresh Mediterranean - Chandler, AZ
          </p>
        </header>

        {/* Click to call */}
        <div className="mb-10">
          <PhoneLink
            className="flex w-full items-center justify-center gap-3 rounded-full bg-[#D3AB5E] px-6 py-5 text-lg font-medium tracking-wide text-[#0A1F1E] shadow-lg transition-all hover:bg-[#C49A4D] active:scale-[0.985]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24 11.36 11.36 0 003.57.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.57 3.57 1 1 0 01-.25 1.02l-2.2 2.2z" />
            </svg>
            Call (480) 534-6550
          </PhoneLink>
        </div>

        {/* Build your order */}
        <section className="mb-10">
          <SectionHeading>BUILD YOUR ORDER</SectionHeading>
          <div className={CARD}>
            <ul>
              {ORDER_ITEMS.map((item) => (
                <li
                  key={item.name}
                  className="flex items-baseline justify-between gap-4 border-b border-[#D3AB5E]/15 py-3 last:border-b-0 last:pb-0 first:pt-0"
                >
                  <span className="text-[16px] leading-snug text-[#F5F1E8]">
                    {item.name}
                  </span>
                  <span className="shrink-0 text-[16px] font-medium text-[#D3AB5E]">
                    {item.price}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-5 border-l-2 border-[#D3AB5E] pl-3 text-sm text-[#E9C87B]">
              Trays are family meal size. Full trays, 100% halal.
            </p>
          </div>
        </section>

        {/* How it works */}
        <section className="mb-10">
          <SectionHeading>HOW IT WORKS</SectionHeading>
          <div className={CARD}>
            <ol className="space-y-4">
              {STEPS.map((step, index) => (
                <li key={step.title} className="flex items-start gap-4">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#D3AB5E] font-display text-sm text-[#D3AB5E]">
                    {index + 1}
                  </span>
                  <span>
                    <span className="block text-[16px] font-medium text-[#F5F1E8]">
                      {step.title}
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-[#B8B8B8]">
                      {step.body}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Request form */}
        <section className="mb-10">
          <SectionHeading>REQUEST YOUR CATERING</SectionHeading>
          <CateringRequestForm />
        </section>

        {/* Find us */}
        <section className="mb-10">
          <SectionHeading>FIND US</SectionHeading>
          <div className={CARD}>
            <p className="text-[16px] leading-relaxed text-[#F5F1E8]">
              3491 W Frye Rd, Suite 2
              <br />
              Chandler, AZ 85226
            </p>
            <PhoneLink className="mt-3 inline-block text-lg font-medium text-[#D3AB5E] hover:underline" />
            <a
              href={MAZA_GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-full border border-[#D3AB5E]/50 py-3 text-sm font-medium tracking-wide text-[#D3AB5E] transition-colors hover:bg-[#D3AB5E] hover:text-[#0A1F1E]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Get Directions
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
