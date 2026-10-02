<template>
  <div class="flex items-center justify-between flex-wrap gap-4">
    <!-- Breadcrumb & Title -->
    <div
      class="flex items-center gap-2 text-xs text-text-muted font-medium flex-wrap"
    >
      <span>Operations</span>
      <Icon name="ph:caret-right-bold" class="w-3 h-3 rtl:rotate-180" />
      <span class="hover:text-text-primary transition-colors"
        >Trips & Schedules</span
      >
      <Icon name="ph:caret-right-bold" class="w-3 h-3 rtl:rotate-180" />
      <h1 class="text-base font-extrabold text-text-primary tracking-tight">
        Active Fleet Timetable
      </h1>
      <span
        class="ms-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40"
      >
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        {{ activeCount }} Daily Schedules Active
      </span>
    </div>

    <div class="flex items-center gap-3">
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
        icon="ph:plus-bold"
        custom-class="bg-[#0F5A47] hover:bg-[#0c4939] border-none text-white shadow-sm shadow-[#0F5A47]/20"
        @click="emit('add')"
      >
        Add New Trip
      </VButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  activeCount: number;
}>();

const emit = defineEmits<{
  (e: "export"): void;
  (e: "add"): void;
}>();
</script>
