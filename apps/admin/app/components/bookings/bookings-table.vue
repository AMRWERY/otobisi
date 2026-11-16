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
          :disabled="!bookings.length"
          @change="emit('toggle-all')"
        />
        <span v-if="selectedIds.length" class="font-semibold text-text-primary">
          {{ selectedIds.length.toLocaleString("en-US") }} selected
        </span>
        <span v-else>
          Select all {{ bookings.length.toLocaleString("en-US") }} results
        </span>
      </label>

      <div class="flex items-center gap-3">
        <template v-if="selectedIds.length">
          <VButton
            variant="ghost"
            size="xs"
            rounded="lg"
            icon="ph:download-simple-bold"
            @click="emit('export-selected')"
          >
            Export selected
          </VButton>
        </template>
        <span
          class="flex items-center gap-1.5 text-[11px] font-medium text-accent-700 dark:text-accent-300"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-accent-500 animate-pulse" />
          Real-time feed active
        </span>
      </div>
    </div>

    <VTable
      :columns="columns"
      :rows="pagedBookings"
      row-key="id"
      min-width-class="min-w-[860px]"
      :row-class="rowClass"
      empty-text="No reservations match your filters"
      @row-click="(row) => emit('open', row.id)"
    >
      <template #header-select>
        <span class="sr-only">Select</span>
      </template>

      <!-- Checkbox + active-row marker -->
      <template #cell-select="{ row }">
        <span
          v-if="row.id === activeId"
          class="absolute inset-y-0 start-0 w-0.5 bg-accent-500"
        />
        <input
          type="checkbox"
          class="checkbox"
          :checked="selectedIds.includes(row.id)"
          :aria-label="`Select booking ${row.id}`"
          @click.stop
          @change="emit('toggle', row.id)"
        />
      </template>

      <!-- PNR -->
      <template #cell-pnr="{ row }">
        <span
          class="font-mono text-[11px] font-bold text-emerald-700 dark:text-emerald-400 whitespace-nowrap"
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
        :total="bookings.length"
        :page-size="perPage"
        item-label="records"
        show-summary
        class="flex-1 border-t-0 pt-0"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { DropdownItem } from "@otobisi/ui/types/shared/VDropdownMenu";
import type { TableColumn } from "@otobisi/ui/types/shared/VTable";
import type { Booking } from "~/types/booking";

const props = defineProps<{
  /** Already filtered bookings; this component only paginates them */
  bookings: Booking[];
  activeId: string | null;
  selectedIds: string[];
  allSelected: boolean;
}>();

const emit = defineEmits<{
  (e: "open", id: string): void;
  (e: "toggle", id: string): void;
  (e: "toggle-all"): void;
  (e: "export-selected"): void;
}>();

const columns: TableColumn[] = [
  { key: "select", label: "", headerClass: "w-10 ps-4", cellClass: "relative ps-4" },
  { key: "pnr", label: "PNR REF", cellClass: "whitespace-nowrap" },
  { key: "passenger", label: "PASSENGER / CONTACT" },
  { key: "route", label: "CORRIDOR & DEPARTURE" },
  { key: "seats", label: "SEATS" },
  {
    key: "fare",
    label: "FARE (EGP)",
    headerClass: "text-end",
    cellClass: "text-end whitespace-nowrap",
  },
  { key: "gateway", label: "GATEWAY", headerClass: "pe-4", cellClass: "pe-4" },
];

const someSelected = computed(
  () => props.selectedIds.length > 0 && !props.allSelected,
);

function rowClass(row: Record<string, any>) {
  const selected = props.selectedIds.includes(row.id);
  return [
    "cursor-pointer",
    row.id === props.activeId
      ? "bg-accent-50/70 dark:bg-accent-500/10"
      : selected
        ? "bg-surface-1/70 dark:bg-surface-2/20"
        : "",
  ].join(" ");
}

function routeNote(b: Booking) {
  if (b.status === "cancelled") return "Cancelled";
  if (b.status === "completed") return "Arrived";
  if (b.status === "no-show") return "No-show";
  return b.gate;
}

// ── Pagination ──────────────────────────────────────────
const currentPage = ref(1);
const perPage = ref(PER_PAGE_OPTIONS[0]!);

const perPageItems = computed<DropdownItem[]>(() =>
  PER_PAGE_OPTIONS.map((size) => ({
    type: "button",
    label: `${size} per page`,
    onClick: () => {
      perPage.value = size;
      currentPage.value = 1;
    },
  })),
);

const totalPages = computed(() =>
  Math.max(1, Math.ceil(props.bookings.length / perPage.value)),
);

// Filtering can shrink the list below the current page
watch(totalPages, (pages) => {
  if (currentPage.value > pages) currentPage.value = pages;
});

const pagedBookings = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  return props.bookings.slice(start, start + perPage.value);
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
