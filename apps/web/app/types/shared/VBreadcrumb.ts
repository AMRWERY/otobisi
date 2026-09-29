export interface BreadcrumbItem {
  /** Display text */
  label: string;
  /** Route path. Omit for non-linked intermediate crumbs. Last item is never linked. */
  to?: string;
}
