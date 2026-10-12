import { defineEventHandler, setResponseHeader } from "h3";
import { siteConfig } from "../../site.config";

function urlFor(path: string, base: string): string {
  if (path === "/") return `${base}/`;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export default defineEventHandler((event) => {
  setResponseHeader(event, "content-type", "application/xml; charset=utf-8");
  setResponseHeader(event, "cache-control", "public, max-age=3600");
  const base = siteConfig.url.replace(/\/$/, "");
  const today = new Date().toISOString().slice(0, 10);
  const staticPaths = new Set<string>();
  staticPaths.add("/");
  if (siteConfig.pages.contact) staticPaths.add("/contact");
  for (const link of siteConfig.footer.columns.flatMap((c) => c.links)) {
    if (!link.external && link.href.startsWith("/") && !link.href.includes("#")) {
      staticPaths.add(link.href);
    }
  }
  for (const link of siteConfig.footer.legalLinks) {
    if (!link.external && link.href.startsWith("/")) staticPaths.add(link.href);
  }
  for (const extra of siteConfig.extraRoutes ?? []) {
    staticPaths.add(`/${extra.slug.replace(/^\//, "")}`);
  }
  const urls = Array.from(staticPaths)
    .map((p) => `  <url><loc>${urlFor(p, base)}</loc><lastmod>${today}</lastmod></url>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
});
