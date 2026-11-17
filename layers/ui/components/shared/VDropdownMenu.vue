<template>
  <div ref="containerRef" class="relative">
    <!-- ── Trigger Slot ─────────────────────────────────────── -->
    <div @click="toggle">
      <slot name="trigger" :open="isOpen" />
    </div>

    <!-- ── Dropdown Panel ──────────────────────────────────── -->
    <transition
      enter-active-class="transition-all duration-150 ease-[cubic-bezier(0.4,0,0.2,1)]"
      enter-from-class="opacity-0 scale-95 -translate-y-1"
      enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-active-class="transition-all duration-120 ease-[cubic-bezier(0.4,0,0.2,1)]"
      leave-from-class="opacity-100 scale-100 translate-y-0"
      leave-to-class="opacity-0 scale-95 -translate-y-1"
    >
      <div
        v-if="isOpen"
        :class="[
          'absolute z-50 mt-2 rounded-2xl bg-surface-0 dark:bg-[#131B2E]',
          'border border-border dark:border-[#1E293B] shadow-xl p-2',
          alignClass,
          widthClass,
        ]"
      >
        <!-- Optional header slot -->
        <div v-if="$slots.header" class="border-b border-border/50 mb-1">
          <slot name="header" />
        </div>

        <!-- Items list -->
        <template v-for="(item, index) in items" :key="index">
          <!-- Divider -->
          <div
            v-if="item.type === 'divider'"
            class="border-t border-border/50 my-1 pt-1"
          />

          <!-- Link item -->
          <nuxt-link-locale
            v-else-if="item.type === 'link' && item.to"
            :to="item.to"
            :class="[
              'flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-colors',
              item.danger
                ? 'text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30'
                : 'text-text-secondary hover:text-text-primary hover:bg-surface-1 dark:hover:bg-[#1B2438]',
              item.class ?? '',
            ]"
            @click="handleItemClick(item)"
          >
            <Icon
              v-if="item.icon"
              :name="item.icon"
              class="w-4 h-4 shrink-0"
              :class="item.iconClass ?? 'text-[#EA580C]'"
            />
            <span class="flex-1">{{ item.label }}</span>
            <span
              v-if="item.badge != null"
              class="w-4 h-4 rounded-full bg-orange-100 dark:bg-orange-950 text-[#EA580C] text-[10px] font-bold flex items-center justify-center"
              >{{ item.badge }}</span
            >
          </nuxt-link-locale>

          <!-- Button item -->
          <button
            v-else-if="item.type === 'button'"
            type="button"
            :class="[
              'w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer',
              item.danger
                ? 'text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30'
                : 'text-text-secondary hover:text-text-primary hover:bg-surface-1 dark:hover:bg-[#1B2438]',
              item.class ?? '',
            ]"
            @click="handleItemClick(item)"
          >
            <Icon
              v-if="item.icon"
              :name="item.icon"
              class="w-4 h-4 shrink-0"
              :class="item.iconClass ?? 'text-[#EA580C]'"
            />
            <span class="flex-1 text-start">{{ item.label }}</span>
            <span
              v-if="item.badge != null"
              class="w-4 h-4 rounded-full bg-orange-100 dark:bg-orange-950 text-[#EA580C] text-[10px] font-bold flex items-center justify-center"
              >{{ item.badge }}</span
            >
          </button>
        </template>

        <!-- Optional footer slot -->
        <div v-if="$slots.footer" class="border-t border-border/50 mt-1 pt-1">
          <slot name="footer" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import type { DropdownItem } from "~/types/shared/VDropdownMenu";

const props = withDefaults(
  defineProps<{
    items?: DropdownItem[];
    /** Horizontal alignment of the panel relative to the trigger */
    align?: "left" | "right";
    /** Tailwind width class for the panel */
    width?: string;
  }>(),
  {
    items: () => [],
    align: "right",
    width: "w-56",
  },
);

const emit = defineEmits<{
  (e: "open"): void;
  (e: "close"): void;
  (e: "item-click", item: DropdownItem): void;
}>();

const isOpen = ref(false);
const containerRef = ref<HTMLElement | null>(null);

const alignClass = computed(() =>
  props.align === "right" ? "right-0" : "left-0",
);
const widthClass = computed(() => props.width);

function toggle() {
  isOpen.value ? close() : open();
}

function open() {
  isOpen.value = true;
  emit("open");
}

function close() {
  isOpen.value = false;
  emit("close");
}

function handleItemClick(item: DropdownItem) {
  item.onClick?.();
  emit("item-click", item);
  close();
}

// Close on outside click
onMounted(() => {
  document.addEventListener("click", onOutsideClick);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", onOutsideClick);
});

function onOutsideClick(e: MouseEvent) {
  if (containerRef.value && !containerRef.value.contains(e.target as Node)) {
    close();
  }
}

// Expose for programmatic control
defineExpose({ open, close, isOpen });
</script>