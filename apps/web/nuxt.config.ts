// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@nuxtjs/i18n",
    "@vee-validate/nuxt",
    "@vueuse/nuxt",
    "@nuxtjs/supabase",
    "@nuxt/icon",
  ],
  pinia: {
    storesDirs: ["./stores/**", "./custom-folder/stores/**"],
  },
  i18n: {
    baseUrl: "https://otobisi.com",
    vueI18n: "app/i18n/i18n.config.ts",
    restructureDir: "",
    langDir: "app/i18n/locales",
    locales: [
      {
        code: "en",
        language: "en-US",
        file: "en.json",
        name: "English",
        dir: "ltr",
      },
      {
        code: "ar",
        language: "ar-EG",
        file: "ar.json",
        name: "عربي",
        dir: "rtl",
      },
    ],
    defaultLocale: "en",
    strategy: "prefix",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      fallbackLocale: "en",
      redirectOn: "root",
    },
    bundle: {},
  },
  veeValidate: {
    autoImports: true,
  },
  supabase: {
    redirect: false, // handle auth redirects manually via middleware, not the module default
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
  typescript: {
    strict: true,
    // typeCheck disabled: vite-plugin-checker fails to spawn vue-tsc when the
    // project path contains spaces (this repo is under "Not Done Projects")
    typeCheck: false,
  },
  components: [
    {
      path: "components",
      pathPrefix: false,
    },
  ],
  css: ["~/assets/css/main.css"],
  app: {
    head: {
      // Static fallback tags only — per-page overrides happen via the
      // useSeo composable (useSeoMeta/useHead), this is just the base.
      htmlAttrs: {
        lang: "ar", // overridden reactively by @nuxtjs/i18n at runtime
      },
      link: [{ rel: "icon", type: "image/png", href: "" }],
      meta: [{ name: "theme-color", content: "#22a693" }],
      script: [
        {
          key: "theme-init",
          innerHTML: `(function(){try{var m=localStorage.getItem('color-mode');if(m==='dark'||(m!=='light'&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark')}else{document.documentElement.classList.remove('dark')}}catch(e){}})();`,
          type: "text/javascript",
          tagPosition: "head",
        },
      ],
    },
    // Matches the motion guidelines: fade + small upward slide, one
    // shared easing curve, short duration so it never feels laggy.
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "layout", mode: "out-in" },
  },
});