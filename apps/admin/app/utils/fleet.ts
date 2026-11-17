// Constants + pure helpers for the fleet page (auto-imported)
import type {
  CoachStatus,
  CoachTemplateKey,
  NewCoachForm,
} from "~/types/fleet";

export const ALL_FLEET = "all";

export const FLEET_PER_PAGE_OPTIONS = [6, 12, 24, 48];

export const COACH_STATUS_LABELS: Record<CoachStatus, string> = {
  "in-service": "In Service",
  scheduled: "AC Scheduled",
  standby: "Depot Standby",
  maintenance: "In Maintenance",
};

// Same semantic palette as the booking status pill
export const COACH_STATUS_TONES: Record<
  CoachStatus,
  { pill: string; dot: string }
> = {
  "in-service": {
    pill: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-400 dark:border-emerald-500/25",
    dot: "bg-emerald-500",
  },
  scheduled: {
    pill: "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-500/15 dark:text-indigo-400 dark:border-indigo-500/25",
    dot: "bg-indigo-500",
  },
  standby: {
    pill: "bg-surface-1 text-text-secondary border-border dark:bg-surface-2/40",
    dot: "bg-slate-400",
  },
  maintenance: {
    pill: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/15 dark:text-amber-400 dark:border-amber-500/25",
    dot: "bg-amber-500",
  },
};

export const COACH_TEMPLATES: Record<
  CoachTemplateKey,
  { label: string; icon: string; seats: number }
> = {
  vip: { label: "VIP 2+1 Suite (32 Seats)", icon: "ph:armchair", seats: 32 },
  standard: {
    label: "Standard Express 2+2 (48 Seats)",
    icon: "ph:chair",
    seats: 48,
  },
  sleeper: {
    label: "Sleeper VIP Berth (30 Berths)",
    icon: "ph:bed",
    seats: 30,
  },
  shuttle: {
    label: "Intercity Shuttle (36 Seats)",
    icon: "ph:van",
    seats: 36,
  },
};

export const COACH_TEMPLATE_KEYS = Object.keys(
  COACH_TEMPLATES,
) as CoachTemplateKey[];

export const FLEET_CHASSIS = [
  "Mercedes-Benz OC 500 RF (Euro 6)",
  "MAN Euro 6 R07",
  "Volvo B11R 460",
  "Daewoo Doosan DE12",
];

export const FLEET_DEPOTS = [
  "Cairo Almaza Hub (Depot #01)",
  "Alexandria Moharam Bek (Depot #03)",
  "Hurghada Marine Hub (#02)",
  "Asyut Southern Yard",
];

export const FLEET_DRIVERS = [
  "Capt. Ahmed Mostafa (Grade A • Lic #39021)",
  "Capt. Hany Adel (Grade A • Score 4.7)",
  "Capt. Karim Badawi (Grade A • Score 4.9)",
];

/** Drawer status picker → the status stored on the coach */
export const NEW_COACH_STATUS_OPTIONS: {
  value: CoachStatus;
  label: string;
}[] = [
  { value: "in-service", label: "Active" },
  { value: "standby", label: "Standby" },
  { value: "maintenance", label: "In Workshop" },
];

export const emptyCoachForm = (): NewCoachForm => ({
  model: "",
  internalId: "",
  plateArabic: "",
  plateLatin: "",
  chassis: FLEET_CHASSIS[0]!,
  year: new Date().getFullYear(),
  vin: "",
  template: "vip",
  status: "in-service",
  depot: FLEET_DEPOTS[0]!,
  driver: FLEET_DRIVERS[0]!,
  odometer: "",
  firstService: "",
});

const ARABIC_DIGITS = "٠١٢٣٤٥٦٧٨٩";

/** "8821" → "٨٨٢١" */
export function toArabicDigits(value: string | number): string {
  return String(value).replace(/\d/g, (d) => ARABIC_DIGITS[Number(d)]!);
}
