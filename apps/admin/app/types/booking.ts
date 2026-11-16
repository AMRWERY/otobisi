export type BookingStatus = "confirmed" | "completed" | "cancelled" | "no-show";

export type PaymentGateway =
  | "Fawry"
  | "Meeza Card"
  | "Vodafone Cash"
  | "Station Cash";

export interface Companion {
  name: string;
  /** e.g. "Child / 8 yrs" */
  relation: string;
  seat: string;
}

export interface Booking {
  /** PNR reference, e.g. "#OT-98421" */
  id: string;
  passengerName: string;
  gender: "Male" | "Female";
  age: number;
  /** 14-digit Egyptian national ID */
  nationalId: string;
  phone: string;
  email: string;
  companions: Companion[];

  originCity: string;
  origin: string;
  destinationCity: string;
  destination: string;
  tripId: string;
  /** "Today", "Tomorrow", "Oct 25" … */
  departDay: string;
  departTime: string;
  gate: string;
  duration: string;

  vehicleClass: string;
  vehicle: string;
  plate: string;
  driver: string;

  /** Seat codes such as "14A", "S01" */
  seats: string[];
  /** Total paid in EGP, VAT included */
  fare: number;

  gateway: PaymentGateway;
  gatewayTxId: string;
  settledAt: string;
  createdAt: string;

  status: BookingStatus;
  refunded: boolean;
}

export interface BookingFilters {
  dateRange: string;
  corridor: string;
  vehicleClass: string;
  tab: string;
  search: string;
}
