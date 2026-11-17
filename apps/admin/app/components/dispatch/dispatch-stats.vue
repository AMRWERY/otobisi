<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <VStatCard
      label="Buses On Road"
      :value="onRoad"
      :unit="`/ ${total} active`"
      icon="ph:bus-bold"
      :progress="total ? Math.round((onRoad / total) * 100) : 0"
      :footer="`${passengers} passengers aboard`"
    />
    <VStatCard
      label="Delayed Departures"
      :value="delayed"
      unit="trips"
      icon="ph:clock-countdown-bold"
      footer="Over 15 min behind schedule"
    >
      <template #footer-end>
        <VTrendBadge v-if="delayed" tone="critical" label="Action" />
        <VTrendBadge v-else tone="positive" label="Clear" />
      </template>
    </VStatCard>
    <VStatCard
      label="Avg Network Speed"
      :value="avgSpeed"
      unit="km/h"
      icon="ph:gauge-bold"
      footer="Moving buses only"
    />
    <VStatCard
      label="Boarding Now"
      :value="boarding"
      unit="gates open"
      icon="ph:door-open-bold"
      footer="Next departures from Almaza"
      :inactive="!boarding"
      inactive-text="No gates open"
    />
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  onRoad: number;
  total: number;
  delayed: number;
  avgSpeed: number;
  boarding: number;
  passengers: number;
}>();
</script>
