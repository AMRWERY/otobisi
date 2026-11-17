<template>
  <div
    class="bg-surface-0 dark:bg-[#111927] border border-border/80 rounded-2xl overflow-hidden shadow-xs"
  >
    <!-- Bulk bar -->
    <div
      class="px-4 py-2.5 border-b border-border/80 flex items-center justify-between flex-wrap gap-3 bg-surface-1/60 dark:bg-surface-2/10"
    >
      <label
        class="flex items-center gap-3 text-[11px] font-mono text-text-secondary cursor-pointer select-none"
      >
        <input
          type="checkbox"
          class="checkbox"
          :checked="allSelected"
          :indeterminate="someSelected"
          :disabled="!coaches.length"
          @change="emit('toggle-all')"
        />
        <span v-if="selectedIds.length" class="font-semibold text-text-primary">
          {{ selectedIds.length.toLocaleString("en-US") }} selected
        </span>
        <span v-else>
          Select all {{ coaches.length.toLocaleString("en-US") }} results
        </span>
      </label>

      <span
        class="flex items-center gap-1.5 text-[11px] font-medium text-accent-700 dark:text-accent-300"
      >
        <span class="w-1.5 h-1.5 rounded-full bg-accent-500 animate-pulse" />
        Telemetry feed active
      </span>
    </div>

    <VTable
      :columns="columns"
      :rows="pagedCoaches"
      row-key="id"
      min-width-class="min-w-[820px]"
      :row-class="rowClass"
      empty-text="No coaches match your filters"
    >
      <template #header-select>
        <span class="sr-only">Select</span>
      </template>

      <template #cell-select="{ row }">
        <input
          type="checkbox"
          class="checkbox"
          :checked="selectedIds.includes(row.id)"
          :aria-label="`Select coach ${row.internalId}`"
          @change="emit('toggle', row.id)"
        />
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
              <span class="font-mono text-text-secondary font-semibold">
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

    <!-- Footer: per page + pagination -->
    <div
      class="px-4 py-3 border-t border-border/80 flex items-center justify-between flex-wrap gap-4 text-xs"
    >
      <VDropdownMenu :items="perPageItems" align="left">
        <template #trigger>
          <VButton
            variant="surface"
            size="xs"
            rounded="lg"
            icon-right="ph:caret-down-bold"
          >
            {{ perPage }} per page
          </VButton>
        </template>
      </VDropdownMenu>

      <VPagination
        v-model="currentPage"
        :total="coaches.length"
        :page-size="perPage"
        item-label="coaches"
        show-summary
        class="flex-1 border-t-0 pt-0"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { DropdownItem } from "@otobisi/ui/types/shared/VDropdownMenu";
import type { TableColumn } from "@otobisi/ui/types/shared/VTable";
import type { CoachRecord, CoachStatus, CoachTemplateKey } from "~/types/fleet";

const props = defineProps<{
  /** Already filtered coaches; this component only paginates them */
  coaches: CoachRecord[];
  selectedIds: number[];
  allSelected: boolean;
}>();

const emit = defineEmits<{
  (e: "toggle", id: number): void;
  (e: "toggle-all"): void;
}>();

const columns: TableColumn[] = [
  { key: "select", label: "", headerClass: "w-10 ps-4", cellClass: "ps-4" },
  { key: "vehicle", label: "VEHICLE DETAILS & VIN" },
  { key: "license", label: "LICENSE & DEPOT" },
  { key: "blueprint", label: "SEATING BLUEPRINT" },
  { key: "status", label: "OPERATIONAL STATUS", headerClass: "pe-4", cellClass: "pe-4" },
];

const someSelected = computed(
  () => props.selectedIds.length > 0 && !props.allSelected,
);

function rowClass(row: Record<string, any>) {
  return props.selectedIds.includes(row.id)
    ? "bg-surface-1/70 dark:bg-surface-2/20"
    : "";
}

// ── Pagination ──────────────────────────────────────────
const currentPage = ref(1);
const perPage = ref(FLEET_PER_PAGE_OPTIONS[0]!);

const perPageItems = computed<DropdownItem[]>(() =>
  FLEET_PER_PAGE_OPTIONS.map((size) => ({
    type: "button",
    label: `${size} per page`,
    onClick: () => {
      perPage.value = size;
      currentPage.value = 1;
    },
  })),
);

const totalPages = computed(() =>
  Math.max(1, Math.ceil(props.coaches.length / perPage.value)),
);

// Filtering can shrink the list below the current page
watch(totalPages, (pages) => {
  if (currentPage.value > pages) currentPage.value = pages;
});

const pagedCoaches = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  return props.coaches.slice(start, start + perPage.value);
});
</script>

<style scoped>
.checkbox {
  width: 0.95rem;
  height: 0.95rem;
  border-radius: 0.25rem;
  cursor: pointer;
  color: #188577;
}
</style>
