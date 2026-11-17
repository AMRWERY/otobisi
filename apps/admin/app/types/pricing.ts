export type PricingTriggerKind =
  | "occupancy"
  | "daysToDeparture"
  | "weekend"
  | "peakHour"
  | "holiday";

export type PricingClassKey = "vip" | "business" | "standard" | "sleeper";

export interface PricingTrigger {
  kind: PricingTriggerKind;
  /** Occupancy % (rule fires above it) or days before departure (fires at or below it); unused for the others */
  threshold?: number;
}

export interface PricingRule {
  id: number;
  name: string;
  /** Corridor id, or "all" */
  corridor: string;
  trigger: PricingTrigger;
  /** Signed percent applied to the base fare, e.g. 12 or -8 */
  adjustment: number;
  /** 1 = evaluated first; shown as a rank */
  priority: number;
  active: boolean;
}

export interface PricingRuleForm {
  name: string;
  corridor: string;
  kind: PricingTriggerKind;
  threshold: number;
  adjustment: number;
  priority: number;
  active: boolean;
}

export interface PricingCorridor {
  id: string;
  label: string;
  /** Standard fare in EGP before any rule */
  baseFare: number;
  fareClass: PricingClassKey;
}

export interface PricingFareLimits {
  /** Lowest fare the engine may charge, EGP */
  min: number;
  /** Highest fare the engine may charge, EGP */
  max: number;
}

export interface PricingGuardrails {
  limits: Record<PricingClassKey, PricingFareLimits>;
  /** Largest fare move allowed within one day, percent */
  maxDailyChange: number;
}

export interface PricingScenario {
  corridor: string;
  /** "YYYY-MM-DD" */
  date: string;
  occupancy: number;
}

export interface PricingAppliedRule {
  rule: PricingRule;
  /** EGP added or removed by this rule alone */
  amount: number;
}

export interface PricingResult {
  base: number;
  applied: PricingAppliedRule[];
  /** Fare after the rules, before the guardrails */
  raw: number;
  final: number;
  clamped: "floor" | "ceiling" | null;
}

export type PricingRuleFilter = "all" | "active" | "paused";
