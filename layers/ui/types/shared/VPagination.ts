export interface PaginationProps {
  /** Current page (1-based) — use with v-model */
  modelValue: number;
  /** Total number of items across all pages */
  total: number;
  pageSize?: number;
  /** Page buttons shown on each side of the current page */
  siblingCount?: number;
  size?: "xs" | "sm" | "md";
  /** Show the "Showing x–y of total" text (overridable via the `summary` slot) */
  showSummary?: boolean;
  /** Noun used in the default summary, e.g. "bookings" */
  itemLabel?: string;
  previousLabel?: string;
  nextLabel?: string;
  ariaLabel?: string;
}
