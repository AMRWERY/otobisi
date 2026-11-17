<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <!-- Total active fleet -->
    <div :class="cardClass">
      <div class="flex items-center justify-between mb-2">
        <span :class="labelClass">Total Active Fleet</span>
        <Icon name="ph:bus" class="w-4 h-4 text-accent-700" />
      </div>
      <div class="flex items-baseline gap-2">
        <span :class="valueClass">{{ total }}</span>
        <span
          class="text-xs font-semibold text-emerald-600 dark:text-emerald-400"
        >
          {{ inService }} Ready ({{ readyPercent }}%)
        </span>
      </div>
      <div
        class="w-full bg-surface-2 rounded-full h-1.5 mt-3 overflow-hidden"
        role="progressbar"
        :aria-valuenow="readyPercent"
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div
          class="bg-[#0F5A47] h-1.5 rounded-full"
          :style="{ width: `${readyPercent}%` }"
        />
      </div>
    </div>

    <!-- Inspection due -->
    <div :class="cardClass">
      <div class="flex items-center justify-between mb-2">
        <span :class="labelClass">Inspection Due</span>
        <Icon name="ph:wrench" class="w-4 h-4 text-amber-600" />
      </div>
      <div class="flex items-baseline gap-2">
        <span :class="valueClass">{{ maintenance }}</span>
        <span class="text-xs font-medium text-text-muted">Next 7 Days</span>
      </div>
      <div
        class="mt-2 text-[10px] font-mono text-amber-700 dark:text-amber-400 flex items-center gap-1"
      >
        <Icon name="ph:warning" class="w-3.5 h-3.5" />
        <span>Depot #04 & Almaza Bay</span>
      </div>
    </div>

    <!-- Average vehicle age -->
    <div :class="cardClass">
      <div class="flex items-center justify-between mb-2">
        <span :class="labelClass">Avg. Vehicle Age</span>
        <Icon name="ph:shield-check" class="w-4 h-4 text-emerald-600" />
      </div>
      <div class="flex items-baseline gap-2">
        <span :class="valueClass">{{ avgAge }}</span>
        <span class="text-xs font-medium text-text-muted">Years</span>
      </div>
      <div
        class="mt-2 text-[10px] font-mono font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/15 px-2 py-0.5 rounded w-fit border border-emerald-200/50 dark:border-emerald-500/25"
      >
        Euro 5 / 6 Compliant
      </div>
    </div>

    <!-- Network capacity -->
    <div :class="cardClass">
      <div class="flex items-center justify-between mb-2">
        <span :class="labelClass">Network Capacity</span>
        <Icon name="ph:chart-bar" class="w-4 h-4 text-accent-700" />
      </div>
      <div class="flex items-baseline justify-between">
        <div>
          <span :class="[valueClass, '!text-2xl']">{{ seatsLabel }}</span>
          <span class="text-[11px] font-medium text-text-muted ms-1">
            Live Seats
          </span>
        </div>
        <div class="text-end">
          <span class="text-xs font-bold text-accent-800 font-mono">
            {{ readyPercent }}%
          </span>
          <span class="text-[10px] text-text-muted block font-mono">
            Utilized
          </span>
        </div>
      </div>
      <div class="mt-2 text-[10px] font-mono text-text-muted truncate">
        Cairo ⇄ Alex / Red Sea
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  total: number;
  inService: number;
  maintenance: number;
  avgAge: number;
  /** Seats across coaches that are currently in service */
  liveSeats: number;
}>();

const cardClass =
  "bg-surface-0 dark:bg-[#111927] border border-border/80 rounded-xl p-4 shadow-xs flex flex-col justify-between hover:border-accent-500/40 transition-colors";
const labelClass =
  "text-[10px] font-mono font-bold tracking-wider uppercase text-text-muted";
const valueClass =
  "text-3xl font-extrabold text-text-primary tracking-tight font-mono";

const readyPercent = computed(() =>
  props.total ? Math.round((props.inService / props.total) * 1000) / 10 : 0,
);

const seatsLabel = computed(() => props.liveSeats.toLocaleString("en-US"));
</script>
