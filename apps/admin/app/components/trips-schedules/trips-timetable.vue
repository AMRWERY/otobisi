<template>
  <div
    class="bg-surface-0 dark:bg-[#111927] border border-border/80 rounded-2xl overflow-hidden shadow-xs"
  >
    <!-- Top bar -->
    <div
      class="px-6 py-4 border-b border-border/80 flex items-center justify-between flex-wrap gap-3"
    >
      <div class="flex items-center gap-3">
        <h2 class="text-sm font-extrabold text-text-primary">
          Egyptian Intercity Timetable Matrix
        </h2>
        <span class="text-xs font-mono text-text-muted">
          Updated {{ lastUpdatedText }}
        </span>
      </div>

      <div
        class="flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400"
      >
        <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>Normal Operating Cadence</span>
      </div>
    </div>

    <VTable
      :columns="columns"
      :rows="paginatedTrips"
      row-key="id"
      min-width-class="min-w-[950px]"
      empty-text="No timetable routes found matching your criteria"
    >
      <!-- Trip ID & Corridor -->
      <template #cell-tripId="{ row }">
        <div class="flex flex-col gap-0.5">
          <div class="flex items-center gap-2">
            <span
              class="font-mono text-[11px] font-bold text-emerald-700 dark:text-emerald-400"
            >
              {{ row.id }}
            </span>
            <span
              v-if="!row.status"
              class="px-1.5 py-0.2 rounded text-[9px] font-bold bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400"
            >
              SUSPENDED
            </span>
          </div>
          <div
            class="flex items-center gap-1.5 text-xs font-semibold text-text-primary"
          >
            <span>{{ row.originShort || row.origin }}</span>
            <Icon
              name="ph:arrow-right"
              class="w-3 h-3 text-text-muted rtl:rotate-180 shrink-0"
            />
            <span>{{ row.destinationShort || row.destination }}</span>
          </div>
        </div>
      </template>

      <!-- Departure -->
      <template #cell-departure="{ row }">
        <div
          class="flex flex-col"
          :class="{ 'line-through text-text-muted': !row.status }"
        >
          <span class="font-bold text-text-primary text-xs font-mono">
            {{ row.departTime }}
          </span>
          <span class="text-[11px] text-text-muted">{{ row.gate }}</span>
        </div>
      </template>

      <!-- Arrival & Duration -->
      <template #cell-arrival="{ row }">
        <div
          class="flex flex-col"
          :class="{ 'line-through text-text-muted': !row.status }"
        >
          <div class="flex items-center gap-1">
            <span class="font-bold text-text-primary text-xs font-mono">
              {{ row.estArrival }}
            </span>
            <span
              v-if="row.overnight"
              class="text-[10px] font-bold text-amber-600 dark:text-amber-400 font-mono"
            >
              +1d
            </span>
          </div>
          <span class="text-[11px] text-text-muted">{{ row.duration }}</span>
        </div>
      </template>

      <!-- Vehicle Class & Reg -->
      <template #cell-vehicle="{ row }">
        <div class="flex items-center gap-2.5">
          <div
            class="w-7 h-7 rounded-lg bg-surface-2/60 dark:bg-surface-2 text-text-secondary flex items-center justify-center shrink-0"
          >
            <Icon name="ph:bus-bold" class="w-3.5 h-3.5 text-text-muted" />
          </div>
          <div class="flex flex-col leading-tight">
            <span class="font-bold text-text-primary text-xs">
              {{ row.vehicle }}
            </span>
            <span class="font-mono text-[10px] text-text-muted">
              {{ row.plate }}
            </span>
          </div>
        </div>
      </template>

      <!-- Capacity -->
      <template #cell-capacity="{ row }">
        <span class="font-mono text-xs font-semibold text-text-primary">
          {{ row.capacity }}
        </span>
      </template>

      <!-- Seat Occupancy -->
      <template #cell-occupancy="{ row }">
        <TripOccupancy
          :occupied="row.occupied"
          :capacity="row.capacity"
          :rate="row.occupancyRate"
        />
      </template>

      <!-- Base Fare -->
      <template #cell-fare="{ row }">
        <span class="font-mono font-bold text-xs text-text-primary">
          {{ Number(row.fare).toFixed(2) }}
        </span>
      </template>

      <!-- Status -->
      <template #cell-status="{ row }">
        <LazyVSwitchButton
          :model-value="row.status"
          :label="row.status ? 'Deactivate Trip' : 'Activate Trip'"
          @update:model-value="emit('toggle-status', row as Trip)"
        />
      </template>

      <!-- Row actions -->
      <template #cell-actions="{ row }">
        <VDropdownMenu :items="getRowActions(row as Trip)" align="right">
          <template #trigger>
            <VButton
              variant="ghost"
              size="xs"
              rounded="lg"
              icon="ph:dots-three-vertical-bold"
              aria-label="Trip actions"
            />
          </template>
        </VDropdownMenu>
      </template>
    </VTable>

    <!-- Footer: per page + pagination -->
    <div
      class="px-6 py-4 border-t border-border/80 flex items-center justify-between flex-wrap gap-4 text-xs"
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
        :total="trips.length"
        :page-size="perPage"
        item-label="timetable slots"
        show-summary
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { DropdownItem } from "@otobisi/ui/types/shared/VDropdownMenu";
import type { TableColumn } from "@otobisi/ui/types/shared/VTable";
import type { Trip } from "~/types/trip";

const props = defineProps<{
  /** Already filtered trips; this component only paginates them */
  trips: Trip[];
}>();

const emit = defineEmits<{
  (e: "toggle-status", trip: Trip): void;
  (e: "edit", trip: Trip): void;
  (e: "duplicate", trip: Trip): void;
  (e: "view-manifest", trip: Trip): void;
  (e: "delete", trip: Trip): void;
}>();

const lastUpdatedText = ref("3 mins ago");

const columns: TableColumn[] = [
  {
    key: "tripId",
    label: "TRIP ID & CORRIDOR",
    headerClass: "ps-6",
    cellClass: "ps-6 whitespace-nowrap",
  },
  { key: "departure", label: "DEPARTURE", cellClass: "whitespace-nowrap" },
  {
    key: "arrival",
    label: "ARRIVAL & DURATION",
    cellClass: "whitespace-nowrap",
  },
  {
    key: "vehicle",
    label: "VEHICLE CLASS & REG",
    cellClass: "whitespace-nowrap",
  },
  { key: "capacity", label: "CAPACITY", cellClass: "whitespace-nowrap" },
  {
    key: "occupancy",
    label: "SEAT OCCUPANCY",
    cellClass: "whitespace-nowrap min-w-[130px]",
  },
  { key: "fare", label: "BASE FARE (EGP)", cellClass: "whitespace-nowrap" },
  { key: "status", label: "STATUS", cellClass: "whitespace-nowrap" },
  {
    key: "actions",
    label: "ACTIONS",
    headerClass: "pe-6 text-center",
    cellClass: "pe-6 text-center whitespace-nowrap",
  },
];

// ── Pagination ──────────────────────────────────────────────
const currentPage = ref(1);
const perPage = ref(8);

const perPageItems = computed<DropdownItem[]>(() =>
  [8, 16, 24, 48].map((size) => ({
    type: "button",
    label: `${size} per page`,
    onClick: () => {
      perPage.value = size;
      currentPage.value = 1;
    },
  })),
);

const totalPages = computed(() =>
  Math.max(1, Math.ceil(props.trips.length / perPage.value)),
);

// Filtering can shrink the list below the current page
watch(totalPages, (pages) => {
  if (currentPage.value > pages) currentPage.value = pages;
});

const paginatedTrips = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  return props.trips.slice(start, start + perPage.value);
});

const getRowActions = (trip: Trip): DropdownItem[] => [
  {
    type: "button",
    label: "Edit Schedule",
    icon: "ph:pencil-simple-bold",
    onClick: () => emit("edit", trip),
  },
  {
    type: "button",
    label: "Duplicate Trip",
    icon: "ph:copy-bold",
    onClick: () => emit("duplicate", trip),
  },
  {
    type: "button",
    label: "View Manifest",
    icon: "ph:users-three-bold",
    onClick: () => emit("view-manifest", trip),
  },
  { type: "divider" },
  {
    type: "button",
    label: "Cancel Trip",
    icon: "ph:trash-bold",
    danger: true,
    onClick: () => emit("delete", trip),
  },
];
</script>
