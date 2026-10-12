<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps<{ error: NuxtError }>();
const handle = () => clearError({ redirect: "/" });
useSeo({ title: "Page not found", description: "That page does not exist.", path: "/404" });
</script>

<template>
  <div class="container-prose error-page">
    <p class="eyebrow">{{ props.error.statusCode ?? 500 }}</p>
    <h1>We could not find that page.</h1>
    <p>{{ props.error.message || "The link may be out of date." }}</p>
    <button class="btn btn-primary" @click="handle">Back to home</button>
  </div>
</template>

<style scoped>
.error-page {
  padding-block: 5rem;
  text-align: center;
  max-width: 50ch;
}
.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-primary);
  font-weight: 600;
  font-size: 0.85rem;
  margin: 0 0 0.5rem;
}
h1 { font-size: 2rem; margin: 0 0 0.5rem; }
</style>
