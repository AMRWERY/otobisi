<template>
  <settings-section-card
    id="settings-notifications"
    title="Notifications & Alerts"
    subtitle="Choose which operational events reach your team, and on which channel."
    icon="ph:bell-ringing-bold"
    icon-class="bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-500/15 dark:border-amber-500/25 dark:text-amber-300"
  >
    <template #aside>
      <span
        class="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-surface-1 dark:bg-surface-2 border border-border text-text-secondary"
      >
        {{ enabledCount }} of {{ totalCount }} routes on
      </span>
    </template>

    <!-- Event × channel matrix -->
    <div class="border border-border/80 rounded-xl overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-xs min-w-[560px]">
          <thead>
            <tr
              class="bg-surface-1/60 dark:bg-surface-2/10 border-b border-border/80"
            >
              <th
                scope="col"
                class="py-2.5 px-3 text-start text-[10px] font-mono uppercase tracking-wider text-text-muted font-bold"
              >
                Event
              </th>
              <th
                v-for="channel in SETTINGS_NOTIFICATION_CHANNELS"
                :key="channel.key"
                scope="col"
                class="py-2.5 px-2 text-center text-[10px] font-mono uppercase tracking-wider text-text-muted font-bold w-20"
              >
                <span class="inline-flex flex-col items-center gap-0.5">
                  <Icon :name="channel.icon" class="w-3.5 h-3.5" />
                  {{ channel.label }}
                </span>
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border/50">
            <tr
              v-for="event in SETTINGS_NOTIFICATION_EVENTS"
              :key="event.key"
              class="hover:bg-surface-1/50 dark:hover:bg-surface-2/10 transition-colors"
            >
              <td class="py-3 px-3">
                <div class="flex items-center gap-2.5">
                  <div
                    :class="[
                      'w-7 h-7 rounded-lg flex items-center justify-center shrink-0',
                      event.iconClass,
                    ]"
                  >
                    <Icon :name="event.icon" class="w-4 h-4" />
                  </div>
                  <div class="leading-tight">
                    <div class="flex items-center gap-1.5 font-bold text-text-primary">
                      {{ event.label }}
                      <span
                        v-if="event.critical"
                        class="px-1.5 rounded text-[9px] font-mono font-bold bg-rose-50 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300"
                      >
                        CRITICAL
                      </span>
                    </div>
                    <div class="text-[11px] text-text-muted">
                      {{ event.description }}
                    </div>
                  </div>
                </div>
              </td>
              <td
                v-for="channel in SETTINGS_NOTIFICATION_CHANNELS"
                :key="channel.key"
                class="py-3 px-2 text-center"
              >
                <div class="flex justify-center">
                  <VSwitchButton
                    v-model="form.notifications[event.key][channel.key]"
                    :label="`${event.label} via ${channel.label}`"
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <!-- Quiet hours -->
      <div
        class="p-3.5 rounded-xl bg-surface-1/60 dark:bg-surface-2/20 border border-border/80 space-y-3"
      >
        <div class="flex items-start justify-between gap-3">
          <div>
            <div class="flex items-center gap-1.5 font-bold text-text-primary text-xs">
              <Icon name="ph:moon-stars-bold" class="w-4 h-4 text-indigo-500" />
              Quiet hours
            </div>
            <p class="text-[11px] text-text-muted mt-0.5">
              Hold non-critical alerts overnight. Critical events still get
              through.
            </p>
          </div>
          <VSwitchButton
            v-model="form.quietHours.enabled"
            label="Enable quiet hours"
          />
        </div>

        <div class="grid grid-cols-2 gap-2">
          <VInput
            v-model="form.quietHours.from"
            label="From"
            type="time"
            size="sm"
            rounded="lg"
            :disabled="!form.quietHours.enabled"
            label-class="text-[10px] text-text-muted font-normal"
          />
          <VInput
            v-model="form.quietHours.to"
            label="Until"
            type="time"
            size="sm"
            rounded="lg"
            :disabled="!form.quietHours.enabled"
            label-class="text-[10px] text-text-muted font-normal"
          />
        </div>
      </div>

      <!-- Digest -->
      <div
        class="p-3.5 rounded-xl bg-surface-1/60 dark:bg-surface-2/20 border border-border/80 space-y-3"
      >
        <div>
          <div class="flex items-center gap-1.5 font-bold text-text-primary text-xs">
            <Icon name="ph:newspaper-clipping-bold" class="w-4 h-4 text-teal-600" />
            Performance digest
          </div>
          <p class="text-[11px] text-text-muted mt-0.5">
            A summary of bookings, revenue and occupancy sent to
            <span class="font-mono text-text-secondary">
              {{ form.dispatchEmail }}
            </span>
          </p>
        </div>

        <VTabs v-model="form.digest" :tabs="SETTINGS_DIGEST_TABS" />
      </div>
    </div>
  </settings-section-card>
</template>

<script lang="ts" setup>
import type { SettingsForm } from "~/types/settings";

// The page's reactive form; fields are edited in place
const form = defineModel<SettingsForm>({ required: true });

const enabledCount = computed(() =>
  Object.values(form.value.notifications).reduce(
    (sum, channels) => sum + Object.values(channels).filter(Boolean).length,
    0,
  ),
);

const totalCount =
  SETTINGS_NOTIFICATION_EVENTS.length * SETTINGS_NOTIFICATION_CHANNELS.length;
</script>
