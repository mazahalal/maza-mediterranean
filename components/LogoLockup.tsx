import Link from "next/link";

export default function LogoLockup() {
  return (
    <Link href="/" className="logo-lockup">
      <img
        src="/MAZA_logo_trans.webp"
        alt="MAZA Mediterranean Cuisine"
        className="logo-image"
        width={180}
        height={60}
      />
    </Link>
  );
}
