import type {
  PricingGuardrails,
  PricingRule,
  PricingRuleFilter,
  PricingRuleForm,
  PricingScenario,
} from "~/types/pricing";

export function usePricing() {
  const toast = useToast();

  // ── Rules ───────────────────────────────────────────────
  const rules = ref<PricingRule[]>(
    PRICING_RULE_SEEDS.map((r) => ({ ...r, trigger: { ...r.trigger } })),
  );
  const ruleFilter = ref<PricingRuleFilter>("all");

  const filteredRules = computed(() =>
    rules.value.filter(
      (r) =>
        ruleFilter.value === "all" ||
        (ruleFilter.value === "active" ? r.active : !r.active),
    ),
  );

  const ruleTabs = computed(() =>
    PRICING_RULE_TABS.map((tab) => ({
      key: tab.key,
      label: `${tab.label} ${
        tab.key === "all"
          ? rules.value.length
          : rules.value.filter((r) => r.active === (tab.key === "active")).length
      }`,
    })),
  );

  function toggleRule(rule: PricingRule) {
    rule.active = !rule.active;
    toast.info(`${rule.name} ${rule.active ? "activated" : "paused"}`);
  }

  /** Returns true when the rule was stored, so the page can close the drawer */
  function saveRule(form: PricingRuleForm, id: number | null): boolean {
    const error = pricingRuleFormError(form);
    if (error) {
      toast.error(error);
      return false;
    }

    const unit = PRICING_TRIGGERS[form.kind].unit;
    const next: Omit<PricingRule, "id"> = {
      name: form.name.trim(),
      corridor: form.corridor,
      trigger: { kind: form.kind, ...(unit ? { threshold: form.threshold } : {}) },
      adjustment: form.adjustment,
      priority: Math.max(1, Math.round(form.priority)),
      active: form.active,
    };

    if (id == null) {
      rules.value.push({ id: Date.now(), ...next });
      toast.success(`Rule “${next.name}” created`);
    } else {
      const target = rules.value.find((r) => r.id === id);
      if (target) Object.assign(target, next);
      toast.success(`Rule “${next.name}” updated`);
    }
    return true;
  }

  function duplicateRule(rule: PricingRule) {
    rules.value.push({
      ...rule,
      id: Date.now(),
      name: `${rule.name} (copy)`,
      trigger: { ...rule.trigger },
      priority: rules.value.length + 1,
      active: false,
    });
    toast.success("Rule duplicated as paused");
  }

  function deleteRule(rule: PricingRule) {
    rules.value = rules.value.filter((r) => r.id !== rule.id);
    toast.info(`Rule “${rule.name}” deleted`);
  }

  // ── Guardrails: the form is "dirty" when it differs from the saved snapshot ──
  const form = reactive<PricingGuardrails>(
    pricingCloneGuardrails(PRICING_GUARDRAIL_DEFAULTS),
  );
  const saved = ref<PricingGuardrails>(
    pricingCloneGuardrails(PRICING_GUARDRAIL_DEFAULTS),
  );

  const isDirty = computed(
    () => JSON.stringify(form) !== JSON.stringify(saved.value),
  );

  function saveGuardrails() {
    for (const key of PRICING_CLASS_KEYS) {
      const { min, max } = form.limits[key];
      if (!(min > 0) || !(max > 0)) {
        toast.error(`${PRICING_CLASS_LABELS[key]}: fares must be above zero`);
        return;
      }
      if (min >= max) {
        toast.error(`${PRICING_CLASS_LABELS[key]}: minimum must be below maximum`);
        return;
      }
    }
    if (!(form.maxDailyChange > 0) || form.maxDailyChange > 50) {
      toast.error("Max daily change must be between 1% and 50%");
      return;
    }
    saved.value = pricingCloneGuardrails(form);
    toast.success("Guardrails saved");
  }

  /** Back to the last saved state */
  function discardGuardrails() {
    Object.assign(form, pricingCloneGuardrails(saved.value));
  }

  // ── Stats (computed from the committed rules and guardrails) ──
  const stats = computed(() => {
    const typical: Omit<PricingScenario, "corridor"> = {
      date: pricingDateIn(5),
      occupancy: 88,
    };

    const uplifts = PRICING_CORRIDORS.map((c) => {
      const r = pricingSimulate(
        { ...typical, corridor: c.id },
        rules.value,
        saved.value,
      );
      return ((r.final - r.base) / r.base) * 100;
    });
    const avgUplift =
      Math.round((uplifts.reduce((a, b) => a + b, 0) / uplifts.length) * 10) / 10;

    // A corridor complies when even its most extreme stacking stays inside the class limits
    const compliant = PRICING_CORRIDORS.filter((c) => {
      const applicable = rules.value.filter(
        (r) =>
          r.active &&
          (r.corridor === PRICING_ALL_CORRIDORS || r.corridor === c.id),
      );
      const up = applicable
        .filter((r) => r.adjustment > 0)
        .reduce((s, r) => s + r.adjustment, 0);
      const down = applicable
        .filter((r) => r.adjustment < 0)
        .reduce((s, r) => s + r.adjustment, 0);
      const limits = saved.value.limits[c.fareClass];
      return (
        c.baseFare * (1 + up / 100) <= limits.max &&
        c.baseFare * (1 + down / 100) >= limits.min
      );
    }).length;

    return {
      avgUplift,
      activeRules: rules.value.filter((r) => r.active).length,
      totalRules: rules.value.length,
      compliance: Math.round((compliant / PRICING_CORRIDORS.length) * 100),
      compliantCount: compliant,
    };
  });

  // ── Simulator ───────────────────────────────────────────
  const scenario = reactive<PricingScenario>({
    corridor: PRICING_CORRIDORS[0]!.id,
    date: pricingDateIn(3),
    occupancy: 82,
  });

  const simulation = computed(() =>
    pricingSimulate(scenario, rules.value, saved.value),
  );
  const fareCurve = computed(() =>
    pricingFareCurve(scenario, rules.value, saved.value),
  );

  return {
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
  };
}
