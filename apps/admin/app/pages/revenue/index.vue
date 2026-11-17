<template>
  <div class="px-6 py-6 space-y-5 max-w-[1600px] mx-auto">
    <lazy-revenue-header
      v-model:period="filters.period"
      v-model:date-range="filters.dateRange"
      v-model:corridor="filters.corridor"
      @export="exportCsv"
    />

    <lazy-revenue-kpis :totals="totals" />

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-5">
      <lazy-revenue-heatmap
        class="lg:col-span-8"
        :cells="heatmap"
        :peak="peak"
      />
      <lazy-revenue-alerts class="lg:col-span-4" :alerts="alerts" />
    </div>

    <lazy-revenue-trip-table :trips="filteredTrips" />
  </div>
</template>

<script lang="ts" setup>
const { filters, filteredTrips, totals, heatmap, peak, alerts, exportCsv } =
  useRevenue();

useSeoMeta({
  title: "Revenue & Occupancy",
  description:
    "Trip-level revenue, seat load and yield across Otobisi corridors, with below-target alerts.",
  private: false,
});
</script>
