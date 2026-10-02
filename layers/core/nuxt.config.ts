export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@nuxtjs/i18n",
    "@vee-validate/nuxt",
    "@vueuse/nuxt",
    "@nuxtjs/supabase",
    "@nuxt/icon",
  ],
  i18n: {
    baseUrl: process.env.NUXT_PUBLIC_SITE_URL || "https://otobisi.com",
    locales: [
      { code: "en", language: "en-US", file: "en.json", name: "English", dir: "ltr" },
      { code: "ar", language: "ar-EG", file: "ar.json", name: "عربي", dir: "rtl" },
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
  veeValidate: { autoImports: true },
  supabase: {
    redirect: false, // handle auth redirects manually via middleware, not the module default
  },
  typescript: {
    strict: true,
    // typeCheck disabled: vite-plugin-checker fails to spawn vue-tsc when the
    // project path contains spaces (this repo is under "Not Done Projects")
    typeCheck: false,
  },
  app: {
    head: {
      script: [
        {
          key: "theme-init",
          innerHTML: `(function(){try{var m=localStorage.getItem('color-mode');if(m==='dark'||(m!=='light'&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark')}else{document.documentElement.classList.remove('dark')}}catch(e){}})();`,
          type: "text/javascript",
          tagPosition: "head",
        },
      ],
    },
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "layout", mode: "out-in" },
  },
});
