<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <!-- Stat 1: Total Scheduled Trips -->
    <div
      class="bg-surface-0 dark:bg-[#111927] border border-border/80 rounded-xl p-4 flex items-center justify-between shadow-xs hover:border-accent-500/40 transition-colors"
    >
      <div class="space-y-1">
        <span
          class="text-[10px] font-bold uppercase tracking-wider text-text-muted block"
        >
          TOTAL SCHEDULED TRIPS
        </span>
        <div class="flex items-baseline gap-2">
          <span
            class="text-2xl font-black text-text-primary tracking-tight font-mono"
          >
            {{ totalTrips }}
          </span>
          <span
            class="inline-flex items-center text-[11px] font-semibold text-emerald-600 dark:text-emerald-400"
          >
            +100% On Plan
          </span>
        </div>
      </div>
      <div
        class="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0"
      >
        <Icon name="ph:bus-duotone" class="w-5 h-5" />
      </div>
    </div>

    <!-- Stat 2: Active On Line -->
    <div
      class="bg-surface-0 dark:bg-[#111927] border border-border/80 rounded-xl p-4 flex items-center justify-between shadow-xs hover:border-accent-500/40 transition-colors"
    >
      <div class="space-y-1">
        <span
          class="text-[10px] font-bold uppercase tracking-wider text-text-muted block"
        >
          ACTIVE ON LINE
        </span>
        <div class="flex items-baseline gap-2">
          <span
            class="text-2xl font-black text-text-primary tracking-tight font-mono"
          >
            {{ activeTrips }}
          </span>
          <span
            class="inline-flex items-center text-[11px] font-medium text-text-muted"
          >
            87.5% Fleet rollout
          </span>
        </div>
      </div>
      <div
        class="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0"
      >
        <Icon name="ph:arrows-left-right-duotone" class="w-5 h-5" />
      </div>
    </div>

    <!-- Stat 3: Avg Corridor Occupancy -->
    <div
      class="bg-surface-0 dark:bg-[#111927] border border-border/80 rounded-xl p-4 flex items-center justify-between shadow-xs hover:border-accent-500/40 transition-colors"
    >
      <div class="space-y-1">
        <span
          class="text-[10px] font-bold uppercase tracking-wider text-text-muted block"
        >
          AVG CORRIDOR OCCUPANCY
        </span>
        <div class="flex items-baseline gap-2">
          <span
            class="text-2xl font-black text-text-primary tracking-tight font-mono"
          >
            84.2%
          </span>
          <span
            class="inline-flex items-center text-[11px] font-semibold text-emerald-600 dark:text-emerald-400"
          >
            +6.1% vs LW
          </span>
        </div>
      </div>
      <div
        class="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0"
      >
        <Icon name="ph:person-simple-duotone" class="w-5 h-5" />
      </div>
    </div>

    <!-- Stat 4: Total Seat Inventory -->
    <div
      class="bg-surface-0 dark:bg-[#111927] border border-border/80 rounded-xl p-4 flex items-center justify-between shadow-xs hover:border-accent-500/40 transition-colors"
    >
      <div class="space-y-1">
        <span
          class="text-[10px] font-bold uppercase tracking-wider text-text-muted block"
        >
          TOTAL SEAT INVENTORY
        </span>
        <div class="flex items-baseline gap-2">
          <span
            class="text-2xl font-black text-text-primary tracking-tight font-mono"
          >
            2,140
          </span>
          <span
            class="inline-flex items-center text-[11px] font-medium text-text-muted"
          >
            Seats/Day
          </span>
        </div>
      </div>
      <div
        class="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0"
      >
        <Icon name="ph:armchair-duotone" class="w-5 h-5" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  totalTrips?: number;
  activeTrips?: number;
}>();
</script>