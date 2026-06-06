'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState('submitting');
    setErrorMsg('');

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          message: data.get('message'),
        }),
      });

      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error || 'Failed to send');
      }

      setFormState('success');
      form.reset();
    } catch (err) {
      setFormState('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong');
    }
  }

  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 
            className="font-serif text-4xl md:text-5xl font-bold mb-4"
            style={{ background: 'linear-gradient(135deg, #F5E6C8 0%, #D4AF37 40%, #8B6914 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
          >
            Contact Us
          </h1>
          <p className="text-[#8A8A8A] text-lg max-w-2xl mx-auto">
            We&apos;d love to hear from you. Reach out with questions, reservations, or just to say hello.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info Column */}
          <div className="space-y-8">
            <div className="bg-[#141414] p-8 rounded-xl border border-[#2A2A2A]">
              <h2 className="font-serif text-2xl font-bold text-[#D4AF37] mb-6">Visit Us</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-[#F5E6C8] mb-1">Address</h3>
                  <p className="text-[#8A8A8A]">3491 W Frye Rd, Ste 2<br />Chandler, AZ 85226</p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#F5E6C8] mb-1">Phone</h3>
                  <p className="text-[#8A8A8A]">(480) 534-6550</p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#F5E6C8] mb-1">Hours</h3>
                  <p className="text-[#8A8A8A]">Open Daily: 10am – 6pm</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Column */}
          <div className="bg-[#141414] p-8 rounded-xl border border-[#2A2A2A]">
            <h2 className="font-serif text-2xl font-bold text-[#D4AF37] mb-6">Send Us a Message</h2>

            {formState === 'success' ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4 text-[#D4AF37]">✓</div>
                <h3 className="font-serif text-2xl font-bold text-[#D4AF37] mb-2">Message Sent!</h3>
                <p className="text-[#8A8A8A]">We&apos;ll get back to you soon.</p>
                <button
                  onClick={() => setFormState('idle')}
                  className="mt-6 text-[#D4AF37] underline hover:text-[#F5E6C8]"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#F5E6C8] mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    disabled={formState === 'submitting'}
                    className="w-full px-4 py-3 rounded-lg border border-[#2A2A2A] focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none transition-all bg-[#0A0A0A] text-[#F5E6C8] placeholder-[#8A8A8A] disabled:opacity-50"
                    placeholder="Maria Kefi"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#F5E6C8] mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    disabled={formState === 'submitting'}
                    className="w-full px-4 py-3 rounded-lg border border-[#2A2A2A] focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none transition-all bg-[#0A0A0A] text-[#F5E6C8] placeholder-[#8A8A8A] disabled:opacity-50"
                    placeholder="maria@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#F5E6C8] mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    disabled={formState === 'submitting'}
                    className="w-full px-4 py-3 rounded-lg border border-[#2A2A2A] focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none transition-all bg-[#0A0A0A] text-[#F5E6C8] placeholder-[#8A8A8A] resize-none disabled:opacity-50"
                    placeholder="How can we help you today?"
                  />
                </div>

                {formState === 'error' && (
                  <p className="text-red-400 text-sm">{errorMsg || 'Failed to send. Please try again.'}</p>
                )}

                <button
                  type="submit"
                  disabled={formState === 'submitting'}
                  className="w-full bg-[#D4AF37] hover:bg-[#F5E6C8] disabled:bg-[#D4AF37]/50 disabled:text-[#0A0A0A] text-[#0A0A0A] font-semibold py-4 rounded-lg transition-colors duration-200"
                >
                  {formState === 'submitting' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}