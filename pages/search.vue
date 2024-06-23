<script lang="ts" setup>
import { ref } from 'vue'
const search  = ref('1')

// const miniSearchOptions = defineMiniSearchOptions({
//   fields: ['body']
// })
// const results = await searchContent(search, {miniSearch: miniSearchOptions})
const results = await searchContent(search)
</script>

<template>
  <main>
    <UInput
    icon="i-heroicons-magnifying-glass-20-solid"
    size="sm"
    color="white"
    trailing
    placeholder="Search..."
    v-model="search"
  />
    <pre>{{ results }} </pre>
  </main>
</template>