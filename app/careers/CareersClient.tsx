"use client";

import Link from "next/link";
import { useState } from "react";
import PhoneLink from "@/components/PhoneLink";

const POSITIONS = [
  "Front of House / Cashier",
  "Server / Host",
  "Kitchen / Prep",
  "Grill / Line Cook",
  "Dishwasher",
  "Shift Lead",
  "Other",
] as const;

const DAYS = ["Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

const inputClass =
  "w-full px-4 py-3 rounded-lg border border-[rgba(211,171,94,0.2)] focus:ring-2 focus:ring-[#D3AB5E] focus:border-[#D3AB5E] outline-none transition-all bg-[#0A1F1E] text-[#F5F1E8] placeholder-[#B8B8B8] disabled:opacity-50";

const labelClass = "block text-sm font-medium text-[#F5F1E8] mb-2";
const sectionClass =
  "bg-[#0E0E0E] p-6 md:p-8 rounded-lg border border-[rgba(211,171,94,0.15)] space-y-5";

export default function CareersClient() {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [positions, setPositions] = useState<string[]>([]);
  const [days, setDays] = useState<string[]>([]);

  function toggle(list: string[], value: string, setter: (next: string[]) => void) {
    setter(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState("submitting");
    setErrorMsg("");

    if (positions.length === 0) {
      setFormState("error");
      setErrorMsg("Select at least one position.");
      return;
    }

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: data.get("fullName"),
          phone: data.get("phone"),
          email: data.get("email"),
          address: data.get("address"),
          city: data.get("city"),
          state: data.get("state"),
          zip: data.get("zip"),
          positions,
          employmentType: data.get("employmentType"),
          availabilityDays: days,
          availabilityNotes: data.get("availabilityNotes"),
          startDate: data.get("startDate"),
          over18: data.get("over18"),
          workAuthorized: data.get("workAuthorized"),
          previouslyEmployed: data.get("previouslyEmployed"),
          heardAbout: data.get("heardAbout"),
          workHistory: data.get("workHistory"),
          education: data.get("education"),
          references: data.get("references"),
          whyMaza: data.get("whyMaza"),
          emergencyName: data.get("emergencyName"),
          emergencyPhone: data.get("emergencyPhone"),
          certification: data.get("certification") === "on",
        }),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error || "Failed to submit");
      }

      setFormState("success");
      form.reset();
      setPositions([]);
      setDays([]);
    } catch (err) {
      setFormState("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <div className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-[#D3AB5E] text-xs tracking-[0.35em] uppercase mb-3">Join the team</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-[#D3AB5E] mb-4 tracking-wider">
            Careers at MAZA
          </h1>
          <p className="text-[#B8B8B8] text-lg max-w-2xl mx-auto leading-relaxed">
            We&apos;re hiring friendly, reliable people for our Chandler kitchen and front of house.
            Apply online below, or print an application and bring it to the store.
          </p>
          <p className="mt-4 text-sm text-[#B8B8B8]">
            Questions? Call{" "}
            <PhoneLink className="text-[#D3AB5E] hover:text-[#F5F1E8] transition-colors">
              (480) 534-6550
            </PhoneLink>
            {" · "}
            <a
              href="/employment-application.pdf"
              className="text-[#D3AB5E] hover:text-[#F5F1E8] transition-colors underline underline-offset-2"
            >
              Download printable application (PDF)
            </a>
          </p>
        </div>

        {formState === "success" ? (
          <div className={`${sectionClass} text-center py-14`}>
            <div className="text-5xl mb-4 text-[#D3AB5E]">✓</div>
            <h2 className="font-display text-2xl font-bold text-[#D3AB5E] mb-2">Application submitted</h2>
            <p className="text-[#B8B8B8] max-w-md mx-auto">
              Thanks for applying. We&apos;ll review your application and reach out if there&apos;s a fit.
            </p>
            <button
              type="button"
              onClick={() => setFormState("idle")}
              className="mt-6 text-[#D3AB5E] underline hover:text-[#F5F1E8]"
            >
              Submit another application
            </button>
            <div className="mt-4">
              <Link href="/" className="text-sm text-[#B8B8B8] hover:text-[#D3AB5E]">
                ← Back to home
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <section className={sectionClass}>
              <h2 className="font-display text-xl font-bold text-[#D3AB5E] tracking-wide">
                Personal information
              </h2>
              <div>
                <label htmlFor="fullName" className={labelClass}>
                  Full legal name *
                </label>
                <input id="fullName" name="fullName" required disabled={formState === "submitting"} className={inputClass} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className={labelClass}>
                    Phone *
                  </label>
                  <input id="phone" name="phone" type="tel" required disabled={formState === "submitting"} className={inputClass} placeholder="(480) 555-1234" />
                </div>
                <div>
                  <label htmlFor="email" className={labelClass}>
                    Email *
                  </label>
                  <input id="email" name="email" type="email" required disabled={formState === "submitting"} className={inputClass} />
                </div>
              </div>
              <div>
                <label htmlFor="address" className={labelClass}>
                  Street address
                </label>
                <input id="address" name="address" disabled={formState === "submitting"} className={inputClass} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="city" className={labelClass}>
                    City
                  </label>
                  <input id="city" name="city" defaultValue="Chandler" disabled={formState === "submitting"} className={inputClass} />
                </div>
                <div>
                  <label htmlFor="state" className={labelClass}>
                    State
                  </label>
                  <input id="state" name="state" defaultValue="AZ" maxLength={2} disabled={formState === "submitting"} className={inputClass} />
                </div>
                <div>
                  <label htmlFor="zip" className={labelClass}>
                    ZIP
                  </label>
                  <input id="zip" name="zip" disabled={formState === "submitting"} className={inputClass} />
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className="font-display text-xl font-bold text-[#D3AB5E] tracking-wide">
                Position & schedule
              </h2>
              <div>
                <p className={labelClass}>Position(s) applying for *</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {POSITIONS.map((p) => (
                    <label key={p} className="flex items-center gap-2 text-sm text-[#F5F1E8] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={positions.includes(p)}
                        onChange={() => toggle(positions, p, setPositions)}
                        disabled={formState === "submitting"}
                        className="accent-[#D3AB5E]"
                      />
                      {p}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label htmlFor="employmentType" className={labelClass}>
                  Employment type *
                </label>
                <select id="employmentType" name="employmentType" required disabled={formState === "submitting"} className={inputClass} defaultValue="">
                  <option value="" disabled>
                    Select…
                  </option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Either">Either full-time or part-time</option>
                </select>
              </div>
              <div>
                <p className={labelClass}>Days available (Tue–Sun · closed Mondays)</p>
                <div className="flex flex-wrap gap-3">
                  {DAYS.map((d) => (
                    <label key={d} className="flex items-center gap-2 text-sm text-[#F5F1E8] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={days.includes(d)}
                        onChange={() => toggle(days, d, setDays)}
                        disabled={formState === "submitting"}
                        className="accent-[#D3AB5E]"
                      />
                      {d}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label htmlFor="availabilityNotes" className={labelClass}>
                  Preferred hours / schedule notes
                </label>
                <input
                  id="availabilityNotes"
                  name="availabilityNotes"
                  disabled={formState === "submitting"}
                  className={inputClass}
                  placeholder="e.g. mornings, evenings after 4pm, weekends only"
                />
              </div>
              <div>
                <label htmlFor="startDate" className={labelClass}>
                  Earliest start date
                </label>
                <input id="startDate" name="startDate" type="date" disabled={formState === "submitting"} className={inputClass} />
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className="font-display text-xl font-bold text-[#D3AB5E] tracking-wide">
                Eligibility
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="over18" className={labelClass}>
                    18 or older? *
                  </label>
                  <select id="over18" name="over18" required disabled={formState === "submitting"} className={inputClass} defaultValue="">
                    <option value="" disabled>
                      Select…
                    </option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="workAuthorized" className={labelClass}>
                    Authorized to work in the U.S.? *
                  </label>
                  <select id="workAuthorized" name="workAuthorized" required disabled={formState === "submitting"} className={inputClass} defaultValue="">
                    <option value="" disabled>
                      Select…
                    </option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="previouslyEmployed" className={labelClass}>
                    Worked at MAZA before?
                  </label>
                  <select id="previouslyEmployed" name="previouslyEmployed" disabled={formState === "submitting"} className={inputClass} defaultValue="No">
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="heardAbout" className={labelClass}>
                  How did you hear about this job?
                </label>
                <input id="heardAbout" name="heardAbout" disabled={formState === "submitting"} className={inputClass} placeholder="Window sign, friend, Google, walk-in…" />
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className="font-display text-xl font-bold text-[#D3AB5E] tracking-wide">
                Experience
              </h2>
              <div>
                <label htmlFor="workHistory" className={labelClass}>
                  Work history (most recent first)
                </label>
                <textarea
                  id="workHistory"
                  name="workHistory"
                  rows={5}
                  disabled={formState === "submitting"}
                  className={`${inputClass} resize-y min-h-[120px]`}
                  placeholder={"Employer · role · dates · reason for leaving\nExample: Al-Amir · prep cook · 2024–2025 · relocated"}
                />
              </div>
              <div>
                <label htmlFor="education" className={labelClass}>
                  Education
                </label>
                <textarea
                  id="education"
                  name="education"
                  rows={2}
                  disabled={formState === "submitting"}
                  className={`${inputClass} resize-y`}
                  placeholder="School, highest level completed, certifications"
                />
              </div>
              <div>
                <label htmlFor="references" className={labelClass}>
                  References (name, relationship, phone)
                </label>
                <textarea
                  id="references"
                  name="references"
                  rows={3}
                  disabled={formState === "submitting"}
                  className={`${inputClass} resize-y`}
                />
              </div>
              <div>
                <label htmlFor="whyMaza" className={labelClass}>
                  Why do you want to work at MAZA?
                </label>
                <textarea
                  id="whyMaza"
                  name="whyMaza"
                  rows={3}
                  disabled={formState === "submitting"}
                  className={`${inputClass} resize-y`}
                />
              </div>
            </section>

            <section className={sectionClass}>
              <h2 className="font-display text-xl font-bold text-[#D3AB5E] tracking-wide">
                Emergency contact
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="emergencyName" className={labelClass}>
                    Name
                  </label>
                  <input id="emergencyName" name="emergencyName" disabled={formState === "submitting"} className={inputClass} />
                </div>
                <div>
                  <label htmlFor="emergencyPhone" className={labelClass}>
                    Phone
                  </label>
                  <input id="emergencyPhone" name="emergencyPhone" type="tel" disabled={formState === "submitting"} className={inputClass} />
                </div>
              </div>
            </section>

            <section className={sectionClass}>
              <label className="flex items-start gap-3 text-sm text-[#F5F1E8] cursor-pointer">
                <input
                  type="checkbox"
                  name="certification"
                  required
                  disabled={formState === "submitting"}
                  className="mt-1 accent-[#D3AB5E]"
                />
                <span>
                  I certify that the information in this application is true and complete to the best of
                  my knowledge. I understand that false information may be grounds for not hiring me or
                  for dismissal. *
                </span>
              </label>

              {formState === "error" && (
                <p className="text-red-400 text-sm">{errorMsg || "Failed to submit. Please try again."}</p>
              )}

              <button
                type="submit"
                disabled={formState === "submitting"}
                className="w-full bg-[#D3AB5E] hover:bg-[#A87C3D] disabled:bg-[#D3AB5E]/50 disabled:text-[#0A1F1E] text-[#0A1F1E] font-semibold py-4 rounded-lg transition-colors duration-200"
              >
                {formState === "submitting" ? "Submitting…" : "Submit application"}
              </button>
              <p className="text-xs text-[#B8B8B8] text-center">
                Equal opportunity employer. We hire based on ability and fit for the role.
              </p>
            </section>
          </form>
        )}
      </div>
    </div>
  );
}
