import type { Metadata } from "next";
import { Cinzel, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Maza Mediterranean Cuisine | Chandler, AZ",
  description: "Big portions. Real ingredients. Honest prices. Family-owned Mediterranean restaurant in Chandler, AZ. Open daily 10am–8pm.",
  icons: {
    icon: "/maza_ornate_logo.webp",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cinzel.variable} ${montserrat.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#0A1F1E] text-[#F5F1E8]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              name: "Maza Mediterranean Cuisine",
              address: {
                "@type": "PostalAddress",
                streetAddress: "3491 W Frye Rd, Suite 2",
                addressLocality: "Chandler",
                addressRegion: "AZ",
                postalCode: "85226",
                addressCountry: "US",
              },
              telephone: "(480) 534-6550",
              openingHours: "Mo-Su 10:00-20:00",
              url: "https://mazahalalfood.com",
              sameAs: [
                `https://www.google.com/maps/place/?q=place_id:11571299155872425967`,
              ],
              description:
                "Big portions. Real ingredients. Honest prices. Family-owned Mediterranean restaurant in Chandler, AZ.",
            }),
          }}
        />
      </body>
    </html>
  );
}
