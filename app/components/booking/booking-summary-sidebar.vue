<template>
  <div class="flex flex-col gap-4 sticky top-32 text-start">
    <!-- Main Booking Summary Card -->
    <div class="bg-surface-1 border border-border rounded-2xl p-5 shadow-xs">
      <!-- Header -->
      <div
        class="flex items-center justify-between pb-3.5 border-b border-border mb-4"
      >
        <h3 class="font-extrabold text-base text-text-primary">
          Booking Summary
        </h3>
        <span
          class="px-2.5 py-0.5 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 font-extrabold text-xs border border-orange-500/20"
        >
          {{ seats.length }} Seat{{ seats.length > 1 ? "s" : "" }}
        </span>
      </div>

      <!-- Coach & Journey Box -->
      <div class="p-3.5 rounded-xl bg-surface-2 border border-border mb-4">
        <div
          class="flex items-center justify-between pb-2.5 border-b border-border mb-3"
        >
          <div class="flex items-center gap-2">
            <div
              class="w-6 h-6 rounded-lg bg-orange-500/10 text-[#A1331B] dark:text-orange-400 flex items-center justify-center font-bold text-xs"
            >
              <Icon name="ph:bus-fill" class="w-3.5 h-3.5" />
            </div>
            <span class="font-bold text-xs text-text-primary">
              {{ trip.operatorName }} {{ trip.busClass }}
            </span>
          </div>

          <span class="text-[11px] font-semibold text-text-muted">
            Class: VIP
          </span>
        </div>

        <!-- Timeline -->
        <div class="flex flex-col gap-3 relative text-xs">
          <!-- Departure -->
          <div class="flex items-start justify-between gap-2">
            <div class="flex items-start gap-2.5">
              <div
                class="w-2 h-2 rounded-full bg-orange-500 mt-1.5 shrink-0"
              ></div>
              <div>
                <span
                  class="font-bold text-sm text-text-primary block leading-tight"
                >
                  {{ trip.departureTime }}
                </span>
                <span class="text-[11px] text-text-secondary">
                  {{ trip.departureCity }} ({{ trip.departureStation }})
                </span>
              </div>
            </div>
            <span class="text-[11px] font-medium text-text-muted shrink-0">
              Thu, 24 Oct
            </span>
          </div>

          <!-- Duration Line -->
          <div
            class="ps-3.5 -my-1 text-[11px] text-text-muted font-medium flex items-center gap-1.5"
          >
            <span class="w-px h-6 bg-border block"></span>
            <span>{{ trip.duration }} • Non-Stop Express Route</span>
          </div>

          <!-- Arrival -->
          <div class="flex items-start justify-between gap-2">
            <div class="flex items-start gap-2.5">
              <div
                class="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0"
              ></div>
              <div>
                <span
                  class="font-bold text-sm text-text-primary block leading-tight"
                >
                  {{ trip.arrivalTime }}
                </span>
                <span class="text-[11px] text-text-secondary">
                  {{ trip.arrivalCity }} ({{ trip.arrivalStation }})
                </span>
              </div>
            </div>
            <span class="text-[11px] font-medium text-text-muted shrink-0">
              Thu, 24 Oct
            </span>
          </div>
        </div>

        <!-- Amenities Mini Bar -->
        <div
          class="mt-3.5 pt-2.5 border-t border-border flex items-center justify-around text-[10px] font-semibold text-text-secondary"
        >
          <span class="inline-flex items-center gap-1">
            <Icon
              name="ph:wifi-high-bold"
              class="w-3.5 h-3.5 text-text-muted"
            />
            Free Wi-Fi
          </span>
          <span>•</span>
          <span class="inline-flex items-center gap-1">
            <Icon name="ph:plug-bold" class="w-3.5 h-3.5 text-text-muted" />
            USB Plug
          </span>
          <span>•</span>
          <span class="inline-flex items-center gap-1">
            <Icon name="ph:toilet-bold" class="w-3.5 h-3.5 text-text-muted" />
            Restroom
          </span>
        </div>
      </div>

      <!-- Price Breakdown -->
      <div class="flex flex-col gap-2 text-xs pb-4 mb-4 border-b border-border">
        <div
          v-for="(seat, idx) in seats"
          :key="seat"
          class="flex items-center justify-between text-text-secondary"
        >
          <span
            >Seat {{ seat }} ({{ idx === 0 ? "Window" : "Aisle" }} •
            Adult)</span
          >
          <span class="font-bold text-text-primary">{{ trip.price }} EGP</span>
        </div>

        <div class="flex items-center justify-between text-text-secondary">
          <span>E-Ticket & Terminal Processing Fee</span>
          <span class="font-bold text-text-primary">{{ serviceFee }} EGP</span>
        </div>

        <div class="flex items-center justify-between text-text-secondary">
          <span class="inline-flex items-center gap-1">
            Transit Passenger Insurance
            <Icon name="ph:info-bold" class="w-3 h-3 text-text-muted" />
          </span>
          <span class="font-bold text-text-primary"
            >{{ insuranceFee }} EGP</span
          >
        </div>

        <div
          class="flex items-center justify-between text-emerald-600 dark:text-emerald-400 font-semibold"
        >
          <span>Online Early-Bird Promo</span>
          <span>0 EGP</span>
        </div>
      </div>

      <!-- Total Payable Box -->
      <div
        class="p-4 rounded-xl bg-orange-500/5 dark:bg-surface-2 border border-orange-500/20 flex items-center justify-between mb-5"
      >
        <div>
          <span
            class="text-[10px] font-bold text-text-muted uppercase tracking-wider block"
          >
            TOTAL PAYABLE
          </span>
          <span class="text-[10px] text-text-muted">
            Includes all taxes & VAT
          </span>
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

      <!-- Main Pay CTA Button -->
      <button
        type="button"
        class="w-full bg-[#A1331B] hover:bg-[#8B2B16] text-white py-3.5 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-orange-950/10 hover:shadow-lg transition-all active:scale-[0.99] cursor-pointer"
        @click="$emit('confirm-payment')"
      >
        <span>Pay {{ totalFare }} EGP & Confirm Booking</span>
        <Icon name="ph:arrow-right-bold" class="w-4 h-4 rtl:rotate-180" />
      </button>

      <!-- Trust Guarantees Notes -->
      <div
        class="mt-4 pt-3 border-t border-border flex flex-col gap-2 text-[11px] text-text-secondary"
      >
        <div class="flex items-start gap-2">
          <Icon
            name="ph:arrow-counter-clockwise-bold"
            class="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5"
          />
          <span
            >Free Cancellation & Instant Refund via wallet or card up to 3 hours
            prior to departure.</span
          >
        </div>

        <div class="flex items-start gap-2">
          <Icon
            name="ph:qr-code-bold"
            class="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5"
          />
          <span>Instant QR-code boarding pass sent via WhatsApp and SMS.</span>
        </div>

        <div
          class="flex items-center justify-between pt-2 border-t border-border/60 text-xs"
        >
          <span class="text-text-muted">Questions regarding booking?</span>
          <span
            class="font-bold text-orange-600 dark:text-orange-400 inline-flex items-center gap-1"
          >
            <Icon name="ph:phone-call-bold" class="w-3.5 h-3.5" />
            Hotline 19XXX
          </span>
        </div>
      </div>
    </div>

    <!-- Seat Guarantee Promise Box -->
    <div class="bg-surface-1 border border-border rounded-2xl p-4 shadow-xs">
      <div class="flex items-start gap-3">
        <div
          class="w-8 h-8 rounded-xl bg-orange-500/10 text-[#A1331B] dark:text-orange-400 flex items-center justify-center shrink-0 mt-0.5"
        >
          <Icon name="ph:shield-star-bold" class="w-4 h-4" />
        </div>
        <div>
          <span class="font-bold text-xs text-text-primary block">
            Seat Guarantee Promise
          </span>
          <p class="text-[11px] text-text-secondary mt-0.5 leading-relaxed">
            Your reserved seats {{ seats.join(" & ") }} are held exclusively. No
            double-booking occurs under Otobisi &
            {{ trip.operatorName }} real-time API sync.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Trip } from "~/types/search/results";

const props = defineProps<{
  trip: Trip;
  seats: string[];
  baseFare: number;
  serviceFee: number;
  insuranceFee: number;
  totalFare: number;
}>();

defineEmits<{
  (e: "confirm-payment"): void;
}>();
</script>