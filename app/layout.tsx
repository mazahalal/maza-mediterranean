import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Maza Mediterranean Cuisine | Chandler, AZ",
  description: "Authentic Mediterranean cuisine in Chandler, Arizona. Fresh ingredients, traditional recipes, family atmosphere. Open daily 10am–6pm.",
  keywords: ["Mediterranean restaurant Chandler AZ", "Mediterranean food Chandler", "Halal food Chandler AZ", "Maza Mediterranean Cuisine"],
  openGraph: {
    title: "Maza Mediterranean Cuisine | Chandler, AZ",
    description: "Authentic Mediterranean cuisine in Chandler, Arizona. Open daily 10am–6pm.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Maza Mediterranean Cuisine",
    "image": "",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "3491 W Frye Rd, Ste 2",
      "addressLocality": "Chandler",
      "addressRegion": "AZ",
      "postalCode": "85226",
      "addressCountry": "US",
    },
    "telephone": "+1-480-534-6550",
    "servesCuisine": "Mediterranean",
    "priceRange": "$$",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "10:00",
      "closes": "18:00",
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "33.3098",
      "longitude": "-111.8954",
    },
    "url": "https://mazahalalfood.com",
  };

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-full flex flex-col antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}