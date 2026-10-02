<template>
  <div class="flex flex-col gap-1 w-28">
    <div class="flex items-center justify-between text-[11px] font-mono">
      <span class="font-semibold text-text-primary">
        {{ occupied }}/{{ capacity }}
      </span>
      <span class="font-bold text-[10px]" :class="labelClass">
        {{ rate === 100 ? "100% Full" : `${rate}%` }}
      </span>
    </div>
    <div class="h-1.5 w-full bg-surface-2 rounded-full overflow-hidden">
      <div
        class="h-full rounded-full transition-all duration-300"
        :class="barClass"
        :style="{ width: `${rate}%` }"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  occupied: number;
  capacity: number;
  /** Occupancy percentage, 0–100 */
  rate: number;
}>();

const labelClass = computed(() =>
  props.rate >= 95
    ? "text-emerald-700 dark:text-emerald-400"
    : props.rate >= 70
      ? "text-text-primary"
      : "text-text-muted",
);

const barClass = computed(() =>
  props.rate >= 90
    ? "bg-emerald-600"
    : props.rate >= 60
      ? "bg-teal-600"
      : props.rate > 0
        ? "bg-blue-500"
        : "bg-transparent",
);
</script>
