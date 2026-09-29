// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ["@otobisi/ui", "@otobisi/core"],
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  components: [
    {
      path: "components",
      pathPrefix: false,
    },
  ],
  pinia: {
    storesDirs: ["./stores/**"],
  },
  i18n: {
    baseUrl: "https://otobisi.com",
    restructureDir: "",
    langDir: "app/i18n/locales",
  },
  runtimeConfig: {
    public: {
      siteUrl: "https://otobisi.com",
      siteName: "Otobisi",
      defaultOgImage: "/og-default.jpg",
      twitterHandle: "@otobisi",
    },
  },
  routeRules: {
    "/": { prerender: false }, // has live "popular routes" pricing, keep dynamic
    "/help/**": { prerender: true },
  },
  app: {
    head: {
      // Static fallback tags only — per-page overrides happen via the
      // useSeo composable (useSeoMeta/useHead), this is just the base.
      htmlAttrs: {
        lang: "ar", // overridden reactively by @nuxtjs/i18n at runtime
      },
      link: [{ rel: "icon", type: "image/png", href: "" }],
      meta: [{ name: "theme-color", content: "#22a693" }],
    },
  },
});
