<script setup lang="ts">
useSeo({
  title: "Terms of service",
  description: "Website terms of service.",
  path: "/terms",
});
</script>

<template>
  <article class="container-prose legal">
    <h1>Terms of service</h1>
    <p class="muted">Last updated: {{ new Date().toISOString().slice(0, 10) }}</p>
    <p>This is a placeholder. Replace with the client's real terms before launch. By using this site you agree to be bound by these terms; if you do not agree, do not use the site.</p>
    <h2>Contact</h2>
    <p>Email <a :href="`mailto:${useSiteConfig().site.business.email}`">{{ useSiteConfig().site.business.email }}</a> with questions about these terms.</p>
  </article>
</template>

<style scoped>
.legal { padding-block: 3rem; max-width: 60ch; }
.legal h1 { font-size: 2rem; margin: 0 0 0.5rem; }
.muted { color: var(--color-muted); }
</style>
