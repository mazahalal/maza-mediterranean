export const metadata = {
  title: "Terms & Conditions | Maza Mediterranean Cuisine",
  description: "Terms and conditions for Maza Mediterranean Cuisine SMS messaging program and website usage.",
};

export default function TermsPage() {
  return (
    <div className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-gold-gradient mb-4 tracking-wider">
            Terms &amp; Conditions
          </h1>
          <p className="text-[#B8B8B8] text-lg">
            Last updated: July 1, 2026
          </p>
        </div>

        <div className="space-y-8">
          <div className="bg-[#0E0E0E] p-8 rounded-lg border border-[rgba(211,171,94,0.15)]">
            <h2 className="font-display text-2xl font-bold text-[#D3AB5E] mb-4 tracking-wide">
              Maza SMS Messaging Program
            </h2>
            <p className="text-[#F5F1E8] leading-relaxed mb-4">
              By subscribing to the Maza Mediterranean Cuisine (&quot;Maza,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) SMS messaging program, you agree to receive recurring automated marketing and informational text messages from Maza at the phone number you provided.
            </p>

            <h3 className="font-display text-xl font-bold text-[#D3AB5E] mt-6 mb-3 tracking-wide">
              Message Frequency
            </h3>
            <p className="text-[#F5F1E8] leading-relaxed mb-4">
              Up to 4 messages per month. Message frequency may vary based on promotions, seasonal offers, and order-related communications.
            </p>

            <h3 className="font-display text-xl font-bold text-[#D3AB5E] mt-6 mb-3 tracking-wide">
              Message &amp; Data Rates
            </h3>
            <p className="text-[#F5F1E8] leading-relaxed mb-4">
              Message and data rates may apply. Check with your mobile carrier for details on your plan. You are responsible for any charges from your mobile carrier.
            </p>

            <h3 className="font-display text-xl font-bold text-[#D3AB5E] mt-6 mb-3 tracking-wide">
              How to Opt Out
            </h3>
            <p className="text-[#F5F1E8] leading-relaxed mb-4">
              <strong>To opt out, text STOP to any message from Maza.</strong> You will receive a confirmation text confirming your unsubscribe request. After unsubscribing, you will no longer receive SMS messages from Maza unless you re-subscribe.
            </p>
            <p className="text-[#F5F1E8] leading-relaxed">
              To re-subscribe, text MAZA to (928) XXX-5742 or submit your phone number via our website at mazahalalfood.com.
            </p>

            <h3 className="font-display text-xl font-bold text-[#D3AB5E] mt-6 mb-3 tracking-wide">
              How to Get Help
            </h3>
            <p className="text-[#F5F1E8] leading-relaxed mb-4">
              <strong>For help, text HELP to any message from Maza</strong> or contact our customer support team:
            </p>
            <ul className="list-disc list-inside text-[#F5F1E8] leading-relaxed space-y-1 ml-4">
              <li>Phone: (480) 534-6550</li>
              <li>Email: info@mazahalalfood.com</li>
              <li>Address: 3491 W Frye Rd, Suite 2, Chandler, AZ 85226</li>
            </ul>
          </div>

          <div className="bg-[#0E0E0E] p-8 rounded-lg border border-[rgba(211,171,94,0.15)]">
            <h2 className="font-display text-2xl font-bold text-[#D3AB5E] mb-4 tracking-wide">
              Eligibility &amp; Consent
            </h2>
            <p className="text-[#F5F1E8] leading-relaxed mb-4">
              You must be at least 18 years old and the authorized user of the mobile phone number you provide. By subscribing, you confirm that you are the account holder or have the account holder&apos;s permission to enroll.
            </p>
            <p className="text-[#F5F1E8] leading-relaxed">
              Consent is not a condition of purchase. You may decline SMS messaging and still place orders and dine at Maza Mediterranean Cuisine.
            </p>
          </div>

          <div className="bg-[#0E0E0E] p-8 rounded-lg border border-[rgba(211,171,94,0.15)]">
            <h2 className="font-display text-2xl font-bold text-[#D3AB5E] mb-4 tracking-wide">
              Supported Carriers
            </h2>
            <p className="text-[#F5F1E8] leading-relaxed mb-4">
              Our SMS program is available on most major US carriers, including AT&amp;T, T-Mobile, Verizon, Sprint, Boost, MetroPCS, and others. <strong>Carriers are not liable for any delayed or undelivered messages.</strong>
            </p>
          </div>

          <div className="bg-[#0E0E0E] p-8 rounded-lg border border-[rgba(211,171,94,0.15)]">
            <h2 className="font-display text-2xl font-bold text-[#D3AB5E] mb-4 tracking-wide">
              Privacy
            </h2>
            <p className="text-[#F5F1E8] leading-relaxed">
              Your privacy is important to us. Please review our{" "}
              <a href="/privacy" className="text-[#D3AB5E] hover:underline">
                Privacy Policy
              </a>{" "}
              for details on how we collect, use, and protect your personal information, including mobile phone numbers.
            </p>
          </div>

          <div className="bg-[#0E0E0E] p-8 rounded-lg border border-[rgba(211,171,94,0.15)]">
            <h2 className="font-display text-2xl font-bold text-[#D3AB5E] mb-4 tracking-wide">
              Changes to These Terms
            </h2>
            <p className="text-[#F5F1E8] leading-relaxed">
              We reserve the right to update these terms at any time. Changes will be posted on this page with an updated date. Continued use of the SMS program after changes constitutes acceptance of the new terms.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
