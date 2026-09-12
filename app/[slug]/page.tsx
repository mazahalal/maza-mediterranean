import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SeoLandingPage from "@/components/SeoLandingPage";
import {
  OFFERING_PAGES,
  type OfferingPage,
} from "@/data/offerings";
import {
  NEIGHBORHOOD_PAGES,
  type NeighborhoodPage,
} from "@/data/neighborhoods";
import {
  SITE,
  buildAreaService,
  buildBreadcrumb,
  buildFaqPage,
  buildMenuSection,
} from "@/lib/landing-schema";

/**
 * SEO Bible §3.1 Core 30 offering pages + §4 Phase 3 neighborhood pages.
 *
 * One dynamic segment renders both families from their data registries, so a
 * new offering or neighborhood is a data edit rather than a new folder.
 * `dynamicParams = false` keeps unknown slugs a hard 404 instead of a soft
 * render, and static routes (/menu, /about, ...) still take precedence.
 */

export const dynamicParams = false;

type Resolved = {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  h1: string;
  hook: string;
  intro: string;
  priceHeading: string;
  priceRows: { label: string; price: string; note?: string }[];
  faqs: { question: string; answer: string }[];
  image?: string;
  imageAlt?: string;
  breadcrumb: { name: string; href: string }[];
  related: { label: string; href: string }[];
  aside?: { heading: string; body: string };
  jsonLd: object;
};

function resolveOffering(page: OfferingPage): Resolved {
  const url = `${SITE}/${page.slug}`;
  const breadcrumb = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: page.h1, href: `/${page.slug}` },
  ];

  const related = [
    { label: `See ${page.menuLabel}`, href: page.menuPath },
    { label: "Full menu", href: "/menu" },
    { label: "Catering", href: "/catering" },
    { label: "Contact & directions", href: "/contact" },
  ].filter((link, index, all) => all.findIndex((l) => l.href === link.href) === index);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildBreadcrumb(breadcrumb.map((c) => ({ name: c.name, path: c.href }))),
      buildFaqPage(page.faqs),
      buildMenuSection(
        page.menuSection,
        page.priceRows,
        url,
        `${page.h1} — Maza Mediterranean Cuisine`,
      ),
    ],
  };

  return { ...page, breadcrumb, related, jsonLd };
}

function resolveNeighborhood(page: NeighborhoodPage): Resolved {
  const url = `${SITE}/${page.slug}`;
  const breadcrumb = [
    { name: "Home", href: "/" },
    { name: page.city, href: `/${page.slug}` },
  ];

  const related = [
    { label: "Full menu", href: "/menu" },
    { label: "Catering", href: "/catering" },
    { label: "Plaza Lunch Club", href: "/plaza-lunch" },
    { label: "Contact & directions", href: "/contact" },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildBreadcrumb(breadcrumb.map((c) => ({ name: c.name, path: c.href }))),
      buildFaqPage(page.faqs),
      buildAreaService(page.h1, page.city, url, page.description),
    ],
  };

  return {
    ...page,
    breadcrumb,
    related,
    aside: { heading: `Coming from ${page.city}`, body: page.directions },
    jsonLd,
  };
}

const offeringBySlug = new Map(OFFERING_PAGES.map((p) => [p.slug, p]));
const neighborhoodBySlug = new Map(NEIGHBORHOOD_PAGES.map((p) => [p.slug, p]));

function resolve(slug: string): Resolved | null {
  const offering = offeringBySlug.get(slug);
  if (offering) return resolveOffering(offering);
  const neighborhood = neighborhoodBySlug.get(slug);
  if (neighborhood) return resolveNeighborhood(neighborhood);
  return null;
}

export function generateStaticParams() {
  return [
    ...OFFERING_PAGES.map((p) => ({ slug: p.slug })),
    ...NEIGHBORHOOD_PAGES.map((p) => ({ slug: p.slug })),
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = resolve(slug);
  if (!page) return {};

  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords,
    alternates: { canonical: `${SITE}/${page.slug}` },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `${SITE}/${page.slug}`,
      siteName: "Maza Mediterranean Cuisine",
      ...(page.image ? { images: [{ url: page.image }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      ...(page.image ? { images: [page.image] } : {}),
    },
  };
}

export default async function LandingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = resolve(slug);
  if (!page) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(page.jsonLd) }}
      />
      <SeoLandingPage
        breadcrumb={page.breadcrumb}
        h1={page.h1}
        hook={page.hook}
        intro={page.intro}
        priceHeading={page.priceHeading}
        priceRows={page.priceRows}
        faqs={page.faqs}
        image={page.image}
        imageAlt={page.imageAlt}
        aside={page.aside}
        related={page.related}
      />
    </>
  );
}
