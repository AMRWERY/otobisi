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
        placeholder="Search by vehicle name, plate number, VIN, chassis..."
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
        <!-- Seating blueprint -->
        <VDropdownMenu :items="templateItems" align="right">
          <template #trigger="{ open }">
            <VButton
              variant="surface"
              size="sm"
              rounded="xl"
              icon="ph:armchair-bold"
              icon-right="ph:caret-down-bold"
              :custom-class="triggerClass(open)"
            >
              {{ templateLabel }}
            </VButton>
          </template>
        </VDropdownMenu>

        <span class="font-mono text-xs text-text-muted">
          Showing
          <b class="text-text-primary">{{ shown }}</b>
          of {{ total }}
        </span>
      </div>
    </div>

    <div class="flex items-center justify-between gap-3 flex-wrap">
      <VTabs v-model="status" :tabs="tabs" />

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
import type { DropdownItem } from "~/types/shared/VDropdownMenu";

const props = defineProps<{
  counts: {
    all: number;
    "in-service": number;
    scheduled: number;
    standby: number;
    maintenance: number;
  };
  /** Rows matching the current filters */
  shown: number;
  total: number;
  hasActiveFilters: boolean;
}>();

const emit = defineEmits<{ (e: "reset"): void }>();

const search = defineModel<string>("search", { required: true });
const status = defineModel<string>("status", { required: true });
const template = defineModel<string>("template", { required: true });

const tabs = computed(() => [
  { key: ALL_FLEET, label: `All ${props.counts.all}` },
  { key: "in-service", label: `In Service ${props.counts["in-service"]}` },
  { key: "maintenance", label: `Maintenance ${props.counts.maintenance}` },
  { key: "standby", label: `Standby ${props.counts.standby}` },
]);

const templateItems = computed<DropdownItem[]>(() => [
  {
    type: "button",
    label: "All Templates",
    onClick: () => (template.value = ALL_FLEET),
  },
  ...COACH_TEMPLATE_KEYS.map(
    (key): DropdownItem => ({
      type: "button",
      label: COACH_TEMPLATES[key].label,
      onClick: () => (template.value = key),
    }),
  ),
]);

const templateLabel = computed(() =>
  template.value === ALL_FLEET
    ? "All Templates"
    : COACH_TEMPLATES[template.value as keyof typeof COACH_TEMPLATES].label,
);

const chips = computed(() => {
  const list: { label: string; clear: () => void }[] = [];
  if (template.value !== ALL_FLEET)
    list.push({
      label: templateLabel.value,
      clear: () => (template.value = ALL_FLEET),
    });
  if (search.value)
    list.push({ label: `"${search.value}"`, clear: () => (search.value = "") });
  return list;
});

const triggerClass = (open: boolean) => [
  "border-border/80 bg-surface-0 dark:bg-[#111927]",
  open ? "border-accent-500" : "",
];

// "/" focuses the search box, like the bookings and trips pages
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
