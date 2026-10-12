import { defineNuxtConfig } from "nuxt/config";
import { fileURLToPath } from "node:url";
import { siteConfig } from "./site.config";

export default defineNuxtConfig({
  compatibilityDate: "2025-01-01",
  ssr: true,
  devtools: { enabled: false },
  telemetry: false,
  typescript: {
    strict: true,
    typeCheck: false,
  },
  css: ["~/assets/css/main.css"],
  components: [
    { path: "~/components", pathPrefix: false },
  ],
  postcss: {
    plugins: {
      "@tailwindcss/postcss": {},
    },
  },
  alias: {
    "@content": fileURLToPath(new URL("./content", import.meta.url)),
    "@lib": fileURLToPath(new URL("./lib", import.meta.url)),
  },
  runtimeConfig: {
    resendApiKey: "",
    contactTo: "",
    contactFrom: "",
    rateLimitPerHour: 5,
    public: {
      siteUrl: siteConfig.url,
      brandName: siteConfig.brand.name,
      cfWebAnalyticsToken: "",
    },
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ["/", "/contact", "/privacy", "/terms", "/changelog", "/sitemap.xml", "/robots.txt"],
      failOnError: false,
      ignore: ["/og-default.svg"],
    },
    compressPublicAssets: true,
  },
  app: {
    head: {
      htmlAttrs: { lang: "en" },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      link: [
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      ],
    },
  },
  experimental: {
    payloadExtraction: true,
  },
});
