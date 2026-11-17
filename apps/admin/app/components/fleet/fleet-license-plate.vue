<template>
  <!-- Dual (Arabic / Latin) Egyptian license plate -->
  <div
    class="inline-flex items-center border border-border rounded overflow-hidden bg-surface-1 text-[10px] font-mono shadow-2xs"
  >
    <span
      class="px-1.5 py-0.5 bg-amber-50/80 dark:bg-amber-500/10 text-text-primary font-bold border-e border-border"
      dir="rtl"
    >
      {{ arabic }}
    </span>
    <span class="px-1.5 py-0.5 font-bold text-text-secondary" dir="ltr">
      {{ latin }}
    </span>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  arabic: string;
  latin: string;
}>();
</script>
