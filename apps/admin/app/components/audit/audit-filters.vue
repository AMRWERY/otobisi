<template>
  <div class="space-y-3">
    <div
      class="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3"
    >
      <VInput
        ref="searchInputRef"
        v-model="search"
        size="sm"
        rounded="xl"
        icon="ph:magnifying-glass-bold"
        placeholder="Search by actor, event, target, ID or IP..."
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
        <VDropdownMenu :items="severityItems" align="right">
          <template #trigger="{ open }">
            <VButton
              variant="surface"
              size="sm"
              rounded="xl"
              icon="ph:gauge-bold"
              icon-right="ph:caret-down-bold"
              :custom-class="triggerClass(open)"
            >
              {{ severityLabel }}
            </VButton>
          </template>
        </VDropdownMenu>

        <VDropdownMenu :items="actorItems" align="right">
          <template #trigger="{ open }">
            <VButton
              variant="surface"
              size="sm"
              rounded="xl"
              icon="ph:user-bold"
              icon-right="ph:caret-down-bold"
              :custom-class="triggerClass(open)"
            >
              {{ actor === ALL_AUDIT ? "All Actors" : actor }}
            </VButton>
          </template>
        </VDropdownMenu>
      </div>
    </div>

    <div class="flex items-center justify-between gap-3 flex-wrap">
      <VTabs v-model="category" :tabs="tabs" />

      <div
        v-if="hasActiveFilters"
        class="flex items-center gap-2 text-[11px] flex-wrap"
      >
        <span class="font-mono uppercase tracking-wider text-text-muted">
          {{ shown }} of {{ total }} events
        </span>
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
import type { AuditSeverity } from "~/types/audit";

const props = defineProps<{
  counts: Record<string, number>;
  actors: string[];
  shown: number;
  total: number;
  hasActiveFilters: boolean;
}>();

const emit = defineEmits<{ (e: "reset"): void }>();

const search = defineModel<string>("search", { required: true });
const category = defineModel<string>("category", { required: true });
const severity = defineModel<string>("severity", { required: true });
const actor = defineModel<string>("actor", { required: true });

const tabs = computed(() => [
  { key: ALL_AUDIT, label: `All ${props.counts.all ?? 0}` },
  ...AUDIT_CATEGORY_KEYS.map((key) => ({
    key,
    label: `${AUDIT_CATEGORIES[key].label.split(" ")[0]} ${props.counts[key] ?? 0}`,
  })),
]);

const severityItems = computed<DropdownItem[]>(() => [
  { type: "button", label: "All Severities", onClick: () => (severity.value = ALL_AUDIT) },
  ...AUDIT_SEVERITY_KEYS.map(
    (key): DropdownItem => ({
      type: "button",
      label: AUDIT_SEVERITIES[key].label,
      onClick: () => (severity.value = key),
    }),
  ),
]);

const actorItems = computed<DropdownItem[]>(() => [
  { type: "button", label: "All Actors", onClick: () => (actor.value = ALL_AUDIT) },
  ...props.actors.map(
    (name): DropdownItem => ({
      type: "button",
      label: name,
      onClick: () => (actor.value = name),
    }),
  ),
]);

const severityLabel = computed(() =>
  severity.value === ALL_AUDIT
    ? "All Severities"
    : AUDIT_SEVERITIES[severity.value as AuditSeverity].label,
);

const triggerClass = (open: boolean) => [
  "border-border/80 bg-surface-0 dark:bg-[#111927]",
  open ? "border-accent-500" : "",
];

// "/" focuses the search box, like the other list pages
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
