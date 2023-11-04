import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
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
      baseURL: process.env.NUXT_PUBLIC_BASE_URL,
    },
  },
});
