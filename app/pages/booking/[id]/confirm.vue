<template>
  <div class="min-h-screen bg-surface-0 pb-20 text-start">
    <!-- 4-Step Stepper & Live Status Banner -->
    <lazy-confirmation-header />

    <!-- Main Container -->
    <main class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
      <!-- Success Icon, E-Ticket Issuance Headline, and PNR Code Ribbon -->
      <lazy-confirmation-hero :pnr-code="pnrCode" :formatted-date="heroDate" />

      <!-- Official Boarding Pass / E-Ticket Voucher Card -->
      <lazy-e-ticket-card
        :trip="trip"
        :seats="selectedSeats"
        :formatted-date="fullDateString"
      />

      <!-- Ticket Actions (Download PDF, Calendar, Share) -->
      <lazy-ticket-actions />

      <!-- Return Journey Upsell Cards with 10% Discount -->
      <lazy-return-journey-card />

      <!-- Essential Egyptian Travel Guidelines (3 Cards) -->
      <lazy-travel-guidelines-card />

      <!-- 24/7 Customer Support & Assistance Desk -->
      <lazy-terminal-support-card />
    </main>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const { getTripById } = useTrips();

const tripId = computed(() => String(route.params.id || "gb-01"));
const trip = computed(() => getTripById(tripId.value));

const pnrCode = ref("OTB-849204-EG");

// Parse seats from query or fallback
const selectedSeats = computed<string[]>(() => {
  const querySeats = route.query.seats as string;
  if (querySeats) {
    return querySeats.split(",").filter(Boolean);
  }
  return ["4A", "4B"];
});

// Format dates
const heroDate = computed(() => {
  const queryDate = route.query.date as string;
  if (!queryDate) return "24 Oct";
  try {
    const [y, m, d] = queryDate.split("-").map(Number);
    if (!y || !m || !d) return "24 Oct";
    const dt = new Date(y, m - 1, d);
    return dt.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
    });
  } catch {
    return "24 Oct";
  }
});

const fullDateString = computed(() => {
  const queryDate = route.query.date as string;
  if (!queryDate) return "Thursday, 24 October 2024";
  try {
    const [y, m, d] = queryDate.split("-").map(Number);
    if (!y || !m || !d) return "Thursday, 24 October 2024";
    const dt = new Date(y, m - 1, d);
    return dt.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return "Thursday, 24 October 2024";
  }
});

// SEO metadata
useSeo({
  title: `Booking Confirmed - ${pnrCode.value} | Otobisi`,
  description: `Your official e-ticket for ${trip.value.operatorName} from ${trip.value.departureCity} to ${trip.value.arrivalCity} is confirmed and issued.`,
  private: true,
});
</script>