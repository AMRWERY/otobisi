<template>
  <div class="mb-8">
    <!-- Section Title & Subtitle -->
    <div class="flex items-center justify-between gap-3 mb-3.5">
      <div class="flex items-center gap-2">
        <h2 class="text-base sm:text-lg font-black text-text-primary tracking-tight">
          Upcoming Trips
        </h2>
        <span
          class="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center text-[10px] font-black"
        >
          1
        </span>
      </div>
      <span class="text-xs text-text-muted font-medium hidden sm:inline">
        Guaranteed Seat Allocations
      </span>
    </div>

    <!-- Main Upcoming Booking Card -->
    <div
      class="bg-surface-1 border border-border rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden"
    >
      <!-- Top Card Meta Strip -->
      <div
        class="px-4 sm:px-6 py-2.5 bg-surface-2/60 border-b border-border flex flex-wrap items-center justify-between gap-3 text-xs"
      >
        <div class="flex items-center gap-2.5 flex-wrap">
          <span
            class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Confirmed • In 3 Days</span>
          </span>

          <div class="flex items-center gap-1 font-mono text-text-secondary text-xs">
            <span>PNR:</span>
            <strong class="text-text-primary font-black">#OTB-849204-EG</strong>
            <button
              type="button"
              class="p-1 hover:text-text-primary text-text-muted cursor-pointer transition-colors"
              title="Copy PNR"
              @click="copyPnr"
            >
              <Icon :name="copied ? 'ph:check-bold' : 'ph:copy-bold'" class="w-3.5 h-3.5" :class="copied ? 'text-emerald-500' : ''" />
            </button>
          </div>
        </div>

        <div class="flex items-center gap-1.5 text-[11px] text-text-muted font-medium ms-auto sm:ms-0">
          <Icon name="ph:calendar-blank-bold" class="w-3.5 h-3.5 text-orange-500" />
          <span>Booked on 18 Oct 2024</span>
        </div>
      </div>

      <!-- Main Journey Card Body -->
      <div class="p-4 sm:p-6">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
          <!-- Left / Middle Route & Operator Content -->
          <div class="lg:col-span-8 flex flex-col gap-4">
            <!-- Operator Line -->
            <div class="flex items-center gap-3">
              <div
                class="w-10 h-10 rounded-xl bg-orange-500/10 text-[#A1331B] dark:text-orange-400 flex items-center justify-center shrink-0 shadow-2xs"
              >
                <Icon name="ph:bus-fill" class="w-5 h-5" />
              </div>
              <div>
                <div class="flex items-center gap-2 flex-wrap">
                  <h3 class="font-black text-base text-text-primary">
                    Go Bus
                  </h3>
                  <span
                    class="px-2 py-0.5 rounded text-[10px] font-extrabold bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20"
                  >
                    Elite Plus
                  </span>
                  <span class="text-xs text-text-secondary font-medium">
                    MCV 600
                  </span>
                </div>
                <p class="text-[11px] text-text-muted mt-0.5">
                  Mercedes-Benz MCV 600 • Free Wi-Fi, AC & WC
                </p>
              </div>
            </div>

            <!-- Detailed Route Timeline -->
            <div
              class="p-3.5 sm:p-4 rounded-xl bg-surface-2/70 border border-border grid grid-cols-1 sm:grid-cols-12 gap-3 items-center"
            >
              <!-- Departure -->
              <div class="sm:col-span-4">
                <span
                  class="px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-orange-500/10 text-[#A1331B] dark:text-orange-400 uppercase tracking-wider inline-block mb-1"
                >
                  DEPARTURE
                </span>
                <div class="text-lg font-black text-text-primary">
                  08:30 AM
                </div>
                <div class="font-bold text-xs text-text-primary mt-0.5">
                  Cairo
                </div>
                <div class="text-[11px] text-text-secondary line-clamp-1">
                  Almaza Intercity Terminal, Bay 4
                </div>
                <div class="text-[10px] text-text-muted mt-0.5">
                  Thu, 24 Oct 2024
                </div>
              </div>

              <!-- Duration Connector -->
              <div class="sm:col-span-4 flex flex-col items-center justify-center text-center py-1 sm:py-0">
                <span class="text-[10px] font-bold text-text-muted">
                  2h 45m
                </span>
                <div class="relative w-full max-w-[130px] my-1 flex items-center justify-center">
                  <span class="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0"></span>
                  <span class="flex-1 h-px border-t border-dashed border-border mx-1"></span>
                  <Icon name="ph:bus-fill" class="w-3.5 h-3.5 text-orange-500 shrink-0 mx-0.5" />
                  <span class="flex-1 h-px border-t border-dashed border-border mx-1"></span>
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                </div>
                <span
                  class="text-[9px] font-extrabold uppercase text-text-secondary tracking-wider"
                >
                  NON-STOP DESERT RD
                </span>
                <span class="text-[9px] text-text-muted mt-0.5">
                  Via Cairo-Alex Desert Road
                </span>
              </div>

              <!-- Arrival -->
              <div class="sm:col-span-4 sm:text-end">
                <span
                  class="px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 uppercase tracking-wider inline-block mb-1"
                >
                  ARRIVAL
                </span>
                <div class="text-lg font-black text-text-primary">
                  11:15 AM
                </div>
                <div class="font-bold text-xs text-text-primary mt-0.5">
                  Alexandria
                </div>
                <div class="text-[11px] text-text-secondary line-clamp-1">
                  Sidi Gaber Express Station
                </div>
                <div class="text-[10px] text-text-muted mt-0.5">
                  Thu, 24 Oct 2024
                </div>
              </div>
            </div>

            <!-- Amenities Row -->
            <div class="flex items-center gap-3 text-text-muted text-xs">
              <span class="p-1 rounded-md bg-surface-2" title="Wi-Fi">
                <Icon name="ph:wifi-high-bold" class="w-3.5 h-3.5 text-blue-500" />
              </span>
              <span class="p-1 rounded-md bg-surface-2" title="Power Plugs">
                <Icon name="ph:plug-bold" class="w-3.5 h-3.5 text-amber-500" />
              </span>
              <span class="p-1 rounded-md bg-surface-2" title="Onboard Restroom">
                <Icon name="ph:toilet-bold" class="w-3.5 h-3.5 text-emerald-500" />
              </span>
              <span class="p-1 rounded-md bg-surface-2" title="Climate Control">
                <Icon name="ph:snowflake-bold" class="w-3.5 h-3.5 text-cyan-500" />
              </span>
              <span class="p-1 rounded-md bg-surface-2" title="Luggage Allowance">
                <Icon name="ph:suitcase-bold" class="w-3.5 h-3.5 text-orange-500" />
              </span>
            </div>
          </div>

          <!-- Right Column: Price & Main CTA -->
          <div
            class="lg:col-span-4 flex flex-col justify-between items-start lg:items-end lg:border-s lg:border-border lg:ps-6 gap-3 h-full"
          >
            <div class="lg:text-end w-full">
              <span class="text-[10px] font-bold text-text-muted uppercase tracking-wider block">
                Total Fare Paid
              </span>
              <div class="flex items-baseline lg:justify-end gap-1 mt-0.5">
                <span class="text-2xl sm:text-3xl font-black text-[#A1331B] dark:text-orange-400">
                  305.00
                </span>
                <span class="text-xs font-bold text-text-secondary">EGP</span>
              </div>
              <span
                class="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold inline-flex items-center gap-1 mt-1"
              >
                <Icon name="ph:credit-card-bold" class="w-3 h-3" />
                Paid via Meeza Card (•••• 9021)
              </span>
            </div>

            <!-- View Ticket Button -->
            <nuxt-link-locale
              to="/booking/gb-01/confirm?seats=4A,4B&date=2024-10-24"
              class="w-full bg-[#A1331B] hover:bg-[#8B2B16] text-white py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm shadow-orange-950/10 hover:shadow-md transition-all active:scale-98"
            >
              <Icon name="ph:qr-code-bold" class="w-4 h-4" />
              <span>View Ticket & QR</span>
            </nuxt-link-locale>
          </div>
        </div>
      </div>

      <!-- Bottom Strip: Passengers & Secondary Actions -->
      <div
        class="px-4 sm:px-6 py-3 bg-surface-2/50 border-t border-border flex flex-wrap items-center justify-between gap-3 text-xs"
      >
        <!-- Passengers Tag List -->
        <div class="flex items-center gap-2 flex-wrap">
          <span class="font-bold text-text-primary flex items-center gap-1 text-[11px]">
            <Icon name="ph:users-bold" class="w-3.5 h-3.5 text-orange-500" />
            <span>2 Passengers:</span>
          </span>

          <div class="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-1 border border-border text-[11px]">
            <span class="w-4 h-4 rounded-full bg-orange-500/20 text-[#A1331B] dark:text-orange-400 font-black text-[9px] flex items-center justify-center">1</span>
            <span class="font-semibold text-text-primary">Ahmed Mohamed Mostafa</span>
            <span class="px-1.5 py-0.2 rounded text-[10px] font-extrabold bg-[#A1331B] text-white ms-1">Seat 4A (Window)</span>
          </div>

          <div class="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-1 border border-border text-[11px]">
            <span class="w-4 h-4 rounded-full bg-orange-500/20 text-[#A1331B] dark:text-orange-400 font-black text-[9px] flex items-center justify-center">2</span>
            <span class="font-semibold text-text-primary">Nour El-Din Hassan</span>
            <span class="px-1.5 py-0.2 rounded text-[10px] font-extrabold bg-[#A1331B] text-white ms-1">Seat 4B (Aisle)</span>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="flex items-center gap-3 ms-auto sm:ms-0 text-text-secondary text-xs">
          <button
            type="button"
            class="inline-flex items-center gap-1 hover:text-text-primary transition-colors cursor-pointer font-semibold"
            @click="downloadPdf"
          >
            <Icon name="ph:download-simple-bold" class="w-3.5 h-3.5 text-orange-500" />
            <span>PDF E-Ticket</span>
          </button>

          <button
            type="button"
            class="inline-flex items-center gap-1 hover:text-text-primary transition-colors cursor-pointer font-semibold"
            @click="addToCalendar"
          >
            <Icon name="ph:calendar-plus-bold" class="w-3.5 h-3.5 text-blue-500" />
            <span>Add to Calendar</span>
          </button>

          <button
            type="button"
            class="inline-flex items-center gap-1 hover:text-red-500 transition-colors cursor-pointer font-semibold"
            @click="changeOrCancel"
          >
            <Icon name="ph:arrow-counter-clockwise-bold" class="w-3.5 h-3.5 text-amber-500" />
            <span>Change / Cancel</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const copied = ref(false);

const copyPnr = async () => {
  try {
    if (navigator?.clipboard) {
      await navigator.clipboard.writeText("OTB-849204-EG");
      copied.value = true;
      setTimeout(() => (copied.value = false), 2000);
    }
  } catch {
    copied.value = true;
    setTimeout(() => (copied.value = false), 2000);
  }
};

const downloadPdf = () => {
  alert("Downloading official E-Ticket PDF for PNR #OTB-849204-EG...");
};

const addToCalendar = () => {
  alert("Added Cairo ➔ Alexandria trip to your calendar.");
};

const changeOrCancel = () => {
  alert("Redirecting to Manage Booking self-service cancellation / rescheduling...");
};
</script>
