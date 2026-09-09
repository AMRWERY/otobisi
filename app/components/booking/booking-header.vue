<template>
  <header
    class="border-b border-border bg-surface-1/90 backdrop-blur-md sticky top-16 z-30"
  >
    <div
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4"
    >
      <!-- Back Button & Hold Timer Badge -->
      <div class="flex items-center gap-3">
        <button
          type="button"
          class="inline-flex items-center gap-1.5 text-xs font-semibold text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
          @click="$emit('back')"
        >
          <Icon name="ph:arrow-left-bold" class="w-3.5 h-3.5 rtl:rotate-180" />
          <span>Back to Seat Selection</span>
        </button>

        <span class="text-text-muted select-none">|</span>

        <!-- Seat Hold Timer Badge -->
        <div
          class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/80 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 border border-amber-300/80 dark:border-amber-700/50 text-xs font-bold shadow-2xs"
        >
          <Icon
            name="ph:clock-countdown-bold"
            class="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 animate-pulse"
          />
          <span>Seats held for {{ holdTimerDisplay }}</span>
        </div>
      </div>

      <!-- 2-Step Checkout Stepper -->
      <div class="flex items-center gap-3 text-xs font-bold">
        <div class="flex items-center gap-2 text-text-primary">
          <span
            class="w-5 h-5 rounded-full bg-[#A1331B] text-white flex items-center justify-center text-[10px] font-black shadow-xs"
          >
            1
          </span>
          <span class="text-[#A1331B] dark:text-orange-400"
            >Passenger Details</span
          >
        </div>

        <span class="w-8 h-px bg-border"></span>

        <div class="flex items-center gap-2 text-text-muted">
          <span
            class="w-5 h-5 rounded-full border border-border text-text-muted flex items-center justify-center text-[10px] font-black"
          >
            2
          </span>
          <span>Payment</span>
        </div>
      </div>
    </div>

    <!-- Trip Context Sub-bar Ribbon -->
    <div
      class="bg-surface-2 border-t border-border px-4 sm:px-6 lg:px-8 py-2 text-xs"
    >
      <div
        class="max-w-7xl mx-auto flex flex-wrap items-center gap-2 sm:gap-3 text-text-secondary font-medium"
      >
        <span
          class="px-2 py-0.5 rounded bg-orange-500/10 text-[#A1331B] dark:text-orange-400 font-extrabold text-[10px] uppercase tracking-wider"
        >
          Trip Context
        </span>

        <span class="font-bold text-text-primary">
          {{ trip.departureCity }} ({{ trip.departureStation }})
          <span class="text-text-muted mx-0.5">→</span>
          {{ trip.arrivalCity }} ({{ trip.arrivalStation }})
        </span>

        <span class="text-text-muted hidden sm:inline">•</span>
        <span class="hidden sm:inline">{{ formattedDate }}</span>

        <span class="text-text-muted hidden md:inline">•</span>
        <span class="hidden md:inline">{{ trip.departureTime }} Departure</span>

        <span class="text-text-muted hidden lg:inline">•</span>
        <span
          class="hidden lg:inline-flex items-center gap-1 font-bold text-orange-600 dark:text-orange-400"
        >
          <Icon name="ph:bus-fill" class="w-3 h-3" />
          {{ trip.operatorName }} {{ trip.busClass }}
        </span>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import type { Trip } from "~/types/search/results";

defineProps<{
  trip: Trip;
  formattedDate: string;
  holdTimerDisplay: string;
}>();

defineEmits<{
  (e: "back"): void;
}>();
</script>