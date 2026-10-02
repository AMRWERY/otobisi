<template>
  <div class="px-6 py-6 space-y-6 max-w-[1600px] mx-auto">
    <!-- ─── Page Header ─── -->
    <div class="flex items-start justify-between flex-wrap gap-4">
      <div>
        <div class="flex items-center gap-2.5 flex-wrap">
          <h1 class="text-xl font-black text-text-primary tracking-tight">Operations Overview</h1>
          <span class="text-xs text-text-muted font-medium mt-0.5">· Cairo Almaza Intercity Terminal</span>
        </div>
        <div class="flex items-center gap-3 mt-1.5 text-[11px] text-text-muted flex-wrap">
          <span class="flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-emerald-500" />
            All 48 Vehicles Connected
          </span>
          <span>·</span>
          <span>Wednesday, 24 Oct · 14:35 CLT · Cairo Hub Time (UTC+3)</span>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-2 flex-wrap">
        <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-1 dark:bg-surface-2/50 border border-border/70 text-xs text-text-secondary cursor-pointer hover:border-accent-500 transition-colors select-none">
          <Icon name="ph:calendar-blank-bold" class="w-3.5 h-3.5 text-text-muted" />
          <span class="font-medium">Today, 24 Oct 2024</span>
          <Icon name="ph:caret-down-bold" class="w-3 h-3 text-text-muted" />
        </div>
        <button
          type="button"
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border/70 text-xs font-medium text-text-secondary hover:text-text-primary hover:border-accent-500 transition-colors cursor-pointer bg-surface-1 dark:bg-surface-2/50"
        >
          <Icon name="ph:download-simple-bold" class="w-3.5 h-3.5" />
          Export Manifest
        </button>
        <button
          type="button"
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-accent-600 hover:bg-accent-700 text-white text-xs font-bold shadow-sm shadow-accent-900/20 transition-colors cursor-pointer"
        >
          <Icon name="ph:plus-bold" class="w-3.5 h-3.5" />
          New Trip Schedule
        </button>
      </div>
    </div>

    <!-- ─── KPI Stats ─── -->
    <overview-stats />

    <!-- ─── Main 2-column grid: Chart + Departures ─── -->
    <div class="grid grid-cols-1 xl:grid-cols-5 gap-6">
      <!-- Chart takes 3/5 -->
      <div class="xl:col-span-3">
        <overview-chart />
      </div>

      <!-- Departures takes 2/5 -->
      <div class="xl:col-span-2">
        <overview-departures />
      </div>
    </div>

    <!-- ─── Transactions Table ─── -->
    <overview-transactions />
  </div>
</template>

<script lang="ts" setup>
useSeoMeta({
  title: "Dashboard",
});
</script>