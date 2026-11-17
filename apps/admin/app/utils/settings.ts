// Constants + pure helpers for the operator settings page (auto-imported)
import type {
  FleetTier,
  FleetTierKey,
  NotificationChannelInfo,
  NotificationEvent,
  OperatorRail,
  SettingsForm,
  SettingsSection,
} from "~/types/settings";

export const SETTINGS_NOTIFICATION_CHANNELS: NotificationChannelInfo[] = [
  { key: "email", label: "Email", icon: "ph:envelope-simple-bold" },
  { key: "sms", label: "SMS", icon: "ph:chat-text-bold" },
  { key: "whatsapp", label: "WhatsApp", icon: "ph:whatsapp-logo-bold" },
  { key: "push", label: "Push", icon: "ph:bell-simple-bold" },
];

export const SETTINGS_NOTIFICATION_EVENTS: NotificationEvent[] = [
  {
    key: "newBooking",
    label: "New booking",
    description: "A passenger completes a reservation on your trips",
    icon: "ph:ticket-bold",
    iconClass: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  },
  {
    key: "cancellation",
    label: "Cancellation & refund",
    description: "A booking is cancelled or a refund is queued",
    icon: "ph:arrow-u-up-left-bold",
    iconClass: "bg-rose-50 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300",
  },
  {
    key: "tripDelay",
    label: "Trip delay or change",
    description: "A departure slips past its scheduled window",
    icon: "ph:clock-countdown-bold",
    iconClass: "bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
    critical: true,
  },
  {
    key: "lowOccupancy",
    label: "Low occupancy",
    description: "A corridor drops below its occupancy target",
    icon: "ph:chart-line-down-bold",
    iconClass: "bg-sky-50 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300",
  },
  {
    key: "settlement",
    label: "Settlement paid out",
    description: "Fawry, Meeza or wallet payouts reach the treasury account",
    icon: "ph:bank-bold",
    iconClass: "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300",
  },
  {
    key: "security",
    label: "Security alerts",
    description: "New sign-in, role change or failed 2FA attempts",
    icon: "ph:shield-warning-bold",
    iconClass: "bg-purple-50 text-purple-700 dark:bg-purple-500/15 dark:text-purple-300",
    critical: true,
  },
];

export const SETTINGS_DIGEST_TABS = [
  { key: "off", label: "Off" },
  { key: "daily", label: "Daily" },
  { key: "weekly", label: "Weekly" },
];

const channels = (email: boolean, sms: boolean, whatsapp: boolean, push: boolean) => ({
  email,
  sms,
  whatsapp,
  push,
});

export const SETTINGS_DEFAULTS: SettingsForm = {
  notifications: {
    newBooking: channels(true, false, false, true),
    cancellation: channels(true, false, true, true),
    tripDelay: channels(true, true, true, true),
    lowOccupancy: channels(true, false, false, false),
    settlement: channels(true, false, false, false),
    security: channels(true, true, false, true),
  },
  quietHours: { enabled: true, from: "23:00", to: "06:00" },
  digest: "daily",
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
  { key: "identity", label: "General Profile", icon: "ph:buildings-bold" },
  {
    key: "branding",
    label: "Public Branding",
    icon: "ph:palette-bold",
    badge: "Public Cards",
  },
  {
    key: "payments",
    label: "Payment & Invoicing",
    icon: "ph:credit-card-bold",
    badge: "3 Rails",
    badgeClass:
      "bg-teal-50 text-teal-700 border border-teal-200/50 dark:bg-teal-500/15 dark:text-teal-300 dark:border-teal-500/25",
  },
  {
    key: "notifications",
    label: "Notifications & Alerts",
    icon: "ph:bell-ringing-bold",
  },
];

/** Deep copy, so the saved snapshot never shares nested objects with the live form */
export const cloneSettings = (s: SettingsForm): SettingsForm =>
  JSON.parse(JSON.stringify(s));

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
