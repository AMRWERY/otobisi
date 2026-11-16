<template>
  <div class="px-6 py-6 space-y-5 max-w-[1600px] mx-auto">
    <lazy-bookings-header
      :total="bookings.length"
      @export="exportCsv()"
      @print="printManifest"
      @add="createBooking"
    />

    <lazy-bookings-filters
      v-model:date-range="filters.dateRange"
      v-model:corridor="filters.corridor"
      v-model:vehicle-class="filters.vehicleClass"
      v-model:tab="filters.tab"
      v-model:search="filters.search"
      :counts="counts"
      :has-active-filters="hasActiveFilters"
      @reset="resetFilters"
    />

    <!-- Master / detail: ledger takes ~65%, inspection panel the rest (xl+) -->
    <div
      class="grid grid-cols-1 gap-5 items-start"
      :class="{ 'xl:grid-cols-[minmax(0,65fr)_minmax(0,35fr)]': isDesktop && activeBooking }"
    >
      <lazy-bookings-table
        :bookings="filteredBookings"
        :active-id="activeId"
        :selected-ids="selectedIds"
        :all-selected="allSelected"
        @open="openBooking"
        @toggle="toggleSelect"
        @toggle-all="toggleSelectAll"
        @export-selected="exportCsv(true)"
      />

      <!-- Desktop: docked beside the table -->
      <aside
        v-if="isDesktop && activeBooking"
        class="sticky top-6 h-[calc(100vh-7rem)]"
      >
        <lazy-booking-details-panel
          :booking="activeBooking"
          @close="activeId = null"
          @no-show="markNoShow"
          @refund="refundBooking"
          @resend="resendTicket"
        />
      </aside>
    </div>

    <!-- Below xl: slide-over drawer -->
    <Teleport to="body">
      <div
        v-if="!isDesktop && activeBooking"
        class="fixed inset-0 z-50 overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        <div
          class="fixed inset-0 bg-black/50 backdrop-blur-xs"
          @click="activeId = null"
        />
        <div class="fixed inset-y-0 end-0 w-screen max-w-md">
          <lazy-booking-details-panel
            :booking="activeBooking"
            class="rounded-none! border-y-0 border-e-0"
            @close="activeId = null"
            @no-show="markNoShow"
            @refund="refundBooking"
            @resend="resendTicket"
          />
        </div>
      </div>
    </Teleport>

    <lazy-bookings-status-bar />
  </div>
</template>

<script lang="ts" setup>
const {
  bookings,
  filters,
  counts,
  filteredBookings,
  hasActiveFilters,
  resetFilters,
  activeId,
  activeBooking,
  selectedIds,
  allSelected,
  toggleSelect,
  toggleSelectAll,
  markNoShow,
  refundBooking,
  resendTicket,
  printManifest,
  createBooking,
  exportCsv,
} = useBookings();

// The inspection panel docks beside the table from xl up, and becomes a drawer below.
// Starts false so the server render and first client render agree.
const isDesktop = useMediaQuery("(min-width: 1280px)");

// Pre-open the first reservation on wide screens only (a drawer would cover the table on mobile)
onMounted(() => {
  if (window.matchMedia("(min-width: 1280px)").matches) {
    activeId.value = filteredBookings.value[0]?.id ?? null;
  }
});

function openBooking(id: string) {
  activeId.value = id;
}

useSeoMeta({
  title: "Bookings & Tickets",
  description:
    "Search, inspect and manage Otobisi passenger reservations, tickets and payments.",
  private: false,
});
</script>
