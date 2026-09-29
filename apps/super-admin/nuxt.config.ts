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
  app: {
    head: {
      titleTemplate: "%s | Otobisi Super Admin",
      title: "Dashboard",
      meta: [{ name: "robots", content: "noindex, nofollow" }],
    },
  },
});
