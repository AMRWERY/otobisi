<template>
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
          Tap seats to toggle reservation. Maximum {{ maxSeats }} seats per
          booking.
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
              <span class="font-bold text-text-primary text-[11px] block"
                >Coach Captain</span
              >
              <span class="text-[9px] text-text-muted">Mercedes Cockpit</span>
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
              <span class="font-bold text-[11px] block">Entry Door</span>
              <span class="text-[9px]">Stairs & Luggage</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Column Labels -->
      <div
        class="grid grid-cols-5 gap-2 text-center text-[10px] font-bold text-text-muted uppercase tracking-wider mb-3 select-none"
      >
        <span>Window A</span>
        <span>Aisle B</span>
        <span class="text-orange-500 font-extrabold">Walkway</span>
        <span>Aisle C</span>
        <span>Window D</span>
      </div>

      <!-- Seat Rows -->
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
            @click="onSeatClick(row.seatA)"
          >
            <span class="text-xs font-bold block">{{ row.seatA.id }}</span>
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
            @click="onSeatClick(row.seatB)"
          >
            <span class="text-xs font-bold block">{{ row.seatB.id }}</span>
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

          <!-- Center: Row number or Center 5th Seat (e.g. 11E) -->
          <div class="flex justify-center">
            <button
              v-if="row.seatCenter"
              type="button"
              :disabled="row.seatCenter.isBooked"
              :class="getSeatClass(row.seatCenter)"
              @click="onSeatClick(row.seatCenter)"
            >
              <span class="text-xs font-bold block">{{
                row.seatCenter.id
              }}</span>
              <span class="text-[9px] block opacity-80 truncate">
                {{
                  row.seatCenter.isBooked
                    ? "Booked"
                    : isSelected(row.seatCenter.id)
                      ? "Selected"
                      : `${row.seatCenter.price} EGP`
                }}
              </span>
            </button>
            <span
              v-else
              class="w-6 h-6 rounded-full bg-surface-1 border border-border text-text-muted text-[10px] font-bold flex items-center justify-center select-none"
            >
              {{ row.rowNumber }}
            </span>
          </div>

          <!-- Seat C (Aisle) -->
          <button
            type="button"
            :disabled="row.seatC.isBooked"
            :class="getSeatClass(row.seatC)"
            @click="onSeatClick(row.seatC)"
          >
            <span class="text-xs font-bold block">{{ row.seatC.id }}</span>
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
            @click="onSeatClick(row.seatD)"
          >
            <span class="text-xs font-bold block">{{ row.seatD.id }}</span>
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
        <div class="flex items-center gap-1.5 text-[11px] font-semibold">
          <Icon name="ph:toilet-bold" class="w-4 h-4 text-emerald-500" />
          <span>Lavatory (Rear Right)</span>
        </div>

        <div
          class="flex items-center gap-1.5 text-[11px] font-semibold text-red-500"
        >
          <Icon name="ph:warning-circle-bold" class="w-4 h-4 text-red-500" />
          <span>Emergency Hatch & Exit</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { SeatItem, SeatRow } from "~/types/search/seats";

const props = withDefaults(
  defineProps<{
    seatRows: SeatRow[];
    selectedSeatIds: string[];
    maxSeats?: number;
  }>(),
  {
    maxSeats: 4,
  },
);

const emit = defineEmits<{
  (e: "toggle-seat", seat: SeatItem): void;
}>();

const isSelected = (seatId: string) => props.selectedSeatIds.includes(seatId);

const onSeatClick = (seat: SeatItem) => {
  if (seat.isBooked) return;
  emit("toggle-seat", seat);
};

const getSeatClass = (seat: SeatItem) => {
  if (seat.isBooked) {
    return "p-2 rounded-xl bg-surface-2/40 border border-border/40 text-text-muted cursor-not-allowed opacity-60 text-center";
  }
  if (isSelected(seat.id)) {
    return "p-2 rounded-xl bg-[#F26A36] text-white border border-[#F26A36] shadow-md ring-2 ring-orange-500/30 text-center animate-seat-bounce cursor-pointer font-bold";
  }
  if (seat.isLadies) {
    return "p-2 rounded-xl bg-pink-500/10 border border-pink-500/30 text-pink-700 dark:text-pink-300 hover:border-pink-500 hover:bg-pink-500/20 text-center transition-colors duration-120 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer shadow-2xs";
  }
  return "p-2 rounded-xl bg-surface-1 hover:bg-surface-0 border border-border hover:border-orange-500/60 text-text-primary text-center transition-all duration-120 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer shadow-2xs hover:scale-[1.02] active:scale-[0.97]";
};
</script>