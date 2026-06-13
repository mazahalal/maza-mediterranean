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
  description: "Big portions. Real ingredients. Honest prices. Family-owned Mediterranean restaurant in Chandler, AZ. Open daily 10am–8pm (Fri & Sat until 10pm).",
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
              openingHours: "Mo-Th,Su 10:00-20:00 Fr,Sa 10:00-22:00",
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Sunday"],
                  opens: "10:00",
                  closes: "20:00",
                },
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Friday", "Saturday"],
                  opens: "10:00",
                  closes: "22:00",
                },
              ],
              url: "https://mazahalalfood.com",
              image: "https://mazahalalfood.com/maza_ornate_logo.webp",
              priceRange: "$$",
              servesCuisine: ["Mediterranean", "Middle Eastern", "Halal"],
              hasMenu: "https://mazahalalfood.com/menu",
              sameAs: [
                "https://www.google.com/maps/place/?q=place_id:11571299155872425967",
              ],
              areaServed: {
                "@type": "GeoCircle",
                geoMidpoint: {
                  "@type": "GeoCoordinates",
                  latitude: 33.3062,
                  longitude: -111.8413,
                },
                geoRadius: "25000",
              },
              knowsAbout: [
                "Mediterranean cuisine",
                "Halal-certified meals",
                "Family-style platters",
                "Catering for events",
                "East Valley dining",
              ],
              description:
                "Big portions. Real ingredients. Honest prices. Family-owned Mediterranean restaurant in Chandler, AZ. Open daily 10am–8pm (Fri & Sat until 10pm).",
            }),
          }}
        />

        {/* MAZ-34 Data Hook — Dataset for agent/LLM extraction (Authenticity Update) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Dataset",
              name: "Maza Mediterranean Cuisine Menu & Service Data",
              description: "Real menu items, pricing, and local service facts for Chandler, AZ Mediterranean restaurant. 20+ authentic wraps, plates, and platters. Halal-certified. Open daily 10am–8pm (Fri & Sat until 10pm).",
              url: "https://mazahalalfood.com/menu",
              variableMeasured: ["Menu Items", "Pricing", "Service Area"],
              citation: "https://mazahalalfood.com",
              isAccessibleForFree: true,
              creator: {
                "@type": "Restaurant",
                name: "Maza Mediterranean Cuisine"
              }
            }),
          }}
        />
      </body>
    </html>
  );
}
        {/* MAZ-33: FAQPage schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "What are your hours?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "We are open daily 10am–8pm (Fri & Sat until 10pm)."
                  }
                },
                {
                  "@type": "Question",
                  name: "Is Maza Mediterranean Cuisine halal?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, all our meat is halal-certified."
                  }
                },
                {
                  "@type": "Question",
                  name: "Do you offer catering?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, we provide catering for events and large orders. Contact us for details."
                  }
                },
                {
                  "@type": "Question",
                  name: "Is there parking available?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Free parking is available in the plaza lot at 3491 W Frye Rd."
                  }
                }
              ]
            })
          }}
        />
