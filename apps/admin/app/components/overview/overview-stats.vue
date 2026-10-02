<template>
  <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
    <div
      v-for="stat in stats"
      :key="stat.label"
      class="bg-surface-1 dark:bg-[#111927] border border-border/70 rounded-xl p-4 flex flex-col gap-2 hover:shadow-md hover:shadow-black/5 dark:hover:shadow-black/20 transition-all duration-150 group"
    >
      <!-- Header row -->
      <div class="flex items-start justify-between">
        <span
          class="text-[11px] font-semibold uppercase tracking-widest text-text-muted"
        >
          {{ stat.label }}
        </span>
        <div
          class="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 opacity-80"
          :class="stat.iconBg"
        >
          <Icon :name="stat.icon" class="w-3.5 h-3.5" :class="stat.iconColor" />
        </div>
      </div>

      <!-- Value -->
      <div class="flex items-baseline gap-2">
        <span class="text-2xl font-black text-text-primary tracking-tight">{{
          stat.value
        }}</span>
        <span v-if="stat.unit" class="text-sm font-semibold text-text-muted">{{
          stat.unit
        }}</span>
      </div>

      <!-- Delta & description -->
      <div class="flex items-center gap-2 flex-wrap">
        <span
          class="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-[11px] font-bold"
          :class="
            stat.delta > 0
              ? 'bg-emerald-100/70 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400'
              : 'bg-rose-100/70 dark:bg-rose-950/50 text-rose-700 dark:text-rose-400'
          "
        >
          <Icon
            :name="stat.delta > 0 ? 'ph:trend-up-bold' : 'ph:trend-down-bold'"
            class="w-3 h-3"
          />
          {{ stat.delta > 0 ? "+" : "" }}{{ stat.delta }}%
        </span>
        <span class="text-[11px] text-text-muted">{{ stat.description }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const stats = [
  {
    label: "Today's Bookings",
    value: "1,428",
    unit: undefined,
    delta: 12.4,
    description: "Capacity target: 1,650 vs yesterday",
    icon: "ph:ticket-duotone",
    iconBg: "bg-accent-100 dark:bg-accent-950/50",
    iconColor: "text-accent-700 dark:text-accent-400",
  },
  {
    label: "Today's Revenue",
    value: "284,650",
    unit: "EGP",
    delta: 8.2,
    description: "Avg fare: 199.3 EGP vs last week",
    icon: "ph:currency-dollar-bold",
    iconBg: "bg-orange-100 dark:bg-orange-950/50",
    iconColor: "text-orange-600 dark:text-orange-400",
  },
  {
    label: "Upcoming Trips (7D)",
    value: "314",
    unit: "trips",
    delta: 3,
    description: "18 active corridors · 3 sched.",
    icon: "ph:map-trifold-duotone",
    iconBg: "bg-indigo-100 dark:bg-indigo-950/50",
    iconColor: "text-indigo-600 dark:text-indigo-400",
  },
  {
    label: "Occupancy Rate",
    value: "86.5",
    unit: "%",
    delta: 4.1,
    description: "100% active corridors · monthly avg",
    icon: "ph:chart-pie-duotone",
    iconBg: "bg-violet-100 dark:bg-violet-950/50",
    iconColor: "text-violet-600 dark:text-violet-400",
  },
];
</script>