import type { Metadata } from "next";
import CareersClient from "./CareersClient";

export const metadata: Metadata = {
  title: "Careers | Now Hiring | Maza Mediterranean Cuisine",
  description:
    "Apply to work at Maza Mediterranean Cuisine in Chandler, AZ. Kitchen and front-of-house positions. Apply online or download a printable application.",
  alternates: { canonical: "https://mazahalalfood.com/careers" },
};

export default function CareersPage() {
  return <CareersClient />;
}
