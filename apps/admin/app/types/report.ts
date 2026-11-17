export interface ReportFilters {
  /** "7D" | "28D" | "Month" | "Q3" */
  period: string;
  dateRange: string;
  corridor: string;
}

export interface ReportKpi {
  label: string;
  value: string;
  unit?: string;
  /** Percent change vs the previous period */
  delta: number;
  icon: string;
  iconBg: string;
  iconColor: string;
  footLeft: string;
  footRight: string;
  footRightClass?: string;
}

export type CorridorMetric = "revenue" | "pax";

export interface CorridorRevenue {
  id: number;
  name: string;
  trips: number;
  occupancy: number;
  /** Gross revenue in EGP */
  revenue: number;
  /** Passenger count */
  pax: number;
  /** Tailwind bg class for the dot and bar */
  color: string;
}

export interface PaymentRail {
  label: string;
  /** Share of all bookings, in percent */
  share: number;
  transactions: number;
  /** Hex colour used by the donut segment and legend swatch */
  color: string;
}

export interface OccupancyRank {
  rank: number;
  route: string;
  trips: number;
  fleet: string;
  occupancy: number;
  /** Signed percent, e.g. "+2.4%" */
  trend: string;
}
