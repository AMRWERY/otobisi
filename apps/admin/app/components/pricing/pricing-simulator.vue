<template>
  <section
    class="bg-surface-0 dark:bg-[#111927] border border-border/80 rounded-xl p-4 sm:p-5 shadow-xs space-y-4"
  >
    <header class="flex items-center gap-2 pb-3 border-b border-border/60">
      <div
        class="w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 bg-indigo-50 border-indigo-200 text-indigo-800 dark:bg-indigo-500/15 dark:border-indigo-500/25 dark:text-indigo-300"
      >
        <Icon name="ph:flask-bold" class="w-4 h-4" />
      </div>
      <div>
        <h2 class="text-sm font-bold text-text-primary">Fare Simulator</h2>
        <p class="text-[11px] font-mono text-text-muted">
          Test a departure against your live rules and guardrails
        </p>
      </div>
    </header>

    <!-- Scenario -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <VFormSelect
        v-model="scenario.corridor"
        label="Corridor"
        :options="corridorOptions"
      />
      <VInput
        v-model="scenario.date"
        label="Departure date"
        type="date"
        size="sm"
        rounded="lg"
        :hint="`${daysOut} day${daysOut === 1 ? '' : 's'} out${weekend ? ' • weekend' : ''}`"
      />
    </div>

    <div class="space-y-1.5">
      <div class="flex items-center justify-between">
        <label
          for="pricing-sim-occupancy"
          class="text-xs font-semibold text-text-primary/90"
        >
          Expected occupancy
        </label>
        <span class="font-mono text-sm font-bold text-text-primary tabular-nums">
          {{ scenario.occupancy }}%
        </span>
      </div>
      <input
        id="pricing-sim-occupancy"
        v-model.number="scenario.occupancy"
        type="range"
        min="0"
        max="100"
        step="1"
        class="w-full cursor-pointer"
      />
    </div>

    <!-- Result -->
    <div
      class="rounded-xl border border-border/80 bg-surface-1/60 dark:bg-surface-2/20 p-4 space-y-3"
    >
      <div class="flex items-end justify-between gap-3 flex-wrap">
        <div>
          <div class="font-mono text-[10px] uppercase tracking-wider text-text-muted">
            Final fare
          </div>
          <div class="flex items-baseline gap-1.5">
            <span
              class="font-mono text-[32px] leading-none font-semibold tabular-nums text-text-primary"
            >
              {{ formatEgp(result.final) }}
            </span>
            <span class="text-xs text-text-muted">EGP</span>
          </div>
        </div>
        <VTrendBadge :delta="upliftPercent" />
      </div>

      <dl class="space-y-1.5 font-mono text-[11px]">
        <div class="flex justify-between text-text-muted">
          <dt>Base fare</dt>
          <dd class="tabular-nums">{{ formatEgp(result.base) }}</dd>
        </div>

        <div
          v-for="item in result.applied"
          :key="item.rule.id"
          class="flex justify-between gap-2"
        >
          <dt class="text-text-secondary truncate">
            {{ item.rule.name }}
            <span class="text-text-muted">
              ({{ pricingFormatAdjustment(item.rule.adjustment) }})
            </span>
          </dt>
          <dd
            :class="[
              'tabular-nums',
              item.amount >= 0
                ? 'text-emerald-600 dark:text-emerald-400'
                : 'text-rose-600 dark:text-rose-400',
            ]"
          >
            {{ item.amount >= 0 ? "+" : "−" }}{{ formatEgp(Math.abs(item.amount)) }}
          </dd>
        </div>

        <div v-if="!result.applied.length" class="text-text-muted">
          No active rule fires for this scenario
        </div>

        <div
          v-if="result.clamped"
          class="flex items-center justify-between pt-1.5 border-t border-border/60 text-amber-700 dark:text-amber-400"
        >
          <dt class="flex items-center gap-1">
            <Icon name="ph:shield-warning-bold" class="w-3.5 h-3.5" />
            Held at class {{ result.clamped }}
          </dt>
          <dd class="tabular-nums">raw {{ formatEgp(result.raw) }}</dd>
        </div>
      </dl>
    </div>

    <!-- Fare vs days to departure -->
    <div>
      <div
        class="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-text-muted mb-1"
      >
        <span>Fare vs days to departure</span>
        <span class="normal-case">
          {{ formatEgp(Math.min(...curve)) }} – {{ formatEgp(Math.max(...curve)) }} EGP
        </span>
      </div>
      <VSparkline :values="curve" :height="56" aria-label="Fare by days to departure" />
      <div
        class="mt-1 flex items-center justify-between font-mono text-[10px] text-text-muted"
      >
        <span>30 days out</span>
        <span>Departure day</span>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { PricingResult, PricingScenario } from "~/types/pricing";

const props = defineProps<{
  result: PricingResult;
  /** Fare for each day from 30 days out down to departure */
  curve: number[];
}>();

// The page's reactive scenario; fields are edited in place
const scenario = defineModel<PricingScenario>({ required: true });

const corridorOptions = PRICING_CORRIDORS.map((c) => ({
  value: c.id,
  label: `${c.label} • base ${c.baseFare} EGP`,
}));

const daysOut = computed(() => pricingDaysUntil(scenario.value.date));
const weekend = computed(() => pricingIsWeekend(scenario.value.date));

const upliftPercent = computed(() =>
  props.result.base
    ? Math.round(((props.result.final - props.result.base) / props.result.base) * 1000) / 10
    : 0,
);
</script>
