<template>
  <component
    :is="componentTag"
    :to="to ? to : undefined"
    :href="href ? href : undefined"
    :type="!isLink ? type : undefined"
    :disabled="disabled || loading ? true : undefined"
    :aria-disabled="disabled || loading ? 'true' : undefined"
    :aria-busy="loading ? 'true' : undefined"
    :class="classes"
    @click="handleClick"
  >
    <!-- Loading Spinner -->
    <template v-if="loading">
      <slot name="loading">
        <Icon
          name="ph:spinner-gap-bold"
          :class="['animate-spin shrink-0', iconSizeClass]"
        />
      </slot>
    </template>

    <!-- Leading Icon / Slot -->
    <template v-else>
      <slot name="leading">
        <Icon
          v-if="icon"
          :name="icon"
          :class="['shrink-0', iconSizeClass, iconClass]"
        />
      </slot>
    </template>

    <!-- Main Content -->
    <span
      v-if="$slots.default"
      class="truncate inline-flex items-center gap-1.5"
    >
      <slot />
    </span>

    <!-- Trailing Icon / Slot -->
    <template v-if="!loading">
      <slot name="trailing">
        <Icon
          v-if="iconRight"
          :name="iconRight"
          :class="['shrink-0', iconSizeClass, iconClass]"
        />
      </slot>
    </template>
  </component>
</template>

<script lang="ts" setup>
import type { ButtonProps } from "~/types/shared/VButton";

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: "primary",
  size: "md",
  rounded: "xl",
  type: "button",
  disabled: false,
  loading: false,
  block: false,
});

const emit = defineEmits<{
  (e: "click", event: MouseEvent): void;
}>();

const isLink = computed(() => Boolean(props.to || props.href));

const componentTag = computed(() => {
  if (props.to) return resolveComponent("NuxtLinkLocale");
  if (props.href) return "a";
  return "button";
});

const sizeClasses = {
  xs: "px-2.5 py-1 text-xs gap-1.5",
  sm: "px-3 py-1.5 text-xs font-semibold gap-1.5",
  md: "px-4 py-2.5 text-sm font-bold gap-2",
  lg: "px-6 py-3.5 text-sm sm:text-base font-bold gap-2.5",
  xl: "px-7 py-4 text-base sm:text-lg font-bold gap-3",
};

const iconSizes = {
  xs: "w-3 h-3",
  sm: "w-3.5 h-3.5",
  md: "w-4 h-4",
  lg: "w-4.5 h-4.5 sm:w-5 sm:h-5",
  xl: "w-5 h-5 sm:w-6 sm:h-6",
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
  primary:
    "bg-[#F26A36] hover:bg-[#E05925] text-white shadow-md shadow-orange-900/10 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-[#F26A36]/40",
  secondary:
    "bg-surface-2 hover:bg-surface-0 border border-border text-text-primary shadow-2xs hover:border-border-strong focus-visible:ring-2 focus-visible:ring-border",
  surface:
    "bg-surface-1 hover:bg-surface-2 border border-border text-text-primary shadow-2xs hover:border-border-strong focus-visible:ring-2 focus-visible:ring-border",
  outline:
    "bg-transparent border border-border hover:border-[#F26A36]/50 text-text-primary hover:text-[#F26A36] focus-visible:ring-2 focus-visible:ring-[#F26A36]/30",
  ghost:
    "bg-transparent hover:bg-surface-2 text-text-secondary hover:text-text-primary focus-visible:ring-2 focus-visible:ring-border",
  danger:
    "bg-red-600 hover:bg-red-700 text-white shadow-sm focus-visible:ring-2 focus-visible:ring-red-500/40",
  link: "bg-transparent text-[#F26A36] hover:text-[#E05925] hover:underline p-0 shadow-none",
};

const iconSizeClass = computed(() => iconSizes[props.size] || iconSizes.md);

const classes = computed(() => [
  "inline-flex items-center justify-center select-none outline-none font-sans transition-all duration-120 ease-[cubic-bezier(0.4,0,0.2,1)]",
  props.variant !== "link" ? "active:scale-[0.97]" : "",
  props.variant !== "link" ? sizeClasses[props.size] : "",
  props.variant !== "link" ? roundedClasses[props.rounded] : "",
  variantClasses[props.variant] || variantClasses.primary,
  props.block ? "w-full" : "",
  props.disabled || props.loading
    ? "opacity-50 cursor-not-allowed pointer-events-none shadow-none"
    : "cursor-pointer",
  props.customClass || "",
]);

const handleClick = (e: MouseEvent) => {
  if (props.disabled || props.loading) {
    e.preventDefault();
    return;
  }
  emit("click", e);
};
</script>