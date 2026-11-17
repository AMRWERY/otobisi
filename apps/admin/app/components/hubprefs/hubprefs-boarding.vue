<template>
  <settings-section-card
    id="hubprefs-boarding"
    title="Boarding Rules"
    subtitle="Check-in, gate and luggage rules shown to passengers and gate staff."
    icon="ph:identification-badge-bold"
    icon-class="bg-indigo-50 border-indigo-200 text-indigo-800 dark:bg-indigo-500/15 dark:border-indigo-500/25 dark:text-indigo-300"
  >
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
      <VInput
        v-model.number="form.boarding.checkInOpensMin"
        label="Check-in Opens"
        type="number"
        :min="0"
        :step="5"
        size="sm"
        rounded="lg"
        hint="Minutes before departure"
      />
      <VInput
        v-model.number="form.boarding.gateClosesMin"
        label="Gate Closes"
        type="number"
        :min="0"
        :step="5"
        size="sm"
        rounded="lg"
        hint="Minutes before departure"
      />
      <VInput
        v-model.number="form.boarding.luggageLimitKg"
        label="Luggage Limit per Passenger"
        type="number"
        :min="0"
        size="sm"
        rounded="lg"
        hint="Kilograms, hold luggage"
      />
      <VInput
        v-model.number="form.boarding.noShowGraceMin"
        label="No-show Grace Period"
        type="number"
        :min="0"
        size="sm"
        rounded="lg"
        hint="Minutes after the gate closes"
      />
    </div>

    <!-- Live summary of the timeline these numbers produce -->
    <div
      class="p-3 rounded-xl bg-surface-1/60 dark:bg-surface-2/20 border border-border/80 font-mono text-[11px] text-text-secondary flex items-center gap-3 flex-wrap"
    >
      <span class="flex items-center gap-1.5">
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        Check-in T−{{ form.boarding.checkInOpensMin }}
      </span>
      <Icon name="ph:arrow-right" class="w-3 h-3 text-text-muted rtl:rotate-180" />
      <span class="flex items-center gap-1.5">
        <span class="w-1.5 h-1.5 rounded-full bg-amber-500" />
        Gate closes T−{{ form.boarding.gateClosesMin }}
      </span>
      <Icon name="ph:arrow-right" class="w-3 h-3 text-text-muted rtl:rotate-180" />
      <span class="flex items-center gap-1.5">
        <span class="w-1.5 h-1.5 rounded-full bg-rose-500" />
        No-show T+{{ form.boarding.noShowGraceMin }}
      </span>
    </div>
  </settings-section-card>
</template>

<script lang="ts" setup>
import type { HubPrefsForm } from "~/types/hubprefs";

// The page's reactive form; fields are edited in place
const form = defineModel<HubPrefsForm>({ required: true });
</script>
