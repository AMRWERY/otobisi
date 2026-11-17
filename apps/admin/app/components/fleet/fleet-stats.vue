<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <VStatCard
      label="Total Active Fleet"
      :value="total"
      icon="ph:bus"
      :progress="readyPercent"
      :footer="`${inService} ready`"
    >
      <template #footer-end>
        <VTrendBadge tone="positive" :label="`${readyPercent}%`" />
      </template>
    </VStatCard>

    <VStatCard
      label="Inspection Due"
      :value="maintenance"
      unit="next 7 days"
      icon="ph:wrench"
      footer="Depot #04 & Almaza Bay"
    >
      <template #footer-end>
        <VTrendBadge v-if="maintenance" tone="critical" label="Action" />
      </template>
    </VStatCard>

    <VStatCard
      label="Avg. Vehicle Age"
      :value="avgAge"
      unit="years"
      icon="ph:shield-check"
      footer="Euro 5 / 6 compliant"
    />

    <VStatCard
      label="Network Capacity"
      :value="seatsLabel"
      unit="live seats"
      icon="ph:chart-bar"
      :progress="readyPercent"
      footer="Cairo ⇄ Alex / Red Sea"
    >
      <template #footer-end>
        <VTrendBadge tone="neutral" :label="`${readyPercent}% used`" />
      </template>
    </VStatCard>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  total: number;
  inService: number;
  maintenance: number;
  avgAge: number;
  /** Seats across coaches that are currently in service */
  liveSeats: number;
}>();

const readyPercent = computed(() =>
  props.total ? Math.round((props.inService / props.total) * 1000) / 10 : 0,
);

const seatsLabel = computed(() => props.liveSeats.toLocaleString("en-US"));
</script>
