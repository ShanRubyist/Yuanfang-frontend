<template>
  <Pricing />
</template>


<script setup lang="ts">

const { t } = useI18n()

useHead({
  title: t("pricing.title"),
  meta: [
    { name: "description", content: t("pricing.description") },
  ]
})
</script>