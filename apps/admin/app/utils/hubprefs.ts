// Constants + helpers for the hub preferences page (auto-imported)
import type {
  HubPrefsDayKey,
  HubPrefsForm,
  HubPrefsSection,
} from "~/types/hubprefs";

export const HUBPREFS_SECTIONS: HubPrefsSection[] = [
  { key: "general", label: "General", icon: "ph:buildings-bold" },
  { key: "hours", label: "Operating Hours", icon: "ph:clock-bold" },
  { key: "boarding", label: "Boarding Rules", icon: "ph:identification-badge-bold" },
  { key: "defaults", label: "New Trip Defaults", icon: "ph:sliders-horizontal-bold" },
  { key: "ticketing", label: "Ticketing", icon: "ph:ticket-bold" },
  { key: "display", label: "Display", icon: "ph:layout-bold" },
];

export const HUBPREFS_DAYS: { key: HubPrefsDayKey; label: string }[] = [
  { key: "sat", label: "Saturday" },
  { key: "sun", label: "Sunday" },
  { key: "mon", label: "Monday" },
  { key: "tue", label: "Tuesday" },
  { key: "wed", label: "Wednesday" },
  { key: "thu", label: "Thursday" },
  { key: "fri", label: "Friday" },
];

const hubprefsDay = (open: boolean, from = "05:00", to = "23:30") => ({
  open,
  from,
  to,
});

export const HUBPREFS_DEFAULTS: HubPrefsForm = {
  general: {
    name: "Cairo Almaza Hub (#402)",
    timezone: "Africa/Cairo",
    currency: "EGP",
    language: "en",
    weekStart: "sat",
  },
  hours: {
    sat: hubprefsDay(true),
    sun: hubprefsDay(true),
    mon: hubprefsDay(true),
    tue: hubprefsDay(true),
    wed: hubprefsDay(true),
    thu: hubprefsDay(true, "05:00", "01:00"),
    fri: hubprefsDay(true, "06:00", "01:00"),
  },
  boarding: {
    checkInOpensMin: 90,
    gateClosesMin: 15,
    luggageLimitKg: 25,
    noShowGraceMin: 10,
  },
  tripDefaults: {
    vehicleClass: "vip",
    fareRounding: "5",
  },
  ticketing: {
    holdSeatMin: 15,
    autoCancelUnpaid: true,
    autoCancelAfterMin: 30,
  },
  display: {
    density: "comfortable",
    landingPage: "/",
  },
};

export const HUBPREFS_TIMEZONES = [
  { value: "Africa/Cairo", label: "Cairo (UTC+3)" },
  { value: "Europe/London", label: "London (UTC+0)" },
  { value: "Asia/Riyadh", label: "Riyadh (UTC+3)" },
];

export const HUBPREFS_CURRENCIES = [
  { value: "EGP", label: "Egyptian Pound (EGP)" },
  { value: "USD", label: "US Dollar (USD)" },
];

export const HUBPREFS_LANGUAGES = [
  { value: "en", label: "English" },
  { value: "ar", label: "العربية (Arabic)" },
];

export const HUBPREFS_WEEK_STARTS = [
  { value: "sat", label: "Saturday" },
  { value: "sun", label: "Sunday" },
  { value: "mon", label: "Monday" },
];

export const HUBPREFS_VEHICLE_CLASSES = [
  { value: "vip", label: "VIP 2+1" },
  { value: "business", label: "Business 2+2" },
  { value: "standard", label: "Standard 2+2" },
  { value: "sleeper", label: "Sleeper" },
];

export const HUBPREFS_FARE_ROUNDING = [
  { value: "1", label: "Nearest 1 EGP" },
  { value: "5", label: "Nearest 5 EGP" },
  { value: "10", label: "Nearest 10 EGP" },
];

export const HUBPREFS_DENSITY_TABS = [
  { key: "compact", label: "Compact" },
  { key: "comfortable", label: "Comfortable" },
];

export const HUBPREFS_LANDING_PAGES = [
  { value: "/", label: "Dashboard" },
  { value: "/trips-schedules", label: "Trips & Schedules" },
  { value: "/bookings", label: "Bookings & Tickets" },
  { value: "/dispatch", label: "Live Dispatch Map" },
];

/** Deep copy, so the saved snapshot never shares nested objects with the live form */
export const hubprefsClone = (f: HubPrefsForm): HubPrefsForm =>
  JSON.parse(JSON.stringify(f));

/** Hours an "HH:mm" window stays open; a window ending before it starts runs past midnight */
export function hubprefsOpenHours(from: string, to: string): number {
  const toMin = (t: string) => {
    const [h = 0, m = 0] = t.split(":").map(Number);
    return h * 60 + m;
  };
  let minutes = toMin(to) - toMin(from);
  if (minutes <= 0) minutes += 24 * 60;
  return Math.round((minutes / 60) * 10) / 10;
}
