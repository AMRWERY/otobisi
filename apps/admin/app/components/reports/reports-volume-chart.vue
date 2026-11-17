<template>
  <reports-card
    title="Daily Volume & Revenue Velocity"
    subtitle="Tickets booked vs. 7-day rolling baseline"
  >
    <template #aside>
      <VTabs v-model="view" :tabs="VOLUME_VIEW_TABS" />
    </template>

    <!-- Chart mock-up (placeholder until the analytics endpoint exists) -->
    <div class="relative h-44 w-full mt-2">
      <div
        class="absolute top-2 end-24 bg-[#0F172A] border border-slate-700 text-white px-2.5 py-1.5 rounded-lg shadow-lg font-mono text-[10px] z-10"
      >
        <div class="text-slate-400 uppercase font-bold text-[9px]">
          Wed, Oct 23 Peak
        </div>
        <div class="font-bold text-emerald-400">
          742 bookings • 161,800 EGP
        </div>
      </div>

      <svg
        class="w-full h-full overflow-visible"
        viewBox="0 0 500 140"
        fill="none"
        dir="ltr"
        role="img"
        aria-label="Daily bookings against the 7-day baseline"
      >
        <defs>
          <linearGradient id="reports-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#00A884" stop-opacity="0.35" />
            <stop offset="100%" stop-color="#00A884" stop-opacity="0" />
          </linearGradient>
        </defs>

        <g class="text-border" stroke="currentColor">
          <line x1="0" y1="35" x2="500" y2="35" stroke-dasharray="3 3" />
          <line x1="0" y1="85" x2="500" y2="85" stroke-dasharray="3 3" />
          <line x1="0" y1="130" x2="500" y2="130" />
        </g>

        <path
          d="M 0 120 Q 50 115 100 95 T 200 90 T 300 65 T 380 25 T 450 70 T 500 45 L 500 135 L 0 135 Z"
          fill="url(#reports-area)"
        />
        <path
          d="M 0 110 Q 80 100 180 85 T 340 70 T 500 55"
          stroke="#94A3B8"
          stroke-width="1.5"
          stroke-dasharray="4 4"
        />
        <path
          d="M 0 120 Q 50 115 100 95 T 200 90 T 300 65 T 380 25 T 450 70 T 500 45"
          stroke="#00A884"
          stroke-width="2.5"
        />
        <circle
          cx="380"
          cy="25"
          r="4.5"
          fill="#00A884"
          stroke="#ffffff"
          stroke-width="2"
        />
      </svg>

      <div
        class="flex justify-between text-[10px] font-mono text-text-muted mt-2"
        dir="ltr"
      >
        <span>Oct 01</span>
        <span>Oct 07</span>
        <span>Oct 14</span>
        <span>Oct 21</span>
        <span class="text-accent-700 dark:text-accent-300 font-bold">
          Oct 23 (Peak)
        </span>
        <span>Oct 28</span>
      </div>
    </div>

    <template #footer>
      <div class="flex items-center gap-4">
        <span class="flex items-center gap-1.5">
          <span class="w-3 h-0.5 bg-[#00A884]" />
          Actual Daily Run-rate
        </span>
        <span class="flex items-center gap-1.5">
          <span class="w-3 border-t border-dashed border-text-muted" />
          7-Day Rolling Baseline
        </span>
      </div>
      <span>Mean Daily: <b class="text-text-secondary">628.4 tickets/day</b></span>
    </template>
  </reports-card>
</template>

<script lang="ts" setup>
// View is cosmetic for now; the chart is static mock data
const view = ref("daily");
</script>
