export interface PaginationProps {
  /** Current page (1-based) — use with v-model */
  modelValue: number;
  /** Total number of items across all pages */
  total: number;
  /** Rows per page — use with v-model:page-size when `pageSizeOptions` is set */
  pageSize?: number;
  /** Shows a "Rows per page" picker with these choices */
  pageSizeOptions?: number[];
  /** Page buttons shown on each side of the current page */
  siblingCount?: number;
  size?: "xs" | "sm" | "md";
  /** Classes for the current-page button; without them it uses the brand primary style */
  activeClass?: string;
  /** Show the "Showing x–y of total" text (overridable via the `summary` slot) */
  showSummary?: boolean;
  /** Noun used in the default summary, e.g. "bookings" */
  itemLabel?: string;
  previousLabel?: string;
  nextLabel?: string;
  ariaLabel?: string;
}
