import type { RevenueAlert, RevenueFilters } from "~/types/revenue";

export function useRevenue() {
  const toast = useToast();

  const filters = reactive<RevenueFilters>({
    period: "28D",
    dateRange: REVENUE_DATE_RANGES[0]!,
    corridor: ALL_REVENUE_CORRIDORS,
  });

  const trips = ref(revenueBuildTrips());
  const heatmap = revenueBuildHeatmap();

  const filteredTrips = computed(() =>
    filters.corridor === ALL_REVENUE_CORRIDORS
      ? trips.value
      : trips.value.filter((t) => t.corridor === filters.corridor),
  );

  const totals = computed(() => {
    const list = filteredTrips.value;
    const revenue = list.reduce((s, t) => s + t.revenue, 0);
    const seats = list.reduce((s, t) => s + t.occupied, 0);
    const capacity = list.reduce((s, t) => s + t.capacity, 0);
    const seatKm = list.reduce((s, t) => s + t.capacity * t.km, 0);
    return {
      revenue,
      seats,
      capacity,
      trips: list.length,
      occupancy: capacity ? Math.round((seats / capacity) * 1000) / 10 : 0,
      avgFare: seats ? Math.round((revenue / seats) * 10) / 10 : 0,
      yieldPerSeatKm: seatKm ? Math.round((revenue / seatKm) * 100) / 100 : 0,
      belowTarget: list.filter((t) => t.loadFactor < REVENUE_OCCUPANCY_TARGET).length,
    };
  });

  /** Corridors whose average load sits under the target, worst first */
  const alerts = computed<RevenueAlert[]>(() => {
    const byCorridor = new Map<string, { seats: number; capacity: number; trips: number }>();
    for (const t of trips.value) {
      const c = byCorridor.get(t.corridor) ?? { seats: 0, capacity: 0, trips: 0 };
      c.seats += t.occupied;
      c.capacity += t.capacity;
      c.trips++;
      byCorridor.set(t.corridor, c);
    }
    return [...byCorridor.entries()]
      .map(([corridor, c]) => ({
        corridor,
        trips: c.trips,
        occupancy: Math.round((c.seats / c.capacity) * 1000) / 10,
      }))
      .filter((c) => c.occupancy < REVENUE_OCCUPANCY_TARGET)
      .sort((a, b) => a.occupancy - b.occupancy)
      .map((c, i): RevenueAlert => ({
        id: `alert-${i}`,
        ...c,
        severity: c.occupancy < REVENUE_OCCUPANCY_TARGET - 10 ? "critical" : "warning",
        suggestion:
          c.occupancy < REVENUE_OCCUPANCY_TARGET - 10
            ? "Apply an off-peak discount or merge departures"
            : "Review dynamic pricing for low-demand slots",
      }));
  });

  const peak = computed(() =>
    heatmap.reduce((best, cell) => (cell.value > best.value ? cell : best)),
  );

  function exportCsv() {
    const headers = [
      "Trip",
      "Corridor",
      "Departure",
      "Vehicle",
      "Seats sold",
      "Capacity",
      "Load %",
      "Yield EGP/seat-km",
      "Revenue EGP",
      "Delta vs target (pts)",
    ];
    // Quote every cell: corridor names contain commas and arrows
    const cell = (v: string | number) => `"${String(v).replace(/"/g, '""')}"`;
    const rows = filteredTrips.value.map((t) => [
      t.id,
      t.corridor,
      t.departTime,
      t.vehicle,
      t.occupied,
      t.capacity,
      t.loadFactor,
      t.yieldPerSeatKm,
      t.revenue,
      t.delta,
    ]);
    const csv =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((r) => r.map(cell).join(",")).join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csv));
    link.setAttribute(
      "download",
      `revenue_occupancy_${new Date().toISOString().slice(0, 10)}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`${rows.length} trips exported`);
  }

  return { filters, filteredTrips, totals, heatmap, peak, alerts, exportCsv };
}
