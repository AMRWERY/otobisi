<template>
  <div
    class="bg-surface-0 dark:bg-[#111927] lg:border border-border/80 lg:rounded-xl lg:p-2.5 lg:shadow-xs"
  >
    <div
      class="hidden lg:block text-[9px] font-mono uppercase tracking-wider text-text-muted font-bold px-2 py-1"
    >
      Configuration Sections
    </div>

    <!-- Horizontal scrolling tabs below lg, vertical list from lg up -->
    <nav
      class="flex lg:block gap-1 lg:gap-0 lg:space-y-1 lg:mt-1 overflow-x-auto lg:overflow-visible text-xs font-mono"
    >
      <button
        v-for="section in SETTINGS_SECTIONS"
        :key="section.key"
        type="button"
        :aria-current="active === section.key ? 'true' : undefined"
        :class="[
          'shrink-0 lg:w-full flex items-center justify-between gap-2 px-2.5 py-2 rounded-lg transition-colors text-start whitespace-nowrap cursor-pointer',
          active === section.key
            ? 'bg-[#0F5A47] text-white font-bold'
            : 'text-text-secondary hover:bg-surface-1',
        ]"
        @click="emit('select', section.key)"
      >
        <span class="flex items-center gap-2">
          <Icon :name="section.icon" class="w-4 h-4" />
          <span>{{ section.label }}</span>
        </span>
        <span
          v-if="section.badge && active !== section.key"
          :class="[
            'hidden lg:inline text-[9px] px-1.5 rounded font-semibold',
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
