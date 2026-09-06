<template>
  <aside
    class="bg-surface-1 border border-border rounded-2xl p-4 sm:p-5 shadow-sm text-start"
  >
    <!-- Filters Header -->
    <div
      class="flex items-center justify-between pb-3.5 border-b border-border mb-4"
    >
      <div class="flex items-center gap-2">
        <Icon
          name="ph:sliders-horizontal-bold"
          class="w-4 h-4 text-orange-500"
        />
        <h3 class="font-bold text-sm sm:text-base text-text-primary">
          Filters
        </h3>
      </div>
      <div class="flex items-center gap-2.5">
        <button
          type="button"
          class="text-xs font-semibold text-orange-500 hover:text-orange-600 hover:underline transition-colors"
          @click="resetAllFilters"
        >
          Reset all
        </button>
        <!-- Mobile close button (small screens only) -->
        <button
          type="button"
          class="lg:hidden w-7 h-7 rounded-lg bg-surface-2 hover:bg-surface-0 border border-border flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
          aria-label="Close filters"
          @click="emit('close')"
        >
          <Icon name="ph:x-bold" class="w-3.5 h-3.5" />
        </button>
      </div>
    </div>

    <div class="flex flex-col gap-6">
      <!-- 1. Bus Operator -->
      <div>
        <div class="flex items-center justify-between mb-3">
          <h4
            class="text-xs font-bold text-text-primary uppercase tracking-wider"
          >
            Bus Operator
          </h4>
          <span class="text-[11px] text-text-muted">5 available</span>
        </div>
        <div class="flex flex-col gap-2.5">
          <label
            v-for="op in operatorOptions"
            :key="op.id"
            class="flex items-center justify-between text-xs cursor-pointer group select-none"
          >
            <div class="flex items-center gap-2.5">
              <input
                type="checkbox"
                :value="op.id"
                v-model="filters.operators"
                class="w-4 h-4 rounded text-[#F26A36] focus:ring-[#F26A36] border-border bg-surface-2 cursor-pointer"
              />
              <span
                class="font-semibold text-text-primary group-hover:text-orange-500 transition-colors"
              >
                {{ op.name }}
              </span>
            </div>
            <div class="text-end">
              <span class="text-[11px] text-text-muted block"
                >{{ op.trips }} trips</span
              >
              <span class="text-[10px] text-orange-500 font-bold"
                >from {{ op.minPrice }} EGP</span
              >
            </div>
          </label>
        </div>
      </div>

      <!-- 2. Departure Time Windows (2x2 Grid) -->
      <div>
        <div class="flex items-center justify-between mb-3">
          <h4
            class="text-xs font-bold text-text-primary uppercase tracking-wider"
          >
            Departure Time
          </h4>
          <span class="text-[11px] text-text-muted">Cairo Station</span>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <button
            v-for="time in timeSlotOptions"
            :key="time.id"
            type="button"
            :class="[
              'p-2.5 rounded-xl border text-start transition-all cursor-pointer',
              filters.timeSlots.includes(time.id)
                ? 'bg-amber-500/10 border-amber-500 text-text-primary shadow-2xs ring-1 ring-amber-500/30'
                : 'bg-surface-2 hover:bg-surface-0 border-border text-text-secondary hover:text-text-primary',
            ]"
            @click="toggleTimeSlot(time.id)"
          >
            <div class="flex items-center gap-1.5 mb-1">
              <Icon
                :name="time.icon"
                :class="[
                  'w-3.5 h-3.5',
                  filters.timeSlots.includes(time.id)
                    ? 'text-amber-500'
                    : 'text-text-muted',
                ]"
              />
              <span class="text-xs font-bold text-text-primary">{{
                time.label
              }}</span>
            </div>
            <span class="text-[10px] text-text-muted block">{{
              time.range
            }}</span>
            <span
              class="text-[10px] font-semibold text-amber-600 dark:text-amber-400 mt-1 block"
              >{{ time.count }} buses</span
            >
          </button>
        </div>
      </div>

      <!-- 3. Bus Class / Comfort Class -->
      <div>
        <h4
          class="text-xs font-bold text-text-primary uppercase tracking-wider mb-3"
        >
          Bus Class
        </h4>
        <div class="flex flex-col gap-2.5">
          <label
            v-for="cls in classOptions"
            :key="cls.id"
            class="flex items-center gap-2.5 text-xs cursor-pointer group select-none"
          >
            <input
              type="checkbox"
              :value="cls.id"
              v-model="filters.busClasses"
              class="w-4 h-4 rounded text-[#F26A36] focus:ring-[#F26A36] border-border bg-surface-2 cursor-pointer"
            />
            <span
              class="font-semibold text-text-primary group-hover:text-orange-500 transition-colors"
            >
              {{ cls.label }}
            </span>
          </label>
        </div>
      </div>

      <!-- 4. Price Range Slider -->
      <div>
        <div class="flex items-center justify-between mb-2">
          <h4
            class="text-xs font-bold text-text-primary uppercase tracking-wider"
          >
            Price Range
          </h4>
          <span class="text-xs font-black text-[#F26A36]"
            >100 - {{ filters.maxPrice }} EGP</span
          >
        </div>
        <input
          type="range"
          min="100"
          max="450"
          step="10"
          v-model.number="filters.maxPrice"
          class="w-full h-1.5 bg-surface-2 rounded-lg appearance-none cursor-pointer accent-[#F26A36]"
        />
        <div
          class="flex justify-between text-[10px] text-text-muted mt-1 font-medium"
        >
          <span>Min: 100 EGP</span>
          <span>Max: 450 EGP</span>
        </div>
      </div>

      <!-- 5. Boarding Station (Cairo) -->
      <div>
        <h4
          class="text-xs font-bold text-text-primary uppercase tracking-wider mb-3"
        >
          Boarding Station (Cairo)
        </h4>
        <div class="flex flex-col gap-2.5">
          <label
            v-for="st in boardingOptions"
            :key="st.name"
            class="flex items-center justify-between text-xs cursor-pointer group select-none"
          >
            <div class="flex items-center gap-2.5">
              <input
                type="checkbox"
                :value="st.name"
                v-model="filters.boardingStations"
                class="w-4 h-4 rounded text-[#F26A36] focus:ring-[#F26A36] border-border bg-surface-2 cursor-pointer"
              />
              <span
                class="font-semibold text-text-primary group-hover:text-orange-500 transition-colors"
              >
                {{ st.name }}
              </span>
            </div>
            <span class="text-[11px] text-text-muted">{{ st.count }}</span>
          </label>
        </div>
      </div>

      <!-- 6. Drop-off Station (Alexandria) -->
      <div>
        <h4
          class="text-xs font-bold text-text-primary uppercase tracking-wider mb-3"
        >
          Drop-off Station (Alexandria)
        </h4>
        <div class="flex flex-col gap-2.5">
          <label
            v-for="st in dropoffOptions"
            :key="st.name"
            class="flex items-center justify-between text-xs cursor-pointer group select-none"
          >
            <div class="flex items-center gap-2.5">
              <input
                type="checkbox"
                :value="st.name"
                v-model="filters.dropoffStations"
                class="w-4 h-4 rounded text-[#F26A36] focus:ring-[#F26A36] border-border bg-surface-2 cursor-pointer"
              />
              <span
                class="font-semibold text-text-primary group-hover:text-orange-500 transition-colors"
              >
                {{ st.name }}
              </span>
            </div>
            <span class="text-[11px] text-text-muted">{{ st.count }}</span>
          </label>
        </div>
      </div>
      <!-- Mobile Apply / Close Action Button -->
      <div class="lg:hidden pt-4 border-t border-border mt-2">
        <button
          type="button"
          class="w-full py-2.5 px-4 rounded-xl bg-[#F26A36] hover:bg-[#E05925] text-white font-bold text-xs shadow-sm flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer"
          @click="emit('close')"
        >
          <Icon name="ph:check-bold" class="w-4 h-4" />
          <span>Apply & Close Filters</span>
        </button>
      </div>
    </div>
  </aside>
</template>

<script lang="ts" setup>
import type { FilterState } from "~/types/search/results";

const props = defineProps<{
  modelValue: FilterState;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", filters: FilterState): void;
  (e: "reset"): void;
  (e: "close"): void;
}>();

const filters = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});

const operatorOptions = [
  { id: "gobus", name: "Go Bus", trips: 18, minPrice: 145 },
  { id: "bluebus", name: "BlueBus", trips: 12, minPrice: 220 },
  {
    id: "superjet",
    name: "Super Jet (الاتحاد العربي)",
    trips: 14,
    minPrice: 110,
  },
  { id: "westdelta", name: "West & Mid Delta", trips: 8, minPrice: 100 },
  { id: "eastdelta", name: "East Delta", trips: 4, minPrice: 105 },
];

const timeSlotOptions: Array<{
  id: "morning" | "afternoon" | "evening" | "night";
  label: string;
  range: string;
  count: number;
  icon: string;
}> = [
  {
    id: "morning",
    label: "Morning",
    range: "06:00 - 12:00",
    count: 18,
    icon: "ph:sun-bold",
  },
  {
    id: "afternoon",
    label: "Afternoon",
    range: "12:00 - 18:00",
    count: 18,
    icon: "ph:sun-horizon-bold",
  },
  {
    id: "evening",
    label: "Evening",
    range: "18:00 - 24:00",
    count: 14,
    icon: "ph:moon-stars-bold",
  },
  {
    id: "night",
    label: "Night",
    range: "00:00 - 06:00",
    count: 8,
    icon: "ph:moon-bold",
  },
];

const classOptions: Array<{
  id: "vip" | "standard" | "sleeper";
  label: string;
}> = [
  { id: "vip", label: "VIP / First Class (2+1 Seating)" },
  { id: "standard", label: "Standard / Classic AC Express" },
  { id: "sleeper", label: "Sleeper / Luxury Aero Recliner" },
];

const boardingOptions = [
  { name: "Almaza Terminal (Heliopolis)", count: 14 },
  { name: "Ramses Station Central", count: 18 },
  { name: "Torgoman Gateway (Downtown)", count: 12 },
];

const dropoffOptions = [
  { name: "Moharam Bek Terminal", count: 28 },
  { name: "Sidi Gaber Station", count: 20 },
  { name: "Smouha Square", count: 6 },
];

const toggleTimeSlot = (
  slot: "morning" | "afternoon" | "evening" | "night",
) => {
  const current = [...filters.value.timeSlots];
  const index = current.indexOf(slot);
  if (index > -1) {
    current.splice(index, 1);
  } else {
    current.push(slot);
  }
  filters.value.timeSlots = current;
};

const resetAllFilters = () => {
  emit("reset");
};
</script>