import { useHead, useRuntimeConfig } from "#imports";
import type { Seo } from "../lib/site-config.schema";

type UseSeoInput = {
  title?: string;
  description?: string;
  image?: string;
  path?: string;
  type?: "website" | "article";
};

function formatTitle(title: string | undefined, seo: Seo, brandName: string): string {
  if (!title) return seo.defaultTitle;
  if (title === brandName) return title;
  const template = seo.titleTemplate || "%s · %s";
  return template.replace(/%s/g, (match, idx) => {
    return idx === 0 ? title : brandName;
  });
}

export function useSeo(input: UseSeoInput) {
  const cfg = useRuntimeConfig();
  const baseUrl = (cfg.public.siteUrl as string).replace(/\/$/, "");
  const { site } = useSiteConfig();
  const seo = site.seo;
  const brand = site.brand.name;
  const title = formatTitle(input.title, seo, brand);
  const description = input.description ?? seo.description;
  const imagePath = input.image ?? seo.image ?? "/og-default.svg";
  const imageUrl = imagePath.startsWith("http") ? imagePath : `${baseUrl}${imagePath}`;
  const url = `${baseUrl}${input.path ?? "/"}`;

  useHead({
    title,
    meta: [
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: input.type ?? "website" },
      { property: "og:url", content: url },
      { property: "og:image", content: imageUrl },
      { property: "og:site_name", content: brand },
      { property: "og:locale", content: seo.locale },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: imageUrl },
      ...(seo.twitterHandle ? [{ name: "twitter:site", content: seo.twitterHandle }] : []),
      ...(seo.themeColor ? [{ name: "theme-color", content: seo.themeColor }] : []),
    ],
    link: [{ rel: "canonical", href: url }],
  });
}
