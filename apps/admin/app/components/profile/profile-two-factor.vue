<template>
  <settings-section-card
    title="Two-Factor Authentication"
    subtitle="A second step at sign-in keeps your hub's bookings and settlements safe."
    icon="ph:shield-check-bold"
    icon-class="bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-500/15 dark:border-emerald-500/25 dark:text-emerald-300"
  >
    <template #aside>
      <VTrendBadge
        :tone="enabled ? 'positive' : 'critical'"
        :label="enabled ? 'Protected' : 'Off'"
      />
    </template>

    <div
      class="p-3.5 rounded-xl bg-surface-1/60 dark:bg-surface-2/20 border border-border/80 flex items-center justify-between gap-4"
    >
      <div class="flex items-center gap-3">
        <div
          class="w-9 h-9 rounded-lg bg-teal-600/10 dark:bg-teal-500/15 text-teal-700 dark:text-teal-300 flex items-center justify-center shrink-0"
        >
          <Icon name="ph:device-mobile-camera-bold" class="w-5 h-5" />
        </div>
        <div>
          <div class="text-xs font-bold text-text-primary">
            Authenticator app & SMS
          </div>
          <p class="text-[11px] text-text-muted">
            Required by your organization for owners and managers.
          </p>
        </div>
      </div>
      <VSwitchButton v-model="enabled" label="Two-factor authentication" />
    </div>
  </settings-section-card>
</template>

<script lang="ts" setup>
const enabled = defineModel<boolean>({ required: true });
</script>
