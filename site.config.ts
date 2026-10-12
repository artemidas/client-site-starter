import type { SiteConfig } from "./lib/site-config.schema";
import { branding } from "./content/branding";
import { business } from "./content/business";
import { nav, footer } from "./content/nav";
import { seo } from "./content/seo";
import { homeSections, contactSections } from "./content/home";

const baseUrl = process.env.NUXT_PUBLIC_SITE_URL ?? "https://northwindstudio.example";

export const siteConfig: SiteConfig = {
  brand: {
    name: "Northwind Studio",
    tagline: "Marketing sites for independent businesses.",
  },
  url: baseUrl,
  seo,
  branding,
  business,
  nav,
  footer,
  pages: {
    home: {
      title: "Marketing sites that load instantly",
      description:
        "Static-first marketing sites with a real contact form, config-driven branding, and Lighthouse 95+.",
      sections: homeSections,
    },
    contact: {
      title: "Contact",
      description: "Tell us about your project. We reply within two business days.",
      sections: contactSections,
    },
  },
  extraRoutes: [],
};
