// Constants + pure helpers for the live dispatch page (auto-imported)
import type {
  DispatchCityKey,
  DispatchCorridor,
  DispatchCorridorKey,
  DispatchCity,
  DispatchStatus,
  DispatchTrip,
} from "~/types/dispatch";

export const ALL_DISPATCH = "all";

export const DISPATCH_STATUS_LABELS: Record<DispatchStatus, string> = {
  "on-time": "On Time",
  delayed: "Delayed",
  boarding: "Boarding",
};

// Same semantic palette as the other status pills
export const DISPATCH_STATUS_TONES: Record<
  DispatchStatus,
  { pill: string; dot: string; marker: string }
> = {
  "on-time": {
    pill: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-400 dark:border-emerald-500/25",
    dot: "bg-emerald-500",
    marker: "#10b981",
  },
  delayed: {
    pill: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-500/15 dark:text-rose-400 dark:border-rose-500/25",
    dot: "bg-rose-500",
    marker: "#f43f5e",
  },
  boarding: {
    pill: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/15 dark:text-amber-400 dark:border-amber-500/25",
    dot: "bg-amber-500",
    marker: "#f59e0b",
  },
};

/** Stylised map: coordinates are in the 400 × 420 viewBox, not real lat/long */
export const DISPATCH_CITIES: Record<DispatchCityKey, DispatchCity> = {
  alexandria: { name: "Alexandria", x: 105, y: 58, labelSide: "start", hub: true },
  mansoura: { name: "Mansoura", x: 222, y: 76, labelSide: "end" },
  cairo: { name: "Cairo", x: 190, y: 128, labelSide: "start", hub: true },
  sharm: { name: "Sharm El Sheikh", x: 318, y: 178, labelSide: "start", hub: true },
  hurghada: { name: "Hurghada", x: 282, y: 238, labelSide: "end", hub: true },
  asyut: { name: "Asyut", x: 178, y: 262, labelSide: "start" },
  luxor: { name: "Luxor", x: 214, y: 342, labelSide: "start", hub: true },
};

export const DISPATCH_CORRIDORS: Record<DispatchCorridorKey, DispatchCorridor> = {
  "cai-alx": { label: "Cairo ⇄ Alexandria", path: ["cairo", "alexandria"], km: 220 },
  "cai-mns": { label: "Cairo ⇄ Mansoura", path: ["cairo", "mansoura"], km: 130 },
  "cai-hrg": { label: "Cairo ⇄ Hurghada", path: ["cairo", "hurghada"], km: 450 },
  "cai-ssh": { label: "Cairo ⇄ Sharm El Sheikh", path: ["cairo", "sharm"], km: 500 },
  "cai-lxr": { label: "Cairo ⇄ Luxor", path: ["cairo", "asyut", "luxor"], km: 670 },
};

export const DISPATCH_CORRIDOR_KEYS = Object.keys(
  DISPATCH_CORRIDORS,
) as DispatchCorridorKey[];

/** Stylised Egypt outline and the Nile with its delta, drawn behind the routes */
export const DISPATCH_OUTLINE_PATH =
  "M30 36 L268 36 L330 68 L362 150 L342 206 L304 184 L292 232 L330 292 L352 340 L352 396 L30 396 Z";
export const DISPATCH_NILE_PATH =
  "M190 128 C186 180 174 222 178 262 S205 312 214 342 S228 380 232 396 M190 128 L150 84 L105 58 M190 128 L222 76";

/** Position of a trip on the map, interpolated along its corridor polyline */
export function dispatchPosition(trip: DispatchTrip) {
  const points = DISPATCH_CORRIDORS[trip.corridor].path.map(
    (key) => DISPATCH_CITIES[key],
  );
  const lengths = points.slice(1).map((p, i) =>
    Math.hypot(p.x - points[i]!.x, p.y - points[i]!.y),
  );
  const total = lengths.reduce((a, b) => a + b, 0);
  let remaining = Math.min(Math.max(trip.progress, 0), 1) * total;

  for (let i = 0; i < lengths.length; i++) {
    const len = lengths[i]!;
    if (remaining <= len || i === lengths.length - 1) {
      const t = len ? remaining / len : 0;
      const a = points[i]!;
      const b = points[i + 1]!;
      return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
    }
    remaining -= len;
  }
  return { x: points[0]!.x, y: points[0]!.y };
}

/** "07:00" + 150 min + 25 min delay → "09:55" */
export function dispatchEta(trip: DispatchTrip): string {
  const [h = 0, m = 0] = trip.departTime.split(":").map(Number);
  const total = (h * 60 + m + trip.durationMin + trip.delayMin) % (24 * 60);
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

/** Minutes of driving left, including any delay already accrued */
export function dispatchMinutesLeft(trip: DispatchTrip): number {
  return Math.round(trip.durationMin * (1 - trip.progress)) + trip.delayMin;
}

export function dispatchDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h ? `${h}h ${String(m).padStart(2, "0")}m` : `${m}m`;
}

export const dispatchOccupancyPercent = (t: DispatchTrip) =>
  Math.round((t.occupied / t.capacity) * 100);

type Seed = Pick<
  DispatchTrip,
  "id" | "corridor" | "progress" | "status" | "occupied" | "capacity" | "departTime" | "durationMin" | "driver" | "vehicle" | "plate"
> &
  Partial<DispatchTrip>;

const dispatchTripFrom = (s: Seed, n: number): DispatchTrip => ({
  delayMin: 0,
  speed: s.status === "boarding" ? 0 : 84 + (n % 5) * 4,
  driverPhone: `+20 10${n % 10} ${200 + n * 7} ${3000 + n * 91}`,
  ...s,
});

export const DISPATCH_MOCK_TRIPS = (): DispatchTrip[] =>
  [
    { id: "NB-402", corridor: "cai-alx", progress: 0.58, status: "on-time", occupied: 46, capacity: 49, departTime: "07:00", durationMin: 150, driver: "Capt. Ahmed Mostafa", vehicle: "MCV 600 VIP", plate: "DX-8821" },
    { id: "NB-408", corridor: "cai-alx", progress: 0.32, status: "delayed", delayMin: 25, speed: 61, occupied: 38, capacity: 49, departTime: "07:45", durationMin: 150, driver: "Capt. Hany Adel", vehicle: "MAN Lion's Coach", plate: "AX-3310" },
    { id: "NB-445", corridor: "cai-alx", progress: 0, status: "boarding", occupied: 12, capacity: 49, departTime: "15:30", durationMin: 150, driver: "Capt. Karim Badawi", vehicle: "MCV 400 Eco", plate: "AX-4410" },
    { id: "NB-412", corridor: "cai-hrg", progress: 0.71, status: "on-time", occupied: 44, capacity: 48, departTime: "05:30", durationMin: 345, driver: "Capt. Mahmoud El-Sayed", vehicle: "MAN Lion's Coach", plate: "HR-1844" },
    { id: "NB-415", corridor: "cai-hrg", progress: 0, status: "boarding", occupied: 27, capacity: 48, departTime: "15:45", durationMin: 345, driver: "Capt. Tarek Salem", vehicle: "Mercedes Travego VIP", plate: "HR-2210" },
    { id: "NB-420", corridor: "cai-ssh", progress: 0.46, status: "on-time", occupied: 39, capacity: 44, departTime: "06:15", durationMin: 390, driver: "Capt. Youssef Fekri", vehicle: "Mercedes Travego VIP", plate: "SS-9012" },
    { id: "NB-423", corridor: "cai-ssh", progress: 0.83, status: "delayed", delayMin: 40, speed: 58, occupied: 41, capacity: 44, departTime: "03:30", durationMin: 390, driver: "Capt. Hesham Zaki", vehicle: "SuperJet Business", plate: "SS-7740" },
    { id: "NB-430", corridor: "cai-lxr", progress: 0.38, status: "on-time", occupied: 28, capacity: 30, departTime: "21:00", durationMin: 570, driver: "Capt. Ali Darwish", vehicle: "Sleeper Coach VIP", plate: "LX-1100" },
    { id: "NB-433", corridor: "cai-lxr", progress: 0.72, status: "on-time", occupied: 30, capacity: 30, departTime: "19:30", durationMin: 570, driver: "Capt. Omar Said", vehicle: "Sleeper Coach VIP", plate: "LX-1180" },
    { id: "NB-440", corridor: "cai-mns", progress: 0.6, status: "on-time", occupied: 35, capacity: 48, departTime: "13:00", durationMin: 135, driver: "Capt. Sherif Nabil", vehicle: "Daewoo Royal City", plate: "MN-4402" },
  ].map((s, n) => dispatchTripFrom(s as Seed, n));
