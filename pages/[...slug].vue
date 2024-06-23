<template>
  <section>
    <div class="flex flex-col items-center justify-center px-5 md:px-10">
      <!-- Title Container -->
      <div class="flex h-auto min-w-[100vw] flex-col items-center justify-end bg-[#f2f2f7] py-6 md:h-64">
        <div class="flex flex-col items-center gap-y-4 py-5">
          <h1 class="text-3xl font-bold md:text-5xl">{{ md?.title || slug[slug.length - 1] }}</h1>
          <!-- <p class="text-sm text-[#808080] sm:text-base">Last Updated as of October 17, 2022</p> -->

          <UBreadcrumb :links="links" />
        </div>
      </div>
      <!-- Content Container -->
      <div class="mx-auto w-full max-w-5xl py-12 md:py-16 lg:py-20">

        <!-- Content -->
        <!-- <ContentDoc class="prose" /> -->
        <template v-if="md">
          <ContentRendererMarkdown :value="md" :data="mdcVars" class="prose" />
        </template>
        <template v-else>
          {{ t('slug.page_not_found') }}
        </template>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">

let { slug } = useRoute().params
const { locale, t } = useI18n()
const config = useRuntimeConfig().public
const localePath = useLocalePath()


const { data: md } = await useAsyncData(() => queryContent(locale.value || config.defaultLocale, ...slug).findOne());
if (!md.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
  console.log(`Page not found: ${slug}`)
}

const mdcVars = ref({
  site_name: config.siteName,
  email: config.email,
  site_url: config.siteURL
});

useHead({
  title: md?.value?.title || t('seo.title'),
  meta: [
    { name: "description", content: md?.value?.description || t('seo.description') }
  ]
})
console.log(slug)
const links = [{
  label: 'Home',
  icon: 'i-heroicons-home',
  to: localePath('/')
}]

let current_slug = ''
slug.forEach(i => {
  current_slug = `${current_slug}/${i}`

  links.push({
    label: i,
    icon: 'i-heroicons-link',
    to: localePath(current_slug)
  })
});

</script>