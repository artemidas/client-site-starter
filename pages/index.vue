<script setup lang="ts">
const { site } = useSiteConfig();
const page = site.pages.home;
useSeo({
  title: page.title,
  description: page.description,
  path: "/",
});
useLocalBusinessSchema();
useCloudflareAnalytics();
</script>

<template>
  <article>
    <SectionRenderer
      v-for="(section, i) in page.sections"
      :key="i"
      :section="section"
    />
  </article>
</template>
