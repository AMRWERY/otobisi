<template>
  <div
    role="alert"
    :class="[
      'flex items-start gap-2.5 rounded-xl border px-3.5 py-3 text-xs leading-relaxed',
      TONES[tone].box,
    ]"
  >
    <Icon :name="TONES[tone].icon" class="w-4 h-4 mt-0.5 shrink-0" />
    <div class="min-w-0">
      <p v-if="title" class="font-bold">{{ title }}</p>
      <div><slot /></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { AuthAlertTone } from "~/types/auth";

withDefaults(
  defineProps<{
    tone?: AuthAlertTone;
    title?: string;
  }>(),
  { tone: "error", title: undefined },
);

const TONES: Record<AuthAlertTone, { box: string; icon: string }> = {
  error: {
    box: "bg-rose-50 border-rose-200 text-rose-800 dark:bg-rose-500/10 dark:border-rose-500/25 dark:text-rose-300",
    icon: "ph:warning-circle-bold",
  },
  success: {
    box: "bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-500/10 dark:border-emerald-500/25 dark:text-emerald-300",
    icon: "ph:check-circle-bold",
  },
  info: {
    box: "bg-teal-50 border-teal-200 text-teal-900 dark:bg-teal-500/10 dark:border-teal-500/25 dark:text-teal-200",
    icon: "ph:info-bold",
  },
};
</script>
