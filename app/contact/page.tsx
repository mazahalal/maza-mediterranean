export const metadata = {
  title: "Contact | Maza Halal Food",
  description: "Get in touch with Maza Halal Food — find our location, hours, phone number, and send us a message.",
};

export default function ContactPage() {
  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#8B4513] mb-4">
            Contact Us
          </h1>
          <p className="text-[#2C1810] text-lg max-w-2xl mx-auto">
            We'd love to hear from you. Reach out with questions, reservations, or just to say hello.
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

          {/* Contact Form Column */}
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h2 className="font-serif text-2xl font-bold text-[#8B4513] mb-6">Send Us a Message</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#2C1810] mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-[#D4A017]/30 focus:ring-2 focus:ring-[#D4A017] focus:border-transparent outline-none transition-all bg-[#FDF5E6]"
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
                  className="w-full px-4 py-3 rounded-lg border border-[#D4A017]/30 focus:ring-2 focus:ring-[#D4A017] focus:border-transparent outline-none transition-all bg-[#FDF5E6]"
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
                  className="w-full px-4 py-3 rounded-lg border border-[#D4A017]/30 focus:ring-2 focus:ring-[#D4A017] focus:border-transparent outline-none transition-all bg-[#FDF5E6] resize-none"
                  placeholder="How can we help you today?"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#8B4513] hover:bg-[#6B3410] text-white font-semibold py-4 rounded-lg transition-colors duration-200"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}