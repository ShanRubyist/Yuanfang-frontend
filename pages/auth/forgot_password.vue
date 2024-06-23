<template>
  <h1>{{ t('auth.forgot_password.h1') }}</h1>
  <input v-model="email" type="email"
    class="mb-4 block h-9 w-full border border-black bg-white px-3 py-6 pl-14 text-sm text-[#333333]" maxlength="256"
    name="name" :placeholder="t('auth.forgot_password.email_placeholder')" required="" />

  <button @click="forgot_password">{{ t('auth.forgot_password.btn') }}</button>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
const config = useRuntimeConfig().public

const { t } = useI18n()
useHead({
  title: t("auth.forgot_password.title"),
  meta: [
    { name: "description", content: t("auth.forgot_password.description") },
  ]
})

let email

async function forgot_password(): Promise<void> {
  const { notify } = useNotify()

  const resp = await request("/auth/password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      redirect_url: config.siteURL + '/auth/password_reset',
    }),
  });

  if (resp.status === 200) {
    navigateTo({
      path: localePath("/auth/email_verifications"),
      query: {
        email: email,
        type: 'reset_password'
      }
    });
  }
  else {
    notify('error', resp.data.errors)
  }
}
</script>