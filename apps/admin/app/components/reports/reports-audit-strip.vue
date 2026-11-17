<template>
  <footer
    class="rounded-xl p-3.5 border border-border/80 bg-surface-1/60 dark:bg-surface-2/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono"
  >
    <div class="flex items-center gap-2.5">
      <div
        class="w-7 h-7 rounded-lg bg-teal-500/10 text-teal-600 flex items-center justify-center shrink-0"
      >
        <Icon name="ph:shield-check-bold" class="w-4 h-4" />
      </div>
      <div>
        <div class="font-bold text-text-primary">
          Official Egyptian Tax Authority (ETA) e-Receipt Invoicing Ledger Sync
        </div>
        <div class="text-[10px] text-text-muted">
          Hub #402 Almaza Gateway • Clearing reference: CAI-2024-ETA-0098421 •
          Audited reconciled Fawry batch 8829
        </div>
      </div>
    </div>

    <div class="flex items-center gap-3 shrink-0">
      <div
        class="flex items-center gap-1.5 text-emerald-500 font-bold text-[11px]"
      >
        <span class="w-2 h-2 rounded-full bg-emerald-500" />
        <span>Ledger Matched 100%</span>
      </div>
      <VButton
        variant="surface"
        size="sm"
        rounded="lg"
        @click="emit('view-log')"
      >
        View Sync Log
      </VButton>
    </div>
  </footer>
</template>

<script lang="ts" setup>
const emit = defineEmits<{ (e: "view-log"): void }>();
</script>
