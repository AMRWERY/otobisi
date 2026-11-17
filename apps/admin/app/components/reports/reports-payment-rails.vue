<template>
  <reports-card
    title="Payment Rails Distribution"
    subtitle="Egyptian clearing rails & counter settlements"
  >
    <template #aside>
      <div class="p-1 rounded bg-surface-2 text-text-muted">
        <Icon name="ph:credit-card-bold" class="w-4 h-4" />
      </div>
    </template>

    <div class="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center mt-3">
      <!-- Donut -->
      <div
        class="sm:col-span-5 relative flex items-center justify-center py-2"
      >
        <svg
          class="w-36 h-36 -rotate-90"
          viewBox="0 0 100 100"
          role="img"
          aria-label="Bookings by payment rail"
        >
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
            stroke="currentColor"
            class="text-surface-2"
            stroke-width="14"
          />
          <circle
            v-for="seg in segments"
            :key="seg.label"
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
            :stroke="seg.color"
            stroke-width="14"
            :stroke-dasharray="`${seg.length} ${CIRCUMFERENCE}`"
            :stroke-dashoffset="-seg.offset"
          />
        </svg>
        <div
          class="absolute inset-0 flex flex-col items-center justify-center text-center"
        >
          <span class="text-base font-extrabold font-mono text-text-primary">
            {{ totalLabel }}
          </span>
          <span
            class="text-[9px] font-mono uppercase tracking-wider text-text-muted"
          >
            Bookings
          </span>
        </div>
      </div>

      <!-- Legend -->
      <div class="sm:col-span-7 space-y-1.5 text-xs font-mono">
        <div
          v-for="rail in rails"
          :key="rail.label"
          class="flex items-center justify-between gap-2"
        >
          <div class="flex items-center gap-1.5 min-w-0">
            <span
              class="w-2 h-2 rounded-xs shrink-0"
              :style="{ backgroundColor: rail.color }"
            />
            <span class="text-text-secondary truncate">{{ rail.label }}</span>
          </div>
          <span class="font-bold text-text-primary whitespace-nowrap">
            {{ rail.share.toFixed(1) }}%
            <span class="text-text-muted font-normal text-[10px]">
              {{ rail.transactions.toLocaleString("en-US") }} tx
            </span>
          </span>
        </div>
      </div>
    </div>

    <template #footer>
      <span class="flex items-center gap-1.5">
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        Gateway uptime: <b class="text-text-secondary">99.98%</b>
      </span>
      <span>Fawry Avg Latency: <b class="text-text-secondary">1.2s</b></span>
    </template>
  </reports-card>
</template>

<script lang="ts" setup>
import type { PaymentRail } from "~/types/report";

const props = defineProps<{
  rails: PaymentRail[];
  total: number;
}>();

// 2πr for r = 40
const CIRCUMFERENCE = 251.2;

// Each segment starts where the previous one ended
const segments = computed(() => {
  let offset = 0;
  return props.rails.map((rail) => {
    const length = (rail.share / 100) * CIRCUMFERENCE;
    const seg = { label: rail.label, color: rail.color, length, offset };
    offset += length;
    return seg;
  });
});

const totalLabel = computed(() => `${(props.total / 1000).toFixed(1)}k`);
</script>
