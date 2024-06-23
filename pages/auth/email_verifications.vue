<template>
    <template v-if="type == 'account_confirm'">
        <h1>{{ t('auth.email_verifications.h1_account_confirm') }}</h1>

        {{ t('auth.email_verifications.p_account_confirm') }} {{ email }}
        &nbsp;

        <button>{{ t('auth.email_verifications.check_email') }}</button>
        &nbsp;

        <a>{{ t('auth.email_verifications.resend') }}</a>
    </template>
    <template v-else-if="type == 'reset_password'">
        <h1>{{ t('auth.email_verifications.h1_reset_password') }}</h1>

        &nbsp;

        {{ t('auth.email_verifications.p_reset_password') }} {{ email }}

        <button>{{ t('auth.email_verifications.check_email') }}</button>
        &nbsp;
        <a>{{ t('auth.email_verifications.resend') }}</a>
    </template>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
const localePath = useLocalePath()
const {t} = useI18n()
useHead({
  title: t("auth.email_verifications.title"),
  meta: [
    { name: "description", content: t("auth.email_verifications.description") },
  ]
})

const params = useRoute().query
const email = params.email
const type = params.type

const account_confirmation_success = params.account_confirmation_success

if (account_confirmation_success) {
    navigateTo({
        path: localePath("/"),
    });
}
</script>