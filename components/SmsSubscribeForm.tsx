'use client';

import { useState } from 'react';

/**
 * SMS Subscribe Form
 * Master Plan: Horizon 1 — collect phone numbers with zero friction.
 * Offer incentive (15% off next visit) for opt-in.
 */

export default function SmsSubscribeForm({ source = 'web' }: { source?: string }) {
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!phone.trim()) return;

    setStatus('loading');
    setMessage('');

    try {
      const res = await fetch('/api/sms/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, source }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setMessage(data.message || 'You are subscribed!');
        setPhone('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong.');
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again or text JOIN to our number.');
    }
  }

  function formatPhoneInput(value: string) {
    // Auto-format: (480) 555-1234
    const digits = value.replace(/\D/g, '').slice(0, 10);
    if (digits.length === 0) return '';
    if (digits.length <= 3) return `(${digits}`;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Honeypot for bots */}
        <input
          type="text"
          name="company"
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        <div>
          <label htmlFor="sms-phone" className="block text-sm font-medium text-[#F5F1E8] mb-2">
            Get 15% off your next visit
          </label>
          <div className="flex gap-2">
            <input
              id="sms-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(formatPhoneInput(e.target.value))}
              placeholder="(480) 555-1234"
              className="flex-1 px-4 py-3 rounded bg-[#0A1F1E] border border-[#D3AB5E]/40 text-[#F5F1E8] placeholder:text-[#B8B8B8]/50 focus:border-[#D3AB5E] focus:outline-none focus:ring-1 focus:ring-[#D3AB5E] transition-colors"
              disabled={status === 'loading'}
              required
            />
            <button
              type="submit"
              disabled={status === 'loading' || phone.replace(/\D/g, '').length < 10}
              className="px-6 py-3 rounded bg-[#D3AB5E] text-[#0A1F1E] font-semibold hover:bg-[#C49A4D] disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
            >
              {status === 'loading' ? '...' : 'Join List'}
            </button>
          </div>
        </div>

        {status === 'success' && (
          <p className="text-sm text-green-400 font-medium">{message}</p>
        )}
        {status === 'error' && (
          <p className="text-sm text-red-400 font-medium">{message}</p>
        )}

        <p className="text-xs text-[#B8B8B8]/70">
          By subscribing, you agree to receive SMS messages from MAZA Mediterranean.
          Message and data rates may apply. Reply STOP to unsubscribe. Reply HELP for help.
        </p>
      </form>
    </div>
  );
}