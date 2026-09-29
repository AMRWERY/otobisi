<template>
  <component
    :is="componentTag"
    :to="to ? to : undefined"
    type="button"
    :class="[
      'inline-flex items-center gap-1.5 text-xs font-bold text-text-secondary hover:text-text-primary transition-colors cursor-pointer group select-none',
      customClass,
    ]"
    @click="handleClick"
  >
    <slot name="leading">
      <Icon
        :name="icon"
        :class="[
          'w-4 h-4 shrink-0 transition-transform duration-150 rtl:rotate-180 group-hover:-translate-x-0.5 rtl:group-hover:translate-x-0.5',
          iconClass,
        ]"
      />
    </slot>

    <slot>
      <span>{{ label }}</span>
    </slot>
  </component>
</template>

<script lang="ts" setup>
import type { BackButtonProps } from "~/types/shared/VBackButton";

const props = withDefaults(defineProps<BackButtonProps>(), {
  label: "Back to Search Results",
  icon: "ph:arrow-left-bold",
  iconClass: "",
  customClass: "",
});

const emit = defineEmits<{
  (e: "click", event: MouseEvent): void;
}>();

const router = useRouter();
const localePath = useLocalePath();

const componentTag = computed(() => {
  if (props.to) return resolveComponent("NuxtLinkLocale");
  return "button";
});

const handleClick = (e: MouseEvent) => {
  emit("click", e);
  if (!props.to) {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(localePath("/"));
    }
  }
};
</script>