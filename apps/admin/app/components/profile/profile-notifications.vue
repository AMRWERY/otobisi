<template>
  <div
    class="bg-surface-0 dark:bg-[#111927] border border-border/80 rounded-xl p-4 shadow-xs space-y-3"
  >
    <header>
      <h3 class="font-bold text-sm text-text-primary">Quick Alerts</h3>
      <p class="text-[11px] font-mono text-text-muted">
        Personal toggles. Hub-wide routing lives in Operator Settings.
      </p>
    </header>

    <ul class="space-y-1">
      <li
        v-for="toggle in PROFILE_TOGGLES"
        :key="toggle.key"
        class="flex items-center justify-between gap-3 py-2"
      >
        <div class="flex items-center gap-2.5 min-w-0">
          <Icon :name="toggle.icon" class="w-4 h-4 text-text-muted shrink-0" />
          <div class="leading-tight min-w-0">
            <div class="text-xs font-semibold text-text-primary">
              {{ toggle.label }}
            </div>
            <div class="text-[11px] text-text-muted">{{ toggle.description }}</div>
          </div>
        </div>
        <VSwitchButton
          v-model="form.notifications[toggle.key]"
          :label="toggle.label"
        />
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import type { ProfileForm } from "~/types/profile";

// The page's reactive form; fields are edited in place
const form = defineModel<ProfileForm>({ required: true });
</script>
