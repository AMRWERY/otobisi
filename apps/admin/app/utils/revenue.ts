// Constants + mock data for the revenue & occupancy page (auto-imported)
import type { RevenueHeatCell, RevenueTrip } from "~/types/revenue";

export const REVENUE_PERIOD_TABS = [
  { key: "7D", label: "7D" },
  { key: "28D", label: "28D" },
  { key: "Month", label: "Month" },
  { key: "Q3", label: "Q3" },
];

export const REVENUE_DATE_RANGES = [
  "Oct 01 – Oct 28, 2024",
  "Last 7 Days",
  "Month to Date (Oct 2024)",
  "Q3 2024",
];

export const ALL_REVENUE_CORRIDORS = "All Corridors";

export const REVENUE_PER_PAGE_OPTIONS = [8, 16, 24, 48];

/** Occupancy below this is flagged as under target */
export const REVENUE_OCCUPANCY_TARGET = 85;

const REVENUE_ROUTES = [
  { name: "Cairo → Alexandria", km: 220, fare: 220, capacity: 48, vehicle: "MCV 600 VIP" },
  { name: "Cairo → Hurghada", km: 460, fare: 360, capacity: 48, vehicle: "MAN Lion's Coach" },
  { name: "Cairo → Sharm El Sheikh", km: 500, fare: 410, capacity: 44, vehicle: "Mercedes Travego VIP" },
  { name: "Cairo → Dahab", km: 540, fare: 430, capacity: 36, vehicle: "SuperJet Business" },
  { name: "Cairo → Luxor", km: 650, fare: 480, capacity: 30, vehicle: "Sleeper Coach VIP" },
  { name: "Alexandria → Cairo", km: 220, fare: 175, capacity: 48, vehicle: "MCV 400 Eco" },
  { name: "Cairo → Mansoura", km: 130, fare: 125, capacity: 48, vehicle: "Daewoo Royal City" },
];

export const REVENUE_CORRIDORS = [
  ALL_REVENUE_CORRIDORS,
  ...REVENUE_ROUTES.map((r) => r.name),
];

/** Small deterministic generator, so the mock data is identical on server and client */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

export function revenueBuildTrips(): RevenueTrip[] {
  const rand = seeded(402);
  const trips: RevenueTrip[] = [];
  let n = 0;
  for (const route of REVENUE_ROUTES) {
    for (let slot = 0; slot < 6; slot++) {
      const occupied = Math.min(
        route.capacity,
        Math.round(route.capacity * (0.62 + rand() * 0.38)),
      );
      const loadFactor = Math.round((occupied / route.capacity) * 1000) / 10;
      const revenue = occupied * route.fare;
      trips.push({
        id: `#TR-${4100 + n}`,
        corridor: route.name,
        departTime: `${String(6 + slot * 3).padStart(2, "0")}:${slot % 2 ? "30" : "00"}`,
        vehicle: route.vehicle,
        capacity: route.capacity,
        occupied,
        revenue,
        km: route.km,
        loadFactor,
        yieldPerSeatKm:
          Math.round((revenue / (route.capacity * route.km)) * 100) / 100,
        delta: Math.round((loadFactor - REVENUE_OCCUPANCY_TARGET) * 10) / 10,
      });
      n++;
    }
  }
  return trips;
}

// ── Heatmap: day of week × departure hour, seat load in percent ──────
export const REVENUE_HEAT_DAYS = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];
export const REVENUE_HEAT_HOURS = [6, 8, 10, 12, 14, 16, 18, 20];

export function revenueBuildHeatmap(): RevenueHeatCell[] {
  const rand = seeded(88);
  const cells: RevenueHeatCell[] = [];
  REVENUE_HEAT_DAYS.forEach((day, d) => {
    REVENUE_HEAT_HOURS.forEach((hour) => {
      // Evening peaks, a Thursday/Friday weekend uplift, noise on top
      const evening = hour >= 16 && hour <= 20 ? 22 : hour >= 8 && hour <= 10 ? 10 : 0;
      const weekend = d >= 5 ? 12 : 0;
      const value = Math.min(99, Math.round(52 + evening + weekend + rand() * 22));
      cells.push({ day, hour, value });
    });
  });
  return cells;
}

/** Five-step intensity ramp; the text colour flips once the fill gets dark enough */
export const REVENUE_HEAT_STEPS = [
  { max: 60, cell: "bg-teal-500/10 text-text-muted", label: "< 60%" },
  { max: 70, cell: "bg-teal-500/25 text-text-secondary", label: "60–70%" },
  { max: 80, cell: "bg-teal-500/45 text-text-primary", label: "70–80%" },
  { max: 90, cell: "bg-teal-500/70 text-white", label: "80–90%" },
  { max: 101, cell: "bg-teal-600 text-white", label: "90%+" },
];

export function revenueHeatClass(value: number): string {
  return (
    REVENUE_HEAT_STEPS.find((step) => value < step.max)?.cell ??
    REVENUE_HEAT_STEPS[REVENUE_HEAT_STEPS.length - 1]!.cell
  );
}

export const REVENUE_VELOCITY_SERIES = [
  92, 96, 90, 104, 110, 108, 121, 118, 126, 161, 140, 133, 138, 148,
];
export const REVENUE_OCCUPANCY_SERIES = [
  78, 80, 79, 83, 85, 84, 88, 87, 89, 92, 88, 86, 87, 86.4,
];

export const revenueFormatEgp = (v: number) =>
  v.toLocaleString("en-US", { maximumFractionDigits: 0 });
