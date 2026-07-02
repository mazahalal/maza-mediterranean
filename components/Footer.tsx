import Link from "next/link";
import LogoLockup from "./LogoLockup";
import PhoneLink from "./PhoneLink";

export default function Footer() {
  return (
    <footer className="bg-[#0A1F1E] border-t border-[rgba(211,171,94,0.2)]">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="flex flex-col items-center gap-6 text-center">
          <LogoLockup />

          <p className="text-[#B8B8B8] max-w-md">
            Big portions. Real ingredients. Honest prices.
          </p>

          <div className="text-sm text-[#B8B8B8] space-y-1">
            <p>3491 W Frye Rd, Suite 2 · Chandler, AZ 85226</p>
            <PhoneLink className="hover:text-[#D3AB5E] transition-colors">(480) 534-6550</PhoneLink>
            <p>Mon Closed · Tue–Wed 10am–8pm • Thu–Sun 10am–10pm</p>
            <p className="pt-2">
              <a
                href="https://online.skytab.com/s/maza"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#D3AB5E] hover:text-[#F5F1E8] transition-colors font-medium"
              >
                Order Online →
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
