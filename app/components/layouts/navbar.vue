<template>
  <div>
    <header
      class="border-b border-border bg-surface-1/90 sticky top-0 z-50 backdrop-blur-md"
    >
      <div
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
      >
        <!-- Logo -->
        <nuxt-link-locale to="/" class="flex items-center gap-3">
          <div
            class="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-sm shadow-orange-500/20"
          >
            <Icon name="ph:bus-duotone" class="w-5 h-5 text-white" />
          </div>
          <div class="flex items-baseline gap-1.5">
            <span
              class="text-xs font-arabic text-text-muted font-medium hidden sm:inline"
              >أوتوبيسي</span
            >
            <span class="text-xl font-bold tracking-tight text-text-primary"
              ><span class="text-amber-600">Otobisi</span></span
            >
          </div>
        </nuxt-link-locale>

        <!-- Navigation Links -->
        <nav
          class="hidden md:flex items-center gap-8 text-sm font-medium text-text-secondary"
        >
          <nuxt-link-locale
            to="#"
            class="hover:text-text-primary transition-colors"
            >Routes</nuxt-link-locale
          >
          <nuxt-link-locale
            to="#"
            class="hover:text-text-primary transition-colors"
            >Operators</nuxt-link-locale
          >
          <nuxt-link-locale
            to="/bookings"
            class="hover:text-text-primary transition-colors font-semibold text-text-primary"
            >Manage Booking</nuxt-link-locale
          >
          <a
            href="tel:19999"
            class="hover:text-text-primary transition-colors"
            >Help</a
          >
        </nav>

        <!-- Right Action items -->
        <div class="flex items-center gap-3">
          <!-- Language Switcher -->
          <LazyVToggleLocale />

          <!-- Theme Toggle -->
          <LazyVToggleTheme />

          <!-- Auth Button -->
          <button
            class="flex items-center gap-2 bg-[#A1331B] hover:bg-[#8B2B16] text-white px-4 py-2 rounded-xl text-xs font-semibold transition-all shadow-sm shadow-orange-950/10 active:scale-98"
          >
            <span>Log in / Sign up</span>
          </button>

          <nuxt-link-locale
            to="/bookings"
            title="My Bookings & Account"
            class="flex items-center justify-center bg-[#A1331B] hover:bg-[#8B2B16] text-white p-2 rounded-full text-xs font-semibold transition-all shadow-sm shadow-orange-950/10 active:scale-98"
          >
            <div class="w-4 h-4 flex items-center justify-center">
              <Icon name="material-symbols:person-outline" class="w-5 h-5" />
            </div>
          </nuxt-link-locale>
        </div>
      </div>
    </header>
  </div>
</template>

<script lang="ts" setup></script>
