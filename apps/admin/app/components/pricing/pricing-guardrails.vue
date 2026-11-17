<template>
  <section
    class="bg-surface-0 dark:bg-[#111927] border border-border/80 rounded-xl p-4 sm:p-5 shadow-xs space-y-4"
  >
    <header class="flex items-center gap-2 pb-3 border-b border-border/60">
      <div
        class="w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-500/15 dark:border-amber-500/25 dark:text-amber-300"
      >
        <Icon name="ph:shield-check-bold" class="w-4 h-4" />
      </div>
      <div>
        <h2 class="text-sm font-bold text-text-primary">Fare Guardrails</h2>
        <p class="text-[11px] font-mono text-text-muted">
          Hard limits applied after every rule
        </p>
      </div>
    </header>

    <!-- Per-class limits -->
    <div class="space-y-2.5">
      <div
        class="grid grid-cols-[1fr_6rem_6rem] gap-2 font-mono text-[10px] uppercase tracking-wider text-text-muted px-1"
      >
        <span>Class</span>
        <span>Min (EGP)</span>
        <span>Max (EGP)</span>
      </div>

      <div
        v-for="key in PRICING_CLASS_KEYS"
        :key="key"
        class="grid grid-cols-[1fr_6rem_6rem] gap-2 items-center"
      >
        <span class="text-xs font-semibold text-text-primary px-1">
          {{ PRICING_CLASS_LABELS[key] }}
        </span>
        <VInput
          v-model.number="form.limits[key].min"
          type="number"
          min="1"
          size="sm"
          rounded="lg"
          :aria-label="`${PRICING_CLASS_LABELS[key]} minimum fare`"
          :box-class="form.limits[key].min >= form.limits[key].max ? 'border-rose-500!' : ''"
          input-class="font-mono tabular-nums"
        />
        <VInput
          v-model.number="form.limits[key].max"
          type="number"
          min="1"
          size="sm"
          rounded="lg"
          :aria-label="`${PRICING_CLASS_LABELS[key]} maximum fare`"
          :box-class="form.limits[key].min >= form.limits[key].max ? 'border-rose-500!' : ''"
          input-class="font-mono tabular-nums"
        />
      </div>
    </div>

    <!-- Daily change cap -->
    <div
      class="p-3 rounded-xl bg-surface-1/60 dark:bg-surface-2/20 border border-border/80 space-y-2"
    >
      <div class="flex items-center justify-between gap-3">
        <div>
          <div class="text-xs font-bold text-text-primary">Max daily change</div>
          <p class="text-[11px] text-text-muted">
            Largest fare move allowed within 24 hours
          </p>
        </div>
        <span class="font-mono text-sm font-bold text-text-primary tabular-nums">
          ±{{ form.maxDailyChange }}%
        </span>
      </div>
      <input
        v-model.number="form.maxDailyChange"
        type="range"
        min="1"
        max="50"
        step="1"
        class="w-full cursor-pointer"
        aria-label="Max daily fare change in percent"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
import type { PricingGuardrails } from "~/types/pricing";

// The page's reactive guardrails; fields are edited in place
const form = defineModel<PricingGuardrails>({ required: true });
</script>
