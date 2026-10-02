<template>
  <div class="px-6 py-6 space-y-6 max-w-[1600px] mx-auto">
    <!-- ─── Top Header & Breadcrumbs ─── -->
    <div class="flex items-center justify-between flex-wrap gap-4">
      <div>
        <!-- Breadcrumb & Title -->
        <div
          class="flex items-center gap-2 text-xs text-text-muted font-medium flex-wrap"
        >
          <span>Operations</span>
          <Icon name="ph:caret-right-bold" class="w-3 h-3 rtl:rotate-180" />
          <span class="hover:text-text-primary transition-colors"
            >Trips & Schedules</span
          >
          <Icon name="ph:caret-right-bold" class="w-3 h-3 rtl:rotate-180" />
          <h1 class="text-base font-extrabold text-text-primary tracking-tight">
            Active Fleet Timetable
          </h1>
          <span
            class="ms-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40"
          >
            <span
              class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"
            />
            {{ activeTripsCount }} Daily Schedules Active
          </span>
        </div>
      </div>

      <!-- Action Buttons using shared VButton -->
      <div class="flex items-center gap-3">
        <LazyVButton
          variant="outline"
          size="sm"
          rounded="xl"
          icon="ph:download-simple-bold"
          custom-class="bg-surface-0 dark:bg-surface-1 shadow-xs border-border/80"
          @click="exportCsv"
        >
          Export CSV
        </LazyVButton>

        <LazyVButton
          variant="primary"
          size="sm"
          rounded="xl"
          icon="ph:plus-bold"
          custom-class="bg-[#0F5A47] hover:bg-[#0c4939] border-none text-white shadow-sm shadow-[#0F5A47]/20"
          @click="openAddDrawer"
        >
          Add New Trip
        </LazyVButton>
      </div>
    </div>

    <!-- ─── Controls & Filter Toolbar ─── -->
    <div
      class="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3"
    >
      <!-- Left Filters -->
      <div class="flex items-center gap-2.5 flex-wrap">
        <!-- Date Range Filter using shared VDropdownMenu -->
        <LazyVDropdownMenu :items="dateRangeItems" align="start">
          <template #trigger="{ open }">
            <LazyVButton
              variant="surface"
              size="sm"
              rounded="xl"
              icon="ph:calendar-blank-bold"
              icon-right="ph:caret-down-bold"
              :custom-class="[
                'border-border/80 bg-surface-0 dark:bg-[#111927]',
                open ? 'border-accent-500' : '',
              ]"
            >
              {{ selectedDateRange }}
            </LazyVButton>
          </template>
        </LazyVDropdownMenu>

        <!-- Corridor Filter using shared VDropdownMenu -->
        <LazyVDropdownMenu :items="corridorItems" align="start">
          <template #trigger="{ open }">
            <LazyVButton
              variant="surface"
              size="sm"
              rounded="xl"
              icon="ph:arrow-up-right-bold"
              icon-right="ph:caret-down-bold"
              :custom-class="[
                'border-border/80 bg-surface-0 dark:bg-[#111927]',
                open ? 'border-accent-500' : '',
              ]"
            >
              {{ selectedCorridor }}
            </LazyVButton>
          </template>
        </LazyVDropdownMenu>

        <!-- Vehicle Class Filter using shared VDropdownMenu -->
        <LazyVDropdownMenu :items="vehicleClassItems" align="start">
          <template #trigger="{ open }">
            <LazyVButton
              variant="surface"
              size="sm"
              rounded="xl"
              icon-right="ph:caret-down-bold"
              :custom-class="[
                'border-border/80 bg-surface-0 dark:bg-[#111927]',
                open ? 'border-accent-500' : '',
              ]"
            >
              {{ selectedVehicleClass }}
            </LazyVButton>
          </template>
        </LazyVDropdownMenu>

        <!-- Status Filter Tabs -->
        <div
          class="flex items-center bg-surface-1 dark:bg-[#111927] p-0.5 rounded-xl border border-border/80"
        >
          <button
            v-for="tab in statusTabs"
            :key="tab.key"
            type="button"
            class="px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer"
            :class="
              currentTab === tab.key
                ? 'bg-surface-0 dark:bg-[#162032] text-text-primary shadow-xs'
                : 'text-text-muted hover:text-text-primary'
            "
            @click="currentTab = tab.key"
          >
            {{ tab.label }}
          </button>
        </div>
      </div>

      <!-- Right Search Filter using shared VInput -->
      <LazyVInput
        ref="searchInputRef"
        v-model="searchQuery"
        size="sm"
        rounded="xl"
        icon="ph:funnel-bold"
        placeholder="Filter by ID, corridor, plate, or driver..."
        wrapper-class="w-full lg:w-80"
        box-class="bg-surface-0 dark:bg-[#111927] border-border/80"
      >
        <template #trailing>
          <kbd
            class="px-1.5 py-0.5 text-[10px] font-mono text-text-muted bg-surface-1 dark:bg-surface-2 rounded border border-border/60"
          >
            /
          </kbd>
        </template>
      </LazyVInput>
    </div>

    <!-- ─── KPI Stat Cards ─── -->
    <lazy-trip-stats
      :total-trips="trips.length"
      :active-trips="activeTripsCount"
    />

    <!-- ─── Egyptian Intercity Timetable Matrix ─── -->
    <div
      class="bg-surface-0 dark:bg-[#111927] border border-border/80 rounded-2xl overflow-hidden shadow-xs"
    >
      <!-- Matrix Top Bar -->
      <div
        class="px-6 py-4 border-b border-border/80 flex items-center justify-between flex-wrap gap-3"
      >
        <div class="flex items-center gap-3">
          <h2 class="text-sm font-extrabold text-text-primary">
            Egyptian Intercity Timetable Matrix
          </h2>
          <span class="text-xs font-mono text-text-muted">
            Updated {{ lastUpdatedText }}
          </span>
        </div>

        <div
          class="flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400"
        >
          <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Normal Operating Cadence</span>
        </div>
      </div>

      <!-- Shared VTable Component -->
      <LazyVTable
        :columns="columns"
        :rows="paginatedTrips"
        row-key="id"
        min-width-class="min-w-[950px]"
        empty-text="No timetable routes found matching your criteria"
      >
        <!-- Trip ID & Corridor -->
        <template #cell-tripId="{ row }">
          <div class="flex flex-col gap-0.5">
            <div class="flex items-center gap-2">
              <span
                class="font-mono text-[11px] font-bold text-emerald-700 dark:text-emerald-400"
              >
                {{ row.id }}
              </span>
              <span
                v-if="!row.status"
                class="px-1.5 py-0.2 rounded text-[9px] font-bold bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400"
              >
                SUSPENDED
              </span>
            </div>
            <div
              class="flex items-center gap-1.5 text-xs font-semibold text-text-primary"
            >
              <span>{{ row.originShort || row.origin }}</span>
              <Icon
                name="ph:arrow-right"
                class="w-3 h-3 text-text-muted rtl:rotate-180 shrink-0"
              />
              <span>{{ row.destinationShort || row.destination }}</span>
            </div>
          </div>
        </template>

        <!-- Departure -->
        <template #cell-departure="{ row }">
          <div
            class="flex flex-col"
            :class="{ 'line-through text-text-muted': !row.status }"
          >
            <span class="font-bold text-text-primary text-xs font-mono">
              {{ row.departTime }}
            </span>
            <span class="text-[11px] text-text-muted">
              {{ row.gate }}
            </span>
          </div>
        </template>

        <!-- Arrival & Duration -->
        <template #cell-arrival="{ row }">
          <div
            class="flex flex-col"
            :class="{ 'line-through text-text-muted': !row.status }"
          >
            <div class="flex items-center gap-1">
              <span class="font-bold text-text-primary text-xs font-mono">
                {{ row.estArrival }}
              </span>
              <span
                v-if="row.overnight"
                class="text-[10px] font-bold text-amber-600 dark:text-amber-400 font-mono"
              >
                +1d
              </span>
            </div>
            <span class="text-[11px] text-text-muted">
              {{ row.duration }}
            </span>
          </div>
        </template>

        <!-- Vehicle Class & Reg -->
        <template #cell-vehicle="{ row }">
          <div class="flex items-center gap-2.5">
            <div
              class="w-7 h-7 rounded-lg bg-surface-2/60 dark:bg-surface-2 text-text-secondary flex items-center justify-center shrink-0"
            >
              <Icon name="ph:bus-bold" class="w-3.5 h-3.5 text-text-muted" />
            </div>
            <div class="flex flex-col leading-tight">
              <span class="font-bold text-text-primary text-xs">
                {{ row.vehicle }}
              </span>
              <span class="font-mono text-[10px] text-text-muted">
                {{ row.plate }}
              </span>
            </div>
          </div>
        </template>

        <!-- Capacity -->
        <template #cell-capacity="{ row }">
          <span class="font-mono text-xs font-semibold text-text-primary">
            {{ row.capacity }}
          </span>
        </template>

        <!-- Seat Occupancy -->
        <template #cell-occupancy="{ row }">
          <div class="flex flex-col gap-1 w-28">
            <div
              class="flex items-center justify-between text-[11px] font-mono"
            >
              <span class="font-semibold text-text-primary">
                {{ row.occupied }}/{{ row.capacity }}
              </span>
              <span
                class="font-bold text-[10px]"
                :class="
                  row.occupancyRate >= 95
                    ? 'text-emerald-700 dark:text-emerald-400'
                    : row.occupancyRate >= 70
                    ? 'text-text-primary'
                    : 'text-text-muted'
                "
              >
                {{
                  row.occupancyRate === 100
                    ? "100% Full"
                    : row.occupancyRate + "%"
                }}
              </span>
            </div>
            <!-- Progress Bar -->
            <div
              class="h-1.5 w-full bg-surface-2 dark:bg-surface-2 rounded-full overflow-hidden"
            >
              <div
                class="h-full rounded-full transition-all duration-300"
                :class="
                  row.occupancyRate >= 90
                    ? 'bg-emerald-600'
                    : row.occupancyRate >= 60
                    ? 'bg-teal-600'
                    : row.occupancyRate > 0
                    ? 'bg-blue-500'
                    : 'bg-transparent'
                "
                :style="{ width: `${row.occupancyRate}%` }"
              />
            </div>
          </div>
        </template>

        <!-- Base Fare -->
        <template #cell-fare="{ row }">
          <span class="font-mono font-bold text-xs text-text-primary">
            {{ Number(row.fare).toFixed(2) }}
          </span>
        </template>

        <!-- Status Toggle -->
        <template #cell-status="{ row }">
          <button
            type="button"
            class="w-9 h-5 rounded-full transition-colors relative cursor-pointer"
            :class="
              row.status ? 'bg-emerald-600' : 'bg-surface-3 dark:bg-surface-2'
            "
            :title="row.status ? 'Deactivate Trip' : 'Activate Trip'"
            @click="toggleTripStatus(row)"
          >
            <span
              class="absolute top-0.5 start-0.5 w-4 h-4 rounded-full bg-white transition-transform shadow-xs"
              :class="{ 'translate-x-4 rtl:-translate-x-4': row.status }"
            />
          </button>
        </template>

        <!-- Row Actions via shared VDropdownMenu -->
        <template #cell-actions="{ row }">
          <LazyVDropdownMenu :items="getRowActions(row)" align="end">
            <template #trigger>
              <LazyVButton
                variant="ghost"
                size="xs"
                rounded="lg"
                icon="ph:dots-three-vertical-bold"
                aria-label="Trip actions"
              />
            </template>
          </LazyVDropdownMenu>
        </template>
      </LazyVTable>

      <!-- Table Footer: Per Page & Shared VPagination -->
      <div
        class="px-6 py-4 border-t border-border/80 flex items-center justify-between flex-wrap gap-4 text-xs"
      >
        <!-- Per page selector using shared VDropdownMenu -->
        <div class="flex items-center gap-2 text-text-muted">
          <LazyVDropdownMenu :items="perPageItems" align="start">
            <template #trigger>
              <LazyVButton
                variant="surface"
                size="xs"
                rounded="lg"
                icon-right="ph:caret-down-bold"
              >
                {{ perPage }} per page
              </LazyVButton>
            </template>
          </LazyVDropdownMenu>
        </div>

        <!-- Shared VPagination component -->
        <LazyVPagination
          v-model="currentPage"
          :total="filteredTrips.length"
          :page-size="perPage"
          item-label="timetable slots"
          show-summary
        />
      </div>
    </div>

    <!-- ─── Add / Edit Trip Schedule Drawer ─── -->
    <lazy-trip-schedule-drawer
      :is-open="isDrawerOpen"
      :trip-data="selectedTripForEdit"
      @close="closeDrawer"
      @save="handleSaveTrip"
    />
  </div>
</template>

<script lang="ts" setup>
import type { DropdownItem } from "@otobisi/ui/types/shared/VDropdownMenu";
import type { TableColumn } from "@otobisi/ui/types/shared/VTable";

const toast = useToast();

// Filters state
const selectedDateRange = ref("Wed, Oct 24, 2024 - Sun, Oct 28, 2024");
const dateRangeOptions = [
  "Wed, Oct 24, 2024 - Sun, Oct 28, 2024",
  "Today, Oct 24, 2024",
  "Next 7 Days (Oct 24 - 31)",
  "Month to Date (Oct 2024)",
];
const dateRangeItems = computed<DropdownItem[]>(() =>
  dateRangeOptions.map((range) => ({
    type: "button",
    label: range,
    onClick: () => {
      selectedDateRange.value = range;
    },
  }))
);

const selectedCorridor = ref("All Routes (14 Corridors)");
const corridorsList = [
  "All Routes (14 Corridors)",
  "Cairo → Alex",
  "Cairo → Hurghada",
  "Cairo → Sharm El Sheikh",
  "Alex → Cairo",
  "Cairo → Dahab",
  "Cairo → Mansoura",
  "Cairo → Luxor",
  "Cairo → Port Said",
];
const corridorItems = computed<DropdownItem[]>(() =>
  corridorsList.map((corridor) => ({
    type: "button",
    label: corridor,
    onClick: () => {
      selectedCorridor.value = corridor;
    },
  }))
);

const selectedVehicleClass = ref("All Vehicle Classes");
const vehicleClasses = [
  "All Vehicle Classes",
  "MCV 600 VIP",
  "MAN Lion's Coach",
  "Mercedes Travego VIP",
  "MCV 400 Eco",
  "SuperJet Business",
  "Daewoo Royal City",
  "Sleeper Coach VIP",
  "MCV 400 Standard",
];
const vehicleClassItems = computed<DropdownItem[]>(() =>
  vehicleClasses.map((vClass) => ({
    type: "button",
    label: vClass,
    onClick: () => {
      selectedVehicleClass.value = vClass;
    },
  }))
);

const currentTab = ref("all");
const statusTabs = [
  { key: "all", label: "All (48)" },
  { key: "running", label: "Running (42)" },
  { key: "inactive", label: "Draft/Inactive (6)" },
];

const searchQuery = ref("");
const searchInputRef = ref<any>(null);

// Keyboard shortcut '/'
onMounted(() => {
  const handler = (e: KeyboardEvent) => {
    if (
      e.key === "/" &&
      document.activeElement?.tagName !== "INPUT" &&
      document.activeElement?.tagName !== "TEXTAREA"
    ) {
      e.preventDefault();
      searchInputRef.value?.$el?.querySelector("input")?.focus();
    }
  };
  window.addEventListener("keydown", handler);
  onUnmounted(() => window.removeEventListener("keydown", handler));
});

const lastUpdatedText = ref("3 mins ago");

// Table Columns definition for shared VTable
const columns: TableColumn[] = [
  {
    key: "tripId",
    label: "TRIP ID & CORRIDOR",
    headerClass: "ps-6",
    cellClass: "ps-6 whitespace-nowrap",
  },
  {
    key: "departure",
    label: "DEPARTURE",
    cellClass: "whitespace-nowrap",
  },
  {
    key: "arrival",
    label: "ARRIVAL & DURATION",
    cellClass: "whitespace-nowrap",
  },
  {
    key: "vehicle",
    label: "VEHICLE CLASS & REG",
    cellClass: "whitespace-nowrap",
  },
  {
    key: "capacity",
    label: "CAPACITY",
    cellClass: "whitespace-nowrap",
  },
  {
    key: "occupancy",
    label: "SEAT OCCUPANCY",
    cellClass: "whitespace-nowrap min-w-[130px]",
  },
  {
    key: "fare",
    label: "BASE FARE (EGP)",
    cellClass: "whitespace-nowrap",
  },
  {
    key: "status",
    label: "STATUS",
    cellClass: "whitespace-nowrap",
  },
  {
    key: "actions",
    label: "ACTIONS",
    headerClass: "pe-6 text-center",
    cellClass: "pe-6 text-center whitespace-nowrap",
  },
];

// Primary Timetable Data
const trips = ref([
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
]);

const activeTripsCount = computed(
  () => trips.value.filter((t) => t.status).length
);

// Filtering
const filteredTrips = computed(() => {
  return trips.value.filter((trip) => {
    // Search query
    if (searchQuery.value.trim()) {
      const q = searchQuery.value.toLowerCase().trim();
      const matchId = trip.id.toLowerCase().includes(q);
      const matchOrigin = trip.origin.toLowerCase().includes(q);
      const matchDest = trip.destination.toLowerCase().includes(q);
      const matchVehicle = trip.vehicle.toLowerCase().includes(q);
      const matchPlate = trip.plate.toLowerCase().includes(q);
      if (
        !matchId &&
        !matchOrigin &&
        !matchDest &&
        !matchVehicle &&
        !matchPlate
      ) {
        return false;
      }
    }

    // Status Tab
    if (currentTab.value === "running" && !trip.status) return false;
    if (currentTab.value === "inactive" && trip.status) return false;

    // Corridor Filter
    if (selectedCorridor.value !== "All Routes (14 Corridors)") {
      const corridorSearch = selectedCorridor.value
        .replace("→", "")
        .toLowerCase();
      const [from, to] = corridorSearch.split(" ").filter(Boolean);
      const routeText = `${trip.origin} ${trip.destination}`.toLowerCase();
      if (from && !routeText.includes(from)) return false;
      if (to && !routeText.includes(to)) return false;
    }

    // Vehicle Class Filter
    if (selectedVehicleClass.value !== "All Vehicle Classes") {
      if (trip.vehicle !== selectedVehicleClass.value) return false;
    }

    return true;
  });
});

// Pagination
const currentPage = ref(1);
const perPage = ref(8);
const perPageOptions = [8, 16, 24, 48];
const perPageItems = computed<DropdownItem[]>(() =>
  perPageOptions.map((size) => ({
    type: "button",
    label: `${size} per page`,
    onClick: () => {
      perPage.value = size;
      currentPage.value = 1;
    },
  }))
);

const paginatedTrips = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  return filteredTrips.value.slice(start, start + perPage.value);
});

// Row actions generator for shared VDropdownMenu
const getRowActions = (trip: any): DropdownItem[] => [
  {
    type: "button",
    label: "Edit Schedule",
    icon: "ph:pencil-simple-bold",
    onClick: () => openEditDrawer(trip),
  },
  {
    type: "button",
    label: "Duplicate Trip",
    icon: "ph:copy-bold",
    onClick: () => duplicateTrip(trip),
  },
  {
    type: "button",
    label: "View Manifest",
    icon: "ph:users-three-bold",
    onClick: () => viewManifest(trip),
  },
  {
    type: "divider",
  },
  {
    type: "button",
    label: "Cancel Trip",
    icon: "ph:trash-bold",
    danger: true,
    onClick: () => deleteTrip(trip.id),
  },
];

// Toggle Trip Status
const toggleTripStatus = (trip: any) => {
  trip.status = !trip.status;
  toast.success(
    `Schedule ${trip.id} is now ${trip.status ? "Active" : "Suspended"}`
  );
};

// Drawer Add / Edit
const isDrawerOpen = ref(false);
const selectedTripForEdit = ref<any>(null);

const openAddDrawer = () => {
  selectedTripForEdit.value = null;
  isDrawerOpen.value = true;
};

const openEditDrawer = (trip: any) => {
  selectedTripForEdit.value = { ...trip };
  isDrawerOpen.value = true;
};

const closeDrawer = () => {
  isDrawerOpen.value = false;
  selectedTripForEdit.value = null;
};

const handleSaveTrip = (savedData: any) => {
  if (savedData.id) {
    // Edit existing
    const idx = trips.value.findIndex((t) => t.id === savedData.id);
    if (idx !== -1) {
      trips.value[idx] = {
        ...trips.value[idx],
        ...savedData,
        originShort: savedData.origin,
        destinationShort: savedData.destination,
      };
      toast.success(`Schedule ${savedData.id} updated successfully`);
    }
  } else {
    // Add new
    const newId = `#TR-${Math.floor(4050 + Math.random() * 50)}`;
    const newTrip = {
      ...savedData,
      id: newId,
      originShort: savedData.origin,
      destinationShort: savedData.destination,
      occupied: 0,
      occupancyRate: 0,
      status: true,
      overnight: savedData.estArrival.includes("+1d"),
    };
    trips.value.unshift(newTrip);
    toast.success(`New trip ${newId} published to live timetable`);
  }
  closeDrawer();
};

const duplicateTrip = (trip: any) => {
  const newId = `#TR-${Math.floor(4050 + Math.random() * 50)}`;
  const cloned = {
    ...trip,
    id: newId,
    occupied: 0,
    occupancyRate: 0,
    status: true,
  };
  trips.value.unshift(cloned);
  toast.success(`Duplicated ${trip.id} as ${newId}`);
};

const viewManifest = (trip: any) => {
  toast.info(`Loading passenger manifest for ${trip.id}...`);
};

const deleteTrip = (id: string) => {
  trips.value = trips.value.filter((t) => t.id !== id);
  toast.error(`Trip ${id} removed from schedule`);
};

// Export CSV
const exportCsv = () => {
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

  const csvContent =
    "data:text/csv;charset=utf-8," +
    [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute(
    "download",
    `timetable_schedules_${new Date().toISOString().slice(0, 10)}.csv`
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  toast.success("Timetable CSV exported successfully");
};

useSeoMeta({
  title: "Trips & Schedules",
});
</script>