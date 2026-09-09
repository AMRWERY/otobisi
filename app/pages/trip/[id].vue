<template>
  <div class="min-h-screen bg-surface-0 pb-20 text-start">
    <!-- Top Navigation Subheader & Stepper Wizard -->
    <header
      class="border-b border-border bg-surface-1/90 backdrop-blur-md sticky top-16 z-30"
    >
      <div
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4"
      >
        <!-- Back button & Ticket Checkout badge -->
        <div class="flex items-center gap-3">
          <LazyVBackButton label="Back to Search Results" />

          <span class="text-text-muted select-none">|</span>

          <div class="flex items-center gap-2">
            <div
              class="w-5 h-5 rounded-md bg-[#A1331B] text-white flex items-center justify-center text-[10px] font-black shadow-xs"
            >
              <Icon name="ph:bus-fill" class="w-3 h-3" />
            </div>
            <span class="text-xs font-bold text-text-primary">
              Ticket Checkout
            </span>
          </div>
        </div>

        <!-- 4-Step Checkout Stepper -->
        <LazyVStepper
          :steps="checkoutSteps"
          :current-step="2"
          allow-navigation
          @step-click="handleStepClick"
        />
      </div>
    </header>

    <!-- Main Container -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
      <!-- 1. Top Card: Selected Coach Summary Banner -->
      <lazy-search-trip-summary-banner
        :trip="trip"
        :formatted-date="formattedDate"
      />

      <!-- Main Layout: 2 Columns (Left: Coach Deck, Right: Sidebar) -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <!-- LEFT COLUMN: Seating Deck + Legend + Features -->
        <div class="lg:col-span-7 xl:col-span-8 flex flex-col gap-5">
          <!-- Seat Status Legend Bar -->
          <lazy-search-seat-legend
            :price="trip.price"
            :selected-count="selectedSeatIds.length"
          />

          <!-- Coach Seating Deck Simulator -->
          <lazy-search-seat-deck
            :seat-rows="seatRows"
            :selected-seat-ids="selectedSeatIds"
            :max-seats="4"
            @toggle-seat="toggleSeat"
          />

          <!-- Comfort Highlights Footer Card -->
          <lazy-search-comfort-features />
        </div>

        <!-- RIGHT COLUMN: Selected Seats, Pickup Stations & Order Summary -->
        <div class="lg:col-span-5 xl:col-span-4">
          <lazy-search-seat-sidebar
            :trip="trip"
            :selected-seat-ids="selectedSeatIds"
            :hold-timer-display="holdTimerDisplay"
            :base-fare="baseFare"
            :service-fee="serviceFee"
            :insurance-fee="insuranceFee"
            :total-fare="totalFare"
            @remove-seat="removeSeat"
            @change-station="onChangeStation"
            @continue="proceedToPassengerDetails"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import type { SeatItem, SeatRow } from "~/types/search/seats";
import type { StepItem } from "~/types/shared/VStepper";

const route = useRoute();
const router = useRouter();
const { getTripById } = useTrips();

const tripId = String(route.params.id || "gb-01");
const trip = computed(() => getTripById(tripId));

const checkoutSteps: StepItem[] = [
  { step: 1, label: "1. Search" },
  { step: 2, label: "2. Select Seats" },
  { step: 3, label: "3. Passenger Details" },
  { step: 4, label: "4. Payment" },
];

const selectedSeatIds = ref<string[]>(["4A", "4B"]);

const formattedDate = computed(() => {
  const queryDate = route.query.date as string;
  if (!queryDate) return "Thursday, 24 Oct 2024";
  try {
    const [y, m, d] = queryDate.split("-").map(Number);
    if (!y || !m || !d) return "Thursday, 24 Oct 2024";
    const dt = new Date(y, m - 1, d);
    return dt.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "Thursday, 24 Oct 2024";
  }
});

// Seat hold timer countdown
const holdSeconds = ref(14 * 60 + 48);
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

// Generate 10 standard rows + 5-seat back row matching coach deck configuration
const seatRows = computed<SeatRow[]>(() => {
  const price = trip.value.price || 145;
  const bookedSet = new Set([
    "1A",
    "1B",
    "2C",
    "3D",
    "5B",
    "6A",
    "6B",
    "8C",
    "9A",
    "9B",
    "11A",
    "11B",
    "11E",
    "11C",
    "11D",
  ]);
  const ladiesSet = new Set(["6C", "6D"]);

  const rows: SeatRow[] = [];
  for (let r = 1; r <= 10; r++) {
    rows.push({
      rowNumber: r,
      seatA: {
        id: `${r}A`,
        row: r,
        col: "A",
        price,
        isBooked: bookedSet.has(`${r}A`),
        isLadies: ladiesSet.has(`${r}A`),
      },
      seatB: {
        id: `${r}B`,
        row: r,
        col: "B",
        price,
        isBooked: bookedSet.has(`${r}B`),
        isLadies: ladiesSet.has(`${r}B`),
      },
      seatC: {
        id: `${r}C`,
        row: r,
        col: "C",
        price,
        isBooked: bookedSet.has(`${r}C`),
        isLadies: ladiesSet.has(`${r}C`),
      },
      seatD: {
        id: `${r}D`,
        row: r,
        col: "D",
        price,
        isBooked: bookedSet.has(`${r}D`),
        isLadies: ladiesSet.has(`${r}D`),
      },
    });
  }

  // Row 11: 5 seats across (back row)
  rows.push({
    rowNumber: 11,
    seatA: {
      id: "11A",
      row: 11,
      col: "A",
      price,
      isBooked: bookedSet.has("11A"),
    },
    seatB: {
      id: "11B",
      row: 11,
      col: "B",
      price,
      isBooked: bookedSet.has("11B"),
    },
    seatCenter: {
      id: "11E",
      row: 11,
      col: "E",
      price,
      isBooked: bookedSet.has("11E"),
    },
    seatC: {
      id: "11C",
      row: 11,
      col: "C",
      price,
      isBooked: bookedSet.has("11C"),
    },
    seatD: {
      id: "11D",
      row: 11,
      col: "D",
      price,
      isBooked: bookedSet.has("11D"),
    },
  });

  return rows;
});

const toggleSeat = (seat: SeatItem) => {
  if (seat.isBooked) return;

  const index = selectedSeatIds.value.indexOf(seat.id);
  if (index > -1) {
    selectedSeatIds.value.splice(index, 1);
  } else {
    if (selectedSeatIds.value.length >= 4) {
      alert("You can select a maximum of 4 seats per reservation.");
      return;
    }
    selectedSeatIds.value.push(seat.id);
  }
};

const removeSeat = (seatId: string) => {
  const index = selectedSeatIds.value.indexOf(seatId);
  if (index > -1) {
    selectedSeatIds.value.splice(index, 1);
  }
};

const onChangeStation = (type: "boarding" | "dropoff") => {
  alert(`Change ${type} station feature will be available shortly.`);
};

const handleStepClick = (step: StepItem) => {
  if (step.step === 1) {
    router.back();
  }
};

// Calculations
const baseFare = computed(
  () => selectedSeatIds.value.length * (trip.value.price || 145),
);
const serviceFee = computed(() => (selectedSeatIds.value.length > 0 ? 10 : 0));
const insuranceFee = computed(() => (selectedSeatIds.value.length > 0 ? 5 : 0));
const totalFare = computed(
  () => baseFare.value + serviceFee.value + insuranceFee.value,
);

const localePath = useLocalePath();

const proceedToPassengerDetails = () => {
  if (selectedSeatIds.value.length === 0) return;
  router.push(
    localePath({
      path: `/booking/${tripId}`,
      query: {
        seats: selectedSeatIds.value.join(","),
        date: route.query.date,
      },
    }),
  );
};

// SEO metadata
useSeo({
  title: `Select Seats - ${trip.value.operatorName} ${trip.value.busClass}`,
  description: `Reserve your preferred seats on ${trip.value.operatorName} from ${trip.value.departureCity} to ${trip.value.arrivalCity}. Live coach layout, instant confirmation.`,
  private: false,
});
</script>