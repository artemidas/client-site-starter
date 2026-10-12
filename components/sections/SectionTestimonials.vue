<script setup lang="ts">
import type { Testimonials } from "../../lib/site-config.schema";

const props = defineProps<{ data: Testimonials }>();
</script>

<template>
  <section :id="props.data.id" class="testimonials" aria-labelledby="testimonials-headline">
    <div class="container-prose">
      <header class="head">
        <p v-if="props.data.eyebrow" class="eyebrow">{{ props.data.eyebrow }}</p>
        <h2 id="testimonials-headline" class="headline">{{ props.data.headline }}</h2>
        <p v-if="props.data.body" class="body">{{ props.data.body }}</p>
      </header>
      <ul class="grid">
        <li v-for="t in props.data.items" :key="t.author" class="card">
          <div v-if="t.rating" class="rating" :aria-label="`${t.rating} out of 5`">
            <Icon v-for="n in 5" :key="n" icon="star" :size="16" :class="{ filled: n <= (t.rating ?? 0) }" />
          </div>
          <blockquote>
            <p>&ldquo;{{ t.quote }}&rdquo;</p>
          </blockquote>
          <footer class="cite">
            <span class="author">{{ t.author }}</span>
            <span v-if="t.role || t.company" class="role">
              <template v-if="t.role">{{ t.role }}</template>
              <template v-if="t.role && t.company">, </template>
              <template v-if="t.company">{{ t.company }}</template>
            </span>
          </footer>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.testimonials { padding-block: 4rem; }
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
.body { color: var(--color-muted); margin: 0; }
.grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}
.card { display: flex; flex-direction: column; gap: 1rem; }
.rating { display: inline-flex; gap: 2px; color: var(--color-border); }
.rating :deep(svg.filled) { color: var(--color-accent); }
blockquote { margin: 0; }
blockquote p { margin: 0; font-size: 1.05rem; }
.cite { color: var(--color-muted); font-size: 0.95rem; }
.author { font-weight: 600; color: var(--color-text); }
.role { margin-left: 0.25rem; }
</style>
