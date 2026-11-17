// Constants + pure helpers for the passenger manifest page (auto-imported)
import type {
  ManifestBoardStatus,
  ManifestPassenger,
  ManifestTrip,
  ManifestTripPhase,
} from "~/types/manifest";

export const ALL_MANIFEST = "all";

export const MANIFEST_PER_PAGE_OPTIONS = [10, 20, 50];

export const MANIFEST_STATUS_LABELS: Record<ManifestBoardStatus, string> = {
  pending: "Pending",
  boarded: "Boarded",
  "no-show": "No-show",
};

export const MANIFEST_STATUS_TONES: Record<
  ManifestBoardStatus,
  { pill: string; dot: string }
> = {
  pending: {
    pill: "bg-surface-1 text-text-secondary border-border dark:bg-surface-2/40",
    dot: "bg-slate-400",
  },
  boarded: {
    pill: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-400 dark:border-emerald-500/25",
    dot: "bg-emerald-500",
  },
  "no-show": {
    pill: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/15 dark:text-amber-400 dark:border-amber-500/25",
    dot: "bg-amber-500",
  },
};

export const MANIFEST_PHASE_LABELS: Record<ManifestTripPhase, string> = {
  upcoming: "Upcoming",
  boarding: "Boarding",
  departed: "Departed",
};

export const MANIFEST_PHASE_TONES: Record<ManifestTripPhase, string> = {
  upcoming:
    "bg-surface-1 text-text-secondary border-border dark:bg-surface-2/40",
  boarding:
    "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/15 dark:text-amber-400 dark:border-amber-500/25",
  departed:
    "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-500/15 dark:text-sky-400 dark:border-sky-500/25",
};

// Trip ids match the live dispatch page so "Manifest" links resolve
export const MANIFEST_TRIPS: ManifestTrip[] = [
  { id: "NB-402", origin: "Cairo (Almaza)", destination: "Alexandria (Sidi Gaber)", departDay: "Today", departTime: "07:00", gate: "Gate B-04", vehicle: "MCV 600 VIP", plate: "DX-8821", driver: "Capt. Ahmed Mostafa", capacity: 49, booked: 46, phase: "departed" },
  { id: "NB-445", origin: "Cairo (Almaza)", destination: "Alexandria (Sidi Gaber)", departDay: "Today", departTime: "15:30", gate: "Gate B-02", vehicle: "MCV 400 Eco", plate: "AX-4410", driver: "Capt. Karim Badawi", capacity: 49, booked: 31, phase: "boarding" },
  { id: "NB-415", origin: "Cairo (Tahrir)", destination: "Hurghada (El Dahar)", departDay: "Today", departTime: "15:45", gate: "Gate C-01", vehicle: "Mercedes Travego VIP", plate: "HR-2210", driver: "Capt. Tarek Salem", capacity: 48, booked: 40, phase: "boarding" },
  { id: "NB-430", origin: "Cairo (Tahrir)", destination: "Luxor", departDay: "Today", departTime: "21:00", gate: "Gate C-03", vehicle: "Sleeper Coach VIP", plate: "LX-1100", driver: "Capt. Ali Darwish", capacity: 30, booked: 28, phase: "upcoming" },
  { id: "NB-450", origin: "Cairo (Almaza)", destination: "Sharm El Sheikh", departDay: "Tomorrow", departTime: "06:15", gate: "Gate A-01", vehicle: "SuperJet Business", plate: "SS-7740", driver: "Capt. Youssef Fekri", capacity: 44, booked: 22, phase: "upcoming" },
];

const MANIFEST_NAMES = [
  "Ahmed Mansour", "Nour El-Din Mahmoud", "Mariam Youssef", "Tarek Zaki", "Salma Abdel-Rahman",
  "Omar El-Ghadban", "Khaled Badr", "Hany Mostafa", "Mona Hassan", "Karim Fathy",
  "Layla Ibrahim", "Sherif Nabil", "Dina Samir", "Yara Adel", "Mostafa Ragab",
  "Heba Soliman", "Amr Khalil", "Rana Farouk", "Walid Sedky", "Nadine Hosny",
];

const MANIFEST_NOTES: Record<number, string> = {
  3: "Wheelchair assistance",
  7: "Travelling with infant",
  11: "Extra legroom requested",
  16: "VIP — welcome pack",
};

const SEAT_COLUMNS = ["A", "B", "C", "D"];

/** Deterministic mock manifest for a trip: boarded/no-show counts follow the trip's phase */
export function manifestBuildPassengers(trip: ManifestTrip): ManifestPassenger[] {
  const seed = trip.id.split("").reduce((sum, ch) => sum + ch.charCodeAt(0), 0);

  return Array.from({ length: trip.booked }, (_, i): ManifestPassenger => {
    const row = Math.floor(i / SEAT_COLUMNS.length) + 1;
    const seat = `${String(row).padStart(2, "0")}${SEAT_COLUMNS[i % SEAT_COLUMNS.length]}`;

    let status: ManifestBoardStatus = "pending";
    if (trip.phase === "departed") status = i % 13 === 5 ? "no-show" : "boarded";
    else if (trip.phase === "boarding") status = i % 5 < 3 ? "boarded" : "pending";

    return {
      id: seat,
      seat,
      name: MANIFEST_NAMES[(i + seed) % MANIFEST_NAMES.length]!,
      pnr: `#OT-${98000 + ((seed * 7 + i * 13) % 900)}`,
      phone: `+20 10${(i + seed) % 10} ${100 + ((i * 17 + seed) % 800)} ${1000 + ((i * 131 + seed) % 8000)}`,
      status,
      luggage: i % 4 === 0 ? 0 : 1 + (i % 3 === 0 ? 1 : 0),
      notes: MANIFEST_NOTES[i % 20] ?? "",
    };
  });
}

export const manifestTripLabel = (t: ManifestTrip) =>
  `${t.id} • ${t.origin} → ${t.destination} • ${t.departDay} ${t.departTime}`;
