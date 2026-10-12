import { defineEventHandler, setResponseHeader } from "h3";
import { siteConfig } from "../../site.config";

export default defineEventHandler((event) => {
  setResponseHeader(event, "content-type", "text/plain; charset=utf-8");
  setResponseHeader(event, "cache-control", "public, max-age=86400");
  const base = siteConfig.url.replace(/\/$/, "");
  return `User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${base}/sitemap.xml
`;
});
