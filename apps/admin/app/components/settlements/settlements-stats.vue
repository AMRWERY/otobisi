<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <VStatCard
      label="Pending Payout"
      :value="settlementsMoney(stats.pendingPayout)"
      unit="EGP"
      icon="ph:hourglass-medium-bold"
      :footer="`${stats.pendingCount} batches in flight`"
    />

    <VStatCard
      label="Settled This Month"
      :value="settlementsMoney(stats.settledThisMonth)"
      unit="EGP"
      icon="ph:bank-bold"
      :footer="`${stats.settledCount} batches paid`"
    >
      <template #footer-end>
        <VTrendBadge tone="positive" label="Net" />
      </template>
    </VStatCard>

    <VStatCard
      label="Fees + VAT (Month)"
      :value="settlementsMoney(stats.feesThisMonth)"
      unit="EGP"
      icon="ph:percent-bold"
      :footer="`${stats.effectiveFeeRate}% of gross`"
    />

    <VStatCard
      label="Disputed"
      :value="settlementsMoney(stats.disputed)"
      unit="EGP"
      icon="ph:warning-circle-bold"
      :footer="`${stats.disputedTx} transactions held`"
    >
      <template #footer-end>
        <VTrendBadge
          v-if="stats.disputed > 0"
          tone="critical"
          label="Review"
        />
      </template>
    </VStatCard>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  stats: {
    pendingPayout: number;
    pendingCount: number;
    settledThisMonth: number;
    settledCount: number;
    feesThisMonth: number;
    effectiveFeeRate: number;
    disputed: number;
    disputedTx: number;
  };
}>();
</script>
