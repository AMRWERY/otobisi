<template>
  <Transition
    enter-active-class="transition-all duration-150 ease-out"
    enter-from-class="opacity-0 -translate-y-1"
    leave-active-class="transition-all duration-100 ease-in"
    leave-to-class="opacity-0 -translate-y-1"
  >
    <div
      v-if="count > 0"
      role="status"
      class="flex items-center justify-between flex-wrap gap-x-4 gap-y-2 px-4 py-2.5 bg-[#0F5A47] text-white"
    >
      <div class="flex items-center gap-3 text-xs">
        <span
          class="min-w-6 h-6 px-1.5 rounded bg-white/15 inline-flex items-center justify-center font-mono font-bold tabular-nums"
        >
          {{ count.toLocaleString("en-US") }}
        </span>
        <span class="font-semibold">{{ label }}</span>
        <span v-if="note" class="font-mono text-[11px] text-white/70">
          {{ note }}
        </span>
      </div>

      <div class="flex items-center gap-2 flex-wrap">
        <!-- Actions: <VTableBulkAction icon="…">Label</VTableBulkAction> -->
        <slot />
        <button
          type="button"
          class="p-1.5 rounded-md text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Clear selection"
          title="Clear selection"
          @click="emit('clear')"
        >
          <Icon name="ph:x-bold" class="w-4 h-4" />
        </button>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    count: number;
    /** What the selection is, e.g. "Trips Selected for Batch Dispatch" */
    label?: string;
    /** Extra context, e.g. "Total Capacity Impact: 147 Seats" */
    note?: string;
  }>(),
  { label: "Selected", note: undefined },
);

const emit = defineEmits<{ (e: "clear"): void }>();
</script>
