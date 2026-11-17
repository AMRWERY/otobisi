<template>
  <div
    class="bg-surface-0 dark:bg-[#111927] border border-border/80 rounded-2xl overflow-hidden shadow-xs"
  >
    <div
      class="px-4 py-3 border-b border-border/80 flex items-center justify-between flex-wrap gap-2"
    >
      <div>
        <h2 class="text-sm font-extrabold text-text-primary">
          Trip Revenue & Load Ledger
        </h2>
        <p class="text-[11px] font-mono text-text-muted">
          Sorted by any column • target {{ REVENUE_OCCUPANCY_TARGET }}% load
        </p>
      </div>
    </div>

    <VTable
      v-model:sort="sort"
      :columns="columns"
      :rows="pagedTrips"
      row-key="id"
      density="comfortable"
      min-width-class="min-w-[900px]"
      empty-icon="ph:chart-bar-bold"
      empty-title="No trips for this corridor"
      empty-description="Pick another corridor or widen the date range."
    >
      <template #cell-id="{ row }">
        <div class="leading-tight">
          <span class="font-mono text-[11px] font-bold text-teal-700 dark:text-teal-300">
            {{ row.id }}
          </span>
          <div class="text-xs font-semibold text-text-primary">
            {{ row.corridor }}
          </div>
          <div class="font-mono text-[10px] text-text-muted">
            {{ row.departTime }} • {{ row.vehicle }}
          </div>
        </div>
      </template>

      <template #cell-occupied="{ row }">
        <div class="flex items-center gap-2 min-w-[130px]">
          <span class="h-1.5 w-16 rounded-full bg-surface-2 overflow-hidden">
            <span
              :class="['block h-full rounded-full', meterColor(row.loadFactor)]"
              :style="{ width: `${row.loadFactor}%` }"
            />
          </span>
          <span class="font-mono text-xs tabular-nums text-text-secondary">
            {{ row.occupied }}/{{ row.capacity }}
          </span>
        </div>
      </template>

      <template #cell-loadFactor="{ row }">
        <span class="font-bold text-text-primary">{{ row.loadFactor }}%</span>
      </template>

      <template #cell-yieldPerSeatKm="{ row }">
        <span class="text-text-secondary">{{ row.yieldPerSeatKm.toFixed(2) }}</span>
      </template>

      <template #cell-revenue="{ row }">
        <span class="font-bold text-text-primary">
          {{ revenueFormatEgp(row.revenue) }}
        </span>
      </template>

      <template #cell-delta="{ row }">
        <VTrendBadge
          :tone="row.delta >= 0 ? 'positive' : row.delta < -10 ? 'critical' : 'negative'"
          :label="`${row.delta > 0 ? '+' : ''}${row.delta} pts`"
        />
      </template>
    </VTable>

    <VPagination
      v-model="currentPage"
      v-model:page-size="perPage"
      :page-size-options="REVENUE_PER_PAGE_OPTIONS"
      :total="trips.length"
      item-label="trips"
      show-summary
      :active-class="PAGINATION_ACTIVE_CLASS"
      class="px-4 py-3 bg-surface-1/40 dark:bg-surface-2/10"
    />
  </div>
</template>

<script lang="ts" setup>
import type { TableColumn, TableSort } from "~/types/shared/VTable";
import type { RevenueTrip } from "~/types/revenue";

const props = defineProps<{
  /** Already filtered trips; this component sorts and paginates them */
  trips: RevenueTrip[];
}>();

const columns: TableColumn[] = [
  { key: "id", label: "Trip & Corridor", sortable: true },
  { key: "occupied", label: "Occupancy", sortable: true },
  { key: "loadFactor", label: "Load", sortable: true, align: "end", mono: true },
  { key: "yieldPerSeatKm", label: "Yield / Seat-Km", sortable: true, align: "end", mono: true },
  { key: "revenue", label: "Revenue (EGP)", sortable: true, align: "end", mono: true },
  { key: "delta", label: "vs Target", sortable: true, align: "end", headerClass: "pe-4", cellClass: "pe-4" },
];

function meterColor(load: number) {
  if (load >= REVENUE_OCCUPANCY_TARGET) return "bg-emerald-500";
  if (load >= REVENUE_OCCUPANCY_TARGET - 10) return "bg-amber-500";
  return "bg-rose-500";
}

// ── Sorting ─────────────────────────────────────────────
const sort = ref<TableSort | null>(null);
const sortedTrips = computed(() => sortRows(props.trips, sort.value));

// ── Pagination ──────────────────────────────────────────
const currentPage = ref(1);
const perPage = ref(REVENUE_PER_PAGE_OPTIONS[0]!);

const totalPages = computed(() =>
  Math.max(1, Math.ceil(props.trips.length / perPage.value)),
);

// Filtering can shrink the list below the current page
watch(totalPages, (pages) => {
  if (currentPage.value > pages) currentPage.value = pages;
});

const pagedTrips = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  return sortedTrips.value.slice(start, start + perPage.value);
});
</script>
