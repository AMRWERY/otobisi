<template>
  <div class="px-6 py-6 space-y-6 max-w-[1600px] mx-auto">
    <!-- ─── Page Header ─── -->
    <div class="flex items-start justify-between flex-wrap gap-4">
      <div>
        <div class="flex items-center gap-2.5 flex-wrap">
          <h1 class="text-xl font-black text-text-primary tracking-tight">
            Operations Overview
          </h1>
          <span class="text-xs text-text-muted font-medium mt-0.5">
            · Cairo Almaza Intercity Terminal
          </span>
        </div>
        <div class="flex items-center gap-3 mt-1.5 text-[11px] text-text-muted flex-wrap">
          <span class="flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-emerald-500" />
            All 48 Vehicles Connected
          </span>
          <span>·</span>
          <span>Wednesday, 24 Oct · 14:35 CLT · Cairo Hub Time (UTC+3)</span>
        </div>
      </div>

      <!-- Actions using shared components -->
      <div class="flex items-center gap-2 flex-wrap">
        <!-- Date Selector Dropdown -->
        <LazyVDropdownMenu :items="dateItems" align="end">
          <template #trigger>
            <LazyVButton
              variant="surface"
              size="sm"
              rounded="xl"
              icon="ph:calendar-blank-bold"
              icon-right="ph:caret-down-bold"
            >
              {{ selectedDate }}
            </LazyVButton>
          </template>
        </LazyVDropdownMenu>

        <!-- Export Manifest Button -->
        <LazyVButton
          variant="outline"
          size="sm"
          rounded="xl"
          icon="ph:download-simple-bold"
          @click="handleExportManifest"
        >
          Export Manifest
        </LazyVButton>

        <!-- New Trip Schedule Link Button -->
        <LazyVButton
          to="/trips-schedules"
          variant="primary"
          size="sm"
          rounded="xl"
          icon="ph:plus-bold"
        >
          New Trip Schedule
        </LazyVButton>
      </div>
    </div>

    <!-- ─── KPI Stats ─── -->
    <lazy-overview-stats />

    <!-- ─── Main 2-column grid: Chart + Departures ─── -->
    <div class="grid grid-cols-1 xl:grid-cols-5 gap-6">
      <!-- Chart takes 3/5 -->
      <div class="xl:col-span-3">
        <lazy-overview-chart />
      </div>

      <!-- Departures takes 2/5 -->
      <div class="xl:col-span-2">
        <lazy-overview-departures />
      </div>
    </div>

    <!-- ─── Transactions Table ─── -->
    <lazy-overview-transactions />
  </div>
</template>

<script lang="ts" setup>
import type { DropdownItem } from "@otobisi/ui/types/shared/VDropdownMenu";

const toast = useToast();

const selectedDate = ref("Today, 24 Oct 2024");
const dateOptions = [
  "Today, 24 Oct 2024",
  "Yesterday, 23 Oct 2024",
  "Last 7 Days (17 - 24 Oct)",
  "This Month (Oct 2024)",
];

const dateItems = computed<DropdownItem[]>(() =>
  dateOptions.map((opt) => ({
    type: "button",
    label: opt,
    onClick: () => {
      selectedDate.value = opt;
    },
  }))
);

function handleExportManifest() {
  toast.success("Operations manifest exported successfully");
}

useSeoMeta({
  title: "Dashboard",
  description:
    "Operations overview and intercity fleet control dashboard for NileBus Cairo Almaza terminal.",
  private: false,
});
</script>