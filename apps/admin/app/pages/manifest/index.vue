<template>
  <div class="px-6 py-6 space-y-5 max-w-[1600px] mx-auto">
    <lazy-manifest-header
      :trip-id="trip.id"
      :depart-label="`${trip.departDay} ${trip.departTime}`"
      @select="selectTrip"
      @export="exportCsv"
      @print="printManifest"
    />

    <lazy-manifest-trip-summary :trip="trip" />

    <lazy-manifest-stats :capacity="trip.capacity" :stats="stats" />

    <lazy-manifest-filters
      v-model:search="filters.search"
      v-model:status="filters.status"
      :counts="counts"
    />

    <lazy-manifest-table
      v-model:selected-ids="selectedIds"
      :passengers="filteredPassengers"
      :has-active-filters="hasActiveFilters"
      @mark-selected="markSelected"
      @mark-one="markOne"
      @print="printManifest"
      @reset="resetFilters"
    />
  </div>
</template>

<script lang="ts" setup>
const {
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
} = useManifest();

useSeoMeta({
  title: "Passenger Manifest",
  description:
    "Boarding lists for every Otobisi departure: check passengers in, flag no-shows and print manifests.",
  private: false,
});
</script>
