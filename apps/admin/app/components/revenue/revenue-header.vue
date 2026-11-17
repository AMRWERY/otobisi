<template>
  <div class="space-y-3">
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div
        class="flex items-center gap-2 text-xs text-text-muted font-medium flex-wrap"
      >
        <span>Operations</span>
        <Icon name="ph:caret-right-bold" class="w-3 h-3 rtl:rotate-180" />
        <span>Analytics & Settlement</span>
        <Icon name="ph:caret-right-bold" class="w-3 h-3 rtl:rotate-180" />
        <h1 class="text-base font-extrabold text-text-primary tracking-tight">
          Revenue & Occupancy Ledger
        </h1>
        <span
          class="ms-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Almaza Hub #402 • Live
        </span>
      </div>

      <VButton
        variant="outline"
        size="sm"
        rounded="xl"
        icon="ph:download-simple-bold"
        custom-class="bg-surface-0 dark:bg-surface-1 shadow-xs border-border/80"
        @click="emit('export')"
      >
        Export CSV
      </VButton>
    </div>

    <div class="flex items-center gap-2.5 flex-wrap">
      <VTabs v-model="period" :tabs="REVENUE_PERIOD_TABS" />

      <VDropdownMenu :items="dateItems" align="left">
        <template #trigger="{ open }">
          <VButton
            variant="surface"
            size="sm"
            rounded="xl"
            icon="ph:calendar-blank-bold"
            icon-right="ph:caret-down-bold"
            :custom-class="triggerClass(open)"
          >
            <span class="font-mono tabular-nums">{{ dateRange }}</span>
          </VButton>
        </template>
      </VDropdownMenu>

      <VDropdownMenu :items="corridorItems" align="left">
        <template #trigger="{ open }">
          <VButton
            variant="surface"
            size="sm"
            rounded="xl"
            icon="ph:faders-bold"
            icon-right="ph:caret-down-bold"
            :custom-class="triggerClass(open)"
          >
            {{ corridor }}
          </VButton>
        </template>
      </VDropdownMenu>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { DropdownItem } from "~/types/shared/VDropdownMenu";

const emit = defineEmits<{ (e: "export"): void }>();

const period = defineModel<string>("period", { required: true });
const dateRange = defineModel<string>("dateRange", { required: true });
const corridor = defineModel<string>("corridor", { required: true });

const toItems = (options: string[], model: Ref<string>): DropdownItem[] =>
  options.map((label) => ({
    type: "button",
    label,
    onClick: () => (model.value = label),
  }));

const dateItems = computed(() => toItems(REVENUE_DATE_RANGES, dateRange));
const corridorItems = computed(() => toItems(REVENUE_CORRIDORS, corridor));

const triggerClass = (open: boolean) => [
  "border-border/80 bg-surface-0 dark:bg-[#111927]",
  open ? "border-accent-500" : "",
];
</script>
