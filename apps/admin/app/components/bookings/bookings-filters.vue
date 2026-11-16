<template>
  <div class="space-y-3">
    <div
      class="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3"
    >
      <!-- Search -->
      <VInput
        ref="searchInputRef"
        v-model="search"
        size="sm"
        rounded="xl"
        icon="ph:magnifying-glass-bold"
        placeholder="Search by passenger name, PNR, phone or national ID..."
        wrapper-class="w-full lg:w-96"
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

      <div class="flex items-center gap-2.5 flex-wrap">
        <VDropdownMenu :items="dateRangeItems" align="right">
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

        <VDropdownMenu :items="corridorItems" align="right">
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

        <VDropdownMenu :items="classItems" align="right">
          <template #trigger="{ open }">
            <VButton
              variant="surface"
              size="sm"
              rounded="xl"
              icon="ph:bus-bold"
              icon-right="ph:caret-down-bold"
              :custom-class="triggerClass(open)"
            >
              {{ vehicleClass }}
            </VButton>
          </template>
        </VDropdownMenu>
      </div>
    </div>

    <div class="flex items-center justify-between gap-3 flex-wrap">
      <VTabs v-model="tab" :tabs="tabs" />

      <!-- Active filter chips -->
      <div
        v-if="hasActiveFilters"
        class="flex items-center gap-2 text-[11px] flex-wrap"
      >
        <span class="font-mono uppercase tracking-wider text-text-muted">
          Active filter:
        </span>
        <button
          v-for="chip in chips"
          :key="chip.label"
          type="button"
          class="inline-flex items-center gap-1.5 h-6 ps-2.5 pe-1.5 rounded-full bg-accent-50 dark:bg-accent-500/15 text-accent-700 dark:text-accent-300 border border-accent-200/70 dark:border-accent-500/25 font-semibold cursor-pointer"
          :aria-label="`Remove filter ${chip.label}`"
          @click="chip.clear()"
        >
          {{ chip.label }}
          <Icon name="ph:x-bold" class="w-3 h-3" />
        </button>
        <button
          type="button"
          class="font-mono underline underline-offset-2 text-text-muted hover:text-text-primary cursor-pointer"
          @click="emit('reset')"
        >
          Clear all
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { DropdownItem } from "@otobisi/ui/types/shared/VDropdownMenu";

const props = defineProps<{
  counts: {
    all: number;
    confirmed: number;
    completed: number;
    cancelled: number;
  };
  hasActiveFilters: boolean;
}>();

const emit = defineEmits<{ (e: "reset"): void }>();

const dateRange = defineModel<string>("dateRange", { required: true });
const corridor = defineModel<string>("corridor", { required: true });
const vehicleClass = defineModel<string>("vehicleClass", { required: true });
const tab = defineModel<string>("tab", { required: true });
const search = defineModel<string>("search", { required: true });

const n = (v: number) => v.toLocaleString("en-US");

const tabs = computed(() => [
  { key: "all", label: `All ${n(props.counts.all)}` },
  { key: "confirmed", label: `Confirmed ${n(props.counts.confirmed)}` },
  { key: "completed", label: `Completed ${n(props.counts.completed)}` },
  { key: "cancelled", label: `Cancelled ${n(props.counts.cancelled)}` },
]);

const toItems = (options: string[], model: Ref<string>): DropdownItem[] =>
  options.map((label) => ({
    type: "button",
    label,
    onClick: () => (model.value = label),
  }));

const dateRangeItems = computed(() => toItems(BOOKING_DATE_RANGES, dateRange));
const corridorItems = computed(() => toItems(BOOKING_CORRIDORS, corridor));
const classItems = computed(() => toItems(BOOKING_CLASSES, vehicleClass));

const chips = computed(() => {
  const list: { label: string; clear: () => void }[] = [];
  if (corridor.value !== ALL_BOOKING_CORRIDORS)
    list.push({
      label: corridor.value,
      clear: () => (corridor.value = ALL_BOOKING_CORRIDORS),
    });
  if (vehicleClass.value !== ALL_BOOKING_CLASSES)
    list.push({
      label: vehicleClass.value,
      clear: () => (vehicleClass.value = ALL_BOOKING_CLASSES),
    });
  if (search.value)
    list.push({ label: `"${search.value}"`, clear: () => (search.value = "") });
  return list;
});

const triggerClass = (open: boolean) => [
  "border-border/80 bg-surface-0 dark:bg-[#111927]",
  open ? "border-accent-500" : "",
];

// "/" focuses the search box, like the trips page
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
