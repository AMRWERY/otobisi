<template>
  <div
    class="bg-surface-0 dark:bg-[#111927] border border-border/80 rounded-2xl overflow-hidden shadow-xs"
  >
    <div
      class="px-4 py-3 border-b border-border/80 flex items-center justify-between flex-wrap gap-3"
    >
      <div>
        <h2 class="text-sm font-extrabold text-text-primary">Pricing Rules</h2>
        <p class="text-[11px] font-mono text-text-muted">
          Lower priority number is evaluated first
        </p>
      </div>
      <VTabs v-model="filter" :tabs="tabs" />
    </div>

    <VTable
      v-model:sort="sort"
      :columns="columns"
      :rows="sortedRules"
      row-key="id"
      density="comfortable"
      min-width-class="min-w-[860px]"
      empty-icon="ph:sliders-horizontal-bold"
      empty-title="No pricing rules in this view"
      empty-description="Create a rule to start adjusting fares automatically."
    >
      <template #empty-actions>
        <VButton
          variant="surface"
          size="sm"
          rounded="lg"
          icon="ph:plus-bold"
          @click="emit('add')"
        >
          New Rule
        </VButton>
      </template>

      <template #cell-name="{ row }">
        <div class="leading-tight">
          <div
            :class="[
              'font-bold text-xs',
              row.active ? 'text-text-primary' : 'text-text-muted',
            ]"
          >
            {{ row.name }}
          </div>
        </div>
      </template>

      <template #cell-corridor="{ row }">
        <span class="text-xs text-text-secondary whitespace-nowrap">
          {{ pricingCorridorLabel(row.corridor) }}
        </span>
      </template>

      <template #cell-trigger="{ row }">
        <span
          class="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-surface-1 dark:bg-surface-2/50 border border-border/60 text-[11px] font-mono text-text-secondary whitespace-nowrap"
        >
          <Icon
            :name="PRICING_TRIGGERS[(row as PricingRule).trigger.kind].icon"
            class="w-3.5 h-3.5 text-text-muted"
          />
          {{ pricingTriggerLabel((row as PricingRule).trigger) }}
        </span>
      </template>

      <template #cell-adjustment="{ row }">
        <VTrendBadge
          :tone="row.adjustment > 0 ? 'positive' : 'negative'"
          :label="pricingFormatAdjustment(row.adjustment)"
        />
      </template>

      <template #cell-priority="{ row }">
        <span
          class="inline-flex items-center justify-center w-6 h-6 rounded bg-surface-2 font-mono text-[11px] font-bold text-text-secondary"
        >
          {{ row.priority }}
        </span>
      </template>

      <template #cell-active="{ row }">
        <VSwitchButton
          :model-value="row.active"
          :label="row.active ? 'Pause rule' : 'Activate rule'"
          @update:model-value="emit('toggle', row as PricingRule)"
        />
      </template>

      <template #cell-actions="{ row }">
        <VDropdownMenu :items="actionItems(row as PricingRule)" align="right">
          <template #trigger>
            <VButton
              variant="ghost"
              size="xs"
              rounded="lg"
              icon="ph:dots-three-vertical-bold"
              :aria-label="`Actions for ${row.name}`"
            />
          </template>
        </VDropdownMenu>
      </template>
    </VTable>
  </div>
</template>

<script lang="ts" setup>
import type { DropdownItem } from "~/types/shared/VDropdownMenu";
import type { TableColumn, TableSort } from "~/types/shared/VTable";
import type { PricingRule } from "~/types/pricing";

const props = defineProps<{
  /** Already filtered by the tab; this component only sorts them */
  rules: PricingRule[];
  tabs: { key: string; label: string }[];
}>();

const emit = defineEmits<{
  (e: "add"): void;
  (e: "edit", rule: PricingRule): void;
  (e: "duplicate", rule: PricingRule): void;
  (e: "delete", rule: PricingRule): void;
  (e: "toggle", rule: PricingRule): void;
}>();

const filter = defineModel<string>("filter", { required: true });

const columns: TableColumn[] = [
  { key: "name", label: "Rule", sortable: true, headerClass: "ps-4", cellClass: "ps-4" },
  { key: "corridor", label: "Corridor", sortable: true },
  { key: "trigger", label: "Trigger", sortable: true },
  { key: "adjustment", label: "Adjustment", sortable: true, align: "end" },
  { key: "priority", label: "Priority", sortable: true, align: "center" },
  { key: "active", label: "Status", align: "center" },
  { key: "actions", label: "Actions", align: "center", headerClass: "pe-4", cellClass: "pe-4" },
];

const sort = ref<TableSort | null>({ key: "priority", dir: "asc" });

const sortedRules = computed(() =>
  sortRows(props.rules, sort.value, {
    corridor: (r) => pricingCorridorLabel(r.corridor),
    trigger: (r) => pricingTriggerLabel(r.trigger),
  }),
);

function actionItems(rule: PricingRule): DropdownItem[] {
  return [
    {
      type: "button",
      label: "Edit rule",
      icon: "ph:pencil-simple-bold",
      onClick: () => emit("edit", rule),
    },
    {
      type: "button",
      label: "Duplicate",
      icon: "ph:copy-bold",
      onClick: () => emit("duplicate", rule),
    },
    { type: "divider" },
    {
      type: "button",
      label: "Delete rule",
      icon: "ph:trash-bold",
      danger: true,
      onClick: () => emit("delete", rule),
    },
  ];
}
</script>
