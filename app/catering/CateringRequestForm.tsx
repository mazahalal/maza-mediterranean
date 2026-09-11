"use client";

import { useState } from "react";
import { trackContact } from "@/lib/meta-pixel";

const FIELD =
  "w-full px-4 py-3 rounded-lg border border-[rgba(211,171,94,0.2)] focus:ring-2 focus:ring-[#D3AB5E] focus:border-[#D3AB5E] outline-none transition-all bg-[#0A1F1E] text-[#F5F1E8] placeholder-[#B8B8B8] resize-none disabled:opacity-50";

const LABEL = "block text-sm font-medium text-[#F5F1E8] mb-2";

export default function CateringRequestForm() {
  const [formState, setFormState] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/catering", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          organization: data.get("organization"),
          email: data.get("email"),
          phone: data.get("phone"),
          eventDate: data.get("eventDate"),
          headcount: data.get("headcount"),
          items: data.get("items"),
          fulfillment: data.get("fulfillment"),
          notes: data.get("notes"),
        }),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error || "Failed to send request");
      }

      setFormState("success");
      trackContact();
      form.reset();
    } catch (err) {
      setFormState("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Something went wrong"
      );
    }
  }

  if (formState === "success") {
    return (
      <div className="bg-[#0E0E0E] rounded-lg border border-[rgba(211,171,94,0.15)] p-8 text-center">
        <div className="text-5xl mb-4 text-[#D3AB5E]">✓</div>
        <h3 className="font-display text-2xl font-bold text-[#D3AB5E] mb-2">
          Request Received
        </h3>
        <p className="text-[#F5F1E8] text-[15px] leading-relaxed">
          Thank you — the kitchen has your request. We&apos;ll call or email to
          confirm your menu, headcount and total. Please give us at least 24
          hours before your event.
        </p>
        <p className="mt-4 text-sm text-[#B8B8B8]">
          Need it sooner? Call{" "}
          <a
            href="tel:4805346550"
            className="text-[#D3AB5E] hover:underline"
          >
            (480) 534-6550
          </a>
          .
        </p>
        <button
          onClick={() => setFormState("idle")}
          className="mt-6 text-[#D3AB5E] underline hover:text-[#F5F1E8]"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#0E0E0E] rounded-lg border border-[rgba(211,171,94,0.15)] p-6 space-y-5"
    >
      <div>
        <label htmlFor="name" className={LABEL}>
          Your name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          disabled={formState === "submitting"}
          className={FIELD}
          placeholder="Maria Kefi"
        />
      </div>

      <div>
        <label htmlFor="organization" className={LABEL}>
          Business or organization{" "}
          <span className="font-normal text-[#B8B8B8]">(optional)</span>
        </label>
        <input
          type="text"
          id="organization"
          name="organization"
          disabled={formState === "submitting"}
          className={FIELD}
          placeholder="Chandler Unified School District"
        />
      </div>

      <div>
        <label htmlFor="email" className={LABEL}>
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          disabled={formState === "submitting"}
          className={FIELD}
          placeholder="maria@example.com"
        />
      </div>

      <div>
        <label htmlFor="phone" className={LABEL}>
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          disabled={formState === "submitting"}
          className={FIELD}
          placeholder="(480) 555-0142"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="eventDate" className={LABEL}>
            Event date
          </label>
          <input
            type="date"
            id="eventDate"
            name="eventDate"
            required
            disabled={formState === "submitting"}
            className={`${FIELD} [color-scheme:dark]`}
          />
        </div>

        <div>
          <label htmlFor="headcount" className={LABEL}>
            Headcount
          </label>
          <input
            type="number"
            id="headcount"
            name="headcount"
            min={1}
            required
            disabled={formState === "submitting"}
            className={FIELD}
            placeholder="40"
          />
        </div>
      </div>

      <div>
        <label htmlFor="items" className={LABEL}>
          Which items and quantities
        </label>
        <textarea
          id="items"
          name="items"
          rows={4}
          required
          disabled={formState === "submitting"}
          className={FIELD}
          placeholder="2 rice trays, 1 hummus tray, 60 shish kebab"
        />
      </div>

      <fieldset disabled={formState === "submitting"}>
        <legend className={LABEL}>Delivery or pickup</legend>
        <div className="flex flex-wrap gap-3">
          {["Pickup", "Delivery"].map((option, index) => (
            <label
              key={option}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-[rgba(211,171,94,0.25)] bg-[#0A1F1E] px-4 py-3 text-[15px] text-[#F5F1E8] transition-colors has-[:checked]:border-[#D3AB5E] has-[:checked]:bg-[#D3AB5E] has-[:checked]:text-[#0A1F1E] cursor-pointer"
            >
              <input
                type="radio"
                name="fulfillment"
                value={option}
                defaultChecked={index === 0}
                className="accent-[#0A1F1E]"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="notes" className={LABEL}>
          Notes <span className="font-normal text-[#B8B8B8]">(optional)</span>
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          disabled={formState === "submitting"}
          className={FIELD}
          placeholder="Vegetarian options, allergy info, timing, delivery address"
        />
      </div>

      {formState === "error" && (
        <p className="text-red-400 text-sm">
          {errorMsg || "Failed to send. Please try again."}
        </p>
      )}

      <button
        type="submit"
        disabled={formState === "submitting"}
        className="w-full bg-[#D3AB5E] hover:bg-[#A87C3D] disabled:bg-[#D3AB5E]/50 disabled:text-[#0A1F1E] text-[#0A1F1E] font-semibold py-4 rounded-lg transition-colors duration-200"
      >
        {formState === "submitting" ? "Sending..." : "Send Catering Request"}
      </button>

      <p className="text-center text-xs text-[#B8B8B8]">
        We confirm your total before the event.
      </p>
    </form>
  );
}
