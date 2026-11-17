<template>
  <section
    class="bg-surface-0 dark:bg-[#111927] border border-border/80 rounded-xl p-4 shadow-xs flex flex-col gap-3"
  >
    <header class="flex items-start justify-between gap-3">
      <div>
        <h3 class="font-bold text-sm text-text-primary">
          Seat Load Heatmap
        </h3>
        <p class="text-[11px] font-mono text-text-muted">
          Average load by weekday and departure hour
        </p>
      </div>
      <span
        class="px-2 py-0.5 rounded bg-surface-1 dark:bg-surface-2 text-text-secondary text-[10px] font-mono font-semibold whitespace-nowrap"
      >
        Peak: {{ peak.day }} {{ formatHour(peak.hour) }} • {{ peak.value }}%
      </span>
    </header>

    <div class="overflow-x-auto">
      <div
        class="grid gap-1 min-w-[460px]"
        :style="{ gridTemplateColumns: `3rem repeat(${REVENUE_HEAT_HOURS.length}, minmax(0, 1fr))` }"
        role="table"
        aria-label="Seat load by weekday and hour"
      >
        <!-- Hour header -->
        <span />
        <span
          v-for="hour in REVENUE_HEAT_HOURS"
          :key="hour"
          class="text-center font-mono text-[10px] text-text-muted pb-1"
        >
          {{ formatHour(hour) }}
        </span>

        <template v-for="day in REVENUE_HEAT_DAYS" :key="day">
          <span class="font-mono text-[11px] text-text-muted self-center">
            {{ day }}
          </span>
          <div
            v-for="cell in rowCells(day)"
            :key="`${day}-${cell.hour}`"
            :class="[
              'h-9 rounded flex items-center justify-center font-mono text-[11px] font-semibold tabular-nums transition-transform hover:scale-105',
              revenueHeatClass(cell.value),
            ]"
            :title="`${day} ${formatHour(cell.hour)} — ${cell.value}% load`"
          >
            {{ cell.value }}
          </div>
        </template>
      </div>
    </div>

    <!-- Legend -->
    <div
      class="flex items-center gap-3 flex-wrap pt-3 mt-auto border-t border-border/60 text-[10px] font-mono text-text-muted"
    >
      <span>Seat load</span>
      <span
        v-for="step in REVENUE_HEAT_STEPS"
        :key="step.label"
        class="flex items-center gap-1.5"
      >
        <span :class="['w-3 h-3 rounded-sm', step.cell.split(' ')[0]]" />
        {{ step.label }}
      </span>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { RevenueHeatCell } from "~/types/revenue";

const props = defineProps<{
  cells: RevenueHeatCell[];
  peak: RevenueHeatCell;
}>();

const formatHour = (hour: number) => `${String(hour).padStart(2, "0")}:00`;

const rowCells = (day: string) => props.cells.filter((c) => c.day === day);
</script>
