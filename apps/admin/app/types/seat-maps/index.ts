export interface SeatCell {
  type:
    | "vip"
    | "single-vip"
    | "accessible"
    | "aisle"
    | "crew"
    | "wc"
    | "door"
    | "empty";
  label: string;
  sub: string;
}

export interface LayoutTemplate {
  id: string;
  name: string;
  code: string;
  tag: string;
  tagClass: string;
  chassis: string;
  gridSpec: string;
  capacity: number;
  busesAssigned: number;
  rows: number;
  cols: number;
  leftSeats: number;
  rightSeats: number;
  amenities: string[];
}
