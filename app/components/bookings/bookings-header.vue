<template>
  <div class="mb-6">
    <!-- Breadcrumb -->
    <nav class="flex items-center gap-1.5 text-xs text-text-muted mb-3 font-medium">
      <nuxt-link-locale to="/" class="hover:text-text-primary transition-colors flex items-center gap-1">
        <Icon name="ph:house-bold" class="w-3.5 h-3.5" />
        <span>Home</span>
      </nuxt-link-locale>
      <span class="opacity-60">/</span>
      <span class="hover:text-text-primary transition-colors cursor-pointer">My Account</span>
      <span class="opacity-60">/</span>
      <span class="text-[#A1331B] dark:text-orange-400 font-bold">My Bookings</span>
    </nav>

    <!-- Header Content Row -->
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div>
        <div class="flex items-center gap-2.5 flex-wrap">
          <h1 class="text-2xl sm:text-3xl font-black text-text-primary tracking-tight">
            My Bookings
          </h1>
          <span
            class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-orange-500/10 text-[#A1331B] dark:text-orange-400 border border-orange-500/20"
          >
            3 Records
          </span>
          <span
            class="text-xs font-arabic text-text-muted font-medium hidden sm:inline"
          >
            أوتوبيسي
          </span>
        </div>
        <p class="text-xs sm:text-sm text-text-secondary mt-1">
          Manage your upcoming journeys, view e-tickets, and review past travel history across Egypt.
        </p>
      </div>

      <!-- Action Buttons -->
      <div class="flex items-center gap-2.5 sm:gap-3 flex-wrap">
        <nuxt-link-locale
          to="/search"
          class="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#A1331B] hover:bg-[#8B2B16] text-white text-xs sm:text-sm font-bold shadow-md shadow-orange-950/10 hover:shadow-lg transition-all active:scale-98"
        >
          <Icon name="ph:plus-bold" class="w-4 h-4" />
          <span>Book a New Trip</span>
        </nuxt-link-locale>

        <a
          href="tel:19999"
          class="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-surface-1 hover:bg-surface-2 border border-border text-text-primary text-xs sm:text-sm font-bold shadow-2xs transition-colors"
        >
          <Icon name="ph:headset-bold" class="w-4 h-4 text-orange-500" />
          <span>24/7 Bus Helpdesk</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
</script>
