<template>
  <div class="px-6 py-6 space-y-5 max-w-[1600px] mx-auto">
    <lazy-fleet-header
      :total="counts.all"
      :in-service="counts['in-service']"
      :maintenance="counts.maintenance"
      :standby="counts.standby"
      @export="exportCsv"
      @add="isDrawerOpen = true"
    />

    <lazy-fleet-stats
      :total="counts.all"
      :in-service="counts['in-service']"
      :maintenance="counts.maintenance"
      :avg-age="avgAge"
      :live-seats="liveSeats"
    />

    <lazy-fleet-filters
      v-model:search="filters.search"
      v-model:status="filters.status"
      v-model:template="filters.template"
      :counts="counts"
      :shown="filteredFleet.length"
      :total="counts.all"
      :has-active-filters="hasActiveFilters"
      @reset="resetFilters"
    />

    <lazy-fleet-table
      :coaches="filteredFleet"
      :selected-ids="selectedIds"
      :all-selected="allSelected"
      @toggle="toggleSelect"
      @toggle-all="toggleSelectAll"
    />

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-5">
      <lazy-fleet-depot-yard
        class="lg:col-span-7"
        :in-depot="counts.standby + counts.maintenance"
      />
      <lazy-fleet-template-spec class="lg:col-span-5" />
    </div>

    <lazy-fleet-register-drawer
      :is-open="isDrawerOpen"
      @close="isDrawerOpen = false"
      @register="handleRegister"
      @save-draft="saveDraft"
    />
  </div>
</template>

<script lang="ts" setup>
import type { NewCoachForm } from "~/types/fleet";

const {
  filters,
  counts,
  avgAge,
  liveSeats,
  filteredFleet,
  hasActiveFilters,
  resetFilters,
  selectedIds,
  allSelected,
  toggleSelect,
  toggleSelectAll,
  registerCoach,
  saveDraft,
  exportCsv,
} = useFleet();

const isDrawerOpen = ref(false);

function handleRegister(form: NewCoachForm) {
  if (registerCoach(form)) isDrawerOpen.value = false;
}

useSeoMeta({
  title: "Fleet & Vehicles",
  description:
    "Manage the Otobisi coach roster: registration, seating blueprints, depots and operational status.",
  private: false,
});
</script>