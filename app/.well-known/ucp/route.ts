import { NextResponse } from 'next/server';

export async function GET() {
  const ucpManifest = {
    "@context": "https://schema.org",
    "@type": "WebAPI",
    name: "Maza Mediterranean Cuisine UCP Endpoint",
    description: "Universal Commerce Protocol discovery manifest for agentic access to menu, hours, and local service capabilities.",
    url: "https://mazahalalfood.com/.well-known/ucp",
    provider: {
      "@type": "Restaurant",
      name: "Maza Mediterranean Cuisine",
      address: {
        "@type": "PostalAddress",
        streetAddress: "3491 W Frye Rd, Suite 2",
        addressLocality: "Chandler",
        addressRegion: "AZ",
        postalCode: "85226",
        addressCountry: "US"
      }
    },
    capabilities: [
      "MenuDiscovery",
      "LocalBusinessInfo",
      "HoursVerification",
      "CateringInquiry"
    ],
    supportedProtocols: ["UCP/1.0", "AP2"],
    lastUpdated: new Date().toISOString(),
    menuEndpoint: "https://mazahalalfood.com/menu",
    contactEndpoint: "https://mazahalalfood.com/contact"
  };

  return NextResponse.json(ucpManifest, {
    headers: {
      'Content-Type': 'application/ld+json',
      'Cache-Control': 'public, max-age=3600'
    }
  });
}
