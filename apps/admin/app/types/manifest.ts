export type ManifestBoardStatus = "pending" | "boarded" | "no-show";

/** Where the trip is in its lifecycle, which drives how much of the manifest is already boarded */
export type ManifestTripPhase = "upcoming" | "boarding" | "departed";

export interface ManifestPassenger {
  /** Unique within the trip, e.g. "14A" */
  id: string;
  seat: string;
  name: string;
  /** PNR reference, e.g. "#OT-98421" */
  pnr: string;
  phone: string;
  status: ManifestBoardStatus;
  /** Checked bags */
  luggage: number;
  notes: string;
}

export interface ManifestTrip {
  id: string;
  origin: string;
  destination: string;
  departDay: string;
  departTime: string;
  gate: string;
  vehicle: string;
  plate: string;
  driver: string;
  capacity: number;
  /** Seats sold on this trip */
  booked: number;
  phase: ManifestTripPhase;
}

export interface ManifestFilters {
  search: string;
  /** "all" or a ManifestBoardStatus */
  status: string;
}
