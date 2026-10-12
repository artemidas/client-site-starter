<script setup lang="ts">
import type { Pricing } from "../../lib/site-config.schema";
import SiteCtaLink from "../SiteCtaLink.vue";

const props = defineProps<{ data: Pricing }>();
</script>

<template>
  <section :id="props.data.id" class="pricing" aria-labelledby="pricing-headline">
    <div class="container-prose">
      <header class="head">
        <p v-if="props.data.eyebrow" class="eyebrow">{{ props.data.eyebrow }}</p>
        <h2 id="pricing-headline" class="headline">{{ props.data.headline }}</h2>
        <p v-if="props.data.body" class="body">{{ props.data.body }}</p>
        <p v-if="props.data.billingNote" class="note">{{ props.data.billingNote }}</p>
      </header>
      <ul class="grid">
        <li
          v-for="tier in props.data.tiers"
          :key="tier.name"
          class="tier"
          :class="{ featured: tier.highlighted }"
        >
          <span v-if="tier.badge" class="badge">{{ tier.badge }}</span>
          <h3 class="tier-name">{{ tier.name }}</h3>
          <p class="price">
            <span class="amount">{{ tier.price }}</span>
            <span v-if="tier.cadence" class="cadence">{{ tier.cadence }}</span>
          </p>
          <p v-if="tier.description" class="tier-desc">{{ tier.description }}</p>
          <ul class="features">
            <li v-for="f in tier.features" :key="f">
              <Icon icon="check" :size="18" />
              <span>{{ f }}</span>
            </li>
          </ul>
          <SiteCtaLink v-if="tier.cta" :link="tier.cta" :variant="tier.highlighted ? 'primary' : 'secondary'" />
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.pricing { padding-block: 4rem; background: var(--color-surface-alt); }
.head { max-width: 60ch; margin-bottom: 2rem; }
.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-primary);
  font-weight: 600;
  font-size: 0.85rem;
  margin: 0 0 0.5rem;
}
.headline { margin: 0 0 0.5rem; font-size: clamp(1.5rem, 2.6vw, 2.25rem); }
.body { color: var(--color-muted); margin: 0 0 0.5rem; }
.note { color: var(--color-muted); font-size: 0.9rem; margin: 0; }
.grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  align-items: stretch;
}
.tier {
  position: relative;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.tier.featured {
  border-color: var(--color-primary);
  box-shadow: 0 8px 24px -16px color-mix(in oklch, var(--color-primary) 50%, transparent);
}
.badge {
  position: absolute;
  top: -0.75rem;
  left: 1.25rem;
  background: var(--color-primary);
  color: var(--color-primary-fg);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius-pill);
}
.tier-name { margin: 0; font-size: 1.1rem; }
.price { margin: 0; display: flex; align-items: baseline; gap: 0.5rem; }
.amount { font-size: 2rem; font-weight: 800; letter-spacing: -0.02em; }
.cadence { color: var(--color-muted); font-size: 0.9rem; }
.tier-desc { margin: 0; color: var(--color-muted); }
.features { list-style: none; margin: 0.5rem 0 1rem; padding: 0; display: grid; gap: 0.4rem; }
.features li { display: inline-flex; align-items: center; gap: 0.5rem; }
.features li :deep(svg) { color: var(--color-primary); }
</style>
