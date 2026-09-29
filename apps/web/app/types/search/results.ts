export interface Amenity {
  id: string;
  name: string;
  icon: string;
  iconClass?: string;
}

export interface TripBadge {
  text: string;
  variant: "emerald" | "amber" | "blue" | "purple" | "default";
}

export interface Trip {
  id: string;
  operatorId: string;
  operatorName: string;
  operatorAbbr: string;
  operatorLogoBg?: string;
  busClass: string;
  busModel: string;
  rating: number;
  reviewsCount: number;
  departureTime: string;
  departureStation: string;
  departureCity: string;
  arrivalTime: string;
  arrivalStation: string;
  arrivalCity: string;
  duration: string;
  routeType: string;
  routeHighlight?: string;
  highwayBadge?: string;
  amenities: Amenity[];
  price: number;
  originalPrice?: number;
  availableSeats: number;
  isDirect: boolean;
  isVerified?: boolean;
  timeSlot: "morning" | "afternoon" | "evening" | "night";
  classType: "vip" | "standard" | "sleeper";
  badges?: TripBadge[];
}

export interface FilterState {
  operators: string[];
  timeSlots: ("morning" | "afternoon" | "evening" | "night")[];
  busClasses: ("vip" | "standard" | "sleeper")[];
  maxPrice: number;
  boardingStations: string[];
  dropoffStations: string[];
  sortBy: "recommended" | "cheapest" | "earliest" | "fastest";
}

export interface DateFareItem {
  date: string; // YYYY-MM-DD
  dayLabel: string;
  fare: number;
  isToday?: boolean;
}
