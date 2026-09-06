<template>
  <div>
    <section class="relative pt-10 overflow-hidden">
      <div class="relative text-center">
        <!-- Official Badge -->
        <div
          class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-amber-600 text-xs font-medium mb-6"
        >
          <span class="w-2 h-2 rounded-full bg-amber-600 animate-pulse"></span>
          <span>Egypt's Unified Intercity Booking Platform</span>
        </div>

        <!-- Headline -->
        <h1
          class="text-4xl sm:text-5xl font-extrabold tracking-tight text-text-primary leading-tight"
        >
          Travel across Egypt by bus, <br />
          <span class="relative inline-block text-[#A1331B]">
            simplified
            <svg
              class="absolute -bottom-2 start-0 w-full"
              viewBox="0 0 180 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.5 9.5C45.5 3.5 134.5 1.5 177.5 9.5"
                stroke="#A1331B"
                stroke-width="3"
                stroke-linecap="round"
              />
            </svg>
          </span>
        </h1>

        <p
          class="mt-4 text-text-secondary text-sm sm:text-base max-w-2xl mx-auto leading-relaxed"
        >
          Compare 30+ licensed bus operators, book your guaranteed seat in
          seconds, and travel with total peace of mind along the Nile, Red Sea,
          and Coast.
        </p>

        <!-- BOOKING SEARCH ENGINE CARD -->
        <div
          class="mt-8 bg-surface-1 border border-border rounded-2xl p-4 sm:p-6 shadow-xl shadow-black/5 text-start"
        >
          <!-- Search Header Controls -->
          <div
            class="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-border"
          >
            <!-- Trip Type Selector -->
            <div
              class="inline-flex p-1 bg-surface-2 rounded-xl text-xs font-semibold"
            >
              <button
                @click="tripType = 'oneway'"
                :class="
                  tripType === 'oneway'
                    ? 'bg-surface-1 text-text-primary shadow-xs'
                    : 'text-text-secondary hover:text-text-primary'
                "
                class="px-3.5 py-1.5 rounded-lg transition-all"
              >
                One-way
              </button>
              <button
                @click="tripType = 'round'"
                :class="
                  tripType === 'round'
                    ? 'bg-surface-1 text-text-primary shadow-xs'
                    : 'text-text-secondary hover:text-text-primary'
                "
                class="px-3.5 py-1.5 rounded-lg transition-all"
              >
                Round-trip
              </button>
            </div>

            <!-- Features Badges -->
            <div
              class="flex items-center gap-4 text-xs font-medium text-text-secondary"
            >
              <div class="flex items-center gap-1.5">
                <span
                  class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"
                ></span>
                <span>Live Seat Selection</span>
              </div>
              <div class="flex items-center gap-1.5 text-amber-600">
                <icon name="ph:lightning-fill" class="w-3.5 h-3.5" />
                <span>Instant Confirmation</span>
              </div>
            </div>
          </div>

          <!-- Input Fields Row -->
          <div class="grid grid-cols-1 md:grid-cols-12 gap-3 mt-4 items-end">
            <!-- Origin -->
            <div class="md:col-span-4 flex flex-col gap-1.5">
              <label class="text-xs font-semibold text-text-primary/90">
                From city / departure terminal
              </label>
              <div
                class="flex items-center gap-2 bg-surface-2 border border-border rounded-xl px-3.5 py-3 hover:border-border-strong transition-colors focus-within:ring-2 focus-within:ring-orange-500/20 focus-within:border-orange-500"
              >
                <icon
                  name="ph:circle-bold"
                  class="w-3 h-3 text-orange-500 shrink-0"
                />
                <input
                  v-model="origin"
                  type="text"
                  class="w-full bg-transparent border-0 focus:border-0 ring-0 focus:ring-0 outline-none focus:outline-none p-0 font-semibold text-sm text-text-primary truncate placeholder:text-text-muted"
                  placeholder="City or departure terminal"
                />
              </div>
            </div>

            <!-- Swap button -->
            <div class="md:col-span-1 flex justify-center pb-2 md:pb-2.5">
              <button
                @click="swapLocations"
                type="button"
                class="w-8 h-8 rounded-full border border-border bg-surface-1 hover:bg-surface-2 flex items-center justify-center text-orange-500 hover:text-text-primary shadow-xs transition-transform active:rotate-180"
                title="Swap Locations"
              >
                <icon name="ph:arrows-left-right-bold" class="w-3.5 h-3.5" />
              </button>
            </div>

            <!-- Destination -->
            <div class="md:col-span-4 flex flex-col gap-1.5">
              <label class="text-xs font-semibold text-text-primary/90">
                To destination
              </label>
              <div
                class="flex items-center gap-2 bg-surface-2 border border-border rounded-xl px-3.5 py-3 hover:border-border-strong transition-colors focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-500"
              >
                <icon
                  name="ph:map-pin-bold"
                  class="w-3 h-3 text-emerald-500 shrink-0"
                />
                <input
                  v-model="destination"
                  type="text"
                  class="w-full bg-transparent border-0 focus:border-0 ring-0 focus:ring-0 outline-none focus:outline-none p-0 font-semibold text-sm text-text-primary truncate placeholder:text-text-muted"
                  placeholder="City or destination"
                />
              </div>
            </div>

            <!-- Departure Date -->
            <div class="md:col-span-3 flex flex-col gap-1.5">
              <label class="text-xs font-semibold text-text-primary/90">
                Travel date
              </label>
              <div
                class="relative flex items-center gap-3 bg-surface-2 border border-border rounded-xl px-3.5 py-3 hover:border-border-strong transition-colors focus-within:ring-2 focus-within:ring-orange-500/20 focus-within:border-orange-500 cursor-pointer"
              >
                <icon
                  name="ph:calendar-blank-bold"
                  class="w-5 h-5 text-text-primary shrink-0"
                />
                <span
                  class="font-semibold text-sm text-text-primary select-none truncate"
                >
                  {{ formattedDepartureDate }}
                </span>
                <input
                  type="date"
                  v-model="departureDate"
                  class="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
              </div>
            </div>
          </div>

          <!-- Main CTA Button -->
          <div
            class="mt-4 flex flex-col sm:flex-row justify-between items-center gap-3"
          >
            <p
              class="flex items-center justify-center text-xs space-s-2 text-text-secondary"
            >
              <span
                class="text-emerald-500 flex items-center justify-center font-medium"
              >
                <icon name="ph:check-circle-bold" class="w-3.5 h-3.5 me-1" />
                180+ daily departures
                <span class="text-text-muted mx-1.5">·</span>
              </span>
              <span class="flex items-center gap-1 text-text-secondary">
                <icon name="ph:bus-bold" class="w-3.5 h-3.5 text-orange-500" />
                Live MCV & Travego bus layouts
              </span>
            </p>
            <button
              class="w-full sm:w-auto bg-[#F26A36] hover:bg-[#E05925] text-white py-3.5 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-orange-900/10 hover:shadow-lg transition-all active:scale-[0.99] shrink-0"
            >
              <icon name="ph:magnifying-glass-bold" class="w-4 h-4" />
              <span>Search buses</span>
            </button>
          </div>

          <!-- High Frequency Egyptian Corridors Section -->
          <div class="mt-4 pt-3.5 border-t border-border">
            <div class="flex items-center justify-between gap-2 mb-2.5">
              <span
                class="text-[11px] font-bold tracking-wider text-text-secondary uppercase"
              >
                High frequency Egyptian corridors
              </span>
              <nuxt-link-locale
                to="#"
                class="text-xs font-semibold text-[#F26A36] hover:text-[#E05925] hover:underline transition-colors shrink-0"
              >
                View full network timetable
              </nuxt-link-locale>
            </div>

            <!-- Corridor Badges -->
            <LazyVSwiper
              :items="corridors"
              item-class="w-[75%] sm:w-[45%] md:w-[30%] lg:w-[calc((100%-2.5rem)/4.35)]"
              gap-class="gap-2.5"
            >
              <template #item="{ item: corridor, isDragging }">
                <button
                  @click="!isDragging && selectCorridor(corridor)"
                  type="button"
                  class="w-full inline-flex items-center justify-between px-3 py-2 rounded-xl bg-surface-2 hover:bg-surface-0 border border-border/70 hover:border-[#F26A36]/40 text-xs font-semibold text-text-primary transition-all whitespace-nowrap group"
                >
                  <span class="truncate">
                    {{ corridor.from }}
                    <span class="text-text-muted group-hover:text-text-primary"
                      >→</span
                    >
                    {{ corridor.to }}
                  </span>
                  <span
                    class="text-[#F26A36] font-bold text-[11px] shrink-0 ms-2"
                  >
                    from {{ corridor.price }} EGP
                  </span>
                </button>
              </template>
            </LazyVSwiper>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
const tripType = ref<"oneway" | "round">("oneway");

const origin = ref("Cairo (All stations - Ramses, Torgoman, Alm...");

const destination = ref("Hurghada (El Dahar, Senzo Mall)");

const departureDate = ref("2024-10-25");

const corridors = [
  { from: "Cairo", to: "Hurghada", price: "280" },
  { from: "Cairo", to: "Alexandria", price: "110" },
  { from: "Cairo", to: "Sharm El Sheikh", price: "310" },
  { from: "Cairo", to: "Dahab", price: "390" },
  { from: "Cairo", to: "Luxor", price: "420" },
  { from: "Cairo", to: "Aswan", price: "490" },
  { from: "Cairo", to: "Marsa Matrouh", price: "260" },
  { from: "Cairo", to: "Siwa", price: "380" },
];

const selectCorridor = (corridor: { from: string; to: string }) => {
  origin.value = corridor.from;
  destination.value = corridor.to;
};

const formattedDepartureDate = computed(() => {
  if (!departureDate.value) return "Select date";
  const date = new Date(departureDate.value + "T00:00:00");
  const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
  const day = date.getDate();
  const month = date.toLocaleDateString("en-US", { month: "short" });
  const year = date.getFullYear();
  return `${weekday}, ${day} ${month} ${year}`;
});

const swapLocations = () => {
  const temp = origin.value;
  origin.value = destination.value;
  destination.value = temp;
};
</script>
