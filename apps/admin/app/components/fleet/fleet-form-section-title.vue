<template>
  <div
    class="flex items-center justify-between border-b border-border/60 pb-1.5"
  >
    <span
      class="text-[11px] font-mono font-bold text-accent-800 dark:text-accent-300 uppercase tracking-wider"
    >
      {{ title }}
    </span>
    <span
      v-if="aside"
      :class="[
        'text-[10px] font-mono uppercase font-semibold',
        asideClass || 'text-text-muted',
      ]"
    >
      {{ aside }}
    </span>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  title: string;
  aside?: string;
  asideClass?: string;
}>();
</script>
