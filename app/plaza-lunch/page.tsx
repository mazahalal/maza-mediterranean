import type { Metadata } from "next";
import Link from "next/link";
import PhoneLink from "@/components/PhoneLink";
import { MAZA_GOOGLE_MAPS_URL } from "@/lib/maza-maps";

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
        {/* ── Above the fold ─────────────────────────────────────────── */}
        <header className="text-center mb-12">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/MAZA_logo_trans.webp"
            alt="Maza Mediterranean Cuisine"
            width={180}
            height={60}
            className="mx-auto w-40 h-auto mb-6"
          />
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

        {/* ── Joins ──────────────────────────────────────────────────── */}
        <section className="mb-4">
          <SectionHeading>MORE OFFERS</SectionHeading>
          <Link href="/sms-join" className="block mb-4">
            <div className="flex w-full items-center justify-center rounded-full bg-[#D3AB5E] px-6 py-5 text-lg font-medium tracking-wide text-[#0A1F1E] shadow-lg transition-all hover:bg-[#C49A4D] active:scale-[0.985]">
              Text JOIN for more offers
            </div>
          </Link>
          <p className="text-center text-sm text-[#B8B8B8]">
            <Link href="/menu" className="text-[#D3AB5E] hover:underline">
              See the full menu →
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}
