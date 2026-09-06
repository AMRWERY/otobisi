<template>
  <div>
    <section>
      <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div>
          <span
            class="text-[10px] font-bold tracking-wider text-red-600 uppercase"
            >Live Availability</span
          >
          <h3 class="text-lg font-bold text-text-primary">
            Featured Departure · Cairo to Alexandria
          </h3>
        </div>
        <div class="flex items-center gap-2">
          <!-- Toggle chips -->
          <div
            class="flex items-center gap-1.5 bg-surface-2 border border-border p-0.5 rounded-lg text-[11px] font-medium text-text-secondary"
          >
            <span class="px-2 text-text-muted">Egypt View:</span>
            <button
              class="px-2 py-0.5 bg-surface-1 rounded shadow-2xs text-text-primary flex items-center gap-1"
            >
              <Icon name="ph:arrows-left-right" class="w-3 h-3" /> Switch to RTL
            </button>
            <button
              class="px-2 py-0.5 hover:text-text-primary flex items-center gap-1"
            >
              <Icon name="ph:sparkle" class="w-3 h-3" /> Dark Surface
            </button>
          </div>
          <span
            class="bg-emerald-50 text-emerald-700 text-[11px] font-semibold px-2.5 py-1 rounded-full border border-emerald-200"
          >
            18 seats left on this coach
          </span>
        </div>
      </div>

      <!-- Departure Card -->
      <div
        class="bg-surface-1 border border-border rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
      >
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <!-- Operator Info -->
          <div class="lg:col-span-3 flex items-center gap-3">
            <div
              class="w-11 h-11 rounded-xl bg-surface-2 border border-border flex items-center justify-center font-black text-text-secondary text-xs tracking-tighter"
            >
              GO
            </div>
            <div>
              <div class="flex items-center gap-1.5">
                <h4 class="font-bold text-sm text-text-primary">
                  Go Bus Egypt
                </h4>
                <span
                  class="text-[10px] font-bold bg-amber-50 text-amber-600 border border-amber-200 px-1.5 py-0.2 rounded"
                  >Elite VIP</span
                >
              </div>
              <p class="text-[11px] text-text-secondary">
                Mercedes-Benz MCV 600 · 2+1 Seating
              </p>

              <!-- Amenities -->
              <div
                class="flex items-center gap-3 text-text-muted text-xs mt-1.5"
              >
                <span
                  title="Wi-Fi"
                  class="flex items-center gap-0.5 text-[10px]"
                  ><Icon
                    name="ph:wifi-high"
                    class="w-3.5 h-3.5 text-text-secondary"
                  />
                  Wi-Fi</span
                >
                <span
                  title="USB Charging"
                  class="flex items-center gap-0.5 text-[10px]"
                  ><Icon
                    name="ph:plug"
                    class="w-3.5 h-3.5 text-text-secondary"
                  />
                  USB</span
                >
                <span
                  title="Air Conditioning"
                  class="flex items-center gap-0.5 text-[10px]"
                  ><Icon
                    name="ph:snowflake"
                    class="w-3.5 h-3.5 text-cyan-600"
                  />
                  A/C</span
                >
                <span
                  title="Restroom"
                  class="flex items-center gap-0.5 text-[10px]"
                  ><Icon
                    name="ph:toilet"
                    class="w-3.5 h-3.5 text-emerald-600"
                  />
                  WC</span
                >
              </div>
            </div>
          </div>

          <!-- Schedule Timeline -->
          <div
            class="lg:col-span-6 flex items-center justify-between px-2 sm:px-6"
          >
            <div class="text-start">
              <span class="text-lg font-black text-text-primary">08:30 AM</span>
              <span class="block text-[11px] text-text-secondary font-medium"
                >Cairo (Tahrir Sq.)</span
              >
            </div>

            <!-- Route Graph -->
            <div class="flex-1 mx-4 text-center">
              <span class="text-[10px] font-semibold text-text-muted block mb-1"
                >2h 45m · Non-stop</span
              >
              <div class="relative flex items-center justify-center">
                <div class="h-0.5 bg-border-strong w-full"></div>
                <div
                  class="absolute w-2 h-2 rounded-full bg-[#A1331B] start-0"
                ></div>
                <div
                  class="absolute w-2 h-2 rounded-full bg-[#A1331B] end-0"
                ></div>
              </div>
              <span
                class="inline-block mt-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.2 rounded-full"
              >
                On-time 98%
              </span>
            </div>

            <div class="text-end">
              <span class="text-lg font-black text-text-primary">11:15 AM</span>
              <span class="block text-[11px] text-text-secondary font-medium"
                >Alex (Sidi Gaber)</span
              >
            </div>
          </div>

          <!-- Price & Action -->
          <div
            class="lg:col-span-3 flex lg:flex-col items-center lg:items-end justify-between gap-3 border-t lg:border-t-0 pt-3 lg:pt-0 border-border"
          >
            <div class="text-start lg:text-end">
              <span class="text-[10px] text-text-muted block"
                >Total per seat</span
              >
              <span class="text-2xl font-black text-[#A1331B]">145</span>
              <span class="text-xs font-bold text-text-secondary ms-1"
                >EGP</span
              >
            </div>
            <VButton size="sm" icon="ph:armchair-bold"> Select Seats </VButton>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup></script>
