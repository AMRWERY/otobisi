<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono">
    <div
      v-for="terminal in terminals"
      :key="terminal.hub"
      class="bg-surface-0 dark:bg-[#111927] border border-border/80 rounded-xl p-3.5 shadow-xs flex flex-col justify-between"
    >
      <div>
        <div class="flex items-center justify-between gap-2 mb-1">
          <span class="font-bold text-xs text-text-primary">
            {{ terminal.name }}
          </span>
          <span
            :class="[
              'px-1.5 border text-[9px] font-bold rounded whitespace-nowrap',
              terminal.tagClass,
            ]"
          >
            {{ terminal.tag }}
          </span>
        </div>
        <div class="text-[11px] text-text-muted">
          {{ terminal.staffCount }} Active Staff • {{ terminal.detail }}
        </div>
      </div>

      <div
        class="flex items-center gap-1.5 mt-3 pt-2 border-t border-border/60"
      >
        <div class="flex -space-x-1.5 rtl:space-x-reverse">
          <div
            v-for="initials in terminal.avatars"
            :key="initials"
            class="w-6 h-6 rounded-full bg-surface-2 border-2 border-surface-0 dark:border-[#111927] text-[9px] flex items-center justify-center font-bold text-text-secondary"
          >
            {{ initials }}
          </div>
        </div>
        <span class="text-[10px] text-text-muted font-bold ms-1">
          {{ terminal.more ? `+${terminal.more} more` : "Normal Ops" }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { TeamTerminal } from "~/types/team";

defineProps<{
  terminals: (TeamTerminal & {
    staffCount: number;
    avatars: string[];
    more: number;
  })[];
}>();
</script>
