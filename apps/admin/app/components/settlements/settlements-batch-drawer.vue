<template>
  <Teleport to="body">
    <div
      v-if="batch"
      class="fixed inset-0 z-50 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="settlements-batch-title"
    >
      <div
        class="fixed inset-0 bg-black/50 backdrop-blur-xs"
        @click="emit('close')"
      />

      <div class="fixed inset-y-0 end-0 flex max-w-full">
        <div
          class="w-screen max-w-md lg:max-w-lg bg-surface-0 dark:bg-[#0E131F] border-s border-border shadow-2xl flex flex-col h-full"
        >
          <!-- Header -->
          <div
            class="px-6 py-5 border-b border-border/80 flex items-start justify-between gap-4 shrink-0 bg-surface-1/30 dark:bg-surface-2/10"
          >
            <div class="space-y-1.5">
              <div class="flex items-center gap-2 flex-wrap">
                <h2
                  id="settlements-batch-title"
                  class="font-mono text-base font-bold text-teal-700 dark:text-teal-300"
                >
                  {{ batch.id }}
                </h2>
                <settlements-status-pill :status="batch.status" />
                <span
                  v-if="batch.reconciled"
                  class="inline-flex items-center gap-1 text-[11px] font-semibold text-teal-700 dark:text-teal-300"
                >
                  <Icon name="ph:seal-check-fill" class="w-3.5 h-3.5" />
                  Reconciled
                </span>
              </div>
              <p class="text-xs text-text-muted font-mono">
                {{ rail.label }} • {{ settlementsPeriod(batch) }}, 2024
              </p>
            </div>
            <VButton
              variant="ghost"
              size="xs"
              rounded="lg"
              icon="ph:x-bold"
              aria-label="Close details"
              @click="emit('close')"
            />
          </div>

          <!-- Body -->
          <div
            class="flex-1 overflow-y-auto px-6 py-5 space-y-6 custom-scrollbar text-xs"
          >
            <!-- Amounts -->
            <section class="space-y-3">
              <fleet-form-section-title title="01 • Payout Breakdown" />

              <div>
                <div class="font-mono text-[10px] uppercase tracking-wider text-text-muted">
                  Net payout
                </div>
                <div class="flex items-baseline gap-1.5">
                  <span
                    class="font-mono text-[32px] leading-none font-semibold tabular-nums text-text-primary"
                  >
                    {{ formatEgp(batch.net) }}
                  </span>
                  <span class="text-xs text-text-muted">EGP</span>
                </div>
              </div>

              <!-- Where the gross went -->
              <div
                class="h-2 rounded-full overflow-hidden bg-surface-2 flex"
                role="img"
                :aria-label="`Net ${netShare}%, fees and VAT ${100 - netShare}%`"
              >
                <span
                  class="h-full bg-teal-600 dark:bg-teal-400"
                  :style="{ width: `${netShare}%` }"
                />
                <span class="h-full bg-amber-500" :style="{ width: `${100 - netShare}%` }" />
              </div>

              <dl class="space-y-1.5 font-mono text-[11px]">
                <div class="flex justify-between">
                  <dt class="text-text-muted">Gross collected</dt>
                  <dd class="tabular-nums text-text-primary">{{ formatEgp(batch.gross) }}</dd>
                </div>
                <div class="flex justify-between">
                  <dt class="text-text-muted">
                    Gateway fees ({{ (rail.feeRate * 100).toFixed(1) }}%)
                  </dt>
                  <dd class="tabular-nums text-text-secondary">− {{ formatEgp(batch.fees) }}</dd>
                </div>
                <div class="flex justify-between">
                  <dt class="text-text-muted">VAT on fees ({{ SETTLEMENTS_VAT_RATE * 100 }}%)</dt>
                  <dd class="tabular-nums text-text-secondary">− {{ formatEgp(batch.vat) }}</dd>
                </div>
              </dl>
            </section>

            <!-- Transactions -->
            <section class="space-y-3">
              <fleet-form-section-title title="02 • Transactions" :aside="batch.gatewayRef" />
              <div class="grid grid-cols-2 gap-3">
                <div
                  v-for="item in txSummary"
                  :key="item.label"
                  class="p-3 rounded-xl bg-surface-1/60 dark:bg-surface-2/20 border border-border/80"
                >
                  <div class="font-mono text-[10px] uppercase tracking-wider text-text-muted">
                    {{ item.label }}
                  </div>
                  <div class="font-mono text-sm font-bold tabular-nums text-text-primary mt-0.5">
                    {{ item.value }}
                  </div>
                </div>
              </div>
            </section>

            <!-- Reconciliation checks -->
            <section class="space-y-3">
              <fleet-form-section-title title="03 • Reconciliation Checks" />
              <ul class="space-y-2">
                <li
                  v-for="check in checks"
                  :key="check.label"
                  class="flex items-start gap-2.5 p-3 rounded-xl border border-border/80"
                >
                  <Icon
                    :name="SETTLEMENTS_CHECK_ICONS[check.state].icon"
                    :class="['w-4 h-4 shrink-0 mt-0.5', SETTLEMENTS_CHECK_ICONS[check.state].class]"
                  />
                  <div class="leading-tight">
                    <div class="font-semibold text-text-primary">{{ check.label }}</div>
                    <div class="text-[11px] text-text-muted mt-0.5">{{ check.detail }}</div>
                  </div>
                </li>
              </ul>
            </section>
          </div>

          <!-- Footer -->
          <div
            class="px-6 py-4 border-t border-border/80 bg-surface-1/40 dark:bg-surface-2/20 flex items-center justify-between gap-3 shrink-0"
          >
            <VButton
              variant="surface"
              size="sm"
              rounded="xl"
              icon="ph:file-arrow-down-bold"
              @click="emit('statement', batch)"
            >
              Statement
            </VButton>
            <VButton
              variant="primary"
              size="sm"
              rounded="xl"
              icon="ph:check-circle-bold"
              :disabled="batch.status !== 'paid' || batch.reconciled"
              custom-class="bg-[#0F5A47] hover:bg-[#0c4939] border-none text-white shadow-sm shadow-[#0F5A47]/20"
              @click="emit('reconcile', batch)"
            >
              {{ batch.reconciled ? "Reconciled" : "Mark Reconciled" }}
            </VButton>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import type { SettlementBatch } from "~/types/settlements";

const props = defineProps<{
  /** The batch to inspect; the drawer is closed while this is null */
  batch: SettlementBatch | null;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "reconcile", batch: SettlementBatch): void;
  (e: "statement", batch: SettlementBatch): void;
}>();

// Fall back to the first rail so the computeds are safe while the drawer is closed
const rail = computed(
  () => SETTLEMENTS_RAILS[props.batch?.rail ?? SETTLEMENTS_RAIL_KEYS[0]!],
);

const checks = computed(() => (props.batch ? settlementsChecks(props.batch) : []));

const netShare = computed(() =>
  props.batch?.gross
    ? Math.round((props.batch.net / props.batch.gross) * 1000) / 10
    : 100,
);

const txSummary = computed(() => {
  const b = props.batch;
  if (!b) return [];
  return [
    { label: "Transactions", value: b.txCount.toLocaleString("en-US") },
    { label: "Avg ticket (EGP)", value: formatEgp(b.txCount ? b.gross / b.txCount : 0) },
    { label: "Refunds", value: b.refundCount.toLocaleString("en-US") },
    {
      label: "Disputed",
      value: b.disputedCount
        ? `${b.disputedCount} • ${formatEgp(b.disputed)}`
        : "None",
    },
  ];
});

// Close on Escape
onMounted(() => {
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "Escape" && props.batch) emit("close");
  };
  window.addEventListener("keydown", onKey);
  onBeforeUnmount(() => window.removeEventListener("keydown", onKey));
});
</script>
