<script setup lang="ts">
useSeo({
  title: "Changelog",
  description: "Site changelog and notable updates.",
  path: "/changelog",
});
</script>

<template>
  <article class="container-prose legal">
    <h1>Changelog</h1>
    <p class="muted">Notable updates to this site. Routine copy edits are not listed.</p>
    <section>
      <h2>v1.0.0 — initial launch</h2>
      <p>Site built on the <code>client-site-starter</code> kit: Nuxt 3, Tailwind, Resend contact form, Lighthouse 95+ baseline.</p>
    </section>
  </article>
</template>

<style scoped>
.legal { padding-block: 3rem; max-width: 60ch; }
.legal h1 { font-size: 2rem; margin: 0 0 0.5rem; }
.muted { color: var(--color-muted); }
section { margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid var(--color-border); }
</style>
