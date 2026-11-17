import type {
  ManifestBoardStatus,
  ManifestFilters,
  ManifestPassenger,
} from "~/types/manifest";

export function useManifest() {
  const toast = useToast();
  const route = useRoute();
  const router = useRouter();

  // ── Trip selection (deep-linkable as ?trip=NB-402) ──────
  const requested = typeof route.query.trip === "string" ? route.query.trip : "";
  const tripId = ref(
    MANIFEST_TRIPS.some((t) => t.id === requested)
      ? requested
      : MANIFEST_TRIPS[0]!.id,
  );

  const trip = computed(
    () => MANIFEST_TRIPS.find((t) => t.id === tripId.value) ?? MANIFEST_TRIPS[0]!,
  );

  function selectTrip(id: string) {
    tripId.value = id;
    router.replace({ query: { ...route.query, trip: id } });
  }

  // Boarding changes are edited in place, so keep each trip's list once built
  const manifests = reactive<Record<string, ManifestPassenger[]>>({});

  // Built when a trip is first opened (not inside the computed, which must stay side-effect free)
  watch(
    trip,
    (t) => {
      manifests[t.id] ??= manifestBuildPassengers(t);
    },
    { immediate: true },
  );

  const passengers = computed(() => manifests[trip.value.id] ?? []);

  // ── Filters ─────────────────────────────────────────────
  const filters = reactive<ManifestFilters>({ search: "", status: ALL_MANIFEST });

  const counts = computed(() => {
    const c: Record<ManifestBoardStatus, number> = {
      pending: 0,
      boarded: 0,
      "no-show": 0,
    };
    for (const p of passengers.value) c[p.status]++;
    return { all: passengers.value.length, ...c };
  });

  const filteredPassengers = computed(() => {
    const q = filters.search.toLowerCase().trim();
    return passengers.value.filter(
      (p) =>
        (filters.status === ALL_MANIFEST || p.status === filters.status) &&
        (!q ||
          [p.name, p.pnr, p.phone, p.seat].some((f) => f.toLowerCase().includes(q))),
    );
  });

  const hasActiveFilters = computed(
    () => !!filters.search || filters.status !== ALL_MANIFEST,
  );

  function resetFilters() {
    filters.search = "";
    filters.status = ALL_MANIFEST;
  }

  const stats = computed(() => ({
    booked: passengers.value.length,
    boarded: counts.value.boarded,
    boardedPercent: passengers.value.length
      ? Math.round((counts.value.boarded / passengers.value.length) * 100)
      : 0,
    noShows: counts.value["no-show"],
    pending: counts.value.pending,
    bags: passengers.value.reduce(
      (sum, p) => sum + (p.status === "no-show" ? 0 : p.luggage),
      0,
    ),
    withNotes: passengers.value.filter((p) => p.notes).length,
  }));

  // ── Selection (ids persist across pages; VTable owns the checkboxes) ──
  const selectedIds = ref<(string | number)[]>([]);

  // A new trip or filter can hide what was selected
  watch(tripId, () => {
    selectedIds.value = [];
    resetFilters();
  });
  watch(filteredPassengers, (list) => {
    const visible = new Set(list.map((p) => p.id));
    selectedIds.value = selectedIds.value.filter((id) => visible.has(String(id)));
  });

  // ── Actions ─────────────────────────────────────────────
  function setStatus(ids: (string | number)[], status: ManifestBoardStatus) {
    let changed = 0;
    for (const p of passengers.value) {
      if (ids.includes(p.id) && p.status !== status) {
        p.status = status;
        changed++;
      }
    }
    return changed;
  }

  function markSelected(status: ManifestBoardStatus) {
    const changed = setStatus(selectedIds.value, status);
    selectedIds.value = [];
    toast.success(`${changed} passenger${changed === 1 ? "" : "s"} marked ${MANIFEST_STATUS_LABELS[status].toLowerCase()}`);
  }

  function markOne(p: ManifestPassenger, status: ManifestBoardStatus) {
    p.status = status;
    toast.info(`${p.name} (${p.seat}) marked ${MANIFEST_STATUS_LABELS[status].toLowerCase()}`);
  }

  function printManifest() {
    toast.info("Preparing boarding manifest...");
    if (import.meta.client) setTimeout(() => window.print(), 300);
  }

  function exportCsv() {
    const source = selectedIds.value.length
      ? filteredPassengers.value.filter((p) => selectedIds.value.includes(p.id))
      : filteredPassengers.value;

    const headers = ["Seat", "Passenger", "PNR", "Phone", "Status", "Bags", "Notes"];
    // Quote every cell: names and notes may contain commas
    const cell = (v: string | number) => `"${String(v).replace(/"/g, '""')}"`;
    const rows = source.map((p) => [
      p.seat,
      p.name,
      p.pnr,
      p.phone,
      MANIFEST_STATUS_LABELS[p.status],
      p.luggage,
      p.notes,
    ]);

    const csv =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((r) => r.map(cell).join(",")).join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csv));
    link.setAttribute("download", `manifest_${trip.value.id}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`${source.length} passengers exported`);
  }

  return {
    trip,
    selectTrip,
    filters,
    counts,
    filteredPassengers,
    hasActiveFilters,
    resetFilters,
    stats,
    selectedIds,
    markSelected,
    markOne,
    printManifest,
    exportCsv,
  };
}
