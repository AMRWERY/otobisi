<template>
  <section
    class="rounded-xl border border-border/80 bg-surface-1/60 dark:bg-surface-2/10 p-3.5 grid grid-cols-1 md:grid-cols-3 gap-3"
  >
    <div
      v-for="item in items"
      :key="item.label"
      class="flex items-center gap-2.5 min-w-0"
    >
      <div
        class="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-300 flex items-center justify-center shrink-0"
      >
        <Icon :name="item.icon" class="w-4 h-4" />
      </div>
      <div class="min-w-0 leading-tight">
        <div class="font-mono text-[10px] uppercase tracking-wider text-text-muted">
          {{ item.label }}
        </div>
        <div class="flex items-center gap-1.5 text-xs font-semibold text-text-primary truncate">
          <Icon
            :name="SETTLEMENTS_CHECK_ICONS[item.state].icon"
            :class="['w-3.5 h-3.5 shrink-0', SETTLEMENTS_CHECK_ICONS[item.state].class]"
          />
          <span class="truncate">{{ item.value }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { SettlementReconItem } from "~/types/settlements";

const props = defineProps<{
  /** Paid batches not yet confirmed against the bank statement */
  unreconciled: number;
}>();

// ETA and bank details are placeholders until the integrations exist
const items = computed<SettlementReconItem[]>(() => [
  {
    label: "ETA e-invoice sync",
    value: "Synced • 12 mins ago",
    icon: "ph:shield-check-bold",
    state: "ok",
  },
  {
    label: "Settlement bank account",
    value: "Banque Misr •••• 4821 • T+2",
    icon: "ph:bank-bold",
    state: "ok",
  },
  {
    label: "Reconciliation",
    value: props.unreconciled
      ? `${props.unreconciled} paid batch${props.unreconciled === 1 ? "" : "es"} to confirm`
      : "All paid batches reconciled",
    icon: "ph:scales-bold",
    state: props.unreconciled ? "pending" : "ok",
  },
]);
</script>
