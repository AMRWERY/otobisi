<template>
  <div class="flex flex-col gap-4 sticky top-32 text-start">
    <div
      class="bg-surface-1 border border-border rounded-2xl p-5 shadow-sm text-start"
    >
      <!-- Card Header & Seat Hold Countdown -->
      <div
        class="flex items-center justify-between pb-3.5 border-b border-border mb-4"
      >
        <div class="flex items-center gap-2">
          <span
            class="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse"
          ></span>
          <h3 class="font-bold text-base text-text-primary">
            Selected Seats ({{ selectedSeatIds.length }})
          </h3>
        </div>

        <span
          class="px-2.5 py-1 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 font-bold text-xs border border-orange-500/20 flex items-center gap-1"
        >
          <Icon name="ph:clock-bold" class="w-3.5 h-3.5" />
          <span>Seat Hold: {{ holdTimerDisplay }}</span>
        </span>
      </div>

      <!-- Selected Seats List -->
      <div v-if="selectedSeatIds.length > 0" class="flex flex-col gap-2.5 mb-5">
        <div
          v-for="(seatId, index) in selectedSeatIds"
          :key="seatId"
          class="flex items-center justify-between p-3 rounded-xl bg-surface-2 border border-border shadow-2xs"
        >
          <div class="flex items-center gap-3">
            <div
              class="w-9 h-9 rounded-xl bg-[#F26A36] text-white font-black text-sm flex items-center justify-center shrink-0 shadow-xs"
            >
              {{ seatId }}
            </div>
            <div>
              <span class="font-bold text-xs text-text-primary block">
                Passenger {{ index + 1 }} • {{ getSeatPosition(seatId) }}
              </span>
              <span class="text-[10px] text-text-muted">
                Includes 30kg luggage + snack
              </span>
            </div>
          </div>

          <div class="text-end">
            <span class="text-xs font-black text-[#F26A36] block">
              {{ trip.price }} EGP
            </span>
            <button
              type="button"
              class="text-[11px] text-red-500 hover:text-red-600 font-semibold hover:underline cursor-pointer"
              @click="$emit('remove-seat', seatId)"
            >
              Remove
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State if no seats selected -->
      <div
        v-else
        class="p-5 rounded-xl border border-dashed border-border bg-surface-2/40 text-center mb-5"
      >
        <Icon
          name="ph:armchair-duotone"
          class="w-8 h-8 text-text-muted mx-auto mb-1.5"
        />
        <p class="text-xs font-bold text-text-primary">No seats selected yet</p>
        <p class="text-[11px] text-text-muted mt-0.5">
          Tap up to 4 available seats on the coach layout to proceed.
        </p>
      </div>

      <!-- Boarding & Drop-off Stations -->
      <div class="flex flex-col gap-2 pb-4 mb-4 border-b border-border text-xs">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 rounded-full bg-orange-500"></div>
            <div>
              <span
                class="text-[10px] text-text-muted uppercase font-bold block"
                >Boarding Station</span
              >
              <span class="font-bold text-text-primary"
                >{{ trip.departureStation }} ({{ trip.departureTime }})</span
              >
            </div>
          </div>
          <button
            type="button"
            class="text-orange-500 font-semibold text-[11px] hover:underline cursor-pointer"
            @click="$emit('change-station', 'boarding')"
          >
            Change
          </button>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 rounded-full bg-emerald-500"></div>
            <div>
              <span
                class="text-[10px] text-text-muted uppercase font-bold block"
                >Drop-off Station</span
              >
              <span class="font-bold text-text-primary"
                >{{ trip.arrivalStation }} ({{ trip.arrivalTime }})</span
              >
            </div>
          </div>
          <button
            type="button"
            class="text-orange-500 font-semibold text-[11px] hover:underline cursor-pointer"
            @click="$emit('change-station', 'dropoff')"
          >
            Change
          </button>
        </div>
      </div>

      <!-- Fare Breakdown Calculation -->
      <div class="flex flex-col gap-2 text-xs pb-4 mb-4 border-b border-border">
        <div class="flex items-center justify-between text-text-secondary">
          <span
            >Base Ticket Fare ({{ selectedSeatIds.length }} ×
            {{ trip.price }} EGP)</span
          >
          <span class="font-bold text-text-primary">{{ baseFare }} EGP</span>
        </div>
        <div class="flex items-center justify-between text-text-secondary">
          <span class="flex items-center gap-1">
            Platform & E-Ticket Service
            <Icon name="ph:info-bold" class="w-3 h-3 text-text-muted" />
          </span>
          <span class="font-bold text-text-primary">{{ serviceFee }} EGP</span>
        </div>
        <div class="flex items-center justify-between text-text-secondary">
          <span>National Transit Insurance</span>
          <span class="font-bold text-text-primary"
            >{{ insuranceFee }} EGP</span
          >
        </div>
        <div
          class="flex items-center justify-between text-emerald-600 dark:text-emerald-400 font-semibold"
        >
          <span>Online Reservation Discount</span>
          <span>- 0 EGP</span>
        </div>
      </div>

      <!-- Total Fare Box -->
      <div
        class="p-4 rounded-xl bg-orange-500/5 dark:bg-surface-2 border border-orange-500/20 flex items-center justify-between mb-5"
      >
        <div>
          <span class="text-xs font-bold text-text-primary block"
            >Total Fare</span
          >
          <span class="text-[10px] text-text-muted"
            >All Egyptian taxes & fees included</span
          >
        </div>
        <div class="text-end">
          <span
            class="text-2xl sm:text-3xl font-black text-[#F26A36] tracking-tight"
          >
            {{ totalFare }}
          </span>
          <span class="text-xs font-bold text-text-secondary ms-1">EGP</span>
        </div>
      </div>

      <!-- Primary Checkout CTA Button -->
      <LazyVButton
        size="lg"
        block
        icon-right="ph:arrow-right-bold"
        :disabled="selectedSeatIds.length === 0"
        custom-class="w-full font-bold shadow-md"
        @click="$emit('continue')"
      >
        Continue to Passenger Details
      </LazyVButton>

      <!-- Trust & Guarantee Assurances -->
      <div
        class="mt-4 pt-3 border-t border-border flex flex-col gap-2 text-[11px] text-text-secondary"
      >
        <div class="flex items-center gap-2">
          <Icon
            name="ph:shield-check-bold"
            class="w-3.5 h-3.5 text-emerald-500 shrink-0"
          />
          <span>100% Refundable up to 3 hrs prior to departure</span>
        </div>
        <div class="flex items-center gap-2">
          <Icon
            name="ph:chat-circle-text-bold"
            class="w-3.5 h-3.5 text-emerald-500 shrink-0"
          />
          <span>Instant Confirmation via SMS & WhatsApp E-ticket</span>
        </div>
        <div class="flex items-center gap-2">
          <Icon
            name="ph:seal-check-bold"
            class="w-3.5 h-3.5 text-emerald-500 shrink-0"
          />
          <span>Official Egyptian Ministry of Transport Network</span>
        </div>
      </div>

      <!-- Payment Methods Badges -->
      <div class="mt-3.5 pt-3 border-t border-border text-center">
        <span class="text-[10px] text-text-muted block mb-2 font-medium"
          >Pay securely with:</span
        >
        <div
          class="flex items-center justify-center gap-2 text-[10px] font-bold text-text-secondary flex-wrap"
        >
          <span class="px-2 py-0.5 rounded bg-surface-2 border border-border"
            >Fawry</span
          >
          <span class="px-2 py-0.5 rounded bg-surface-2 border border-border"
            >Meeza</span
          >
          <span class="px-2 py-0.5 rounded bg-surface-2 border border-border"
            >Vodafone Cash</span
          >
          <span class="px-2 py-0.5 rounded bg-surface-2 border border-border"
            >Visa</span
          >
          <span class="px-2 py-0.5 rounded bg-surface-2 border border-border"
            >Mastercard</span
          >
        </div>
      </div>
    </div>

    <!-- Hotline Assistance Card -->
    <div
      class="bg-surface-1 border border-border rounded-2xl p-4 flex items-center justify-between text-xs"
    >
      <div class="flex items-center gap-2.5">
        <div
          class="w-8 h-8 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center shrink-0"
        >
          <Icon name="ph:headset-bold" class="w-4 h-4" />
        </div>
        <div>
          <span class="font-bold text-text-primary block"
            >Need seating assistance?</span
          >
          <span class="text-[10px] text-text-muted"
            >Hotline support 24/7 in Egypt</span
          >
        </div>
      </div>
      <span
        class="text-sm font-black text-orange-600 dark:text-orange-400 font-mono"
      >
        19XXX
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Trip } from "~/types/search/results";

const props = defineProps<{
  trip: Trip;
  selectedSeatIds: string[];
  holdTimerDisplay: string;
  baseFare: number;
  serviceFee: number;
  insuranceFee: number;
  totalFare: number;
}>();

defineEmits<{
  (e: "remove-seat", seatId: string): void;
  (e: "change-station", type: "boarding" | "dropoff"): void;
  (e: "continue"): void;
}>();

const getSeatPosition = (seatId: string) => {
  const col = seatId.slice(-1);
  const row = seatId.slice(0, -1);
  const side = col === "A" || col === "D" ? "Window" : "Aisle";
  return `${side} Seat (Row ${row})`;
};
</script>