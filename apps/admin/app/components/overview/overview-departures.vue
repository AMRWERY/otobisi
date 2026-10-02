<template>
  <div
    class="bg-surface-1 dark:bg-[#111927] border border-border/70 rounded-xl p-4 sm:p-5 flex flex-col justify-between h-full"
  >
    <!-- Header -->
    <div>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-1.5">
          <h2 class="text-sm font-black text-text-primary tracking-tight">
            Next Departures
          </h2>
          <span class="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
        </div>
        <span class="text-[11px] font-medium text-text-muted">Real-Time</span>
      </div>
      <p class="text-[11px] text-text-muted mt-0.5">
        Tracking immediate departures from Cairo Almaza & Tahrir Terminals.
      </p>
    </div>

    <!-- Departure Rows (Compact 5 items perfectly fitted to chart height) -->
    <div class="flex flex-col divide-y divide-border/40 my-auto">
      <div
        v-for="dep in departures"
        :key="dep.time + dep.route"
        class="py-1.5 first:pt-0.5 last:pb-0.5 space-y-0.5"
      >
        <!-- Line 1: Time, Route, Status Badge -->
        <div class="flex items-center justify-between gap-2">
          <div class="flex items-center gap-2 min-w-0">
            <span class="text-xs font-mono font-black text-text-primary shrink-0">{{ dep.time }}</span>
            <span class="text-xs font-bold text-text-primary truncate">{{ dep.route }}</span>
          </div>
          <span
            class="text-[9px] px-1.5 py-0.2 rounded-full font-bold whitespace-nowrap shrink-0"
            :class="statusClass(dep.status)"
          >
            {{ dep.status }}
          </span>
        </div>

        <!-- Line 2: Carrier, Gate, and Occupancy -->
        <div class="flex items-center justify-between text-[11px] text-text-muted">
          <span class="truncate">{{ dep.carrier }} · Gate {{ dep.gate }}</span>
          <span class="font-mono text-text-secondary whitespace-nowrap text-[10px]">
            {{ dep.occupancy }} <span class="text-text-muted">({{ dep.pct }}%)</span>
          </span>
        </div>

        <!-- Line 3: Progress Bar -->
        <div class="w-full h-1 rounded-full bg-surface-0 dark:bg-surface-2 overflow-hidden">
          <div
            class="h-full rounded-full transition-all duration-500"
            :class="occupancyBarClass(dep.pct)"
            :style="{ width: dep.pct + '%' }"
          />
        </div>
      </div>
    </div>

    <!-- Footer link -->
    <LazyVButton
      variant="outline"
      size="xs"
      block
      icon-right="ph:arrow-right-bold"
      icon-right-class="rtl:rotate-180"
      to="/trips-schedules"
    >
      View All 48 Departures Today
    </LazyVButton>
  </div>
</template>

<script lang="ts" setup>
const departures = [
  {
    time: "14:45",
    route: "Cairo → Alexandria (Sidi Ga...)",
    carrier: "MCV 600 VIP",
    gate: "4",
    status: "Boarding",
    occupancy: "46/48",
    pct: 96,
  },
  {
    time: "15:15",
    route: "Cairo (Tahrir) → Hurghada (...)",
    carrier: "MAN Lion's Coach",
    gate: "2",
    status: "Check-In",
    occupancy: "42/48",
    pct: 87,
  },
  {
    time: "15:45",
    route: "Cairo (Almaza) → Shar...",
    carrier: "Mercedes Travego",
    gate: "1",
    status: "On Schedule",
    occupancy: "39/44",
    pct: 89,
  },
  {
    time: "16:00",
    route: "Alex (Moharam Bek) → ...",
    carrier: "MCV 400 Eco",
    gate: "B 31",
    status: "On Schedule",
    occupancy: "31/48",
    pct: 65,
  },
  {
    time: "16:30",
    route: "Cairo (Almaza) → Dahen...",
    carrier: "Super Jet Business",
    gate: "6",
    status: "Scheduled",
    occupancy: "28/36",
    pct: 78,
  },
];

function statusClass(status: string) {
  const map: Record<string, string> = {
    Boarding:
      "bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400",
    "Check-In":
      "bg-accent-100 dark:bg-accent-950/50 text-accent-700 dark:text-accent-400",
    "On Schedule":
      "bg-sky-100 dark:bg-sky-950/50 text-sky-700 dark:text-sky-400",
    Scheduled: "bg-surface-0 dark:bg-surface-2 text-text-secondary",
  };
  return map[status] ?? "bg-surface-0 text-text-muted";
}

function occupancyBarClass(pct: number) {
  if (pct >= 90) return "bg-emerald-500";
  if (pct >= 70) return "bg-accent-500";
  if (pct >= 50) return "bg-amber-500";
  return "bg-rose-500";
}
</script>