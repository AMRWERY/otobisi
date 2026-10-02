export interface Trip {
  id: string;
  origin: string;
  originShort: string;
  destination: string;
  destinationShort: string;
  departTime: string;
  gate: string;
  estArrival: string;
  duration: string;
  vehicle: string;
  plate: string;
  capacity: number;
  occupied: number;
  occupancyRate: number;
  fare: number;
  /** true = active, false = suspended */
  status: boolean;
  overnight: boolean;
}

export interface TripFilters {
  dateRange: string;
  corridor: string;
  vehicleClass: string;
  tab: string;
  search: string;
}
