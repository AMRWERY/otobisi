<template>
  <nav
    v-if="totalPages > 1 || showSummary || pageSizeOptions?.length"
    :aria-label="ariaLabel"
    class="flex items-center justify-between border-t border-border/60 pt-3 text-[11px] text-text-muted flex-wrap gap-x-4 gap-y-2"
  >
    <div class="flex items-center gap-x-4 gap-y-2 flex-wrap">
      <!-- Summary: "Showing 1–8 of 1,428 bookings" -->
      <div v-if="showSummary" class="font-mono">
        <slot name="summary" :from="from" :to="to" :total="total">
          <span>
            Showing
            <b class="text-text-primary tabular-nums">
              {{ from.toLocaleString("en-US") }}–{{ to.toLocaleString("en-US") }}
            </b>
            of
            <b class="text-text-primary tabular-nums">
              {{ total.toLocaleString("en-US") }}
            </b>
            {{ itemLabel }}
          </span>
        </slot>
      </div>

      <!-- Rows per page -->
      <div
        v-if="pageSizeOptions?.length"
        class="flex items-center gap-2 font-mono uppercase tracking-wider"
      >
        <span>Per page:</span>
        <VDropdownMenu :items="sizeItems" align="left">
          <template #trigger>
            <VButton
              variant="surface"
              size="xs"
              rounded="lg"
              icon-right="ph:caret-down-bold"
              custom-class="font-mono tabular-nums"
            >
              {{ pageSize }}
            </VButton>
          </template>
        </VDropdownMenu>
      </div>
    </div>

    <div v-if="totalPages > 1" class="flex items-center gap-1 ms-auto">
      <VButton
        variant="outline"
        :size="size"
        rounded="lg"
        icon="ph:caret-left-bold"
        icon-class="rtl:rotate-180"
        :disabled="modelValue <= 1"
        @click="go(modelValue - 1)"
      >
        {{ previousLabel }}
      </VButton>

      <template v-for="(item, index) in items" :key="`${item}-${index}`">
        <span
          v-if="item === '...'"
          class="px-1 text-text-muted select-none"
          aria-hidden="true"
        >
          …
        </span>

        <VButton
          v-else
          :variant="item === modelValue ? (activeClass ? 'unstyled' : 'primary') : 'outline'"
          :size="size"
          rounded="lg"
          :custom-class="[
            'font-mono tabular-nums min-w-7',
            item === modelValue ? activeClass : '',
          ]"
          :aria-current="item === modelValue ? 'page' : undefined"
          :aria-label="`Page ${item}`"
          @click="go(item)"
        >
          {{ item }}
        </VButton>
      </template>

      <VButton
        variant="outline"
        :size="size"
        rounded="lg"
        icon-right="ph:caret-right-bold"
        icon-right-class="rtl:rotate-180"
        :disabled="modelValue >= totalPages"
        @click="go(modelValue + 1)"
      >
        {{ nextLabel }}
      </VButton>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import type { PaginationProps } from "../../types/shared/VPagination";
import type { DropdownItem } from "../../types/shared/VDropdownMenu";

const props = withDefaults(defineProps<PaginationProps>(), {
  pageSize: 10,
  pageSizeOptions: undefined,
  activeClass: undefined,
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
  (e: "update:pageSize", size: number): void;
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

const sizeItems = computed<DropdownItem[]>(() =>
  (props.pageSizeOptions ?? []).map((size) => ({
    type: "button",
    label: `${size} rows`,
    onClick: () => {
      emit("update:pageSize", size);
      // A new page size invalidates the current page number
      emit("update:modelValue", 1);
    },
  })),
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
