<script setup lang="ts">
import type { Services } from "../../lib/site-config.schema";

const props = defineProps<{ data: Services }>();
const cols = props.data.columns;
</script>

<template>
  <section :id="props.data.id" class="services" aria-labelledby="services-headline">
    <div class="container-prose">
      <header class="head">
        <p v-if="props.data.eyebrow" class="eyebrow">{{ props.data.eyebrow }}</p>
        <h2 id="services-headline" class="headline">{{ props.data.headline }}</h2>
        <p v-if="props.data.body" class="body">{{ props.data.body }}</p>
      </header>
      <ul class="grid" :style="{ '--cols': cols }">
        <li v-for="item in props.data.items" :key="item.title" class="card">
          <span class="icon" aria-hidden="true"><Icon :icon="item.icon ?? 'globe'" :size="22" /></span>
          <h3 class="title">{{ item.title }}</h3>
          <p class="text">{{ item.body }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.services {
  padding-block: 4rem;
}
.head {
  max-width: 60ch;
  margin-bottom: 2rem;
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
  margin: 0;
}
.grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(var(--cols, 3), minmax(0, 1fr));
}
@media (max-width: 900px) {
  .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 600px) {
  .grid { grid-template-columns: 1fr; }
}
.icon {
  display: inline-flex;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  background: color-mix(in oklch, var(--color-primary) 12%, transparent);
  color: var(--color-primary);
  margin-bottom: 0.75rem;
}
.title {
  font-size: 1.05rem;
  margin: 0 0 0.4rem;
}
.text {
  color: var(--color-muted);
  margin: 0;
  line-height: 1.55;
}
</style>
