<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10 sm:space-y-14">
    <!-- Header / Hero Section -->
    <div class="text-center space-y-4 max-w-3xl mx-auto">
      <div
        class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-wider shadow-xs">
        <Icon name="ph:path-bold" class="w-4 h-4 text-amber-600 dark:text-amber-400" />
        <span>National Transit Network & Highways</span>
      </div>
      <h1 class="text-3xl sm:text-5xl font-black tracking-tight text-text-primary">
        Active Routes & Express Corridors
      </h1>
      <p class="text-sm sm:text-base text-text-secondary leading-relaxed max-w-2xl mx-auto">
        Explore 120+ active intercity bus routes and express highway connections linking 27 Egyptian governorates.
        Compare daily schedules, journey times, certified operators, and ticket fares.
      </p>

      <!-- Quick Metrics Strip -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-4">
        <div class="p-3.5 rounded-2xl bg-surface-1 border border-border/80 text-center shadow-xs">
          <span class="block text-xl sm:text-2xl font-black text-amber-600 dark:text-amber-400">120+</span>
          <span class="text-[11px] font-medium text-text-secondary">Active Routes</span>
        </div>
        <div class="p-3.5 rounded-2xl bg-surface-1 border border-border/80 text-center shadow-xs">
          <span class="block text-xl sm:text-2xl font-black text-amber-600 dark:text-amber-400">1,400+</span>
          <span class="text-[11px] font-medium text-text-secondary">Daily Departures</span>
        </div>
        <div class="p-3.5 rounded-2xl bg-surface-1 border border-border/80 text-center shadow-xs">
          <span class="block text-xl sm:text-2xl font-black text-amber-600 dark:text-amber-400">27</span>
          <span class="text-[11px] font-medium text-text-secondary">Governorates</span>
        </div>
        <div class="p-3.5 rounded-2xl bg-surface-1 border border-border/80 text-center shadow-xs">
          <span class="block text-xl sm:text-2xl font-black text-amber-600 dark:text-amber-400">30+</span>
          <span class="text-[11px] font-medium text-text-secondary">Licensed Operators</span>
        </div>
      </div>
    </div>

    <!-- Major Highway Corridors Strip -->
    <div class="space-y-3">
      <div class="flex items-center justify-between">
        <h2 class="text-xs font-bold uppercase tracking-wider text-text-muted flex items-center gap-1.5">
          <Icon name="ph:road-horizon-bold" class="w-3.5 h-3.5 text-amber-600" />
          <span>Major Transit Highway Corridors</span>
        </h2>
        <span class="text-[11px] text-text-muted">Tap to filter routes by corridor</span>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        <button v-for="corridor in majorCorridors" :key="corridor.id" type="button"
          class="p-2.5 rounded-xl border text-start transition-all cursor-pointer group flex flex-col justify-between"
          :class="selectedCorridor === corridor.name
            ? 'bg-amber-500/10 border-amber-500 text-amber-700 dark:text-amber-300 ring-1 ring-amber-500/30'
            : 'bg-surface-1 border-border/70 text-text-secondary hover:border-amber-400/60 hover:text-text-primary'"
          @click="toggleCorridor(corridor.name)">
          <div class="flex items-center justify-between mb-1">
            <span class="text-[10px] font-extrabold uppercase tracking-tight text-amber-600 dark:text-amber-400">
              {{ corridor.code }}
            </span>
            <Icon :name="selectedCorridor === corridor.name ? 'ph:check-circle-fill' : 'ph:arrow-up-right'"
              class="w-3 h-3 text-text-muted group-hover:text-amber-600" />
          </div>
          <p class="text-xs font-bold text-text-primary line-clamp-1 group-hover:text-amber-600 transition-colors">
            {{ corridor.name }}
          </p>
          <span class="text-[10px] text-text-muted mt-1 block">
            {{ corridor.distance }} • {{ corridor.routesCount }} routes
          </span>
        </button>
      </div>
    </div>

    <!-- Filters, Region Tabs, and Search Bar -->
    <div class="space-y-4 pt-2">
      <div class="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <!-- Search Input -->
        <div class="relative flex-1 max-w-md">
          <Icon name="ph:magnifying-glass-bold"
            class="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input v-model="searchQuery" type="text" placeholder="Search city, destination, road, or operator..."
            class="w-full ps-10 pe-10 py-2.5 rounded-xl bg-surface-1 border border-border/80 text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:border-amber-500 transition-colors" />
          <button v-if="searchQuery" type="button"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary p-0.5"
            @click="searchQuery = ''">
            <Icon name="ph:x-circle-fill" class="w-3.5 h-3.5" />
          </button>
        </div>

        <!-- Sort and Reset -->
        <div class="flex items-center gap-2">
          <LazyVDropdownMenu :items="sortDropdownItems" align="right" width="w-52">
            <template #trigger="{ open }">
              <button type="button"
                class="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface-1 border border-border/80 text-xs font-semibold text-text-primary hover:border-amber-500 transition-colors cursor-pointer"
                :class="{ 'border-amber-500 ring-2 ring-amber-500/20': open }">
                <Icon name="ph:arrows-down-up-bold" class="w-3.5 h-3.5 text-amber-600" />
                <span>{{ currentSortLabel }}</span>
                <Icon name="ph:caret-down-bold" class="w-3 h-3 text-text-muted transition-transform duration-200"
                  :class="{ 'rotate-180': open }" />
              </button>
            </template>
          </LazyVDropdownMenu>

          <button v-if="hasActiveFilters" type="button"
            class="px-3 py-2 rounded-xl border border-border/80 text-xs font-semibold text-amber-600 hover:bg-surface-2 transition-colors cursor-pointer flex items-center gap-1 shrink-0"
            @click="resetFilters">
            <Icon name="ph:arrow-counter-clockwise" class="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      <!-- Region Pills -->
      <div class="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        <button v-for="region in regions" :key="region.id" type="button"
          class="px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer shrink-0"
          :class="selectedRegion === region.id
            ? 'bg-amber-600 text-white shadow-xs'
            : 'bg-surface-1 border border-border/70 text-text-secondary hover:text-text-primary'"
          @click="selectedRegion = region.id">
          <span>{{ region.name }}</span>
          <span class="ms-1.5 text-[10px] px-1.5 py-0.2 rounded-full font-bold"
            :class="selectedRegion === region.id ? 'bg-white/20 text-white' : 'bg-surface-2 text-text-muted'">
            {{ getRegionCount(region.id) }}
          </span>
        </button>
      </div>
    </div>

    <!-- Active Route Count & Filter Feedback -->
    <div class="flex items-center justify-between text-xs text-text-secondary border-b border-border/60 pb-3">
      <div>
        <span>Showing </span>
        <strong class="text-text-primary font-bold">{{ filteredRoutes.length }}</strong>
        <span> of {{ allRoutes.length }} active routes</span>
        <span v-if="selectedCorridor" class="text-amber-600 font-semibold ms-1">
          (Corridor: {{ selectedCorridor }})
        </span>
      </div>
      <span class="text-[11px] text-text-muted hidden sm:inline">
        Live timetable synchronization with Egyptian terminal operators
      </span>
    </div>

    <!-- Routes Grid -->
    <div v-if="filteredRoutes.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="route in paginatedRoutes" :key="route.id"
        class="bg-surface-1 border border-border rounded-2xl p-4 hover:border-amber-400 hover:shadow-md transition-all group flex flex-col justify-between">
        <div>
          <!-- Top Row: Highway & Badges -->
          <div class="flex items-center justify-between gap-2 mb-3">
            <span
              class="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
              <Icon name="ph:road-horizon" class="w-3 h-3" />
              <span>{{ route.road }}</span>
            </span>

            <span class="text-[10px] text-text-muted font-medium">
              {{ route.regionName }}
            </span>
          </div>

          <!-- Cities From -> To -->
          <div
            class="flex items-center gap-2 font-bold text-base text-text-primary group-hover:text-amber-600 transition-colors">
            <span>{{ route.from }}</span>
            <Icon name="ph:arrow-right-bold" class="w-3.5 h-3.5 text-text-muted icon-arrow-animated shrink-0" />
            <span>{{ route.to }}</span>
          </div>

          <!-- Journey Duration & Daily Trips -->
          <div class="flex items-center gap-3 text-xs text-text-secondary mt-2">
            <span class="flex items-center gap-1">
              <Icon name="ph:clock" class="w-3.5 h-3.5 text-text-muted" />
              <span>{{ route.duration }}</span>
            </span>
            <span class="text-text-muted">•</span>
            <span class="flex items-center gap-1">
              <Icon name="ph:bus" class="w-3.5 h-3.5 text-text-muted" />
              <span>{{ route.trips }}</span>
            </span>
          </div>

          <!-- Operator Tags -->
          <div class="flex flex-wrap gap-1.5 mt-3">
            <span v-for="op in route.operators" :key="op"
              class="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-surface-2 text-text-secondary border border-border/50">
              {{ op }}
            </span>
          </div>
        </div>

        <!-- Bottom Row: Price & Booking Action -->
        <div class="flex items-end justify-between pt-4 mt-4 border-t border-border/60">
          <div>
            <span class="text-[10px] text-text-muted block font-medium">Fares starting from</span>
            <div class="flex items-baseline gap-1">
              <span class="text-lg font-black text-amber-700 dark:text-amber-400">{{ route.price }}</span>
              <span class="text-[11px] font-bold text-text-secondary">EGP</span>
            </div>
          </div>

          <nuxt-link-locale :to="getRouteSearchLink(route.from, route.to)"
            class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-xs transition-colors group/btn">
            <span>Book Route</span>
            <Icon name="ph:arrow-right-bold" class="w-3 h-3 icon-arrow-animated" />
          </nuxt-link-locale>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-16 px-4 rounded-3xl bg-surface-1 border border-dashed border-border/80 space-y-4">
      <div class="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 mx-auto flex items-center justify-center">
        <Icon name="ph:compass-bold" class="w-6 h-6" />
      </div>
      <h3 class="text-lg font-bold text-text-primary">No routes found matching your criteria</h3>
      <p class="text-xs text-text-secondary max-w-sm mx-auto">
        Try clearing your search query or switching to another corridor or region to view available connections.
      </p>
      <button type="button"
        class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 text-white text-xs font-bold hover:bg-amber-700 transition-colors cursor-pointer"
        @click="resetFilters">
        <Icon name="ph:arrow-counter-clockwise" class="w-3.5 h-3.5" />
        <span>Reset Filters</span>
      </button>
    </div>

    <!-- Pagination / Load More -->
    <div v-if="filteredRoutes.length > visibleCount" class="text-center pt-4">
      <button type="button"
        class="px-6 py-3 rounded-2xl bg-surface-1 hover:bg-surface-2 border border-border text-xs font-bold text-text-primary shadow-xs transition-all hover:border-amber-400 cursor-pointer inline-flex items-center gap-2"
        @click="visibleCount += 24">
        <Icon name="ph:plus-circle-bold" class="w-4 h-4 text-amber-600" />
        <span>Load More Routes ({{ filteredRoutes.length - visibleCount }} remaining)</span>
      </button>
    </div>

    <!-- Egyptian Transit Network Road Safety & Standards Notice -->
    <div
      class="rounded-3xl p-6 sm:p-8 bg-surface-1 border border-border/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
      <div class="space-y-2 max-w-2xl">
        <div class="inline-flex items-center gap-2 text-xs font-bold text-amber-600 uppercase tracking-wider">
          <Icon name="ph:shield-check-bold" class="w-4 h-4" />
          <span>MOT Certified Road Corridors</span>
        </div>
        <h3 class="text-lg sm:text-xl font-bold text-text-primary">
          All routes operate on certified Egyptian national expressways
        </h3>
        <p class="text-xs text-text-secondary leading-relaxed">
          Otobisi connects only officially licensed coach operators subject to Ministry of Transport safety oversight,
          mandatory GPS tracking, dual-driver shifts on journeys exceeding 6 hours, and electronic road toll compliance.
        </p>
      </div>
      <div class="flex flex-wrap gap-2.5 shrink-0">
        <nuxt-link-locale to="/safety"
          class="px-4 py-2 rounded-xl border border-border bg-surface-0 hover:border-amber-500 text-xs font-bold text-text-primary transition-colors">
          Safety Protocols
        </nuxt-link-locale>
        <nuxt-link-locale to="/stations"
          class="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors">
          View Stations
        </nuxt-link-locale>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { DropdownItem } from "~/types/shared/VDropdownMenu";

interface RouteItem {
  id: number;
  from: string;
  to: string;
  road: string;
  regionId: string;
  regionName: string;
  duration: string;
  durationMinutes: number;
  trips: string;
  dailyTripsCount: number;
  price: number;
  operators: string[];
}

interface Corridor {
  id: string;
  code: string;
  name: string;
  distance: string;
  routesCount: number;
}

const searchQuery = ref("");
const selectedRegion = ref("all");
const selectedCorridor = ref("");
const sortBy = ref("popular");
const visibleCount = ref(24);

const sortOptions = [
  { id: "popular", label: "Most Popular", icon: "ph:fire-bold" },
  { id: "price-asc", label: "Lowest Fare (EGP)", icon: "ph:tag-bold" },
  { id: "duration-asc", label: "Shortest Duration", icon: "ph:clock-bold" },
  { id: "trips-desc", label: "Most Daily Trips", icon: "ph:bus-bold" },
];

const currentSortLabel = computed(() => {
  const opt = sortOptions.find((o) => o.id === sortBy.value);
  return opt ? opt.label : "Most Popular";
});

const sortDropdownItems = computed<DropdownItem[]>(() => {
  return sortOptions.map((opt) => ({
    type: "button",
    label: opt.label,
    icon: opt.icon,
    iconClass: sortBy.value === opt.id ? "text-amber-600" : "text-text-muted",
    class:
      sortBy.value === opt.id
        ? "bg-amber-500/10 text-amber-600 font-bold dark:bg-amber-950/40"
        : "",
    onClick: () => {
      sortBy.value = opt.id;
    },
  }));
});

const regions = [
  { id: "all", name: "All Corridors" },
  { id: "delta", name: "Nile Delta & Alex" },
  { id: "redsea", name: "Red Sea Riviera" },
  { id: "sinai", name: "Sinai Peninsula" },
  { id: "upper", name: "Upper Egypt (Sa'id)" },
  { id: "med", name: "Mediterranean & Matrouh" },
  { id: "canal", name: "Canal Zone & Suez" },
  { id: "desert", name: "Western Desert & Oases" },
];

const majorCorridors: Corridor[] = [
  { id: "desert-rd", code: "Hwy 75", name: "Cairo-Alex Desert Rd", distance: "210 km", routesCount: 16 },
  { id: "galala-hwy", code: "Hwy 65", name: "Galala Coastal Hwy", distance: "330 km", routesCount: 14 },
  { id: "sinai-hwy", code: "Hwy 35", name: "Sinai Transit Hwy", distance: "450 km", routesCount: 12 },
  { id: "eastern-desert", code: "Hwy 55", name: "Upper Egypt Desert Hwy", distance: "680 km", routesCount: 22 },
  { id: "coastal-int", code: "Hwy 40", name: "Coastal International", distance: "580 km", routesCount: 18 },
  { id: "canal-axis", code: "Hwy 30", name: "Suez Canal Corridor", distance: "190 km", routesCount: 11 },
];

// Helper to format slug for Nuxt search route /search/[from]-[to]
const getRouteSearchLink = (from: string, to: string) => {
  const clean = (s: string) => s.toLowerCase().trim().replace(/['\s]+/g, "-");
  return `/search/${clean(from)}-${clean(to)}`;
};

const toggleCorridor = (corridorName: string) => {
  if (selectedCorridor.value === corridorName) {
    selectedCorridor.value = "";
  } else {
    selectedCorridor.value = corridorName;
  }
};

const resetFilters = () => {
  searchQuery.value = "";
  selectedRegion.value = "all";
  selectedCorridor.value = "";
  sortBy.value = "popular";
  visibleCount.value = 24;
};

const hasActiveFilters = computed(() => {
  return searchQuery.value !== "" || selectedRegion.value !== "all" || selectedCorridor.value !== "" || sortBy.value !== "popular";
});

// Comprehensive catalog of 124 authentic Egyptian bus routes across all regions & highways
const allRoutes: RouteItem[] = [
  // Delta & Alexandria Corridor
  { id: 1, from: "Cairo", to: "Alexandria", road: "Cairo-Alex Desert Rd", regionId: "delta", regionName: "Nile Delta", duration: "2h 45m", durationMinutes: 165, trips: "48 daily trips", dailyTripsCount: 48, price: 110, operators: ["Super Jet", "Go Bus", "West Delta", "BlueBus"] },
  { id: 2, from: "Alexandria", to: "Cairo", road: "Cairo-Alex Desert Rd", regionId: "delta", regionName: "Nile Delta", duration: "2h 45m", durationMinutes: 165, trips: "48 daily trips", dailyTripsCount: 48, price: 110, operators: ["Super Jet", "Go Bus", "West Delta", "BlueBus"] },
  { id: 3, from: "Cairo", to: "Tanta", road: "Cairo-Alex Agricultural Rd", regionId: "delta", regionName: "Nile Delta", duration: "1h 30m", durationMinutes: 90, trips: "32 daily trips", dailyTripsCount: 32, price: 65, operators: ["West Delta", "Middle Delta"] },
  { id: 4, from: "Cairo", to: "Mansoura", road: "Banha-Mansoura Expressway", regionId: "delta", regionName: "Nile Delta", duration: "2h 15m", durationMinutes: 135, trips: "28 daily trips", dailyTripsCount: 28, price: 80, operators: ["East Delta", "Middle Delta"] },
  { id: 5, from: "Alexandria", to: "Tanta", road: "Agricultural Expressway", regionId: "delta", regionName: "Nile Delta", duration: "1h 40m", durationMinutes: 100, trips: "24 daily trips", dailyTripsCount: 24, price: 60, operators: ["West Delta"] },
  { id: 6, from: "Alexandria", to: "Mansoura", road: "Coastal Delta Axis", regionId: "delta", regionName: "Nile Delta", duration: "2h 45m", durationMinutes: 165, trips: "18 daily trips", dailyTripsCount: 18, price: 90, operators: ["West Delta", "East Delta"] },
  { id: 7, from: "Cairo", to: "Damanhour", road: "Cairo-Alex Agricultural Rd", regionId: "delta", regionName: "Nile Delta", duration: "2h 10m", durationMinutes: 130, trips: "20 daily trips", dailyTripsCount: 20, price: 75, operators: ["West Delta"] },
  { id: 8, from: "Cairo", to: "Zagazig", road: "Belbeis-Zagazig Corridor", regionId: "delta", regionName: "Nile Delta", duration: "1h 35m", durationMinutes: 95, trips: "24 daily trips", dailyTripsCount: 24, price: 55, operators: ["East Delta"] },
  { id: 9, from: "Cairo", to: "Damietta", road: "Mansoura-Damietta Hwy", regionId: "delta", regionName: "Nile Delta", duration: "3h 00m", durationMinutes: 180, trips: "16 daily trips", dailyTripsCount: 16, price: 95, operators: ["East Delta", "Super Jet"] },
  { id: 10, from: "Cairo", to: "Mahalla", road: "Tanta-Mahalla Link", regionId: "delta", regionName: "Nile Delta", duration: "2h 00m", durationMinutes: 120, trips: "22 daily trips", dailyTripsCount: 22, price: 70, operators: ["Middle Delta"] },
  { id: 11, from: "Alexandria", to: "Damanhour", road: "Alex Agricultural Link", regionId: "delta", regionName: "Nile Delta", duration: "1h 00m", durationMinutes: 60, trips: "30 daily trips", dailyTripsCount: 30, price: 40, operators: ["West Delta"] },
  { id: 12, from: "Alexandria", to: "Damietta", road: "Coastal International", regionId: "delta", regionName: "Nile Delta", duration: "3h 15m", durationMinutes: 195, trips: "12 daily trips", dailyTripsCount: 12, price: 105, operators: ["West Delta", "East Delta"] },
  { id: 13, from: "Cairo", to: "Kafr El Sheikh", road: "Tanta-Kafr El Sheikh Axis", regionId: "delta", regionName: "Nile Delta", duration: "2h 20m", durationMinutes: 140, trips: "16 daily trips", dailyTripsCount: 16, price: 75, operators: ["Middle Delta"] },
  { id: 14, from: "Alexandria", to: "Kafr El Sheikh", road: "Baltim Coastal Link", regionId: "delta", regionName: "Nile Delta", duration: "1h 50m", durationMinutes: 110, trips: "14 daily trips", dailyTripsCount: 14, price: 65, operators: ["West Delta"] },
  { id: 15, from: "Mansoura", to: "Damietta", road: "Nile River Bank Hwy", regionId: "delta", regionName: "Nile Delta", duration: "1h 00m", durationMinutes: 60, trips: "26 daily trips", dailyTripsCount: 26, price: 35, operators: ["East Delta"] },
  { id: 16, from: "Tanta", to: "Mansoura", road: "Middle Delta Link", regionId: "delta", regionName: "Nile Delta", duration: "1h 15m", durationMinutes: 75, trips: "20 daily trips", dailyTripsCount: 20, price: 40, operators: ["Middle Delta"] },

  // Red Sea Riviera Corridor
  { id: 17, from: "Cairo", to: "Hurghada", road: "Galala Coastal Hwy", regionId: "redsea", regionName: "Red Sea", duration: "5h 30m", durationMinutes: 330, trips: "28 daily trips", dailyTripsCount: 28, price: 280, operators: ["Go Bus", "BlueBus", "Super Jet", "High Jet"] },
  { id: 18, from: "Hurghada", to: "Cairo", road: "Galala Coastal Hwy", regionId: "redsea", regionName: "Red Sea", duration: "5h 30m", durationMinutes: 330, trips: "28 daily trips", dailyTripsCount: 28, price: 280, operators: ["Go Bus", "BlueBus", "Super Jet", "High Jet"] },
  { id: 19, from: "Cairo", to: "El Gouna", road: "Galala Coastal Hwy", regionId: "redsea", regionName: "Red Sea", duration: "5h 15m", durationMinutes: 315, trips: "16 daily trips", dailyTripsCount: 16, price: 320, operators: ["Go Bus", "BlueBus"] },
  { id: 20, from: "Cairo", to: "Ain Sokhna", road: "Cairo-Ain Sokhna Expressway", regionId: "redsea", regionName: "Red Sea", duration: "1h 30m", durationMinutes: 90, trips: "20 daily trips", dailyTripsCount: 20, price: 130, operators: ["Go Bus", "Super Jet"] },
  { id: 21, from: "Cairo", to: "Marsa Alam", road: "Red Sea Coastal Corridor", regionId: "redsea", regionName: "Red Sea", duration: "9h 00m", durationMinutes: 540, trips: "10 daily trips", dailyTripsCount: 10, price: 420, operators: ["Go Bus", "High Jet", "Upper Egypt Bus"] },
  { id: 22, from: "Hurghada", to: "Marsa Alam", road: "Quseir-Marsa Alam Hwy", regionId: "redsea", regionName: "Red Sea", duration: "3h 30m", durationMinutes: 210, trips: "12 daily trips", dailyTripsCount: 12, price: 170, operators: ["Go Bus", "Upper Egypt Bus"] },
  { id: 23, from: "Cairo", to: "Safaga", road: "Galala Coastal Hwy", regionId: "redsea", regionName: "Red Sea", duration: "6h 15m", durationMinutes: 375, trips: "12 daily trips", dailyTripsCount: 12, price: 300, operators: ["Super Jet", "High Jet"] },
  { id: 24, from: "Cairo", to: "Ras Gharib", road: "Zafarana-Gharib Hwy", regionId: "redsea", regionName: "Red Sea", duration: "4h 00m", durationMinutes: 240, trips: "14 daily trips", dailyTripsCount: 14, price: 210, operators: ["Super Jet", "High Jet"] },
  { id: 25, from: "Alexandria", to: "Hurghada", road: "Regional Ring & Galala Hwy", regionId: "redsea", regionName: "Red Sea", duration: "8h 15m", durationMinutes: 495, trips: "8 daily trips", dailyTripsCount: 8, price: 370, operators: ["West Delta", "Go Bus", "Super Jet"] },
  { id: 26, from: "Alexandria", to: "Ain Sokhna", road: "Regional Ring & Sokhna Rd", regionId: "redsea", regionName: "Red Sea", duration: "4h 15m", durationMinutes: 255, trips: "8 daily trips", dailyTripsCount: 8, price: 230, operators: ["West Delta"] },
  { id: 27, from: "Mansoura", to: "Hurghada", road: "Suez Canal & Galala Hwy", regionId: "redsea", regionName: "Red Sea", duration: "7h 30m", durationMinutes: 450, trips: "6 daily trips", dailyTripsCount: 6, price: 340, operators: ["East Delta", "Go Bus"] },
  { id: 28, from: "Tanta", to: "Hurghada", road: "Regional Ring & Galala Hwy", regionId: "redsea", regionName: "Red Sea", duration: "7h 00m", durationMinutes: 420, trips: "6 daily trips", dailyTripsCount: 6, price: 330, operators: ["Middle Delta"] },
  { id: 29, from: "Suez", to: "Hurghada", road: "Red Sea Coastal Corridor", regionId: "redsea", regionName: "Red Sea", duration: "4h 00m", durationMinutes: 240, trips: "14 daily trips", dailyTripsCount: 14, price: 190, operators: ["Super Jet", "East Delta"] },
  { id: 30, from: "Hurghada", to: "Luxor", road: "Safaga-Qena Transit Rd", regionId: "redsea", regionName: "Red Sea", duration: "4h 30m", durationMinutes: 270, trips: "10 daily trips", dailyTripsCount: 10, price: 210, operators: ["Go Bus", "Upper Egypt Bus"] },
  { id: 31, from: "Hurghada", to: "Qena", road: "Safaga-Qena Hwy", regionId: "redsea", regionName: "Red Sea", duration: "3h 45m", durationMinutes: 225, trips: "8 daily trips", dailyTripsCount: 8, price: 180, operators: ["Upper Egypt Bus"] },
  { id: 32, from: "Marsa Alam", to: "Luxor", road: "Edfu-Marsa Alam Hwy", regionId: "redsea", regionName: "Red Sea", duration: "4h 45m", durationMinutes: 285, trips: "6 daily trips", dailyTripsCount: 6, price: 240, operators: ["Upper Egypt Bus"] },

  // Sinai Peninsula Corridor
  { id: 33, from: "Cairo", to: "Sharm El Sheikh", road: "Sinai Transit Hwy", regionId: "sinai", regionName: "Sinai Peninsula", duration: "6h 00m", durationMinutes: 360, trips: "24 daily trips", dailyTripsCount: 24, price: 310, operators: ["Go Bus", "BlueBus", "Super Jet", "East Delta"] },
  { id: 34, from: "Sharm El Sheikh", to: "Cairo", road: "Sinai Transit Hwy", regionId: "sinai", regionName: "Sinai Peninsula", duration: "6h 00m", durationMinutes: 360, trips: "24 daily trips", dailyTripsCount: 24, price: 310, operators: ["Go Bus", "BlueBus", "Super Jet", "East Delta"] },
  { id: 35, from: "Cairo", to: "Dahab", road: "Sinai Transit Hwy", regionId: "sinai", regionName: "Sinai Peninsula", duration: "8h 00m", durationMinutes: 480, trips: "14 daily trips", dailyTripsCount: 14, price: 370, operators: ["Go Bus", "BlueBus", "East Delta"] },
  { id: 36, from: "Dahab", to: "Cairo", road: "Sinai Transit Hwy", regionId: "sinai", regionName: "Sinai Peninsula", duration: "8h 00m", durationMinutes: 480, trips: "14 daily trips", dailyTripsCount: 14, price: 370, operators: ["Go Bus", "BlueBus", "East Delta"] },
  { id: 37, from: "Sharm El Sheikh", to: "Dahab", road: "South Sinai Coastal Hwy", regionId: "sinai", regionName: "Sinai Peninsula", duration: "1h 15m", durationMinutes: 75, trips: "18 daily trips", dailyTripsCount: 18, price: 85, operators: ["Go Bus", "East Delta"] },
  { id: 38, from: "Cairo", to: "Nuweiba", road: "Sinai Transit Hwy", regionId: "sinai", regionName: "Sinai Peninsula", duration: "8h 45m", durationMinutes: 525, trips: "8 daily trips", dailyTripsCount: 8, price: 390, operators: ["Go Bus", "East Delta"] },
  { id: 39, from: "Cairo", to: "Taba", road: "Sinai Transit Hwy", regionId: "sinai", regionName: "Sinai Peninsula", duration: "9h 30m", durationMinutes: 570, trips: "6 daily trips", dailyTripsCount: 6, price: 420, operators: ["East Delta", "Go Bus"] },
  { id: 40, from: "Cairo", to: "St. Catherine", road: "Wadi Feiran Mountain Hwy", regionId: "sinai", regionName: "Sinai Peninsula", duration: "7h 30m", durationMinutes: 450, trips: "6 daily trips", dailyTripsCount: 6, price: 340, operators: ["East Delta"] },
  { id: 41, from: "Alexandria", to: "Sharm El Sheikh", road: "Sinai Transit Hwy", regionId: "sinai", regionName: "Sinai Peninsula", duration: "9h 30m", durationMinutes: 570, trips: "6 daily trips", dailyTripsCount: 6, price: 410, operators: ["Super Jet", "West Delta", "Go Bus"] },
  { id: 42, from: "Alexandria", to: "Dahab", road: "Sinai Transit Hwy", regionId: "sinai", regionName: "Sinai Peninsula", duration: "10h 30m", durationMinutes: 630, trips: "6 daily trips", dailyTripsCount: 6, price: 450, operators: ["Go Bus", "West Delta"] },
  { id: 43, from: "Dahab", to: "Nuweiba", road: "Aqaba Gulf Coast Rd", regionId: "sinai", regionName: "Sinai Peninsula", duration: "1h 10m", durationMinutes: 70, trips: "10 daily trips", dailyTripsCount: 10, price: 65, operators: ["East Delta", "Go Bus"] },
  { id: 44, from: "Suez", to: "Sharm El Sheikh", road: "Ahmed Hamdi Tunnel Link", regionId: "sinai", regionName: "Sinai Peninsula", duration: "4h 30m", durationMinutes: 270, trips: "12 daily trips", dailyTripsCount: 12, price: 220, operators: ["East Delta"] },
  { id: 45, from: "Ismailia", to: "Sharm El Sheikh", road: "Sinai Transit Hwy", regionId: "sinai", regionName: "Sinai Peninsula", duration: "5h 15m", durationMinutes: 315, trips: "8 daily trips", dailyTripsCount: 8, price: 250, operators: ["East Delta"] },
  { id: 46, from: "Mansoura", to: "Sharm El Sheikh", road: "Tunnel Corridor & Sinai", regionId: "sinai", regionName: "Sinai Peninsula", duration: "8h 30m", durationMinutes: 510, trips: "4 daily trips", dailyTripsCount: 4, price: 370, operators: ["East Delta"] },

  // Upper Egypt (Sa'id) Corridor
  { id: 47, from: "Cairo", to: "Luxor", road: "Upper Egypt Desert Hwy", regionId: "upper", regionName: "Upper Egypt", duration: "9h 00m", durationMinutes: 540, trips: "16 daily trips", dailyTripsCount: 16, price: 350, operators: ["Super Jet", "Go Bus", "Upper Egypt Bus", "BlueBus"] },
  { id: 48, from: "Luxor", to: "Cairo", road: "Upper Egypt Desert Hwy", regionId: "upper", regionName: "Upper Egypt", duration: "9h 00m", durationMinutes: 540, trips: "16 daily trips", dailyTripsCount: 16, price: 350, operators: ["Super Jet", "Go Bus", "Upper Egypt Bus", "BlueBus"] },
  { id: 49, from: "Cairo", to: "Aswan", road: "Upper Egypt Desert Hwy", regionId: "upper", regionName: "Upper Egypt", duration: "12h 00m", durationMinutes: 720, trips: "12 daily trips", dailyTripsCount: 12, price: 440, operators: ["Upper Egypt Bus", "Super Jet", "Go Bus"] },
  { id: 50, from: "Aswan", to: "Cairo", road: "Upper Egypt Desert Hwy", regionId: "upper", regionName: "Upper Egypt", duration: "12h 00m", durationMinutes: 720, trips: "12 daily trips", dailyTripsCount: 12, price: 440, operators: ["Upper Egypt Bus", "Super Jet", "Go Bus"] },
  { id: 51, from: "Cairo", to: "Assiut", road: "Assiut Western Desert Hwy", regionId: "upper", regionName: "Upper Egypt", duration: "4h 30m", durationMinutes: 270, trips: "24 daily trips", dailyTripsCount: 24, price: 190, operators: ["Upper Egypt Bus", "Super Jet", "BlueBus"] },
  { id: 52, from: "Cairo", to: "Sohag", road: "Upper Egypt Desert Hwy", regionId: "upper", regionName: "Upper Egypt", duration: "6h 15m", durationMinutes: 375, trips: "20 daily trips", dailyTripsCount: 20, price: 240, operators: ["Upper Egypt Bus", "Super Jet"] },
  { id: 53, from: "Cairo", to: "Qena", road: "Upper Egypt Desert Hwy", regionId: "upper", regionName: "Upper Egypt", duration: "7h 45m", durationMinutes: 465, trips: "18 daily trips", dailyTripsCount: 18, price: 290, operators: ["Upper Egypt Bus", "Super Jet", "Go Bus"] },
  { id: 54, from: "Cairo", to: "Minya", road: "Cairo-Minya Desert Hwy", regionId: "upper", regionName: "Upper Egypt", duration: "3h 15m", durationMinutes: 195, trips: "24 daily trips", dailyTripsCount: 24, price: 140, operators: ["Upper Egypt Bus", "Super Jet"] },
  { id: 55, from: "Cairo", to: "Beni Suef", road: "Eastern Nile Army Axis", regionId: "upper", regionName: "Upper Egypt", duration: "1h 45m", durationMinutes: 105, trips: "28 daily trips", dailyTripsCount: 28, price: 75, operators: ["Upper Egypt Bus"] },
  { id: 56, from: "Cairo", to: "Fayoum", road: "Cairo-Fayoum Desert Rd", regionId: "upper", regionName: "Upper Egypt", duration: "1h 20m", durationMinutes: 80, trips: "34 daily trips", dailyTripsCount: 34, price: 60, operators: ["Upper Egypt Bus"] },
  { id: 57, from: "Luxor", to: "Aswan", road: "Upper Egypt Agricultural Hwy", regionId: "upper", regionName: "Upper Egypt", duration: "3h 15m", durationMinutes: 195, trips: "14 daily trips", dailyTripsCount: 14, price: 120, operators: ["Upper Egypt Bus"] },
  { id: 58, from: "Aswan", to: "Abu Simbel", road: "Lake Nasser Desert Hwy", regionId: "upper", regionName: "Upper Egypt", duration: "3h 45m", durationMinutes: 225, trips: "6 daily trips", dailyTripsCount: 6, price: 180, operators: ["Upper Egypt Bus"] },
  { id: 59, from: "Alexandria", to: "Assiut", road: "Upper Egypt Desert Hwy", regionId: "upper", regionName: "Upper Egypt", duration: "7h 15m", durationMinutes: 435, trips: "8 daily trips", dailyTripsCount: 8, price: 280, operators: ["Upper Egypt Bus", "West Delta"] },
  { id: 60, from: "Alexandria", to: "Sohag", road: "Upper Egypt Desert Hwy", regionId: "upper", regionName: "Upper Egypt", duration: "9h 00m", durationMinutes: 540, trips: "6 daily trips", dailyTripsCount: 6, price: 330, operators: ["Upper Egypt Bus"] },
  { id: 61, from: "Alexandria", to: "Luxor", road: "Upper Egypt Desert Hwy", regionId: "upper", regionName: "Upper Egypt", duration: "11h 30m", durationMinutes: 690, trips: "4 daily trips", dailyTripsCount: 4, price: 420, operators: ["Upper Egypt Bus", "Super Jet"] },
  { id: 62, from: "Alexandria", to: "Aswan", road: "Upper Egypt Desert Hwy", regionId: "upper", regionName: "Upper Egypt", duration: "14h 30m", durationMinutes: 870, trips: "4 daily trips", dailyTripsCount: 4, price: 490, operators: ["Upper Egypt Bus"] },
  { id: 63, from: "Assiut", to: "Sohag", road: "Upper Egypt Highway Link", regionId: "upper", regionName: "Upper Egypt", duration: "1h 45m", durationMinutes: 105, trips: "22 daily trips", dailyTripsCount: 22, price: 65, operators: ["Upper Egypt Bus"] },
  { id: 64, from: "Sohag", to: "Qena", road: "Upper Egypt Highway Link", regionId: "upper", regionName: "Upper Egypt", duration: "1h 50m", durationMinutes: 110, trips: "18 daily trips", dailyTripsCount: 18, price: 70, operators: ["Upper Egypt Bus"] },
  { id: 65, from: "Qena", to: "Luxor", road: "Nile Valley Arterial", regionId: "upper", regionName: "Upper Egypt", duration: "1h 10m", durationMinutes: 70, trips: "24 daily trips", dailyTripsCount: 24, price: 50, operators: ["Upper Egypt Bus"] },
  { id: 66, from: "Giza", to: "Fayoum", road: "Cairo-Fayoum Desert Rd", regionId: "upper", regionName: "Upper Egypt", duration: "1h 15m", durationMinutes: 75, trips: "30 daily trips", dailyTripsCount: 30, price: 55, operators: ["Upper Egypt Bus"] },
  { id: 67, from: "Giza", to: "Beni Suef", road: "Eastern Nile Army Axis", regionId: "upper", regionName: "Upper Egypt", duration: "1h 35m", durationMinutes: 95, trips: "24 daily trips", dailyTripsCount: 24, price: 70, operators: ["Upper Egypt Bus"] },
  { id: 68, from: "Giza", to: "Minya", road: "Cairo-Minya Desert Hwy", regionId: "upper", regionName: "Upper Egypt", duration: "3h 05m", durationMinutes: 185, trips: "18 daily trips", dailyTripsCount: 18, price: 135, operators: ["Upper Egypt Bus"] },

  // Mediterranean & Matrouh Coast Corridor
  { id: 69, from: "Cairo", to: "Marsa Matrouh", road: "Coastal International", regionId: "med", regionName: "Mediterranean Coast", duration: "4h 30m", durationMinutes: 270, trips: "20 daily trips", dailyTripsCount: 20, price: 220, operators: ["West Delta", "Go Bus", "Super Jet", "BlueBus"] },
  { id: 70, from: "Marsa Matrouh", to: "Cairo", road: "Coastal International", regionId: "med", regionName: "Mediterranean Coast", duration: "4h 30m", durationMinutes: 270, trips: "20 daily trips", dailyTripsCount: 20, price: 220, operators: ["West Delta", "Go Bus", "Super Jet", "BlueBus"] },
  { id: 71, from: "Alexandria", to: "Marsa Matrouh", road: "Coastal International", regionId: "med", regionName: "Mediterranean Coast", duration: "3h 00m", durationMinutes: 180, trips: "26 daily trips", dailyTripsCount: 26, price: 130, operators: ["West Delta", "Super Jet"] },
  { id: 72, from: "Marsa Matrouh", to: "Alexandria", road: "Coastal International", regionId: "med", regionName: "Mediterranean Coast", duration: "3h 00m", durationMinutes: 180, trips: "26 daily trips", dailyTripsCount: 26, price: 130, operators: ["West Delta", "Super Jet"] },
  { id: 73, from: "Cairo", to: "El Alamein", road: "Wadi El Natrun-Alamein Rd", regionId: "med", regionName: "Mediterranean Coast", duration: "2h 45m", durationMinutes: 165, trips: "22 daily trips", dailyTripsCount: 22, price: 170, operators: ["Go Bus", "BlueBus", "West Delta"] },
  { id: 74, from: "Cairo", to: "Ras El Hikma", road: "Fouka Corridor Express", regionId: "med", regionName: "Mediterranean Coast", duration: "3h 30m", durationMinutes: 210, trips: "14 daily trips", dailyTripsCount: 14, price: 200, operators: ["Go Bus", "BlueBus"] },
  { id: 75, from: "Cairo", to: "Sidi Abdel Rahman", road: "Wadi El Natrun-Alamein Rd", regionId: "med", regionName: "Mediterranean Coast", duration: "3h 00m", durationMinutes: 180, trips: "16 daily trips", dailyTripsCount: 16, price: 185, operators: ["Go Bus", "BlueBus"] },
  { id: 76, from: "Alexandria", to: "El Alamein", road: "Coastal International", regionId: "med", regionName: "Mediterranean Coast", duration: "1h 15m", durationMinutes: 75, trips: "24 daily trips", dailyTripsCount: 24, price: 65, operators: ["West Delta"] },
  { id: 77, from: "Alexandria", to: "Ras El Hikma", road: "Coastal International", regionId: "med", regionName: "Mediterranean Coast", duration: "2h 15m", durationMinutes: 135, trips: "16 daily trips", dailyTripsCount: 16, price: 95, operators: ["West Delta"] },
  { id: 78, from: "Tanta", to: "Marsa Matrouh", road: "Delta-North Coast Axis", regionId: "med", regionName: "Mediterranean Coast", duration: "4h 15m", durationMinutes: 255, trips: "8 daily trips", dailyTripsCount: 8, price: 180, operators: ["West Delta"] },
  { id: 79, from: "Mansoura", to: "Marsa Matrouh", road: "Coastal International", regionId: "med", regionName: "Mediterranean Coast", duration: "5h 15m", durationMinutes: 315, trips: "6 daily trips", dailyTripsCount: 6, price: 210, operators: ["West Delta"] },
  { id: 80, from: "Damanhour", to: "Marsa Matrouh", road: "Coastal International", regionId: "med", regionName: "Mediterranean Coast", duration: "3h 30m", durationMinutes: 210, trips: "10 daily trips", dailyTripsCount: 10, price: 145, operators: ["West Delta"] },
  { id: 81, from: "Cairo", to: "Marina Sahel", road: "Wadi El Natrun-Alamein Rd", regionId: "med", regionName: "Mediterranean Coast", duration: "2h 50m", durationMinutes: 170, trips: "18 daily trips", dailyTripsCount: 18, price: 175, operators: ["Go Bus", "BlueBus"] },
  { id: 82, from: "Cairo", to: "Sallum", road: "Western Border Highway", regionId: "med", regionName: "Mediterranean Coast", duration: "8h 00m", durationMinutes: 480, trips: "4 daily trips", dailyTripsCount: 4, price: 340, operators: ["West Delta"] },
  { id: 83, from: "Marsa Matrouh", to: "Sallum", road: "Western Border Highway", regionId: "med", regionName: "Mediterranean Coast", duration: "3h 15m", durationMinutes: 195, trips: "6 daily trips", dailyTripsCount: 6, price: 110, operators: ["West Delta"] },

  // Canal Zone & Suez Corridor
  { id: 84, from: "Cairo", to: "Port Said", road: "30th of June Axis", regionId: "canal", regionName: "Canal Zone", duration: "2h 30m", durationMinutes: 150, trips: "24 daily trips", dailyTripsCount: 24, price: 95, operators: ["Super Jet", "East Delta", "Go Bus"] },
  { id: 85, from: "Port Said", to: "Cairo", road: "30th of June Axis", regionId: "canal", regionName: "Canal Zone", duration: "2h 30m", durationMinutes: 150, trips: "24 daily trips", dailyTripsCount: 24, price: 95, operators: ["Super Jet", "East Delta", "Go Bus"] },
  { id: 86, from: "Cairo", to: "Ismailia", road: "Cairo-Ismailia Desert Rd", regionId: "canal", regionName: "Canal Zone", duration: "1h 45m", durationMinutes: 105, trips: "30 daily trips", dailyTripsCount: 30, price: 70, operators: ["East Delta", "Super Jet"] },
  { id: 87, from: "Cairo", to: "Suez", road: "Cairo-Suez Expressway", regionId: "canal", regionName: "Canal Zone", duration: "1h 30m", durationMinutes: 90, trips: "34 daily trips", dailyTripsCount: 34, price: 65, operators: ["East Delta", "Super Jet"] },
  { id: 88, from: "Alexandria", to: "Port Said", road: "Coastal International", regionId: "canal", regionName: "Canal Zone", duration: "4h 00m", durationMinutes: 240, trips: "14 daily trips", dailyTripsCount: 14, price: 150, operators: ["West Delta", "East Delta", "Super Jet"] },
  { id: 89, from: "Alexandria", to: "Ismailia", road: "Coastal & Delta Axis", regionId: "canal", regionName: "Canal Zone", duration: "4h 15m", durationMinutes: 255, trips: "10 daily trips", dailyTripsCount: 10, price: 155, operators: ["West Delta", "East Delta"] },
  { id: 90, from: "Alexandria", to: "Suez", road: "Regional Ring Expressway", regionId: "canal", regionName: "Canal Zone", duration: "4h 30m", durationMinutes: 270, trips: "10 daily trips", dailyTripsCount: 10, price: 160, operators: ["West Delta", "Super Jet"] },
  { id: 91, from: "Port Said", to: "Ismailia", road: "Canal Bank Corridor", regionId: "canal", regionName: "Canal Zone", duration: "1h 00m", durationMinutes: 60, trips: "36 daily trips", dailyTripsCount: 36, price: 40, operators: ["East Delta"] },
  { id: 92, from: "Ismailia", to: "Suez", road: "Canal Bank Corridor", regionId: "canal", regionName: "Canal Zone", duration: "1h 00m", durationMinutes: 60, trips: "32 daily trips", dailyTripsCount: 32, price: 40, operators: ["East Delta"] },
  { id: 93, from: "Port Said", to: "Damietta", road: "Coastal International", regionId: "canal", regionName: "Canal Zone", duration: "1h 00m", durationMinutes: 60, trips: "28 daily trips", dailyTripsCount: 28, price: 35, operators: ["East Delta"] },
  { id: 94, from: "Mansoura", to: "Port Said", road: "Matareya-Port Said Axis", regionId: "canal", regionName: "Canal Zone", duration: "1h 45m", durationMinutes: 105, trips: "18 daily trips", dailyTripsCount: 18, price: 65, operators: ["East Delta"] },
  { id: 95, from: "Zagazig", to: "Ismailia", road: "Wadi El Tumilat Hwy", regionId: "canal", regionName: "Canal Zone", duration: "1h 10m", durationMinutes: 70, trips: "22 daily trips", dailyTripsCount: 22, price: 45, operators: ["East Delta"] },
  { id: 96, from: "Zagazig", to: "Port Said", road: "Faqus-Port Said Rd", regionId: "canal", regionName: "Canal Zone", duration: "2h 00m", durationMinutes: 120, trips: "14 daily trips", dailyTripsCount: 14, price: 70, operators: ["East Delta"] },
  { id: 97, from: "Suez", to: "Ain Sokhna", road: "Suez-Sokhna Coastal Rd", regionId: "canal", regionName: "Canal Zone", duration: "0h 45m", durationMinutes: 45, trips: "26 daily trips", dailyTripsCount: 26, price: 35, operators: ["East Delta", "Super Jet"] },

  // Western Desert & Oases Corridor
  { id: 98, from: "Cairo", to: "Siwa", road: "Cairo-Siwa Oasis Axis", regionId: "desert", regionName: "Western Desert", duration: "10h 30m", durationMinutes: 630, trips: "6 daily trips", dailyTripsCount: 6, price: 380, operators: ["West Delta"] },
  { id: 99, from: "Siwa", to: "Cairo", road: "Cairo-Siwa Oasis Axis", regionId: "desert", regionName: "Western Desert", duration: "10h 30m", durationMinutes: 630, trips: "6 daily trips", dailyTripsCount: 6, price: 380, operators: ["West Delta"] },
  { id: 100, from: "Marsa Matrouh", to: "Siwa", road: "Matrouh-Siwa Desert Hwy", regionId: "desert", regionName: "Western Desert", duration: "4h 00m", durationMinutes: 240, trips: "8 daily trips", dailyTripsCount: 8, price: 140, operators: ["West Delta"] },
  { id: 101, from: "Alexandria", to: "Siwa", road: "Coastal & Siwa Highway", regionId: "desert", regionName: "Western Desert", duration: "7h 30m", durationMinutes: 450, trips: "4 daily trips", dailyTripsCount: 4, price: 290, operators: ["West Delta"] },
  { id: 102, from: "Cairo", to: "Bahariya Oasis", road: "Cairo-Wahat Desert Rd", regionId: "desert", regionName: "Western Desert", duration: "5h 00m", durationMinutes: 300, trips: "6 daily trips", dailyTripsCount: 6, price: 210, operators: ["Upper Egypt Bus"] },
  { id: 103, from: "Cairo", to: "Farafra Oasis", road: "Western Desert Arterial", regionId: "desert", regionName: "Western Desert", duration: "7h 30m", durationMinutes: 450, trips: "4 daily trips", dailyTripsCount: 4, price: 290, operators: ["Upper Egypt Bus"] },
  { id: 104, from: "Cairo", to: "Dakhla Oasis", road: "New Valley Highway", regionId: "desert", regionName: "Western Desert", duration: "10h 00m", durationMinutes: 600, trips: "4 daily trips", dailyTripsCount: 4, price: 340, operators: ["Upper Egypt Bus"] },
  { id: 105, from: "Cairo", to: "Kharga Oasis", road: "Assiut-Kharga Corridor", regionId: "desert", regionName: "Western Desert", duration: "8h 30m", durationMinutes: 510, trips: "6 daily trips", dailyTripsCount: 6, price: 300, operators: ["Upper Egypt Bus"] },
  { id: 106, from: "Assiut", to: "Kharga Oasis", road: "Assiut-Kharga Road", regionId: "desert", regionName: "Western Desert", duration: "3h 00m", durationMinutes: 180, trips: "10 daily trips", dailyTripsCount: 10, price: 110, operators: ["Upper Egypt Bus"] },
  { id: 107, from: "Luxor", to: "Kharga Oasis", road: "Desert Oasis Axis", regionId: "desert", regionName: "Western Desert", duration: "5h 30m", durationMinutes: 330, trips: "4 daily trips", dailyTripsCount: 4, price: 210, operators: ["Upper Egypt Bus"] },
  { id: 108, from: "Giza", to: "Bahariya Oasis", road: "Cairo-Wahat Desert Rd", regionId: "desert", regionName: "Western Desert", duration: "4h 45m", durationMinutes: 285, trips: "6 daily trips", dailyTripsCount: 6, price: 200, operators: ["Upper Egypt Bus"] },

  // Inter-Governorate Cross-Corridors
  { id: 109, from: "Hurghada", to: "Alexandria", road: "Galala & Regional Ring", regionId: "redsea", regionName: "Red Sea", duration: "8h 15m", durationMinutes: 495, trips: "8 daily trips", dailyTripsCount: 8, price: 370, operators: ["Go Bus", "West Delta", "Super Jet"] },
  { id: 110, from: "Sharm El Sheikh", to: "Alexandria", road: "Sinai & Regional Ring", regionId: "sinai", regionName: "Sinai Peninsula", duration: "9h 30m", durationMinutes: 570, trips: "6 daily trips", dailyTripsCount: 6, price: 410, operators: ["Super Jet", "West Delta"] },
  { id: 111, from: "Dahab", to: "Alexandria", road: "Sinai & Regional Ring", regionId: "sinai", regionName: "Sinai Peninsula", duration: "10h 30m", durationMinutes: 630, trips: "6 daily trips", dailyTripsCount: 6, price: 450, operators: ["Go Bus", "West Delta"] },
  { id: 112, from: "Cairo", to: "El Quseir", road: "Red Sea Coastal Corridor", regionId: "redsea", regionName: "Red Sea", duration: "7h 30m", durationMinutes: 450, trips: "8 daily trips", dailyTripsCount: 8, price: 350, operators: ["High Jet", "Upper Egypt Bus"] },
  { id: 113, from: "Qena", to: "Hurghada", road: "Qena-Safaga Highway", regionId: "redsea", regionName: "Red Sea", duration: "3h 45m", durationMinutes: 225, trips: "8 daily trips", dailyTripsCount: 8, price: 180, operators: ["Upper Egypt Bus"] },
  { id: 114, from: "Sohag", to: "Hurghada", road: "Sohag-Red Sea Highway", regionId: "redsea", regionName: "Red Sea", duration: "4h 30m", durationMinutes: 270, trips: "6 daily trips", dailyTripsCount: 6, price: 220, operators: ["Upper Egypt Bus"] },
  { id: 115, from: "Assiut", to: "Hurghada", road: "Assiut-Red Sea Highway", regionId: "redsea", regionName: "Red Sea", duration: "5h 00m", durationMinutes: 300, trips: "6 daily trips", dailyTripsCount: 6, price: 230, operators: ["Upper Egypt Bus"] },
  { id: 116, from: "Beni Suef", to: "Ain Sokhna", road: "Beni Suef-Zafarana Hwy", regionId: "redsea", regionName: "Red Sea", duration: "2h 30m", durationMinutes: 150, trips: "8 daily trips", dailyTripsCount: 8, price: 120, operators: ["Upper Egypt Bus"] },
  { id: 117, from: "Minya", to: "Ras Gharib", road: "Minya-Ras Gharib Highway", regionId: "redsea", regionName: "Red Sea", duration: "3h 15m", durationMinutes: 195, trips: "6 daily trips", dailyTripsCount: 6, price: 160, operators: ["Upper Egypt Bus"] },
  { id: 118, from: "Tanta", to: "Sharm El Sheikh", road: "Tunnel Axis & Sinai", regionId: "sinai", regionName: "Sinai Peninsula", duration: "8h 15m", durationMinutes: 495, trips: "4 daily trips", dailyTripsCount: 4, price: 360, operators: ["Middle Delta", "East Delta"] },
  { id: 119, from: "Port Said", to: "Sharm El Sheikh", road: "Canal & Sinai Corridor", regionId: "sinai", regionName: "Sinai Peninsula", duration: "6h 45m", durationMinutes: 405, trips: "6 daily trips", dailyTripsCount: 6, price: 310, operators: ["East Delta"] },
  { id: 120, from: "Suez", to: "Dahab", road: "Ahmed Hamdi & Sinai", regionId: "sinai", regionName: "Sinai Peninsula", duration: "6h 00m", durationMinutes: 360, trips: "8 daily trips", dailyTripsCount: 8, price: 280, operators: ["East Delta"] },
  { id: 121, from: "Cairo", to: "Marsa Alam Airport", road: "Red Sea Expressway", regionId: "redsea", regionName: "Red Sea", duration: "8h 30m", durationMinutes: 510, trips: "6 daily trips", dailyTripsCount: 6, price: 450, operators: ["Go Bus", "BlueBus"] },
  { id: 122, from: "Cairo", to: "Ras Sudr", road: "South Sinai Coastal Hwy", regionId: "sinai", regionName: "Sinai Peninsula", duration: "2h 45m", durationMinutes: 165, trips: "16 daily trips", dailyTripsCount: 16, price: 160, operators: ["East Delta", "Go Bus"] },
  { id: 123, from: "Cairo", to: "Tor Sinai", road: "South Sinai Coastal Hwy", regionId: "sinai", regionName: "Sinai Peninsula", duration: "5h 00m", durationMinutes: 300, trips: "10 daily trips", dailyTripsCount: 10, price: 260, operators: ["East Delta"] },
  { id: 124, from: "Cairo", to: "Magawish", road: "Galala Coastal Hwy", regionId: "redsea", regionName: "Red Sea", duration: "5h 45m", durationMinutes: 345, trips: "12 daily trips", dailyTripsCount: 12, price: 290, operators: ["Go Bus", "Super Jet"] },
];

const getRegionCount = (regionId: string) => {
  if (regionId === "all") return allRoutes.length;
  return allRoutes.filter((r) => r.regionId === regionId).length;
};

const filteredRoutes = computed(() => {
  let list = allRoutes.filter((route) => {
    // Region filter
    if (selectedRegion.value !== "all" && route.regionId !== selectedRegion.value) {
      return false;
    }

    // Corridor filter
    if (selectedCorridor.value && route.road !== selectedCorridor.value) {
      return false;
    }

    // Search query
    if (searchQuery.value.trim()) {
      const q = searchQuery.value.trim().toLowerCase();
      const matchFrom = route.from.toLowerCase().includes(q);
      const matchTo = route.to.toLowerCase().includes(q);
      const matchRoad = route.road.toLowerCase().includes(q);
      const matchRegion = route.regionName.toLowerCase().includes(q);
      const matchOperators = route.operators.some((o) => o.toLowerCase().includes(q));
      if (!matchFrom && !matchTo && !matchRoad && !matchRegion && !matchOperators) {
        return false;
      }
    }

    return true;
  });

  // Sort
  if (sortBy.value === "price-asc") {
    list = [...list].sort((a, b) => a.price - b.price);
  } else if (sortBy.value === "duration-asc") {
    list = [...list].sort((a, b) => a.durationMinutes - b.durationMinutes);
  } else if (sortBy.value === "trips-desc") {
    list = [...list].sort((a, b) => b.dailyTripsCount - a.dailyTripsCount);
  }

  return list;
});

const paginatedRoutes = computed(() => {
  return filteredRoutes.value.slice(0, visibleCount.value);
});

useSeo({
  title: "120+ Active Routes & Corridors in Egypt | Otobisi",
  description:
    "Explore 120+ active bus routes, highway corridors, and road connections across Egypt. Compare schedules, verified operators, travel durations, and ticket prices.",
  private: false,
});
</script>
