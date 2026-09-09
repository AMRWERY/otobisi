<template>
  <div class="min-h-screen bg-surface-0 pb-20 text-start">
    <!-- Top Subheader & Stepper Context Ribbon -->
    <lazy-booking-header
      :trip="trip"
      :formatted-date="formattedDate"
      :hold-timer-display="holdTimerDisplay"
      @back="goBackToSeats"
    />

    <!-- Main Container -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <!-- LEFT COLUMN: Step 1 Passenger Details, Boarding Pass Delivery, Step 2 Payment -->
        <div class="lg:col-span-7 xl:col-span-8 flex flex-col gap-6">
          <!-- Step 1: Passenger Details Form Card -->
          <lazy-passenger-form-card :seats="selectedSeats" />

          <!-- Digital Boarding Pass Delivery Card -->
          <lazy-boarding-pass-delivery-card />

          <!-- Step 2: Choose Payment Method Card -->
          <lazy-payment-methods-card />
        </div>

        <!-- RIGHT COLUMN: Booking Summary Sidebar & Seat Guarantee Promise -->
        <div class="lg:col-span-5 xl:col-span-4">
          <lazy-booking-summary-sidebar
            :trip="trip"
            :seats="selectedSeats"
            :base-fare="baseFare"
            :service-fee="serviceFee"
            :insurance-fee="insuranceFee"
            :total-fare="totalFare"
            @confirm-payment="handlePaymentConfirm"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const router = useRouter();
const localePath = useLocalePath();
const { getTripById } = useTrips();

const tripId = String(route.params.id || "gb-01");
const trip = computed(() => getTripById(tripId));

// Parse seats from query (e.g. ?seats=4A,4B)
const selectedSeats = computed<string[]>(() => {
  const querySeats = route.query.seats as string;
  if (querySeats) {
    return querySeats.split(",").filter(Boolean);
  }
  return ["4A", "4B"];
});

const formattedDate = computed(() => {
  const queryDate = route.query.date as string;
  if (!queryDate) return "Thu, 24 Oct 2024";
  try {
    const [y, m, d] = queryDate.split("-").map(Number);
    if (!y || !m || !d) return "Thu, 24 Oct 2024";
    const dt = new Date(y, m - 1, d);
    return dt.toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "Thu, 24 Oct 2024";
  }
});

// Seat hold countdown timer (12:41)
const holdSeconds = ref(12 * 60 + 41);
let timerInterval: ReturnType<typeof setInterval> | null = null;

onMounted(() => {
  timerInterval = setInterval(() => {
    if (holdSeconds.value > 0) {
      holdSeconds.value--;
    }
  }, 1000);
});

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval);
});

const holdTimerDisplay = computed(() => {
  const m = Math.floor(holdSeconds.value / 60);
  const s = holdSeconds.value % 60;
  return `${m}:${s < 10 ? "0" : ""}${s} min`;
});

// Calculations
const baseFare = computed(
  () => selectedSeats.value.length * (trip.value.price || 145),
);
const serviceFee = computed(() => (selectedSeats.value.length > 0 ? 10 : 0));
const insuranceFee = computed(() => (selectedSeats.value.length > 0 ? 5 : 0));
const totalFare = computed(
  () => baseFare.value + serviceFee.value + insuranceFee.value,
);

const goBackToSeats = () => {
  router.push(
    localePath({
      path: `/trip/${tripId}`,
      query: {
        date: route.query.date,
      },
    }),
  );
};

const handlePaymentConfirm = () => {
  alert(
    `Payment of ${totalFare.value} EGP successfully initiated! Confirmation and WhatsApp ticket will be dispatched to your phone.`,
  );
};

// SEO metadata
useSeo({
  title: `Passenger Details & Payment - ${trip.value.operatorName}`,
  description: `Complete passenger identity and payment for your ${trip.value.operatorName} trip from ${trip.value.departureCity} to ${trip.value.arrivalCity}.`,
  private: true,
});
</script>
