<template>
  <aside
    class="bg-surface-1 border border-border rounded-2xl p-4 sm:p-5 shadow-sm text-start select-none"
  >
    <!-- Filters Header -->
    <div
      class="flex items-center justify-between pb-3.5 border-b border-border mb-4"
    >
      <div class="flex items-center gap-2">
        <div
          class="w-8 h-8 rounded-xl bg-orange-500/10 text-[#F26A36] flex items-center justify-center shrink-0"
        >
          <Icon name="ph:sliders-horizontal-bold" class="w-4 h-4" />
        </div>
        <div>
          <h3
            class="font-bold text-sm sm:text-base text-text-primary leading-tight"
          >
            Trip Filters
          </h3>
          <p class="text-[11px] text-text-muted mt-0.5">
            {{ routeSubtitle }}
          </p>
        </div>
      </div>
      <div class="flex items-center gap-2.5">
        <button
          type="button"
          class="text-xs font-semibold text-[#F26A36] hover:underline transition-colors cursor-pointer"
          @click="resetAllFilters"
        >
          Reset All
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

    <div class="flex flex-col gap-5">
      <!-- ── 1. ACTIVE TAGS ── -->
      <div v-if="activeTags.length" class="pb-3 border-b border-border">
        <div class="flex items-center justify-between mb-2">
          <span
            class="text-[10px] font-bold uppercase tracking-wider text-text-muted"
          >
            ACTIVE TAGS
          </span>
          <span class="text-xs font-semibold text-[#F26A36]">
            {{ activeTags.length }} applied
          </span>
        </div>
        <div class="flex flex-wrap gap-1.5">
          <span
            v-for="tag in activeTags"
            :key="tag.id"
            class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-400 border border-orange-200/80 dark:border-orange-900/50"
          >
            <span>{{ tag.label }}</span>
            <button
              type="button"
              class="w-3.5 h-3.5 rounded-full hover:bg-orange-200 dark:hover:bg-orange-900/60 inline-flex items-center justify-center text-orange-600 dark:text-orange-300 transition-colors cursor-pointer"
              :aria-label="`Remove ${tag.label}`"
              @click="removeTag(tag)"
            >
              <Icon name="ph:x-bold" class="w-2.5 h-2.5" />
            </button>
          </span>
        </div>
      </div>

      <!-- ── 2. PRICE RANGE (ONE-WAY) ── -->
      <div class="pb-3 border-b border-border">
        <div class="flex items-center justify-between mb-1">
          <div class="flex items-center gap-1.5">
            <Icon name="ph:tag-bold" class="w-3.5 h-3.5 text-[#F26A36]" />
            <h4
              class="text-xs font-bold text-text-primary uppercase tracking-wider"
            >
              Price Range (One-Way)
            </h4>
          </div>
          <span
            class="px-2 py-0.5 rounded-full text-xs font-bold bg-[#F26A36]/10 text-[#F26A36] border border-[#F26A36]/20"
          >
            {{ filters.minPrice ?? 90 }} - {{ filters.maxPrice }} EGP
          </span>
        </div>
        <p class="text-[11px] text-text-muted mb-3">
          Average intercity coach fare on this corridor: 210 EGP
        </p>

        <!-- Slider Bar with 2 balls -->
        <div class="relative w-full h-8 flex items-center mb-1 select-none">
          <!-- Background Track -->
          <div
            class="absolute inset-x-0 h-2 bg-surface-2 dark:bg-slate-800 rounded-full"
          />

          <!-- Active Highlight Track between the 2 balls -->
          <div
            class="absolute h-2 bg-[#EA580C] rounded-full pointer-events-none"
            :style="{
              left: `${minPercent}%`,
              width: `${Math.max(0, maxPercent - minPercent)}%`,
            }"
          />

          <!-- Ball 1 (Min Price) -->
          <div
            class="absolute w-5 h-5 -ml-2.5 rounded-full bg-white dark:bg-[#1E293B] border-[3px] border-[#EA580C] shadow-md pointer-events-none z-10"
            :style="{ left: `${minPercent}%` }"
          />

          <!-- Ball 2 (Max Price) -->
          <div
            class="absolute w-5 h-5 -ml-2.5 rounded-full bg-white dark:bg-[#1E293B] border-[3px] border-[#EA580C] shadow-md pointer-events-none z-10"
            :style="{ left: `${maxPercent}%` }"
          />

          <!-- Native Slider 1 (Min) -->
          <input
            type="range"
            min="90"
            max="450"
            step="5"
            v-model.number="minPriceModel"
            class="absolute inset-x-0 w-full h-8 appearance-none bg-transparent pointer-events-none cursor-grab active:cursor-grabbing z-20 m-0 [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-7 [&::-webkit-slider-thumb]:h-7 [&::-webkit-slider-thumb]:opacity-0 [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-7 [&::-moz-range-thumb]:h-7 [&::-moz-range-thumb]:opacity-0"
            aria-label="Minimum Price"
          />

          <!-- Native Slider 2 (Max) -->
          <input
            type="range"
            min="90"
            max="450"
            step="5"
            v-model.number="maxPriceModel"
            class="absolute inset-x-0 w-full h-8 appearance-none bg-transparent pointer-events-none cursor-grab active:cursor-grabbing z-30 m-0 [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-7 [&::-webkit-slider-thumb]:h-7 [&::-webkit-slider-thumb]:opacity-0 [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-7 [&::-moz-range-thumb]:h-7 [&::-moz-range-thumb]:opacity-0"
            aria-label="Maximum Price"
          />
        </div>

        <div
          class="flex justify-between text-[10px] text-text-muted font-medium mb-2.5"
        >
          <span>Min: 90 EGP</span>
          <span>Max: 450 EGP</span>
        </div>

        <!-- FROM & TO Cards -->
        <div class="grid grid-cols-2 gap-2">
          <div class="bg-surface-2 border border-border rounded-xl p-2">
            <span
              class="text-[9px] font-bold text-text-muted block uppercase tracking-wider"
            >
              FROM
            </span>
            <div class="flex items-baseline gap-1 mt-0.5">
              <span class="text-sm font-black text-text-primary">
                {{ filters.minPrice ?? 90 }}
              </span>
              <span class="text-[10px] font-semibold text-text-muted">EGP</span>
            </div>
          </div>
          <div class="bg-surface-2 border border-border rounded-xl p-2">
            <span
              class="text-[9px] font-bold text-text-muted block uppercase tracking-wider"
            >
              TO
            </span>
            <div class="flex items-baseline gap-1 mt-0.5">
              <span class="text-sm font-black text-text-primary">
                {{ filters.maxPrice }}
              </span>
              <span class="text-[10px] font-semibold text-text-muted">EGP</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ── 3. DEPARTURE TIME (مواعيد المغادرة) ── -->
      <div class="pb-3 border-b border-border">
        <div class="flex items-center justify-between mb-2.5">
          <div class="flex items-center gap-1.5">
            <Icon name="ph:clock-bold" class="w-3.5 h-3.5 text-[#F26A36]" />
            <h4
              class="text-xs font-bold text-text-primary uppercase tracking-wider"
            >
              Departure Time (مواعيد المغادرة)
            </h4>
          </div>
          <span class="text-[10px] text-text-muted">Cairo Time</span>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <button
            v-for="time in timeSlotOptions"
            :key="time.id"
            type="button"
            :class="[
              'p-2.5 rounded-xl border text-center transition-all cursor-pointer relative flex flex-col items-center justify-center select-none',
              filters.timeSlots.includes(time.id)
                ? 'bg-orange-500/10 dark:bg-orange-950/30 border-[#F26A36] text-text-primary shadow-2xs ring-1 ring-[#F26A36]/40'
                : 'bg-surface-2 hover:bg-surface-0 border-border text-text-secondary hover:text-text-primary',
            ]"
            @click="toggleTimeSlot(time.id)"
          >
            <span
              v-if="filters.timeSlots.includes(time.id)"
              class="w-1.5 h-1.5 rounded-full bg-[#F26A36] absolute top-2 end-2"
            />
            <Icon
              :name="time.icon"
              class="w-4 h-4 mb-1"
              :class="
                filters.timeSlots.includes(time.id)
                  ? 'text-[#F26A36]'
                  : 'text-text-muted'
              "
            />
            <span class="text-xs font-bold text-text-primary block">
              {{ time.label }}
            </span>
            <span class="text-[10px] text-text-muted block mt-0.5">
              {{ time.range }}
            </span>
          </button>
        </div>
      </div>

      <!-- ── 4. BUS OPERATORS (شركات النقل) ── -->
      <div>
        <div class="flex items-center justify-between mb-2.5">
          <div class="flex items-center gap-1.5">
            <Icon name="ph:bus-bold" class="w-3.5 h-3.5 text-[#F26A36]" />
            <h4
              class="text-xs font-bold text-text-primary uppercase tracking-wider"
            >
              Bus Operators (شركات النقل)
            </h4>
          </div>
          <button
            type="button"
            class="text-xs font-semibold text-[#F26A36] hover:underline cursor-pointer"
            @click="toggleAllOperators"
          >
            {{ isAllOperatorsSelected ? "Deselect All" : "Select All" }}
          </button>
        </div>
        <div class="flex flex-col gap-1.5">
          <label
            v-for="op in operatorOptions"
            :key="op.id"
            class="flex items-center justify-between p-2 rounded-xl hover:bg-surface-2 transition-colors text-xs cursor-pointer group select-none border border-transparent hover:border-border/50"
          >
            <div class="flex items-center gap-2.5">
              <input
                type="checkbox"
                :value="op.id"
                v-model="filters.operators"
                class="w-4 h-4 rounded text-[#F26A36] focus:ring-[#F26A36] border-border bg-surface-2 cursor-pointer"
              />
              <div
                class="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold text-white shadow-2xs shrink-0"
                :class="op.badgeBg"
              >
                {{ op.abbr }}
              </div>
              <div>
                <span
                  class="font-semibold text-text-primary group-hover:text-[#F26A36] transition-colors block leading-tight"
                >
                  {{ op.name }}
                </span>
                <span
                  v-if="op.arabicName"
                  class="text-[10px] text-text-muted font-normal block"
                >
                  {{ op.arabicName }}
                </span>
              </div>
            </div>
            <span class="text-[11px] text-text-muted font-semibold">
              {{ op.minPrice }} EGP
            </span>
          </label>
        </div>
      </div>

      <!-- Mobile / Sidebar Apply Action Footer -->
      <div class="pt-3 border-t border-border flex items-center gap-2">
        <button
          type="button"
          class="w-1/3 py-2.5 px-3 rounded-xl border border-border bg-surface-2 hover:bg-surface-0 text-text-secondary hover:text-text-primary font-semibold text-xs transition-colors cursor-pointer"
          @click="resetAllFilters"
        >
          Reset All
        </button>
        <button
          type="button"
          class="w-2/3 py-2.5 px-4 rounded-xl bg-[#F26A36] hover:bg-[#E05925] text-white font-bold text-xs shadow-sm flex items-center justify-center gap-1.5 transition-all active:scale-98 cursor-pointer"
          @click="emit('close')"
        >
          <Icon name="ph:check-bold" class="w-3.5 h-3.5" />
          <span>Apply Filters</span>
        </button>
      </div>
    </div>
  </aside>
</template>

<script lang="ts" setup>
import type { FilterState } from "~/types/search/results";

const props = withDefaults(
  defineProps<{
    modelValue: FilterState;
    fromCity?: string;
    toCity?: string;
    tripsCount?: number;
  }>(),
  {
    fromCity: "Cairo",
    toCity: "Alexandria",
    tripsCount: 14,
  },
);

const emit = defineEmits<{
  (e: "update:modelValue", filters: FilterState): void;
  (e: "reset"): void;
  (e: "close"): void;
}>();

const filters = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});

const routeSubtitle = computed(() => {
  return `${props.fromCity} → ${props.toCity} (${props.tripsCount} trips found)`;
});

const minPriceModel = computed({
  get: () => filters.value.minPrice ?? 90,
  set: (val: number) => {
    const max = filters.value.maxPrice ?? 450;
    filters.value = {
      ...filters.value,
      minPrice: Math.min(val, max - 10),
    };
  },
});

const maxPriceModel = computed({
  get: () => filters.value.maxPrice ?? 450,
  set: (val: number) => {
    const min = filters.value.minPrice ?? 90;
    filters.value = {
      ...filters.value,
      maxPrice: Math.max(val, min + 10),
    };
  },
});

const minPercent = computed(() => {
  const min = filters.value.minPrice ?? 90;
  return Math.min(100, Math.max(0, ((min - 90) / (450 - 90)) * 100));
});

const maxPercent = computed(() => {
  const max = filters.value.maxPrice ?? 450;
  return Math.min(100, Math.max(0, ((max - 90) / (450 - 90)) * 100));
});

const operatorOptions = [
  {
    id: "gobus",
    name: "Go Bus",
    arabicName: "جو باص",
    abbr: "GB",
    badgeBg: "bg-orange-600",
    minPrice: 175,
  },
  {
    id: "superjet",
    name: "Super Jet",
    arabicName: "الاتحاد العربي",
    abbr: "SJ",
    badgeBg: "bg-blue-600",
    minPrice: 210,
  },
  {
    id: "westdelta",
    name: "West Delta",
    arabicName: "غرب الدلتا",
    abbr: "WD",
    badgeBg: "bg-emerald-600",
    minPrice: 145,
  },
  {
    id: "bluebus",
    name: "BlueBus",
    arabicName: "بلو باص",
    abbr: "BB",
    badgeBg: "bg-indigo-600",
    minPrice: 240,
  },
  {
    id: "eastdelta",
    name: "East Delta",
    arabicName: "شرق الدلتا",
    abbr: "ED",
    badgeBg: "bg-amber-600",
    minPrice: 110,
  },
];

const timeSlotOptions: Array<{
  id: "morning" | "afternoon" | "evening" | "night";
  label: string;
  range: string;
  icon: string;
}> = [
  {
    id: "morning",
    label: "Morning",
    range: "06:00 - 11:59",
    icon: "ph:fast-forward-bold",
  },
  {
    id: "afternoon",
    label: "Afternoon",
    range: "12:00 - 16:59",
    icon: "ph:lightning-bold",
  },
  {
    id: "evening",
    label: "Evening",
    range: "17:00 - 20:59",
    icon: "ph:moon-stars-bold",
  },
  {
    id: "night",
    label: "Night",
    range: "21:00 - 05:59",
    icon: "ph:moon-bold",
  },
];

const isAllOperatorsSelected = computed(() => {
  return operatorOptions.every((op) => filters.value.operators.includes(op.id));
});

const toggleAllOperators = () => {
  const allIds = operatorOptions.map((o) => o.id);
  if (isAllOperatorsSelected.value) {
    filters.value = { ...filters.value, operators: [] };
  } else {
    filters.value = { ...filters.value, operators: [...allIds] };
  }
};

const activeTags = computed(() => {
  const tags: Array<{ id: string; label: string; type: string }> = [];

  // Operators
  filters.value.operators.forEach((opId) => {
    const op = operatorOptions.find((o) => o.id === opId);
    if (op) {
      tags.push({
        id: `op-${opId}`,
        label: op.name,
        type: "operator",
      });
    }
  });

  // Time slots
  filters.value.timeSlots.forEach((slotId) => {
    const slot = timeSlotOptions.find((s) => s.id === slotId);
    if (slot) {
      tags.push({
        id: `slot-${slotId}`,
        label: `${slot.label} (${slot.range})`,
        type: "timeSlot",
      });
    }
  });

  // Price range
  const minP = filters.value.minPrice ?? 90;
  const maxP = filters.value.maxPrice ?? 450;
  if (minP > 90 || maxP < 450) {
    tags.push({
      id: "price-range",
      label: minP > 90 ? `${minP} - ${maxP} EGP` : `Under ${maxP} EGP`,
      type: "price",
    });
  }

  return tags;
});

const removeTag = (tag: { id: string; label: string; type: string }) => {
  if (tag.type === "operator") {
    const opId = tag.id.replace("op-", "");
    filters.value = {
      ...filters.value,
      operators: filters.value.operators.filter((id) => id !== opId),
    };
  } else if (tag.type === "timeSlot") {
    const slotId = tag.id.replace("slot-", "") as any;
    filters.value = {
      ...filters.value,
      timeSlots: filters.value.timeSlots.filter((id) => id !== slotId),
    };
  } else if (tag.type === "price") {
    filters.value = {
      ...filters.value,
      minPrice: 90,
      maxPrice: 450,
    };
  }
};

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
  filters.value = {
    ...filters.value,
    timeSlots: current,
  };
};

const resetAllFilters = () => {
  emit("reset");
};
</script>

<style scoped>
/* Scoped styles */
</style>