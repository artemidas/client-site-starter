<script setup lang="ts">
import { computed } from "vue";
const { site } = useSiteConfig();
const year = new Date().getFullYear();
const legal = computed(() =>
  site.footer.copyrightTemplate
    .replace("{year}", String(year))
    .replace("{legalName}", site.business.legalName),
);
</script>

<template>
  <footer role="contentinfo" class="site-footer">
    <div class="container-prose footer-inner">
      <div class="brand-col">
        <p class="brand-name">{{ site.brand.name }}</p>
        <p v-if="site.footer.tagline" class="tagline">{{ site.footer.tagline }}</p>
        <p class="address">
          <span>{{ site.business.address.street }}</span><br />
          <span>{{ site.business.address.city }}, {{ site.business.address.region }} {{ site.business.address.postalCode }}</span><br />
          <span>{{ site.business.address.country }}</span>
        </p>
        <p v-if="site.footer.showSocials && site.business.socials.length" class="socials">
          <a
            v-for="s in site.business.socials"
            :key="s.href"
            :href="s.href"
            rel="noopener noreferrer"
            target="_blank"
            :aria-label="`${site.brand.name} on ${s.label}`"
          >{{ s.label }}</a>
        </p>
      </div>
      <nav v-for="col in site.footer.columns" :key="col.title" :aria-label="col.title" class="col">
        <h2 class="col-title">{{ col.title }}</h2>
        <ul>
          <li v-for="link in col.links" :key="link.href">
            <NuxtLink
              :to="link.href"
              :external="link.external"
              :target="link.external ? '_blank' : undefined"
              :rel="link.external ? 'noopener noreferrer' : undefined"
            >{{ link.label }}</NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
    <div class="container-prose legal">
      <p>{{ legal }}</p>
      <ul v-if="site.footer.legalLinks.length" class="legal-links">
        <li v-for="link in site.footer.legalLinks" :key="link.href">
          <NuxtLink :to="link.href">{{ link.label }}</NuxtLink>
        </li>
      </ul>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  margin-top: 4rem;
  background: var(--color-surface-alt);
  border-top: 1px solid var(--color-border);
  padding-block: 3rem 1.5rem;
  color: var(--color-text);
}
.footer-inner {
  display: grid;
  grid-template-columns: 1.4fr repeat(auto-fit, minmax(160px, 1fr));
  gap: 2rem;
  align-items: start;
}
.brand-name {
  font-weight: 700;
  font-size: 1.1rem;
  margin: 0 0 0.5rem;
}
.tagline {
  color: var(--color-muted);
  margin: 0 0 1rem;
}
.address {
  color: var(--color-muted);
  font-size: 0.9rem;
  margin: 0 0 1rem;
}
.socials {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}
.socials a {
  color: var(--color-muted);
  text-decoration: none;
  border-bottom: 1px solid transparent;
}
.socials a:hover {
  color: var(--color-primary);
  border-bottom-color: var(--color-primary);
}
.col-title {
  font-size: 0.95rem;
  margin: 0 0 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-muted);
}
.col ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.4rem;
}
.col a {
  color: var(--color-text);
  text-decoration: none;
}
.col a:hover {
  color: var(--color-primary);
}
.legal {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-border);
  color: var(--color-muted);
  font-size: 0.9rem;
}
.legal-links {
  list-style: none;
  display: flex;
  gap: 1rem;
  margin: 0;
  padding: 0;
}
.legal-links a {
  color: var(--color-muted);
  text-decoration: none;
}
.legal-links a:hover {
  color: var(--color-primary);
}
</style>
