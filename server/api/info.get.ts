export default defineEventHandler(async (event) => {
  return {
    version: "1.0.0",
    name: useRuntimeConfig().public.siteName,
    time: (new Date()).toString()
  }
})

