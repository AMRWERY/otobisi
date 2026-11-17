<template>
  <settings-section-card
    id="hubprefs-hours"
    title="Operating Hours"
    subtitle="When the hub's gates, counters and dispatch desk are staffed."
    icon="ph:clock-bold"
    icon-class="bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-500/15 dark:border-amber-500/25 dark:text-amber-300"
  >
    <div class="border border-border/80 rounded-xl overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-xs min-w-[480px]">
          <thead>
            <tr class="bg-surface-1/70 dark:bg-[#131926] border-b border-border/70">
              <th
                v-for="col in ['Day', 'Open', 'From', 'Until', 'Hours']"
                :key="col"
                scope="col"
                class="h-9 px-3 text-start text-[11px] font-mono font-semibold uppercase tracking-wider text-text-muted"
              >
                {{ col }}
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border/50">
            <tr v-for="day in HUBPREFS_DAYS" :key="day.key">
              <td class="px-3 py-2 font-semibold text-text-primary">
                {{ day.label }}
              </td>
              <td class="px-3 py-2">
                <VSwitchButton
                  v-model="form.hours[day.key].open"
                  :label="`${day.label} open`"
                />
              </td>
              <td class="px-3 py-2 w-36">
                <VInput
                  v-model="form.hours[day.key].from"
                  type="time"
                  size="sm"
                  rounded="lg"
                  :disabled="!form.hours[day.key].open"
                />
              </td>
              <td class="px-3 py-2 w-36">
                <VInput
                  v-model="form.hours[day.key].to"
                  type="time"
                  size="sm"
                  rounded="lg"
                  :disabled="!form.hours[day.key].open"
                />
              </td>
              <td class="px-3 py-2 font-mono tabular-nums text-text-muted">
                <template v-if="form.hours[day.key].open">
                  {{ hubprefsOpenHours(form.hours[day.key].from, form.hours[day.key].to) }}h
                  <span
                    v-if="form.hours[day.key].to <= form.hours[day.key].from"
                    class="text-[10px]"
                  >
                    (+1d)
                  </span>
                </template>
                <span v-else>Closed</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </settings-section-card>
</template>

<script lang="ts" setup>
import type { HubPrefsForm } from "~/types/hubprefs";

// The page's reactive form; fields are edited in place
const form = defineModel<HubPrefsForm>({ required: true });
</script>
