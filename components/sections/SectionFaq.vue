<script setup lang="ts">
import { ref } from "vue";
import type { Faq } from "../../lib/site-config.schema";

const props = defineProps<{ data: Faq }>();
const openIndex = ref<number | null>(0);

function toggle(i: number) {
  openIndex.value = openIndex.value === i ? null : i;
}
</script>

<template>
  <section :id="props.data.id" class="faq" aria-labelledby="faq-headline">
    <div class="container-prose narrow">
      <header class="head">
        <p v-if="props.data.eyebrow" class="eyebrow">{{ props.data.eyebrow }}</p>
        <h2 id="faq-headline" class="headline">{{ props.data.headline }}</h2>
        <p v-if="props.data.body" class="body">{{ props.data.body }}</p>
      </header>
      <ul class="list">
        <li v-for="(item, i) in props.data.items" :key="item.question" class="item" :class="{ open: openIndex === i }">
          <h3 class="q">
            <button
              type="button"
              :aria-expanded="openIndex === i"
              :aria-controls="`faq-${i}`"
              :id="`faq-q-${i}`"
              @click="toggle(i)"
            >
              <span>{{ item.question }}</span>
              <span class="indicator" aria-hidden="true">{{ openIndex === i ? "−" : "+" }}</span>
            </button>
          </h3>
          <div
            v-show="openIndex === i"
            :id="`faq-${i}`"
            role="region"
            :aria-labelledby="`faq-q-${i}`"
            class="a"
          >
            <p>{{ item.answer }}</p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.faq { padding-block: 4rem; }
.narrow { max-width: 800px; }
.head { margin-bottom: 1.5rem; }
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
.list { list-style: none; margin: 0; padding: 0; display: grid; gap: 0.5rem; }
.item { border: 1px solid var(--color-border); border-radius: var(--radius-md); background: var(--color-surface); }
.item.open { border-color: var(--color-primary); }
.q { margin: 0; font-size: 1rem; }
.q button {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  background: transparent;
  border: 0;
  padding: 1rem 1.25rem;
  text-align: left;
  cursor: pointer;
  color: var(--color-text);
  font: inherit;
  font-weight: 600;
}
.indicator {
  font-size: 1.4rem;
  line-height: 1;
  color: var(--color-primary);
}
.a { padding: 0 1.25rem 1.25rem; color: var(--color-muted); }
.a p { margin: 0; }
</style>
