export interface RevenueFilters {
  /** "7D" | "28D" | "Month" | "Q3" */
  period: string;
  dateRange: string;
  corridor: string;
}

export interface RevenueTrip {
  id: string;
  corridor: string;
  /** "HH:mm" */
  departTime: string;
  vehicle: string;
  capacity: number;
  occupied: number;
  /** Gross revenue in EGP */
  revenue: number;
  /** Route length in km */
  km: number;
  /** Occupied seats over capacity, in percent */
  loadFactor: number;
  /** EGP earned per available seat-km */
  yieldPerSeatKm: number;
  /** Load factor minus the occupancy target, in points */
  delta: number;
}

export interface RevenueAlert {
  id: string;
  corridor: string;
  trips: number;
  occupancy: number;
  severity: "critical" | "warning";
  suggestion: string;
}

export interface RevenueHeatCell {
  day: string;
  hour: number;
  /** Seat load in percent */
  value: number;
}
