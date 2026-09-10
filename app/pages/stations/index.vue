<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12 sm:space-y-16">
    <!-- Header -->
    <div class="text-center space-y-4 max-w-2xl mx-auto">
      <div
        class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-800 text-[#EA580C] dark:text-orange-400 text-xs font-bold uppercase tracking-wider">
        <Icon name="ph:map-pin-line-bold" class="w-4 h-4" />
        <span>Transit Hubs & Terminals</span>
      </div>
      <h1 class="text-3xl sm:text-5xl font-black tracking-tight text-text-primary">
        Egypt Station Directory
      </h1>
      <p class="text-sm sm:text-base text-text-secondary leading-relaxed">
        Find departure terminals, boarding platforms, station amenities, and operator ticket counters across all
        Egyptian cities.
      </p>
    </div>

    <!-- Search & City Filter -->
    <div class="flex flex-col sm:flex-row gap-4 items-center justify-between">
      <div class="relative w-full sm:w-80">
        <Icon name="ph:magnifying-glass-bold"
          class="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input v-model="searchQuery" type="text" placeholder="Search station or city..."
          class="w-full ps-10 pe-4 py-2.5 rounded-xl bg-surface-1 dark:bg-[#131B2E] border border-border/80 text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:border-[#EA580C]" />
      </div>

      <div class="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
        <button v-for="city in cities" :key="city" type="button"
          class="px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer"
          :class="selectedCity === city ? 'bg-[#EA580C] text-white' : 'bg-surface-1 dark:bg-[#131B2E] border border-border/70 text-text-secondary hover:text-text-primary'"
          @click="selectedCity = city">
          {{ city }}
        </button>
      </div>
    </div>

    <!-- Station Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="station in filteredStations" :key="station.id"
        class="p-6 rounded-3xl bg-surface-1 dark:bg-[#131B2E] border border-border/70 hover:border-[#EA580C]/40 transition-colors flex flex-col justify-between space-y-4">
        <div class="space-y-3">
          <div class="flex items-start justify-between gap-2">
            <div>
              <span class="text-[10px] font-extrabold uppercase tracking-wider text-[#EA580C]">
                {{ station.city }}
              </span>
              <h3 class="text-base font-bold text-text-primary tracking-tight">
                {{ station.name }}
              </h3>
            </div>
            <span class="p-2 rounded-xl bg-surface-2 dark:bg-[#1B2438] text-[#EA580C] shrink-0">
              <Icon name="ph:bus-bold" class="w-4 h-4" />
            </span>
          </div>

          <p class="text-xs text-text-secondary leading-relaxed">
            {{ station.address }}
          </p>

          <!-- Operators Serving Station -->
          <div class="space-y-1 pt-1">
            <span class="text-[10px] uppercase font-bold text-text-muted">Serving Operators:</span>
            <div class="flex flex-wrap gap-1.5">
              <span v-for="op in station.operators" :key="op"
                class="px-2 py-0.5 rounded-md bg-surface-0 dark:bg-[#0B0F19] border border-border/60 text-[10px] font-medium text-text-primary">
                {{ op }}
              </span>
            </div>
          </div>

          <!-- Amenities -->
          <div class="space-y-1 pt-1">
            <span class="text-[10px] uppercase font-bold text-text-muted">Station Amenities:</span>
            <div class="flex flex-wrap gap-1 text-[11px] text-text-secondary">
              <span v-for="(amenity, idx) in station.amenities" :key="amenity">
                {{ amenity }}<span v-if="idx < station.amenities.length - 1" class="text-text-muted mr-1">,</span>
              </span>
            </div>
          </div>
        </div>

        <div class="pt-4 border-t border-border/60 flex items-center justify-between">
          <span class="text-[11px] text-text-muted">Open 24/7</span>
          <nuxt-link-locale
            to="/"
            class="text-xs font-bold text-[#EA580C] hover:underline flex items-center gap-1 group"
          >
            <span>Book from here</span>
            <Icon name="ph:arrow-right-bold" class="w-3.5 h-3.5 icon-arrow-animated" />
          </nuxt-link-locale>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const cities = ["All Cities", "Cairo", "Alexandria", "Giza", "Red Sea", "Sinai", "Upper Egypt"];
const selectedCity = ref("All Cities");
const searchQuery = ref("");

const stations = [
  {
    id: 1,
    name: "Almaza Coach Station (Heliopolis)",
    city: "Cairo",
    region: "Cairo",
    address: "Al-Thawra St, Almaza, Heliopolis, Cairo",
    operators: ["Go Bus", "BlueBus", "Super Jet", "East Delta"],
    amenities: ["Air-Conditioned Waiting Lounge", "Cafeteria", "ATM", "Fawry POS", "Luggage Storage"],
  },
  {
    id: 2,
    name: "Cairo Gateway (Al Torgoman)",
    city: "Cairo",
    region: "Cairo",
    address: "Al Torgoman Complex, Ramses Street, Downtown Cairo",
    operators: ["Super Jet", "Upper Egypt Bus", "West & Mid Delta", "East Delta"],
    amenities: ["Metro Connection (Orabi)", "Multi-Story Parking", "Restaurants", "Wheelchair Ramps"],
  },
  {
    id: 3,
    name: "Moharam Bek Central Terminal",
    city: "Alexandria",
    region: "Alexandria",
    address: "Moharam Bek, Next to Alexandria Ring Road",
    operators: ["Go Bus", "BlueBus", "Super Jet", "West Delta"],
    amenities: ["VIP Lounge", "Pharmacy", "24/7 Security", "Taxi Stand"],
  },
  {
    id: 4,
    name: "Giza & 6th of October Hub",
    city: "Giza",
    region: "Giza",
    address: "Remaya Square & Hosary Terminal, 6th of October",
    operators: ["Go Bus", "BlueBus", "Super Jet"],
    amenities: ["Waiting Hall", "Free Wi-Fi", "Coffee Kiosk", "Clean Restrooms"],
  },
  {
    id: 5,
    name: "Hurghada Central Bus Station",
    city: "Hurghada",
    region: "Red Sea",
    address: "Al-Nasr Street, Dahar District, Hurghada",
    operators: ["Go Bus", "BlueBus", "Super Jet", "High Jet"],
    amenities: ["Tourist Assistance", "Luggage Check-In", "Café", "Charging Ports"],
  },
  {
    id: 6,
    name: "Sharm El Sheikh Terminal (Rowaysat)",
    city: "Sharm El Sheikh",
    region: "Sinai",
    address: "Rowaysat Transit Center, Peace Road, Sharm El Sheikh",
    operators: ["Go Bus", "East Delta", "BlueBus", "Super Jet"],
    amenities: ["Air-Conditioned Hall", "ATM", "24/7 Security Checkpoint"],
  },
  {
    id: 7,
    name: "Dahab Bus Terminal",
    city: "Dahab",
    region: "Sinai",
    address: "Mashraba Entrance, Dahab, South Sinai",
    operators: ["Go Bus", "East Delta"],
    amenities: ["Open-Air Seating", "Snack Bar", "Local Minibus Link"],
  },
  {
    id: 8,
    name: "Luxor Bus Station",
    city: "Luxor",
    region: "Upper Egypt",
    address: "Near Luxor Railway Station, Al-Manshiya",
    operators: ["Super Jet", "Upper Egypt Bus", "Go Bus"],
    amenities: ["Waiting Area", "Ticket Booths", "Taxi Services"],
  },
  {
    id: 9,
    name: "Aswan Intercity Terminal",
    city: "Aswan",
    region: "Upper Egypt",
    address: "Al Abtal Street, Downtown Aswan",
    operators: ["Upper Egypt Bus", "Super Jet"],
    amenities: ["Covered Waiting Area", "Restrooms", "Luggage Porter"],
  },
];

const filteredStations = computed(() => {
  return stations.filter((s) => {
    const matchesCity =
      selectedCity.value === "All Cities" ||
      s.region === selectedCity.value ||
      s.city === selectedCity.value;
    const query = searchQuery.value.trim().toLowerCase();
    const matchesQuery =
      !query ||
      s.name.toLowerCase().includes(query) ||
      s.city.toLowerCase().includes(query) ||
      s.address.toLowerCase().includes(query) ||
      s.operators.some((o) => o.toLowerCase().includes(query));
    return matchesCity && matchesQuery;
  });
});

useSeo({
  title: "Egypt Bus Station Directory | Otobisi",
  description:
    "Explore bus stations and coach terminals across Cairo, Alexandria, Hurghada, Sharm El Sheikh, Luxor, and all Egyptian cities.",
  private: false,
});
</script>
