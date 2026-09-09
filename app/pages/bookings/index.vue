<template>
  <div class="min-h-screen bg-surface-0 pb-20 text-start">
    <main class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
      <!-- Breadcrumb, Header & Action Buttons -->
      <lazy-bookings-header />

      <!-- Interactive Tab Filters & Search Bar -->
      <lazy-bookings-filter-bar
        v-model:active-tab="activeTab"
        v-model:search-query="searchQuery"
        :tabs="filterTabs"
      />

      <!-- Travel Reminder Banner -->
      <lazy-bookings-travel-reminder />

      <!-- Upcoming Trips Section -->
      <lazy-upcoming-booking-card
        v-if="showUpcoming"
      />

      <!-- Past Trips Section -->
      <lazy-past-booking-card
        v-if="showPast"
      />

      <!-- Empty State if no bookings match search filter -->
      <div
        v-if="!showUpcoming && !showPast"
        class="text-center py-16 px-4 bg-surface-1 rounded-2xl border border-border my-6"
      >
        <div
          class="w-14 h-14 rounded-2xl bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center mx-auto mb-3"
        >
          <Icon name="ph:ticket-bold" class="w-7 h-7" />
        </div>
        <h3 class="font-bold text-base text-text-primary mb-1">
          No Bookings Found
        </h3>
        <p class="text-xs text-text-secondary max-w-sm mx-auto mb-4">
          No records matched your search query "{{ searchQuery }}". Check your PNR code or filter selection.
        </p>
        <button
          type="button"
          class="px-4 py-2 rounded-xl bg-surface-2 hover:bg-surface-0 border border-border text-xs font-bold text-text-primary cursor-pointer transition-colors"
          @click="resetFilters"
        >
          Reset Filters
        </button>
      </div>

      <!-- Popular Intercity Bus Routes Recommendations -->
      <lazy-popular-corridors-promo />

      <!-- Guaranteed Boarding with Otobisi Banner -->
      <lazy-boarding-guarantee-banner />
    </main>
  </div>
</template>

<script lang="ts" setup>
const activeTab = ref("all");
const searchQuery = ref("");

const filterTabs = computed(() => [
  { id: "all", label: "All Bookings", count: 3 },
  { id: "upcoming", label: "Upcoming", count: 1 },
  { id: "completed", label: "Completed", count: 1 },
  { id: "cancelled", label: "Cancelled", count: 1 },
]);

const showUpcoming = computed(() => {
  if (activeTab.value === "completed" || activeTab.value === "cancelled") {
    return false;
  }
  if (!searchQuery.value) return true;
  const q = searchQuery.value.toLowerCase();
  return (
    "otb-849204-eg".includes(q) ||
    "cairo".includes(q) ||
    "alexandria".includes(q) ||
    "go bus".includes(q)
  );
});

const showPast = computed(() => {
  if (activeTab.value === "upcoming") {
    return false;
  }
  if (!searchQuery.value) return true;
  const q = searchQuery.value.toLowerCase();
  return (
    "otb-721940-eg".includes(q) ||
    "otb-610482-eg".includes(q) ||
    "super jet".includes(q) ||
    "blue bus".includes(q) ||
    "hurghada".includes(q) ||
    "alexandria".includes(q)
  );
});

const resetFilters = () => {
  activeTab.value = "all";
  searchQuery.value = "";
};

// SEO metadata
useSeo({
  title: "My Bookings & Trip History | Otobisi",
  description: "View and manage all your upcoming and past intercity bus trips, e-tickets, tax invoices, and seat reservations across Egypt.",
  private: true,
});
</script>
