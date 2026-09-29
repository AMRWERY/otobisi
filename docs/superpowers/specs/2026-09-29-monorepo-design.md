# Otobisi Monorepo Design

Date: 2026-09-29
Reference: `D:\Studying\Not Done Projects\StoreOS\storeos`

## Goal
Convert Otobisi into a pnpm + Turborepo monorepo with three Nuxt 4 apps (`web`, `admin`, `super-admin`). Each app has its own dev server and port. Shared code lives in two Nuxt layers, as in StoreOS.

## Assumptions
- Current code moves into `apps/web` via `git mv` (history kept); it keeps its `app/` srcDir.
- npm -> pnpm; `package-lock.json` removed. Current dependency versions are kept.
- Scope `@otobisi/*`. Layers: `@otobisi/core`, `@otobisi/ui`.
- `admin` and `super-admin` are minimal runnable skeletons, no features.
- Ports: web 3000, admin 3001, super-admin 3002.

## Layout
```
otobisi/
├─ apps/{web,admin,super-admin}
├─ layers/{core,ui}
├─ package.json  pnpm-workspace.yaml  turbo.json  tsconfig.base.json  .npmrc  .gitignore
```
Root scripts: `dev:web|admin|super-admin` (`turbo run dev --filter=@otobisi/<app>`), `build:*`, `build`, `lint`, `clean`. App `dev` = `nuxt dev --port=N`. `.npmrc`: `shamefully-hoist=false`, `strict-peer-dependencies=false`, `auto-install-peers=true`. `packageManager` pinned.

## Layer split
**@otobisi/ui**: `components/shared/V*.vue` and their `types/shared/*`; `main.css`, `tailwind.css`; Tailwind config (theme tokens, `surface/text/border` CSS-var colors, RTL plugin, icon safelist); theme and locale view-transition CSS.

**@otobisi/core**: module list (tailwind, pinia, i18n, vee-validate, vueuse, supabase with `redirect: false`, icon); i18n strategy `prefix` + locales en/ar; vee-validate plugin; `typeCheck: false`; composables `useTheme`, `useLocaleSwitch`, `useToast`; theme-init head script (no-flash dark mode).

**web keeps**: pages, auth/booking/search/home/bookings components, navbar/footer, `useSeo`, `useAuth`, `useBooking`, `useSearch`, `useTrips`, stores, services, en/ar message files, head tags, `siteUrl`, `baseUrl`, `routeRules`, `.env`.

i18n messages: layer starts with no messages; shared keys added only if moved components need them (Nuxt merges locale files across layers).

## Skeleton apps
`nuxt.config.ts` (extends both layers, `robots: noindex`), `package.json`, `app/app.vue`, default layout, one index page.

## Docs
Update `CLAUDE.md`: monorepo commands, layer boundaries, rule that shared code goes in layers.

## Acceptance
- `pnpm install` succeeds.
- All three dev servers boot on their ports and render `/`.
- `pnpm build:web` succeeds.
- Dark mode and locale switching still work in web.

## Risks
- Spaces in project path (same cause as `typeCheck: false`): confirm pnpm/turbo work.
- Layer components must auto-import without directory prefix.
- Tailwind `content` globs must cover layer files.
