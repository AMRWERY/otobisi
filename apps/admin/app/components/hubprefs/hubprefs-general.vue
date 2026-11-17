<template>
  <settings-section-card
    id="hubprefs-general"
    title="General"
    subtitle="Identity and regional settings for this hub."
    icon="ph:buildings-bold"
    icon-class="bg-teal-50 border-teal-200 text-teal-800 dark:bg-teal-500/15 dark:border-teal-500/25 dark:text-teal-300"
  >
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
      <VInput
        v-model="form.general.name"
        label="Hub Name"
        required
        icon="ph:map-pin"
        size="sm"
        rounded="lg"
        wrapper-class="sm:col-span-2"
      />
      <VFormSelect
        v-model="form.general.timezone"
        label="Time Zone"
        :options="HUBPREFS_TIMEZONES"
      />
      <VFormSelect
        v-model="form.general.currency"
        label="Currency"
        :options="HUBPREFS_CURRENCIES"
      />
      <VFormSelect
        v-model="form.general.language"
        label="Default Language"
        :options="HUBPREFS_LANGUAGES"
      />
      <VFormSelect
        v-model="form.general.weekStart"
        label="Week Starts On"
        :options="HUBPREFS_WEEK_STARTS"
      />
    </div>
  </settings-section-card>
</template>

<script lang="ts" setup>
import type { HubPrefsForm } from "~/types/hubprefs";

// The page's reactive form; fields are edited in place
const form = defineModel<HubPrefsForm>({ required: true });
</script>
