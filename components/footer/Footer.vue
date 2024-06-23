<template>

  <footer class="bg-black">
    <!-- Container -->
    <div class="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24 lg:py-8">
      <a href="#" class="mb-12 inline-block max-w-full">
        <img
          src="https://assets.website-files.com/646f65e37fe0275cfb808405/646f66cdeeb4ddfdae25a26c_%5BA%5D--Navbar%20Brand.png"
          alt="" class="inline-block max-h-10" />
      </a>

      <div class="grid grid-cols-[auto_1fr] justify-between gap-10 sm:grid-cols-3 lg:grid-cols-[0.45fr_auto_auto_auto]">
        <div
          class="flex max-w-[400px] flex-col gap-8 max-[991px]:[grid-area:span_1/span_3/span_1/span_3] max-[479px]:[grid-area:span_1/span_2/span_1/span_2]">
          <p class="text-[#636262]">Lorem ipsum dolor sit amet, &nbsp;elit ut aliquam, purus sit amet luctus</p>

          <!-- Icons -->
          <div class="flex flex-row items-start pb-2 text-white">
            <NuxtLink v-if="email" :to="'mailto:' + email"
              class="mx-3 flex max-w-[24px] flex-col items-center justify-center">
              <UIcon name="i-heroicons-envelope-solid" />
            </NuxtLink>

            <NuxtLink v-if="x" :to="x" target="_blank"
              class="mx-3 flex max-w-[24px] flex-col items-center justify-center">
              <UIcon name="i-simple-icons-x" />
            </NuxtLink>

            <NuxtLink v-if="discord" :to="discord" target="_blank"
              class="mx-3 flex max-w-[24px] flex-col items-center justify-center">
              <UIcon name="i-simple-icons-discord" />
            </NuxtLink>

            <NuxtLink v-if="github" :to="github" target="_blank"
              class="mx-3 flex max-w-[24px] flex-col items-center justify-center">
              <UIcon name="i-simple-icons-github" />
            </NuxtLink>

            <NuxtLink v-if="coffee" :to="coffee" target="_blank"
              class="mx-3 flex max-w-[24px] flex-col items-center justify-center">
              <UIcon name="i-simple-icons-buymeacoffee" />
            </NuxtLink>
          </div>
        </div>

        <!-- Links -->
        <div v-for="group in links" class="flex flex-col items-start font-semibold">
          <p class="mb-4 text-xl text-white">{{ group.title }}</p>
          <template v-for="link in group.links">
            <NuxtLink :to="link.path" target="_blank"
              class="py-2 text-sm font-bold text-[#636262] transition hover:text-white">
              {{ link.name }}
            </NuxtLink>
          </template>
        </div>
      </div>

      <!-- Space -->
      <div class="mb-8 mt-8 w-full border border-solid border-[#101010]"></div>

      <!-- Copyright & Privacy policy & Terms of service -->
      <div class="flex flex-col items-center justify-between md:flex-row">
        <div class="flex-none">
          <p class="text-[#636262]">
            Copyright © {{ currentYear }} {{ config.siteName }}. All rights reserved.
          </p>
        </div>
        <div class="text-center">
          <NuxtLink :to="localePath('/terms-of-service')"
            class="inline-block py-2 pl-5 pr-0 font-bold text-[#636262] transition hover:text-white max-[479px]:px-2.5 lg:pl-12">
            {{ t('footer.terms_of_service') }}</NuxtLink>
          <NuxtLink :to="localePath('/privacy-policy')"
            class="inline-block py-2 pl-5 pr-0 font-bold text-[#636262] transition hover:text-white max-[479px]:px-2.5 lg:pl-12">
            {{ t('footer.privacy_policy') }}</NuxtLink>
        </div>
      </div>
    </div>
  </footer>


</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const config = useRuntimeConfig().public
const email = config.email
const x = config.x
const discord = config.discord
const github = config.github
const coffee = config.coffee



let links = computed(() => {
  return [
    {
      title: t('footer.support'),
      links: [
        {
          name: t('pricing.entry'),
          path: localePath('/pricing')
        },
        {
          name: t('faq.entry'),
          path: localePath('/faq')
        },
        {
          name: t('blog.entry'),
          path: localePath('/blog')
        },
      ]
    },
    {
      title: t('footer.products'),
      links: [
        {
          name: config.siteName,
          path: '/'
        }
      ]
    },
    {
      title: t('footer.friends'),
      links: [
        {
          name: 'Google',
          path: 'https://google.com'
        },
      ]
    }
  ]
})

const currentYear = new Date().getFullYear();

</script>