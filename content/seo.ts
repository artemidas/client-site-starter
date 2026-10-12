import type { Seo } from "../lib/site-config.schema";

export const seo: Seo = {
  defaultTitle: "Northwind Studio",
  titleTemplate: "%s \u00b7 Northwind Studio",
  description:
    "Northwind Studio builds fast, accessible marketing sites for independent businesses. Static-first, config-driven, friendly to non-technical owners.",
  image: "/og-default.svg",
  twitterHandle: "@northwindstudio",
  locale: "en",
  themeColor: "oklch(58% 0.18 256)",
};
