<template>
  <h1>{{ t('auth.password_reset.h1') }}</h1>
  <input v-model="password" type="password"
    class="mb-4 block h-9 w-full border border-black bg-white px-3 py-6 pl-14 text-sm text-[#333333]" maxlength="256"
    name="name" :placeholder="t('auth.password_reset.password_placeholder')" required="" />
  <input v-model="password_confirmation" type="password"
    class="mb-4 block h-9 w-full border border-black bg-white px-3 py-6 pl-14 text-sm text-[#333333]" maxlength="256"
    name="name" :placeholder="t('auth.password_reset.password_confirmation_placeholder')" required="" />

  <button @click="reset_password">{{ t('auth.password_reset.password_reset_btn') }}</button>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
const localePath = useLocalePath()

const { t } = useI18n()
useHead({
  title: t("auth.password_reset.title"),
  meta: [
    { name: "description", content: t("auth.password_reset.description") },
  ]
})

const params = useRoute().query
const { notify } = useNotify()

let password;
let password_confirmation;

async function reset_password(): Promise<void> {

  const resp = await request("/auth/password?access-token=" + params['access-token'] + "&client=" + params.client + "&uid=" + params.uid, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: password,
      password_confirmation: password_confirmation
    }),
  });

  if (resp.status === 200) {
    notify('success', 'Login success', 1000)
    navigateTo({
      path: localePath("/auth/login")
    });
  }
  else {
    notify('error', resp.data.errors)
  }


}
</script>