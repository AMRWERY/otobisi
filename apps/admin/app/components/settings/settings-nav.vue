<template>
  <div
    class="bg-surface-0 dark:bg-[#111927] border border-border/80 rounded-xl p-2.5 shadow-xs"
  >
    <div
      class="text-[9px] font-mono uppercase tracking-wider text-text-muted font-bold px-2 py-1"
    >
      Configuration Sections
    </div>
    <nav class="space-y-1 mt-1 text-xs font-mono">
      <button
        v-for="section in SETTINGS_SECTIONS"
        :key="section.key"
        type="button"
        :aria-current="active === section.key ? 'true' : undefined"
        :class="[
          'w-full flex items-center justify-between gap-2 px-2.5 py-2 rounded-lg transition-colors text-start cursor-pointer',
          active === section.key
            ? 'bg-[#0F5A47] text-white font-bold'
            : section.available
              ? 'text-text-secondary hover:bg-surface-1'
              : 'text-text-muted hover:bg-surface-1',
        ]"
        @click="emit('select', section.key)"
      >
        <span class="flex items-center gap-2">
          <Icon :name="section.icon" class="w-4 h-4" />
          <span>{{ section.label }}</span>
        </span>
        <span
          v-if="!section.available"
          class="text-[9px] bg-surface-2 text-text-muted px-1.5 rounded font-semibold"
        >
          Soon
        </span>
        <span
          v-else-if="section.badge && active !== section.key"
          :class="[
            'text-[9px] px-1.5 rounded font-semibold',
            section.badgeClass || 'bg-surface-2 text-text-secondary',
          ]"
        >
          {{ section.badge }}
        </span>
      </button>
    </nav>
  </div>
</template>

<script lang="ts" setup>
import type { SettingsSectionKey } from "~/types/settings";

defineProps<{
  active: SettingsSectionKey;
}>();

const emit = defineEmits<{
  (e: "select", key: SettingsSectionKey): void;
}>();
</script>
