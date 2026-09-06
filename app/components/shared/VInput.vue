<template>
  <div :class="['flex flex-col gap-1.5', wrapperClass]">
    <!-- Label -->
    <label
      v-if="label || $slots.label"
      :for="inputId"
      :class="[
        'text-xs font-semibold text-text-primary/90 flex items-center justify-between',
        labelClass,
      ]"
    >
      <slot name="label">
        <span>
          {{ label }}
          <span v-if="required" class="text-red-500 ms-0.5">*</span>
        </span>
      </slot>
    </label>

    <!-- Input Box Container -->
    <div
      :class="[
        'relative flex items-center transition-all duration-150',
        sizeClasses[size],
        roundedClasses[rounded],
        variantClasses[variant],
        error
          ? 'border-red-500 focus-within:ring-2 focus-within:ring-red-500/20 focus-within:border-red-500'
          : 'border-border hover:border-border-strong focus-within:ring-2 focus-within:ring-orange-500/20 focus-within:border-orange-500',
        disabled ? 'opacity-60 cursor-not-allowed bg-surface-1' : '',
      ]"
    >
      <!-- Leading Icon / Slot -->
      <slot name="leading">
        <Icon
          v-if="icon"
          :name="icon"
          :class="[
            'shrink-0 text-text-muted transition-colors',
            iconSizes[size],
            iconClass,
          ]"
        />
      </slot>

      <!-- HTML Input -->
      <input
        :id="inputId"
        ref="inputRef"
        :value="modelValue"
        :type="type"
        :name="name"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :autocomplete="autocomplete"
        :maxlength="maxlength"
        :min="min"
        :max="max"
        :step="step"
        :class="[
          'w-full bg-transparent border-0 ring-0 focus:ring-0 outline-none focus:outline-none p-0',
          'font-semibold text-text-primary placeholder:text-text-muted placeholder:font-normal',
          inputFontSize[size],
          disabled ? 'cursor-not-allowed' : '',
          inputClass,
        ]"
        @input="onInput"
        @change="onChange"
        @focus="onFocus"
        @blur="onBlur"
      />

      <!-- Clear Button (when clearable and has value) -->
      <button
        v-if="clearable && modelValue && !disabled && !readonly"
        type="button"
        aria-label="Clear input"
        tabindex="-1"
        class="shrink-0 text-text-muted hover:text-text-primary p-0.5 rounded-full transition-colors"
        @click="clear"
      >
        <Icon name="ph:x-circle-fill" class="w-4 h-4" />
      </button>

      <!-- Trailing Icon / Slot -->
      <slot name="trailing">
        <Icon
          v-if="iconRight"
          :name="iconRight"
          :class="[
            'shrink-0 text-text-muted transition-colors',
            iconSizes[size],
            iconClass,
          ]"
        />
      </slot>
    </div>

    <!-- Error or Hint Message -->
    <div v-if="hasError || hint || $slots.hint || $slots.error" class="text-xs">
      <div
        v-if="hasError"
        class="text-red-500 font-medium flex items-center gap-1 mt-0.5"
      >
        <slot name="error">
          <Icon name="ph:warning-circle-bold" class="w-3.5 h-3.5 shrink-0" />
          <span>{{ typeof error === "string" ? error : "" }}</span>
        </slot>
      </div>
      <div v-else-if="hint || $slots.hint" class="text-text-secondary mt-0.5">
        <slot name="hint">
          <span>{{ hint }}</span>
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { InputProps } from "~/types/shared/VInput";

const props = withDefaults(defineProps<InputProps>(), {
  type: "text",
  size: "md",
  rounded: "xl",
  variant: "surface",
  disabled: false,
  readonly: false,
  required: false,
  clearable: false,
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string | number): void;
  (e: "change", value: Event): void;
  (e: "focus", value: FocusEvent): void;
  (e: "blur", value: FocusEvent): void;
  (e: "clear"): void;
}>();

const inputRef = ref<HTMLInputElement | null>(null);
const generatedId = useId();
const inputId = computed(() => props.id || generatedId);

const hasError = computed(() => Boolean(props.error));

const sizeClasses = {
  sm: "px-2.5 py-1.5 gap-2",
  md: "px-3.5 py-3 gap-2.5",
  lg: "px-4 py-3.5 gap-3",
};

const inputFontSize = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

const iconSizes = {
  sm: "w-3.5 h-3.5",
  md: "w-4 h-4",
  lg: "w-5 h-5",
};

const roundedClasses = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  full: "rounded-full",
};

const variantClasses = {
  default: "bg-surface-0 border",
  surface: "bg-surface-2 border",
  borderless: "bg-transparent border-0 shadow-none",
};

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};

const onChange = (event: Event) => {
  emit("change", event);
};

const onFocus = (event: FocusEvent) => {
  emit("focus", event);
};

const onBlur = (event: FocusEvent) => {
  emit("blur", event);
};

const clear = () => {
  emit("update:modelValue", "");
  emit("clear");
  inputRef.value?.focus();
};

defineExpose({
  input: inputRef,
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
});
</script>