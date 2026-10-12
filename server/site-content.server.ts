// Server-only re-export of site config. This module exists so server
// code (Nitro routes, plugins) can import site config without pulling
// the .ts content modules through the Vue/Nuxt client build pipeline.
import { siteConfig } from "../site.config";

export const business = siteConfig.business;
export const siteBrand = {
  name: siteConfig.brand.name,
  url: siteConfig.url,
};
