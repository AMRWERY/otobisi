<template>
  <div class="flex items-center justify-between flex-wrap gap-4">
    <div class="space-y-1.5">
      <div
        class="flex items-center gap-2 text-xs text-text-muted font-medium flex-wrap"
      >
        <span>System & Settings</span>
        <Icon name="ph:caret-right-bold" class="w-3 h-3 rtl:rotate-180" />
        <h1 class="text-base font-extrabold text-text-primary tracking-tight">
          Audit Logs
        </h1>
        <span
          class="ms-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Recording • retained 12 months
        </span>
      </div>
      <p class="text-xs text-text-muted">
        An immutable trail of who changed what, when and from where, across
        security, billing, configuration, trips and team access.
      </p>
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
</template>

<script lang="ts" setup>
const emit = defineEmits<{ (e: "export"): void }>();
</script>
