<template>
  <div
    class="bg-surface-1 border border-border rounded-2xl p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3 text-xs select-none"
  >
    <div class="flex items-center gap-2">
      <div
        class="w-6 h-6 rounded-lg bg-surface-2 border border-border flex items-center justify-center text-[10px] font-bold text-text-primary"
      >
        1
      </div>
      <span class="text-text-secondary font-medium">
        Available ({{ price }} EGP)
      </span>
    </div>

    <div class="flex items-center gap-2">
      <div
        class="w-6 h-6 rounded-lg bg-[#F26A36] text-white flex items-center justify-center text-[10px] font-bold shadow-xs"
      >
        <Icon name="ph:check-bold" class="w-3.5 h-3.5" />
      </div>
      <span class="text-text-primary font-bold">
        Selected ({{ selectedCount }})
      </span>
    </div>

    <div class="flex items-center gap-2">
      <div
        class="w-6 h-6 rounded-lg bg-surface-2/40 border border-border text-text-muted flex items-center justify-center text-[10px]"
      >
        ✕
      </div>
      <span class="text-text-muted font-medium">Reserved / Booked</span>
    </div>

    <div class="flex items-center gap-2">
      <div
        class="w-6 h-6 rounded-lg bg-pink-500/15 border border-pink-500/30 text-pink-600 dark:text-pink-400 flex items-center justify-center text-[10px] font-bold"
      >
        ♀
      </div>
      <span class="text-pink-600 dark:text-pink-400 font-semibold">
        Ladies Priority
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    price?: number;
    selectedCount?: number;
  }>(),
  {
    price: 145,
    selectedCount: 0,
  },
);
</script>