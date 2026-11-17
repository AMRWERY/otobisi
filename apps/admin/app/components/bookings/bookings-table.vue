<template>
  <div
    class="bg-surface-0 dark:bg-[#111927] border border-border/80 rounded-2xl overflow-hidden shadow-xs"
  >
    <VTableBulkBar
      :count="selectedIds.length"
      label="Reservations Selected"
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
      :rows="pagedBookings"
      row-key="id"
      density="comfortable"
      min-width-class="min-w-[860px]"
      :row-class="rowClass"
      empty-icon="ph:ticket-bold"
      empty-title="No reservations match your filters"
      empty-description="Try clearing the active filters or widening the date range."
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

      <!-- PNR -->
      <template #cell-pnr="{ row }">
        <span
          class="font-mono text-[11px] font-bold text-teal-700 dark:text-teal-300 whitespace-nowrap"
        >
          {{ row.id }}
        </span>
      </template>

      <!-- Passenger / contact -->
      <template #cell-passenger="{ row }">
        <div
          class="flex flex-col leading-tight"
          :class="{ 'line-through text-text-muted': row.status === 'cancelled' }"
        >
          <div class="flex items-center gap-1.5">
            <span class="font-bold text-xs text-text-primary">
              {{ row.passengerName }}
            </span>
            <span
              class="px-1 rounded bg-surface-1 dark:bg-surface-2 border border-border/60 font-mono text-[9px] text-text-muted"
              :title="`National ID ending ${row.nationalId.slice(-4)}`"
            >
              {{ maskNationalId(row.nationalId) }}
            </span>
          </div>
          <span class="font-mono text-[11px] text-text-muted">
            {{ row.phone }}
          </span>
        </div>
      </template>

      <!-- Corridor & departure -->
      <template #cell-route="{ row }">
        <div class="flex flex-col leading-tight">
          <div
            class="flex items-center gap-1.5 text-xs font-semibold text-text-primary"
          >
            <span>{{ row.origin }}</span>
            <Icon
              name="ph:arrow-right"
              class="w-3 h-3 text-text-muted rtl:rotate-180 shrink-0"
            />
            <span>{{ row.destination }}</span>
          </div>
          <span class="font-mono text-[11px] text-text-muted">
            {{ row.departDay }}, {{ row.departTime }} •
            {{ routeNote(row as Booking) }}
          </span>
        </div>
      </template>

      <!-- Seats -->
      <template #cell-seats="{ row }">
        <div class="flex items-center gap-1 flex-wrap">
          <span
            v-for="seat in row.seats.slice(0, 2)"
            :key="seat"
            :class="[
              'px-1.5 py-0.5 rounded font-mono text-[11px] font-semibold',
              row.status === 'cancelled'
                ? 'bg-surface-1 dark:bg-surface-2 text-text-muted line-through'
                : 'bg-accent-100 text-accent-800 dark:bg-accent-500/20 dark:text-accent-200',
            ]"
          >
            {{ seat }}
          </span>
          <span
            v-if="row.seats.length > 2"
            class="font-mono text-[11px] text-text-muted"
          >
            +{{ row.seats.length - 2 }}
          </span>
        </div>
      </template>

      <!-- Fare -->
      <template #cell-fare="{ row }">
        <div class="flex flex-col items-end leading-tight">
          <span
            :class="[
              'font-mono text-xs font-bold tabular-nums',
              row.refunded
                ? 'line-through text-text-muted'
                : 'text-text-primary',
            ]"
          >
            {{ formatEgp(row.fare) }}
          </span>
          <span
            :class="[
              'font-mono text-[10px]',
              row.refunded
                ? 'text-rose-600 dark:text-rose-400'
                : 'text-text-muted',
            ]"
          >
            {{ row.refunded ? "Refunded" : "EGP" }}
          </span>
        </div>
      </template>

      <!-- Gateway -->
      <template #cell-gateway="{ row }">
        <span
          class="inline-flex items-center gap-1.5 text-xs text-text-secondary whitespace-nowrap"
        >
          <Icon
            :name="GATEWAY_ICONS[row.gateway as keyof typeof GATEWAY_ICONS]"
            class="w-3.5 h-3.5 text-text-muted"
          />
          {{ row.gateway }}
        </span>
      </template>
    </VTable>

    <VPagination
      v-model="currentPage"
      v-model:page-size="perPage"
      :page-size-options="PER_PAGE_OPTIONS"
      :total="bookings.length"
      item-label="records"
      show-summary
      :active-class="PAGINATION_ACTIVE_CLASS"
      class="px-4 py-3 bg-surface-1/40 dark:bg-surface-2/10"
    />
  </div>
</template>

<script lang="ts" setup>
import type { TableColumn, TableSort } from "~/types/shared/VTable";
import type { Booking } from "~/types/booking";

const props = defineProps<{
  /** Already filtered bookings; this component sorts and paginates them */
  bookings: Booking[];
  activeId: string | null;
  hasActiveFilters: boolean;
}>();

const emit = defineEmits<{
  (e: "open", id: string): void;
  (e: "export-selected"): void;
  (e: "reset"): void;
}>();

/** PNRs of the checked bookings (kept across pages) */
const selectedIds = defineModel<(string | number)[]>("selectedIds", {
  required: true,
});

const columns: TableColumn[] = [
  { key: "pnr", label: "PNR Ref", sortable: true, cellClass: "whitespace-nowrap" },
  { key: "passenger", label: "Passenger / Contact", sortable: true },
  { key: "route", label: "Corridor & Departure", sortable: true },
  { key: "seats", label: "Seats" },
  {
    key: "fare",
    label: "Fare (EGP)",
    sortable: true,
    align: "end",
    cellClass: "whitespace-nowrap",
  },
  { key: "gateway", label: "Gateway", sortable: true, headerClass: "pe-4", cellClass: "pe-4" },
];

function rowClass(row: Record<string, any>) {
  // Active reservation: teal tint plus a 3px marker on the leading edge
  return [
    "cursor-pointer",
    row.id === props.activeId
      ? "bg-accent-50/70 dark:bg-accent-500/10 [box-shadow:inset_3px_0_0_0_#14b8a6] rtl:[box-shadow:inset_-3px_0_0_0_#14b8a6]"
      : "",
  ].join(" ");
}

function routeNote(b: Booking) {
  if (b.status === "cancelled") return "Cancelled";
  if (b.status === "completed") return "Arrived";
  if (b.status === "no-show") return "No-show";
  return b.gate;
}

// ── Sorting ─────────────────────────────────────────────
const sort = ref<TableSort | null>(null);

const sortedBookings = computed(() =>
  sortRows(props.bookings, sort.value, {
    pnr: (b) => b.id,
    passenger: (b) => b.passengerName,
    route: (b) => `${b.origin} ${b.destination}`,
  }),
);

// ── Pagination ──────────────────────────────────────────
const currentPage = ref(1);
const perPage = ref(PER_PAGE_OPTIONS[0]!);

const totalPages = computed(() =>
  Math.max(1, Math.ceil(props.bookings.length / perPage.value)),
);

// Filtering can shrink the list below the current page
watch(totalPages, (pages) => {
  if (currentPage.value > pages) currentPage.value = pages;
});

const pagedBookings = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  return sortedBookings.value.slice(start, start + perPage.value);
});
</script>
