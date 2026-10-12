import { defineEventHandler, setResponseHeader, getRequestURL } from "h3";
import { siteConfig } from "../../site.config";

export default defineEventHandler((event) => {
  setResponseHeader(event, "content-type", "text/plain; charset=utf-8");
  setResponseHeader(event, "cache-control", "public, max-age=86400");
  const url = getRequestURL(event);
  const isProd = url.hostname === siteConfig.url.replace(/^https?:\/\//, "").split("/")[0];
  if (!isProd) return "ok";
  return "ok";
});
