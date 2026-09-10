<template>
  <div class="sticky top-0 z-50 transition-colors">
    <header
      class="border-b border-border/70 bg-surface-0/90 dark:bg-[#0B0F19]/90 backdrop-blur-md transition-all duration-200"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center justify-between gap-4">
        
        <!-- ─── START: BRAND LOGO ─── -->
        <nuxt-link-locale
          to="/"
          class="flex items-center gap-3 shrink-0 group select-none cursor-pointer"
          title="Home - Otobisi"
        >
          <!-- Logo Mark with Egyptian Orange Gradient -->
          <div
            class="w-10 h-10 rounded-xl bg-gradient-to-br from-[#EA580C] to-[#C2410C] flex items-center justify-center text-white shadow-md shadow-orange-950/15 group-hover:scale-105 transition-transform duration-200"
          >
            <Icon name="ph:bus-duotone" class="w-6 h-6 text-white" />
          </div>

          <!-- Brand Title & Subtitle -->
          <div class="flex flex-col">
            <div class="flex items-baseline gap-1">
              <span class="text-xl font-black tracking-tight text-text-primary group-hover:text-[#EA580C] transition-colors">
                Otobisi<span class="text-[#EA580C]">.</span>
              </span>
            </div>
            <span class="text-[10px] text-text-muted font-medium leading-none mt-0.5">
              Egypt Intercity Transit
            </span>
          </div>
        </nuxt-link-locale>

        <!-- ─── CENTER: NAVIGATION LINKS (DESKTOP) ─── -->
        <nav
          class="hidden md:flex items-center justify-center gap-1 lg:gap-2 px-2 py-1 rounded-2xl bg-surface-1/80 dark:bg-[#131B2E]/60 border border-border/50 shadow-2xs"
          aria-label="Main Navigation"
        >
          <nuxt-link-locale
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            class="relative px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-150 flex items-center gap-2 group whitespace-nowrap cursor-pointer"
            :class="[
              isActive(link.path)
                ? 'text-[#EA580C] dark:text-orange-400 bg-surface-0 dark:bg-[#1B2438] shadow-xs'
                : 'text-text-secondary hover:text-text-primary hover:bg-surface-0/60 dark:hover:bg-[#1B2438]/50'
            ]"
          >
            <!-- Active Orange Dot indicator -->
            <span
              v-if="isActive(link.path)"
              class="w-1.5 h-1.5 rounded-full bg-[#EA580C] dark:bg-orange-400 animate-pulse"
            />
            <Icon :name="link.icon" class="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />
            <span>{{ link.label }}</span>

            <!-- Badge Count (e.g. My Bookings = 1) -->
            <span
              v-if="link.badge"
              class="w-4 h-4 rounded-full bg-orange-100 dark:bg-orange-950/80 text-[#EA580C] dark:text-orange-300 text-[10px] font-black flex items-center justify-center border border-orange-300/40 dark:border-orange-600/40"
            >
              {{ link.badge }}
            </span>
          </nuxt-link-locale>
        </nav>

        <!-- ─── END: UTILITY CLUSTER (DESKTOP) ─── -->
        <div class="hidden md:flex items-center gap-2.5 shrink-0">
          
          <!-- Language Toggle Pill (EN / العربية) -->
          <div
            dir="ltr"
            class="inline-flex items-center p-0.5 bg-[#EEF2F6] dark:bg-[#131B2E] rounded-xl border border-border/60 select-none text-xs font-semibold"
          >
            <button
              type="button"
              class="px-2.5 py-1 rounded-lg transition-all duration-200 cursor-pointer font-bold text-xs"
              :class="[
                locale === 'en'
                  ? 'bg-surface-0 dark:bg-[#1B2438] text-[#EA580C] dark:text-orange-400 shadow-xs'
                  : 'text-text-secondary hover:text-text-primary bg-transparent'
              ]"
              aria-label="Switch to English"
              @click="switchLocale('en')"
            >
              EN
            </button>
            <button
              type="button"
              class="px-2.5 py-1 rounded-lg transition-all duration-200 cursor-pointer font-bold font-arabic text-xs"
              :class="[
                locale === 'ar'
                  ? 'bg-surface-0 dark:bg-[#1B2438] text-[#EA580C] dark:text-orange-400 shadow-xs'
                  : 'text-text-secondary hover:text-text-primary bg-transparent'
              ]"
              aria-label="التبديل إلى العربية"
              @click="switchLocale('ar')"
            >
              العربية
            </button>
          </div>

          <!-- Sliding Theme Toggle (Sun / Moon) -->
          <button
            type="button"
            class="relative w-14 h-8 p-1 rounded-full bg-[#EEF2F6] dark:bg-[#131B2E] border border-border/60 cursor-pointer transition-colors duration-200 flex items-center justify-between"
            :aria-label="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
            @click="toggleDark"
          >
            <!-- Background Icons -->
            <Icon name="ph:sun-bold" class="w-3.5 h-3.5 text-amber-500 z-0 ml-1" />
            <Icon name="ph:moon-bold" class="w-3.5 h-3.5 text-slate-400 dark:text-orange-400 z-0 mr-1" />

            <!-- Sliding Circle Thumb -->
            <span
              class="absolute top-1 left-1 w-6 h-6 rounded-full bg-surface-0 dark:bg-[#1E293B] shadow-sm flex items-center justify-center transition-transform duration-250 ease-out border border-border/40"
              :class="isDark ? 'translate-x-6' : 'translate-x-0'"
            >
              <Icon
                :name="isDark ? 'ph:moon-fill' : 'ph:sun-fill'"
                class="w-3.5 h-3.5"
                :class="isDark ? 'text-orange-400' : 'text-amber-500'"
              />
            </span>
          </button>

          <!-- User / Auth Cluster -->
          <div class="relative">
            <!-- Logged In State (Ahmed M.) -->
            <div v-if="isLoggedIn" class="relative">
              <button
                type="button"
                class="flex items-center gap-2 p-1.5 pr-2.5 rounded-xl bg-surface-1/80 dark:bg-[#131B2E] hover:bg-surface-2 dark:hover:bg-[#1B2438] border border-border/60 transition-colors cursor-pointer text-start"
                @click="userDropdownOpen = !userDropdownOpen"
              >
                <!-- Avatar Circle with Initial -->
                <div
                  class="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-[#EA580C] text-white flex items-center justify-center font-bold text-xs shadow-xs"
                >
                  AM
                </div>
                <div class="flex flex-col">
                  <span class="text-xs font-extrabold text-text-primary leading-tight">
                    Ahmed M.
                  </span>
                  <span class="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold leading-none flex items-center gap-1">
                    <Icon name="ph:seal-check-fill" class="w-3 h-3 text-emerald-500" />
                    Verified Traveler
                  </span>
                </div>
                <Icon
                  name="ph:caret-down-bold"
                  class="w-3.5 h-3.5 text-text-muted transition-transform duration-200"
                  :class="{ 'rotate-180': userDropdownOpen }"
                />
              </button>

              <!-- Profile Dropdown Menu -->
              <transition
                enter-active-class="transition duration-150 ease-out"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition duration-100 ease-in"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <div
                  v-if="userDropdownOpen"
                  class="absolute top-full mt-2 w-56 rounded-2xl bg-surface-0 dark:bg-[#131B2E] border border-border dark:border-[#1E293B] shadow-xl p-2 z-50 right-0"
                >
                  <div class="px-3 py-2 border-b border-border/50 mb-1">
                    <p class="text-xs font-bold text-text-primary">
                      Ahmed M.
                    </p>
                    <p class="text-[11px] text-text-muted font-mono">+20 10 1234 5678</p>
                  </div>
                  <nuxt-link-locale
                    to="/bookings"
                    class="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-text-secondary hover:text-text-primary hover:bg-surface-1 dark:hover:bg-[#1B2438] transition-colors"
                    @click="userDropdownOpen = false"
                  >
                    <div class="flex items-center gap-2">
                      <Icon name="ph:ticket-bold" class="w-4 h-4 text-[#EA580C]" />
                      <span>My Bookings</span>
                    </div>
                    <span class="w-4 h-4 rounded-full bg-orange-100 dark:bg-orange-950 text-[#EA580C] text-[10px] font-bold flex items-center justify-center">1</span>
                  </nuxt-link-locale>
                  <nuxt-link-locale
                    to="/help"
                    class="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-text-secondary hover:text-text-primary hover:bg-surface-1 dark:hover:bg-[#1B2438] transition-colors"
                    @click="userDropdownOpen = false"
                  >
                    <Icon name="ph:headset-bold" class="w-4 h-4 text-[#EA580C]" />
                    <span>Help & Support</span>
                  </nuxt-link-locale>
                  <div class="border-t border-border/50 my-1 pt-1">
                    <button
                      type="button"
                      class="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
                      @click="toggleAuth"
                    >
                      <Icon name="ph:sign-out-bold" class="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              </transition>
            </div>

            <!-- Guest State (Log in / Sign up CTA) -->
            <div v-else class="flex items-center gap-2">
              <nuxt-link-locale
                to="/auth/login"
                class="flex items-center gap-2 bg-gradient-to-r from-[#EA580C] to-[#C2410C] hover:opacity-95 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm shadow-orange-950/15 active:scale-98 cursor-pointer"
              >
                <Icon name="ph:user-bold" class="w-3.5 h-3.5" />
                <span>Log In / Sign Up</span>
              </nuxt-link-locale>
            </div>
          </div>

        </div>

        <!-- ─── MOBILE CONTROLS (THEME + HAMBURGER TRIGGER) ─── -->
        <div class="flex md:hidden items-center gap-2">
          
          <!-- Mobile Theme Toggle -->
          <button
            type="button"
            class="relative w-12 h-7 p-0.5 rounded-full bg-[#EEF2F6] dark:bg-[#131B2E] border border-border/60 cursor-pointer flex items-center justify-between"
            :aria-label="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
            @click="toggleDark"
          >
            <Icon name="ph:sun-bold" class="w-3 h-3 text-amber-500 z-0 ml-1" />
            <Icon name="ph:moon-bold" class="w-3 h-3 text-slate-400 dark:text-orange-400 z-0 mr-1" />
            <span
              class="absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-surface-0 dark:bg-[#1E293B] shadow-sm flex items-center justify-center transition-transform duration-250 ease-out border border-border/40"
              :class="isDark ? 'translate-x-5' : 'translate-x-0'"
            >
              <Icon
                :name="isDark ? 'ph:moon-fill' : 'ph:sun-fill'"
                class="w-3 h-3"
                :class="isDark ? 'text-orange-400' : 'text-amber-500'"
              />
            </span>
          </button>

          <!-- Mobile Hamburger Drawer Trigger -->
          <button
            type="button"
            class="w-10 h-10 rounded-xl bg-surface-1 dark:bg-[#131B2E] border border-border/60 flex items-center justify-center text-text-primary hover:text-[#EA580C] transition-colors cursor-pointer"
            aria-label="Open Mobile Menu"
            @click="mobileDrawerOpen = true"
          >
            <Icon name="ph:list-bold" class="w-5 h-5" />
          </button>
        </div>

      </div>
    </header>

    <!-- ─── MOBILE SLIDE-OUT DRAWER (375px SPECIFICATION) ─── -->
    <teleport to="body">
      <!-- Backdrop overlay -->
      <transition
        enter-active-class="transition-opacity duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="mobileDrawerOpen"
          class="fixed inset-0 bg-black/60 backdrop-blur-xs z-50"
          @click="mobileDrawerOpen = false"
        />
      </transition>

      <!-- Slide-Out Drawer Panel -->
      <transition
        enter-active-class="transition-transform duration-300 ease-out"
        enter-from-class="translate-x-full"
        enter-to-class="translate-x-0"
        leave-active-class="transition-transform duration-200 ease-in"
        leave-from-class="translate-x-0"
        leave-to-class="translate-x-full"
      >
        <div
          v-if="mobileDrawerOpen"
          class="fixed top-0 bottom-0 right-0 w-5/6 max-w-xs bg-surface-0 dark:bg-[#0B0F19] border-l border-border dark:border-[#131B2E] shadow-2xl z-50 flex flex-col justify-between overflow-y-auto"
        >
          <!-- Drawer Top Content -->
          <div class="p-5 space-y-5">
            <!-- Header: Logo + Close Button -->
            <div class="flex items-center justify-between pb-3 border-b border-border/50">
              <div class="flex items-center gap-2.5">
                <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-[#EA580C] to-[#C2410C] flex items-center justify-center text-white shadow-sm">
                  <Icon name="ph:bus-duotone" class="w-5 h-5 text-white" />
                </div>
                <span class="text-lg font-black tracking-tight text-text-primary">
                  Otobisi
                </span>
              </div>
              <button
                type="button"
                class="w-8 h-8 rounded-lg bg-surface-1 dark:bg-[#131B2E] text-text-muted hover:text-text-primary flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close Menu"
                @click="mobileDrawerOpen = false"
              >
                <Icon name="ph:x-bold" class="w-4 h-4" />
              </button>
            </div>

            <!-- User Profile Card -->
            <div
              v-if="isLoggedIn"
              class="p-3.5 rounded-2xl bg-surface-1 dark:bg-[#131B2E] border border-border/60 flex items-center gap-3"
            >
              <div class="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-[#EA580C] text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
                AM
              </div>
              <div class="flex-1 min-w-0">
                <h4 class="text-xs font-extrabold text-text-primary truncate">
                  Ahmed M.
                </h4>
                <p class="text-[11px] text-text-muted font-mono truncate">
                  +20 10 1234 5678
                </p>
              </div>
            </div>

            <!-- Guest Login Card -->
            <div
              v-else
              class="p-4 rounded-2xl bg-gradient-to-br from-orange-500/10 to-amber-500/5 dark:from-orange-500/15 dark:to-transparent border border-orange-500/20 text-start"
            >
              <h4 class="text-xs font-bold text-text-primary mb-1">
                Welcome to Otobisi
              </h4>
              <p class="text-[11px] text-text-secondary mb-3">
                Sign in to access your bookings and travel perks
              </p>
              <nuxt-link-locale
                to="/auth/login"
                class="w-full bg-[#EA580C] hover:bg-[#C2410C] text-white py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all"
                @click="mobileDrawerOpen = false"
              >
                <Icon name="ph:user-bold" class="w-3.5 h-3.5" />
                <span>Log In / Sign Up</span>
              </nuxt-link-locale>
            </div>

            <!-- Navigation Links (48px Touch Targets) -->
            <div class="space-y-1.5">
              <nuxt-link-locale
                v-for="link in navLinks"
                :key="link.path"
                :to="link.path"
                class="flex items-center justify-between min-h-[48px] px-3.5 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                :class="[
                  isActive(link.path)
                    ? 'bg-orange-50 dark:bg-orange-950/40 text-[#EA580C] dark:text-orange-400 border border-orange-200/60 dark:border-orange-900/50'
                    : 'text-text-primary hover:bg-surface-1 dark:hover:bg-[#131B2E]'
                ]"
                @click="mobileDrawerOpen = false"
              >
                <div class="flex items-center gap-3">
                  <span
                    v-if="isActive(link.path)"
                    class="w-1.5 h-1.5 rounded-full bg-[#EA580C] dark:bg-orange-400"
                  />
                  <Icon :name="link.icon" class="w-4 h-4 text-[#EA580C]" />
                  <span>{{ link.label }}</span>
                </div>
                <span
                  v-if="link.badge"
                  class="w-5 h-5 rounded-full bg-orange-100 dark:bg-orange-950 text-[#EA580C] text-[10px] font-black flex items-center justify-center"
                >
                  {{ link.badge }}
                </span>
              </nuxt-link-locale>
            </div>

            <!-- Language Switcher Card -->
            <div class="p-3 rounded-2xl bg-surface-1 dark:bg-[#131B2E] border border-border/60">
              <div class="flex items-center justify-between mb-2">
                <span class="text-[10px] font-extrabold uppercase tracking-wider text-text-muted">
                  LANGUAGE
                </span>
                <Icon name="ph:globe-bold" class="w-3.5 h-3.5 text-text-muted" />
              </div>
              <div class="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  class="py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  :class="[
                    locale === 'en'
                      ? 'bg-[#EA580C] text-white shadow-xs'
                      : 'bg-surface-0 dark:bg-[#1B2438] text-text-secondary hover:text-text-primary'
                  ]"
                  @click="switchLocale('en'); mobileDrawerOpen = false"
                >
                  <span>English</span>
                </button>
                <button
                  type="button"
                  class="py-2 px-3 rounded-xl text-xs font-bold font-arabic transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  :class="[
                    locale === 'ar'
                      ? 'bg-[#EA580C] text-white shadow-xs'
                      : 'bg-surface-0 dark:bg-[#1B2438] text-text-secondary hover:text-text-primary'
                  ]"
                  @click="switchLocale('ar'); mobileDrawerOpen = false"
                >
                  <span>العربية</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Drawer Footer: Helpline Contact -->
          <div class="p-5 border-t border-border/50 bg-surface-1/50 dark:bg-[#0E1424]">
            <a
              href="tel:19999"
              class="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-surface-0 dark:bg-[#131B2E] border border-border/70 text-xs font-bold text-[#EA580C] dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-950/30 transition-colors shadow-2xs"
            >
              <Icon name="ph:phone-call-fill" class="w-4 h-4 text-[#EA580C]" />
              <span>Helpline: 19XXX (24/7)</span>
            </a>
          </div>
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const localePath = useLocalePath();
const { locale, switchLocale } = useLocaleSwitch();
const { isDark, toggleDark } = useTheme();

// ─── Reactive States ─────────────────────────────────────────────────────────
const mobileDrawerOpen = ref(false);
const userDropdownOpen = ref(false);
const isLoggedIn = ref(true); // Default to verified traveler as specified in Variant 1A

const toggleAuth = () => {
  isLoggedIn.value = !isLoggedIn.value;
  userDropdownOpen.value = false;
};

// ─── Navigation Links (English) ──────────────────────────────────────────────
const navLinks = [
  {
    label: 'Search Trips',
    path: '/',
    icon: 'ph:magnifying-glass-bold',
    badge: null,
  },
  {
    label: 'My Bookings',
    path: '/bookings',
    icon: 'ph:ticket-bold',
    badge: 1,
  },
  {
    label: 'Help & Support',
    path: '/help',
    icon: 'ph:headset-bold',
    badge: null,
  },
];

// ─── Active Route Helper ─────────────────────────────────────────────────────
const isActive = (path: string) => {
  const resolved = localePath(path);
  if (path === '/') {
    return route.path === resolved || route.path === `${resolved}/`;
  }
  return route.path === resolved || route.path.startsWith(resolved + '/');
};

// Close dropdown on outside click
onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.relative')) {
        userDropdownOpen.value = false;
      }
    });
  }
});
</script>
