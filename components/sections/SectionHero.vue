<script setup lang="ts">
import type { Hero } from "../../lib/site-config.schema";
import SiteCtaLink from "../SiteCtaLink.vue";

const props = defineProps<{ data: Hero }>();
</script>

<template>
  <section :id="props.data.id ?? 'hero'" class="hero" aria-labelledby="hero-headline">
    <div class="container-prose hero-grid">
      <div class="copy">
        <p v-if="props.data.eyebrow" class="eyebrow">{{ props.data.eyebrow }}</p>
        <h1 id="hero-headline" class="headline">{{ props.data.headline }}</h1>
        <p v-if="props.data.subheadline" class="subheadline">{{ props.data.subheadline }}</p>
        <p v-if="props.data.body" class="body">{{ props.data.body }}</p>
        <div v-if="props.data.primaryCta || props.data.secondaryCta" class="ctas">
          <SiteCtaLink v-if="props.data.primaryCta" :link="props.data.primaryCta" variant="primary" />
          <SiteCtaLink v-if="props.data.secondaryCta" :link="props.data.secondaryCta" variant="secondary" />
        </div>
        <ul v-if="props.data.highlights.length" class="highlights">
          <li v-for="h in props.data.highlights" :key="h">
            <Icon icon="check" :size="18" />
            <span>{{ h }}</span>
          </li>
        </ul>
      </div>
      <div v-if="props.data.image" class="media">
        <img :src="props.data.image.src" :alt="props.data.image.alt" loading="eager" decoding="async" width="720" height="540" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding-block: 4rem 3rem;
  background: linear-gradient(180deg, var(--color-surface-alt) 0%, var(--color-bg) 100%);
}
.hero-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  align-items: center;
}
@media (min-width: 900px) {
  .hero-grid {
    grid-template-columns: 1.1fr 0.9fr;
    gap: 3rem;
  }
}
.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-primary);
  font-weight: 600;
  font-size: 0.85rem;
  margin: 0 0 0.5rem;
}
.headline {
  font-size: clamp(2rem, 4.5vw, 3.5rem);
  margin: 0 0 1rem;
  line-height: 1.05;
  letter-spacing: -0.02em;
}
.subheadline {
  font-size: 1.15rem;
  color: var(--color-muted);
  margin: 0 0 1rem;
  max-width: 60ch;
}
.body {
  margin: 0 0 1.5rem;
  max-width: 60ch;
}
.ctas {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
}
.highlights {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.5rem;
}
.highlights li {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-text);
}
.highlights li :deep(svg) {
  color: var(--color-primary);
}
.media img {
  width: 100%;
  height: auto;
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  background: var(--color-surface);
}
</style>
