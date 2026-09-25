import type { Metadata } from "next";
import Script from "next/script";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingOrderButton from "@/components/FloatingOrderButton";
import { MAZA_GEO } from "@/lib/maza-maps";
import { MAZA_SAME_AS } from "@/lib/maza-profiles";
import {
  MAZA_RATING_VALUE,
  MAZA_REVIEW_COUNT,
  MAZA_RATING_BEST,
  MAZA_RATING_WORST,
} from "@/lib/maza-rating";

/**
 * Self-hosted (next/font/local) — avoids next/font/google + Turbopack flakes on Vercel
 * ("next/font/google queries have exactly one entry" / missing @vercel/turbopack-next font).
 * Files are latin variable woff2 pulled from fonts.gstatic (Cinzel / Montserrat).
 */
const cinzel = localFont({
  src: "./fonts/cinzel.woff2",
  weight: "500 700",
  variable: "--font-cinzel",
  display: "swap",
});

const montserrat = localFont({
  src: "./fonts/montserrat.woff2",
  weight: "300 600",
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mazahalalfood.com"),
  title: "Maza Mediterranean Cuisine | Chandler, AZ",
  description: "Big portions. Real ingredients. Honest prices. Family-owned Mediterranean restaurant in Chandler, AZ. Open Tuesday–Sunday 10am–10pm. Closed Mondays.",
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
        <FloatingOrderButton />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              // Stable entity id — page-level JSON-LD (offering + neighborhood
              // landing pages) references this node instead of re-declaring it.
              "@id": "https://mazahalalfood.com/#restaurant",
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
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: [
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                  ],
                  opens: "10:00",
                  closes: "22:00",
                },
              ],
              url: "https://mazahalalfood.com",
              image: "https://mazahalalfood.com/maza_ornate_logo.webp",
              priceRange: "$$",
              servesCuisine: ["Mediterranean", "Middle Eastern", "Halal"],
              hasMenu: "https://mazahalalfood.com/menu",
              sameAs: MAZA_SAME_AS,
              // MAZ-113: reads the same constants as the visible rating in the
              // footer (components/GoogleRating.tsx) so the two cannot drift.
              // Refresh instructions live at lib/maza-rating.ts.
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: MAZA_RATING_VALUE,
                reviewCount: MAZA_REVIEW_COUNT,
                bestRating: MAZA_RATING_BEST,
                worstRating: MAZA_RATING_WORST,
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: MAZA_GEO.latitude,
                longitude: MAZA_GEO.longitude,
              },
              areaServed: {
                "@type": "GeoCircle",
                geoMidpoint: {
                  "@type": "GeoCoordinates",
                  latitude: MAZA_GEO.latitude,
                  longitude: MAZA_GEO.longitude,
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
                "Big portions. Real ingredients. Honest prices. Family-owned Mediterranean restaurant in Chandler, AZ. Open Tuesday–Sunday 10am–10pm. Closed Mondays.",
              potentialAction: {
                "@type": "ReserveAction",
                "target": "https://mazahalalfood.com/contact",
                "name": "Make a reservation or catering inquiry"
              }
            }),
          }}
        />

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
                    text: "We are open Tuesday through Sunday 10am–10pm. Closed Mondays."
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

        {/* Google Analytics 4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
          `}
        </Script>

        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${process.env.NEXT_PUBLIC_META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_META_PIXEL_ID}&ev=PageView&noscript=1`}
          />
        </noscript>
      </body>
    </html>
  );
}
