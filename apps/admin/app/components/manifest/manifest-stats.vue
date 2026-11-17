<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <VStatCard
      label="Seats Booked"
      :value="stats.booked"
      :unit="`/ ${capacity} seats`"
      icon="ph:ticket-bold"
      :progress="capacity ? Math.round((stats.booked / capacity) * 100) : 0"
      :footer="`${capacity - stats.booked} seats open`"
    />
    <VStatCard
      label="Boarded"
      :value="stats.boarded"
      unit="passengers"
      icon="ph:check-circle-bold"
      :progress="stats.boardedPercent"
      :footer="`${stats.pending} still pending`"
    >
      <template #footer-end>
        <VTrendBadge tone="positive" :label="`${stats.boardedPercent}%`" />
      </template>
    </VStatCard>
    <VStatCard
      label="No-shows"
      :value="stats.noShows"
      unit="passengers"
      icon="ph:user-minus-bold"
      footer="Seats can be released"
    >
      <template #footer-end>
        <VTrendBadge v-if="stats.noShows" tone="negative" :label="String(stats.noShows)" />
        <VTrendBadge v-else tone="neutral" label="None" />
      </template>
    </VStatCard>
    <VStatCard
      label="Checked Luggage"
      :value="stats.bags"
      unit="bags"
      icon="ph:suitcase-rolling-bold"
      :footer="`${stats.withNotes} passengers with notes`"
    />
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  capacity: number;
  stats: {
    booked: number;
    boarded: number;
    boardedPercent: number;
    noShows: number;
    pending: number;
    bags: number;
    withNotes: number;
  };
}>();
</script>
