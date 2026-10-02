<template>
  <div
    class="bg-surface-1 dark:bg-[#111927] border border-border/70 rounded-xl p-5 flex flex-col gap-3"
  >
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2
          class="text-sm font-black text-text-primary tracking-tight flex items-center gap-2"
        >
          Next Departures
          <span class="relative flex h-2 w-2">
            <span
              class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
            />
            <span
              class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"
            />
          </span>
        </h2>
        <p class="text-[11px] text-text-muted mt-0.5">
          Real-Time tracking from Cairo Almaza & Tahrir Terminals.
        </p>
      </div>
    </div>

    <!-- Departure Rows -->
    <div class="flex flex-col divide-y divide-border/50">
      <div
        v-for="dep in departures"
        :key="dep.time + dep.route"
        class="py-3 flex items-start gap-3 group hover:bg-surface-0 dark:hover:bg-surface-2/20 -mx-2 px-2 rounded-lg transition-colors"
      >
        <!-- Time -->
        <div class="shrink-0 text-end w-10">
          <span class="text-xs font-black text-text-primary">{{
            dep.time
          }}</span>
        </div>

        <!-- Route & Carrier info -->
        <div class="flex-1 min-w-0">
          <p class="text-xs font-bold text-text-primary truncate">
            {{ dep.route }}
          </p>
          <p class="text-[11px] text-text-muted truncate mt-0.5">
            {{ dep.carrier }} · Gate {{ dep.gate }}
          </p>
        </div>

        <!-- Occupancy & Status -->
        <div class="shrink-0 flex flex-col items-end gap-1">
          <span
            class="text-[10px] px-2 py-0.5 rounded-full font-bold"
            :class="statusClass(dep.status)"
          >
            {{ dep.status }}
          </span>
          <div class="flex items-center gap-1">
            <span
              class="text-[11px] font-mono font-semibold text-text-primary"
              >{{ dep.occupancy }}</span
            >
          </div>
          <!-- Occupancy bar -->
          <div
            class="w-20 h-1.5 rounded-full bg-surface-0 dark:bg-surface-2 overflow-hidden"
          >
            <div
              class="h-full rounded-full transition-all duration-500"
              :class="occupancyBarClass(dep.pct)"
              :style="{ width: dep.pct + '%' }"
            />
          </div>
          <span class="text-[10px] text-text-muted">({{ dep.pct }}%)</span>
        </div>
      </div>
    </div>

    <!-- Footer link -->
    <LazyVButton
      variant="outline"
      size="sm"
      block
      custom-class="mt-1"
      icon-right="ph:arrow-right-bold"
      icon-right-class="rtl:rotate-180"
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