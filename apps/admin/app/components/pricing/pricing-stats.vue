<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <VStatCard
      label="Avg Fare Uplift"
      :value="`${stats.avgUplift > 0 ? '+' : ''}${stats.avgUplift}`"
      unit="%"
      icon="ph:trend-up-bold"
      footer="Typical day, 88% load"
    />

    <VStatCard
      label="Active Rules"
      :value="stats.activeRules"
      :unit="`/ ${stats.totalRules} rules`"
      icon="ph:sliders-horizontal-bold"
      :progress="stats.totalRules ? (stats.activeRules / stats.totalRules) * 100 : 0"
      footer="Evaluated by priority"
    />

    <VStatCard
      label="Revenue Impact (MTD)"
      value="184,300"
      unit="EGP"
      icon="ph:currency-circle-dollar-bold"
      :delta="9.4"
      footer="vs static fares"
    />

    <VStatCard
      label="Guardrail Compliance"
      :value="stats.compliance"
      unit="%"
      icon="ph:shield-check-bold"
      :progress="stats.compliance"
      :footer="`${stats.compliantCount} of ${totalCorridors} corridors in range`"
    >
      <template #footer-end>
        <VTrendBadge
          :tone="stats.compliance === 100 ? 'positive' : 'critical'"
          :label="stats.compliance === 100 ? 'Safe' : 'Review'"
        />
      </template>
    </VStatCard>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  stats: {
    avgUplift: number;
    activeRules: number;
    totalRules: number;
    compliance: number;
    compliantCount: number;
  };
}>();

const totalCorridors = PRICING_CORRIDORS.length;
</script>
