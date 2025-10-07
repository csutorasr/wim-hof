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
    "@nuxtjs/sitemap",
    "@nuxtjs/robots",
    "nuxt-schema-org",
    "nuxt-og-image",
    "@nuxtjs/i18n",
  ],
  css: ["~/assets/css/main.css"],
  scripts: {
    registry: {
      googleAnalytics: {
        id: "G-K3RQL4YR4K",
      },
    },
  },
  app: {
    rootAttrs: {
      class: "flex-1 flex flex-col",
    },
  },
  site: {
    name: "Wim Hof Method",
    url: "https://csutorasr.github.io/wim-hof/",
  },
  i18n: {
    defaultLocale: "en",
    locales: [
      { code: "en", iso: "en-US", name: "English", file: "en.json" },
      { code: "hu", iso: "hu-HU", name: "Magyar", file: "hu.json" },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
    },
    baseUrl: "https://csutorasr.github.io/wim-hof/",
  },
});
