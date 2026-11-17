<template>
  <div class="space-y-3">
    <div
      class="flex flex-col lg:flex-row lg:items-center justify-between gap-3"
    >
      <!-- Breadcrumb & Title -->
      <div
        class="flex items-center gap-2 text-xs text-text-muted font-medium flex-wrap"
      >
        <span>Operations</span>
        <Icon name="ph:caret-right-bold" class="w-3 h-3 rtl:rotate-180" />
        <span>Analytics & Performance</span>
        <Icon name="ph:caret-right-bold" class="w-3 h-3 rtl:rotate-180" />
        <h1 class="text-base font-extrabold text-text-primary tracking-tight">
          Revenue & Operational Analytics
        </h1>
        <span
          class="ms-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Almaza Hub #402 • Live (updated 2m ago)
        </span>
      </div>

      <div class="flex items-center gap-3 flex-wrap">
        <VButton
          variant="outline"
          size="sm"
          rounded="xl"
          icon="ph:download-simple-bold"
          custom-class="bg-surface-0 dark:bg-surface-1 shadow-xs border-border/80"
          @click="emit('export-csv')"
        >
          Export CSV
        </VButton>
        <VButton
          variant="primary"
          size="sm"
          rounded="xl"
          icon="ph:file-pdf-bold"
          custom-class="bg-[#0F5A47] hover:bg-[#0c4939] border-none text-white shadow-sm shadow-[#0F5A47]/20"
          @click="emit('export-pdf')"
        >
          PDF Report
        </VButton>
      </div>
    </div>

    <!-- Period & filters -->
    <div class="flex items-center gap-2.5 flex-wrap">
      <VTabs v-model="period" :tabs="REPORT_PERIOD_TABS" />

      <VDropdownMenu :items="dateRangeItems" align="left">
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
import type { DropdownItem } from "@otobisi/ui/types/shared/VDropdownMenu";

const emit = defineEmits<{
  (e: "export-csv"): void;
  (e: "export-pdf"): void;
}>();

const period = defineModel<string>("period", { required: true });
const dateRange = defineModel<string>("dateRange", { required: true });
const corridor = defineModel<string>("corridor", { required: true });

const toItems = (options: string[], model: Ref<string>): DropdownItem[] =>
  options.map((label) => ({
    type: "button",
    label,
    onClick: () => (model.value = label),
  }));

const dateRangeItems = computed(() =>
  toItems(REPORT_DATE_RANGES, dateRange),
);
const corridorItems = computed(() =>
  toItems(REPORT_CORRIDOR_OPTIONS, corridor),
);

const triggerClass = (open: boolean) => [
  "border-border/80 bg-surface-0 dark:bg-[#111927]",
  open ? "border-accent-500" : "",
];
</script>
