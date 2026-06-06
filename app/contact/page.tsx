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
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#8B4513] mb-4">
            Contact Us
          </h1>
          <p className="text-[#2C1810] text-lg max-w-2xl mx-auto">
            We&apos;d love to hear from you. Reach out with questions, reservations, or just to say hello.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info Column */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h2 className="font-serif text-2xl font-bold text-[#8B4513] mb-6">Visit Us</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-[#2C1810] mb-1">Address</h3>
                  <p className="text-[#2C1810]/70">3491 W Frye Rd, Ste 2<br />Chandler, AZ 85226</p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#2C1810] mb-1">Phone</h3>
                  <p className="text-[#2C1810]/70">(480) 534-6550</p>
                </div>
                <div>
                  <h3 className="font-semibold text-[#2C1810] mb-1">Hours</h3>
                  <p className="text-[#2C1810]/70">Open Daily: 10am – 6pm</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Column */}
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h2 className="font-serif text-2xl font-bold text-[#8B4513] mb-6">Send Us a Message</h2>

            {formState === 'success' ? (
              <div className="text-center py-12">
                <div className="text-5xl mb-4">✓</div>
                <h3 className="font-serif text-2xl font-bold text-[#8B4513] mb-2">Message Sent!</h3>
                <p className="text-[#2C1810]/70">We&apos;ll get back to you soon.</p>
                <button
                  onClick={() => setFormState('idle')}
                  className="mt-6 text-[#8B4513] underline hover:text-[#6B3410]"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#2C1810] mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    disabled={formState === 'submitting'}
                    className="w-full px-4 py-3 rounded-lg border border-[#D4A017]/30 focus:ring-2 focus:ring-[#D4A017] focus:border-transparent outline-none transition-all bg-[#FDF5E6] disabled:opacity-50"
                    placeholder="Maria Kefi"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#2C1810] mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    disabled={formState === 'submitting'}
                    className="w-full px-4 py-3 rounded-lg border border-[#D4A017]/30 focus:ring-2 focus:ring-[#D4A017] focus:border-transparent outline-none transition-all bg-[#FDF5E6] disabled:opacity-50"
                    placeholder="maria@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#2C1810] mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    disabled={formState === 'submitting'}
                    className="w-full px-4 py-3 rounded-lg border border-[#D4A017]/30 focus:ring-2 focus:ring-[#D4A017] focus:border-transparent outline-none transition-all bg-[#FDF5E6] resize-none disabled:opacity-50"
                    placeholder="How can we help you today?"
                  />
                </div>

                {formState === 'error' && (
                  <p className="text-red-600 text-sm">{errorMsg || 'Failed to send. Please try again.'}</p>
                )}

                <button
                  type="submit"
                  disabled={formState === 'submitting'}
                  className="w-full bg-[#8B4513] hover:bg-[#6B3410] disabled:bg-[#8B4513]/50 text-white font-semibold py-4 rounded-lg transition-colors duration-200"
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