<template>
  <label
    :class="[
      'inline-flex items-center gap-2 select-none',
      disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
      wrapperClass,
    ]"
  >
    <!-- The real input stays in the DOM for forms, keyboard and screen readers -->
    <input
      type="checkbox"
      class="peer sr-only"
      :name="name"
      :value="value"
      :checked="isChecked"
      :indeterminate="indeterminate"
      :disabled="disabled"
      :aria-label="ariaLabel"
      @change="onChange"
    />

    <span
      :class="[
        'shrink-0 inline-flex items-center justify-center border transition-colors duration-150',
        'peer-focus-visible:ring-2 peer-focus-visible:ring-teal-500/40',
        size === 'sm' ? 'w-3.5 h-3.5 rounded-[4px]' : 'w-4 h-4 rounded-[5px]',
        isActive
          ? 'bg-[#0F5A47] border-[#0F5A47] dark:bg-teal-500 dark:border-teal-500 text-white'
          : 'bg-surface-0 dark:bg-transparent border-border-strong hover:border-teal-600 dark:hover:border-teal-400',
        boxClass,
      ]"
      aria-hidden="true"
    >
      <Icon
        v-if="isActive"
        :name="indeterminate && !isChecked ? 'ph:minus-bold' : 'ph:check-bold'"
        :class="size === 'sm' ? 'w-2.5 h-2.5' : 'w-3 h-3'"
      />
    </span>

    <span v-if="label || $slots.default" :class="labelClass">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script lang="ts" setup>
import type { Model } from "~/types/shared/VCheckboxInput";

const props = withDefaults(
  defineProps<{
    /** The value this box adds to / removes from an array model */
    value?: string | number;
    label?: string;
    name?: string;
    /** Partially selected (e.g. a select-all over some rows) */
    indeterminate?: boolean;
    disabled?: boolean;
    size?: "sm" | "md";
    ariaLabel?: string;
    wrapperClass?: string;
    boxClass?: string;
    labelClass?: string;
  }>(),
  {
    value: undefined,
    label: undefined,
    name: undefined,
    indeterminate: false,
    disabled: false,
    size: "md",
    ariaLabel: undefined,
    wrapperClass: undefined,
    boxClass: undefined,
    labelClass: "text-xs",
  },
);

/** `boolean`, or an array of values when several boxes share one v-model */
const model = defineModel<Model>({ default: false });

const isChecked = computed(() =>
  Array.isArray(model.value)
    ? props.value !== undefined && model.value.includes(props.value)
    : !!model.value,
);

const isActive = computed(() => isChecked.value || props.indeterminate);

function onChange(event: Event) {
  const checked = (event.target as HTMLInputElement).checked;
  if (Array.isArray(model.value) && props.value !== undefined) {
    model.value = checked
      ? [...model.value, props.value]
      : model.value.filter((v) => v !== props.value);
  } else {
    model.value = checked;
  }
}
</script>
