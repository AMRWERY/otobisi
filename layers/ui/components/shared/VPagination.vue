<template>
  <nav
    v-if="totalPages > 1 || showSummary"
    :aria-label="ariaLabel"
    class="flex items-center justify-between border-t border-border/60 pt-3 text-[11px] text-text-muted flex-wrap gap-2"
  >
    <!-- Summary: "Showing 1–8 of 1,428 bookings" -->
    <div v-if="showSummary">
      <slot name="summary" :from="from" :to="to" :total="total">
        <span>
          Showing {{ from.toLocaleString() }}–{{ to.toLocaleString() }} of
          {{ total.toLocaleString() }} {{ itemLabel }}
        </span>
      </slot>
    </div>

    <div v-if="totalPages > 1" class="flex items-center gap-1 ms-auto">
      <LazyVButton
        variant="outline"
        :size="size"
        rounded="lg"
        icon="ph:arrow-left-bold"
        icon-class="rtl:rotate-180"
        :disabled="modelValue <= 1"
        @click="go(modelValue - 1)"
      >
        {{ previousLabel }}
      </LazyVButton>

      <template v-for="(item, index) in items" :key="`${item}-${index}`">
        <LazyVButton
          v-if="item === '...'"
          variant="outline"
          :size="size"
          rounded="lg"
          custom-class="pointer-events-none"
          aria-hidden="true"
          tabindex="-1"
        >
          ...
        </LazyVButton>

        <LazyVButton
          v-else
          :variant="item === modelValue ? 'primary' : 'outline'"
          :size="size"
          rounded="lg"
          :aria-current="item === modelValue ? 'page' : undefined"
          :aria-label="`Page ${item}`"
          @click="go(item)"
        >
          {{ item }}
        </LazyVButton>
      </template>

      <LazyVButton
        variant="outline"
        :size="size"
        rounded="lg"
        icon-right="ph:arrow-right-bold"
        icon-right-class="rtl:rotate-180"
        :disabled="modelValue >= totalPages"
        @click="go(modelValue + 1)"
      >
        {{ nextLabel }}
      </LazyVButton>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import type { PaginationProps } from "../../types/shared/VPagination";

const props = withDefaults(defineProps<PaginationProps>(), {
  pageSize: 10,
  siblingCount: 1,
  size: "xs",
  showSummary: false,
  itemLabel: "items",
  previousLabel: "Previous",
  nextLabel: "Next",
  ariaLabel: "Pagination",
});

const emit = defineEmits<{
  (e: "update:modelValue", page: number): void;
}>();

const totalPages = computed(() =>
  Math.max(1, Math.ceil(props.total / Math.max(1, props.pageSize))),
);

const from = computed(() =>
  props.total === 0 ? 0 : (props.modelValue - 1) * props.pageSize + 1,
);
const to = computed(() =>
  Math.min(props.modelValue * props.pageSize, props.total),
);

// e.g. 1 … 4 5 6 … 20 — first/last always shown, ellipsis only where pages are skipped
const items = computed<(number | "...")[]>(() => {
  const last = totalPages.value;
  const current = Math.min(Math.max(props.modelValue, 1), last);
  const range = (a: number, b: number) =>
    Array.from({ length: b - a + 1 }, (_, i) => a + i);

  // first + last + current + 2 siblings sets + 2 ellipsis slots
  const maxSlots = props.siblingCount * 2 + 5;
  if (last <= maxSlots) return range(1, last);

  const left = Math.max(current - props.siblingCount, 1);
  const right = Math.min(current + props.siblingCount, last);
  const showLeftDots = left > 2;
  const showRightDots = right < last - 1;
  const edgeCount = props.siblingCount * 2 + 3;

  if (!showLeftDots) return [...range(1, edgeCount), "...", last];
  if (!showRightDots) return [1, "...", ...range(last - edgeCount + 1, last)];
  return [1, "...", ...range(left, right), "...", last];
});

function go(page: number) {
  const next = Math.min(Math.max(page, 1), totalPages.value);
  if (next !== props.modelValue) emit("update:modelValue", next);
}
</script>