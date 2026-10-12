<script setup lang="ts">
const { site } = useSiteConfig();
const b = site.branding;
</script>

<template>
  <span v-if="b.logoMode === 'image' && b.logoImage" class="logo">
    <img :src="b.logoImage" :alt="b.logoAlt ?? site.brand.name" width="32" height="32" />
  </span>
  <span v-else class="logo-text" :aria-label="b.logoAlt ?? site.brand.name">
    <span class="mark" aria-hidden="true" />
  </span>
</template>

<style scoped>
.logo {
  display: inline-flex;
  align-items: center;
  width: 32px;
  height: 32px;
}
.logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.logo-text {
  display: inline-flex;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: var(--color-primary);
  color: var(--color-primary-fg);
  align-items: center;
  justify-content: center;
}
.mark {
  width: 18px;
  height: 18px;
  border-radius: 4px;
  background: currentColor;
  mask: linear-gradient(135deg, transparent 30%, black 30%, black 70%, transparent 70%);
  -webkit-mask: linear-gradient(135deg, transparent 30%, black 30%, black 70%, transparent 70%);
}
</style>
