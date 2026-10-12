import { useHead } from "#imports";
import { siteConfig } from "../site.config";

export function useLocalBusinessSchema() {
  const base = siteConfig.url.replace(/\/$/, "");
  const b = siteConfig.business;
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.brand.name,
    legalName: b.legalName,
    description: b.description,
    url: base,
    email: b.email,
    telephone: b.phone,
    image: `${base}${siteConfig.seo.image ?? "/og-default.svg"}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: b.address.street,
      addressLocality: b.address.city,
      addressRegion: b.address.region,
      postalCode: b.address.postalCode,
      addressCountry: b.address.country,
    },
    priceRange: b.priceRange,
    areaServed: b.serviceArea,
    openingHoursSpecification: b.hours
      .filter((h) => h.opens && h.closes)
      .map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: h.days,
        opens: h.opens,
        closes: h.closes,
      })),
    sameAs: b.socials.map((s) => s.href),
  };
  useHead({
    script: [
      {
        type: "application/ld+json",
        innerHTML: JSON.stringify(data),
      },
    ],
  });
}
