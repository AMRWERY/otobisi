<template>
  <div class="flex items-center justify-between flex-wrap gap-4">
    <!-- Breadcrumb & Title -->
    <div class="space-y-1.5">
      <div
        class="flex items-center gap-2 text-xs text-text-muted font-medium flex-wrap"
      >
        <span>Operations</span>
        <Icon name="ph:caret-right-bold" class="w-3 h-3 rtl:rotate-180" />
        <span>Fleet & Vehicles</span>
        <Icon name="ph:caret-right-bold" class="w-3 h-3 rtl:rotate-180" />
        <h1 class="text-base font-extrabold text-text-primary tracking-tight">
          Active Fleet Roster
        </h1>
      </div>

      <div
        class="flex flex-wrap items-center gap-2 text-[11px] font-mono text-text-muted"
      >
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        <span class="font-medium text-text-secondary">
          {{ total }} Total Registered Coaches
        </span>
        <span>/</span>
        <span class="text-emerald-700 dark:text-emerald-400 font-semibold">
          {{ inService }} In Service
        </span>
        <span>/</span>
        <span class="text-amber-600 dark:text-amber-400">
          {{ maintenance }} In Maintenance
        </span>
        <span>/</span>
        <span>{{ standby }} Standby</span>
      </div>
    </div>

    <div class="flex items-center gap-3 flex-wrap">
      <VButton
        variant="outline"
        size="sm"
        rounded="xl"
        icon="ph:download-simple-bold"
        custom-class="bg-surface-0 dark:bg-surface-1 shadow-xs border-border/80"
        @click="emit('export')"
      >
        Export Manifest (.CSV)
      </VButton>

      <VButton
        variant="primary"
        size="sm"
        rounded="xl"
        icon="ph:plus-bold"
        custom-class="bg-[#0F5A47] hover:bg-[#0c4939] border-none text-white shadow-sm shadow-[#0F5A47]/20"
        @click="emit('add')"
      >
        Add Vehicle
      </VButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  total: number;
  inService: number;
  maintenance: number;
  standby: number;
}>();

const emit = defineEmits<{
  (e: "export"): void;
  (e: "add"): void;
}>();
</script>
