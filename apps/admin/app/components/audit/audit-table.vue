<template>
  <div
    class="bg-surface-0 dark:bg-[#111927] border border-border/80 rounded-2xl overflow-hidden shadow-xs"
  >
    <VTable
      v-model:sort="sort"
      :columns="columns"
      :rows="pagedEntries"
      row-key="id"
      density="comfortable"
      min-width-class="min-w-[980px]"
      row-class="cursor-pointer"
      empty-icon="ph:clipboard-text-bold"
      empty-title="No audit events match your filters"
      empty-description="Try a wider category, another actor, or clear the search."
      @row-click="(row) => emit('open', row.id)"
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

      <template #cell-time="{ row }">
        <div class="leading-tight whitespace-nowrap">
          <div class="font-mono text-[11px] font-semibold text-text-primary">
            {{ auditTime(row.at) }}
          </div>
          <div class="font-mono text-[10px] text-text-muted">
            {{ row.id }}
          </div>
        </div>
      </template>

      <template #cell-actor="{ row }">
        <div class="flex items-center gap-2.5">
          <div
            class="w-7 h-7 rounded-full bg-surface-1 dark:bg-surface-2 border border-border flex items-center justify-center font-bold text-text-secondary text-[10px] shrink-0"
          >
            {{ initialsOf(row.actor) }}
          </div>
          <div class="leading-tight">
            <div class="text-xs font-bold text-text-primary">{{ row.actor }}</div>
            <div class="text-[10px] font-mono text-text-muted">
              {{ row.actorRole }}
            </div>
          </div>
        </div>
      </template>

      <template #cell-action="{ row }">
        <div class="flex items-start gap-2.5">
          <div
            :class="[
              'w-7 h-7 rounded-lg flex items-center justify-center shrink-0',
              AUDIT_CATEGORIES[row.category as AuditCategory].iconClass,
            ]"
          >
            <Icon
              :name="AUDIT_CATEGORIES[row.category as AuditCategory].icon"
              class="w-4 h-4"
            />
          </div>
          <div class="leading-tight min-w-0">
            <div class="text-xs font-bold text-text-primary">{{ row.action }}</div>
            <div class="text-[11px] text-text-muted truncate max-w-[280px]">
              {{ row.target }}
            </div>
          </div>
        </div>
      </template>

      <template #cell-origin="{ row }">
        <div class="leading-tight">
          <div class="font-mono text-[11px] text-text-secondary">{{ row.ip }}</div>
          <div class="text-[10px] text-text-muted">{{ row.device }}</div>
        </div>
      </template>

      <template #cell-severity="{ row }">
        <audit-severity-pill :severity="row.severity as AuditSeverity" />
      </template>

      <template #cell-result="{ row }">
        <span
          :class="[
            'inline-flex items-center gap-1 text-[11px] font-semibold',
            row.result === 'success'
              ? 'text-emerald-700 dark:text-emerald-400'
              : 'text-rose-600 dark:text-rose-400',
          ]"
        >
          <Icon
            :name="
              row.result === 'success'
                ? 'ph:check-circle-fill'
                : 'ph:x-circle-fill'
            "
            class="w-3.5 h-3.5"
          />
          {{ row.result === "success" ? "Success" : "Failed" }}
        </span>
      </template>
    </VTable>

    <VPagination
      v-model="currentPage"
      v-model:page-size="perPage"
      :page-size-options="AUDIT_PER_PAGE_OPTIONS"
      :total="entries.length"
      item-label="events"
      show-summary
      :active-class="PAGINATION_ACTIVE_CLASS"
      class="px-4 py-3 bg-surface-1/40 dark:bg-surface-2/10"
    />
  </div>
</template>

<script lang="ts" setup>
import type { TableColumn, TableSort } from "~/types/shared/VTable";
import type { AuditCategory, AuditEntry, AuditSeverity } from "~/types/audit";

const props = defineProps<{
  /** Already filtered events; this component sorts and paginates them */
  entries: AuditEntry[];
  hasActiveFilters: boolean;
}>();

const emit = defineEmits<{
  (e: "open", id: string): void;
  (e: "reset"): void;
}>();

const columns: TableColumn[] = [
  { key: "time", label: "Time (UTC)", sortable: true, cellClass: "ps-4", headerClass: "ps-4" },
  { key: "actor", label: "Actor", sortable: true },
  { key: "action", label: "Event & Target", sortable: true },
  { key: "origin", label: "IP & Device" },
  { key: "severity", label: "Severity", sortable: true },
  { key: "result", label: "Result", sortable: true, headerClass: "pe-4", cellClass: "pe-4" },
];

// ── Sorting (newest first until a header is clicked) ─────
const sort = ref<TableSort | null>(null);

const sortedEntries = computed(() =>
  sortRows(props.entries, sort.value, {
    time: (e) => e.at,
    actor: (e) => e.actor,
    action: (e) => e.action,
    severity: (e) => AUDIT_SEVERITY_KEYS.indexOf(e.severity),
  }),
);

// ── Pagination ──────────────────────────────────────────
const currentPage = ref(1);
const perPage = ref(AUDIT_PER_PAGE_OPTIONS[0]!);

const totalPages = computed(() =>
  Math.max(1, Math.ceil(props.entries.length / perPage.value)),
);

watch(totalPages, (pages) => {
  if (currentPage.value > pages) currentPage.value = pages;
});

const pagedEntries = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  return sortedEntries.value.slice(start, start + perPage.value);
});
</script>
