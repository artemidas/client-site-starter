<script setup lang="ts">
import type { CtaBand } from "../../lib/site-config.schema";
import SiteCtaLink from "../SiteCtaLink.vue";

const props = defineProps<{ data: CtaBand }>();
</script>

<template>
  <section :id="props.data.id" class="cta-band" aria-labelledby="cta-headline">
    <div class="container-prose inner">
      <div>
        <h2 id="cta-headline" class="headline">{{ props.data.headline }}</h2>
        <p v-if="props.data.body" class="body">{{ props.data.body }}</p>
      </div>
      <div v-if="props.data.primaryCta || props.data.secondaryCta" class="ctas">
        <SiteCtaLink v-if="props.data.primaryCta" :link="props.data.primaryCta" variant="primary" />
        <SiteCtaLink v-if="props.data.secondaryCta" :link="props.data.secondaryCta" variant="secondary" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta-band { padding-block: 3rem; }
.inner {
  display: grid;
  gap: 1.5rem;
  align-items: center;
  background: var(--color-primary);
  color: var(--color-primary-fg);
  border-radius: var(--radius-lg);
  padding: 2rem;
}
@media (min-width: 800px) {
  .inner { grid-template-columns: 1.4fr auto; }
}
.headline { margin: 0 0 0.4rem; color: inherit; font-size: clamp(1.3rem, 2.4vw, 1.75rem); }
.body { margin: 0; opacity: 0.92; }
.ctas { display: flex; gap: 0.75rem; flex-wrap: wrap; }
.ctas :deep(.btn-secondary) {
  background: transparent;
  color: var(--color-primary-fg);
  border-color: color-mix(in oklch, var(--color-primary-fg) 40%, transparent);
}
.ctas :deep(.btn-secondary:hover) {
  background: color-mix(in oklch, var(--color-primary-fg) 12%, transparent);
}
</style>
