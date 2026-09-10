<template>
  <div class="mt-8 mb-6 p-5 sm:p-6 rounded-2xl bg-surface-1 border border-border shadow-xs">
    <!-- Header -->
    <div class="flex items-center justify-between gap-3 mb-4">
      <div>
        <span class="text-[10px] font-black uppercase text-[#A1331B] dark:text-orange-400 tracking-wider block">
          Plan Your Next Trip
        </span>
        <h3 class="text-base sm:text-lg font-black text-text-primary">
          Popular Intercity Bus Routes from Cairo
        </h3>
      </div>

      <nuxt-link-locale
        to="/search"
        class="inline-flex items-center gap-1 text-xs font-bold text-[#A1331B] dark:text-orange-400 hover:underline group"
      >
        <span>View all routes</span>
        <Icon name="ph:arrow-right-bold" class="w-3.5 h-3.5 icon-arrow-animated" />
      </nuxt-link-locale>
    </div>

    <!-- 4 Route Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
      <!-- 1. Cairo -> Alexandria -->
      <nuxt-link-locale
        to="/search?from=Cairo&to=Alexandria"
        class="p-3.5 rounded-xl bg-surface-2 hover:bg-surface-0 border border-border hover:border-orange-500/40 transition-all group flex flex-col justify-between"
      >
        <div class="flex items-center justify-between gap-2 mb-2">
          <span class="px-2 py-0.5 rounded text-[10px] font-extrabold bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20">
            Every 20 mins
          </span>
          <Icon name="ph:arrow-up-right-bold" class="w-3.5 h-3.5 text-text-muted group-hover:text-orange-500 transition-colors" />
        </div>
        <div>
          <h4 class="font-bold text-sm text-text-primary group-hover:text-[#A1331B] dark:group-hover:text-orange-400 transition-colors">
            Cairo → Alexandria
          </h4>
          <div class="flex items-center justify-between text-xs text-text-muted mt-1.5 font-medium">
            <span>2h 45m</span>
            <span class="font-bold text-text-primary">From 110 EGP</span>
          </div>
        </div>
      </nuxt-link-locale>

      <!-- 2. Cairo -> Hurghada -->
      <nuxt-link-locale
        to="/search?from=Cairo&to=Hurghada"
        class="p-3.5 rounded-xl bg-surface-2 hover:bg-surface-0 border border-border hover:border-orange-500/40 transition-all group flex flex-col justify-between"
      >
        <div class="flex items-center justify-between gap-2 mb-2">
          <span class="px-2 py-0.5 rounded text-[10px] font-extrabold bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/20">
            Red Sea Direct
          </span>
          <Icon name="ph:arrow-up-right-bold" class="w-3.5 h-3.5 text-text-muted group-hover:text-orange-500 transition-colors" />
        </div>
        <div>
          <h4 class="font-bold text-sm text-text-primary group-hover:text-[#A1331B] dark:group-hover:text-orange-400 transition-colors">
            Cairo → Hurghada
          </h4>
          <div class="flex items-center justify-between text-xs text-text-muted mt-1.5 font-medium">
            <span>5h 00m</span>
            <span class="font-bold text-text-primary">From 240 EGP</span>
          </div>
        </div>
      </nuxt-link-locale>

      <!-- 3. Cairo -> Sharm El Sheikh -->
      <nuxt-link-locale
        to="/search?from=Cairo&to=Sharm"
        class="p-3.5 rounded-xl bg-surface-2 hover:bg-surface-0 border border-border hover:border-orange-500/40 transition-all group flex flex-col justify-between"
      >
        <div class="flex items-center justify-between gap-2 mb-2">
          <span class="px-2 py-0.5 rounded text-[10px] font-extrabold bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20">
            Sinai Express
          </span>
          <Icon name="ph:arrow-up-right-bold" class="w-3.5 h-3.5 text-text-muted group-hover:text-orange-500 transition-colors" />
        </div>
        <div>
          <h4 class="font-bold text-sm text-text-primary group-hover:text-[#A1331B] dark:group-hover:text-orange-400 transition-colors">
            Cairo → Sharm El Sheikh
          </h4>
          <div class="flex items-center justify-between text-xs text-text-muted mt-1.5 font-medium">
            <span>6h 30m</span>
            <span class="font-bold text-text-primary">From 270 EGP</span>
          </div>
        </div>
      </nuxt-link-locale>

      <!-- 4. Cairo -> Luxor -->
      <nuxt-link-locale
        to="/search?from=Cairo&to=Luxor"
        class="p-3.5 rounded-xl bg-surface-2 hover:bg-surface-0 border border-border hover:border-orange-500/40 transition-all group flex flex-col justify-between"
      >
        <div class="flex items-center justify-between gap-2 mb-2">
          <span class="px-2 py-0.5 rounded text-[10px] font-extrabold bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/20">
            Overnight Sleeper
          </span>
          <Icon name="ph:arrow-up-right-bold" class="w-3.5 h-3.5 text-text-muted group-hover:text-orange-500 transition-colors" />
        </div>
        <div>
          <h4 class="font-bold text-sm text-text-primary group-hover:text-[#A1331B] dark:group-hover:text-orange-400 transition-colors">
            Cairo → Luxor
          </h4>
          <div class="flex items-center justify-between text-xs text-text-muted mt-1.5 font-medium">
            <span>9h 15m</span>
            <span class="font-bold text-text-primary">From 330 EGP</span>
          </div>
        </div>
      </nuxt-link-locale>
    </div>
  </div>
</template>

<script lang="ts" setup>
</script>
