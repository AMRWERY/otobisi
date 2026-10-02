<template>
  <div
    class="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3"
  >
    <div class="flex items-center gap-2.5 flex-wrap">
      <!-- Date range -->
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
            {{ dateRange }}
          </VButton>
        </template>
      </VDropdownMenu>

      <!-- Corridor -->
      <VDropdownMenu :items="corridorItems" align="left">
        <template #trigger="{ open }">
          <VButton
            variant="surface"
            size="sm"
            rounded="xl"
            icon="ph:arrow-up-right-bold"
            icon-right="ph:caret-down-bold"
            :custom-class="triggerClass(open)"
          >
            {{ corridor }}
          </VButton>
        </template>
      </VDropdownMenu>

      <!-- Vehicle class -->
      <VDropdownMenu :items="vehicleClassItems" align="left">
        <template #trigger="{ open }">
          <VButton
            variant="surface"
            size="sm"
            rounded="xl"
            icon-right="ph:caret-down-bold"
            :custom-class="triggerClass(open)"
          >
            {{ vehicleClass }}
          </VButton>
        </template>
      </VDropdownMenu>

      <!-- Status tabs -->
      <VTabs v-model="tab" :tabs="TRIP_STATUS_TABS" />
    </div>

    <!-- Search -->
    <VInput
      ref="searchInputRef"
      v-model="search"
      size="sm"
      rounded="xl"
      icon="ph:funnel-bold"
      placeholder="Filter by ID, corridor, plate, or driver..."
      wrapper-class="w-full lg:w-80"
      box-class="bg-surface-0 dark:bg-[#111927] border-border/80"
    >
      <template #trailing>
        <kbd
          class="px-1.5 py-0.5 text-[10px] font-mono text-text-muted bg-surface-1 dark:bg-surface-2 rounded border border-border/60"
        >
          /
        </kbd>
      </template>
    </VInput>
  </div>
</template>

<script lang="ts" setup>
import type { DropdownItem } from "@otobisi/ui/types/shared/VDropdownMenu";

const dateRange = defineModel<string>("dateRange", { required: true });
const corridor = defineModel<string>("corridor", { required: true });
const vehicleClass = defineModel<string>("vehicleClass", { required: true });
const tab = defineModel<string>("tab", { required: true });
const search = defineModel<string>("search", { required: true });

const toItems = (
  options: string[],
  model: Ref<string>,
): DropdownItem[] =>
  options.map((label) => ({
    type: "button",
    label,
    onClick: () => (model.value = label),
  }));

const dateRangeItems = computed(() => toItems(TRIP_DATE_RANGES, dateRange));
const corridorItems = computed(() => toItems(TRIP_CORRIDORS, corridor));
const vehicleClassItems = computed(() =>
  toItems(TRIP_VEHICLE_CLASSES, vehicleClass),
);

const triggerClass = (open: boolean) => [
  "border-border/80 bg-surface-0 dark:bg-[#111927]",
  open ? "border-accent-500" : "",
];

// "/" focuses the search box, like in most dashboards
const searchInputRef = ref<{ focus: () => void } | null>(null);

function onKeydown(e: KeyboardEvent) {
  const tag = document.activeElement?.tagName;
  if (e.key === "/" && tag !== "INPUT" && tag !== "TEXTAREA") {
    e.preventDefault();
    searchInputRef.value?.focus();
  }
}

onMounted(() => window.addEventListener("keydown", onKeydown));
onBeforeUnmount(() => window.removeEventListener("keydown", onKeydown));
</script>
