export interface TableColumn {
  /** Row field to read; also the slot suffix (`cell-<key>` / `header-<key>`) */
  key: string;
  label: string;
  /** Extra classes for this column's <th> */
  headerClass?: string;
  /** Extra classes for this column's <td> cells */
  cellClass?: string;
  /** Shows a sort control in the header (the parent does the sorting) */
  sortable?: boolean;
  /** Text alignment for header and cells; numbers and money belong at "end" */
  align?: "start" | "center" | "end";
  /** Monospaced, fixed-width digits for codes and figures */
  mono?: boolean;
}

export type TableSortDir = "asc" | "desc";

export interface TableSort {
  key: string;
  dir: TableSortDir;
}

export type TableRowKey = string | number;
