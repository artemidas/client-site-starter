import type { Business } from "../lib/site-config.schema";

export const business: Business = {
  legalName: "Northwind Studio LLC",
  description:
    "A small web studio building accessible, fast marketing sites for independent businesses.",
  email: "hello@northwindstudio.example",
  phone: "+1 (555) 010-2200",
  address: {
    street: "212 Lakeside Ave, Suite 4",
    city: "Burlington",
    region: "VT",
    postalCode: "05401",
    country: "US",
  },
  hours: [
    { days: "Mon\u2013Fri", opens: "09:00", closes: "17:00" },
    { days: "Saturday", opens: "10:00", closes: "14:00", note: "By appointment" },
    { days: "Sunday", opens: "", closes: "", note: "Closed" },
  ],
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/northwindstudio", icon: "linkedin" },
    { label: "GitHub", href: "https://github.com/northwindstudio", icon: "github" },
    { label: "Mastodon", href: "https://mastodon.social/@northwindstudio", icon: "mastodon" },
  ],
  priceRange: "$$",
  serviceArea: "Burlington, VT and remote worldwide",
};
