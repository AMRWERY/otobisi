<template>
  <div
    class="bg-surface-0 dark:bg-[#111927] border border-border/80 rounded-xl p-4 shadow-xs flex flex-col justify-between"
  >
    <div>
      <div class="flex items-center justify-between mb-3 gap-3">
        <div>
          <h3 class="font-bold text-sm text-text-primary">
            Almaza Central Dispatch & Maintenance Yards
          </h3>
          <div class="text-[11px] font-mono text-text-muted">
            Cairo Hub #04 • 14 Platform Gates • 6 Workshop Bays
          </div>
        </div>
        <span
          class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/15 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/25 text-[10px] font-mono font-bold shrink-0"
        >
          <span
            class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"
          />
          LIVE RADAR
        </span>
      </div>

      <!-- Radar mock-up (placeholder until the live map exists) -->
      <div
        class="relative h-48 w-full rounded-lg overflow-hidden border border-border bg-[#0e1626]"
      >
        <svg
          class="absolute inset-0 w-full h-full opacity-40"
          viewBox="0 0 600 240"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <path
            d="M0 60C120 40 220 80 340 70C460 60 520 20 600 40"
            stroke="#334155"
            stroke-width="2"
          />
          <path
            d="M40 240C120 180 280 200 400 170C520 140 560 190 600 180"
            stroke="#334155"
            stroke-width="2"
          />
          <circle
            cx="280"
            cy="120"
            r="40"
            stroke="#006654"
            stroke-width="1.5"
            stroke-dasharray="3 3"
          />
          <circle
            cx="280"
            cy="120"
            r="80"
            stroke="#006654"
            stroke-width="1"
            stroke-dasharray="4 4"
            class="opacity-50"
          />
          <line
            x1="280"
            y1="20"
            x2="280"
            y2="220"
            stroke="#1e293b"
            stroke-width="1"
          />
          <line
            x1="50"
            y1="120"
            x2="550"
            y2="120"
            stroke="#1e293b"
            stroke-width="1"
          />
        </svg>

        <div
          class="absolute top-4 start-6 text-[10px] font-mono text-slate-300 font-semibold bg-black/50 px-2 py-0.5 rounded backdrop-blur-xs"
        >
          Al Zaitoun / El Korba Square
        </div>
        <div
          class="absolute top-4 end-6 text-[10px] font-mono text-slate-300 font-semibold bg-black/50 px-2 py-0.5 rounded backdrop-blur-xs"
        >
          Cairo Intl Airport
        </div>
        <div
          class="absolute bottom-4 start-4 flex items-center gap-2 bg-black/75 px-3 py-1 rounded-md border border-slate-700 backdrop-blur-xs"
        >
          <div class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span class="text-[11px] font-mono text-emerald-300 font-bold">
            Cairo Almaza Transit Terminal (29.986° N, 31.421° E)
          </span>
        </div>
        <div
          class="absolute bottom-4 end-4 text-[10px] font-mono text-white/90 bg-[#006654]/80 px-2 py-1 rounded border border-teal-500/50"
        >
          Current Coaches In Depot: <strong>{{ inDepot }}</strong>
        </div>
      </div>
    </div>

    <!-- Yard occupancy -->
    <div
      class="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-border/60 text-center font-mono"
    >
      <div
        v-for="item in occupancy"
        :key="item.label"
        class="bg-surface-1 dark:bg-surface-2/30 p-2 rounded-lg border border-border/70"
      >
        <span class="text-[9px] text-text-muted block uppercase">
          {{ item.label }}
        </span>
        <span :class="['text-xs font-bold', item.tone]">{{ item.value }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  /** Coaches currently parked at the hub */
  inDepot: number;
}>();

// Placeholder until the yard telemetry endpoint exists
const occupancy = [
  { label: "Terminal Gates", value: "11/14 Occupied", tone: "text-text-primary" },
  {
    label: "Service Pit Bays",
    value: "3/4 Engaged",
    tone: "text-amber-600 dark:text-amber-400",
  },
  {
    label: "Overnight Staging",
    value: "9/20 Used",
    tone: "text-accent-800 dark:text-accent-300",
  },
];
</script>
