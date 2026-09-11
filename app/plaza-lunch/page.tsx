import type { Metadata } from "next";
import Link from "next/link";
import PhoneLink from "@/components/PhoneLink";
import MapEmbed from "@/components/MapEmbed";
import { MAZA_GOOGLE_MAPS_URL, MAZA_APPLE_MAPS_URL } from "@/lib/maza-maps";
import { menuData } from "@/data/menu";
import WrapGallery from "./WrapGallery";

/**
 * Plaza Lunch Club — /plaza-lunch
 *
 * QR destination for the Plaza Lunch Club (tower door flyer + membership card).
 * The visitor is standing in an office lobby, so the offer and the walk have to
 * land in under 10 seconds: one narrow column, one action, no forms.
 */

export const metadata: Metadata = {
  alternates: { canonical: "https://mazahalalfood.com/plaza-lunch" },
  title: "Plaza Lunch Club — Any Wrap $10 | Maza Mediterranean Cuisine",
  description:
    "Plaza Lunch Club: any wrap, burger or sandwich on the menu is $10 for plaza and nearby employees. No app, no signup. Maza is one block from your building in Chandler, AZ.",
  icons: {
    icon: "/maza_ornate_logo.webp",
  },
};

const STEPS = [
  "Walk over to MAZA — one block from your building",
  "Ask for the Plaza Lunch Club at the register",
  "Any wrap, burger or sandwich on the menu is $10",
  "No app, no signup, no office forms needed",
];

/** The 11 wraps that qualify. Source of truth: menu.json (Wraps category). */
const WRAPS = [
  "Beef Gyro",
  "Beef + Lamb Shish Kebab Wrap",
  "Chicken Shish Kebab Wrap",
  "Chicken Tikka Wrap",
  "Crispy Chicken Wrap",
  "Falafel Wrap",
  "Lamb Tikka Wrap",
  "Arayes Lahm or Dajaj",
  "Ribeye Tikka Wrap",
  "Shredded Chicken Wrap",
  "Shredded Steak Wrap",
];

/**
 * Wrap photography for the gallery — only the wraps that actually have a photo
 * in data/menu.ts (kept in sync with menu.json / the menu pages). Wraps without
 * a shot are simply absent rather than shown with a stand-in.
 */
const WRAP_GALLERY: { name: string; image: string }[] = (
  menuData.find((category) => category.category === "Wraps")?.items ?? []
).flatMap((item) =>
  item.image ? [{ name: item.name, image: item.image }] : [],
);

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

const CARD = "bg-[#0E0E0E] border border-[#D3AB5E]/30 rounded-lg p-6";

export default function PlazaLunchPage() {
  return (
    <div className="min-h-[100dvh] bg-[#0A1F1E] text-[#F5F1E8] px-5 py-10">
      <div className="mx-auto w-full max-w-md">
        {/* ── Above the fold — text only; the site header already carries the logo ── */}
        <header className="text-center mb-8">
          <h1 className="font-display text-2xl tracking-[4px] text-[#D3AB5E] mb-5">
            PLAZA LUNCH CLUB
          </h1>
          <p className="font-display text-[clamp(30px,10vw,54px)] leading-none font-bold tracking-[1px] text-[#D3AB5E] mb-5">
            ANY WRAP $10
          </p>
          <div className="mx-auto mb-5 h-px w-24 bg-[#D3AB5E]/60" />
          <p className="text-xs tracking-[3px] text-[#F5F1E8]/85">
            FOR PLAZA &amp; NEARBY EMPLOYEES
          </p>
        </header>

        {/* ── Wrap gallery — sits directly under the hero text ────────── */}
        <section className="mb-12">
          <WrapGallery wraps={WRAP_GALLERY} />
        </section>

        {/* ── How it works ───────────────────────────────────────────── */}
        <section className="mb-10">
          <SectionHeading>HOW IT WORKS</SectionHeading>
          <div className={CARD}>
            <ol className="space-y-3">
              {STEPS.map((step, i) => (
                <li key={step} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#D3AB5E]/50 text-[11px] font-semibold text-[#D3AB5E]">
                    {i + 1}
                  </span>
                  <span className="text-[15px] leading-snug text-[#F5F1E8]">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
            <p className="mt-5 border-l-2 border-[#D3AB5E] pl-3 text-sm text-[#E9C87B]">
              No card yet? Just ask for the Plaza Lunch Club.
            </p>
          </div>
        </section>

        {/* ── Who qualifies ──────────────────────────────────────────── */}
        <section className="mb-10">
          <SectionHeading>WHO QUALIFIES</SectionHeading>
          <div className={CARD}>
            <p className="text-[15px] leading-relaxed text-[#F5F1E8]">
              Managers and employees who work in the plaza or at nearby
              businesses.
            </p>
            <p className="mt-3 text-sm text-[#B8B8B8]">
              One $10 wrap per person, per visit.
            </p>
          </div>
        </section>

        {/* ── The wraps ──────────────────────────────────────────────── */}
        <section className="mb-10">
          <SectionHeading>THE WRAPS</SectionHeading>
          <div className={CARD}>
            <ul>
              {WRAPS.map((wrap) => (
                <li
                  key={wrap}
                  className="flex items-center gap-3 border-b border-[#D3AB5E]/15 py-2.5 last:border-b-0 last:pb-0 first:pt-0"
                >
                  <span className="text-[#D3AB5E]">▪</span>
                  <span className="text-[15px] text-[#F5F1E8]">{wrap}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 border-l-2 border-[#D3AB5E] pl-3 text-sm text-[#E9C87B]">
              Burgers and sandwiches are in the deal too.
            </p>
          </div>
        </section>

        {/* ── Exclusions ─────────────────────────────────────────────── */}
        <section className="mb-10">
          <h2 className="font-display text-[11px] tracking-[3px] text-[#D3AB5E]/70 mb-2">
            EXCLUSIONS
          </h2>
          <p className="text-xs leading-relaxed text-[#B8B8B8]/75">
            Plates and sides are not included. Dine-in or to-go. Not valid with
            other offers.
          </p>
        </section>

        {/* ── Find us ────────────────────────────────────────────────── */}
        <section className="mb-10">
          <SectionHeading>FIND US</SectionHeading>
          <div className={CARD}>
            <p className="text-[15px] leading-relaxed text-[#F5F1E8]">
              3491 W Frye Rd, Suite 2<br />
              Chandler, AZ 85226
            </p>
            <PhoneLink className="mt-3 inline-block text-lg font-medium text-[#D3AB5E] hover:underline" />
            <p className="mt-3 text-sm text-[#B8B8B8]">
              Open Tuesday–Sunday 10am–10pm. Closed Mondays.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <a
                href={MAZA_GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-full border border-[#D3AB5E]/50 py-3 text-sm font-medium tracking-wide text-[#D3AB5E] transition-colors hover:bg-[#D3AB5E] hover:text-[#0A1F1E]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 shrink-0"
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
                Google Maps
              </a>
              <a
                href={MAZA_APPLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-full border border-[#D3AB5E]/50 py-3 text-sm font-medium tracking-wide text-[#D3AB5E] transition-colors hover:bg-[#D3AB5E] hover:text-[#0A1F1E]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 shrink-0"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                Apple Maps
              </a>
            </div>
            <MapEmbed className="mt-4" />
          </div>
        </section>

        {/* ── Joins ──────────────────────────────────────────────────── */}
        <section className="mb-4">
          <SectionHeading>MORE OFFERS</SectionHeading>
          <Link href="/sms-join" className="block mb-4">
            <div className="flex w-full items-center justify-center rounded-full bg-[#D3AB5E] px-6 py-5 text-lg font-medium tracking-wide text-[#0A1F1E] shadow-lg transition-all hover:bg-[#C49A4D] active:scale-[0.985]">
              Text JOIN for more offers
            </div>
          </Link>
          <Link
            href="/menu"
            className="flex w-full items-center justify-center gap-2 rounded-full border border-[#D3AB5E]/50 py-4 text-base font-medium tracking-wide text-[#D3AB5E] transition-colors hover:bg-[#D3AB5E] hover:text-[#0A1F1E]"
          >
            See the Full Menu
          </Link>
        </section>
      </div>
    </div>
  );
}
