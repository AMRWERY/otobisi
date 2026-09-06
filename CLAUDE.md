# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Otobisi (site name "Otobisi", domain otobisi.com) — a bus-ticketing search/booking site for Egypt, built on Nuxt 4. The codebase is early-stage: many composables, stores, middleware, and pages are still stub placeholders (e.g. `useAuth`, `useBooking`, `useSearch`, `booking.store.ts`, `search.store.ts`, `auth.global.ts`, `app/types/database.types.ts`, dynamic route pages) waiting to be implemented. `app/server/` and `app/supabase/` (migrations, functions) exist but are currently empty. Don't assume a stub's eventual shape — check whether it's still a placeholder before building on it.

## Commands

- `npm run dev` — start dev server (http://localhost:3000)
- `npm run build` — production build
- `npm run generate` — static generation
- `npm run preview` — preview a production build locally
- No test runner and no lint script are configured in `package.json`.
- Type checking is intentionally **disabled** (`typescript.typeCheck: false` in [nuxt.config.ts](nuxt.config.ts)) because vite-plugin-checker fails to spawn `vue-tsc` when the project path contains spaces (this repo lives under "Not Done Projects"). Don't re-enable it without fixing that constraint first.

## Architecture

This is a Nuxt 4 app using the `app/` source directory convention (Nuxt 4 default), with modules: `@nuxtjs/tailwindcss`, `@pinia/nuxt`, `@nuxtjs/i18n`, `@vee-validate/nuxt`, `@vueuse/nuxt`, `@nuxtjs/supabase`, `@nuxt/icon`.

- **Components auto-import without directory prefixing** — `components: [{ path: "components", pathPrefix: false }]` in [nuxt.config.ts](nuxt.config.ts) means `app/components/home/search-section.vue` is used as `<SearchSection>`, not `<HomeSearchSection>`. Pages use kebab-case tags (e.g. `<lazy-search-section />`).
- **i18n**: locales are `en` (default) and `ar` (RTL), configured in [nuxt.config.ts](nuxt.config.ts) with `strategy: "prefix"` and browser-language redirect on `/` only. Locale files live at `app/i18n/locales/{en,ar}.json`; formats (datetime/number) and i18n runtime options are in [app/i18n/i18n.config.ts](app/i18n/i18n.config.ts). Locale switching goes through [useLocaleSwitch](app/composables/useLocaleSwitch.ts), which wraps `setLocale`/`navigateTo` in a View Transition cross-fade.
- **Theming**: dark mode is class-based (`darkMode: "class"` in [tailwind.config.ts](tailwind.config.ts)) driven by [useTheme](app/composables/useTheme.ts) (`useDark` from VueUse, storage key `color-mode`). Colors are CSS custom properties (`--surface-*`, `--text-*`, `--border-*`) defined per-mode in [app/assets/css/main.css](app/assets/css/main.css) and exposed to Tailwind as `surface.*`/`text.*`/`border.*` in [tailwind.config.ts](tailwind.config.ts) — components should use those Tailwind classes (`bg-surface-1`, `text-text-primary`, etc.) rather than hardcoded colors, so they follow both light/dark mode automatically. Theme toggling and locale switching both use the View Transition API for animated transitions (circular reveal for theme, cross-fade for locale) with `prefers-reduced-motion` fallbacks — see the comments in `main.css` and the two composables before touching either.
- **SEO**: centralized in [useSeo](app/composables/useSeo.ts), called per-page (see [app/pages/index.vue](app/pages/index.vue)) — handles title/meta/OG/Twitter tags, canonical + hreflang alternates per locale, and JSON-LD structured data. Use the exported `buildTripSchema`/`buildBreadcrumbSchema`/`buildOrganizationSchema` helpers to build `structuredData` input rather than hand-rolling schema.org objects. `app/app.vue` only sets `dir`/`lang` via `useLocaleHead({ seo: false })` — all other head tags come from `useSeo`.
- **Supabase**: `@nuxtjs/supabase` module with `redirect: false` — auth redirects are meant to be handled manually via `app/middleware/auth.global.ts` (currently a no-op stub), not the module's default redirect behavior. Env vars: `NUXT_PUBLIC_SUPABASE_URL`, `NUXT_PUBLIC_SUPABASE_KEY`, `NUXT_SUPABASE_SECRET_KEY`.
- **State**: Pinia stores live in `app/stores/**` (configured via `pinia.storesDirs` in [nuxt.config.ts](nuxt.config.ts), which also allows a `./custom-folder/stores/**` dir if introduced later).
- **Forms**: `@vee-validate/nuxt` with `autoImports: true` — use vee-validate composables directly without manual imports.
- **Routing behavior**: `routeRules` in [nuxt.config.ts](nuxt.config.ts) disables prerendering for `/` (it shows live pricing on popular routes) and prerenders `/help/**`. Keep this in mind when adding pages with dynamic/live data vs. static content.
