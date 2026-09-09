<template>
  <div
    class="max-w-4xl mx-auto bg-surface-1 border border-border rounded-2xl shadow-xl overflow-hidden text-start"
  >
    <!-- Top Gradient Accent Strip -->
    <div
      class="h-1.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500"
    ></div>

    <!-- Main Ticket Body -->
    <div class="p-5 sm:p-7">
      <!-- Ticket Header Info Row -->
      <div
        class="flex flex-wrap items-start justify-between gap-4 pb-5 border-b border-border"
      >
        <div class="flex items-start gap-3.5">
          <div
            class="w-11 h-11 rounded-xl bg-orange-500/10 text-[#A1331B] dark:text-orange-400 flex items-center justify-center font-black text-sm shrink-0 shadow-xs"
          >
            <Icon name="ph:bus-fill" class="w-6 h-6" />
          </div>

          <div>
            <div class="flex items-center gap-2 flex-wrap">
              <h2 class="text-base sm:text-lg font-extrabold text-text-primary">
                {{ trip.operatorName }} {{ trip.busClass }}
              </h2>

              <span
                class="px-2 py-0.5 rounded text-[10px] font-extrabold bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20"
              >
                VIP Express
              </span>

              <span
                class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
              >
                <Icon name="ph:shield-check-fill" class="w-3 h-3" />
                MOT Verified
              </span>
            </div>

            <p class="text-xs text-text-secondary mt-1">
              Coach: Mercedes-Benz MCV 600 • License: #EG-MOT-4421 • Trip ID:
              GB-ALX-0830
            </p>
          </div>
        </div>

        <div class="text-end">
          <span
            class="text-[10px] font-bold text-text-muted uppercase tracking-wider block"
          >
            Seat Reservation
          </span>
          <span
            class="text-base sm:text-lg font-black text-[#A1331B] dark:text-orange-400"
          >
            {{ seats.length }} Confirmed
          </span>
        </div>
      </div>

      <!-- Journey Route Box -->
      <div
        class="mt-5 p-4 sm:p-5 rounded-2xl bg-surface-2 border border-border"
      >
        <div class="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <!-- Origin -->
          <div class="md:col-span-4">
            <span
              class="px-2 py-0.5 rounded text-[9px] font-extrabold bg-orange-500/10 text-[#A1331B] dark:text-orange-400 uppercase tracking-wider inline-block mb-1.5"
            >
              Origin
            </span>
            <div class="text-xl sm:text-2xl font-black text-text-primary">
              {{ trip.departureTime }}
            </div>
            <div class="font-extrabold text-sm text-text-primary mt-0.5">
              {{ trip.departureCity }}
            </div>
            <div class="text-xs text-text-secondary mt-0.5">
              {{ trip.departureStation }}
            </div>
            <div class="text-[11px] text-text-muted mt-1 font-medium">
              {{ formattedDate }}
            </div>
          </div>

          <!-- Middle Highway & Duration Connector -->
          <div
            class="md:col-span-4 flex flex-col items-center justify-center text-center py-2 md:py-0"
          >
            <span
              class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-surface-1 border border-border text-text-secondary mb-2"
            >
              <Icon name="ph:clock-bold" class="w-3 h-3 text-orange-500" />
              {{ trip.duration }} (Non-Stop Express)
            </span>

            <div
              class="relative w-full max-w-[180px] my-1 flex items-center justify-center"
            >
              <span class="w-2 h-2 rounded-full bg-orange-500 shrink-0"></span>
              <span
                class="flex-1 h-px border-t border-dashed border-border mx-1"
              ></span>
              <Icon
                name="ph:bus-fill"
                class="w-4 h-4 text-orange-500 shrink-0 mx-1"
              />
              <span
                class="flex-1 h-px border-t border-dashed border-border mx-1"
              ></span>
              <span class="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
            </div>

            <span
              class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/20 mt-1"
            >
              Via Cairo - Alexandria Desert Highway
            </span>
          </div>

          <!-- Destination -->
          <div class="md:col-span-4 md:text-end">
            <span
              class="px-2 py-0.5 rounded text-[9px] font-extrabold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 uppercase tracking-wider inline-block mb-1.5"
            >
              Destination
            </span>
            <div class="text-xl sm:text-2xl font-black text-text-primary">
              {{ trip.arrivalTime }}
            </div>
            <div class="font-extrabold text-sm text-text-primary mt-0.5">
              {{ trip.arrivalCity }}
            </div>
            <div class="text-xs text-text-secondary mt-0.5">
              {{ trip.arrivalStation }}
            </div>
            <div class="text-[11px] text-text-muted mt-1 font-medium">
              {{ formattedDate }}
            </div>
          </div>
        </div>
      </div>

      <!-- Passengers & Seats Cards Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3.5 mt-4">
        <!-- Passenger 1 -->
        <div
          class="p-3.5 rounded-xl bg-surface-2 border border-border flex items-center justify-between gap-3"
        >
          <div>
            <span
              class="text-[10px] font-bold text-text-muted uppercase tracking-wider block"
            >
              Lead Passenger
            </span>
            <span class="font-bold text-sm text-text-primary block mt-0.5">
              Ahmed Mohamed Mostafa
            </span>
            <div
              class="flex items-center gap-1.5 mt-1 text-[11px] text-text-secondary"
            >
              <span
                class="text-emerald-600 dark:text-emerald-400 font-semibold inline-flex items-center gap-0.5"
              >
                <Icon name="ph:check-bold" class="w-3 h-3" />
                National ID: Verified
              </span>
              <span>•</span>
              <span>Adult • Egyptian</span>
            </div>
          </div>

          <div
            class="px-3 py-1.5 rounded-xl bg-[#A1331B] text-white text-center shrink-0 shadow-xs"
          >
            <span class="text-[9px] uppercase font-bold block opacity-80"
              >Seat No.</span
            >
            <span class="text-sm font-black">{{ seats[0] || "4A" }}</span>
            <span class="text-[9px] block opacity-80">Window</span>
          </div>
        </div>

        <!-- Passenger 2 -->
        <div
          v-if="seats.length > 1"
          class="p-3.5 rounded-xl bg-surface-2 border border-border flex items-center justify-between gap-3"
        >
          <div>
            <span
              class="text-[10px] font-bold text-text-muted uppercase tracking-wider block"
            >
              Passenger 2
            </span>
            <span class="font-bold text-sm text-text-primary block mt-0.5">
              Nour El-Din Hassan
            </span>
            <div
              class="flex items-center gap-1.5 mt-1 text-[11px] text-text-secondary"
            >
              <span
                class="text-emerald-600 dark:text-emerald-400 font-semibold inline-flex items-center gap-0.5"
              >
                <Icon name="ph:check-bold" class="w-3 h-3" />
                National ID: Verified
              </span>
              <span>•</span>
              <span>Adult • Egyptian</span>
            </div>
          </div>

          <div
            class="px-3 py-1.5 rounded-xl bg-[#A1331B] text-white text-center shrink-0 shadow-xs"
          >
            <span class="text-[9px] uppercase font-bold block opacity-80"
              >Seat No.</span
            >
            <span class="text-sm font-black">{{ seats[1] || "4B" }}</span>
            <span class="text-[9px] block opacity-80">Aisle</span>
          </div>
        </div>
      </div>

      <!-- Boarding Gate & Doors Info Bar -->
      <div
        class="mt-4 p-3 rounded-xl bg-orange-500/5 dark:bg-surface-2 border border-orange-500/20 flex flex-wrap items-center justify-between gap-3 text-xs"
      >
        <div class="flex items-center gap-2 font-bold text-text-primary">
          <Icon
            name="ph:signpost-bold"
            class="w-4 h-4 text-[#A1331B] dark:text-orange-400 shrink-0"
          />
          <span>Boarding Gate: Terminal 2, Bay 4 (Almaza)</span>
        </div>

        <div
          class="flex items-center gap-1.5 text-xs font-semibold text-orange-600 dark:text-orange-400"
        >
          <Icon name="ph:clock-bold" class="w-3.5 h-3.5 shrink-0" />
          <span>Coach doors open at 08:00 AM (30 minutes prior)</span>
        </div>
      </div>

      <!-- Amenities & Baggage Strip -->
      <div
        class="mt-4 pt-3.5 border-t border-border flex flex-wrap items-center justify-around gap-2.5 text-[11px] font-semibold text-text-secondary"
      >
        <div class="flex items-center gap-1">
          <Icon
            name="ph:suitcase-bold"
            class="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400"
          />
          <span>30 kg luggage + 7 kg cabin bag</span>
        </div>

        <div class="flex items-center gap-1">
          <Icon name="ph:wifi-high-bold" class="w-3.5 h-3.5 text-blue-500" />
          <span>Free High-speed 5G Wi-Fi</span>
        </div>

        <div class="flex items-center gap-1">
          <Icon name="ph:plug-bold" class="w-3.5 h-3.5 text-amber-500" />
          <span>Personal 220V/USB outlets</span>
        </div>

        <div class="flex items-center gap-1">
          <Icon name="ph:toilet-bold" class="w-3.5 h-3.5 text-emerald-500" />
          <span>Clean onboard restroom</span>
        </div>

        <div class="flex items-center gap-1">
          <Icon name="ph:snowflake-bold" class="w-3.5 h-3.5 text-cyan-500" />
          <span>Climate control</span>
        </div>
      </div>
    </div>

    <!-- Perforation Cut Divider with Semicircle Notches -->
    <div class="relative flex items-center justify-between">
      <div
        class="w-5 h-8 bg-surface-0 rounded-e-full border-y border-e border-border -ms-px"
      ></div>
      <div class="flex-1 border-b border-dashed border-border mx-3"></div>
      <div
        class="w-5 h-8 bg-surface-0 rounded-s-full border-y border-s border-border -me-px"
      ></div>
    </div>

    <!-- Ticket Voucher / QR Code & Fare Breakdown Section -->
    <div class="p-5 sm:p-7 bg-surface-1">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <!-- QR Code Block -->
        <div
          class="md:col-span-4 flex flex-col items-center justify-center text-center"
        >
          <div class="p-3 bg-white rounded-2xl border border-border shadow-md">
            <!-- High density styled QR graphic -->
            <svg
              class="w-32 h-32 text-gray-900"
              viewBox="0 0 100 100"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <!-- QR Corner 1 -->
              <rect x="5" y="5" width="26" height="26" rx="4" fill="black" />
              <rect x="9" y="9" width="18" height="18" fill="white" />
              <rect x="13" y="13" width="10" height="10" rx="2" fill="black" />

              <!-- QR Corner 2 -->
              <rect x="69" y="5" width="26" height="26" rx="4" fill="black" />
              <rect x="73" y="9" width="18" height="18" fill="white" />
              <rect x="77" y="13" width="10" height="10" rx="2" fill="black" />

              <!-- QR Corner 3 -->
              <rect x="5" y="69" width="26" height="26" rx="4" fill="black" />
              <rect x="9" y="73" width="18" height="18" fill="white" />
              <rect x="13" y="77" width="10" height="10" rx="2" fill="black" />

              <!-- QR Body Data Pattern -->
              <rect x="36" y="8" width="6" height="6" fill="black" />
              <rect x="46" y="8" width="6" height="6" fill="black" />
              <rect x="56" y="8" width="6" height="6" fill="black" />
              <rect x="36" y="18" width="6" height="6" fill="black" />
              <rect x="50" y="18" width="6" height="6" fill="black" />
              <rect x="8" y="36" width="6" height="6" fill="black" />
              <rect x="18" y="36" width="6" height="6" fill="black" />
              <rect x="28" y="36" width="6" height="6" fill="black" />
              <rect
                x="38"
                y="36"
                width="10"
                height="10"
                rx="2"
                fill="#A1331B"
              />
              <rect x="52" y="36" width="6" height="6" fill="black" />
              <rect x="62" y="36" width="6" height="6" fill="black" />
              <rect x="76" y="36" width="6" height="6" fill="black" />
              <rect x="86" y="36" width="6" height="6" fill="black" />

              <rect x="8" y="46" width="6" height="6" fill="black" />
              <rect x="22" y="46" width="6" height="6" fill="black" />
              <rect x="36" y="48" width="6" height="6" fill="black" />
              <rect x="46" y="48" width="6" height="6" fill="black" />
              <rect x="58" y="48" width="6" height="6" fill="black" />
              <rect x="72" y="46" width="6" height="6" fill="black" />
              <rect x="84" y="46" width="6" height="6" fill="black" />

              <rect x="8" y="56" width="6" height="6" fill="black" />
              <rect x="28" y="56" width="6" height="6" fill="black" />
              <rect x="36" y="58" width="6" height="6" fill="black" />
              <rect x="48" y="58" width="6" height="6" fill="black" />
              <rect x="62" y="58" width="6" height="6" fill="black" />
              <rect x="76" y="56" width="6" height="6" fill="black" />

              <rect x="36" y="69" width="6" height="6" fill="black" />
              <rect x="48" y="69" width="6" height="6" fill="black" />
              <rect x="62" y="69" width="6" height="6" fill="black" />
              <rect x="76" y="69" width="6" height="6" fill="black" />
              <rect x="86" y="69" width="6" height="6" fill="black" />

              <rect x="36" y="79" width="6" height="6" fill="black" />
              <rect x="52" y="79" width="6" height="6" fill="black" />
              <rect x="66" y="79" width="6" height="6" fill="black" />
              <rect x="78" y="79" width="6" height="6" fill="black" />
            </svg>
          </div>

          <span class="text-xs font-bold text-text-primary mt-2">
            Scan at Coach Door / Terminal Gate
          </span>
          <span class="font-mono text-[10px] text-text-muted mt-0.5">
            *OTB-849204-EG-ALM2-ALX*
          </span>
        </div>

        <!-- Receipt & Total Breakdown -->
        <div class="md:col-span-8 flex flex-col justify-between">
          <div
            class="flex flex-col gap-1.5 text-xs text-text-secondary pb-3 border-b border-border"
          >
            <div class="flex items-center justify-between">
              <span
                >Base Fare ({{ seats.length }} Seats × {{ trip.price }}.00
                EGP)</span
              >
              <span class="font-bold text-text-primary"
                >{{ baseFare }}.00 EGP</span
              >
            </div>
            <div class="flex items-center justify-between">
              <span>Terminal Service & Station Surcharge</span>
              <span class="font-bold text-text-primary">10.00 EGP</span>
            </div>
            <div class="flex items-center justify-between">
              <span>Passenger Safety Insurance (Egyptian MOT)</span>
              <span class="font-bold text-text-primary">5.00 EGP</span>
            </div>
          </div>

          <!-- Total Box -->
          <div class="flex items-center justify-between py-3">
            <div>
              <span
                class="font-black text-sm sm:text-base text-text-primary block"
              >
                Total Paid
              </span>
              <span
                class="text-xs text-emerald-600 dark:text-emerald-400 font-semibold inline-flex items-center gap-1"
              >
                <Icon name="ph:check-circle-bold" class="w-3.5 h-3.5" />
                Paid via Egyptian Meeza Card (•••• 1084)
              </span>
            </div>

            <div class="text-end">
              <span
                class="text-2xl sm:text-3xl font-black text-[#A1331B] dark:text-orange-400"
              >
                {{ totalPaid }}.00
              </span>
              <span class="text-xs font-bold text-text-secondary ms-1"
                >EGP</span
              >
            </div>
          </div>

          <!-- Tax Invoice Footer -->
          <div
            class="p-2.5 rounded-xl bg-surface-2 border border-border flex flex-wrap items-center justify-between gap-2 text-xs font-medium text-text-secondary"
          >
            <span
              >VAT Invoice Number:
              <strong class="text-text-primary font-mono"
                >EGY-TAX-2024-91834</strong
              ></span
            >
            <button
              type="button"
              class="inline-flex items-center gap-1 text-[#A1331B] dark:text-orange-400 font-bold hover:underline cursor-pointer"
            >
              <Icon name="ph:receipt-bold" class="w-3.5 h-3.5" />
              <span>Download Tax Receipt</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Trip } from "~/types/search/results";

const props = withDefaults(
  defineProps<{
    trip: Trip;
    seats: string[];
    formattedDate?: string;
  }>(),
  {
    formattedDate: "Thursday, 24 October 2024",
  },
);

const baseFare = computed(() => props.seats.length * (props.trip.price || 145));
const totalPaid = computed(
  () => baseFare.value + (props.seats.length > 0 ? 15 : 0),
);
</script>