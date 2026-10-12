<script setup lang="ts">
import type { NavLink } from "../lib/site-config.schema";
import { computed } from "vue";

const props = defineProps<{
  link: NavLink;
  variant?: "primary" | "secondary" | "accent";
}>();

const variant = computed(() => props.variant ?? "primary");
const cls = computed(() => `btn btn-${variant.value}`);
const isHash = computed(() => props.link.href.startsWith("#"));
const isExternal = computed(() => props.link.external || /^https?:/i.test(props.link.href) || props.link.href.startsWith("mailto:"));
const isInternal = computed(() => !isExternal.value && !isHash.value);
</script>

<template>
  <NuxtLink
    v-if="isInternal"
    :to="link.href"
    :class="cls"
  >{{ link.label }}</NuxtLink>
  <a
    v-else
    :href="link.href"
    :class="cls"
    :target="isExternal ? '_blank' : undefined"
    :rel="isExternal ? 'noopener noreferrer' : undefined"
  >{{ link.label }}</a>
</template>
