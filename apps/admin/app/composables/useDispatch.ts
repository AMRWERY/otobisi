import type { DispatchFilters, DispatchStatus, DispatchTrip } from "~/types/dispatch";

export function useDispatch() {
  const toast = useToast();

  const trips = ref<DispatchTrip[]>(DISPATCH_MOCK_TRIPS());

  const filters = reactive<DispatchFilters>({
    corridor: ALL_DISPATCH,
    status: ALL_DISPATCH,
  });

  const selectedId = ref<string | null>(trips.value[0]?.id ?? null);

  // ── Live tracking ───────────────────────────────────────
  const isLive = ref(true);
  const lastUpdated = ref(new Date());

  /** Moves every rolling bus a little further along its corridor (placeholder for real telemetry) */
  function tick() {
    for (const t of trips.value) {
      if (t.status === "boarding" || t.progress >= 1) continue;
      // km/h → share of the corridor covered in the 2s tick, sped up so movement is visible
      const km = DISPATCH_CORRIDORS[t.corridor].km;
      t.progress = Math.min(1, t.progress + ((t.speed / 3600) * 2 * 40) / km);
    }
    lastUpdated.value = new Date();
  }

  onMounted(() => {
    const timer = setInterval(() => {
      if (isLive.value) tick();
    }, 2000);
    onBeforeUnmount(() => clearInterval(timer));
  });

  // ── Derived data ────────────────────────────────────────
  const counts = computed(() => {
    const c: Record<DispatchStatus, number> = {
      "on-time": 0,
      delayed: 0,
      boarding: 0,
    };
    for (const t of trips.value) c[t.status]++;
    return { all: trips.value.length, ...c };
  });

  const filteredTrips = computed(() =>
    trips.value.filter(
      (t) =>
        (filters.corridor === ALL_DISPATCH || t.corridor === filters.corridor) &&
        (filters.status === ALL_DISPATCH || t.status === filters.status),
    ),
  );

  const hasActiveFilters = computed(
    () => filters.corridor !== ALL_DISPATCH || filters.status !== ALL_DISPATCH,
  );

  function resetFilters() {
    filters.corridor = ALL_DISPATCH;
    filters.status = ALL_DISPATCH;
  }

  const stats = computed(() => {
    const rolling = trips.value.filter((t) => t.status !== "boarding");
    return {
      onRoad: rolling.length,
      delayed: counts.value.delayed,
      boarding: counts.value.boarding,
      avgSpeed: rolling.length
        ? Math.round(rolling.reduce((sum, t) => sum + t.speed, 0) / rolling.length)
        : 0,
      passengers: rolling.reduce((sum, t) => sum + t.occupied, 0),
    };
  });

  const selectedTrip = computed(
    () => trips.value.find((t) => t.id === selectedId.value) ?? null,
  );

  // Keep the selection meaningful when a filter hides the chosen bus
  watch(filteredTrips, (list) => {
    if (selectedId.value && !list.some((t) => t.id === selectedId.value)) {
      selectedId.value = list[0]?.id ?? null;
    }
  });

  // ── Actions ─────────────────────────────────────────────
  function callDriver(t: DispatchTrip) {
    toast.info(`Calling ${t.driver} at ${t.driverPhone}`);
  }

  function broadcastDelay(t: DispatchTrip) {
    toast.success(`Delay notice for ${t.id} sent to booked passengers`);
  }

  function newDispatch() {
    toast.info("Ad-hoc dispatch is not available yet");
  }

  return {
    trips,
    filters,
    selectedId,
    selectedTrip,
    isLive,
    lastUpdated,
    counts,
    filteredTrips,
    hasActiveFilters,
    resetFilters,
    stats,
    callDriver,
    broadcastDelay,
    newDispatch,
  };
}
