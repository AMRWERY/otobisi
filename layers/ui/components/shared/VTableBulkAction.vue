<template>
  <button
    type="button"
    :class="[
      'inline-flex items-center gap-1.5 h-7 px-2.5 rounded-md text-xs font-semibold border transition-colors cursor-pointer',
      danger
        ? 'bg-rose-600 hover:bg-rose-700 border-rose-500 text-white'
        : 'bg-white/10 hover:bg-white/20 border-white/15 text-white',
    ]"
    @click="emit('click', $event)"
  >
    <Icon v-if="icon" :name="icon" class="w-3.5 h-3.5 shrink-0" />
    <slot />
  </button>
</template>

<script lang="ts" setup>
defineProps<{
  icon?: string;
  /** Destructive action, e.g. cancelling the selected departures */
  danger?: boolean;
}>();

const emit = defineEmits<{ (e: "click", event: MouseEvent): void }>();
</script>
