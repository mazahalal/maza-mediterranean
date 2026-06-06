import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#000000] border-t border-[rgba(212,175,55,0.3)]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col items-center gap-6 text-center">
          <Link href="/" className="logo-lockup">
            <span className="logo-wordmark">MAZA</span>
            <span className="logo-subtitle">Mediterranean Cuisine</span>
          </Link>
          <p className="text-sm text-[#a0a0a0] max-w-lg">
            Authentic Mediterranean cuisine. Family-owned. Wide menu for lunch and dinner.
          </p>
          <div className="text-sm text-[#a0a0a0]">
            <p>3491 W Frye Rd, Suite 2 · Chandler, AZ 85226</p>
            <p>(480) 534-6550</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
