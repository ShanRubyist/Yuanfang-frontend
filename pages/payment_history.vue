<template>
  <h1>{{ t("payment.payment_history.h1") }}</h1>

  {{ t('payment.payment_history.total_label') }} {{ total }}

  <UTable :rows="rows" :loading="pending"
    :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid', label: t('payment.payment_history.loading') }"
    :progress="{ color: 'primary', animation: 'carousel' }" class="w-full" />

  <div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
    <UPagination v-model="page" :page-count="pageCount" :total="total" :max="5" />
  </div>
</template>

<script setup lang="ts">

import {request, request2} from "@/utils/request";

const { t, locale } = useI18n()
const localePath = useLocalePath()
const config = useRuntimeConfig().public


useHead({
  title: t("payment.payment-history.title"),
  meta: [
    { name: "description", content: t("payment.payment_history.description") },
  ]
})

let pending = ref(false)

const page = ref(1)
const pageCount = ref(20)

let localeValue = locale.value || config.defaultLocale

let { data: list } = await useAsyncData("charges_history", async () => {
  let resp = await request(`/charges_history?locale=${localeValue}&page=${page.value}&per=${pageCount.value}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  pending.value = false
  return resp.data;
});
// console.log(list)

let total = ref(list.value?.total)
let rows = ref(list.value?.charges_history)

watch(() => page.value, async (newPage) => {
  rows.value = ref([])
  pending.value = true

  let resp = await request(`/charges_history?page=${newPage}&per=${pageCount.value}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  pending.value = false
  rows.value = resp.data?.charges_history
  total.value = resp.data?.total
})

</script>