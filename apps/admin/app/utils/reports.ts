// Constants for the reports page (auto-imported)
import type {
  CorridorRevenue,
  OccupancyRank,
  PaymentRail,
  ReportKpi,
} from "~/types/report";

export const REPORT_PERIOD_TABS = [
  { key: "7D", label: "7D" },
  { key: "28D", label: "28D" },
  { key: "Month", label: "Month" },
  { key: "Q3", label: "Q3" },
];

export const REPORT_DATE_RANGES = [
  "Oct 01 – Oct 28, 2024",
  "Last 7 Days",
  "Month to Date (Oct 2024)",
  "Q3 2024",
];

export const ALL_REPORT_CORRIDORS = "All 14 Corridors";

export const REPORT_CORRIDOR_OPTIONS = [
  ALL_REPORT_CORRIDORS,
  "Cairo ⇄ Alexandria",
  "Cairo ⇄ Hurghada",
  "Cairo ⇄ Sharm El Sheikh",
  "Cairo ⇄ Dahab",
  "Cairo ⇄ Luxor",
];

export const CORRIDOR_METRIC_TABS = [
  { key: "revenue", label: "GMV (EGP)" },
  { key: "pax", label: "Pax Count" },
];

export const VOLUME_VIEW_TABS = [
  { key: "daily", label: "Daily" },
  { key: "rolling", label: "7D Rolling" },
  { key: "monthly", label: "Monthly" },
];

// ── Mock data until the analytics endpoints exist ──────────────

export const REPORT_KPIS: ReportKpi[] = [
  {
    label: "Gross Ticket Revenue (GMV)",
    value: "3,842,950",
    unit: "EGP",
    delta: 14.8,
    icon: "ph:money-wavy-bold",
    iconBg: "bg-teal-500/10",
    iconColor: "text-teal-600",
    footLeft: "Avg fare: 218.40 EGP",
    footRight: "vs Prev 28D",
  },
  {
    label: "Total Passenger Bookings",
    value: "17,596",
    unit: "tickets",
    delta: 9.2,
    icon: "ph:ticket-bold",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-500",
    footLeft: "88.4% online / 11.6% POS",
    footRight: "Healthy Split",
    footRightClass: "text-emerald-500 font-semibold",
  },
  {
    label: "Network Avg Occupancy",
    value: "86.4%",
    unit: "Load",
    delta: 3.6,
    icon: "ph:chart-bar-horizontal-bold",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-600",
    footLeft: "Peak: Cairo-Alex (94.2%)",
    footRight: "Cap: 90.0% Target",
  },
  {
    label: "Yield Per Kilometer (RPKM)",
    value: "1.42",
    unit: "EGP/km",
    delta: 5.1,
    icon: "ph:trend-up-bold",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-500",
    footLeft: "Fleet Active: 91.2%",
    footRight: "54 Coaches",
  },
];

export const CORRIDOR_REVENUE: CorridorRevenue[] = [
  {
    id: 1,
    name: "Cairo (Almaza) ⇄ Alexandria (Sidi Gaber)",
    trips: 42,
    occupancy: 94.2,
    revenue: 1248500,
    pax: 5720,
    color: "bg-emerald-500",
  },
  {
    id: 2,
    name: "Cairo (Tahrir) ⇄ Hurghada (El Dahar)",
    trips: 18,
    occupancy: 89.1,
    revenue: 894200,
    pax: 2480,
    color: "bg-teal-500",
  },
  {
    id: 3,
    name: "Cairo (Almaza) ⇄ Sharm El Sheikh",
    trips: 14,
    occupancy: 85.6,
    revenue: 742800,
    pax: 1810,
    color: "bg-cyan-500",
  },
  {
    id: 4,
    name: "Cairo ⇄ Dahab Express",
    trips: 8,
    occupancy: 82.3,
    revenue: 412600,
    pax: 1120,
    color: "bg-amber-500",
  },
  {
    id: 5,
    name: "Alexandria ⇄ Cairo (Tahrir)",
    trips: 12,
    occupancy: 79.5,
    revenue: 315400,
    pax: 1930,
    color: "bg-indigo-500",
  },
  {
    id: 6,
    name: "Cairo ⇄ Luxor Overnight",
    trips: 4,
    occupancy: 96.0,
    revenue: 229450,
    pax: 470,
    color: "bg-rose-500",
  },
];

export const PAYMENT_RAILS: PaymentRail[] = [
  { label: "Fawry Pay & Kiosk", share: 44.5, transactions: 7830, color: "#00A884" },
  { label: "Meeza National Card", share: 26.2, transactions: 4610, color: "#2DD4BF" },
  { label: "Vodafone / Wallets", share: 17.8, transactions: 3132, color: "#F59E0B" },
  { label: "Almaza Station Cash", share: 8.5, transactions: 1496, color: "#64748B" },
  { label: "Intl Cards (Visa/MC)", share: 3.0, transactions: 528, color: "#6366F1" },
];

export const OCCUPANCY_RANKING: OccupancyRank[] = [
  { rank: 1, route: "Cairo ⇄ Luxor Overnight", trips: 4, fleet: "VIP Sleeper", occupancy: 96.0, trend: "+2.4%" },
  { rank: 2, route: "Cairo ⇄ Alex (Sidi Gaber)", trips: 42, fleet: "MCV 600", occupancy: 94.2, trend: "+4.1%" },
  { rank: 3, route: "Cairo ⇄ Hurghada", trips: 18, fleet: "MAN Lion", occupancy: 89.1, trend: "+1.8%" },
  { rank: 4, route: "Cairo ⇄ Sharm El Sheikh", trips: 14, fleet: "Travego", occupancy: 85.6, trend: "-0.5%" },
  { rank: 5, route: "Cairo ⇄ Dahab", trips: 8, fleet: "Super Jet", occupancy: 82.3, trend: "+0.9%" },
  { rank: 6, route: "Cairo ⇄ Mansoura Direct", trips: 10, fleet: "Daewoo", occupancy: 71.4, trend: "-3.2%" },
];

/** Occupancy below this is flagged as under target */
export const OCCUPANCY_TARGET = 80;
