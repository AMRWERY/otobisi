<template>
  <div class="px-6 py-6 space-y-5 max-w-[1600px] mx-auto">
    <lazy-audit-header @export="exportCsv" />

    <lazy-audit-stats :summary="summary" />

    <lazy-audit-filters
      v-model:search="filters.search"
      v-model:category="filters.category"
      v-model:severity="filters.severity"
      v-model:actor="filters.actor"
      :counts="counts"
      :actors="actors"
      :shown="filteredEntries.length"
      :total="summary.total"
      :has-active-filters="hasActiveFilters"
      @reset="resetFilters"
    />

    <lazy-audit-table
      :entries="filteredEntries"
      :has-active-filters="hasActiveFilters"
      @open="(id: string) => (activeId = id)"
      @reset="resetFilters"
    />

    <lazy-audit-detail-drawer :entry="activeEntry" @close="activeId = null" />
  </div>
</template>

<script lang="ts" setup>
const {
  filters,
  actors,
  counts,
  summary,
  filteredEntries,
  hasActiveFilters,
  resetFilters,
  activeId,
  activeEntry,
  exportCsv,
} = useAudit();

useSeoMeta({
  title: "Audit Logs",
  description:
    "A tamper-evident trail of security, billing, configuration, trip and team changes on Otobisi.",
  private: false,
});
</script>
