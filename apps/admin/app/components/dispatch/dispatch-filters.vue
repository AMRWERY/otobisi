<template>
  <div class="flex items-center justify-between gap-3 flex-wrap">
    <div class="flex items-center gap-2.5 flex-wrap">
      <VDropdownMenu :items="corridorItems" align="left">
        <template #trigger="{ open }">
          <VButton
            variant="surface"
            size="sm"
            rounded="xl"
            icon="ph:arrow-up-right-bold"
            icon-right="ph:caret-down-bold"
            :custom-class="[
              'border-border/80 bg-surface-0 dark:bg-[#111927]',
              open ? 'border-accent-500' : '',
            ]"
          >
            {{ corridorLabel }}
          </VButton>
        </template>
      </VDropdownMenu>

      <VTabs v-model="status" :tabs="tabs" />
    </div>

    <button
      v-if="hasActiveFilters"
      type="button"
      class="font-mono text-[11px] underline underline-offset-2 text-text-muted hover:text-text-primary cursor-pointer"
      @click="emit('reset')"
    >
      Clear filters
    </button>
  </div>
</template>

<script lang="ts" setup>
import type { DropdownItem } from "~/types/shared/VDropdownMenu";
import type { DispatchCorridorKey, DispatchStatus } from "~/types/dispatch";

const props = defineProps<{
  counts: Record<DispatchStatus | "all", number>;
  hasActiveFilters: boolean;
}>();

const emit = defineEmits<{ (e: "reset"): void }>();

const corridor = defineModel<string>("corridor", { required: true });
const status = defineModel<string>("status", { required: true });

const tabs = computed(() => [
  { key: ALL_DISPATCH, label: `All ${props.counts.all}` },
  { key: "on-time", label: `On Time ${props.counts["on-time"]}` },
  { key: "delayed", label: `Delayed ${props.counts.delayed}` },
  { key: "boarding", label: `Boarding ${props.counts.boarding}` },
]);

const corridorItems = computed<DropdownItem[]>(() => [
  {
    type: "button",
    label: "All Corridors",
    onClick: () => (corridor.value = ALL_DISPATCH),
  },
  ...DISPATCH_CORRIDOR_KEYS.map(
    (key): DropdownItem => ({
      type: "button",
      label: DISPATCH_CORRIDORS[key].label,
      onClick: () => (corridor.value = key),
    }),
  ),
]);

const corridorLabel = computed(() =>
  corridor.value === ALL_DISPATCH
    ? "All Corridors"
    : DISPATCH_CORRIDORS[corridor.value as DispatchCorridorKey].label,
);
</script>
