export default defineNuxtConfig({
  extends: ["@otobisi/ui", "@otobisi/core"],
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  devServer: { port: 3002 },
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
