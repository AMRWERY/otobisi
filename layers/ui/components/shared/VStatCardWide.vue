<template>
  <div
    class="bg-surface-0 dark:bg-[#131926] border border-border dark:border-[#1E293B] rounded-lg p-5 shadow-xs transition-all duration-150 hover:shadow-md hover:-translate-y-0.5 hover:border-teal-500/50 flex flex-col gap-4"
  >
    <div class="flex items-start justify-between gap-3">
      <div class="min-w-0">
        <span
          class="font-mono text-[11px] uppercase tracking-wider text-text-muted"
        >
          {{ label }}
        </span>
        <div class="mt-2 flex items-baseline gap-1.5 flex-wrap">
          <span
            class="font-mono text-[32px] leading-none font-semibold tracking-tight tabular-nums text-text-primary"
          >
            {{ value }}
          </span>
          <span v-if="unit" class="text-xs text-text-muted">{{ unit }}</span>
        </div>
      </div>

      <div class="flex flex-col items-end gap-1 shrink-0 text-end">
        <VTrendBadge v-if="delta != null" :delta="delta" />
        <span v-if="deltaNote" class="font-mono text-[10px] text-text-muted">
          {{ deltaNote }}
        </span>
      </div>
    </div>

    <!-- Sparkline with its anchor labels -->
    <div>
      <VSparkline :values="series" :height="64" :aria-label="`${label} trend`" />
      <div
        v-if="startLabel || endLabel"
        class="mt-1.5 flex items-center justify-between font-mono text-[10px] text-text-muted"
      >
        <span>{{ startLabel }}</span>
        <span>{{ endLabel }}</span>
      </div>
    </div>

    <div
      class="pt-3 border-t border-border/60 dark:border-[#1E293B] flex items-center justify-between gap-2 text-xs text-text-muted"
    >
      <span class="min-w-0">
        <slot name="footer">{{ footer }}</slot>
      </span>
      <slot name="footer-end" />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  label: string;
  value: string | number;
  unit?: string;
  delta?: number;
  /** Caption under the badge, e.g. "vs 7d avg" */
  deltaNote?: string;
  series: number[];
  startLabel?: string;
  endLabel?: string;
  footer?: string;
}>();
</script>
