export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-[#F5E6C8] mt-auto border-t border-[#2A2A2A]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 
              className="font-serif text-xl font-bold mb-2"
              style={{ background: 'linear-gradient(135deg, #F5E6C8 0%, #D4AF37 40%, #8B6914 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
            >
              MAZA
            </h3>
            <p className="text-[#8A8A8A] text-sm tracking-[0.2em] uppercase mb-4">Mediterranean Cuisine</p>
            <p className="text-[#F5E6C8] leading-relaxed text-sm">
              Authentic Mediterranean flavors crafted with tradition and passion in the heart of Chandler, Arizona.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-[#D4AF37] mb-4">Hours</h4>
            <div className="text-[#8A8A8A] space-y-1 text-sm">
              <p>Open Daily: 10am – 6pm</p>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-[#D4AF37] mb-4">Location</h4>
            <div className="text-[#8A8A8A] space-y-1 text-sm">
              <p>3491 W Frye Rd, Ste 2</p>
              <p>Chandler, AZ 85226</p>
              <p className="mt-2 text-[#F5E6C8]">(480) 534-6550</p>
            </div>
          </div>
        </div>
        <div className="border-t border-[#2A2A2A] mt-8 pt-8 text-center text-sm text-[#8A8A8A]">
          <p>© {new Date().getFullYear()} Maza Mediterranean Cuisine. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}