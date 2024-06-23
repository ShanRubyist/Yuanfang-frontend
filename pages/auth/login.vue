<!-- eslint-disable vue/multiline-html-element-content-newline -->
<!-- eslint-disable vue/singleline-html-element-content-newline -->
<template>

  <section>
    <!-- Container -->
    <div class="py-16 md:py-24 lg:py-32">
      <!-- Component -->
      <div class="mx-auto max-w-xl bg-[#f2f2f7] px-5 py-12 text-center md:px-10">
        <!-- Title -->
        <h2 class="text-3xl font-bold md:text-5xl">{{ t('auth.login.h2') }}</h2>
        <p class="mx-auto mb-5 mt-4 max-w-xl text-[#647084] md:mb-8">{{ t('auth.login.h2_p')}}</p>
        <!-- Button -->
        <a v-if="google_oauth_login" @click="open_google_oauth_link"
          class="mx-auto flex max-w-sm justify-center bg-[#276ef1] px-8 py-4 text-center font-semibold text-white transition [box-shadow:rgb(171,_196,_245)_-8px_8px] hover:[box-shadow:rgb(171,_196,_245)_0px_0px]">
          <img src="https://assets.website-files.com/6357722e2a5f19121d37f84d/6357722e2a5f19d23637f876_GoogleLogo.svg"
            alt="" class="mr-4" />
          <p class="font-bold">{{ t('auth.login.sign_in_with_google')}}</p>
        </a>
        <!-- Devider -->
        <div v-if="email_login && google_oauth_login" class="mx-auto mb-14 mt-14 flex max-w-sm justify-around">
          <img src="https://assets.website-files.com/6357722e2a5f19121d37f84d/6358f3d7490d1b3d86cf9442_Line%203.svg"
            alt="" class="inline-block" />
          <p class="text-sm text-[#647084]">{{ t('auth.login.sign_in_with_email') }}</p>
          <img src="https://assets.website-files.com/6357722e2a5f19121d37f84d/6358f3d7490d1b3d86cf9442_Line%203.svg"
            alt="" class="inline-block" />
        </div>
        <!-- Form -->
        <template v-if="email_login">
          <form class="mx-auto mb-4 max-w-sm pb-4" name="wf-form-password">
            <div class="relative">
              <img alt=""
                src="https://assets.website-files.com/6357722e2a5f19121d37f84d/6357722e2a5f190b7e37f878_EnvelopeSimple.svg"
                class="absolute bottom-0 left-[5%] right-auto top-[26%] inline-block" />
              <input v-model="email" type="email"
                class="mb-4 block h-9 w-full border border-black bg-white px-3 py-6 pl-14 text-sm text-[#333333]"
                maxlength="256" name="name" :placeholder="t('auth.login.email_placeholder')" required="" />
            </div>
            <div class="relative mb-4 pb-2">
              <img alt=""
                src="https://assets.website-files.com/6357722e2a5f19121d37f84d/6357722e2a5f19601037f879_Lock-2.svg"
                class="absolute bottom-0 left-[5%] right-auto top-[26%] inline-block" />
              <input v-model="password" type="password"
                class="mb-4 block h-9 w-full border border-black bg-white px-3 py-6 pl-14 text-sm text-[#333333]"
                :placeholder="t('auth.login.password_placeholder')" required="" />
            </div>
            <a @click="login"
              class="flex max-w-full grid-cols-2 flex-row items-center justify-center bg-[#276ef1] px-8 py-4 text-center font-semibold text-white transition [box-shadow:rgb(171,_196,_245)_-8px_8px] hover:[box-shadow:rgb(171,_196,_245)_0px_0px]">
              <p class="mr-6 font-bold">{{ t('auth.login.sign_in') }}</p>
              <div class="h-4 w-4 flex-none">
                <svg fill="currentColor" viewBox="0 0 20 21" xmlns="http://www.w3.org/2000/svg">
                  <title>Login</title>
                  <polygon
                    points="16.172 9 10.101 2.929 11.515 1.515 20 10 19.293 10.707 11.515 18.485 10.101 17.071 16.172 11 0 11 0 9">
                  </polygon>
                </svg>
              </div>
            </a>

          </form>
          <p class="text-sm text-[#636262]">
            <NuxtLinkLocale to="/auth/forgot_password"
              class="font-[Montserrat,_sans-serif] text-sm font-bold text-black">{{ t('auth.forgot_password.entry') }}</NuxtLinkLocale>
          </p>

          <p class="text-sm text-[#636262]">
            {{ t('auth.login.dont_have_an_account') }} <NuxtLinkLocale to="/auth/signup"
              class="font-[Montserrat,_sans-serif] text-sm font-bold text-black">{{ $t('auth.signup.entry') }}</NuxtLinkLocale>
          </p>
        </template>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {request, request2} from "@/utils/request";

const { t } = useI18n()
const localePath = useLocalePath()
const config = useRuntimeConfig().public
let { open_google_oauth_link } = useGoogleOAuth()
const email_login = config.email_login
const google_oauth_login = config.google_oauth_login


useHead({
  title: t("auth.login.title"),
  meta: [
    { name: "description", content: t("auth.login.description") },
  ]
})

let email: string;
let password: string;

async function login(): Promise<void> {
  const { notify } = useNotify()

  const resp = await request("/auth/sign_in", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });

  if (resp.status === 200) {
    notify('success', 'login success')

    navigateTo({
      path: localePath("/")
    });
  }
  else {
    // throw new Error((await resp.json()).errors);
    // TODO: 除了401，还有其他的错误
    notify('error', resp.data.errors)
  }
}

</script>