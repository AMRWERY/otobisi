<template>
  <div class="bg-surface-1 dark:bg-[#111927] border border-border/70 rounded-xl p-5 flex flex-col gap-4">
    <!-- Header -->
    <div class="flex items-start justify-between flex-wrap gap-2">
      <div>
        <h2 class="text-sm font-black text-text-primary tracking-tight">Bookings & Ticket Volume</h2>
        <p class="text-[11px] text-text-muted mt-0.5">
          Total <span class="font-semibold text-text-secondary">38,420</span> tickets confirmed
          <span class="text-accent-600 dark:text-accent-400 font-bold">+7.42M EGP</span> Gross GMV
        </p>
      </div>

      <!-- Date range tabs -->
      <div class="flex items-center gap-1 bg-surface-0 dark:bg-surface-2/50 rounded-lg p-0.5 border border-border/50">
        <button
          v-for="range in ranges"
          :key="range"
          type="button"
          class="px-3 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer"
          :class="activeRange === range
            ? 'bg-accent-600 text-white shadow-sm'
            : 'text-text-muted hover:text-text-primary'"
          @click="activeRange = range"
        >
          {{ range }}
        </button>
      </div>
    </div>

    <!-- Chart SVG Area -->
    <div class="relative w-full" style="height: 220px;">
      <svg
        viewBox="0 0 700 200"
        preserveAspectRatio="none"
        class="w-full h-full"
        aria-hidden="true"
      >
        <!-- Grid lines -->
        <line v-for="y in [40, 80, 120, 160, 200]" :key="y" x1="0" :y1="y" x2="700" :y2="y" stroke="var(--border)" stroke-width="1" stroke-dasharray="4 4" opacity="0.5" />

        <!-- Area fill (confirmed tickets) -->
        <defs>
          <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#22a693" stop-opacity="0.18" />
            <stop offset="100%" stop-color="#22a693" stop-opacity="0.01" />
          </linearGradient>
          <linearGradient id="dottedFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#6366f1" stop-opacity="0.10" />
            <stop offset="100%" stop-color="#6366f1" stop-opacity="0.01" />
          </linearGradient>
        </defs>

        <!-- Confirmed tickets area curve -->
        <path
          d="M0,180 C50,175 80,170 120,160 C160,150 180,140 220,130 C260,120 280,100 320,85 C360,70 380,65 420,55 C460,45 480,42 520,38 C560,34 590,36 640,30 C660,28 680,28 700,28"
          fill="url(#areaFill)"
          stroke="none"
        />
        <path
          d="M0,180 C50,175 80,170 120,160 C160,150 180,140 220,130 C260,120 280,100 320,85 C360,70 380,65 420,55 C460,45 480,42 520,38 C560,34 590,36 640,30 C660,28 680,28 700,28"
          fill="none"
          stroke="#22a693"
          stroke-width="2.5"
          stroke-linecap="round"
        />

        <!-- Station POS dashed line -->
        <path
          d="M0,185 C60,183 100,180 150,175 C200,170 230,165 280,158 C330,151 360,148 400,145 C440,142 480,138 530,128 C570,120 610,108 650,95 C670,89 685,85 700,82"
          fill="none"
          stroke="#6366f1"
          stroke-width="2"
          stroke-dasharray="5 3"
          stroke-linecap="round"
          opacity="0.7"
        />

        <!-- Route Peak tooltip indicator -->
        <circle cx="310" cy="85" r="5" fill="#22a693" stroke="var(--surface-0)" stroke-width="2" />
        <!-- Vertical dotted marker -->
        <line x1="310" y1="5" x2="310" y2="200" stroke="#22a693" stroke-width="1" stroke-dasharray="3 3" opacity="0.4" />
      </svg>

      <!-- Tooltip overlay -->
      <div
        class="absolute pointer-events-none"
        style="left: 44%; top: 18px;"
      >
        <div class="bg-surface-0 dark:bg-[#1B2438] border border-border shadow-lg rounded-xl px-3 py-2 text-xs w-48">
          <div class="flex items-center justify-between mb-1">
            <span class="font-bold text-text-primary">Oct 23 (Yesterday)</span>
            <span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-500 text-white">ROUTE PEAK</span>
          </div>
          <p class="text-sm font-black text-text-primary">1,512 bookings</p>
          <p class="text-[11px] text-text-muted">302,400 EGP · Cairo-Alex peak</p>
        </div>
        <div class="w-px h-3 bg-accent-600 mx-auto opacity-60" />
      </div>
    </div>

    <!-- X-axis labels -->
    <div class="flex justify-between text-[10px] text-text-muted font-mono px-1">
      <span>Oct 01</span>
      <span>Oct 05</span>
      <span>Oct 10</span>
      <span>Oct 15</span>
      <span>Oct 20</span>
      <span class="text-text-primary font-semibold">Oct 24 (Today)</span>
    </div>

    <!-- Legend -->
    <div class="flex items-center gap-6 text-[11px] text-text-muted border-t border-border/60 pt-3 flex-wrap">
      <div class="flex items-center gap-2">
        <span class="w-6 h-0.5 bg-accent-500 rounded-full inline-block" />
        <span>Confirmed Tickets (Total)</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="w-6 h-0.5 bg-indigo-400 rounded-full inline-block border border-dashed" style="border-top: 2px dashed #818cf8; height: 0; width: 20px; background: none;" />
        <span>Station Counter POS</span>
      </div>
      <span class="text-text-muted text-[10px] ms-auto hidden md:inline">Platform Split: 78% Mobile / 22% Station Desk</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
const ranges = ["7D", "30D", "90D", "12M"];
const activeRange = ref("30D");
</script>
