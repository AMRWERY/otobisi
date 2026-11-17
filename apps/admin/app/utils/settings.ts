// Constants + pure helpers for the operator settings page (auto-imported)
import type {
  FleetTier,
  FleetTierKey,
  OperatorRail,
  SettingsForm,
  SettingsSection,
} from "~/types/settings";

export const SETTINGS_DEFAULTS: SettingsForm = {
  legalNameEn: "Nile Express Intercity Mobility S.A.E.",
  legalNameAr: "شركة النيل للنقل السريع ذ.م.م",
  brandName: "NileBus (Otobisi Partner)",
  dispatchEmail: "dispatch@nilebus.eg",
  dispatchPhone: "+20 (2) 2418-7900",
  accent: "#EA580C",
  tagline: "Connecting Egypt's Cities with VIP Comfort",
  tier: "vip",
};

/** Issued by the authorities, so it is shown read-only */
export const SETTINGS_TAX_ID = "CR-1049281 / Tax ID: 892-410-234";

export const SETTINGS_SECTIONS: SettingsSection[] = [
  { key: "identity", label: "General Profile", icon: "ph:buildings-bold", available: true },
  {
    key: "branding",
    label: "Public Branding",
    icon: "ph:palette-bold",
    badge: "Public Cards",
    available: true,
  },
  {
    key: "payments",
    label: "Payment & Invoicing",
    icon: "ph:credit-card-bold",
    badge: "3 Rails",
    badgeClass:
      "bg-teal-50 text-teal-700 border border-teal-200/50 dark:bg-teal-500/15 dark:text-teal-300 dark:border-teal-500/25",
    available: true,
  },
  {
    key: "notifications",
    label: "Notifications & Alerts",
    icon: "ph:bell-ringing-bold",
    available: false,
  },
  {
    key: "team",
    label: "Team & Roles",
    icon: "ph:users-three-bold",
    badge: "8 Active",
    available: false,
  },
  {
    key: "api",
    label: "API & Webhooks",
    icon: "ph:code-bold",
    badge: "v2.4",
    available: false,
  },
];

export const SETTINGS_THEME_COLORS = [
  { hex: "#EA580C", name: "Egyptian Orange" },
  { hex: "#006654", name: "Operator Dark Teal" },
  { hex: "#2563EB", name: "Royal Blue" },
  { hex: "#059669", name: "Emerald Green" },
  { hex: "#1E293B", name: "Midnight Slate" },
];

export const SETTINGS_FLEET_TIERS: Record<FleetTierKey, FleetTier> = {
  vip: {
    label: "VIP Elite Executive",
    badgeClass: "bg-slate-900 text-white",
  },
  royal: { label: "Royal Class", badgeClass: "bg-amber-500 text-white" },
  classic: { label: "Classic Express", badgeClass: "bg-teal-700 text-white" },
};

export const SETTINGS_TIER_OPTIONS = (
  Object.keys(SETTINGS_FLEET_TIERS) as FleetTierKey[]
).map((key) => ({
  value: key,
  label: `${SETTINGS_FLEET_TIERS[key].label} (${
    { vip: "Charcoal", royal: "Gold", classic: "Teal" }[key]
  } badge)`,
}));

export const SETTINGS_OPERATOR_RAILS: OperatorRail[] = [
  {
    initial: "F",
    name: "Fawry Pay Intercity",
    note: "Active • Code #99014",
    cardClass:
      "bg-blue-50/50 border-blue-200/70 dark:bg-blue-500/10 dark:border-blue-500/25",
    initialClass: "bg-blue-600",
  },
  {
    initial: "M",
    name: "Meeza National Rail",
    note: "Synced • Zero Fees",
    cardClass:
      "bg-teal-50/50 border-teal-200/70 dark:bg-teal-500/10 dark:border-teal-500/25",
    initialClass: "bg-teal-600",
  },
  {
    initial: "W",
    name: "Smart Mobile Wallets",
    note: "Instant T+0 Settlement",
    cardClass:
      "bg-indigo-50/50 border-indigo-200/70 dark:bg-indigo-500/10 dark:border-indigo-500/25",
    initialClass: "bg-indigo-600",
  },
];

export const isValidHex = (hex: string) => /^#[0-9a-fA-F]{6}$/.test(hex);

export function hexToRgb(hex: string): string {
  if (!isValidHex(hex)) return "—";
  const n = parseInt(hex.slice(1), 16);
  return `rgb(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255})`;
}
