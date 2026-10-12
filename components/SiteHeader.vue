<script setup lang="ts">
const { site } = useSiteConfig();
</script>

<template>
  <header role="banner" class="site-header">
    <div class="container-prose header-inner">
      <NuxtLink to="/" class="brand" :aria-label="`${site.brand.name} home`">
        <BrandLogo />
        <span class="brand-name">{{ site.brand.name }}</span>
      </NuxtLink>
      <SiteNav />
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: color-mix(in oklch, var(--color-bg) 92%, transparent);
  backdrop-filter: saturate(150%) blur(8px);
  border-bottom: 1px solid var(--color-border);
}
.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding-block: 0.75rem;
}
.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  text-decoration: none;
  color: var(--color-text);
  font-weight: 700;
  letter-spacing: -0.01em;
}
.brand-name {
  font-size: 1.05rem;
}
</style>
