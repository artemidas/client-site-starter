import type { Nav, Footer } from "../lib/site-config.schema";

export const nav: Nav = {
  primary: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/#services" },
    { label: "About", href: "/#about" },
    { label: "Pricing", href: "/#pricing" },
    { label: "FAQ", href: "/#faq" },
    { label: "Contact", href: "/contact" },
  ],
  cta: { label: "Get a quote", href: "/contact", external: false },
};

export const footer: Footer = {
  tagline: "Marketing sites that respect your visitors and your time.",
  columns: [
    {
      title: "Studio",
      links: [
        { label: "Services", href: "/#services" },
        { label: "About", href: "/#about" },
        { label: "Pricing", href: "/#pricing" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "FAQ", href: "/#faq" },
        { label: "Contact", href: "/contact" },
        { label: "Changelog", href: "/changelog", external: false },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy", href: "/privacy" },
        { label: "Terms", href: "/terms" },
      ],
    },
  ],
  legalLinks: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
  copyrightTemplate: "\u00a9 {year} {legalName}. All rights reserved.",
  showSocials: true,
};
