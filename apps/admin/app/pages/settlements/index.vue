<template>
  <div class="px-6 py-6 space-y-5 max-w-[1600px] mx-auto">
    <lazy-settlements-header
      :failed-count="stats.failedCount"
      @sync="syncGateways"
      @export="exportCsv()"
    />

    <lazy-settlements-stats :stats="stats" />

    <lazy-settlements-recon-strip :unreconciled="stats.unreconciled" />

    <lazy-settlements-table
      v-model:tab="railTab"
      v-model:selected-ids="selectedIds"
      :batches="filteredBatches"
      :tabs="railTabs"
      @open="(id) => (activeId = id)"
      @export-selected="exportCsv(true)"
      @reconcile-selected="markReconciled(selectedIds)"
    />

    <lazy-settlements-batch-drawer
      :batch="activeBatch"
      @close="activeId = null"
      @reconcile="(batch) => markReconciled([batch.id])"
      @statement="downloadStatement"
    />
  </div>
</template>

<script lang="ts" setup>
const {
  railTab,
  railTabs,
  filteredBatches,
  stats,
  selectedIds,
  activeId,
  activeBatch,
  markReconciled,
  syncGateways,
  downloadStatement,
  exportCsv,
} = useSettlements();

useSeoMeta({
  title: "Settlements",
  description:
    "Track Fawry, Meeza, wallet and cash payout batches, fees and reconciliation for your Otobisi operator account.",
  private: false,
});
</script>
