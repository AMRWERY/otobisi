<template>
  <settings-section-card
    id="hubprefs-defaults"
    title="New Trip Defaults"
    subtitle="Pre-filled values when you add a trip schedule from this hub."
    icon="ph:sliders-horizontal-bold"
    icon-class="bg-sky-50 border-sky-200 text-sky-800 dark:bg-sky-500/15 dark:border-sky-500/25 dark:text-sky-300"
  >
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
      <VFormSelect
        v-model="form.tripDefaults.vehicleClass"
        label="Default Vehicle Class"
        :options="HUBPREFS_VEHICLE_CLASSES"
      />
      <VFormSelect
        v-model="form.tripDefaults.fareRounding"
        label="Fare Rounding"
        :options="HUBPREFS_FARE_ROUNDING"
      />
    </div>
  </settings-section-card>
</template>

<script lang="ts" setup>
import type { HubPrefsForm } from "~/types/hubprefs";

// The page's reactive form; fields are edited in place
const form = defineModel<HubPrefsForm>({ required: true });
</script>
