<template>
  <div class="min-h-screen bg-surface-0 pb-16">
    <!-- Top Search Header / Modify Bar -->
    <lazy-search-header-bar
      :from-city="fromCityFormatted"
      :from-station="fromStationText"
      :to-city="toCityFormatted"
      :to-station="toStationText"
      :date="currentDate"
      @update-search="handleSearchUpdate"
    />

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
      <!-- Date Carousel / Daily Fares Strip -->
      <div class="mb-6">
        <lazy-search-date-strip v-model="currentDate" @change="onDateChange" />
      </div>

      <!-- Main Layout (Sidebar Filters + Results List) -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <!-- Mobile Filter Bar & Open Button (Small screens only) -->
        <div
          class="lg:hidden col-span-12 flex items-center justify-between gap-3 bg-surface-1 border border-border p-3.5 rounded-2xl shadow-xs"
        >
          <div class="flex items-center gap-2.5">
            <div
              class="w-8 h-8 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center shrink-0"
            >
              <Icon name="ph:funnel-bold" class="w-4 h-4" />
            </div>
            <div>
              <span class="text-xs font-bold text-text-primary block">
                Filter Coaches
              </span>
              <span class="text-[11px] text-text-muted">
                {{
                  activeFiltersCount > 0
                    ? `${activeFiltersCount} active filter${activeFiltersCount > 1 ? "s" : ""}`
                    : `${filteredTrips.length} coaches available`
                }}
              </span>
            </div>
          </div>

          <!-- The Open Filters Button -->
          <button
            type="button"
            class="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F26A36] hover:bg-[#E05925] text-white font-bold text-xs shadow-sm active:scale-95 transition-all cursor-pointer select-none"
            @click="isMobileFilterOpen = true"
          >
            <Icon name="ph:sliders-horizontal-bold" class="w-4 h-4" />
            <span>Open Filters</span>
            <span
              v-if="activeFiltersCount > 0"
              class="w-4 h-4 rounded-full bg-white text-[#F26A36] font-black text-[10px] flex items-center justify-center ms-0.5"
            >
              {{ activeFiltersCount }}
            </span>
          </button>
        </div>

        <!-- Desktop Filters Sidebar (Left Column, hidden on small screens) -->
        <div
          class="hidden lg:block lg:col-span-4 xl:col-span-3 sticky top-32 z-20"
        >
          <lazy-search-filters-sidebar
            v-model="filters"
            @reset="resetFilters"
          />
        </div>

        <!-- Floating Mobile Filter Trigger Button (always accessible while scrolling) -->
        <div
          class="lg:hidden fixed bottom-5 inset-x-0 flex justify-center z-40 pointer-events-none"
        >
          <button
            type="button"
            class="pointer-events-auto flex items-center gap-2 px-5 py-3 rounded-full bg-[#F26A36] hover:bg-[#E05925] text-white shadow-xl shadow-orange-950/40 font-bold text-xs tracking-wide active:scale-95 transition-all border border-white/20 backdrop-blur-md cursor-pointer"
            @click="isMobileFilterOpen = true"
          >
            <Icon name="ph:sliders-horizontal-bold" class="w-4 h-4" />
            <span>Filters & Sorting</span>
            <span
              v-if="activeFiltersCount > 0"
              class="w-5 h-5 rounded-full bg-white text-[#F26A36] font-black text-[10px] flex items-center justify-center ms-0.5"
            >
              {{ activeFiltersCount }}
            </span>
          </button>
        </div>

        <!-- Mobile Filter Slide-Over Drawer Modal -->
        <ClientOnly>
          <Teleport to="body">
            <div
              v-if="isMobileFilterOpen"
              class="fixed inset-0 z-50 lg:hidden flex flex-col justify-end"
            >
              <!-- Backdrop Overlay -->
              <div
                class="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity cursor-pointer"
                @click="isMobileFilterOpen = false"
              />

              <!-- Bottom Sheet Container -->
              <div
                class="relative w-full max-h-[85vh] bg-surface-1 rounded-t-3xl border-t border-border shadow-2xl flex flex-col z-10 overflow-hidden"
              >
                <!-- Drawer Header -->
                <div
                  class="flex items-center justify-between px-5 py-4 border-b border-border bg-surface-1 shrink-0"
                >
                  <div class="flex items-center gap-2.5">
                    <div
                      class="w-8 h-8 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center"
                    >
                      <Icon name="ph:sliders-horizontal-bold" class="w-4 h-4" />
                    </div>
                    <div>
                      <h3 class="font-bold text-base text-text-primary">
                        Filters & Preferences
                      </h3>
                      <span
                        v-if="activeFiltersCount > 0"
                        class="text-[11px] text-orange-500 font-semibold"
                      >
                        {{ activeFiltersCount }} active filters
                      </span>
                    </div>
                  </div>

                  <!-- Close Button (X) -->
                  <button
                    type="button"
                    class="w-8 h-8 rounded-full bg-surface-2 hover:bg-surface-0 border border-border flex items-center justify-center text-text-primary transition-colors cursor-pointer"
                    aria-label="Close filters"
                    @click="isMobileFilterOpen = false"
                  >
                    <Icon name="ph:x-bold" class="w-4 h-4" />
                  </button>
                </div>

                <!-- Scrollable Filters Body -->
                <div class="flex-1 overflow-y-auto p-4 sm:p-5">
                  <lazy-search-filters-sidebar
                    v-model="filters"
                    @reset="resetFilters"
                    @close="isMobileFilterOpen = false"
                  />
                </div>

                <!-- Sticky Bottom Action Footer -->
                <div
                  class="p-4 border-t border-border bg-surface-1/95 backdrop-blur-md flex items-center gap-3 shrink-0"
                >
                  <LazyVButton
                    variant="surface"
                    size="md"
                    custom-class="w-1/3 text-xs font-semibold"
                    @click="resetFilters"
                  >
                    Reset All
                  </LazyVButton>
                  <LazyVButton
                    variant="primary"
                    size="md"
                    custom-class="w-2/3 text-xs font-bold"
                    @click="isMobileFilterOpen = false"
                  >
                    Show {{ filteredTrips.length }} Buses
                  </LazyVButton>
                </div>
              </div>
            </div>
          </Teleport>
        </ClientOnly>

        <!-- Results List (Right Column) -->
        <div class="lg:col-span-8 xl:col-span-9 flex flex-col gap-4">
          <!-- Results Header & Sorting Bar -->
          <div
            class="bg-surface-1 border border-border rounded-2xl p-4 sm:p-5 shadow-xs text-start"
          >
            <div
              class="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-border/70"
            >
              <div>
                <div class="flex items-center gap-2">
                  <h2 class="text-base sm:text-lg font-black text-text-primary">
                    {{ fromCityFormatted }} → {{ toCityFormatted }}
                  </h2>
                  <span
                    class="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold text-[11px] border border-blue-500/20"
                  >
                    {{ filteredTrips.length }} Buses Available
                  </span>
                </div>
                <p class="text-xs text-text-secondary mt-0.5">
                  Showing
                  <strong class="text-text-primary">{{
                    filteredTrips.length
                  }}</strong>
                  of {{ allTrips.length }} buses • {{ formattedLongDate }}
                </p>
              </div>

              <!-- Ministry Verification Badge -->
              <div
                class="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-xs font-bold bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full"
              >
                <Icon
                  name="ph:seal-check-fill"
                  class="w-4 h-4 text-emerald-500"
                />
                <span>Ministry of Transport Verified</span>
              </div>
            </div>

            <!-- Sorting Pills & Mobile Filter Button -->
            <div class="flex flex-wrap items-center gap-2 pt-3">
              <!-- Mobile Filters Button (Directly in Sort Bar) -->
              <button
                type="button"
                class="lg:hidden px-3.5 py-1.5 rounded-xl bg-[#F26A36] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs active:scale-95 transition-all cursor-pointer select-none"
                @click="isMobileFilterOpen = true"
              >
                <Icon name="ph:sliders-horizontal-bold" class="w-3.5 h-3.5" />
                <span>Filters</span>
                <span
                  v-if="activeFiltersCount > 0"
                  class="w-4 h-4 rounded-full bg-white text-[#F26A36] font-black text-[10px] flex items-center justify-center ms-0.5"
                >
                  {{ activeFiltersCount }}
                </span>
              </button>

              <span
                class="text-xs font-bold text-text-muted me-1 uppercase tracking-wider hidden sm:inline"
                >Sort by:</span
              >

              <button
                type="button"
                :class="[
                  'px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer select-none',
                  filters.sortBy === 'recommended'
                    ? 'bg-[#F26A36] text-white shadow-xs'
                    : 'bg-surface-2 hover:bg-surface-0 text-text-secondary hover:text-text-primary border border-border',
                ]"
                @click="filters.sortBy = 'recommended'"
              >
                Recommended
              </button>

              <button
                type="button"
                :class="[
                  'px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer select-none',
                  filters.sortBy === 'cheapest'
                    ? 'bg-[#F26A36] text-white shadow-xs'
                    : 'bg-surface-2 hover:bg-surface-0 text-text-secondary hover:text-text-primary border border-border',
                ]"
                @click="filters.sortBy = 'cheapest'"
              >
                Cheapest ({{ minPriceFound }} EGP)
              </button>

              <button
                type="button"
                :class="[
                  'px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer select-none',
                  filters.sortBy === 'earliest'
                    ? 'bg-[#F26A36] text-white shadow-xs'
                    : 'bg-surface-2 hover:bg-surface-0 text-text-secondary hover:text-text-primary border border-border',
                ]"
                @click="filters.sortBy = 'earliest'"
              >
                Earliest Departure (06:30)
              </button>

              <button
                type="button"
                :class="[
                  'px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer select-none',
                  filters.sortBy === 'fastest'
                    ? 'bg-[#F26A36] text-white shadow-xs'
                    : 'bg-surface-2 hover:bg-surface-0 text-text-secondary hover:text-text-primary border border-border',
                ]"
                @click="filters.sortBy = 'fastest'"
              >
                Fastest (2h 30m)
              </button>
            </div>
          </div>

          <!-- Trip Cards List -->
          <div v-if="filteredTrips.length > 0" class="flex flex-col gap-3.5">
            <lazy-search-trip-card
              v-for="trip in filteredTrips"
              :key="trip.id"
              :trip="trip"
              @select-seats="goToSeatSelection"
            />
          </div>

          <!-- Empty State / Alternate Window Suggestions -->
          <div
            class="bg-surface-1 border border-border rounded-2xl p-6 sm:p-8 text-center my-2"
          >
            <div
              class="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/20 flex items-center justify-center mx-auto mb-3"
            >
              <Icon name="ph:bus-duotone" class="w-6 h-6" />
            </div>
            <h3 class="text-base sm:text-lg font-bold text-text-primary mb-1">
              Looking for a different departure time?
            </h3>
            <p
              class="text-xs sm:text-sm text-text-secondary max-w-lg mx-auto leading-relaxed mb-4"
            >
              You are currently viewing active search results. 38 additional
              coaches are scheduled throughout the afternoon, evening, and night
              corridors from {{ fromCityFormatted }} to {{ toCityFormatted }}.
            </p>
            <div class="flex flex-wrap items-center justify-center gap-3">
              <LazyVButton
                variant="secondary"
                size="sm"
                @click="showAllCoaches"
              >
                Show All {{ allTrips.length }} Coaches
              </LazyVButton>
              <LazyVButton variant="ghost" size="sm" @click="resetFilters">
                Reset Filters
              </LazyVButton>
            </div>
          </div>

          <!-- Official Guarantee Banner -->
          <lazy-search-guarantee-banner class="mt-2" />
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import type { Trip, FilterState } from "~/types/search/results";

const route = useRoute();
const router = useRouter();

// Route params & slug formatting
const routeSlug = computed(() =>
  route.params.from && route.params.to
    ? `${route.params.from}-${route.params.to}`
    : "cairo-alexandria",
);

const fromCityFormatted = computed(() => {
  const parts = String(route.params.from || "cairo").split("-");
  return parts.map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(" ");
});

const toCityFormatted = computed(() => {
  const parts = String(route.params.to || "alexandria").split("-");
  return parts.map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(" ");
});

const fromStationText = "Ramses, Almaza, Torgoman";
const toStationText = "Moharam Bek, Sidi Gaber";

const currentDate = ref((route.query.date as string) || "2024-10-24");
const isMobileFilterOpen = ref(false);

const formattedLongDate = computed(() => {
  try {
    const [y, m, d] = currentDate.value.split("-").map(Number);
    if (!y || !m || !d) return currentDate.value;
    const dt = new Date(y, m - 1, d);
    return dt.toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return currentDate.value;
  }
});

// Filter initial state
const defaultFilters: FilterState = {
  operators: ["gobus", "bluebus", "superjet"],
  timeSlots: ["morning"],
  busClasses: [],
  maxPrice: 350,
  boardingStations: [],
  dropoffStations: [],
  sortBy: "recommended",
};

const filters = ref<FilterState>({ ...defaultFilters });

const activeFiltersCount = computed(() => {
  let count = 0;
  if (filters.value.operators.length > 0) count++;
  if (filters.value.timeSlots.length > 0) count++;
  if (filters.value.busClasses.length > 0) count++;
  if (filters.value.maxPrice < 450) count++;
  if (filters.value.boardingStations.length > 0) count++;
  if (filters.value.dropoffStations.length > 0) count++;
  return count;
});

const resetFilters = () => {
  filters.value = {
    operators: [],
    timeSlots: [],
    busClasses: [],
    maxPrice: 450,
    boardingStations: [],
    dropoffStations: [],
    sortBy: "recommended",
  };
};

const showAllCoaches = () => {
  resetFilters();
};

const onDateChange = (newDate: string) => {
  currentDate.value = newDate;
  router.push({
    query: { ...route.query, date: newDate },
  });
};

const handleSearchUpdate = (params: {
  from: string;
  to: string;
  date: string;
}) => {
  const fromSlug = params.from.toLowerCase().replace(/\s+/g, "-");
  const toSlug = params.to.toLowerCase().replace(/\s+/g, "-");
  currentDate.value = params.date;
  router.push(`/search/${fromSlug}-${toSlug}?date=${params.date}`);
};

const goToSeatSelection = (trip: Trip) => {
  router.push(`/trip/${trip.id}`);
};

// Comprehensive Dataset matching screenshots
const allTrips = ref<Trip[]>([
  {
    id: "gb-01",
    operatorId: "gobus",
    operatorName: "Go Bus",
    operatorAbbr: "GB",
    operatorLogoBg: "bg-red-950/20 text-red-500 dark:bg-red-900/30",
    busClass: "Elite Plus (MCV 600)",
    busModel: "Mercedes MCV 600 Coach",
    rating: 4.8,
    reviewsCount: 830,
    departureTime: "08:30 AM",
    departureStation: "Almaza Terminal (Heliopolis)",
    departureCity: "Cairo",
    arrivalTime: "11:15 AM",
    arrivalStation: "Sidi Gaber Terminal",
    arrivalCity: "Alexandria",
    duration: "2h 45m",
    routeType: "Non-stop Express",
    routeHighlight: "Direct Highway",
    highwayBadge: "Cairo - Alex Desert Road",
    price: 145,
    availableSeats: 4,
    isDirect: true,
    isVerified: true,
    timeSlot: "morning",
    classType: "vip",
    amenities: [
      { id: "wifi", name: "Wi-Fi", icon: "ph:wifi-high-bold" },
      { id: "usb", name: "USB Power", icon: "ph:plug-bold" },
      { id: "seats", name: "Leather Recliner", icon: "ph:armchair-bold" },
      { id: "drinks", name: "Hot Drinks", icon: "ph:coffee-bold" },
      {
        id: "wc",
        name: "WC",
        icon: "ph:toilet-bold",
        iconClass: "text-emerald-500",
      },
    ],
  },
  {
    id: "bb-01",
    operatorId: "bluebus",
    operatorName: "BlueBus",
    operatorAbbr: "BB",
    operatorLogoBg: "bg-blue-950/20 text-blue-500 dark:bg-blue-900/30",
    busClass: "First Class VIP (2+1)",
    busModel: "Travego 16 SHD • 2+1 Seating",
    rating: 4.9,
    reviewsCount: 410,
    departureTime: "09:15 AM",
    departureStation: "Ramses Central Station",
    departureCity: "Cairo",
    arrivalTime: "11:45 AM",
    arrivalStation: "Moharam Bek Central",
    arrivalCity: "Alexandria",
    duration: "2h 30m",
    routeType: "Non-stop Express",
    routeHighlight: "Fastest Route",
    highwayBadge: "Fastest Express Journey",
    price: 220,
    availableSeats: 9,
    isDirect: true,
    isVerified: true,
    timeSlot: "morning",
    classType: "vip",
    amenities: [
      { id: "screen", name: "Personal Screen", icon: "ph:television-bold" },
      { id: "seats", name: "2+1 Extra Legroom", icon: "ph:armchair-bold" },
      { id: "wifi", name: "5G Wi-Fi", icon: "ph:wifi-high-bold" },
      { id: "drinks", name: "Cold Beverage & Snack", icon: "ph:brandy-bold" },
    ],
  },
  {
    id: "sj-01",
    operatorId: "superjet",
    operatorName: "Super Jet (الاتحاد العربي)",
    operatorAbbr: "SJ",
    operatorLogoBg: "bg-emerald-950/20 text-emerald-500 dark:bg-emerald-900/30",
    busClass: "Super Star AC",
    busModel: "National Bus Fleet • 30kg Luggage",
    rating: 4.7,
    reviewsCount: 620,
    departureTime: "10:00 AM",
    departureStation: "Torgoman Gateway (Downtown)",
    departureCity: "Cairo",
    arrivalTime: "01:00 PM",
    arrivalStation: "Moharam Bek Station",
    arrivalCity: "Alexandria",
    duration: "3h 00m",
    routeType: "Agricultural Highway",
    routeHighlight: "Cheapest Fare",
    highwayBadge: "Direct to Moharam Bek",
    price: 110,
    availableSeats: 18,
    isDirect: true,
    isVerified: true,
    timeSlot: "morning",
    classType: "standard",
    amenities: [
      {
        id: "ac",
        name: "Climate Control AC",
        icon: "ph:snowflake-bold",
        iconClass: "text-cyan-500",
      },
      {
        id: "luggage",
        name: "30kg Checked Free Bags",
        icon: "ph:suitcase-bold",
      },
      { id: "usb", name: "Seat USB", icon: "ph:plug-bold" },
      { id: "light", name: "Reading Lights", icon: "ph:lamp-bold" },
    ],
  },
  {
    id: "gb-02",
    operatorId: "gobus",
    operatorName: "Go Bus",
    operatorAbbr: "GB",
    operatorLogoBg: "bg-amber-950/20 text-amber-500 dark:bg-amber-900/30",
    busClass: "Aero Luxury Bed (Flat Bed)",
    busModel: "Full Lie-Flat Recliners + Premium Lounge",
    rating: 4.9,
    reviewsCount: 390,
    departureTime: "11:30 AM",
    departureStation: "Almaza Lounge (Heliopolis)",
    departureCity: "Cairo",
    arrivalTime: "02:15 PM",
    arrivalStation: "Sidi Gaber Lounge",
    arrivalCity: "Alexandria",
    duration: "2h 45m",
    routeType: "Non-stop VIP",
    routeHighlight: "180° Lie-Flat Beds",
    highwayBadge: "Alex Desert Highway Non-Stop",
    price: 310,
    availableSeats: 2,
    isDirect: true,
    isVerified: true,
    timeSlot: "morning",
    classType: "sleeper",
    amenities: [
      { id: "bed", name: "Full Recline Bed", icon: "ph:bed-bold" },
      { id: "steward", name: "Hostess Service", icon: "ph:user-circle-bold" },
      { id: "meal", name: "Fresh Meal Box", icon: "ph:fork-knife-bold" },
      {
        id: "audio",
        name: "Noise-Cancelling Audio",
        icon: "ph:headphones-bold",
      },
      {
        id: "lounge",
        name: "VIP Lounge Access",
        icon: "ph:crown-bold",
        iconClass: "text-amber-500",
      },
    ],
  },
  {
    id: "bb-02",
    operatorId: "bluebus",
    operatorName: "BlueBus",
    operatorAbbr: "BB",
    operatorLogoBg: "bg-blue-950/20 text-blue-500 dark:bg-blue-900/30",
    busClass: "VIP Royal Comfort",
    busModel: "Mercedes Travego 2024",
    rating: 4.8,
    reviewsCount: 290,
    departureTime: "02:30 PM",
    departureStation: "Ramses Central Station",
    departureCity: "Cairo",
    arrivalTime: "05:00 PM",
    arrivalStation: "Moharam Bek Station",
    arrivalCity: "Alexandria",
    duration: "2h 30m",
    routeType: "Non-stop Express",
    routeHighlight: "Direct Highway",
    highwayBadge: "Cairo - Alex Desert Highway",
    price: 195,
    availableSeats: 12,
    isDirect: true,
    isVerified: true,
    timeSlot: "afternoon",
    classType: "vip",
    amenities: [
      { id: "wifi", name: "5G Wi-Fi", icon: "ph:wifi-high-bold" },
      { id: "usb", name: "USB Power", icon: "ph:plug-bold" },
      { id: "wc", name: "Deluxe Restroom", icon: "ph:toilet-bold" },
    ],
  },
  {
    id: "wd-01",
    operatorId: "westdelta",
    operatorName: "West & Mid Delta",
    operatorAbbr: "WD",
    operatorLogoBg: "bg-purple-950/20 text-purple-500 dark:bg-purple-900/30",
    busClass: "Classic AC Express",
    busModel: "Daewoo Royal Hi-Decker",
    rating: 4.5,
    reviewsCount: 450,
    departureTime: "06:45 PM",
    departureStation: "Torgoman Gateway (Downtown)",
    departureCity: "Cairo",
    arrivalTime: "09:45 PM",
    arrivalStation: "Moharam Bek Terminal",
    arrivalCity: "Alexandria",
    duration: "3h 00m",
    routeType: "Direct Corridor",
    routeHighlight: "Budget Express",
    highwayBadge: "Agricultural Highway",
    price: 100,
    availableSeats: 22,
    isDirect: true,
    isVerified: true,
    timeSlot: "evening",
    classType: "standard",
    amenities: [
      { id: "ac", name: "Air Conditioning", icon: "ph:snowflake-bold" },
      { id: "luggage", name: "Standard Luggage", icon: "ph:suitcase-bold" },
    ],
  },
]);

const minPriceFound = computed(() => {
  if (allTrips.value.length === 0) return 110;
  return Math.min(...allTrips.value.map((t) => t.price));
});

// Dynamic filtering & sorting
const filteredTrips = computed(() => {
  let result = [...allTrips.value];

  // Operator filter
  if (filters.value.operators.length > 0) {
    result = result.filter((t) =>
      filters.value.operators.includes(t.operatorId),
    );
  }

  // Time slot filter
  if (filters.value.timeSlots.length > 0) {
    result = result.filter((t) => filters.value.timeSlots.includes(t.timeSlot));
  }

  // Bus class filter
  if (filters.value.busClasses.length > 0) {
    result = result.filter((t) =>
      filters.value.busClasses.includes(t.classType),
    );
  }

  // Price range
  if (filters.value.maxPrice) {
    result = result.filter((t) => t.price <= filters.value.maxPrice);
  }

  // Boarding station
  if (filters.value.boardingStations.length > 0) {
    result = result.filter((t) =>
      filters.value.boardingStations.some((station) =>
        t.departureStation
          .toLowerCase()
          .includes(station.split(" ")[0].toLowerCase()),
      ),
    );
  }

  // Dropoff station
  if (filters.value.dropoffStations.length > 0) {
    result = result.filter((t) =>
      filters.value.dropoffStations.some((station) =>
        t.arrivalStation
          .toLowerCase()
          .includes(station.split(" ")[0].toLowerCase()),
      ),
    );
  }

  // Sorting
  if (filters.value.sortBy === "cheapest") {
    result.sort((a, b) => a.price - b.price);
  } else if (filters.value.sortBy === "earliest") {
    result.sort((a, b) => a.departureTime.localeCompare(b.departureTime));
  } else if (filters.value.sortBy === "fastest") {
    result.sort((a, b) => a.duration.localeCompare(b.duration));
  } else {
    // Recommended (rating & available seats weighted)
    result.sort((a, b) => b.rating - a.rating);
  }

  return result;
});

useSeo({
  title: `Buses from ${fromCityFormatted.value} to ${toCityFormatted.value}`,
  description: `Compare and book bus tickets from ${fromCityFormatted.value} to ${toCityFormatted.value} for ${formattedLongDate.value}. Licensed operators (Go Bus, BlueBus, Super Jet), live seat selection, and fares from ${minPriceFound.value} EGP.`,
  private: false,
});
</script>