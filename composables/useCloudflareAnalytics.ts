import { useHead } from "#imports";
import { useRuntimeConfig } from "#imports";

export function useCloudflareAnalytics() {
  const cfg = useRuntimeConfig();
  const token = cfg.public.cfWebAnalyticsToken as string;
  if (!token) return;
  useHead({
    script: [
      {
        defer: true,
        src: "https://static.cloudflareinsights.com/beacon.min.js",
        "data-cf-beacon": JSON.stringify({ token }),
      },
    ],
  });
}
