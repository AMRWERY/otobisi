<template>
  <reports-card
    title="Corridor Occupancy Ranking"
    subtitle="Ranked by seat load factor & efficiency"
  >
    <template #aside>
      <span
        class="px-2 py-0.5 rounded bg-surface-1 dark:bg-surface-2 text-text-secondary text-[10px] font-mono font-semibold"
      >
        Sorted % Load
      </span>
    </template>

    <VTable
      :columns="columns"
      :rows="ranking"
      row-key="rank"
      min-width-class="min-w-[420px]"
    >
      <template #cell-route="{ row }">
        <span class="font-mono font-bold text-text-primary">
          {{ row.rank }} {{ row.route }}
        </span>
      </template>

      <template #cell-trips="{ row }">
        <span class="font-mono text-text-muted">{{ row.trips }}</span>
      </template>

      <template #cell-fleet="{ row }">
        <span
          class="px-1.5 py-0.5 rounded bg-surface-1 dark:bg-surface-2 text-text-secondary text-[9px] font-mono font-semibold whitespace-nowrap"
        >
          {{ row.fleet }}
        </span>
      </template>

      <template #cell-occupancy="{ row }">
        <div class="flex items-center gap-1.5 font-mono">
          <div class="w-12 h-1.5 bg-surface-2 rounded-full overflow-hidden">
            <div
              :class="['h-full rounded-full', barColor(row.occupancy)]"
              :style="{ width: `${row.occupancy}%` }"
            />
          </div>
          <span class="font-bold text-text-primary">{{ row.occupancy }}%</span>
        </div>
      </template>

      <template #cell-trend="{ row }">
        <span
          :class="[
            'font-mono font-bold',
            row.trend.startsWith('+') ? 'text-emerald-500' : 'text-rose-500',
          ]"
        >
          {{ row.trend }}
        </span>
      </template>
    </VTable>

    <template #footer>
      <span>
        Threshold alerts:
        <b class="text-text-secondary">
          {{ belowTarget }} corridors below target (&lt;{{ OCCUPANCY_TARGET }}%)
        </b>
      </span>
      <NuxtLinkLocale
        to="/pricing"
        class="text-accent-700 dark:text-accent-300 font-bold hover:underline flex items-center gap-1"
      >
        <span>Configure Dynamic Yield</span>
        <Icon name="ph:arrow-right-bold" class="w-3 h-3 rtl:rotate-180" />
      </NuxtLinkLocale>
    </template>
  </reports-card>
</template>

<script lang="ts" setup>
import type { TableColumn } from "~/types/shared/VTable";
import type { OccupancyRank } from "~/types/report";

defineProps<{
  ranking: OccupancyRank[];
  belowTarget: number;
}>();

const columns: TableColumn[] = [
  { key: "route", label: "# ROUTE" },
  { key: "trips", label: "TRIPS" },
  { key: "fleet", label: "FLEET" },
  { key: "occupancy", label: "OCCUPANCY" },
  { key: "trend", label: "TREND", headerClass: "text-end", cellClass: "text-end" },
];

function barColor(occupancy: number) {
  if (occupancy >= 85) return "bg-emerald-500";
  if (occupancy >= OCCUPANCY_TARGET) return "bg-amber-500";
  return "bg-rose-500";
}
</script>
