<script setup lang="ts">
const route = useRoute();
const { site } = useSiteConfig();
const slug = String(route.params.slug ?? "");
const extra = site.extraRoutes.find((r) => r.slug === slug);
if (!extra) {
  throw createError({ statusCode: 404, statusMessage: "Page not found" });
}
useSeo({ title: extra.title, description: extra.description, path: `/${extra.slug}` });
useCloudflareAnalytics();
</script>

<template>
  <article>
    <SectionRenderer
      v-for="(section, i) in extra!.sections"
      :key="i"
      :section="section"
    />
  </article>
</template>
