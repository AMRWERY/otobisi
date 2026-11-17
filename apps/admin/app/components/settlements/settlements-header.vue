<template>
  <div class="flex items-center justify-between flex-wrap gap-4">
    <div class="space-y-1.5">
      <div
        class="flex items-center gap-2 text-xs text-text-muted font-medium flex-wrap"
      >
        <span>Analytics & Settlement</span>
        <Icon name="ph:caret-right-bold" class="w-3 h-3 rtl:rotate-180" />
        <h1 class="text-base font-extrabold text-text-primary tracking-tight">
          Settlements (Fawry / Meeza)
        </h1>
        <span
          v-if="failedCount"
          class="ms-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-50 dark:bg-rose-500/15 text-rose-700 dark:text-rose-400 border border-rose-200/60 dark:border-rose-500/25"
        >
          <Icon name="ph:warning-bold" class="w-3 h-3" />
          {{ failedCount }} failed payout{{ failedCount === 1 ? "" : "s" }}
        </span>
      </div>
      <p class="text-xs text-text-muted">
        Payout batches from each payment rail, with fees, VAT and
        reconciliation against your bank account.
      </p>
    </div>

    <div class="flex items-center gap-3 flex-wrap">
      <VButton
        variant="outline"
        size="sm"
        rounded="xl"
        icon="ph:arrows-clockwise-bold"
        custom-class="bg-surface-0 dark:bg-surface-1 shadow-xs border-border/80"
        @click="emit('sync')"
      >
        Sync Gateways
      </VButton>
      <VButton
        variant="primary"
        size="sm"
        rounded="xl"
        icon="ph:download-simple-bold"
        custom-class="bg-[#0F5A47] hover:bg-[#0c4939] border-none text-white shadow-sm shadow-[#0F5A47]/20"
        @click="emit('export')"
      >
        Export CSV
      </VButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  failedCount: number;
}>();

const emit = defineEmits<{
  (e: "sync"): void;
  (e: "export"): void;
}>();
</script>
