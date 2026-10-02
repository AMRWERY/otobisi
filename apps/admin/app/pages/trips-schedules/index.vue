<template>
  <div class="px-6 py-6 space-y-6 max-w-[1600px] mx-auto">
    <lazy-trips-header
      :active-count="activeTripsCount"
      @export="exportCsv"
      @add="openAddDrawer"
    />

    <lazy-trips-filters
      v-model:date-range="filters.dateRange"
      v-model:corridor="filters.corridor"
      v-model:vehicle-class="filters.vehicleClass"
      v-model:tab="filters.tab"
      v-model:search="filters.search"
    />

    <lazy-trip-stats
      :total-trips="trips.length"
      :active-trips="activeTripsCount"
    />

    <lazy-trips-timetable
      :trips="filteredTrips"
      @toggle-status="toggleStatus"
      @edit="openEditDrawer"
      @duplicate="duplicateTrip"
      @view-manifest="viewManifest"
      @delete="deleteTrip"
    />

    <lazy-trip-schedule-drawer
      :is-open="isDrawerOpen"
      :trip-data="selectedTripForEdit"
      @close="closeDrawer"
      @save="handleSave"
    />
  </div>
</template>

<script lang="ts" setup>
import type { Trip } from "~/types/trip";

const {
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
} = useTrips();

// Add / edit drawer
const isDrawerOpen = ref(false);
const selectedTripForEdit = ref<Trip | null>(null);

function openAddDrawer() {
  selectedTripForEdit.value = null;
  isDrawerOpen.value = true;
}

function openEditDrawer(trip: Trip) {
  selectedTripForEdit.value = { ...trip };
  isDrawerOpen.value = true;
}

function closeDrawer() {
  isDrawerOpen.value = false;
  selectedTripForEdit.value = null;
}

function handleSave(data: any) {
  saveTrip(data);
  closeDrawer();
}

useSeoMeta({
  title: "Trips & Schedules",
});
</script>