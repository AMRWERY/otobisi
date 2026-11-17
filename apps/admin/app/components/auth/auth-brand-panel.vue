<template>
  <aside
    class="relative overflow-hidden flex flex-col justify-between p-10 xl:p-14 bg-[#0B0F17] text-slate-100"
  >
    <!-- Teal glow + hairline grid, masked toward the corners -->
    <div
      class="absolute inset-0 pointer-events-none"
      aria-hidden="true"
      :style="{
        backgroundImage:
          'radial-gradient(60% 50% at 15% 10%, rgba(20,184,166,0.22), transparent 70%), radial-gradient(50% 40% at 90% 95%, rgba(15,90,71,0.35), transparent 70%)',
      }"
    />
    <div
      class="absolute inset-0 pointer-events-none opacity-[0.35]"
      aria-hidden="true"
      :style="{
        backgroundImage:
          'linear-gradient(to right, rgba(148,163,184,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.12) 1px, transparent 1px)',
        backgroundSize: '44px 44px',
        maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
      }"
    />

    <!-- Brand -->
    <div class="relative flex items-center gap-3">
      <div
        class="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-300 flex items-center justify-center"
      >
        <Icon name="ph:arrows-left-right-bold" class="w-5 h-5" />
      </div>
      <div class="leading-tight">
        <div class="flex items-center gap-1.5">
          <span class="font-extrabold text-lg">NileBus</span>
          <span
            class="text-[9px] font-mono font-bold px-1 rounded bg-teal-500/15 text-teal-300"
          >
            OPS
          </span>
        </div>
        <div class="font-mono text-[10px] uppercase tracking-wider text-slate-500">
          Otobisi Operator Console
        </div>
      </div>
    </div>

    <!-- Pitch -->
    <div class="relative space-y-8 max-w-md">
      <div class="space-y-3">
        <h2 class="text-3xl xl:text-4xl font-black tracking-tight leading-tight">
          Run every departure from one console.
        </h2>
        <p class="text-sm text-slate-400 leading-relaxed">
          Dispatch, ticketing, fleet and settlements for Egypt's intercity
          routes, in Arabic and English.
        </p>
      </div>

      <ul class="space-y-3">
        <li
          v-for="point in points"
          :key="point.label"
          class="flex items-center gap-3 text-sm text-slate-300"
        >
          <span
            class="w-7 h-7 rounded-lg bg-white/5 border border-white/10 text-teal-300 flex items-center justify-center shrink-0"
          >
            <Icon :name="point.icon" class="w-4 h-4" />
          </span>
          {{ point.label }}
        </li>
      </ul>
    </div>

    <!-- Live status snippet -->
    <div
      class="relative rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm px-4 py-3 font-mono text-[11px] flex flex-wrap items-center justify-between gap-x-6 gap-y-2"
    >
      <span class="flex items-center gap-2 text-slate-300">
        <span class="relative flex h-2 w-2">
          <span
            class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
          />
          <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        Hub #402 Almaza • Operational
      </span>
      <span class="text-slate-500">Gateway sync <b class="text-slate-300">100%</b></span>
      <span class="text-slate-500">22ms</span>
    </div>
  </aside>
</template>

<script lang="ts" setup>
const points = [
  { icon: "ph:map-trifold-bold", label: "Live dispatch map and gate control" },
  { icon: "ph:ticket-bold", label: "Bookings, manifests and e-tickets" },
  { icon: "ph:credit-card-bold", label: "Fawry & Meeza settlements, reconciled" },
];
</script>
