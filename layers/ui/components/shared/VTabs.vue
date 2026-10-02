<template>
  <div
    role="tablist"
    class="inline-flex items-center bg-surface-1 dark:bg-[#111927] p-0.5 rounded-xl border border-border/80"
  >
    <button
      v-for="tab in tabs"
      :key="tab.key"
      type="button"
      role="tab"
      :aria-selected="model === tab.key"
      :class="[
        'px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer',
        model === tab.key
          ? 'bg-surface-0 dark:bg-[#162032] text-text-primary shadow-xs'
          : 'text-text-muted hover:text-text-primary',
      ]"
      @click="model = tab.key"
    >
      {{ tab.label }}
    </button>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  tabs: { key: string; label: string }[];
}>();

/** Key of the active tab */
const model = defineModel<string>({ required: true });
</script>
