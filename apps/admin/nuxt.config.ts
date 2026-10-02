export default defineNuxtConfig({
  extends: ["@otobisi/ui", "@otobisi/core"],
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  devServer: { port: 3002 },
  i18n: {
    baseUrl: process.env.NUXT_PUBLIC_SITE_URL || "https://admin.otobisi.com",
  },
  components: [
    {
      path: "components",
      pathPrefix: false,
    },
  ],
  app: {
    head: {
      titleTemplate: "%s | Otobisi Admin",
      title: "Dashboard",
      meta: [{ name: "robots", content: "noindex, nofollow" }],
    },
  },
});
