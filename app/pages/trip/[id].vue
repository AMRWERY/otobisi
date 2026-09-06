<template>
  <div class="min-h-screen bg-surface-0 py-8 px-4 sm:px-6 lg:px-8 text-start">
    <div class="max-w-4xl mx-auto">
      <!-- Back to Search Results Link -->
      <button
        type="button"
        class="inline-flex items-center gap-1.5 text-xs font-bold text-orange-500 hover:text-orange-600 mb-6 transition-colors"
        @click="$router.back()"
      >
        <Icon name="ph:arrow-left-bold" class="w-4 h-4 rtl:rotate-180" />
        <span>Back to search results</span>
      </button>

      <!-- Trip Seat Selection Header Card -->
      <div class="bg-surface-1 border border-border rounded-2xl p-6 shadow-sm mb-6">
        <div class="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border">
          <div>
            <span class="text-xs font-bold text-amber-600 uppercase tracking-wider">Trip Selection</span>
            <h1 class="text-xl sm:text-2xl font-black text-text-primary mt-0.5">
              Select Your Seats
            </h1>
            <p class="text-xs text-text-secondary mt-1">
              Trip ID: <span class="font-mono text-text-primary font-bold">{{ $route.params.id }}</span> • Cairo ⇄ Alexandria
            </p>
          </div>

          <div class="flex items-center gap-2">
            <span class="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-bold border border-emerald-500/20 flex items-center gap-1.5">
              <Icon name="ph:seal-check-fill" class="w-4 h-4" />
              Live Central Dispatch
            </span>
          </div>
        </div>

        <div class="mt-4 p-4 rounded-xl bg-surface-2 border border-border text-xs text-text-secondary flex items-center gap-3">
          <Icon name="ph:info-bold" class="w-5 h-5 text-orange-500 shrink-0" />
          <span>Interactive seat layout (MCV 600 / Travego 16 SHD) will be initialized here. Guaranteed seat reservations with instant digital QR tickets.</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
</script>