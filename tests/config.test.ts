import { describe, it, expect } from "vitest";
import { siteConfigSchema, parseSiteConfig, type SiteConfig } from "../lib/site-config.schema";
import { branding } from "../content/branding";
import { business } from "../content/business";
import { nav, footer } from "../content/nav";
import { seo } from "../content/seo";
import { homeSections, contactSections } from "../content/home";
import { siteConfig } from "../site.config";

describe("site config", () => {
  it("parses the example site.config.ts without error", () => {
    const parsed = parseSiteConfig(siteConfig);
    expect(parsed.brand.name).toBe("Northwind Studio");
  });

  it("rejects an empty brand name", () => {
    const bad = { ...siteConfig, brand: { ...siteConfig.brand, name: "" } } as unknown as SiteConfig;
    const result = siteConfigSchema.safeParse(bad);
    expect(result.success).toBe(false);
  });

  it("has matching content layer fields", () => {
    expect(branding.colors.primary).toMatch(/oklch|rgb|hsl|#/);
    expect(business.email).toContain("@");
    expect(nav.primary.length).toBeGreaterThan(0);
    expect(footer.columns.length).toBeGreaterThan(0);
    expect(seo.defaultTitle.length).toBeGreaterThan(0);
    expect(homeSections.length).toBeGreaterThan(0);
    expect(contactSections.length).toBe(1);
  });
});
