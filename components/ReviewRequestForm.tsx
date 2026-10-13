'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Register-tablet review-request form.
 *
 * Cashier-facing, not customer-facing: the cashier types the number the
 * customer hands over, ticks the consent line, and taps Send. Nothing is sent
 * unless the consent box is ticked.
 *
 * Deliberately chunky — it is used standing up, on a tablet, in a hurry.
 */

type Outcome = 'sent' | 'disabled' | 'already_requested' | 'suppressed_opted_out';

interface ApiResponse {
  success?: boolean;
  sent?: boolean;
  outcome?: Outcome;
  message?: string;
  error?: string;
}

const OUTCOME_STYLES: Record<string, string> = {
  sent: 'border-green-500/60 text-green-300',
  disabled: 'border-[#D3AB5E]/60 text-[#D3AB5E]',
  already_requested: 'border-[#B8B8B8]/50 text-[#B8B8B8]',
  suppressed_opted_out: 'border-red-500/60 text-red-300',
};

export default function ReviewRequestForm({ source = 'register' }: { source?: string }) {
  const [phone, setPhone] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [outcome, setOutcome] = useState<Outcome | null>(null);
  const [message, setMessage] = useState('');
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    };
  }, []);

  function reset() {
    if (resetTimer.current) clearTimeout(resetTimer.current);
    setPhone('');
    setConsent(false);
    setStatus('idle');
    setOutcome(null);
    setMessage('');
  }

  function formatPhoneInput(value: string) {
    const digits = value.replace(/\D/g, '').slice(0, 10);
    if (digits.length === 0) return '';
    if (digits.length <= 3) return `(${digits}`;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!phone.trim()) return;
    if (!consent) {
      setStatus('error');
      setMessage('Confirm the customer agreed before sending.');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const res = await fetch('/api/review-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, consent, source }),
      });
      const data: ApiResponse = await res.json();

      if (!res.ok) {
        setStatus('error');
        setMessage(data.error || 'Something went wrong.');
        return;
      }

      setStatus('done');
      setOutcome(data.outcome ?? null);
      setMessage(data.message || 'Handled.');

      // Give the cashier time to read the result, then clear for the next guest.
      resetTimer.current = setTimeout(reset, 7000);
    } catch {
      setStatus('error');
      setMessage('Network error. Try again, or use the menu QR code instead.');
    }
  }

  const digits = phone.replace(/\D/g, '');
  const canSubmit = digits.length === 10 && consent && status !== 'loading';

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto">
      {/* Honeypot — bots fill hidden fields */}
      <input
        type="text"
        name="company"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <label htmlFor="review-phone" className="block text-base font-medium text-[#F5F1E8] mb-3">
        Customer mobile number
      </label>
      <input
        id="review-phone"
        type="tel"
        inputMode="tel"
        autoComplete="off"
        value={phone}
        onChange={(e) => setPhone(formatPhoneInput(e.target.value))}
        placeholder="(480) 555-1234"
        className="w-full px-5 py-5 text-2xl tracking-wide rounded-lg bg-[#0A1F1E] border-2 border-[#D3AB5E]/40 text-[#F5F1E8] placeholder:text-[#B8B8B8]/40 focus:border-[#D3AB5E] focus:outline-none transition-colors"
        disabled={status === 'loading'}
      />

      <label className="mt-6 flex gap-4 items-start cursor-pointer text-left">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 h-7 w-7 shrink-0 accent-[#D3AB5E]"
          disabled={status === 'loading'}
        />
        <span className="text-sm text-[#B8B8B8] leading-relaxed">
          <strong className="text-[#F5F1E8]">
            The customer agreed to one text message from Maza
          </strong>{' '}
          with a link to leave a Google review. One message, sent now. Msg &amp; data rates may
          apply. Reply STOP to opt out. Reply HELP for help. Consent is not required to dine or
          purchase. Read the{' '}
          <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-[#D3AB5E] underline">
            Privacy Policy
          </a>{' '}
          and{' '}
          <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-[#D3AB5E] underline">
            Terms
          </a>
          .
        </span>
      </label>

      <button
        type="submit"
        disabled={!canSubmit}
        className="mt-7 w-full px-8 py-6 text-xl font-semibold rounded-lg bg-[#D3AB5E] text-[#0A1F1E] hover:bg-[#C49A4D] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        {status === 'loading' ? 'Sending…' : 'Send review request'}
      </button>

      {status === 'done' && (
        <div
          className={`mt-6 rounded-lg border px-5 py-4 text-base ${
            OUTCOME_STYLES[outcome ?? ''] ?? 'border-[#B8B8B8]/50 text-[#B8B8B8]'
          }`}
        >
          <p className="font-semibold">{outcome === 'sent' ? '✓ ' : '! '}{message}</p>
          <button
            type="button"
            onClick={reset}
            className="mt-3 w-full rounded-lg border border-[#B8B8B8]/40 px-5 py-3 text-sm font-semibold text-[#B8B8B8] hover:border-[#D3AB5E] hover:text-[#D3AB5E] transition-colors"
          >
            Next customer
          </button>
        </div>
      )}

      {status === 'error' && (
        <p className="mt-6 rounded-lg border border-red-500/60 px-5 py-4 text-base text-red-300">
          {message}
        </p>
      )}
    </form>
  );
}
