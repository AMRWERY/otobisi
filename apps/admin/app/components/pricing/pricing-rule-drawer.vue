<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pricing-rule-title"
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
            <div>
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-emerald-500" />
                <h2
                  id="pricing-rule-title"
                  class="text-base font-bold text-text-primary"
                >
                  {{ rule ? "Edit Pricing Rule" : "New Pricing Rule" }}
                </h2>
              </div>
              <p class="text-xs text-text-muted mt-0.5">
                Rules run in priority order, then the guardrails cap the fare.
              </p>
            </div>
            <VButton
              variant="ghost"
              size="xs"
              rounded="lg"
              icon="ph:x-bold"
              aria-label="Close drawer"
              @click="emit('close')"
            />
          </div>

          <!-- Body -->
          <div
            class="flex-1 overflow-y-auto px-6 py-5 space-y-6 custom-scrollbar text-xs"
          >
            <section class="space-y-3">
              <fleet-form-section-title title="01 • Rule" aside="Required" aside-class="text-red-500" />
              <VInput
                v-model="form.name"
                label="Rule name"
                required
                size="sm"
                rounded="lg"
                placeholder="e.g. Friday evening surge"
              />
              <VFormSelect
                v-model="form.corridor"
                label="Applies to"
                :options="PRICING_CORRIDOR_OPTIONS"
              />
            </section>

            <section class="space-y-3">
              <fleet-form-section-title title="02 • Trigger" />
              <VFormSelect
                v-model="form.kind"
                label="When"
                :options="PRICING_TRIGGER_OPTIONS"
              />
              <p class="text-[11px] text-text-muted">{{ trigger.hint }}</p>
              <VInput
                v-if="trigger.unit"
                v-model.number="form.threshold"
                :label="`Threshold (${trigger.unit})`"
                type="number"
                min="1"
                size="sm"
                rounded="lg"
              />
            </section>

            <section class="space-y-3">
              <fleet-form-section-title title="03 • Effect" />
              <div class="grid grid-cols-2 gap-3">
                <VInput
                  v-model.number="form.adjustment"
                  label="Adjustment (%)"
                  type="number"
                  min="-50"
                  max="50"
                  size="sm"
                  rounded="lg"
                  hint="Negative lowers the fare"
                />
                <VInput
                  v-model.number="form.priority"
                  label="Priority"
                  type="number"
                  min="1"
                  size="sm"
                  rounded="lg"
                  hint="1 runs first"
                />
              </div>

              <!-- Live preview -->
              <div
                class="p-3 rounded-xl bg-surface-1/60 dark:bg-surface-2/20 border border-border/80 flex items-center justify-between gap-3 font-mono"
              >
                <div class="text-[11px] text-text-muted">
                  {{ previewCorridor.label }}
                  <div class="text-text-secondary">
                    Base {{ formatEgp(previewCorridor.baseFare) }} EGP
                  </div>
                </div>
                <Icon
                  name="ph:arrow-right-bold"
                  class="w-3.5 h-3.5 text-text-muted rtl:rotate-180"
                />
                <div class="text-end">
                  <div class="text-sm font-bold text-text-primary tabular-nums">
                    {{ formatEgp(previewFare) }} EGP
                  </div>
                  <VTrendBadge
                    :tone="form.adjustment >= 0 ? 'positive' : 'negative'"
                    :label="pricingFormatAdjustment(form.adjustment)"
                  />
                </div>
              </div>

              <label class="flex items-center justify-between gap-3">
                <span>
                  <span class="block text-xs font-semibold text-text-primary/90">
                    Active
                  </span>
                  <span class="text-[11px] text-text-muted">
                    Paused rules are kept but never applied
                  </span>
                </span>
                <VSwitchButton v-model="form.active" label="Rule active" />
              </label>
            </section>
          </div>

          <!-- Footer -->
          <div
            class="px-6 py-4 border-t border-border/80 bg-surface-1/40 dark:bg-surface-2/20 flex items-center justify-end gap-3 shrink-0"
          >
            <VButton
              variant="surface"
              size="sm"
              rounded="xl"
              @click="emit('close')"
            >
              Cancel
            </VButton>
            <VButton
              variant="primary"
              size="sm"
              rounded="xl"
              icon="ph:check-bold"
              custom-class="bg-[#0F5A47] hover:bg-[#0c4939] border-none text-white shadow-sm shadow-[#0F5A47]/20"
              @click="emit('save', { ...form })"
            >
              {{ rule ? "Save Changes" : "Create Rule" }}
            </VButton>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import type { PricingRule, PricingRuleForm } from "~/types/pricing";

const props = defineProps<{
  isOpen: boolean;
  /** The rule being edited, or null when creating */
  rule: PricingRule | null;
  /** Suggested priority for a new rule */
  nextPriority: number;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "save", form: PricingRuleForm): void;
}>();

const form = ref<PricingRuleForm>(emptyPricingRuleForm());

// Start every opening from the rule being edited, or a clean form
watch(
  () => props.isOpen,
  (open) => {
    if (!open) return;
    const r = props.rule;
    form.value = r
      ? {
          name: r.name,
          corridor: r.corridor,
          kind: r.trigger.kind,
          threshold: r.trigger.threshold ?? 80,
          adjustment: r.adjustment,
          priority: r.priority,
          active: r.active,
        }
      : { ...emptyPricingRuleForm(), priority: props.nextPriority };
  },
);

const trigger = computed(() => PRICING_TRIGGERS[form.value.kind]);

const previewCorridor = computed(
  () =>
    PRICING_CORRIDORS.find((c) => c.id === form.value.corridor) ??
    PRICING_CORRIDORS[0]!,
);

const previewFare = computed(
  () =>
    Math.round(
      previewCorridor.value.baseFare * (1 + (form.value.adjustment || 0) / 100) * 100,
    ) / 100,
);
</script>
