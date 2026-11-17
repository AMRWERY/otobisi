<template>
  <div
    class="bg-surface-0 dark:bg-[#111927] border border-border/80 rounded-2xl overflow-hidden shadow-xs"
  >
    <VTableBulkBar
      :count="selectedIds.length"
      label="Coaches Selected"
      @clear="selectedIds = []"
    >
      <VTableBulkAction icon="ph:download-simple-bold" @click="emit('export-selected')">
        Export selected
      </VTableBulkAction>
    </VTableBulkBar>

    <VTable
      v-model:selected="selectedIds"
      v-model:sort="sort"
      selectable
      :columns="columns"
      :rows="pagedCoaches"
      row-key="id"
      density="comfortable"
      min-width-class="min-w-[820px]"
      empty-icon="ph:bus-bold"
      empty-title="No coaches match your filters"
      empty-description="Try clearing the active filters or widening your search."
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

      <!-- Vehicle & VIN -->
      <template #cell-vehicle="{ row }">
        <div class="flex items-start gap-2.5">
          <div
            class="w-7 h-7 rounded bg-surface-1 dark:bg-surface-2 border border-border/80 flex items-center justify-center text-text-muted shrink-0 mt-0.5"
          >
            <Icon name="ph:bus" class="w-4 h-4" />
          </div>
          <div class="leading-tight">
            <div class="flex items-center gap-1.5 flex-wrap">
              <span class="font-bold text-text-primary text-xs">
                {{ row.model }}
              </span>
              <span class="font-mono text-teal-700 dark:text-teal-300 font-semibold">
                {{ row.code }}
              </span>
              <span
                class="bg-surface-1 dark:bg-surface-2 text-text-muted px-1 rounded font-mono text-[9px] uppercase font-bold"
              >
                {{ row.internalId }}
              </span>
            </div>
            <div class="text-[10px] font-mono text-text-muted mt-0.5">
              Chassis: {{ row.chassis }} • {{ row.year }} • VIN: {{ row.vin }}
            </div>
          </div>
        </div>
      </template>

      <!-- License & depot -->
      <template #cell-license="{ row }">
        <fleet-license-plate
          :arabic="row.plateArabic"
          :latin="row.plateLatin"
        />
        <div class="text-[10px] font-mono text-text-muted mt-1">
          {{ row.depot }}
        </div>
      </template>

      <!-- Seating blueprint -->
      <template #cell-blueprint="{ row }">
        <div
          class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-1 dark:bg-surface-2/50 border border-border/60 text-[11px] font-mono font-medium text-text-secondary whitespace-nowrap"
        >
          <Icon
            :name="COACH_TEMPLATES[row.template as CoachTemplateKey].icon"
            class="w-3.5 h-3.5 text-text-muted"
          />
          <span>{{ COACH_TEMPLATES[row.template as CoachTemplateKey].label }}</span>
        </div>
      </template>

      <!-- Status -->
      <template #cell-status="{ row }">
        <fleet-status-pill :status="row.status as CoachStatus" />
      </template>
    </VTable>

    <VPagination
      v-model="currentPage"
      v-model:page-size="perPage"
      :page-size-options="FLEET_PER_PAGE_OPTIONS"
      :total="coaches.length"
      item-label="coaches"
      show-summary
      :active-class="PAGINATION_ACTIVE_CLASS"
      class="px-4 py-3 bg-surface-1/40 dark:bg-surface-2/10"
    />
  </div>
</template>

<script lang="ts" setup>
import type { TableColumn, TableSort } from "@otobisi/ui/types/shared/VTable";
import type { CoachRecord, CoachStatus, CoachTemplateKey } from "~/types/fleet";

const props = defineProps<{
  /** Already filtered coaches; this component sorts and paginates them */
  coaches: CoachRecord[];
  hasActiveFilters: boolean;
}>();

const emit = defineEmits<{
  (e: "export-selected"): void;
  (e: "reset"): void;
}>();

/** Ids of the checked coaches (kept across pages) */
const selectedIds = defineModel<(string | number)[]>("selectedIds", {
  required: true,
});

const columns: TableColumn[] = [
  { key: "vehicle", label: "Vehicle Details & VIN", sortable: true },
  { key: "license", label: "License & Depot", sortable: true },
  { key: "blueprint", label: "Seating Blueprint", sortable: true },
  { key: "status", label: "Operational Status", sortable: true, headerClass: "pe-4", cellClass: "pe-4" },
];

// ── Sorting ─────────────────────────────────────────────
const sort = ref<TableSort | null>(null);

const sortedCoaches = computed(() =>
  sortRows(props.coaches, sort.value, {
    vehicle: (c) => c.model,
    license: (c) => c.plateLatin,
    blueprint: (c) => COACH_TEMPLATES[c.template].label,
    status: (c) => COACH_STATUS_LABELS[c.status],
  }),
);

// ── Pagination ──────────────────────────────────────────
const currentPage = ref(1);
const perPage = ref(FLEET_PER_PAGE_OPTIONS[0]!);

const totalPages = computed(() =>
  Math.max(1, Math.ceil(props.coaches.length / perPage.value)),
);

// Filtering can shrink the list below the current page
watch(totalPages, (pages) => {
  if (currentPage.value > pages) currentPage.value = pages;
});

const pagedCoaches = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  return sortedCoaches.value.slice(start, start + perPage.value);
});
</script>
