import type { Trip, TripFilters } from "~/types/trip";

const newTripId = () => `#TR-${Math.floor(4050 + Math.random() * 50)}`;

const initialTrips = (): Trip[] => [
  {
    id: "#TR-4019",
    origin: "Cairo (Almaza)",
    originShort: "Cairo (Almaza)",
    destination: "Alex (Sidi Gaber)",
    destinationShort: "Alex (Sidi Gaber)",
    departTime: "07:00 AM",
    gate: "Gate B-04",
    estArrival: "09:30 AM",
    duration: "2h 30m direct",
    vehicle: "MCV 600 VIP",
    plate: "DX-8821",
    capacity: 48,
    occupied: 46,
    occupancyRate: 96,
    fare: 220.0,
    status: true,
    overnight: false,
  },
  {
    id: "#TR-4022",
    origin: "Cairo (Tahrir)",
    originShort: "Cairo (Tahrir)",
    destination: "Hurghada (El Dahar)",
    destinationShort: "Hurghada (El Dahar)",
    departTime: "08:30 AM",
    gate: "Gate C-01",
    estArrival: "14:15 PM",
    duration: "5h 45m (1 stop)",
    vehicle: "MAN Lion's Coach",
    plate: "HR-1844",
    capacity: 48,
    occupied: 44,
    occupancyRate: 92,
    fare: 360.0,
    status: true,
    overnight: false,
  },
  {
    id: "#TR-4028",
    origin: "Cairo (Almaza)",
    originShort: "Cairo (Almaza)",
    destination: "Sharm El Sheikh (Peace Rd)",
    destinationShort: "Sharm El Sheikh (Peace Rd)",
    departTime: "09:15 AM",
    gate: "Gate B-01",
    estArrival: "15:45 PM",
    duration: "6h 30m",
    vehicle: "Mercedes Travego VIP",
    plate: "SS-9012",
    capacity: 44,
    occupied: 39,
    occupancyRate: 88,
    fare: 410.0,
    status: true,
    overnight: false,
  },
  {
    id: "#TR-4031",
    origin: "Alex (Moharam Bek)",
    originShort: "Alex (Moharam Bek)",
    destination: "Cairo (Tahrir)",
    destinationShort: "Cairo (Tahrir)",
    departTime: "10:00 AM",
    gate: "Gate 03",
    estArrival: "12:45 PM",
    duration: "2h 45m",
    vehicle: "MCV 400 Eco",
    plate: "AX-3310",
    capacity: 48,
    occupied: 31,
    occupancyRate: 65,
    fare: 160.0,
    status: true,
    overnight: false,
  },
  {
    id: "#TR-4035",
    origin: "Cairo (Almaza)",
    originShort: "Cairo (Almaza)",
    destination: "Dahab Bus Terminal",
    destinationShort: "Dahab Bus Terminal",
    departTime: "11:30 AM",
    gate: "Gate B-06",
    estArrival: "19:45 PM",
    duration: "8h 15m",
    vehicle: "SuperJet Business",
    plate: "DH-7711",
    capacity: 36,
    occupied: 28,
    occupancyRate: 78,
    fare: 490.0,
    status: true,
    overnight: false,
  },
  {
    id: "#TR-4040",
    origin: "Cairo (Almaza)",
    originShort: "Cairo (Almaza)",
    destination: "Mansoura Express",
    destinationShort: "Mansoura Express",
    departTime: "13:00 PM",
    gate: "Gate A-02",
    estArrival: "15:15 PM",
    duration: "2h 15m",
    vehicle: "Daewoo Royal City",
    plate: "MN-4402",
    capacity: 48,
    occupied: 18,
    occupancyRate: 37,
    fare: 120.0,
    status: true,
    overnight: false,
  },
  {
    id: "#TR-4044",
    origin: "Cairo (Tahrir)",
    originShort: "Cairo (Tahrir)",
    destination: "Luxor Overland Exp",
    destinationShort: "Luxor Overland Exp",
    departTime: "21:00 PM",
    gate: "Gate C-03",
    estArrival: "06:30 AM",
    duration: "9h 30m",
    vehicle: "Sleeper Coach VIP",
    plate: "LX-1100",
    capacity: 30,
    occupied: 30,
    occupancyRate: 100,
    fare: 650.0,
    status: true,
    overnight: true,
  },
  {
    id: "#TR-4049",
    origin: "Cairo (Almaza)",
    originShort: "Cairo (Almaza)",
    destination: "Port Said Terminal",
    destinationShort: "Port Said Terminal",
    departTime: "16:30 PM",
    gate: "Unassigned",
    estArrival: "19:15 PM",
    duration: "2h 45m",
    vehicle: "MCV 400 Standard",
    plate: "PS-2201",
    capacity: 48,
    occupied: 0,
    occupancyRate: 0,
    fare: 145.0,
    status: false,
    overnight: false,
  },
];

export function useTrips() {
  const toast = useToast();

  const trips = ref<Trip[]>(initialTrips());

  const filters = reactive<TripFilters>({
    dateRange: TRIP_DATE_RANGES[0]!,
    corridor: ALL_CORRIDORS,
    vehicleClass: ALL_VEHICLE_CLASSES,
    tab: "all",
    search: "",
  });

  const activeTripsCount = computed(
    () => trips.value.filter((t) => t.status).length,
  );

  const filteredTrips = computed(() => {
    const q = filters.search.toLowerCase().trim();

    return trips.value.filter((trip) => {
      if (
        q &&
        ![trip.id, trip.origin, trip.destination, trip.vehicle, trip.plate].some(
          (field) => field.toLowerCase().includes(q),
        )
      ) {
        return false;
      }

      if (filters.tab === "running" && !trip.status) return false;
      if (filters.tab === "inactive" && trip.status) return false;

      if (filters.corridor !== ALL_CORRIDORS) {
        const [from, to] = filters.corridor
          .replace("→", "")
          .toLowerCase()
          .split(" ")
          .filter(Boolean);
        const routeText = `${trip.origin} ${trip.destination}`.toLowerCase();
        if (from && !routeText.includes(from)) return false;
        if (to && !routeText.includes(to)) return false;
      }

      if (
        filters.vehicleClass !== ALL_VEHICLE_CLASSES &&
        trip.vehicle !== filters.vehicleClass
      ) {
        return false;
      }

      return true;
    });
  });

  function toggleStatus(trip: Trip) {
    trip.status = !trip.status;
    toast.success(
      `Schedule ${trip.id} is now ${trip.status ? "Active" : "Suspended"}`,
    );
  }

  /** Adds a new trip, or updates the one matching `data.id` */
  function saveTrip(data: any) {
    if (data.id) {
      const idx = trips.value.findIndex((t) => t.id === data.id);
      if (idx === -1) return;
      trips.value[idx] = {
        ...trips.value[idx]!,
        ...data,
        originShort: data.origin,
        destinationShort: data.destination,
      };
      toast.success(`Schedule ${data.id} updated successfully`);
      return;
    }

    const id = newTripId();
    trips.value.unshift({
      ...data,
      id,
      originShort: data.origin,
      destinationShort: data.destination,
      occupied: 0,
      occupancyRate: 0,
      status: true,
      overnight: data.estArrival.includes("+1d"),
    });
    toast.success(`New trip ${id} published to live timetable`);
  }

  function duplicateTrip(trip: Trip) {
    const id = newTripId();
    trips.value.unshift({
      ...trip,
      id,
      occupied: 0,
      occupancyRate: 0,
      status: true,
    });
    toast.success(`Duplicated ${trip.id} as ${id}`);
  }

  function viewManifest(trip: Trip) {
    toast.info(`Loading passenger manifest for ${trip.id}...`);
  }

  function deleteTrip(trip: Trip) {
    trips.value = trips.value.filter((t) => t.id !== trip.id);
    toast.error(`Trip ${trip.id} removed from schedule`);
  }

  function exportCsv() {
    const headers = [
      "Trip ID",
      "Origin",
      "Destination",
      "Departure",
      "Gate",
      "Arrival",
      "Duration",
      "Vehicle",
      "Plate",
      "Capacity",
      "Occupied",
      "Occupancy %",
      "Fare (EGP)",
      "Status",
    ];
    const rows = filteredTrips.value.map((t) => [
      t.id,
      t.origin,
      t.destination,
      t.departTime,
      t.gate,
      t.estArrival,
      t.duration,
      t.vehicle,
      t.plate,
      t.capacity,
      t.occupied,
      `${t.occupancyRate}%`,
      t.fare,
      t.status ? "ACTIVE" : "SUSPENDED",
    ]);

    const csv =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csv));
    link.setAttribute(
      "download",
      `timetable_schedules_${new Date().toISOString().slice(0, 10)}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Timetable CSV exported successfully");
  }

  return {
    trips,
    filters,
    filteredTrips,
    activeTripsCount,
    toggleStatus,
    saveTrip,
    duplicateTrip,
    viewManifest,
    deleteTrip,
    exportCsv,
  };
}
