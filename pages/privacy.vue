<script setup lang="ts">
useSeo({
  title: "Privacy policy",
  description: `How ${useSiteConfig().site.brand.name} handles personal data.`,
  path: "/privacy",
});
</script>

<template>
  <article class="container-prose legal">
    <h1>Privacy policy</h1>
    <p class="muted">Last updated: {{ new Date().toISOString().slice(0, 10) }}</p>
    <p>This is a placeholder. Replace this page with the client's real privacy policy before launch. The contact form below ships with the same spam protection regardless of which host runs the form endpoint, and the form never writes to a third-party tracker.</p>
    <h2>What we collect</h2>
    <ul>
      <li>Form submissions: name, email, optional phone, optional company, optional subject, message, and the time the form was rendered (to detect bots).</li>
      <li>Standard server logs from Cloudflare Pages (IP, user agent, request path) for security and abuse prevention.</li>
      <li>Nothing else. The starter does not embed advertising trackers or third-party analytics by default.</li>
    </ul>
    <h2>Cloudflare Web Analytics</h2>
    <p>Analytics is opt-in. If you set <code>NUXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN</code> the beacon script loads; otherwise no analytics code ships.</p>
    <h2>Contact</h2>
    <p>Email <a :href="`mailto:${useSiteConfig().site.business.email}`">{{ useSiteConfig().site.business.email }}</a> with privacy questions.</p>
  </article>
</template>

<style scoped>
.legal { padding-block: 3rem; max-width: 60ch; }
.legal h1 { font-size: 2rem; margin: 0 0 0.5rem; }
.legal h2 { margin-top: 2rem; }
.muted { color: var(--color-muted); }
</style>
