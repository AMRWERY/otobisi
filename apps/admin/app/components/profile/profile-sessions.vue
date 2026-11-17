<template>
  <settings-section-card
    title="Active Sessions"
    subtitle="Devices currently signed in to your account."
    icon="ph:devices-bold"
    icon-class="bg-sky-50 border-sky-200 text-sky-800 dark:bg-sky-500/15 dark:border-sky-500/25 dark:text-sky-300"
  >
    <ul class="divide-y divide-border/50 border border-border/80 rounded-xl overflow-hidden">
      <li
        v-for="session in sessions"
        :key="session.id"
        class="flex items-center justify-between gap-3 px-3.5 py-3"
      >
        <div class="flex items-center gap-3 min-w-0">
          <div
            class="w-8 h-8 rounded-lg bg-surface-1 dark:bg-surface-2 text-text-muted flex items-center justify-center shrink-0"
          >
            <Icon :name="session.icon" class="w-4 h-4" />
          </div>
          <div class="min-w-0 leading-tight">
            <div class="flex items-center gap-2 text-xs font-bold text-text-primary">
              <span class="truncate">{{ session.device }}</span>
              <span
                v-if="session.current"
                class="px-1.5 rounded text-[9px] font-mono font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300"
              >
                THIS DEVICE
              </span>
            </div>
            <div class="font-mono text-[11px] text-text-muted truncate">
              {{ session.location }} • {{ session.ip }} • {{ session.lastActive }}
            </div>
          </div>
        </div>

        <VButton
          v-if="!session.current"
          variant="ghost"
          size="xs"
          rounded="lg"
          icon="ph:sign-out-bold"
          icon-class="rtl:-scale-x-100"
          custom-class="text-rose-600 hover:text-rose-700"
          @click="emit('revoke', session.id)"
        >
          Sign out
        </VButton>
      </li>
    </ul>
  </settings-section-card>
</template>

<script lang="ts" setup>
import type { ProfileSession } from "~/types/profile";

defineProps<{
  sessions: ProfileSession[];
}>();

const emit = defineEmits<{ (e: "revoke", id: string): void }>();
</script>
