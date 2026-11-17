import type { ReportFilters } from "~/types/report";

export function useReports() {
  const toast = useToast();

  const filters = reactive<ReportFilters>({
    period: "28D",
    dateRange: REPORT_DATE_RANGES[0]!,
    corridor: ALL_REPORT_CORRIDORS,
  });

  const kpis = REPORT_KPIS;
  const corridors = CORRIDOR_REVENUE;
  const rails = PAYMENT_RAILS;
  const ranking = OCCUPANCY_RANKING;

  const totalBookings = computed(() =>
    rails.reduce((sum, r) => sum + r.transactions, 0),
  );

  const belowTargetCount = computed(
    () => ranking.filter((r) => r.occupancy < OCCUPANCY_TARGET).length,
  );

  /** Share of the top corridor in total revenue, in percent */
  const topCorridorShare = computed(() => {
    const total = corridors.reduce((sum, c) => sum + c.revenue, 0);
    const top = Math.max(...corridors.map((c) => c.revenue));
    return total ? Math.round((top / total) * 1000) / 10 : 0;
  });

  function exportCsv() {
    const headers = ["Corridor", "Trips/day", "Occupancy %", "Revenue (EGP)", "Passengers"];
    // Quote every cell: corridor names contain commas and arrows
    const cell = (v: string | number) => `"${String(v).replace(/"/g, '""')}"`;
    const rows = corridors.map((c) => [
      c.name,
      c.trips,
      c.occupancy,
      c.revenue,
      c.pax,
    ]);

    const csv =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((r) => r.map(cell).join(",")).join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csv));
    link.setAttribute(
      "download",
      `revenue_${new Date().toISOString().slice(0, 10)}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`${rows.length} corridors exported`);
  }

  function exportPdf() {
    toast.info("Preparing PDF report...");
  }

  return {
    filters,
    kpis,
    corridors,
    rails,
    ranking,
    totalBookings,
    belowTargetCount,
    topCorridorShare,
    exportCsv,
    exportPdf,
  };
}
