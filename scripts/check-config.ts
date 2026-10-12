import { siteConfig } from "../site.config";
import { parseSiteConfig } from "../lib/site-config.schema";

const result = parseSiteConfig(siteConfig);
if (!result) {
  console.error("site.config.ts failed validation");
  process.exit(1);
}

const errors: string[] = [];
if (!result.url.startsWith("http")) errors.push("site.url must be an absolute URL");
if (!result.business.email) errors.push("site.business.email is required");

if (errors.length) {
  console.error("site.config.ts has issues:\n" + errors.map((e) => "  - " + e).join("\n"));
  process.exit(1);
}

console.log(`OK: site.config.ts validates (${result.pages.home.sections.length} home sections, ${result.extraRoutes.length} extra routes)`);
