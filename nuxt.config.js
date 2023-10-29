import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Yuanfang",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  router: {
    middleware: "auth",
  },

  server: {
    host: "0.0.0.0", // default: localhost,
    // port: '3000',
    timing: false,
  },

  // ssr: false, // default is 'true'
  // target: 'static' // default is 'server'

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "@pinia/nuxt",
    "@ant-design-vue/nuxt"
  ],

  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      baseURL: "",
    },
  },
});
