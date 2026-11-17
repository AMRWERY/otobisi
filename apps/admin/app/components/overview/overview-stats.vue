<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
    <VStatCard
      v-for="stat in stats"
      :key="stat.label"
      :label="stat.label"
      :value="stat.value"
      :unit="stat.unit"
      :icon="stat.icon"
      :delta="stat.delta"
      :footer="stat.description"
      :progress="stat.progress"
    />
  </div>
</template>

<script lang="ts" setup>
const stats = [
  {
    label: "Today's Bookings",
    value: "1,428",
    unit: "tickets",
    delta: 12.4,
    description: "Target 1,650 vs yesterday",
    icon: "ph:ticket-duotone",
  },
  {
    label: "Today's Revenue",
    value: "284,650",
    unit: "EGP",
    delta: 8.2,
    description: "Avg fare 199.3 EGP",
    icon: "ph:currency-dollar-bold",
  },
  {
    label: "Upcoming Trips (7D)",
    value: "314",
    unit: "trips",
    delta: 3,
    description: "18 active corridors",
    icon: "ph:map-trifold-duotone",
  },
  {
    label: "Occupancy Rate",
    value: "86.5",
    unit: "%",
    delta: 4.1,
    description: "Monthly average",
    icon: "ph:chart-pie-duotone",
    progress: 86.5,
  },
];
</script>
