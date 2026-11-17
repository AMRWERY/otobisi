import type { Booking, BookingFilters } from "~/types/booking";

type Seed = Omit<
  Booking,
  | "gender"
  | "age"
  | "email"
  | "companions"
  | "tripId"
  | "duration"
  | "driver"
  | "gatewayTxId"
  | "settledAt"
  | "createdAt"
  | "refunded"
> &
  Partial<Booking>;

const slug = (name: string) => name.toLowerCase().replace(/[^a-z]+/g, ".");

/** Fills the fields the ledger doesn't care about with sensible mock values */
function seed(s: Seed, n: number): Booking {
  return {
    gender: "Male",
    age: 28 + (n % 20),
    email: `${slug(s.passengerName)}@gmail.com`,
    companions: [],
    tripId: `#NB-${400 + n}`,
    duration: "2h 20m",
    driver: "Capt. Hassan K. (#8" + (10 + n) + ")",
    gatewayTxId: `${s.gateway.slice(0, 3).toUpperCase()}-TX-99${82000 + n * 37}`,
    settledAt: "24 Oct 2024, 11:20:44 CLT",
    createdAt: "24 Oct 11:15 CLT",
    refunded: false,
    ...s,
  };
}

const initialBookings = (): Booking[] => [
  seed(
    {
      id: "#OT-98421",
      passengerName: "Ahmed Mansour",
      nationalId: "29004150102345",
      phone: "+20 100 234 5678",
      email: "ahmed.mansour@gmail.com",
      age: 34,
      companions: [{ name: "Youssef Mansour", relation: "Child / 8 yrs", seat: "14B" }],
      originCity: "Cairo",
      origin: "Cairo (Almaza)",
      destinationCity: "Alex",
      destination: "Alex (Sidi Gaber)",
      tripId: "#NB-402",
      departDay: "Today",
      departTime: "14:45",
      gate: "Gate B-04",
      duration: "2h 20m",
      vehicleClass: "VIP 2+1",
      vehicle: "MCV 600 VIP",
      plate: "DX-8821",
      driver: "Capt. Ahmed M. (#802)",
      seats: ["14A", "14B"],
      fare: 350,
      gateway: "Fawry",
      gatewayTxId: "FAWRY-TX-9982341",
      status: "confirmed",
    },
    0,
  ),
  seed(
    {
      id: "#OT-98420",
      passengerName: "Nour El-Din Mahmoud",
      nationalId: "29511120108912",
      phone: "+20 111 876 5432",
      originCity: "Cairo",
      origin: "Cairo (Tahrir)",
      destinationCity: "Hurghada",
      destination: "Hurghada",
      departDay: "Today",
      departTime: "16:15",
      gate: "Gate A-01",
      duration: "5h 45m",
      vehicleClass: "VIP 2+1",
      vehicle: "MAN Lion's Coach",
      plate: "HR-1844",
      seats: ["04A"],
      fare: 260,
      gateway: "Meeza Card",
      status: "confirmed",
    },
    1,
  ),
  seed(
    {
      id: "#OT-98419",
      passengerName: "Mariam Youssef",
      gender: "Female",
      nationalId: "29807220104431",
      phone: "+20 122 345 6789",
      originCity: "Cairo",
      origin: "Cairo (Almaza)",
      destinationCity: "Sharm El Sheikh",
      destination: "Sharm El Sheikh",
      departDay: "Today",
      departTime: "18:00",
      gate: "Gate C-02",
      duration: "6h 30m",
      vehicleClass: "Business 2+2",
      vehicle: "Mercedes Travego VIP",
      plate: "SS-9012",
      seats: ["15A", "15B", "15C"],
      fare: 780,
      gateway: "Vodafone Cash",
      status: "confirmed",
    },
    2,
  ),
  seed(
    {
      id: "#OT-98418",
      passengerName: "Tarek Zaki",
      nationalId: "28912010101099",
      phone: "+20 102 987 6543",
      originCity: "Alex",
      origin: "Alex (Moharam Bek)",
      destinationCity: "Cairo",
      destination: "Cairo (Tahrir)",
      departDay: "Today",
      departTime: "19:30",
      gate: "Gate M-01",
      duration: "2h 45m",
      vehicleClass: "Standard 2+2",
      vehicle: "MCV 400 Eco",
      plate: "AX-3310",
      seats: ["08C"],
      fare: 175,
      gateway: "Fawry",
      status: "confirmed",
    },
    3,
  ),
  seed(
    {
      id: "#OT-98417",
      passengerName: "Salma Abdel-Rahman",
      gender: "Female",
      nationalId: "30001150106610",
      phone: "+20 115 654 3210",
      originCity: "Cairo",
      origin: "Cairo",
      destinationCity: "Dahab",
      destination: "Dahab Express",
      departDay: "Tomorrow",
      departTime: "06:00",
      gate: "Gate B-02",
      duration: "8h 15m",
      vehicleClass: "Business 2+2",
      vehicle: "SuperJet Business",
      plate: "DH-7711",
      seats: ["02A", "02B"],
      fare: 640,
      gateway: "Station Cash",
      status: "confirmed",
    },
    4,
  ),
  seed(
    {
      id: "#OT-98416",
      passengerName: "Omar El-Ghadban",
      nationalId: "29203100100123",
      phone: "+20 106 123 4567",
      originCity: "Cairo",
      origin: "Cairo",
      destinationCity: "Mansoura",
      destination: "Mansoura Direct",
      departDay: "Oct 25",
      departTime: "08:30",
      gate: "Gate A-04",
      duration: "2h 15m",
      vehicleClass: "Standard 2+2",
      vehicle: "Daewoo Royal City",
      plate: "MN-4402",
      seats: ["19D"],
      fare: 125,
      gateway: "Fawry",
      status: "cancelled",
      refunded: true,
    },
    5,
  ),
  seed(
    {
      id: "#OT-98415",
      passengerName: "Khaled Badr",
      nationalId: "28706180100034",
      phone: "+20 128 765 4321",
      originCity: "Cairo",
      origin: "Cairo (Tahrir)",
      destinationCity: "Luxor",
      destination: "Luxor Overnight",
      departDay: "Yesterday",
      departTime: "21:00",
      gate: "Gate C-03",
      duration: "9h 30m",
      vehicleClass: "Sleeper",
      vehicle: "Sleeper Coach VIP",
      plate: "LX-1100",
      seats: ["S01", "S02", "S03", "S04"],
      fare: 1920,
      gateway: "Meeza Card",
      status: "completed",
    },
    6,
  ),
  seed(
    {
      id: "#OT-98414",
      passengerName: "Hany Mostafa",
      nationalId: "29409270107719",
      phone: "+20 109 432 1098",
      originCity: "Cairo",
      origin: "Cairo (Almaza)",
      destinationCity: "Port Said",
      destination: "Port Said",
      departDay: "Today",
      departTime: "20:15",
      gate: "Gate B-01",
      duration: "2h 45m",
      vehicleClass: "Standard 2+2",
      vehicle: "MCV 400 Standard",
      plate: "PS-2201",
      seats: ["07A"],
      fare: 145,
      gateway: "Vodafone Cash",
      status: "confirmed",
    },
    7,
  ),
];

const EXTRA_PASSENGERS = [
  "Mona Hassan",
  "Karim Fathy",
  "Layla Ibrahim",
  "Sherif Nabil",
  "Dina Samir",
  "Yara Adel",
  "Mostafa Ragab",
  "Heba Soliman",
];

/** Pads the hand-written rows so pagination and bulk selection have something to work on */
function buildBookings(): Booking[] {
  const base = initialBookings();
  const extra = Array.from({ length: 40 }, (_, i): Booking => {
    const tpl = base[(i + 1) % base.length]!;
    const name = EXTRA_PASSENGERS[i % EXTRA_PASSENGERS.length]!;
    const n = 8 + i;
    return {
      ...tpl,
      id: `#OT-${98413 - i}`,
      passengerName: name,
      email: `${slug(name)}@gmail.com`,
      companions: [],
      nationalId: `29${String(100000000000 + i * 7919).slice(0, 12)}`,
      phone: `+20 10${i % 10} ${100 + i} ${String(1000 + i * 13)}`,
      tripId: `#NB-${400 + n}`,
      gatewayTxId: `${tpl.gateway.slice(0, 3).toUpperCase()}-TX-99${82000 + n * 37}`,
      departTime: `${String(6 + (i % 16)).padStart(2, "0")}:${i % 2 ? "30" : "00"}`,
      refunded: tpl.refunded,
    };
  });
  return [...base, ...extra];
}

export function useBookings() {
  const toast = useToast();

  const bookings = ref<Booking[]>(buildBookings());

  const filters = reactive<BookingFilters>({
    dateRange: BOOKING_DATE_RANGES[0]!,
    corridor: ALL_BOOKING_CORRIDORS,
    vehicleClass: ALL_BOOKING_CLASSES,
    tab: "all",
    search: "",
  });

  const counts = computed(() => {
    const c = { all: bookings.value.length, confirmed: 0, completed: 0, cancelled: 0 };
    for (const b of bookings.value) {
      if (b.status === "confirmed") c.confirmed++;
      else if (b.status === "completed") c.completed++;
      else if (b.status === "cancelled") c.cancelled++;
    }
    return c;
  });

  const filteredBookings = computed(() => {
    const q = filters.search.toLowerCase().trim();

    return bookings.value.filter((b) => {
      if (
        q &&
        ![b.id, b.passengerName, b.phone, b.nationalId, b.origin, b.destination].some(
          (field) => field.toLowerCase().includes(q),
        )
      ) {
        return false;
      }
      if (filters.tab !== "all" && b.status !== filters.tab) return false;
      if (
        filters.corridor !== ALL_BOOKING_CORRIDORS &&
        `${b.originCity} → ${b.destinationCity}` !== filters.corridor
      ) {
        return false;
      }
      if (
        filters.vehicleClass !== ALL_BOOKING_CLASSES &&
        b.vehicleClass !== filters.vehicleClass
      ) {
        return false;
      }
      return true;
    });
  });

  const hasActiveFilters = computed(
    () =>
      !!filters.search ||
      filters.tab !== "all" ||
      filters.corridor !== ALL_BOOKING_CORRIDORS ||
      filters.vehicleClass !== ALL_BOOKING_CLASSES,
  );

  function resetFilters() {
    filters.search = "";
    filters.tab = "all";
    filters.corridor = ALL_BOOKING_CORRIDORS;
    filters.vehicleClass = ALL_BOOKING_CLASSES;
  }

  // ── Inspection panel ────────────────────────────────────
  // Starts closed so SSR never renders the mobile drawer; the page opens the first row on desktop
  const activeId = ref<string | null>(null);
  const activeBooking = computed(
    () => bookings.value.find((b) => b.id === activeId.value) ?? null,
  );

  // ── Bulk selection (VTable owns the checkboxes; ids persist across pages) ──
  const selectedIds = ref<(string | number)[]>([]);

  // Drop selections that a filter change has hidden
  watch(filteredBookings, (list) => {
    const visible = new Set(list.map((b) => b.id));
    selectedIds.value = selectedIds.value.filter((id) => visible.has(id));
  });


  // ── Actions ─────────────────────────────────────────────
  function markNoShow(booking: Booking) {
    booking.status = "no-show";
    toast.info(`${booking.id} marked as no-show`);
  }

  function refundBooking(booking: Booking) {
    booking.status = "cancelled";
    booking.refunded = true;
    toast.success(
      `${booking.id} cancelled — EGP ${formatEgp(booking.fare)} refund queued to ${booking.gateway}`,
    );
  }

  function resendTicket(booking: Booking) {
    toast.success(`e-Ticket for ${booking.id} sent via WhatsApp & SMS`);
  }

  function printManifest() {
    toast.info("Preparing boarding manifest...");
  }

  function createBooking() {
    toast.info("New booking flow is not available yet");
  }

  function exportCsv(onlySelected = false) {
    const source = onlySelected
      ? filteredBookings.value.filter((b) => selectedIds.value.includes(b.id))
      : filteredBookings.value;

    const headers = [
      "PNR",
      "Passenger",
      "Phone",
      "Origin",
      "Destination",
      "Departure",
      "Seats",
      "Fare (EGP)",
      "Gateway",
      "Status",
    ];
    // Quote every cell: names and stations may contain commas
    const cell = (v: string | number) => `"${String(v).replace(/"/g, '""')}"`;
    const rows = source.map((b) => [
      b.id,
      b.passengerName,
      b.phone,
      b.origin,
      b.destination,
      `${b.departDay} ${b.departTime}`,
      b.seats.join(" "),
      b.fare,
      b.gateway,
      STATUS_LABELS[b.status],
    ]);

    const csv =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((r) => r.map(cell).join(",")).join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csv));
    link.setAttribute(
      "download",
      `bookings_${new Date().toISOString().slice(0, 10)}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`${source.length} bookings exported`);
  }

  return {
    bookings,
    filters,
    counts,
    filteredBookings,
    hasActiveFilters,
    resetFilters,
    activeId,
    activeBooking,
    selectedIds,
    markNoShow,
    refundBooking,
    resendTicket,
    printManifest,
    createBooking,
    exportCsv,
  };
}
