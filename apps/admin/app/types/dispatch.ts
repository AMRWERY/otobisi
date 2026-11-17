export type DispatchStatus = "on-time" | "delayed" | "boarding";

export type DispatchCityKey =
  | "cairo"
  | "alexandria"
  | "mansoura"
  | "hurghada"
  | "sharm"
  | "asyut"
  | "luxor";

export type DispatchCorridorKey =
  | "cai-alx"
  | "cai-mns"
  | "cai-hrg"
  | "cai-ssh"
  | "cai-lxr";

export interface DispatchCity {
  name: string;
  /** Map coordinates in the 400 × 420 viewBox */
  x: number;
  y: number;
  /** Where the label sits relative to the node */
  labelSide: "start" | "end";
  /** Terminals get a larger node */
  hub?: boolean;
}

export interface DispatchCorridor {
  label: string;
  /** Ordered cities the route passes through; trips travel along this polyline */
  path: DispatchCityKey[];
  /** Total distance in km, used for the detail card */
  km: number;
}

export interface DispatchTrip {
  id: string;
  corridor: DispatchCorridorKey;
  /** 0 = at the origin terminal, 1 = arrived */
  progress: number;
  status: DispatchStatus;
  /** Minutes behind schedule (0 when on time) */
  delayMin: number;
  /** Current speed in km/h (0 while boarding) */
  speed: number;
  occupied: number;
  capacity: number;
  /** Scheduled departure, "HH:mm" */
  departTime: string;
  /** Scheduled journey length in minutes */
  durationMin: number;
  driver: string;
  driverPhone: string;
  vehicle: string;
  plate: string;
}

export interface DispatchFilters {
  /** "all" or a DispatchCorridorKey */
  corridor: string;
  /** "all" or a DispatchStatus */
  status: string;
}
