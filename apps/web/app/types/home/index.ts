export interface RouteItem {
  id: number;
  from: string;
  to: string;
  road: string;
  regionId: string;
  regionName: string;
  duration: string;
  durationMinutes: number;
  trips: string;
  dailyTripsCount: number;
  price: number;
  operators: string[];
}

export interface Corridor {
  id: string;
  code: string;
  name: string;
  distance: string;
  routesCount: number;
}
