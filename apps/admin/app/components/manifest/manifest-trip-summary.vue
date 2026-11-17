<template>
  <section
    class="bg-surface-0 dark:bg-[#111927] border border-border/80 rounded-2xl p-4 sm:p-5 shadow-xs"
  >
    <div class="flex items-start justify-between gap-4 flex-wrap">
      <div class="min-w-0">
        <div class="flex items-center gap-2 flex-wrap">
          <span class="font-mono text-sm font-extrabold text-teal-700 dark:text-teal-300">
            {{ trip.id }}
          </span>
          <span
            :class="[
              'inline-flex items-center h-5 px-2 rounded-full border text-[11px] font-semibold',
              MANIFEST_PHASE_TONES[trip.phase],
            ]"
          >
            {{ MANIFEST_PHASE_LABELS[trip.phase] }}
          </span>
        </div>

        <div class="mt-2 flex items-center gap-2 text-base font-bold text-text-primary flex-wrap">
          <span>{{ trip.origin }}</span>
          <Icon name="ph:arrow-right-bold" class="w-4 h-4 text-text-muted rtl:rotate-180" />
          <span>{{ trip.destination }}</span>
        </div>
      </div>

      <dl class="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-3 text-xs">
        <div v-for="item in details" :key="item.label">
          <dt class="font-mono text-[10px] uppercase tracking-wider text-text-muted">
            {{ item.label }}
          </dt>
          <dd class="mt-0.5 font-semibold text-text-primary">{{ item.value }}</dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { ManifestTrip } from "~/types/manifest";

const props = defineProps<{
  trip: ManifestTrip;
}>();

const details = computed(() => [
  { label: "Departure", value: `${props.trip.departDay}, ${props.trip.departTime}` },
  { label: "Gate", value: props.trip.gate },
  { label: "Vehicle", value: `${props.trip.vehicle} • ${props.trip.plate}` },
  { label: "Driver", value: props.trip.driver },
]);
</script>
