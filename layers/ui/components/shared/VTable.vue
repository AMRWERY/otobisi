<template>
  <div class="overflow-x-auto" :aria-busy="loading ? 'true' : undefined">
    <table :class="['w-full text-xs', minWidthClass]">
      <thead>
        <tr
          class="bg-surface-1/70 dark:bg-[#131926] border-b border-border/70"
        >
          <!-- Select-all for the rows on this page -->
          <th
            v-if="selectable"
            scope="col"
            class="h-9 w-10 ps-4 text-start"
          >
            <VCheckboxInput
              :model-value="allOnPage"
              :indeterminate="someOnPage"
              :disabled="!rows.length || loading"
              aria-label="Select all rows on this page"
              @update:model-value="togglePage"
            />
          </th>

          <th
            v-for="col in columns"
            :key="col.key"
            scope="col"
            :aria-sort="ariaSort(col)"
            :class="[
              'h-9 px-3 text-[11px] font-mono font-semibold uppercase tracking-wider text-text-muted whitespace-nowrap',
              alignClass(col),
              col.headerClass,
            ]"
          >
            <!-- Override one header with #header-<key> -->
            <slot :name="`header-${col.key}`" :column="col">
              <button
                v-if="col.sortable"
                type="button"
                :class="[
                  'inline-flex items-center gap-1 uppercase tracking-wider cursor-pointer transition-colors',
                  sort?.key === col.key
                    ? 'text-teal-700 dark:text-teal-300'
                    : 'hover:text-text-primary',
                ]"
                @click="toggleSort(col.key)"
              >
                {{ col.label }}
                <Icon :name="sortIcon(col.key)" class="w-3 h-3" />
              </button>
              <template v-else>{{ col.label }}</template>
            </slot>
          </th>
        </tr>
      </thead>

      <tbody class="divide-y divide-border/50">
        <!-- Skeleton: same columns and row height, so nothing shifts when data lands -->
        <template v-if="loading">
          <tr v-for="n in loadingRows" :key="`skeleton-${n}`" :class="rowHeight">
            <td v-if="selectable" class="ps-4">
              <span class="block h-3.5 w-3.5 rounded bg-surface-2 animate-pulse" />
            </td>
            <td
              v-for="(col, i) in columns"
              :key="col.key"
              class="px-3 py-1.5"
            >
              <span
                :class="[
                  'block h-3 rounded bg-surface-2 animate-pulse',
                  SKELETON_WIDTHS[(i + n) % SKELETON_WIDTHS.length],
                  col.align === 'end' ? 'ms-auto' : '',
                ]"
              />
            </td>
          </tr>
        </template>

        <template v-else>
          <tr
            v-for="(row, index) in rows"
            :key="keyOf(row, index)"
            :class="[
              rowHeight,
              'group transition-colors',
              isSelected(row, index)
                ? 'bg-teal-600/[0.08] dark:bg-teal-500/10'
                : 'hover:bg-surface-1/70 dark:hover:bg-surface-2/20',
              resolveRowClass(row, index),
            ]"
            @click="emit('row-click', row, index)"
          >
            <td v-if="selectable" class="ps-4 w-10" @click.stop>
              <VCheckboxInput
                :model-value="isSelected(row, index)"
                :aria-label="`Select row ${index + 1}`"
                @update:model-value="toggleRow(row, index)"
              />
            </td>

            <td
              v-for="col in columns"
              :key="col.key"
              :class="['px-3 py-1.5', alignClass(col), col.cellClass]"
            >
              <!-- Override one cell with #cell-<key>="{ row, value, index }" -->
              <slot
                :name="`cell-${col.key}`"
                :row="row"
                :value="row[col.key]"
                :index="index"
              >
                {{ row[col.key] }}
              </slot>
            </td>
          </tr>

          <!-- Zero-data state keeps the header framing and offers a way out -->
          <tr v-if="!rows.length">
            <td :colspan="colCount" class="px-3 py-14">
              <slot name="empty">
                <div class="flex flex-col items-center text-center gap-1.5 max-w-md mx-auto">
                  <div
                    class="w-12 h-12 mb-2 rounded-xl bg-teal-600/10 dark:bg-teal-500/10 text-teal-700 dark:text-teal-300 flex items-center justify-center"
                  >
                    <Icon :name="emptyIcon" class="w-6 h-6" />
                  </div>
                  <p class="text-sm font-semibold text-text-primary">
                    {{ emptyTitle || emptyText }}
                  </p>
                  <p
                    v-if="emptyDescription"
                    class="text-xs text-text-muted leading-relaxed"
                  >
                    {{ emptyDescription }}
                  </p>
                  <div
                    v-if="$slots['empty-actions']"
                    class="flex items-center gap-2 mt-3"
                  >
                    <slot name="empty-actions" />
                  </div>
                </div>
              </slot>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import type {
  TableColumn,
  TableRowKey,
  TableSort,
} from "~/types/shared/VTable";

const props = withDefaults(
  defineProps<{
    columns: TableColumn[];
    rows: Record<string, any>[];
    /** Row field used as the v-for key (and the selection id); falls back to the row index */
    rowKey?: string;
    /** Tailwind min-width class so narrow screens scroll instead of squeezing */
    minWidthClass?: string;
    /** Classes for every row, or a function to style rows individually (e.g. the active one) */
    rowClass?: string | ((row: Record<string, any>, index: number) => string);
    /** "compact" rows are 40px tall, "comfortable" rows 52px */
    density?: "compact" | "comfortable";
    /** Adds a checkbox column; bind the chosen row keys with v-model:selected */
    selectable?: boolean;
    /** Shows shimmer rows instead of data */
    loading?: boolean;
    loadingRows?: number;
    /** Fallback title for the empty state */
    emptyText?: string;
    emptyTitle?: string;
    emptyDescription?: string;
    emptyIcon?: string;
  }>(),
  {
    rowKey: undefined,
    minWidthClass: "min-w-[640px]",
    rowClass: "",
    density: "compact",
    selectable: false,
    loading: false,
    loadingRows: 5,
    emptyText: "No data to display",
    emptyTitle: undefined,
    emptyDescription: undefined,
    emptyIcon: "ph:magnifying-glass-bold",
  },
);

const emit = defineEmits<{
  (e: "row-click", row: Record<string, any>, index: number): void;
}>();

/** Keys of the checked rows; rows on other pages stay checked */
const selected = defineModel<TableRowKey[]>("selected", {
  default: () => [],
});

/** Active sort (the parent sorts the rows); click a sortable header to cycle asc → desc → none */
const sort = defineModel<TableSort | null>("sort", { default: null });

const SKELETON_WIDTHS = ["w-3/4", "w-1/2", "w-5/6", "w-2/3", "w-1/3"];

const rowHeight = computed(() =>
  props.density === "comfortable" ? "h-[52px]" : "h-10",
);

const colCount = computed(() => props.columns.length + (props.selectable ? 1 : 0));

function keyOf(row: Record<string, any>, index: number): TableRowKey {
  return props.rowKey ? row[props.rowKey] : index;
}

function resolveRowClass(row: Record<string, any>, index: number) {
  return typeof props.rowClass === "function"
    ? props.rowClass(row, index)
    : props.rowClass;
}

function alignClass(col: TableColumn) {
  return [
    col.align === "end" && "text-end",
    col.align === "center" && "text-center",
    (!col.align || col.align === "start") && "text-start",
    col.mono && "font-mono tabular-nums",
  ];
}

// ── Sorting ─────────────────────────────────────────────
function toggleSort(key: string) {
  if (sort.value?.key !== key) sort.value = { key, dir: "asc" };
  else if (sort.value.dir === "asc") sort.value = { key, dir: "desc" };
  else sort.value = null;
}

function sortIcon(key: string) {
  if (sort.value?.key !== key) return "ph:caret-up-down-bold";
  return sort.value.dir === "asc" ? "ph:arrow-up-bold" : "ph:arrow-down-bold";
}

function ariaSort(col: TableColumn) {
  if (!col.sortable) return undefined;
  if (sort.value?.key !== col.key) return "none";
  return sort.value.dir === "asc" ? "ascending" : "descending";
}

// ── Selection ───────────────────────────────────────────
const pageKeys = computed(() =>
  props.rows.map((row, index) => keyOf(row, index)),
);

const allOnPage = computed(
  () =>
    pageKeys.value.length > 0 &&
    pageKeys.value.every((key) => selected.value.includes(key)),
);

const someOnPage = computed(
  () =>
    !allOnPage.value &&
    pageKeys.value.some((key) => selected.value.includes(key)),
);

function isSelected(row: Record<string, any>, index: number) {
  return props.selectable && selected.value.includes(keyOf(row, index));
}

function toggleRow(row: Record<string, any>, index: number) {
  const key = keyOf(row, index);
  selected.value = selected.value.includes(key)
    ? selected.value.filter((k) => k !== key)
    : [...selected.value, key];
}

function togglePage() {
  selected.value = allOnPage.value
    ? selected.value.filter((k) => !pageKeys.value.includes(k))
    : [
        ...selected.value,
        ...pageKeys.value.filter((k) => !selected.value.includes(k)),
      ];
}
</script>
