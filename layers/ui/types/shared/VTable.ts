export interface TableColumn {
  /** Row field to read; also the slot suffix (`cell-<key>` / `header-<key>`) */
  key: string;
  label: string;
  /** Extra classes for this column's <th> */
  headerClass?: string;
  /** Extra classes for this column's <td> cells */
  cellClass?: string;
}
