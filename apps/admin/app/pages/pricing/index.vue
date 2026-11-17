<template>
  <div class="px-6 py-6 pb-24 space-y-5 max-w-[1600px] mx-auto">
    <lazy-pricing-header :active-rules="stats.activeRules" @add="openCreate" />

    <lazy-pricing-stats :stats="stats" />

    <lazy-pricing-rules-table
      v-model:filter="ruleFilter"
      :rules="filteredRules"
      :tabs="ruleTabs"
      @add="openCreate"
      @edit="openEdit"
      @duplicate="duplicateRule"
      @delete="deleteRule"
      @toggle="toggleRule"
    />

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
      <lazy-pricing-guardrails v-model="form" />
      <lazy-pricing-simulator
        v-model="scenario"
        :result="simulation"
        :curve="fareCurve"
      />
    </div>

    <lazy-pricing-rule-drawer
      :is-open="isDrawerOpen"
      :rule="editingRule"
      :next-priority="rules.length + 1"
      @close="closeDrawer"
      @save="handleSave"
    />

    <lazy-pricing-unsaved-bar
      :visible="isDirty"
      @discard="discardGuardrails"
      @save="saveGuardrails"
    />
  </div>
</template>

<script lang="ts" setup>
import type { PricingRule, PricingRuleForm } from "~/types/pricing";

const {
  rules,
  ruleFilter,
  ruleTabs,
  filteredRules,
  toggleRule,
  saveRule,
  duplicateRule,
  deleteRule,
  form,
  isDirty,
  saveGuardrails,
  discardGuardrails,
  stats,
  scenario,
  simulation,
  fareCurve,
} = usePricing();

// Create / edit drawer
const isDrawerOpen = ref(false);
const editingRule = ref<PricingRule | null>(null);

function openCreate() {
  editingRule.value = null;
  isDrawerOpen.value = true;
}

function openEdit(rule: PricingRule) {
  editingRule.value = rule;
  isDrawerOpen.value = true;
}

function closeDrawer() {
  isDrawerOpen.value = false;
}

function handleSave(formData: PricingRuleForm) {
  if (saveRule(formData, editingRule.value?.id ?? null)) closeDrawer();
}

useSeoMeta({
  title: "Dynamic Pricing",
  description:
    "Manage Otobisi dynamic fare rules, guardrails and test fares before they go live.",
  private: false,
});
</script>
