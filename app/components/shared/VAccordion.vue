<template>
  <div class="w-full space-y-2.5" :class="containerClass">
    <div
      v-for="item in items"
      :key="item.id"
      class="transition-all duration-200"
      :class="getItemClass(item)"
    >
      <!-- Accordion Trigger Button (48px Touch Target) -->
      <button
        type="button"
        :id="`accordion-trigger-${item.id}`"
        :aria-expanded="isItemOpen(item.id)"
        :aria-controls="`accordion-content-${item.id}`"
        :disabled="item.disabled"
        class="w-full min-h-[48px] px-4 py-3 sm:px-5 sm:py-3.5 flex items-center justify-between gap-3 text-start font-bold text-xs sm:text-sm transition-colors select-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        :class="getHeaderClass(item)"
        @click="toggleItem(item.id)"
      >
        <!-- Header Left / Title Slot -->
        <slot
          name="header"
          :item="item"
          :is-open="isItemOpen(item.id)"
          :toggle="() => toggleItem(item.id)"
        >
          <div class="flex items-center gap-2.5 flex-1 min-w-0">
            <!-- Optional Status Indicator Dot -->
            <span
              v-if="item.active"
              class="w-1.5 h-1.5 rounded-full bg-[#EA580C] shrink-0"
            />
            <!-- Optional Icon -->
            <Icon
              v-if="item.icon"
              :name="item.icon"
              class="w-4 h-4 shrink-0"
              :class="
                isItemOpen(item.id) ? 'text-[#EA580C]' : 'text-text-muted'
              "
            />
            <!-- Title Text -->
            <span class="truncate leading-snug">
              {{ item.title }}
            </span>
            <!-- Optional Badge -->
            <span
              v-if="item.badge"
              class="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-orange-100 dark:bg-orange-950/60 text-[#EA580C] dark:text-orange-300 shrink-0"
            >
              {{ item.badge }}
            </span>
          </div>
        </slot>

        <!-- Chevron Icon -->
        <slot name="icon" :item="item" :is-open="isItemOpen(item.id)">
          <Icon
            name="ph:caret-down-bold"
            class="w-4 h-4 text-text-muted shrink-0 transition-transform duration-250 ease-out"
            :class="{
              'rotate-180 text-[#EA580C]': isItemOpen(item.id),
            }"
          />
        </slot>
      </button>

      <!-- Smooth Collapsible Content Container (CSS Grid 0fr -> 1fr) -->
      <div
        :id="`accordion-content-${item.id}`"
        role="region"
        :aria-labelledby="`accordion-trigger-${item.id}`"
        class="grid transition-all duration-250 ease-out overflow-hidden"
        :class="
          isItemOpen(item.id)
            ? 'grid-rows-[1fr] opacity-100'
            : 'grid-rows-[0fr] opacity-0'
        "
      >
        <div class="min-h-0">
          <div
            class="px-4 pb-4 pt-1 sm:px-5 sm:pb-5 text-xs text-text-secondary leading-relaxed border-t border-border/40"
            :class="contentClass"
          >
            <!-- Specific slot per item id (e.g. #company, #travelers) or fallback to generic slot/item.content -->
            <slot
              :name="String(item.id)"
              :item="item"
              :is-open="isItemOpen(item.id)"
            >
              <slot name="content" :item="item" :is-open="isItemOpen(item.id)">
                {{ item.content }}
              </slot>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type {
  AccordionItem,
  AccordionVariant,
} from "~/types/shared/VAccordion";

const props = withDefaults(
  defineProps<{
    items: AccordionItem[];
    modelValue?: string | number | (string | number)[];
    multiple?: boolean;
    variant?: AccordionVariant;
    containerClass?: string;
    itemClass?: string;
    headerClass?: string;
    contentClass?: string;
  }>(),
  {
    multiple: false,
    variant: "separated",
    containerClass: "",
    itemClass: "",
    headerClass: "",
    contentClass: "",
  },
);

const emit = defineEmits<{
  (e: "update:modelValue", value: string | number | (string | number)[]): void;
  (e: "change", id: string | number, isOpen: boolean): void;
}>();

// ─── Internal Active State (controlled or uncontrolled) ──────────────────────
const activeItems = ref<(string | number)[]>([]);

// Initialize from modelValue or default item states
watch(
  () => props.modelValue,
  (val) => {
    if (val === undefined) return;
    if (Array.isArray(val)) {
      activeItems.value = [...val];
    } else {
      activeItems.value = [val];
    }
  },
  { immediate: true },
);

const isItemOpen = (id: string | number) => activeItems.value.includes(id);

const toggleItem = (id: string | number) => {
  const index = activeItems.value.indexOf(id);
  const isOpen = index !== -1;

  if (props.multiple) {
    if (isOpen) {
      activeItems.value.splice(index, 1);
    } else {
      activeItems.value.push(id);
    }
    emit("update:modelValue", [...activeItems.value]);
  } else {
    if (isOpen) {
      activeItems.value = [];
      emit("update:modelValue", "");
    } else {
      activeItems.value = [id];
      emit("update:modelValue", id);
    }
  }

  emit("change", id, !isOpen);
};

// ─── Style Variant Helpers ───────────────────────────────────────────────────
const getItemClass = (item: AccordionItem) => {
  const isOpen = isItemOpen(item.id);
  const base = "rounded-2xl overflow-hidden";

  if (props.variant === "separated") {
    if (item.active || isOpen) {
      return `${base} border border-[#EA580C]/30 bg-orange-50/20 dark:bg-orange-950/20 ${props.itemClass}`;
    }
    return `${base} border border-border/70 bg-surface-1/50 dark:bg-[#131B2E]/50 ${props.itemClass}`;
  }

  if (props.variant === "bordered") {
    return `${base} border border-border bg-surface-0 dark:bg-[#131B2E] ${props.itemClass}`;
  }

  if (props.variant === "card") {
    return `${base} bg-surface-1 dark:bg-[#131B2E] shadow-xs border border-border/50 ${props.itemClass}`;
  }

  return `${base} ${props.itemClass}`;
};

const getHeaderClass = (item: AccordionItem) => {
  const isOpen = isItemOpen(item.id);
  if (isOpen || item.active) {
    return `text-[#EA580C] dark:text-orange-400 ${props.headerClass}`;
  }
  return `text-text-primary hover:bg-surface-0/70 dark:hover:bg-[#1B2438]/60 ${props.headerClass}`;
};
</script>