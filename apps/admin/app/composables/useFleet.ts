import type {
  CoachRecord,
  CoachStatus,
  FleetFilters,
  NewCoachForm,
} from "~/types/fleet";

const initialFleet = (): CoachRecord[] => [
  {
    id: 1,
    model: "MCV 600 VIP Elite",
    code: "#DX-8821",
    internalId: "BUS-EG-882",
    chassis: "Mercedes OC 500 RF",
    year: 2023,
    vin: "WDB6340...8821",
    plateArabic: "د خ ٨٨٢١",
    plateLatin: "DX-8821",
    depot: "Almaza Base #01",
    template: "vip",
    status: "in-service",
  },
  {
    id: 2,
    model: "MAN Lion's Coach R07",
    code: "#CA-4102",
    internalId: "BUS-EG-410",
    chassis: "MAN Euro 6",
    year: 2022,
    vin: "WMAA21...4102",
    plateArabic: "ق س ٤١٠٢",
    plateLatin: "CA-4102",
    depot: "Moharam Bek Depot #03",
    template: "standard",
    status: "in-service",
  },
  {
    id: 3,
    model: "Volvo B11R Luxury Cruiser",
    code: "#AL-9014",
    internalId: "BUS-EG-901",
    chassis: "Volvo B11R 460",
    year: 2021,
    vin: "YV3R8...9014",
    plateArabic: "م ن ٩٠١٤",
    plateLatin: "AL-9014",
    depot: "Giza Workshop Bay #02",
    template: "sleeper",
    status: "scheduled",
  },
  {
    id: 4,
    model: "MCV 600 VIP Nightliner",
    code: "#RD-2234",
    internalId: "BUS-EG-223",
    chassis: "Mercedes OC 500 RF",
    year: 2024,
    vin: "WDB634...2234",
    plateArabic: "ر ب ٢٢٣٤",
    plateLatin: "RD-2234",
    depot: "Hurghada Depot #02",
    template: "sleeper",
    status: "in-service",
  },
  {
    id: 5,
    model: "Daewoo FX116 Cruiser",
    code: "#MN-1088",
    internalId: "BUS-EG-108",
    chassis: "Daewoo Doosan DE12",
    year: 2022,
    vin: "KLY4A...1088",
    plateArabic: "م ن ١٠٨٨",
    plateLatin: "MN-1088",
    depot: "Mansoura Depot #01",
    template: "shuttle",
    status: "in-service",
  },
  {
    id: 6,
    model: "MCV 500 Standard Line",
    code: "#AS-3301",
    internalId: "BUS-EG-330",
    chassis: "Mercedes OF 1723",
    year: 2020,
    vin: "WDB38...3301",
    plateArabic: "ع س ٣٣٠١",
    plateLatin: "AS-3301",
    depot: "Asyut Southern Yard",
    template: "standard",
    status: "standby",
  },
];

/** Pads the hand-written rows to a 48-coach fleet so filters and pagination have data */
function buildFleet(): CoachRecord[] {
  const base = initialFleet();
  const extra = Array.from({ length: 42 }, (_, i): CoachRecord => {
    const tpl = base[i % base.length]!;
    const number = 1000 + (i + 1) * 37;
    const prefix = tpl.plateLatin.split("-")[0]!;
    const letters = tpl.plateArabic.replace(/[\d٠-٩\s]+$/, "").trim();
    const status: CoachStatus =
      i % 11 === 3 ? "maintenance" : i % 21 === 7 ? "standby" : "in-service";

    return {
      ...tpl,
      id: 100 + i,
      code: `#${prefix}-${number}`,
      internalId: `BUS-EG-${400 + i}`,
      vin: `${tpl.vin.slice(0, 5)}...${number}`,
      plateLatin: `${prefix}-${number}`,
      plateArabic: `${letters} ${toArabicDigits(number)}`,
      status,
    };
  });
  return [...base, ...extra];
}

export function useFleet() {
  const toast = useToast();

  const fleet = ref<CoachRecord[]>(buildFleet());

  const filters = reactive<FleetFilters>({
    search: "",
    status: ALL_FLEET,
    template: ALL_FLEET,
  });

  const counts = computed(() => {
    const c: Record<CoachStatus, number> = {
      "in-service": 0,
      scheduled: 0,
      standby: 0,
      maintenance: 0,
    };
    for (const coach of fleet.value) c[coach.status]++;
    return { all: fleet.value.length, ...c };
  });

  const avgAge = computed(() => {
    if (!fleet.value.length) return 0;
    const year = new Date().getFullYear();
    const total = fleet.value.reduce((sum, c) => sum + (year - c.year), 0);
    return Math.round((total / fleet.value.length) * 10) / 10;
  });

  /** Seats across coaches that can be sold right now */
  const liveSeats = computed(() =>
    fleet.value
      .filter((c) => c.status === "in-service")
      .reduce((sum, c) => sum + COACH_TEMPLATES[c.template].seats, 0),
  );

  const filteredFleet = computed(() => {
    const q = filters.search.toLowerCase().trim();

    return fleet.value.filter((c) => {
      if (
        q &&
        ![
          c.model,
          c.code,
          c.internalId,
          c.vin,
          c.chassis,
          c.plateLatin,
          c.plateArabic,
          c.depot,
        ].some((field) => field.toLowerCase().includes(q))
      ) {
        return false;
      }
      if (filters.status !== ALL_FLEET && c.status !== filters.status)
        return false;
      if (filters.template !== ALL_FLEET && c.template !== filters.template)
        return false;
      return true;
    });
  });

  const hasActiveFilters = computed(
    () =>
      !!filters.search ||
      filters.status !== ALL_FLEET ||
      filters.template !== ALL_FLEET,
  );

  function resetFilters() {
    filters.search = "";
    filters.status = ALL_FLEET;
    filters.template = ALL_FLEET;
  }

  // ── Bulk selection (VTable owns the checkboxes; ids persist across pages) ──
  const selectedIds = ref<(string | number)[]>([]);

  // Drop selections that a filter change has hidden
  watch(filteredFleet, (list) => {
    const visible = new Set(list.map((c) => c.id));
    selectedIds.value = selectedIds.value.filter((id) => visible.has(id));
  });


  // ── Actions ─────────────────────────────────────────────
  /** Returns true when the coach was registered, so the page can close the drawer */
  function registerCoach(form: NewCoachForm): boolean {
    if (
      !form.model.trim() ||
      !form.internalId.trim() ||
      !form.plateArabic.trim() ||
      !form.plateLatin.trim()
    ) {
      toast.error("Fill in the model, internal ID and both license plates");
      return false;
    }

    fleet.value.unshift({
      id: Date.now(),
      model: form.model.trim(),
      code: `#${form.plateLatin.trim()}`,
      internalId: form.internalId.trim(),
      chassis: form.chassis,
      year: form.year,
      vin: form.vin.trim() || "—",
      plateArabic: form.plateArabic.trim(),
      plateLatin: form.plateLatin.trim(),
      depot: form.depot,
      template: form.template,
      status: form.status,
    });
    toast.success(`${form.model.trim()} registered to the fleet`);
    return true;
  }

  function saveDraft() {
    toast.info("Draft saved");
  }

  function exportCsv() {
    const headers = [
      "Model",
      "Code",
      "Internal ID",
      "Chassis",
      "Year",
      "VIN",
      "Plate (Arabic)",
      "Plate (Latin)",
      "Depot",
      "Seating Blueprint",
      "Status",
    ];
    const source = selectedIds.value.length
      ? filteredFleet.value.filter((c) => selectedIds.value.includes(c.id))
      : filteredFleet.value;

    // Quote every cell: model names and depots may contain commas
    const cell = (v: string | number) => `"${String(v).replace(/"/g, '""')}"`;
    const rows = source.map((c) => [
      c.model,
      c.code,
      c.internalId,
      c.chassis,
      c.year,
      c.vin,
      c.plateArabic,
      c.plateLatin,
      c.depot,
      COACH_TEMPLATES[c.template].label,
      COACH_STATUS_LABELS[c.status],
    ]);

    const csv =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((r) => r.map(cell).join(",")).join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csv));
    link.setAttribute(
      "download",
      `fleet_${new Date().toISOString().slice(0, 10)}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`${source.length} coaches exported`);
  }

  return {
    fleet,
    filters,
    counts,
    avgAge,
    liveSeats,
    filteredFleet,
    hasActiveFilters,
    resetFilters,
    selectedIds,
    registerCoach,
    saveDraft,
    exportCsv,
  };
}
