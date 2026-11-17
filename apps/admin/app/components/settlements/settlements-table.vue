<template>
  <div
    class="bg-surface-0 dark:bg-[#111927] border border-border/80 rounded-2xl overflow-hidden shadow-xs"
  >
    <div
      class="px-4 py-3 border-b border-border/80 flex items-center justify-between flex-wrap gap-3"
    >
      <div>
        <h2 class="text-sm font-extrabold text-text-primary">Settlement Batches</h2>
        <p class="text-[11px] font-mono text-text-muted">
          Net = gross − fees − VAT on fees
        </p>
      </div>
      <VTabs v-model="tab" :tabs="tabs" />
    </div>

    <VTableBulkBar
      :count="selectedIds.length"
      label="Batches Selected"
      @clear="selectedIds = []"
    >
      <VTableBulkAction icon="ph:download-simple-bold" @click="emit('export-selected')">
        Export selected
      </VTableBulkAction>
      <VTableBulkAction icon="ph:check-circle-bold" @click="emit('reconcile-selected')">
        Mark reconciled
      </VTableBulkAction>
    </VTableBulkBar>

    <VTable
      v-model:selected="selectedIds"
      v-model:sort="sort"
      selectable
      :columns="columns"
      :rows="pagedBatches"
      row-key="id"
      density="comfortable"
      min-width-class="min-w-[1020px]"
      :row-class="() => 'cursor-pointer'"
      empty-icon="ph:bank-bold"
      empty-title="No settlement batches on this rail"
      empty-description="Batches appear here once the gateway closes a settlement period."
      @row-click="(row) => emit('open', row.id)"
    >
      <template #cell-id="{ row }">
        <span
          class="font-mono text-[11px] font-bold text-teal-700 dark:text-teal-300 whitespace-nowrap"
        >
          {{ row.id }}
        </span>
      </template>

      <template #cell-rail="{ row }">
        <span
          class="inline-flex items-center gap-1.5 text-xs text-text-secondary whitespace-nowrap"
        >
          <Icon
            :name="SETTLEMENTS_RAILS[row.rail as SettlementRail].icon"
            class="w-3.5 h-3.5 text-text-muted"
          />
          {{ SETTLEMENTS_RAILS[row.rail as SettlementRail].label }}
        </span>
      </template>

      <template #cell-period="{ row }">
        <span class="font-mono text-[11px] text-text-secondary whitespace-nowrap">
          {{ settlementsPeriod(row as SettlementBatch) }}
        </span>
      </template>

      <template #cell-gross="{ row }">{{ formatEgp(row.gross) }}</template>

      <template #cell-fees="{ row }">
        <span class="text-text-muted">{{ formatEgp(row.fees) }}</span>
      </template>

      <template #cell-vat="{ row }">
        <span class="text-text-muted">{{ formatEgp(row.vat) }}</span>
      </template>

      <template #cell-net="{ row }">
        <span class="font-bold text-text-primary">{{ formatEgp(row.net) }}</span>
      </template>

      <template #cell-status="{ row }">
        <div class="flex items-center gap-1.5">
          <settlements-status-pill :status="row.status as SettlementStatus" />
          <Icon
            v-if="row.reconciled"
            name="ph:seal-check-fill"
            class="w-3.5 h-3.5 text-teal-600 dark:text-teal-300"
            title="Reconciled"
          />
        </div>
      </template>

      <template #cell-paidAt="{ row }">
        <span class="font-mono text-[11px] text-text-muted whitespace-nowrap">
          {{ settlementsPaidAt(row.paidAt) }}
        </span>
      </template>
    </VTable>

    <VPagination
      v-model="currentPage"
      v-model:page-size="perPage"
      :page-size-options="SETTLEMENTS_PER_PAGE_OPTIONS"
      :total="batches.length"
      item-label="batches"
      show-summary
      :active-class="PAGINATION_ACTIVE_CLASS"
      class="px-4 py-3 bg-surface-1/40 dark:bg-surface-2/10"
    />
  </div>
</template>

<script lang="ts" setup>
import type { TableColumn, TableSort } from "~/types/shared/VTable";
import type {
  SettlementBatch,
  SettlementRail,
  SettlementStatus,
} from "~/types/settlements";

const props = defineProps<{
  /** Already filtered by the rail tab; this component sorts and paginates them */
  batches: SettlementBatch[];
  tabs: { key: string; label: string }[];
}>();

const emit = defineEmits<{
  (e: "open", id: string): void;
  (e: "export-selected"): void;
  (e: "reconcile-selected"): void;
}>();

const tab = defineModel<string>("tab", { required: true });

/** Ids of the checked batches (kept across pages) */
const selectedIds = defineModel<(string | number)[]>("selectedIds", {
  required: true,
});

const columns: TableColumn[] = [
  { key: "id", label: "Batch", sortable: true, cellClass: "whitespace-nowrap" },
  { key: "rail", label: "Rail", sortable: true },
  { key: "period", label: "Period", sortable: true },
  { key: "gross", label: "Gross (EGP)", sortable: true, align: "end", mono: true },
  { key: "fees", label: "Fees", sortable: true, align: "end", mono: true },
  { key: "vat", label: "VAT", sortable: true, align: "end", mono: true },
  { key: "net", label: "Net (EGP)", sortable: true, align: "end", mono: true },
  { key: "status", label: "Status", sortable: true },
  { key: "paidAt", label: "Paid at (UTC)", sortable: true, headerClass: "pe-4", cellClass: "pe-4" },
];

// ── Sorting ─────────────────────────────────────────────
const sort = ref<TableSort | null>(null);

const sortedBatches = computed(() =>
  sortRows(props.batches, sort.value, {
    rail: (b) => SETTLEMENTS_RAILS[b.rail].label,
    period: (b) => b.periodTo,
    status: (b) => SETTLEMENTS_STATUS_LABELS[b.status],
    paidAt: (b) => b.paidAt ?? "",
  }),
);

// ── Pagination ──────────────────────────────────────────
const currentPage = ref(1);
const perPage = ref(SETTLEMENTS_PER_PAGE_OPTIONS[0]!);

const totalPages = computed(() =>
  Math.max(1, Math.ceil(props.batches.length / perPage.value)),
);

// A tab change can shrink the list below the current page
watch(totalPages, (pages) => {
  if (currentPage.value > pages) currentPage.value = pages;
});

const pagedBatches = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  return sortedBatches.value.slice(start, start + perPage.value);
});
</script>
