// Public surface for programmatic use of the site config.
// Importers can use this from a script or a Nitro plugin without
// depending on the .ts content modules directly.
export { siteConfig } from "./site.config";
export {
  parseSiteConfig,
  siteConfigSchema,
  type SiteConfig,
  type Section,
  type Page,
  type Seo,
  type Branding,
  type Business,
  type Nav,
  type Footer,
  type Hero,
  type Services,
  type About,
  type Testimonials,
  type Pricing,
  type Faq,
  type CtaBand,
  type ContactBlock,
} from "./lib/site-config.schema";
