<template>
  <div class="flex items-center justify-between flex-wrap gap-4">
    <div
      class="flex items-center gap-2 text-xs text-text-muted font-medium flex-wrap"
    >
      <span>Operations</span>
      <Icon name="ph:caret-right-bold" class="w-3 h-3 rtl:rotate-180" />
      <span>Passenger Manifest</span>
      <Icon name="ph:caret-right-bold" class="w-3 h-3 rtl:rotate-180" />
      <h1 class="text-base font-extrabold text-text-primary tracking-tight">
        Boarding List
      </h1>
    </div>

    <div class="flex items-center gap-3 flex-wrap">
      <!-- Trip selector -->
      <VDropdownMenu :items="tripItems" align="right">
        <template #trigger="{ open }">
          <VButton
            variant="surface"
            size="sm"
            rounded="xl"
            icon="ph:bus-bold"
            icon-right="ph:caret-down-bold"
            :custom-class="[
              'border-border/80 bg-surface-0 dark:bg-[#111927] font-mono',
              open ? 'border-accent-500' : '',
            ]"
          >
            {{ tripId }} • {{ departLabel }}
          </VButton>
        </template>
      </VDropdownMenu>

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
      <VButton
        variant="primary"
        size="sm"
        rounded="xl"
        icon="ph:printer-bold"
        custom-class="bg-[#0F5A47] hover:bg-[#0c4939] border-none text-white shadow-sm shadow-[#0F5A47]/20"
        @click="emit('print')"
      >
        Print Manifest
      </VButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { DropdownItem } from "~/types/shared/VDropdownMenu";

const props = defineProps<{
  tripId: string;
  departLabel: string;
}>();

const emit = defineEmits<{
  (e: "select", id: string): void;
  (e: "export"): void;
  (e: "print"): void;
}>();

const tripItems = computed<DropdownItem[]>(() =>
  MANIFEST_TRIPS.map((t) => ({
    type: "button",
    label: manifestTripLabel(t),
    icon: t.id === props.tripId ? "ph:check-bold" : undefined,
    onClick: () => emit("select", t.id),
  })),
);
</script>
