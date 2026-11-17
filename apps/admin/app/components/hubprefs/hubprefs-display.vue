<template>
  <settings-section-card
    id="hubprefs-display"
    title="Display"
    subtitle="How the admin looks for people working at this hub."
    icon="ph:layout-bold"
    icon-class="bg-purple-50 border-purple-200 text-purple-800 dark:bg-purple-500/15 dark:border-purple-500/25 dark:text-purple-300"
  >
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
      <div class="space-y-1.5">
        <span class="text-xs font-semibold text-text-primary/90 block">
          Table Density
        </span>
        <VTabs v-model="form.display.density" :tabs="HUBPREFS_DENSITY_TABS" />
        <p class="text-[11px] text-text-muted">
          Compact rows are 40px, comfortable rows 52px.
        </p>
      </div>

      <VFormSelect
        v-model="form.display.landingPage"
        label="Landing Page After Sign-in"
        :options="HUBPREFS_LANDING_PAGES"
      />
    </div>
  </settings-section-card>
</template>

<script lang="ts" setup>
import type { HubPrefsForm } from "~/types/hubprefs";

// The page's reactive form; fields are edited in place
const form = defineModel<HubPrefsForm>({ required: true });
</script>
