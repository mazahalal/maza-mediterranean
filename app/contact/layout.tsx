import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "https://mazahalalfood.com/contact" },
  title: "Contact Maza Mediterranean | Chandler AZ | Catering & Reservations",
  description: "Contact Maza Mediterranean Cuisine in Chandler, AZ. Catering inquiries, reservations, and questions. Call or visit us at 3491 W Frye Rd, Suite 2.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
