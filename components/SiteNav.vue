<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";

const { site } = useSiteConfig();
const open = ref(false);
const navId = "primary-nav";

function close() {
  open.value = false;
}

onMounted(() => {
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
});

const route = useRoute();
watch(() => route.fullPath, close);
onBeforeUnmount(() => {});
</script>

<template>
  <nav :aria-label="`${site.brand.name} primary`">
    <button
      class="nav-toggle"
      type="button"
      :aria-expanded="open"
      :aria-controls="navId"
      @click="open = !open"
    >
      <span class="sr-only">{{ open ? "Close menu" : "Open menu" }}</span>
      <span aria-hidden="true" class="bars" :data-open="open">
        <span /><span /><span />
      </span>
    </button>
    <ul :id="navId" class="nav-list" :data-open="open">
      <li v-for="link in site.nav.primary" :key="link.href">
        <NuxtLink
          :to="link.href"
          :external="link.external"
          :target="link.external ? '_blank' : undefined"
          :rel="link.external ? 'noopener noreferrer' : undefined"
          @click="close"
        >
          {{ link.label }}
        </NuxtLink>
      </li>
      <li v-if="site.nav.cta">
        <NuxtLink
          :to="site.nav.cta.href"
          class="btn btn-primary nav-cta"
          :external="site.nav.cta.external"
          :target="site.nav.cta.external ? '_blank' : undefined"
          :rel="site.nav.cta.external ? 'noopener noreferrer' : undefined"
          @click="close"
        >
          {{ site.nav.cta.label }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
nav {
  display: flex;
  align-items: center;
}
.nav-list {
  display: flex;
  gap: 1.25rem;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
}
.nav-list a {
  color: var(--color-text);
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 0.25rem;
  border-radius: var(--radius-sm);
}
.nav-list a:hover {
  color: var(--color-primary);
}
.nav-cta {
  padding: 0.5rem 0.875rem;
  font-size: 0.95rem;
}
.nav-toggle {
  display: none;
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 0.5rem;
  cursor: pointer;
  color: var(--color-text);
}
.bars {
  display: inline-flex;
  flex-direction: column;
  gap: 3px;
  width: 22px;
}
.bars span {
  display: block;
  height: 2px;
  background: currentColor;
  border-radius: 2px;
  transition: transform 150ms ease, opacity 150ms ease;
}
.bars[data-open="true"] span:nth-child(1) { transform: translateY(5px) rotate(45deg); }
.bars[data-open="true"] span:nth-child(2) { opacity: 0; }
.bars[data-open="true"] span:nth-child(3) { transform: translateY(-5px) rotate(-45deg); }

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media (max-width: 768px) {
  .nav-toggle {
    display: inline-flex;
  }
  .nav-list {
    position: absolute;
    inset: 100% 0 auto 0;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    background: var(--color-bg);
    border-bottom: 1px solid var(--color-border);
    padding: 0.5rem 1.25rem 1rem;
    transform: translateY(-8px);
    opacity: 0;
    pointer-events: none;
    transition: transform 150ms ease, opacity 150ms ease;
  }
  .nav-list[data-open="true"] {
    transform: translateY(0);
    opacity: 1;
    pointer-events: auto;
  }
  .nav-list li {
    border-top: 1px solid var(--color-border);
  }
  .nav-list a {
    display: block;
    padding: 0.75rem 0.25rem;
  }
  .nav-cta {
    margin-top: 0.5rem;
  }
}
</style>
