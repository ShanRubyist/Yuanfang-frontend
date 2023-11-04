<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
  
<script setup lang="ts">
useHead({
  title: "",
  titleTemplate: (title) => { return title ? `${title} - Yuanfang` : 'Yuanfang' },
  htmlAttrs: {
    lang: 'en',
  },
  meta: [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "description", content: "" },
    { name: "format-detection", content: "telephone=no" },
  ],
  link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
})
</script>
  
<style scoped></style>