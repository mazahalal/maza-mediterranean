import Link from "next/link";

export default function LogoLockup() {
  return (
    <Link href="/" className="logo-lockup">
      <span className="logo-wordmark">MAZA</span>
      <span className="logo-subtitle">Mediterranean Cuisine</span>
    </Link>
  );
}
