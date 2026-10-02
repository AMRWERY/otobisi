<template>
  <div class="overflow-x-auto -mx-1">
    <table :class="['w-full text-xs', minWidthClass]">
      <thead>
        <tr class="border-b border-border/70">
          <th
            v-for="col in columns"
            :key="col.key"
            scope="col"
            :class="[
              'py-2 px-3 text-start text-[10px] font-bold uppercase tracking-wider text-text-muted whitespace-nowrap',
              col.headerClass,
            ]"
          >
            <!-- Override one header with #header-<key> -->
            <slot :name="`header-${col.key}`" :column="col">
              {{ col.label }}
            </slot>
          </th>
        </tr>
      </thead>

      <tbody class="divide-y divide-border/40">
        <tr
          v-for="(row, index) in rows"
          :key="rowKeyOf(row, index)"
          :class="[
            'hover:bg-surface-0 dark:hover:bg-surface-2/20 transition-colors group',
            rowClass,
          ]"
        >
          <td
            v-for="col in columns"
            :key="col.key"
            :class="['py-2.5 px-3', col.cellClass]"
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

        <tr v-if="!rows.length">
          <td
            :colspan="columns.length"
            class="py-10 px-3 text-center text-text-muted"
          >
            <slot name="empty">{{ emptyText }}</slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import type { TableColumn } from "../../types/shared/VTable";

const props = withDefaults(
  defineProps<{
    columns: TableColumn[];
    rows: Record<string, any>[];
    /** Row field used as the v-for key; falls back to the row index */
    rowKey?: string;
    /** Tailwind min-width class so narrow screens scroll instead of squeezing */
    minWidthClass?: string;
    rowClass?: string;
    emptyText?: string;
  }>(),
  {
    rowKey: undefined,
    minWidthClass: "min-w-[640px]",
    rowClass: "",
    emptyText: "No data to display",
  },
);

function rowKeyOf(row: Record<string, any>, index: number) {
  return props.rowKey ? row[props.rowKey] : index;
}
</script>