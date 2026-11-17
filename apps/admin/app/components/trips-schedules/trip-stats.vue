<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <VStatCard
      label="Total Scheduled Trips"
      :value="totalTrips ?? 0"
      icon="ph:bus-duotone"
      :delta="100"
      footer="On plan"
    />
    <VStatCard
      label="Active On Line"
      :value="activeTrips ?? 0"
      icon="ph:arrows-left-right-duotone"
      footer="87.5% fleet rollout"
    />
    <VStatCard
      label="Avg Corridor Occupancy"
      value="84.2"
      unit="%"
      icon="ph:person-simple-duotone"
      :progress="84.2"
      :delta="6.1"
      footer="vs last week"
    />
    <VStatCard
      label="Total Seat Inventory"
      value="2,140"
      unit="seats / day"
      icon="ph:armchair-duotone"
    />
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  totalTrips?: number;
  activeTrips?: number;
}>();
</script>
