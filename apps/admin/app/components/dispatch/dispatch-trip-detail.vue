<template>
  <section
    class="bg-surface-0 dark:bg-[#111927] border border-border/80 rounded-2xl shadow-xs overflow-hidden"
  >
    <template v-if="trip">
      <header
        class="px-4 py-3 border-b border-border/80 flex items-start justify-between gap-3"
      >
        <div>
          <div class="flex items-center gap-2">
            <span
              class="font-mono text-sm font-extrabold text-teal-700 dark:text-teal-300"
            >
              {{ trip.id }}
            </span>
            <dispatch-status-pill :status="trip.status" />
          </div>
          <p class="text-xs font-semibold text-text-primary mt-1">
            {{ corridor.label }}
          </p>
        </div>
        <span class="font-mono text-[11px] text-text-muted text-end">
          {{ trip.vehicle }}<br />{{ trip.plate }}
        </span>
      </header>

      <div class="p-4 space-y-4">
        <!-- Journey progress -->
        <div>
          <div class="flex items-center justify-between font-mono text-[11px] text-text-muted mb-1.5">
            <span>{{ DISPATCH_CITIES[corridor.path[0]!].name }}</span>
            <span>{{ DISPATCH_CITIES[corridor.path[corridor.path.length - 1]!].name }}</span>
          </div>
          <div
            class="h-1.5 rounded-full bg-surface-2 overflow-hidden"
            role="progressbar"
            :aria-valuenow="Math.round(trip.progress * 100)"
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div
              class="h-full rounded-full bg-teal-600 dark:bg-teal-400 transition-all duration-1000"
              :style="{ width: `${trip.progress * 100}%` }"
            />
          </div>
          <p class="font-mono text-[11px] text-text-muted mt-1.5">
            {{ Math.round(trip.progress * corridor.km) }} of {{ corridor.km }} km
            • {{ dispatchDuration(dispatchMinutesLeft(trip)) }} left
          </p>
        </div>

        <!-- Key figures -->
        <dl class="grid grid-cols-3 gap-2 text-center">
          <div
            v-for="item in figures"
            :key="item.label"
            class="rounded-lg bg-surface-1 dark:bg-surface-2/30 border border-border/70 py-2"
          >
            <dt class="font-mono text-[9px] uppercase tracking-wider text-text-muted">
              {{ item.label }}
            </dt>
            <dd :class="['font-mono text-sm font-bold tabular-nums', item.class]">
              {{ item.value }}
            </dd>
          </div>
        </dl>

        <!-- Occupancy -->
        <div>
          <div class="flex items-center justify-between text-[11px] mb-1.5">
            <span class="font-mono uppercase tracking-wider text-text-muted">Occupancy</span>
            <span class="font-mono font-bold text-text-primary tabular-nums">
              {{ trip.occupied }}/{{ trip.capacity }} • {{ dispatchOccupancyPercent(trip) }}%
            </span>
          </div>
          <div class="h-1.5 rounded-full bg-surface-2 overflow-hidden">
            <div
              :class="[
                'h-full rounded-full',
                dispatchOccupancyPercent(trip) >= 85 ? 'bg-emerald-500' : 'bg-amber-500',
              ]"
              :style="{ width: `${dispatchOccupancyPercent(trip)}%` }"
            />
          </div>
        </div>

        <!-- Driver -->
        <div
          class="flex items-center gap-3 p-3 rounded-xl bg-surface-1/60 dark:bg-surface-2/20 border border-border/70"
        >
          <div
            class="w-9 h-9 rounded-full bg-teal-600/10 dark:bg-teal-500/15 text-teal-700 dark:text-teal-300 flex items-center justify-center shrink-0"
          >
            <Icon name="ph:steering-wheel-bold" class="w-4 h-4" />
          </div>
          <div class="min-w-0 leading-tight">
            <div class="text-xs font-bold text-text-primary truncate">{{ trip.driver }}</div>
            <div class="font-mono text-[11px] text-text-muted" dir="ltr">
              {{ trip.driverPhone }}
            </div>
          </div>
        </div>

        <div class="flex items-center gap-2 flex-wrap">
          <VButton
            variant="surface"
            size="sm"
            rounded="lg"
            icon="ph:phone-call-bold"
            @click="emit('call', trip)"
          >
            Call driver
          </VButton>
          <VButton
            :to="`/manifest?trip=${trip.id}`"
            variant="surface"
            size="sm"
            rounded="lg"
            icon="ph:users-three-bold"
          >
            Manifest
          </VButton>
          <VButton
            v-if="trip.status === 'delayed'"
            variant="unstyled"
            size="sm"
            custom-class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white cursor-pointer"
            icon="ph:megaphone-bold"
            @click="emit('broadcast', trip)"
          >
            Notify passengers
          </VButton>
        </div>
      </div>
    </template>

    <div v-else class="px-4 py-12 text-center text-xs text-text-muted">
      <Icon name="ph:bus-bold" class="w-6 h-6 mx-auto mb-2 opacity-60" />
      Select a bus on the map to see its details
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { DispatchTrip } from "~/types/dispatch";

const props = defineProps<{
  trip: DispatchTrip | null;
}>();

const emit = defineEmits<{
  (e: "call", trip: DispatchTrip): void;
  (e: "broadcast", trip: DispatchTrip): void;
}>();

// Only read when a trip is selected (the template guards on `trip`)
const corridor = computed(() => DISPATCH_CORRIDORS[props.trip?.corridor ?? "cai-alx"]);

const figures = computed(() => {
  const t = props.trip;
  if (!t) return [];
  return [
    { label: "Speed", value: `${t.speed} km/h`, class: "text-text-primary" },
    { label: "ETA", value: dispatchEta(t), class: "text-text-primary" },
    {
      label: "Delay",
      value: t.delayMin ? `+${t.delayMin}m` : "On time",
      class: t.delayMin ? "text-rose-600 dark:text-rose-400" : "text-emerald-600 dark:text-emerald-400",
    },
  ];
});
</script>
