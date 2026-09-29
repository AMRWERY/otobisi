# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Otobisi (site name "Otobisi", domain otobisi.com) — a bus-ticketing search/booking site for Egypt, built on Nuxt 4. The repo is a **pnpm + Turborepo monorepo** with three Nuxt apps (`apps/web`, `apps/admin`, `apps/super-admin`) sharing two Nuxt layers (`layers/core`, `layers/ui`). `admin` and `super-admin` are minimal skeletons (layout + one index page). `web` is early-stage: many composables, stores, middleware, and pages are still stub placeholders (e.g. `useAuth`, `useBooking`, `useSearch`, `booking.store.ts`, `search.store.ts`, `auth.global.ts`, `app/types/database.types.ts`, dynamic route pages) waiting to be implemented. `apps/web/app/server/` and `apps/web/app/supabase/` (migrations, functions) exist but are currently empty. Don't assume a stub's eventual shape — check whether it's still a placeholder before building on it.

## Commands

Run from the repo root (pnpm, not npm):

- `pnpm dev:web` / `pnpm dev:admin` / `pnpm dev:super-admin` — each app has its own dev server (ports 3000 / 3001 / 3002; Nuxt falls back to the next free port if one is taken)
- `pnpm build:web` / `build:admin` / `build:super-admin` — production build of one app; `pnpm build` builds all
- `pnpm clean` — remove `.nuxt`/`.output` in every package
- Per-app extras (`generate`, `preview`) run inside the app: `pnpm --filter @otobisi/web preview`
- No test runner and no lint (the `lint` scripts are no-ops) are configured.
- Env: one `.env` per app at `apps/<app>/.env` (see `.env.example`): `NUXT_PUBLIC_SUPABASE_URL`, `NUXT_PUBLIC_SUPABASE_KEY`, `NUXT_SUPABASE_SECRET_KEY`.
- Type checking is intentionally **disabled** (`typescript.typeCheck: false` in [layers/core/nuxt.config.ts](layers/core/nuxt.config.ts)) because vite-plugin-checker fails to spawn `vue-tsc` when the project path contains spaces (this repo lives under "Not Done Projects"). Don't re-enable it without fixing that constraint first.

## Monorepo layout

```
apps/web          Otobisi site (srcDir apps/web/app)
apps/admin        admin skeleton
apps/super-admin  super-admin skeleton
layers/core       @otobisi/core — modules, i18n, theme/locale composables, vee-validate plugin, supabase config
layers/ui         @otobisi/ui   — shared V* components, CSS, Tailwind theme, useToast
```

Each app does `extends: ["@otobisi/ui", "@otobisi/core"]` and depends on both via `workspace:*`.

**Rules for layers:**
- Shared code goes in a layer; app-specific code (pages, domain components, SEO, stores, services) stays in the app.
- **Never use the `~` alias inside `layers/**`** — in a layer it resolves to the consuming app's srcDir. Use relative imports. Apps import ui types as `@otobisi/ui/types/shared/<Name>`.
- Apps and layers keep their own dependencies in their own `package.json` (`shamefully-hoist=false`); a module or package used by layer code must be a dependency of that layer.

## Architecture

Nuxt 4 with modules (declared in [layers/core/nuxt.config.ts](layers/core/nuxt.config.ts)): `@nuxtjs/tailwindcss`, `@pinia/nuxt`, `@nuxtjs/i18n`, `@vee-validate/nuxt`, `@vueuse/nuxt`, `@nuxtjs/supabase`, `@nuxt/icon`.

- **Components auto-import without directory prefixing** — each app and [layers/ui/nuxt.config.ts](layers/ui/nuxt.config.ts) declare `components: [{ path: ..., pathPrefix: false }]`, so `apps/web/app/components/home/search-section.vue` is used as `<SearchSection>`, not `<HomeSearchSection>`. An app that omits its own `components` entry loses its own components. Pages use kebab-case tags (e.g. `<lazy-search-section />`).
- **i18n**: locales are `en` (default) and `ar` (RTL), configured in [layers/core/nuxt.config.ts](layers/core/nuxt.config.ts) with `strategy: "prefix"` and browser-language redirect on `/` only. The layer's `layers/core/i18n/locales/*.json` are empty; each app supplies its own messages (`apps/web/app/i18n/locales/{en,ar}.json`): the app config must set `langDir` **and** list `locales: [{ code, file }]` — without `locales` the module silently skips the app's message files. Formats (datetime/number) and runtime options are in [layers/core/i18n/i18n.config.ts](layers/core/i18n/i18n.config.ts). Locale switching goes through [useLocaleSwitch](layers/core/composables/useLocaleSwitch.ts), which wraps `setLocale`/`navigateTo` in a View Transition cross-fade. Each app's `app.vue` sets `dir`/`lang` via `useHead(useLocaleHead({ seo: false }))`.
- **Theming**: dark mode is class-based (`darkMode: "class"` in [layers/ui/tailwind.config.ts](layers/ui/tailwind.config.ts)) driven by [useTheme](layers/core/composables/useTheme.ts) (`useDark` from VueUse, storage key `color-mode`); the no-flash init script is in the core layer's head config. Colors are CSS custom properties (`--surface-*`, `--text-*`, `--border-*`) defined per-mode in [layers/ui/assets/css/main.css](layers/ui/assets/css/main.css) and exposed to Tailwind as `surface.*`/`text.*`/`border.*` — components should use those Tailwind classes (`bg-surface-1`, `text-text-primary`, etc.) rather than hardcoded colors, so they follow both light/dark mode automatically. Theme toggling and locale switching both use the View Transition API for animated transitions (circular reveal for theme, cross-fade for locale) with `prefers-reduced-motion` fallbacks — see the comments in `main.css` and the two composables before touching either. Tailwind `content` is not set in the config; `@nuxtjs/tailwindcss` scans every layer and app.
- **SEO (web)**: centralized in [useSeo](apps/web/app/composables/useSeo.ts), called per-page (see [apps/web/app/pages/index.vue](apps/web/app/pages/index.vue)) — handles title/meta/OG/Twitter tags, canonical + hreflang alternates per locale, and JSON-LD structured data. Use the exported `buildTripSchema`/`buildBreadcrumbSchema`/`buildOrganizationSchema` helpers to build `structuredData` input rather than hand-rolling schema.org objects. `admin` and `super-admin` are `noindex`.
- **Supabase**: `@nuxtjs/supabase` module (in core) with `redirect: false` — auth redirects are meant to be handled manually via `apps/web/app/middleware/auth.global.ts` (currently a no-op stub), not the module's default redirect behavior.
- **State**: Pinia stores live in `apps/web/app/stores/**` (configured via `pinia.storesDirs` in [apps/web/nuxt.config.ts](apps/web/nuxt.config.ts)).
- **Forms**: `@vee-validate/nuxt` with `autoImports: true` (core layer) — use vee-validate composables directly without manual imports. The shared plugin is [layers/core/plugins/vee-validate.ts](layers/core/plugins/vee-validate.ts).
- **Toasts**: [useToast](layers/ui/composables/useToast.ts) lives with `VToast` in the ui layer; each app renders `<LazyVToast />` in `app.vue`.
- **Routing behavior (web)**: `routeRules` in [apps/web/nuxt.config.ts](apps/web/nuxt.config.ts) disables prerendering for `/` (it shows live pricing on popular routes) and prerenders `/help/**`. Keep this in mind when adding pages with dynamic/live data vs. static content.
