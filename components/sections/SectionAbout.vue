<script setup lang="ts">
import type { About } from "../../lib/site-config.schema";

const props = defineProps<{ data: About }>();
</script>

<template>
  <section :id="props.data.id" class="about" aria-labelledby="about-headline">
    <div class="container-prose grid">
      <div class="copy">
        <p v-if="props.data.eyebrow" class="eyebrow">{{ props.data.eyebrow }}</p>
        <h2 id="about-headline" class="headline">{{ props.data.headline }}</h2>
        <p class="body">{{ props.data.body }}</p>
        <ul v-if="props.data.bullets.length" class="bullets">
          <li v-for="b in props.data.bullets" :key="b">
            <Icon icon="check" :size="18" />
            <span>{{ b }}</span>
          </li>
        </ul>
      </div>
      <aside v-if="props.data.stats.length" class="stats" aria-label="Highlights">
        <div v-for="s in props.data.stats" :key="s.label" class="stat">
          <span class="value">{{ s.value }}</span>
          <span class="label">{{ s.label }}</span>
        </div>
      </aside>
    </div>
  </section>
</template>

<style scoped>
.about {
  padding-block: 4rem;
  background: var(--color-surface-alt);
}
.grid {
  display: grid;
  gap: 2.5rem;
  grid-template-columns: 1fr;
  align-items: start;
}
@media (min-width: 900px) {
  .grid { grid-template-columns: 1.2fr 0.8fr; }
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
  margin: 0 0 0.75rem;
  font-size: clamp(1.5rem, 2.6vw, 2.25rem);
}
.body {
  color: var(--color-muted);
  margin: 0 0 1.25rem;
  max-width: 60ch;
}
.bullets {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.5rem;
}
.bullets li {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}
.bullets li :deep(svg) {
  color: var(--color-primary);
}
.stats {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
}
.stat {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 1.25rem;
  text-align: center;
}
.value {
  display: block;
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--color-primary);
  letter-spacing: -0.02em;
}
.label {
  display: block;
  margin-top: 0.25rem;
  color: var(--color-muted);
  font-size: 0.9rem;
}
</style>
