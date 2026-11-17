// Constants + pure helpers for the dynamic pricing page (auto-imported)
import type {
  PricingClassKey,
  PricingCorridor,
  PricingGuardrails,
  PricingResult,
  PricingRule,
  PricingRuleForm,
  PricingScenario,
  PricingTriggerKind,
} from "~/types/pricing";

export const PRICING_ALL_CORRIDORS = "all";

export const PRICING_RULE_TABS = [
  { key: "all", label: "All Rules" },
  { key: "active", label: "Active" },
  { key: "paused", label: "Paused" },
];

export const PRICING_CLASS_LABELS: Record<PricingClassKey, string> = {
  vip: "VIP 2+1",
  business: "Business 2+2",
  standard: "Standard 2+2",
  sleeper: "Sleeper",
};

export const PRICING_CLASS_KEYS = Object.keys(
  PRICING_CLASS_LABELS,
) as PricingClassKey[];

export const PRICING_CORRIDORS: PricingCorridor[] = [
  { id: "cai-alx", label: "Cairo ⇄ Alexandria", baseFare: 175, fareClass: "standard" },
  { id: "cai-hrg", label: "Cairo ⇄ Hurghada", baseFare: 360, fareClass: "business" },
  { id: "cai-ssh", label: "Cairo ⇄ Sharm El Sheikh", baseFare: 410, fareClass: "business" },
  { id: "cai-dhb", label: "Cairo ⇄ Dahab", baseFare: 450, fareClass: "vip" },
  { id: "cai-lxr", label: "Cairo ⇄ Luxor Overnight", baseFare: 480, fareClass: "sleeper" },
];

export const PRICING_CORRIDOR_OPTIONS = [
  { value: PRICING_ALL_CORRIDORS, label: "All corridors" },
  ...PRICING_CORRIDORS.map((c) => ({ value: c.id, label: c.label })),
];

export const PRICING_TRIGGERS: Record<
  PricingTriggerKind,
  {
    label: string;
    icon: string;
    /** Unit of the threshold; null when the trigger has none */
    unit: string | null;
    hint: string;
  }
> = {
  occupancy: {
    label: "Occupancy above",
    icon: "ph:armchair-bold",
    unit: "%",
    hint: "Fires once seats sold exceed this share of capacity",
  },
  daysToDeparture: {
    label: "Days to departure at or below",
    icon: "ph:calendar-blank-bold",
    unit: "days",
    hint: "Fires when departure is this close (or closer)",
  },
  weekend: {
    label: "Weekend departure",
    icon: "ph:calendar-check-bold",
    unit: null,
    hint: "Fires on Friday and Saturday departures",
  },
  peakHour: {
    label: "Peak hour departure",
    icon: "ph:sun-horizon-bold",
    unit: null,
    hint: "Fires for departures between 06:00–09:00 and 16:00–20:00",
  },
  holiday: {
    label: "Public holiday window",
    icon: "ph:confetti-bold",
    unit: null,
    hint: "Fires inside official Egyptian holiday windows",
  },
};

export const PRICING_TRIGGER_OPTIONS = (
  Object.keys(PRICING_TRIGGERS) as PricingTriggerKind[]
).map((kind) => ({ value: kind, label: PRICING_TRIGGERS[kind].label }));

export const PRICING_GUARDRAIL_DEFAULTS: PricingGuardrails = {
  limits: {
    vip: { min: 300, max: 700 },
    business: { min: 250, max: 650 },
    standard: { min: 100, max: 320 },
    sleeper: { min: 350, max: 800 },
  },
  maxDailyChange: 15,
};

export const PRICING_RULE_SEEDS: PricingRule[] = [
  {
    id: 1,
    name: "High demand surge",
    corridor: PRICING_ALL_CORRIDORS,
    trigger: { kind: "occupancy", threshold: 85 },
    adjustment: 12,
    priority: 1,
    active: true,
  },
  {
    id: 2,
    name: "Last-week closing",
    corridor: PRICING_ALL_CORRIDORS,
    trigger: { kind: "daysToDeparture", threshold: 7 },
    adjustment: 8,
    priority: 2,
    active: true,
  },
  {
    id: 3,
    name: "Weekend premium",
    corridor: PRICING_ALL_CORRIDORS,
    trigger: { kind: "weekend" },
    adjustment: 10,
    priority: 3,
    active: true,
  },
  {
    id: 4,
    name: "Red Sea holiday rush",
    corridor: "cai-hrg",
    trigger: { kind: "holiday" },
    adjustment: 18,
    priority: 4,
    active: true,
  },
  {
    id: 5,
    name: "Rush hour (Cairo ⇄ Alex)",
    corridor: "cai-alx",
    trigger: { kind: "peakHour" },
    adjustment: 6,
    priority: 5,
    active: true,
  },
  {
    id: 6,
    name: "Low load discount",
    corridor: "cai-lxr",
    trigger: { kind: "daysToDeparture", threshold: 2 },
    adjustment: -10,
    priority: 6,
    active: false,
  },
];

export const emptyPricingRuleForm = (): PricingRuleForm => ({
  name: "",
  corridor: PRICING_ALL_CORRIDORS,
  kind: "occupancy",
  threshold: 80,
  adjustment: 5,
  priority: 1,
  active: true,
});

/** Human summary of a trigger, e.g. "Occupancy above 85%" */
export function pricingTriggerLabel(trigger: PricingRule["trigger"]): string {
  const info = PRICING_TRIGGERS[trigger.kind];
  if (!info.unit) return info.label;
  const value = trigger.threshold ?? 0;
  return `${info.label} ${value}${info.unit === "%" ? "%" : ` ${info.unit}`}`;
}

export function pricingCorridorLabel(id: string): string {
  return (
    PRICING_CORRIDOR_OPTIONS.find((o) => o.value === id)?.label ?? id
  );
}

/** "+12%" / "−8%" */
export function pricingFormatAdjustment(value: number): string {
  if (value === 0) return "±0%";
  return `${value > 0 ? "+" : "−"}${Math.abs(value)}%`;
}

/** Whole days between today (UTC) and a "YYYY-MM-DD" date; never negative */
export function pricingDaysUntil(date: string, today = new Date()): number {
  const target = Date.parse(`${date}T00:00:00Z`);
  const start = Date.UTC(
    today.getUTCFullYear(),
    today.getUTCMonth(),
    today.getUTCDate(),
  );
  if (Number.isNaN(target)) return 0;
  return Math.max(0, Math.round((target - start) / 86_400_000));
}

/** "YYYY-MM-DD" for today plus n days (UTC) */
export function pricingDateIn(days: number, today = new Date()): string {
  const d = new Date(
    Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()),
  );
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

/** Friday (5) and Saturday (6) are the Egyptian weekend */
export function pricingIsWeekend(date: string): boolean {
  const day = new Date(`${date}T00:00:00Z`).getUTCDay();
  return day === 5 || day === 6;
}

interface PricingContext {
  occupancy: number;
  daysToDeparture: number;
  weekend: boolean;
}

function pricingRuleMatches(
  rule: PricingRule,
  corridorId: string,
  ctx: PricingContext,
): boolean {
  if (!rule.active) return false;
  if (rule.corridor !== PRICING_ALL_CORRIDORS && rule.corridor !== corridorId)
    return false;

  const { kind, threshold = 0 } = rule.trigger;
  switch (kind) {
    case "occupancy":
      return ctx.occupancy > threshold;
    case "daysToDeparture":
      return ctx.daysToDeparture <= threshold;
    case "weekend":
      return ctx.weekend;
    // Time-of-day and holiday data is not modelled in the simulator; the
    // rules are listed as "not simulated" rather than silently ignored.
    default:
      return false;
  }
}

/** Runs the active rules (lowest priority number first) and then the class guardrails */
export function pricingSimulate(
  scenario: PricingScenario,
  rules: PricingRule[],
  guardrails: PricingGuardrails,
  /** Overrides the day count derived from the date, used for the fare curve */
  daysOverride?: number,
): PricingResult {
  const corridor =
    PRICING_CORRIDORS.find((c) => c.id === scenario.corridor) ??
    PRICING_CORRIDORS[0]!;
  const ctx: PricingContext = {
    occupancy: scenario.occupancy,
    daysToDeparture: daysOverride ?? pricingDaysUntil(scenario.date),
    weekend: pricingIsWeekend(
      daysOverride != null ? pricingDateIn(daysOverride) : scenario.date,
    ),
  };

  const applied = [...rules]
    .sort((a, b) => a.priority - b.priority)
    .filter((rule) => pricingRuleMatches(rule, corridor.id, ctx))
    .map((rule) => ({
      rule,
      amount: Math.round(corridor.baseFare * (rule.adjustment / 100) * 100) / 100,
    }));

  const raw =
    Math.round(
      (corridor.baseFare + applied.reduce((sum, a) => sum + a.amount, 0)) * 100,
    ) / 100;

  const limits = guardrails.limits[corridor.fareClass];
  let final = raw;
  let clamped: PricingResult["clamped"] = null;
  if (raw < limits.min) {
    final = limits.min;
    clamped = "floor";
  } else if (raw > limits.max) {
    final = limits.max;
    clamped = "ceiling";
  }

  return { base: corridor.baseFare, applied, raw, final, clamped };
}

/** Fare for each day from `span` days out down to departure day */
export function pricingFareCurve(
  scenario: PricingScenario,
  rules: PricingRule[],
  guardrails: PricingGuardrails,
  span = 30,
): number[] {
  return Array.from({ length: span + 1 }, (_, i) =>
    pricingSimulate(scenario, rules, guardrails, span - i).final,
  );
}

/** Whether the form describes a rule the engine can run */
export function pricingRuleFormError(form: PricingRuleForm): string | null {
  if (!form.name.trim()) return "Give the rule a name";
  if (!Number.isFinite(form.adjustment) || form.adjustment === 0)
    return "Adjustment must be a non-zero percentage";
  if (Math.abs(form.adjustment) > 50) return "Adjustment cannot exceed ±50%";
  if (PRICING_TRIGGERS[form.kind].unit && !(form.threshold > 0))
    return "Enter a threshold above zero";
  if (form.kind === "occupancy" && form.threshold >= 100)
    return "Occupancy threshold must be below 100%";
  return null;
}

/** Deep copy so the saved snapshot never shares nested objects with the live form */
export const pricingCloneGuardrails = (g: PricingGuardrails): PricingGuardrails =>
  JSON.parse(JSON.stringify(g));
