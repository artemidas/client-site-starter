import type { Section } from "../lib/site-config.schema";

export const homeSections: Section[] = [
  {
    kind: "hero",
    data: {
      eyebrow: "Marketing sites, done right",
      headline: "A site that loads instantly and reads like you wrote it.",
      subheadline:
        "Static-first Nuxt, config-driven branding, and a real contact form that actually delivers.",
      body:
        "You should not have to learn a CMS to update your own site. Change a text file, push, deploy.",
      primaryCta: { label: "Start a project", href: "/contact", external: false },
      secondaryCta: { label: "See pricing", href: "#pricing", external: false },
      highlights: [
        "Lighthouse 95+ on perf, a11y, SEO",
        "Static export to Cloudflare Pages",
        "Resend-backed contact form with spam protection",
        "Config-driven rebrand in one file",
      ],
    },
  },
  {
    kind: "services",
    data: {
      id: "services",
      eyebrow: "What we do",
      headline: "Everything a small site needs, nothing it does not.",
      body: "Composable services. Keep what you need, drop the rest.",
      columns: 3,
      items: [
        {
          title: "Marketing site build",
          body: "A complete static site, configured for your brand, deployed to Cloudflare Pages.",
          icon: "globe",
        },
        {
          title: "Rebrand migration",
          body: "Already have a site? We move it onto this starter and re-skin it in your new brand.",
          icon: "refresh",
        },
        {
          title: "Performance & a11y audit",
          body: "We profile, fix, and verify your existing site against the same Lighthouse bar we ship by.",
          icon: "speedometer",
        },
        {
          title: "Contact form plumbing",
          body: "Resend, server validation, honeypot, rate limiting, and a graceful dry-run when keys are absent.",
          icon: "mail",
        },
        {
          title: "Analytics & SEO",
          body: "Cloudflare Web Analytics opt-in, per-page metadata, generated OG images, sitemap, robots.",
          icon: "chart",
        },
        {
          title: "Owner handoff",
          body: "A clone-to-deploy runbook and a one-file brand so you can update copy without calling us.",
          icon: "book",
        },
      ],
    },
  },
  {
    kind: "about",
    data: {
      id: "about",
      eyebrow: "About",
      headline: "A two-person studio. Yours, if you want it.",
      body:
        "We started Northwind Studio because most small-business sites are slow, fragile, and impossible to update without phoning someone. We build the opposite: a starter that one tired person at 11pm can clone, rebrand, and ship.",
      bullets: [
        "No CMS lock-in. Your copy lives in a TypeScript file you can read.",
        "No framework lock-in. You can leave with the static export any time.",
        "No mystery scripts. We document every dependency and every env var.",
      ],
      stats: [
        { value: "12", label: "Sites shipped" },
        { value: "98", label: "Median Lighthouse perf" },
        { value: "0", label: "Tracked visitors by default" },
      ],
    },
  },
  {
    kind: "testimonials",
    data: {
      id: "testimonials",
      eyebrow: "What clients say",
      headline: "Owners who would recommend us, in their own words.",
      items: [
        {
          quote:
            "I edited the site in a text file and pushed. Two minutes later my new headline was live. I had been waiting three years to do that.",
          author: "Marisol P.",
          role: "Owner",
          company: "Hollow Maple Pottery",
          rating: 5,
        },
        {
          quote:
            "Our contact form went from a black hole to something I actually answer. Lead quality went up because spam stopped.",
          author: "Devon R.",
          role: "Director",
          company: "Ridgeline Adventures",
          rating: 5,
        },
        {
          quote:
            "Lighthouse went from 60s to 99 and I did not have to think about it. The starter already does the right thing.",
          author: "Aki T.",
          role: "Founder",
          company: "Quiet Hours Coffee",
          rating: 5,
        },
      ],
    },
  },
  {
    kind: "pricing",
    data: {
      id: "pricing",
      eyebrow: "Pricing",
      headline: "One fee covers the build. Hosting is free.",
      body: "We quote fixed-fee projects. The hosting (Cloudflare Pages) costs you nothing on the free plan.",
      billingNote: "USD. Sales tax may apply. Hosting billed direct to you by Cloudflare if you exceed the free tier.",
      tiers: [
        {
          name: "Starter",
          price: "$1,800",
          cadence: "one-time",
          description: "A single-page marketing site with the section library you need.",
          features: [
            "Up to 5 sections from the library",
            "Config-driven rebrand",
            "Contact form with Resend",
            "Sitemap, robots, OG images",
            "Owner runbook delivered",
          ],
          cta: { label: "Get started", href: "/contact", external: false },
        },
        {
          name: "Standard",
          price: "$3,600",
          cadence: "one-time",
          description: "The kit, plus 2\u20133 extra pages (about, services detail, contact) and SEO tuning.",
          features: [
            "Up to 8 sections, 3 pages",
            "Custom OG image generation",
            "JSON-LD LocalBusiness schema",
            "Cloudflare Web Analytics wired in",
            "Two rounds of revisions",
          ],
          cta: { label: "Get started", href: "/contact", external: false },
          highlighted: true,
          badge: "Most picked",
        },
        {
          name: "Migration",
          price: "from $2,400",
          cadence: "one-time",
          description: "Move an existing site onto this starter, keep your URLs, re-skin in the new brand.",
          features: [
            "URL parity preserved",
            "Old site stays live until cutover",
            "Redirect map delivered",
            "Contact form reconnected",
            "Same Lighthouse bar as a new build",
          ],
          cta: { label: "Talk to us", href: "/contact", external: false },
        },
      ],
    },
  },
  {
    kind: "faq",
    data: {
      id: "faq",
      eyebrow: "FAQ",
      headline: "Questions we get on every first call.",
      items: [
        {
          question: "How long does a build take?",
          answer:
            "Two weeks for a Starter, three to four for a Standard. Migration depends on the source site; we scope before quoting.",
        },
        {
          question: "Do I own the code?",
          answer:
            "Yes. The starter is yours the moment you clone it. We hand it over with a runbook; you can take it to any host or developer.",
        },
        {
          question: "What if I want to update the site myself?",
          answer:
            "All the copy, brand colors, and navigation live in one folder called content/. Edit, commit, push, done. The README walks you through it.",
        },
        {
          question: "How is the contact form spam-protected?",
          answer:
            "Server-side validation, a hidden honeypot field, and per-IP rate limiting. None of the spam protection relies on client JS.",
        },
        {
          question: "What happens if my Resend key is missing?",
          answer:
            "The form degrades to a dry-run transport. The build still passes, the form still validates, and submissions are logged so you can recover them.",
        },
        {
          question: "Can I host this somewhere other than Cloudflare Pages?",
          answer:
            "Yes. The output is a static directory; Netlify, GitHub Pages, S3 + CloudFront, or any static host will serve it. We default to Cloudflare Pages because the free tier is generous and analytics is opt-in.",
        },
      ],
    },
  },
  {
    kind: "cta",
    data: {
      id: "cta",
      headline: "Ready for a site you can actually update?",
      body: "Tell us what you have and what you want. We will quote fixed-fee in two business days.",
      primaryCta: { label: "Start a project", href: "/contact", external: false },
      secondaryCta: { label: "Email us", href: "mailto:hello@northwindstudio.example", external: true },
    },
  },
];

export const contactSections: Section[] = [
  {
    kind: "contact",
    data: {
      id: "contact",
      eyebrow: "Contact",
      headline: "Tell us about your project.",
      body: "We reply within two business days. Required fields are marked.",
      showBusinessDetails: true,
      showHours: true,
      form: {
        submitLabel: "Send message",
        successMessage: "Thanks \u2014 we will reply within two business days.",
        errorMessage: "Something went wrong sending your message. Please try again or email us directly.",
        consentLabel:
          "I agree to be contacted about my enquiry and to the site's privacy policy.",
        fields: {
          name: true,
          email: true,
          phone: true,
          company: true,
          subject: true,
          message: true,
        },
      },
    },
  },
];
