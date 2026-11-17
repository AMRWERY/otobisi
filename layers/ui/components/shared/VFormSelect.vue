<template>
  <div class="space-y-1.5">
    <label :for="id" class="text-xs font-semibold text-text-primary/90 block">
      {{ label }}
    </label>
    <select
      :id="id"
      v-model="model"
      class="w-full px-3 py-2 rounded-lg bg-surface-1 dark:bg-surface-2/50 border border-border text-xs text-text-primary focus:outline-none focus:border-accent-500 transition-colors"
    >
      <option
        v-for="option in normalized"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  label: string;
  /** Plain strings (value = label) or { value, label } pairs */
  options: (string | { value: string; label: string })[];
}>();

const model = defineModel<string>({ required: true });

const id = useId();

const normalized = computed(() =>
  props.options.map((o) =>
    typeof o === "string" ? { value: o, label: o } : o,
  ),
);
</script>