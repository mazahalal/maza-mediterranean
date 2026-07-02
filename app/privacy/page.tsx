export const metadata = {
  title: "Privacy Policy | Maza Mediterranean Cuisine",
  description: "Privacy policy for Maza Mediterranean Cuisine — how we collect, use, and protect your personal information including mobile numbers.",
};

export default function PrivacyPage() {
  return (
    <div className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-gold-gradient mb-4 tracking-wider">
            Privacy Policy
          </h1>
          <p className="text-[#B8B8B8] text-lg">
            Last updated: July 1, 2026
          </p>
        </div>

        <div className="space-y-8">
          <div className="bg-[#0E0E0E] p-8 rounded-lg border border-[rgba(211,171,94,0.15)]">
            <h2 className="font-display text-2xl font-bold text-[#D3AB5E] mb-4 tracking-wide">
              Information We Collect
            </h2>
            <p className="text-[#F5F1E8] leading-relaxed mb-4">
              Maza Mediterranean Cuisine (&quot;Maza,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) collects information you voluntarily provide when interacting with our website, placing orders, or subscribing to our SMS messaging program. This may include:
            </p>
            <ul className="list-disc list-inside text-[#F5F1E8] leading-relaxed space-y-2 ml-4">
              <li>Your name and contact information (email address, phone number)</li>
              <li>Order history and dining preferences</li>
              <li>SMS opt-in status and consent records</li>
              <li>Messages you send to us via SMS or website forms</li>
            </ul>
          </div>

          <div className="bg-[#0E0E0E] p-8 rounded-lg border border-[rgba(211,171,94,0.15)]">
            <h2 className="font-display text-2xl font-bold text-[#D3AB5E] mb-4 tracking-wide">
              How We Use Your Information
            </h2>
            <p className="text-[#F5F1E8] leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside text-[#F5F1E8] leading-relaxed space-y-2 ml-4">
              <li>Send promotional offers, order confirmations, and customer engagement messages via SMS (for opted-in subscribers only)</li>
              <li>Process orders and provide customer support</li>
              <li>Improve our website and services</li>
              <li>Comply with legal obligations</li>
            </ul>
          </div>

          <div className="bg-[#0E0E0E] p-8 rounded-lg border border-[rgba(211,171,94,0.15)]">
            <h2 className="font-display text-2xl font-bold text-[#D3AB5E] mb-4 tracking-wide">
              Mobile Information &amp; SMS Privacy
            </h2>
            <p className="text-[#F5F1E8] leading-relaxed mb-4">
              <strong>No mobile information will be shared with third parties/affiliates for marketing/promotional purposes.</strong> All opt-in data and consent records are used exclusively by Maza Mediterranean Cuisine for our SMS messaging program. We do not sell, rent, or share your mobile phone number or SMS consent status with any third party for their marketing purposes.
            </p>
            <p className="text-[#F5F1E8] leading-relaxed">
              Message frequency: Up to 4 messages per month. Message and data rates may apply. Text HELP for help. Text STOP to unsubscribe at any time.
            </p>
          </div>

          <div className="bg-[#0E0E0E] p-8 rounded-lg border border-[rgba(211,171,94,0.15)]">
            <h2 className="font-display text-2xl font-bold text-[#D3AB5E] mb-4 tracking-wide">
              Data Security
            </h2>
            <p className="text-[#F5F1E8] leading-relaxed">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of electronic storage or transmission is 100% secure.
            </p>
          </div>

          <div className="bg-[#0E0E0E] p-8 rounded-lg border border-[rgba(211,171,94,0.15)]">
            <h2 className="font-display text-2xl font-bold text-[#D3AB5E] mb-4 tracking-wide">
              Your Rights &amp; Choices
            </h2>
            <p className="text-[#F5F1E8] leading-relaxed mb-4">
              You may opt out of SMS messages at any time by replying STOP to any message from us. After opting out, you will receive one final confirmation message and will no longer receive SMS messages from Maza unless you re-subscribe.
            </p>
            <p className="text-[#F5F1E8] leading-relaxed">
              For questions about this privacy policy or to request access to or deletion of your personal information, contact us at:
            </p>
            <p className="text-[#F5F1E8] leading-relaxed mt-2">
              Email: <a href="mailto:info@mazahalalfood.com" className="text-[#D3AB5E] hover:underline">info@mazahalalfood.com</a><br />
              Phone: <a href="tel:4805346550" className="text-[#D3AB5E] hover:underline">(480) 534-6550</a><br />
              Address: 3491 W Frye Rd, Suite 2, Chandler, AZ 85226
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
