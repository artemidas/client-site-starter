import type { Branding } from "../lib/site-config.schema";

export const branding: Branding = {
  colors: {
    primary: "oklch(58% 0.18 256)",
    primaryFg: "oklch(98% 0 0)",
    accent: "oklch(74% 0.16 60)",
    accentFg: "oklch(20% 0.02 60)",
    bg: "oklch(99% 0.005 256)",
    surface: "oklch(100% 0 0)",
    surfaceAlt: "oklch(96% 0.01 256)",
    text: "oklch(22% 0.02 256)",
    muted: "oklch(48% 0.02 256)",
    border: "oklch(90% 0.01 256)",
    focus: "oklch(70% 0.18 256)",
  },
  fonts: {
    heading: '"Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    body: '"Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  radius: {
    sm: "0.25rem",
    md: "0.5rem",
    lg: "0.75rem",
    pill: "9999px",
  },
  logoMode: "text",
  logoText: "Northwind Studio",
  logoAlt: "Northwind Studio logo",
};
