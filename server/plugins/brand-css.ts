import { defineNitroPlugin } from "nitropack/runtime";
import type { NitroApp } from "nitropack";
import { branding } from "../../content/branding";

function esc(value: string): string {
  return value.replace(/[\\"]/g, (m) => `\\${m}`);
}

function buildBrandCss(): string {
  return `:root{
  --brand-primary:${esc(branding.colors.primary)};
  --brand-primary-fg:${esc(branding.colors.primaryFg)};
  --brand-accent:${esc(branding.colors.accent)};
  --brand-accent-fg:${esc(branding.colors.accentFg)};
  --brand-bg:${esc(branding.colors.bg)};
  --brand-surface:${esc(branding.colors.surface)};
  --brand-surface-alt:${esc(branding.colors.surfaceAlt)};
  --brand-text:${esc(branding.colors.text)};
  --brand-muted:${esc(branding.colors.muted)};
  --brand-border:${esc(branding.colors.border)};
  --brand-focus:${esc(branding.colors.focus)};
  --brand-radius-sm:${esc(branding.radius.sm)};
  --brand-radius-md:${esc(branding.radius.md)};
  --brand-radius-lg:${esc(branding.radius.lg)};
  --brand-radius-pill:${esc(branding.radius.pill)};
  --font-heading-stack:${esc(branding.fonts.heading)};
  --font-body-stack:${esc(branding.fonts.body)};
}`;
}

export default defineNitroPlugin((nitroApp: NitroApp) => {
  const styleTag = `<style data-brand="true">${buildBrandCss()}</style>`;

  nitroApp.hooks.hook("render:html", (html, { event }) => {
    if (event.path?.startsWith("/_nuxt/")) return;
    if (event.path?.startsWith("/__nuxt")) return;
    if (event.path?.endsWith(".xml") || event.path?.endsWith(".txt")) return;
    html.head.unshift(styleTag);
  });
});
