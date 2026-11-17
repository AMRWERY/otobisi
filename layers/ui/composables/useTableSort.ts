import type { TableSort } from "~/types/shared/VTable";

/**
 * Sorts rows by the active `VTable` sort. Numbers compare numerically,
 * everything else as case-insensitive text. Returns the input untouched
 * when there is no sort, so the parent's own ordering survives.
 */
export function sortRows<T extends Record<string, any>>(
  rows: T[],
  sort: TableSort | null,
  /** Maps a row to the value to sort on when it isn't simply `row[key]` */
  accessors: Record<string, (row: T) => string | number> = {},
): T[] {
  if (!sort) return rows;
  const read = (row: T) => accessors[sort.key]?.(row) ?? row[sort.key];
  const factor = sort.dir === "asc" ? 1 : -1;

  return [...rows].sort((a, b) => {
    const x = read(a);
    const y = read(b);
    if (typeof x === "number" && typeof y === "number") return (x - y) * factor;
    return (
      String(x ?? "").localeCompare(String(y ?? ""), undefined, {
        numeric: true,
        sensitivity: "base",
      }) * factor
    );
  });
}
