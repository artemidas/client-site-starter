<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  icon?: string;
  size?: number;
}>();

const size = computed(() => props.size ?? 24);

const paths: Record<string, string> = {
  globe: "M12 2a10 10 0 100 20 10 10 0 000-20zm0 0c-3 3-3 17 0 20m0-20c3 3 3 17 0 20M2 12h20",
  refresh: "M4 4v6h6M20 20v-6h-6M4 10a8 8 0 0114-3M20 14a8 8 0 01-14 3",
  speedometer: "M12 14l4-4M3 12a9 9 0 1118 0M12 12l-3-3",
  mail: "M3 7l9 6 9-6M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M3 7a2 2 0 012-2h14a2 2 0 012 2",
  chart: "M4 19V5m6 14V9m6 10v-6m4 6V3",
  book: "M4 5a2 2 0 012-2h12v18H6a2 2 0 01-2-2V5zm0 14h14",
  check: "M5 12l4 4L19 6",
  star: "M12 3l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z",
  arrow: "M5 12h14M13 5l7 7-7 7",
  phone: "M3 5a2 2 0 012-2h3l2 5-2 1a11 11 0 005 5l1-2 5 2v3a2 2 0 01-2 2A16 16 0 013 5z",
  location: "M12 22s-7-7-7-12a7 7 0 1114 0c0 5-7 12-7 12zm0-9a3 3 0 100-6 3 3 0 000 6z",
};
const d = computed(() => (props.icon && paths[props.icon]) || paths.globe);
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <path :d="d" />
  </svg>
</template>
