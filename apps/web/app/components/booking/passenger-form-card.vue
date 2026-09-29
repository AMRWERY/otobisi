<template>
  <div
    class="bg-surface-1 border border-border rounded-2xl p-5 sm:p-6 shadow-xs"
  >
    <!-- Card Header -->
    <div
      class="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-border mb-6"
    >
      <div class="flex items-start gap-3">
        <div
          class="w-10 h-10 rounded-xl bg-orange-500/10 text-[#A1331B] dark:text-orange-400 flex items-center justify-center shrink-0"
        >
          <Icon name="ph:identification-card-bold" class="w-5 h-5" />
        </div>
        <div>
          <h2 class="text-base sm:text-lg font-extrabold text-text-primary">
            Step 1: Passenger Details
          </h2>
          <p class="text-xs text-text-secondary mt-0.5">
            {{ seats.length }} seat{{ seats.length > 1 ? "s" : "" }} selected
            according to Egyptian Ministry of Transport ID compliance.
          </p>
        </div>
      </div>

      <div
        class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-bold"
      >
        <Icon name="ph:shield-check-fill" class="w-3.5 h-3.5" />
        <span>Official E-Gate Pass</span>
      </div>
    </div>

    <!-- Dynamic Passenger Forms List -->
    <div class="flex flex-col gap-6">
      <lazy-passenger-item
        v-for="(seat, idx) in seats"
        :key="seat"
        v-model="passengers[idx]"
        :seat-id="seat"
        :index="idx"
        :is-lead="idx === 0"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PassengerInfo } from "~/types/booking/passenger-form-card";

const props = defineProps<{
  seats: string[];
}>();

const defaultLead: PassengerInfo = {
  name: "Amr Mohamed Sayed",
  phone: "10 1234 5678",
  nationalId: "29408150102345",
  gender: "male",
};

const defaultPassenger2: PassengerInfo = {
  name: "Rana Sayed",
  phone: "",
  nationalId: "298110501",
  gender: "female",
  saveToProfile: true,
};

const passengers = ref<PassengerInfo[]>([]);

// Synchronize reactive passenger state array with provided seats
watch(
  () => props.seats,
  (newSeats) => {
    passengers.value = newSeats.map((_, idx) => {
      if (idx === 0) return { ...defaultLead };
      if (idx === 1) return { ...defaultPassenger2 };
      return {
        name: "",
        phone: "",
        nationalId: "",
        gender: "male",
        saveToProfile: true,
      };
    });
  },
  { immediate: true },
);
</script>