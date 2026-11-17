<template>
  <div
    class="bg-surface-0 dark:bg-[#111927] border border-border/80 rounded-2xl overflow-hidden shadow-xs"
  >
    <VTableBulkBar
      :count="selectedIds.length"
      label="Passengers Selected"
      @clear="selectedIds = []"
    >
      <VTableBulkAction icon="ph:check-circle-bold" @click="emit('mark-selected', 'boarded')">
        Mark boarded
      </VTableBulkAction>
      <VTableBulkAction icon="ph:user-minus-bold" @click="emit('mark-selected', 'no-show')">
        Mark no-show
      </VTableBulkAction>
      <VTableBulkAction icon="ph:printer-bold" @click="emit('print')">
        Print
      </VTableBulkAction>
    </VTableBulkBar>

    <VTable
      v-model:selected="selectedIds"
      v-model:sort="sort"
      selectable
      :columns="columns"
      :rows="pagedPassengers"
      row-key="id"
      min-width-class="min-w-[880px]"
      empty-icon="ph:users-three-bold"
      empty-title="No passengers match your filters"
      empty-description="Try a different status or clear the search."
    >
      <template #empty-actions>
        <VButton
          v-if="hasActiveFilters"
          variant="surface"
          size="sm"
          rounded="lg"
          icon="ph:funnel-x-bold"
          @click="emit('reset')"
        >
          Reset Active Filters
        </VButton>
      </template>

      <template #cell-seat="{ row }">
        <span
          class="inline-flex items-center justify-center min-w-9 px-1.5 py-0.5 rounded font-mono text-[11px] font-bold bg-accent-100 text-accent-800 dark:bg-accent-500/20 dark:text-accent-200"
        >
          {{ row.seat }}
        </span>
      </template>

      <template #cell-name="{ row }">
        <span class="font-bold text-xs text-text-primary">{{ row.name }}</span>
      </template>

      <template #cell-pnr="{ row }">
        <span class="font-mono text-[11px] font-bold text-teal-700 dark:text-teal-300 whitespace-nowrap">
          {{ row.pnr }}
        </span>
      </template>

      <template #cell-phone="{ row }">
        <span class="font-mono text-[11px] text-text-muted whitespace-nowrap" dir="ltr">
          {{ row.phone }}
        </span>
      </template>

      <template #cell-status="{ row }">
        <manifest-status-pill :status="row.status as ManifestBoardStatus" />
      </template>

      <template #cell-luggage="{ row }">
        <span
          :class="[
            'inline-flex items-center gap-1 font-mono text-xs tabular-nums',
            row.luggage ? 'text-text-primary font-semibold' : 'text-text-muted',
          ]"
        >
          <Icon name="ph:suitcase-rolling-bold" class="w-3.5 h-3.5" />
          {{ row.luggage }}
        </span>
      </template>

      <template #cell-notes="{ row }">
        <span v-if="row.notes" class="text-[11px] text-text-secondary">
          {{ row.notes }}
        </span>
        <span v-else class="text-text-muted">—</span>
      </template>

      <!-- Row actions -->
      <template #cell-actions="{ row }">
        <VDropdownMenu :items="actionItems(row as ManifestPassenger)" align="right">
          <template #trigger>
            <VButton
              variant="ghost"
              size="xs"
              rounded="lg"
              icon="ph:dots-three-vertical-bold"
              :aria-label="`Actions for ${row.name}`"
            />
          </template>
        </VDropdownMenu>
      </template>
    </VTable>

    <VPagination
      v-model="currentPage"
      v-model:page-size="perPage"
      :page-size-options="MANIFEST_PER_PAGE_OPTIONS"
      :total="passengers.length"
      item-label="passengers"
      show-summary
      :active-class="PAGINATION_ACTIVE_CLASS"
      class="px-4 py-3 bg-surface-1/40 dark:bg-surface-2/10"
    />
  </div>
</template>

<script lang="ts" setup>
import type { DropdownItem } from "~/types/shared/VDropdownMenu";
import type { TableColumn, TableSort } from "~/types/shared/VTable";
import type { ManifestBoardStatus, ManifestPassenger } from "~/types/manifest";

const props = defineProps<{
  /** Already filtered passengers; this component sorts and paginates them */
  passengers: ManifestPassenger[];
  hasActiveFilters: boolean;
}>();

const emit = defineEmits<{
  (e: "mark-selected", status: ManifestBoardStatus): void;
  (e: "mark-one", passenger: ManifestPassenger, status: ManifestBoardStatus): void;
  (e: "print"): void;
  (e: "reset"): void;
}>();

/** Seat ids of the checked passengers (kept across pages) */
const selectedIds = defineModel<(string | number)[]>("selectedIds", {
  required: true,
});

const columns: TableColumn[] = [
  { key: "seat", label: "Seat", sortable: true },
  { key: "name", label: "Passenger", sortable: true },
  { key: "pnr", label: "PNR Ref", sortable: true },
  { key: "phone", label: "Phone" },
  { key: "status", label: "Boarding", sortable: true },
  { key: "luggage", label: "Bags", sortable: true, align: "end" },
  { key: "notes", label: "Notes" },
  { key: "actions", label: "Actions", align: "center", headerClass: "pe-4", cellClass: "pe-4" },
];

function actionItems(p: ManifestPassenger): DropdownItem[] {
  const items: DropdownItem[] = [];
  if (p.status !== "boarded")
    items.push({ type: "button", label: "Mark boarded", icon: "ph:check-circle-bold", onClick: () => emit("mark-one", p, "boarded") });
  if (p.status !== "no-show")
    items.push({ type: "button", label: "Mark no-show", icon: "ph:user-minus-bold", onClick: () => emit("mark-one", p, "no-show") });
  if (p.status !== "pending")
    items.push({ type: "button", label: "Reset to pending", icon: "ph:arrow-counter-clockwise-bold", onClick: () => emit("mark-one", p, "pending") });
  return items;
}

// ── Sorting ─────────────────────────────────────────────
const sort = ref<TableSort | null>(null);

const sortedPassengers = computed(() =>
  sortRows(props.passengers, sort.value, {
    status: (p) => MANIFEST_STATUS_LABELS[p.status],
  }),
);

// ── Pagination ──────────────────────────────────────────
const currentPage = ref(1);
const perPage = ref(MANIFEST_PER_PAGE_OPTIONS[0]!);

const totalPages = computed(() =>
  Math.max(1, Math.ceil(props.passengers.length / perPage.value)),
);

// Filtering or switching trips can shrink the list below the current page
watch(totalPages, (pages) => {
  if (currentPage.value > pages) currentPage.value = pages;
});

const pagedPassengers = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  return sortedPassengers.value.slice(start, start + perPage.value);
});
</script>
