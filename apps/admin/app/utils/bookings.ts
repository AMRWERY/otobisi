// Constants + pure helpers for the bookings page (auto-imported)
import type { BookingStatus, PaymentGateway } from "~/types/booking";

export const ALL_BOOKING_CORRIDORS = "All Corridors";
export const ALL_BOOKING_CLASSES = "All Classes";

export const BOOKING_DATE_RANGES = [
  "Oct 24, 2024 - Oct 26, 2024",
  "Today, Oct 24, 2024",
  "Last 7 Days",
  "Month to Date (Oct 2024)",
];

export const BOOKING_CORRIDORS = [
  ALL_BOOKING_CORRIDORS,
  "Cairo → Alex",
  "Cairo → Hurghada",
  "Cairo → Sharm El Sheikh",
  "Alex → Cairo",
  "Cairo → Dahab",
  "Cairo → Mansoura",
  "Cairo → Luxor",
  "Cairo → Port Said",
];

export const BOOKING_CLASSES = [
  ALL_BOOKING_CLASSES,
  "VIP 2+1",
  "Business 2+2",
  "Standard 2+2",
  "Sleeper",
];

export const PER_PAGE_OPTIONS = [8, 16, 24, 48];

export const GATEWAY_ICONS: Record<PaymentGateway, string> = {
  Fawry: "ph:receipt-bold",
  "Meeza Card": "ph:credit-card-bold",
  "Vodafone Cash": "ph:device-mobile-bold",
  "Station Cash": "ph:storefront-bold",
};

export const STATUS_LABELS: Record<BookingStatus, string> = {
  confirmed: "Confirmed",
  completed: "Completed",
  cancelled: "Cancelled",
  "no-show": "No-show",
};

/** Egyptian VAT (Law 67/2016) is included in the displayed fare */
export const VAT_RATE = 0.14;

export function formatEgp(value: number): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/** Splits a VAT-inclusive total into base fare + VAT, rounded to piasters */
export function splitFare(total: number) {
  const base = Math.round((total / (1 + VAT_RATE)) * 100) / 100;
  const vat = Math.round((total - base) * 100) / 100;
  return { base, vat };
}

/** "29004150102345" → "…2345" */
export function maskNationalId(id: string): string {
  return `…${id.slice(-4)}`;
}

/** Splits "14A" / "S01" into its row number and column letter(s) */
export function parseSeat(seat: string) {
  const match = /^([A-Za-z]*)(\d+)([A-Za-z]*)$/.exec(seat);
  return {
    row: match ? Number(match[2]) : 0,
    col: match?.[3]?.toUpperCase() ?? "",
  };
}
