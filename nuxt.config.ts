// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  modules: [
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxt/image",
    "@nuxt/scripts",
    "@nuxt/test-utils",
    "@nuxt/ui",
    "@nuxtjs/sitemap"
  ],
  css: ["~/assets/css/main.css"],
  scripts: {
    registry: {
      googleAnalytics: {
        id: 'G-K3RQL4YR4K',
      }
    }
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      }
    },
    rootAttrs: {
      class: 'flex-1 flex flex-col'
    }
  }
});
