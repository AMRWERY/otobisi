<template>
  <reports-card
    title="Gross Revenue by Route Corridor"
    subtitle="Top performing intercity links for selected period"
  >
    <template #aside>
      <VTabs v-model="metric" :tabs="CORRIDOR_METRIC_TABS" />
    </template>

    <div class="space-y-3 mt-4">
      <div v-for="route in rows" :key="route.id" class="text-xs font-mono">
        <div class="flex items-center justify-between gap-3 mb-1">
          <div class="flex items-center gap-2 min-w-0">
            <span :class="['w-2 h-2 rounded-full shrink-0', route.color]" />
            <span class="font-bold text-text-primary truncate">
              {{ route.name }}
            </span>
          </div>
          <div class="flex items-center gap-3 shrink-0">
            <span class="text-text-muted text-[11px] hidden sm:inline">
              {{ route.trips }} trips/day • {{ route.occupancy }}% occ
            </span>
            <span class="font-bold text-text-primary tabular-nums">
              {{ route.value.toLocaleString("en-US") }}
              {{ metric === "revenue" ? "EGP" : "pax" }}
            </span>
          </div>
        </div>
        <div class="w-full h-1.5 rounded-full overflow-hidden bg-surface-2">
          <div
            :class="['h-full rounded-full transition-all duration-500', route.color]"
            :style="{ width: `${route.percentage}%` }"
          />
        </div>
      </div>
    </div>

    <template #footer>
      <span>
        ℹ Cairo-Alex accounts for {{ topShare }}% of total operator yield
      </span>
      <NuxtLinkLocale
        to="/revenue"
        class="text-accent-700 dark:text-accent-300 font-bold hover:underline flex items-center gap-1"
      >
        <span>View Detailed Route Matrix</span>
        <Icon name="ph:arrow-right-bold" class="w-3 h-3 rtl:rotate-180" />
      </NuxtLinkLocale>
    </template>
  </reports-card>
</template>

<script lang="ts" setup>
import type { CorridorMetric, CorridorRevenue } from "~/types/report";

const props = defineProps<{
  corridors: CorridorRevenue[];
  topShare: number;
}>();

const metric = ref<CorridorMetric>("revenue");

// Bars are scaled against the largest corridor for the active metric
const rows = computed(() => {
  const withValue = props.corridors.map((c) => ({
    ...c,
    value: metric.value === "revenue" ? c.revenue : c.pax,
  }));
  const max = Math.max(...withValue.map((c) => c.value), 1);
  return withValue.map((c) => ({ ...c, percentage: (c.value / max) * 100 }));
});
</script>
