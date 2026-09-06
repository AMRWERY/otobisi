export interface SeatItem {
  id: string;
  row: number;
  col: "A" | "B" | "C" | "D" | "E";
  price: number;
  isBooked: boolean;
  isLadies?: boolean;
}

export interface SeatRow {
  rowNumber: number;
  seatA: SeatItem;
  seatB: SeatItem;
  seatC: SeatItem;
  seatD: SeatItem;
  seatCenter?: SeatItem;
}
