<template>
  <button
    type="button"
    role="switch"
    :aria-checked="model"
    :aria-label="label"
    :title="label"
    :disabled="disabled"
    :class="[
      'w-9 h-5 rounded-full transition-colors relative cursor-pointer shrink-0',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      model ? 'bg-emerald-600' : 'bg-surface-3 dark:bg-surface-2',
    ]"
    @click="model = !model"
  >
    <span
      :class="[
        'absolute top-0.5 start-0.5 w-4 h-4 rounded-full bg-white transition-transform shadow-xs',
        model ? 'translate-x-4 rtl:-translate-x-4' : '',
      ]"
    />
  </button>
</template>

<script lang="ts" setup>
defineProps<{
  /** Accessible name and tooltip, e.g. "Deactivate trip" */
  label?: string;
  disabled?: boolean;
}>();

const model = defineModel<boolean>({ default: false });
</script>