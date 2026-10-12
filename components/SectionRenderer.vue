<script setup lang="ts">
import type { Section } from "../lib/site-config.schema";

defineProps<{ section: Section }>();
</script>

<template>
  <SectionHero v-if="section.kind === 'hero'" :data="section.data" />
  <SectionServices v-else-if="section.kind === 'services'" :data="section.data" />
  <SectionAbout v-else-if="section.kind === 'about'" :data="section.data" />
  <SectionTestimonials v-else-if="section.kind === 'testimonials'" :data="section.data" />
  <SectionPricing v-else-if="section.kind === 'pricing'" :data="section.data" />
  <SectionFaq v-else-if="section.kind === 'faq'" :data="section.data" />
  <SectionCtaBand v-else-if="section.kind === 'cta'" :data="section.data" />
  <SectionContact v-else-if="section.kind === 'contact'" :data="section.data" />
</template>
