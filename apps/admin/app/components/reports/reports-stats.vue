<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <div
      v-for="kpi in kpis"
      :key="kpi.label"
      class="bg-surface-0 dark:bg-[#111927] border border-border/80 rounded-xl p-4 shadow-xs flex flex-col justify-between hover:border-accent-500/40 transition-colors"
    >
      <div class="flex items-center justify-between mb-1 text-text-muted">
        <span
          class="text-[10px] font-mono uppercase tracking-wider font-semibold"
        >
          {{ kpi.label }}
        </span>
        <div :class="['p-1 rounded', kpi.iconBg, kpi.iconColor]">
          <Icon :name="kpi.icon" class="w-4 h-4" />
        </div>
      </div>

      <div class="flex items-baseline gap-2">
        <span
          class="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight text-text-primary"
        >
          {{ kpi.value }}
        </span>
        <span v-if="kpi.unit" class="text-xs font-mono text-text-muted">
          {{ kpi.unit }}
        </span>
        <span
          :class="[
            'ms-auto text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border',
            kpi.delta >= 0
              ? 'text-emerald-600 bg-emerald-500/10 border-emerald-500/20'
              : 'text-rose-600 bg-rose-500/10 border-rose-500/20',
          ]"
        >
          {{ kpi.delta >= 0 ? "↑ +" : "↓ " }}{{ kpi.delta }}%
        </span>
      </div>

      <div
        class="flex items-center justify-between text-[11px] font-mono text-text-muted mt-2 pt-2 border-t border-border/60"
      >
        <span>{{ kpi.footLeft }}</span>
        <span :class="kpi.footRightClass">{{ kpi.footRight }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ReportKpi } from "~/types/report";

defineProps<{
  kpis: ReportKpi[];
}>();
</script>
