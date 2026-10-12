<script setup lang="ts">
const { site } = useSiteConfig();
if (!site.pages.contact) {
  throw createError({ statusCode: 404, statusMessage: "Contact page not configured" });
}
const page = site.pages.contact;
useSeo({
  title: page.title,
  description: page.description,
  path: "/contact",
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
