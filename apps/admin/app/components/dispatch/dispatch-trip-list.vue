<template>
  <section
    class="bg-surface-0 dark:bg-[#111927] border border-border/80 rounded-2xl overflow-hidden shadow-xs flex flex-col min-h-0"
  >
    <header
      class="px-4 py-3 border-b border-border/80 flex items-center justify-between"
    >
      <h2 class="text-sm font-bold text-text-primary">Active Trips</h2>
      <span class="font-mono text-[11px] text-text-muted">
        {{ trips.length }} shown
      </span>
    </header>

    <ul
      v-if="trips.length"
      class="divide-y divide-border/50 overflow-y-auto custom-scrollbar max-h-[420px]"
    >
      <li v-for="trip in trips" :key="trip.id">
        <button
          type="button"
          :aria-current="trip.id === selectedId ? 'true' : undefined"
          :class="[
            'w-full text-start px-4 py-3 flex flex-col gap-2 transition-colors cursor-pointer border-s-[3px]',
            trip.id === selectedId
              ? 'bg-teal-600/[0.08] dark:bg-teal-500/10 border-teal-600 dark:border-teal-500'
              : 'border-transparent hover:bg-surface-1/70 dark:hover:bg-surface-2/20',
          ]"
          @click="emit('select', trip.id)"
        >
          <div class="flex items-center justify-between gap-2">
            <span
              class="font-mono text-[11px] font-bold text-teal-700 dark:text-teal-300"
            >
              {{ trip.id }}
            </span>
            <dispatch-status-pill :status="trip.status" />
          </div>

          <div class="text-xs font-semibold text-text-primary">
            {{ DISPATCH_CORRIDORS[trip.corridor].label }}
          </div>

          <div
            class="flex items-center justify-between gap-2 font-mono text-[11px] text-text-muted"
          >
            <span>
              ETA
              <b class="text-text-primary tabular-nums">{{ dispatchEta(trip) }}</b>
              <span v-if="trip.delayMin" class="text-rose-600 dark:text-rose-400">
                (+{{ trip.delayMin }}m)
              </span>
            </span>
            <span class="tabular-nums">
              {{ trip.occupied }}/{{ trip.capacity }} seats
            </span>
          </div>
        </button>
      </li>
    </ul>

    <div v-else class="px-4 py-10 text-center text-xs text-text-muted">
      No trips match the current filters
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { DispatchTrip } from "~/types/dispatch";

defineProps<{
  trips: DispatchTrip[];
  selectedId: string | null;
}>();

const emit = defineEmits<{ (e: "select", id: string): void }>();
</script>
