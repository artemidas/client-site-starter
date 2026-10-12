import { z } from "zod";

export const colorToken = z
  .string()
  .describe("Any CSS color value: hex, oklch(), rgb(), hsl(), named color. The compiler will inject this into a CSS custom property.");

export const brandingSchema = z.object({
  colors: z.object({
    primary: colorToken,
    primaryFg: colorToken,
    accent: colorToken,
    accentFg: colorToken,
    bg: colorToken,
    surface: colorToken,
    surfaceAlt: colorToken,
    text: colorToken,
    muted: colorToken,
    border: colorToken,
    focus: colorToken,
  }),
  fonts: z.object({
    heading: z.string().describe("CSS font-family stack for headings."),
    body: z.string().describe("CSS font-family stack for body text."),
  }),
  radius: z.object({
    sm: z.string().default("0.25rem"),
    md: z.string().default("0.5rem"),
    lg: z.string().default("0.75rem"),
    pill: z.string().default("9999px"),
  }),
  logoMode: z.enum(["text", "image"]).default("text"),
  logoText: z.string().optional(),
  logoImage: z.string().optional(),
  logoAlt: z.string().optional(),
});
export type Branding = z.infer<typeof brandingSchema>;

export const businessSchema = z.object({
  legalName: z.string(),
  description: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  address: z.object({
    street: z.string(),
    city: z.string(),
    region: z.string(),
    postalCode: z.string(),
    country: z.string().length(2, "ISO-3166-1 alpha-2 country code"),
  }),
  hours: z
    .array(
      z.object({
        days: z.string(),
        opens: z.string(),
        closes: z.string(),
        note: z.string().optional(),
      }),
    )
    .default([]),
  socials: z
    .array(
      z.object({
        label: z.string(),
        href: z.string().url(),
        icon: z.enum(["twitter", "linkedin", "github", "instagram", "facebook", "youtube", "mastodon", "bluesky", "generic"]),
      }),
    )
    .default([]),
  priceRange: z.string().optional(),
  serviceArea: z.string().optional(),
});
export type Business = z.infer<typeof businessSchema>;

export const navLinkSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
  external: z.boolean().optional(),
  description: z.string().optional(),
});
export type NavLink = z.infer<typeof navLinkSchema>;

export const navSchema = z.object({
  primary: z.array(navLinkSchema).default([]),
  cta: navLinkSchema.optional(),
});
export type Nav = z.infer<typeof navSchema>;

export const heroSchema = z.object({
  id: z.string().optional(),
  eyebrow: z.string().optional(),
  headline: z.string(),
  subheadline: z.string().optional(),
  body: z.string().optional(),
  primaryCta: navLinkSchema.optional(),
  secondaryCta: navLinkSchema.optional(),
  highlights: z.array(z.string()).default([]),
  image: z
    .object({
      src: z.string(),
      alt: z.string(),
    })
    .optional(),
});
export type Hero = z.infer<typeof heroSchema>;

export const servicesSchema = z.object({
  id: z.string().default("services"),
  eyebrow: z.string().optional(),
  headline: z.string(),
  body: z.string().optional(),
  items: z
    .array(
      z.object({
        title: z.string(),
        body: z.string(),
        icon: z.string().optional(),
      }),
    )
    .min(1),
  columns: z.union([z.literal(2), z.literal(3), z.literal(4)]).default(3),
});
export type Services = z.infer<typeof servicesSchema>;

export const aboutSchema = z.object({
  id: z.string().default("about"),
  eyebrow: z.string().optional(),
  headline: z.string(),
  body: z.string(),
  bullets: z.array(z.string()).default([]),
  image: z
    .object({
      src: z.string(),
      alt: z.string(),
    })
    .optional(),
  stats: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
      }),
    )
    .default([]),
});
export type About = z.infer<typeof aboutSchema>;

export const testimonialsSchema = z.object({
  id: z.string().default("testimonials"),
  eyebrow: z.string().optional(),
  headline: z.string(),
  body: z.string().optional(),
  items: z
    .array(
      z.object({
        quote: z.string(),
        author: z.string(),
        role: z.string().optional(),
        company: z.string().optional(),
        rating: z.number().min(1).max(5).optional(),
      }),
    )
    .min(1),
});
export type Testimonials = z.infer<typeof testimonialsSchema>;

export const pricingSchema = z.object({
  id: z.string().default("pricing"),
  eyebrow: z.string().optional(),
  headline: z.string(),
  body: z.string().optional(),
  billingNote: z.string().optional(),
  tiers: z
    .array(
      z.object({
        name: z.string(),
        price: z.string(),
        cadence: z.string().optional(),
        description: z.string().optional(),
        features: z.array(z.string()).default([]),
        cta: navLinkSchema.optional(),
        highlighted: z.boolean().optional(),
        badge: z.string().optional(),
      }),
    )
    .min(1),
});
export type Pricing = z.infer<typeof pricingSchema>;

export const faqSchema = z.object({
  id: z.string().default("faq"),
  eyebrow: z.string().optional(),
  headline: z.string(),
  body: z.string().optional(),
  items: z
    .array(
      z.object({
        question: z.string(),
        answer: z.string(),
      }),
    )
    .min(1),
});
export type Faq = z.infer<typeof faqSchema>;

export const ctaBandSchema = z.object({
  id: z.string().default("cta"),
  headline: z.string(),
  body: z.string().optional(),
  primaryCta: navLinkSchema.optional(),
  secondaryCta: navLinkSchema.optional(),
});
export type CtaBand = z.infer<typeof ctaBandSchema>;

export const contactBlockSchema = z.object({
  id: z.string().default("contact"),
  eyebrow: z.string().optional(),
  headline: z.string(),
  body: z.string().optional(),
  showBusinessDetails: z.boolean().default(true),
  showHours: z.boolean().default(true),
  form: z.object({
    submitLabel: z.string().default("Send message"),
    successMessage: z.string(),
    errorMessage: z.string(),
    consentLabel: z.string(),
    fields: z
      .object({
        name: z.boolean().default(true),
        email: z.boolean().default(true),
        phone: z.boolean().default(false),
        company: z.boolean().default(false),
        subject: z.boolean().default(false),
        message: z.boolean().default(true),
      })
      .default({
        name: true,
        email: true,
        phone: false,
        company: false,
        subject: false,
        message: true,
      }),
  }),
});
export type ContactBlock = z.infer<typeof contactBlockSchema>;

export const sectionSchema = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("hero"), data: heroSchema }),
  z.object({ kind: z.literal("services"), data: servicesSchema }),
  z.object({ kind: z.literal("about"), data: aboutSchema }),
  z.object({ kind: z.literal("testimonials"), data: testimonialsSchema }),
  z.object({ kind: z.literal("pricing"), data: pricingSchema }),
  z.object({ kind: z.literal("faq"), data: faqSchema }),
  z.object({ kind: z.literal("cta"), data: ctaBandSchema }),
  z.object({ kind: z.literal("contact"), data: contactBlockSchema }),
]);
export type Section = z.infer<typeof sectionSchema>;

export const pageSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  ogImage: z.string().optional(),
  sections: z.array(sectionSchema).default([]),
});
export type Page = z.infer<typeof pageSchema>;

export const seoSchema = z.object({
  defaultTitle: z.string(),
  titleTemplate: z.string().default("%s · %s"),
  description: z.string(),
  image: z.string().optional(),
  twitterHandle: z.string().optional(),
  locale: z.string().default("en"),
  themeColor: colorToken.optional(),
});
export type Seo = z.infer<typeof seoSchema>;

export const footerSchema = z.object({
  tagline: z.string().optional(),
  columns: z
    .array(
      z.object({
        title: z.string(),
        links: z.array(navLinkSchema).default([]),
      }),
    )
    .default([]),
  legalLinks: z.array(navLinkSchema).default([]),
  copyrightTemplate: z.string().default("© {year} {legalName}. All rights reserved."),
  showSocials: z.boolean().default(true),
});
export type Footer = z.infer<typeof footerSchema>;

export const siteConfigSchema = z.object({
  brand: z.object({
    name: z.string().min(1),
    tagline: z.string().optional(),
  }),
  url: z.string().url(),
  seo: seoSchema,
  branding: brandingSchema,
  business: businessSchema,
  nav: navSchema,
  footer: footerSchema,
  pages: z.object({
    home: pageSchema,
    about: pageSchema.optional(),
    services: pageSchema.optional(),
    pricing: pageSchema.optional(),
    contact: pageSchema.optional(),
  }),
  extraRoutes: z
    .array(
      z.object({
        slug: z.string(),
        title: z.string(),
        description: z.string().optional(),
        sections: z.array(sectionSchema).default([]),
      }),
    )
    .default([]),
});
export type SiteConfig = z.infer<typeof siteConfigSchema>;

export function parseSiteConfig(input: unknown): SiteConfig {
  const result = siteConfigSchema.safeParse(input);
  if (!result.success) {
    const issues = result.error.issues
      .map((i) => `  - ${i.path.join(".")}: ${i.message}`)
      .join("\n");
    throw new Error(`site.config.ts is invalid:\n${issues}`);
  }
  return result.data;
}
