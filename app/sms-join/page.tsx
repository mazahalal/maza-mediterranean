/**
 * SMS Join Page — /sms-join
 *
 * Master Plan: QR code at register that opens text app with "JOIN" pre-typed.
 * This page IS the QR code target — it shows instructions + a form fallback.
 *
 * The actual QR code (print version) points to: sms:+1XXXXXXXXXX?body=JOIN
 * Customers scan with their phone camera → SMS app opens → they send "JOIN"
 * → Twilio hits /api/twilio/inbound → subscriber recorded.
 *
 * This page serves as:
 *  1. The destination if someone types mazahalalfood.com/sms-join
 *  2. A web form fallback for customers who prefer not to text
 *  3. A printable QR code generator for Frank/cashier
 */

import { Fragment } from 'react';
import SmsSubscribeForm from '@/components/SmsSubscribeForm';

export const metadata = {
  alternates: { canonical: "https://mazahalalfood.com/sms-join" },
  title: 'Join Our SMS List | Maza Mediterranean Cuisine | 15% Off',
  description:
    'Join the Maza Mediterranean SMS list and get 15% off your next visit. Exclusive deals, specials, and updates. Text JOIN or sign up online.',
};

// NOTE: Phone number is intentionally read from env so Twilio purchase
// later doesn't require code changes. For now (pre-purchase), we show
// the form-only UI. When TWILIO_PHONE_NUMBER env is set, the QR code
// + SMS link become active.
export default function SmsJoinPage() {
  const twilioPhone = process.env.TWILIO_PHONE_NUMBER || '';
  const hasTwilioNumber = !!twilioPhone;

  // Generate the sms: deep link that the QR code encodes
  const smsLink = twilioPhone ? `sms:${twilioPhone}?&body=JOIN` : '';
  // QR code via free API (generated on client side)
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(smsLink || 'https://mazahalalfood.com/sms-join')}`;

  return (
    <div className="min-h-[80vh] bg-[#0A1F1E] py-16 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="font-display text-5xl tracking-[0.2em] text-[#D3AB5E] mb-4">
            15% OFF
          </div>
          <h1 className="text-3xl md:text-4xl font-display text-[#F5F1E8] mb-4">
            Join Our SMS List
          </h1>
          <p className="text-lg text-[#B8B8B8] mb-2">
            Get exclusive deals, weekly specials, and updates.
          </p>
          <p className="text-sm text-[#D3AB5E]">
            🧆 Show your confirmation text at checkout for 15% off your next visit.
          </p>
        </div>

        {/* Method 1: QR Code (primary — from master plan) */}
        {hasTwilioNumber && (
          <div className="bg-[#0A1F1E] border border-[#D3AB5E]/30 rounded-lg p-8 mb-8 text-center">
            <h2 className="text-xl font-display text-[#F5F1E8] mb-4">Scan to Join</h2>
            <div className="inline-block bg-white p-4 rounded-lg mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={qrUrl}
                alt="QR code to join Maza SMS list"
                width={250}
                height={250}
                className="rounded"
              />
            </div>
            <p className="text-sm text-[#B8B8B8] mb-2">
              Point your camera at the QR code
            </p>
            <p className="text-xs text-[#B8B8B8]/70">
              Your messaging app will open with "JOIN" pre-typed. Just hit send!
            </p>
          </div>
        )}

        {/* Method 2: Text JOIN manually */}
        {hasTwilioNumber && (
          <div className="bg-[#0A1F1E] border border-[#D3AB5E]/30 rounded-lg p-8 mb-8 text-center">
            <h2 className="text-xl font-display text-[#F5F1E8] mb-4">Or Text Us</h2>
            <p className="text-lg text-[#B8B8B8] mb-4">
              Send the word <span className="text-[#D3AB5E] font-bold">JOIN</span> to
            </p>
            <p className="text-3xl font-display text-[#D3AB5E] mb-4">
              {twilioPhone}
            </p>
            <a
              href={`sms:${twilioPhone}?&body=JOIN`}
              className="inline-block bg-[#D3AB5E] text-[#0A1F1E] font-semibold px-8 py-3 rounded hover:bg-[#C49A4D] transition-colors"
            >
              Open Messages App
            </a>
          </div>
        )}

        {/* Method 3: Web form fallback */}
        <div className="bg-[#0A1F1E] border border-[#D3AB5E]/30 rounded-lg p-8 mb-8">
          <h2 className="text-xl font-display text-[#F5F1E8] mb-4 text-center">
            {hasTwilioNumber ? 'Or Sign Up Online' : 'Sign Up Below'}
          </h2>
          <SmsSubscribeForm source="web" />
        </div>

        {/* Compliance footer */}
        <div className="text-center text-xs text-[#B8B8B8]/60 space-y-2">
          <p>
            By joining, you agree to receive SMS messages from Maza Mediterranean.
            Message and data rates may apply. Up to 8 messages per month.
          </p>
          <p>
            Reply STOP to unsubscribe · Reply HELP for help · Contact: 480-534-6550
          </p>
        </div>

        {/* Printable QR section for Frank/cashier — separated for printing */}
        {hasTwilioNumber && (
          <Fragment>
            <div className="mt-16 pt-8 border-t border-[#D3AB5E]/20 text-center">
              <h3 className="text-sm font-medium text-[#D3AB5E] mb-4">
                🖨️ Print this for the register:
              </h3>
              <div className="inline-block bg-white p-6 rounded-lg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={qrUrl}
                  alt="Printable QR code"
                  width={350}
                  height={350}
                  className="rounded"
                />
                <p className="text-black text-lg font-bold mt-2">
                  🧆 Get 15% Off — Scan & Text JOIN
                </p>
                <p className="text-black text-sm mt-1">Maza Mediterranean Cuisine</p>
              </div>
            </div>
          </Fragment>
        )}

        {/* Pre-purchase notice (visible only when TWILIO_PHONE_NUMBER not set) */}
        {!hasTwilioNumber && (
          <div className="mt-8 p-4 rounded-lg bg-[#0A1F1E] border border-[D3AB5E]/20 text-center">
            <p className="text-sm text-[#B8B8B8]/60">
              SMS opt-in via text is coming soon. For now, sign up using the form above —
              we&apos;ll text you when our SMS line is active.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}