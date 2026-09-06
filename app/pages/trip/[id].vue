<template>
  <div class="min-h-screen bg-surface-0 pb-20 text-start">
    <!-- Top Navigation Subheader & Stepper Wizard -->
    <div
      class="border-b border-border bg-surface-1/90 backdrop-blur-md sticky top-16 z-30"
    >
      <div
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4"
      >
        <!-- Back button & Ticket Checkout badge -->
        <div class="flex items-center gap-3">
          <button
            type="button"
            class="inline-flex items-center gap-1.5 text-xs font-bold text-text-secondary hover:text-text-primary transition-colors cursor-pointer group"
            @click="router.back()"
          >
            <Icon
              name="ph:arrow-left-bold"
              class="w-4 h-4 rtl:rotate-180 group-hover:-translate-x-0.5 transition-transform"
            />
            <span>Back to Search Results</span>
          </button>

          <span class="text-text-muted">|</span>

          <div class="flex items-center gap-2">
            <div
              class="w-5 h-5 rounded-md bg-[#A1331B] text-white flex items-center justify-center text-[10px] font-black"
            >
              <Icon name="ph:bus-fill" class="w-3 h-3" />
            </div>
            <span class="text-xs font-bold text-text-primary">
              Ticket Checkout
            </span>
          </div>
        </div>

        <!-- 4-Step Checkout Stepper -->
        <div
          class="flex items-center gap-2 sm:gap-3 text-xs font-semibold overflow-x-auto py-1"
        >
          <!-- Step 1: Search (Completed) -->
          <div
            class="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 shrink-0"
          >
            <div
              class="w-5 h-5 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-[11px] font-bold"
            >
              <Icon name="ph:check-bold" class="w-3 h-3" />
            </div>
            <span>1. Search</span>
          </div>

          <div class="w-4 sm:w-6 h-0.5 bg-emerald-500/40 shrink-0"></div>

          <!-- Step 2: Select Seats (Active) -->
          <div
            class="flex items-center gap-1.5 text-orange-600 dark:text-orange-400 font-bold shrink-0"
          >
            <div
              class="w-5 h-5 rounded-full bg-[#F26A36] text-white flex items-center justify-center text-[11px] font-black shadow-xs"
            >
              2
            </div>
            <span>2. Select Seats</span>
          </div>

          <div class="w-4 sm:w-6 h-0.5 bg-border shrink-0"></div>

          <!-- Step 3: Passenger Details (Upcoming) -->
          <div class="flex items-center gap-1.5 text-text-muted shrink-0">
            <div
              class="w-5 h-5 rounded-full bg-surface-2 border border-border flex items-center justify-center text-[11px]"
            >
              3
            </div>
            <span>3. Passenger Details</span>
          </div>

          <div class="w-4 sm:w-6 h-0.5 bg-border shrink-0"></div>

          <!-- Step 4: Payment (Upcoming) -->
          <div class="flex items-center gap-1.5 text-text-muted shrink-0">
            <div
              class="w-5 h-5 rounded-full bg-surface-2 border border-border flex items-center justify-center text-[11px]"
            >
              4
            </div>
            <span>4. Payment</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Container -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
      <!-- 1. Top Card: Selected Coach Summary Banner -->
      <div
        class="bg-surface-1 border border-border rounded-2xl p-4 sm:p-5 shadow-xs mb-6"
      >
        <div
          class="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-center"
        >
          <!-- Left: Operator & Class -->
          <div class="md:col-span-5 flex items-start gap-3">
            <div
              class="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-500 flex items-center justify-center shrink-0 shadow-2xs"
            >
              <Icon name="ph:bus-duotone" class="w-6 h-6" />
            </div>

            <div class="flex-1">
              <div class="flex items-center gap-2 flex-wrap">
                <h2 class="text-base sm:text-lg font-black text-text-primary">
                  {{ trip.operatorName }} {{ trip.busClass }}
                </h2>
                <span
                  class="px-2 py-0.5 rounded-md bg-orange-500/10 text-orange-600 dark:text-orange-400 font-bold text-[11px] border border-orange-500/20"
                >
                  {{ trip.busModel }}
                </span>
                <span
                  class="px-2 py-0.5 rounded-md bg-surface-2 text-text-secondary text-[11px] border border-border"
                >
                  Air Conditioned 2+2
                </span>
              </div>

              <div
                class="flex items-center gap-2 mt-1 text-xs text-text-secondary flex-wrap"
              >
                <span
                  class="flex items-center gap-1 font-bold text-text-primary"
                >
                  <Icon
                    name="ph:star-fill"
                    class="w-3.5 h-3.5 text-amber-500"
                  />
                  {{ trip.rating }}
                </span>
                <span class="text-text-muted"
                  >({{ trip.reviewsCount }} verified trips)</span
                >
                <span class="text-text-muted">•</span>
                <span
                  class="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold"
                >
                  <Icon name="ph:seal-check-fill" class="w-3.5 h-3.5" />
                  Ministry Certified
                </span>
                <span class="text-text-muted">•</span>
                <span>{{ trip.routeHighlight || "Non-stop Express" }}</span>
              </div>
            </div>
          </div>

          <!-- Middle: Time & Route Track -->
          <div
            class="md:col-span-4 flex items-center justify-between gap-2 px-2 sm:px-4 py-2 bg-surface-2/60 rounded-xl border border-border/70"
          >
            <!-- Departure -->
            <div class="text-start">
              <span
                class="text-lg sm:text-xl font-black text-text-primary block"
              >
                {{ trip.departureTime }}
              </span>
              <span class="text-xs font-bold text-text-primary block">
                {{ trip.departureCity }}
              </span>
              <span
                class="text-[10px] text-text-muted block truncate max-w-[100px]"
              >
                {{ trip.departureStation.split("(")[0] }}
              </span>
            </div>

            <!-- Track -->
            <div class="flex-1 mx-2 text-center">
              <span class="text-[10px] font-bold text-text-muted block mb-0.5">
                {{ trip.duration }} • Direct
              </span>
              <div class="relative flex items-center justify-center">
                <div class="h-0.5 bg-border-strong w-full"></div>
                <div
                  class="absolute w-2 h-2 rounded-full bg-orange-500 start-0 ring-2 ring-surface-1"
                ></div>
                <div
                  class="absolute w-5 h-5 rounded-full bg-surface-1 border border-border flex items-center justify-center text-orange-500"
                >
                  <Icon name="ph:bus-fill" class="w-2.5 h-2.5" />
                </div>
                <div
                  class="absolute w-2 h-2 rounded-full bg-emerald-500 end-0 ring-2 ring-surface-1"
                ></div>
              </div>
            </div>

            <!-- Arrival -->
            <div class="text-end">
              <span
                class="text-lg sm:text-xl font-black text-text-primary block"
              >
                {{ trip.arrivalTime }}
              </span>
              <span class="text-xs font-bold text-text-primary block">
                {{ trip.arrivalCity }}
              </span>
              <span
                class="text-[10px] text-text-muted block truncate max-w-[100px]"
              >
                {{ trip.arrivalStation.split("(")[0] }}
              </span>
            </div>
          </div>

          <!-- Right: Amenities & Date -->
          <div
            class="md:col-span-3 flex flex-col md:items-end justify-between gap-2"
          >
            <div class="flex items-center gap-1.5 flex-wrap">
              <div
                v-for="am in trip.amenities.slice(0, 4)"
                :key="am.id"
                class="w-7 h-7 rounded-lg bg-surface-2 border border-border flex items-center justify-center text-text-secondary"
                :title="am.name"
              >
                <Icon :name="am.icon" class="w-3.5 h-3.5" />
              </div>
            </div>
            <span class="text-xs font-semibold text-text-secondary">
              {{ formattedDate }}
            </span>
          </div>
        </div>
      </div>

      <!-- Main Layout: 2 Columns (Left: Bus Seating Deck, Right: Selected Seats Sidebar) -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <!-- LEFT COLUMN: Seating Deck + Legend -->
        <div class="lg:col-span-7 xl:col-span-8 flex flex-col gap-5">
          <!-- 1. Seat Status Legend Bar -->
          <div
            class="bg-surface-1 border border-border rounded-2xl p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3 text-xs"
          >
            <div class="flex items-center gap-2">
              <div
                class="w-6 h-6 rounded-lg bg-surface-2 border border-border flex items-center justify-center text-[10px] font-bold text-text-primary"
              >
                1
              </div>
              <span class="text-text-secondary font-medium"
                >Available ({{ trip.price }} EGP)</span
              >
            </div>

            <div class="flex items-center gap-2">
              <div
                class="w-6 h-6 rounded-lg bg-[#F26A36] text-white flex items-center justify-center text-[10px] font-bold shadow-xs"
              >
                <Icon name="ph:check-bold" class="w-3.5 h-3.5" />
              </div>
              <span class="text-text-primary font-bold"
                >Selected ({{ selectedSeatIds.length }})</span
              >
            </div>

            <div class="flex items-center gap-2">
              <div
                class="w-6 h-6 rounded-lg bg-surface-2/40 border border-border text-text-muted flex items-center justify-center text-[10px]"
              >
                ✕
              </div>
              <span class="text-text-muted font-medium">Reserved / Booked</span>
            </div>

            <div class="flex items-center gap-2">
              <div
                class="w-6 h-6 rounded-lg bg-pink-500/15 border border-pink-500/30 text-pink-600 dark:text-pink-400 flex items-center justify-center text-[10px] font-bold"
              >
                ♀
              </div>
              <span class="text-pink-600 dark:text-pink-400 font-semibold"
                >Ladies Priority</span
              >
            </div>
          </div>

          <!-- 2. Coach Seating Deck Simulator -->
          <div
            class="bg-surface-1 border border-border rounded-2xl p-4 sm:p-6 shadow-xs text-start"
          >
            <!-- Deck Header -->
            <div
              class="flex items-center justify-between pb-4 border-b border-border mb-6"
            >
              <div>
                <h3 class="font-bold text-base sm:text-lg text-text-primary">
                  Coach Seating Deck
                </h3>
                <p class="text-xs text-text-secondary mt-0.5">
                  Tap seats to toggle reservation. Maximum 4 seats per booking.
                </p>
              </div>

              <span
                class="px-3 py-1 rounded-full bg-surface-2 border border-border text-xs font-semibold text-text-secondary"
              >
                Single Deck • Lower Level
              </span>
            </div>

            <!-- Bus Body Container (Shell with rounded nose) -->
            <div
              class="max-w-lg mx-auto bg-surface-2/70 border border-border/80 rounded-3xl p-4 sm:p-6 shadow-inner relative"
            >
              <!-- Front Windshield & Driver Area Header -->
              <div
                class="rounded-2xl bg-surface-1 border border-border/80 p-3 mb-6 shadow-2xs"
              >
                <div
                  class="text-center text-[10px] font-bold text-text-muted uppercase tracking-widest mb-2"
                >
                  Front Windshield • Panoramic Glass Front
                </div>

                <div class="grid grid-cols-2 gap-3">
                  <!-- Cockpit Driver -->
                  <div
                    class="flex items-center gap-2 bg-surface-2 border border-border/60 p-2 rounded-xl text-xs"
                  >
                    <div
                      class="w-6 h-6 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center"
                    >
                      <Icon name="ph:steering-wheel-bold" class="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span
                        class="font-bold text-text-primary text-[11px] block"
                        >Coach Captain</span
                      >
                      <span class="text-[9px] text-text-muted"
                        >Mercedes Cockpit</span
                      >
                    </div>
                  </div>

                  <!-- Entry Door -->
                  <div
                    class="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 p-2 rounded-xl text-xs text-emerald-600 dark:text-emerald-400"
                  >
                    <div
                      class="w-6 h-6 rounded-lg bg-emerald-500/20 flex items-center justify-center"
                    >
                      <Icon name="ph:door-open-bold" class="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span class="font-bold text-[11px] block"
                        >Entry Door</span
                      >
                      <span class="text-[9px]">Stairs & Luggage</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Column Labels -->
              <div
                class="grid grid-cols-5 gap-2 text-center text-[10px] font-bold text-text-muted uppercase tracking-wider mb-3"
              >
                <span>Window A</span>
                <span>Aisle B</span>
                <span class="text-orange-500 font-extrabold">Aisle</span>
                <span>Aisle C</span>
                <span>Window D</span>
              </div>

              <!-- Seat Rows (1 to 10 + Row 11 Back) -->
              <div class="flex flex-col gap-2.5">
                <div
                  v-for="row in seatRows"
                  :key="row.rowNumber"
                  class="grid grid-cols-5 gap-2 items-center"
                >
                  <!-- Seat A (Window) -->
                  <button
                    type="button"
                    :disabled="row.seatA.isBooked"
                    :class="getSeatClass(row.seatA)"
                    @click="toggleSeat(row.seatA)"
                  >
                    <span class="text-xs font-bold block">{{
                      row.seatA.id
                    }}</span>
                    <span class="text-[9px] block opacity-80 truncate">
                      {{
                        row.seatA.isBooked
                          ? "Booked"
                          : isSelected(row.seatA.id)
                            ? "Selected"
                            : `${row.seatA.price} EGP`
                      }}
                    </span>
                  </button>

                  <!-- Seat B (Aisle) -->
                  <button
                    type="button"
                    :disabled="row.seatB.isBooked"
                    :class="getSeatClass(row.seatB)"
                    @click="toggleSeat(row.seatB)"
                  >
                    <span class="text-xs font-bold block">{{
                      row.seatB.id
                    }}</span>
                    <span class="text-[9px] block opacity-80 truncate">
                      {{
                        row.seatB.isBooked
                          ? "Booked"
                          : isSelected(row.seatB.id)
                            ? "Selected"
                            : `${row.seatB.price} EGP`
                      }}
                    </span>
                  </button>

                  <!-- Center Walkway Row Marker -->
                  <div class="flex justify-center">
                    <span
                      class="w-6 h-6 rounded-full bg-surface-1 border border-border text-text-muted text-[10px] font-bold flex items-center justify-center"
                    >
                      {{ row.rowNumber }}
                    </span>
                  </div>

                  <!-- Seat C (Aisle) -->
                  <button
                    type="button"
                    :disabled="row.seatC.isBooked"
                    :class="getSeatClass(row.seatC)"
                    @click="toggleSeat(row.seatC)"
                  >
                    <span class="text-xs font-bold block">{{
                      row.seatC.id
                    }}</span>
                    <span class="text-[9px] block opacity-80 truncate">
                      {{
                        row.seatC.isBooked
                          ? "Booked"
                          : row.seatC.isLadies
                            ? "Ladies ♀"
                            : isSelected(row.seatC.id)
                              ? "Selected"
                              : `${row.seatC.price} EGP`
                      }}
                    </span>
                  </button>

                  <!-- Seat D (Window) -->
                  <button
                    type="button"
                    :disabled="row.seatD.isBooked"
                    :class="getSeatClass(row.seatD)"
                    @click="toggleSeat(row.seatD)"
                  >
                    <span class="text-xs font-bold block">{{
                      row.seatD.id
                    }}</span>
                    <span class="text-[9px] block opacity-80 truncate">
                      {{
                        row.seatD.isBooked
                          ? "Booked"
                          : row.seatD.isLadies
                            ? "Ladies ♀"
                            : isSelected(row.seatD.id)
                              ? "Selected"
                              : `${row.seatD.price} EGP`
                      }}
                    </span>
                  </button>
                </div>
              </div>

              <!-- Rear Coach Features Bar -->
              <div
                class="mt-6 pt-4 border-t border-border/80 flex items-center justify-between text-xs text-text-secondary px-2"
              >
                <div
                  class="flex items-center gap-1.5 text-[11px] font-semibold"
                >
                  <Icon
                    name="ph:toilet-bold"
                    class="w-4 h-4 text-emerald-500"
                  />
                  <span>Lavatory (Rear Right)</span>
                </div>

                <div
                  class="flex items-center gap-1.5 text-[11px] font-semibold text-red-500"
                >
                  <Icon
                    name="ph:warning-circle-bold"
                    class="w-4 h-4 text-red-500"
                  />
                  <span>Emergency Hatch & Exit</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 3. Comfort Highlights Footer Card -->
          <div
            class="bg-surface-1 border border-border rounded-2xl p-4 sm:p-5 shadow-xs grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs"
          >
            <div class="flex items-center gap-3">
              <div
                class="w-9 h-9 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center shrink-0"
              >
                <Icon name="ph:armchair-bold" class="w-4 h-4" />
              </div>
              <div>
                <span class="font-bold text-text-primary block"
                  >Ergonomic Recline</span
                >
                <span class="text-text-muted text-[11px]"
                  >120° leather comfort</span
                >
              </div>
            </div>

            <div class="flex items-center gap-3">
              <div
                class="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0"
              >
                <Icon name="ph:suitcase-bold" class="w-4 h-4" />
              </div>
              <div>
                <span class="font-bold text-text-primary block"
                  >30kg Bag Allowance</span
                >
                <span class="text-text-muted text-[11px]"
                  >1 Main Bag + 1 Handbag</span
                >
              </div>
            </div>

            <div class="flex items-center gap-3">
              <div
                class="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center shrink-0"
              >
                <Icon name="ph:snowflake-bold" class="w-4 h-4" />
              </div>
              <div>
                <span class="font-bold text-text-primary block"
                  >Individual AC Vents</span
                >
                <span class="text-text-muted text-[11px]"
                  >Overhead climate control</span
                >
              </div>
            </div>
          </div>
        </div>

        <!-- RIGHT COLUMN: Selected Seats, Pickup Stations & Order Summary -->
        <div
          class="lg:col-span-5 xl:col-span-4 flex flex-col gap-4 sticky top-32"
        >
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
            <div
              v-if="selectedSeatIds.length > 0"
              class="flex flex-col gap-2.5 mb-5"
            >
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
                    @click="removeSeat(seatId)"
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
              <p class="text-xs font-bold text-text-primary">
                No seats selected yet
              </p>
              <p class="text-[11px] text-text-muted mt-0.5">
                Tap up to 4 available seats on the coach layout to proceed.
              </p>
            </div>

            <!-- Boarding & Drop-off Stations -->
            <div
              class="flex flex-col gap-2 pb-4 mb-4 border-b border-border text-xs"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 rounded-full bg-orange-500"></div>
                  <div>
                    <span
                      class="text-[10px] text-text-muted uppercase font-bold block"
                      >Boarding Station</span
                    >
                    <span class="font-bold text-text-primary"
                      >{{ trip.departureStation }} ({{
                        trip.departureTime
                      }})</span
                    >
                  </div>
                </div>
                <button
                  type="button"
                  class="text-orange-500 font-semibold text-[11px] hover:underline cursor-pointer"
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
                >
                  Change
                </button>
              </div>
            </div>

            <!-- Fare Breakdown Calculation -->
            <div
              class="flex flex-col gap-2 text-xs pb-4 mb-4 border-b border-border"
            >
              <div
                class="flex items-center justify-between text-text-secondary"
              >
                <span
                  >Base Ticket Fare ({{ selectedSeatIds.length }} ×
                  {{ trip.price }} EGP)</span
                >
                <span class="font-bold text-text-primary"
                  >{{ baseFare }} EGP</span
                >
              </div>
              <div
                class="flex items-center justify-between text-text-secondary"
              >
                <span class="flex items-center gap-1">
                  Platform & E-Ticket Service
                  <Icon name="ph:info-bold" class="w-3 h-3 text-text-muted" />
                </span>
                <span class="font-bold text-text-primary"
                  >{{ serviceFee }} EGP</span
                >
              </div>
              <div
                class="flex items-center justify-between text-text-secondary"
              >
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
                <span class="text-xs font-bold text-text-secondary ms-1"
                  >EGP</span
                >
              </div>
            </div>

            <!-- Primary Checkout CTA Button -->
            <LazyVButton
              size="lg"
              block
              icon-right="ph:arrow-right-bold"
              :disabled="selectedSeatIds.length === 0"
              custom-class="w-full font-bold shadow-md"
              @click="proceedToPassengerDetails"
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
                <span
                  class="px-2 py-0.5 rounded bg-surface-2 border border-border"
                  >Fawry</span
                >
                <span
                  class="px-2 py-0.5 rounded bg-surface-2 border border-border"
                  >Meeza</span
                >
                <span
                  class="px-2 py-0.5 rounded bg-surface-2 border border-border"
                  >Vodafone Cash</span
                >
                <span
                  class="px-2 py-0.5 rounded bg-surface-2 border border-border"
                  >Visa</span
                >
                <span
                  class="px-2 py-0.5 rounded bg-surface-2 border border-border"
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
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
interface SeatItem {
  id: string;
  row: number;
  col: "A" | "B" | "C" | "D";
  price: number;
  isBooked: boolean;
  isLadies?: boolean;
}

interface SeatRow {
  rowNumber: number;
  seatA: SeatItem;
  seatB: SeatItem;
  seatC: SeatItem;
  seatD: SeatItem;
}

const route = useRoute();
const router = useRouter();
const { getTripById } = useTrips();

const tripId = String(route.params.id || "gb-01");
const trip = computed(() => getTripById(tripId));

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
let timerInterval: any = null;

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

// Generate 10 standard rows matching screenshot configuration
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
  return rows;
});

const isSelected = (seatId: string) => selectedSeatIds.value.includes(seatId);

const getSeatPosition = (seatId: string) => {
  const col = seatId.slice(-1);
  const row = seatId.slice(0, -1);
  const side = col === "A" || col === "D" ? "Window" : "Aisle";
  return `${side} Seat (Row ${row})`;
};

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

const getSeatClass = (seat: SeatItem) => {
  if (seat.isBooked) {
    return "p-2 rounded-xl bg-surface-2/40 border border-border/40 text-text-muted cursor-not-allowed opacity-60 text-center";
  }
  if (isSelected(seat.id)) {
    return "p-2 rounded-xl bg-[#F26A36] text-white border border-[#F26A36] shadow-md ring-2 ring-orange-500/30 text-center scale-105 transition-all cursor-pointer font-bold";
  }
  if (seat.isLadies) {
    return "p-2 rounded-xl bg-pink-500/10 border border-pink-500/30 text-pink-700 dark:text-pink-300 hover:border-pink-500 hover:bg-pink-500/20 text-center transition-all cursor-pointer shadow-2xs";
  }
  return "p-2 rounded-xl bg-surface-1 hover:bg-surface-0 border border-border hover:border-orange-500/60 text-text-primary text-center transition-all cursor-pointer shadow-2xs hover:scale-102 active:scale-95";
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

const proceedToPassengerDetails = () => {
  alert(
    `Proceeding to passenger details with seats: ${selectedSeatIds.value.join(", ")} (Total: ${totalFare.value} EGP)`,
  );
};

// SEO metadata
useSeo({
  title: `Select Seats - ${trip.value.operatorName} ${trip.value.busClass}`,
  description: `Reserve your preferred seats on ${trip.value.operatorName} from ${trip.value.departureCity} to ${trip.value.arrivalCity}. Live coach layout, instant confirmation.`,
  private: false,
});
</script>