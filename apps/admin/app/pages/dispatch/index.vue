<template>
  <div class="px-6 py-6 space-y-5 max-w-[1600px] mx-auto">
    <lazy-dispatch-header
      v-model:live="isLive"
      :last-updated="lastUpdated"
      @dispatch="newDispatch"
    />

    <lazy-dispatch-stats
      :on-road="stats.onRoad"
      :total="counts.all"
      :delayed="stats.delayed"
      :avg-speed="stats.avgSpeed"
      :boarding="stats.boarding"
      :passengers="stats.passengers"
    />

    <lazy-dispatch-filters
      v-model:corridor="filters.corridor"
      v-model:status="filters.status"
      :counts="counts"
      :has-active-filters="hasActiveFilters"
      @reset="resetFilters"
    />

    <!-- Map beside the detail + trip list (stacked below xl) -->
    <div
      class="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_380px] gap-5 items-start"
    >
      <lazy-dispatch-map
        :trips="filteredTrips"
        :selected-id="selectedId"
        @select="selectedId = $event"
      />

      <div class="space-y-5">
        <lazy-dispatch-trip-detail
          :trip="selectedTrip"
          @call="callDriver"
          @broadcast="broadcastDelay"
        />
        <lazy-dispatch-trip-list
          :trips="filteredTrips"
          :selected-id="selectedId"
          @select="selectedId = $event"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const {
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
} = useDispatch();

useSeoMeta({
  title: "Live Dispatch Map",
  description:
    "Track Otobisi buses along every intercity corridor in real time.",
  private: false,
});
</script>
