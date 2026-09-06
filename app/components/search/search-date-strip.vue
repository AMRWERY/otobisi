<template>
  <div class="w-full">
    <div
      class="flex items-center gap-2.5 overflow-x-auto pb-1 select-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
    >
      <button
        v-for="item in dateItems"
        :key="item.date"
        type="button"
        :class="[
          'flex-1 min-w-[150px] sm:min-w-[170px] p-3 rounded-2xl border text-start transition-all relative overflow-hidden shrink-0 cursor-pointer',
          selectedDate === item.date
            ? 'bg-gradient-to-br from-amber-500/15 to-orange-500/10 border-orange-500/80 shadow-md ring-1 ring-orange-500/40'
            : 'bg-surface-1 hover:bg-surface-2 border-border text-text-secondary hover:text-text-primary',
        ]"
        @click="selectDate(item.date)"
      >
        <!-- Active Pill Badge -->
        <span
          v-if="selectedDate === item.date"
          class="absolute top-2 end-2 px-1.5 py-0.2 text-[9px] font-black uppercase tracking-wider rounded-md bg-[#F26A36] text-white shadow-xs"
        >
          Active
        </span>

        <!-- Date String -->
        <div
          class="text-xs font-bold text-text-primary flex items-center gap-1.5"
        >
          <span>{{ item.dayLabel }}</span>
          <span
            v-if="item.isToday"
            class="text-[10px] text-amber-600 dark:text-amber-400 font-extrabold"
            >• Today</span
          >
        </div>

        <!-- Price -->
        <div class="mt-1 flex items-baseline gap-1">
          <span class="text-[11px] text-text-muted">from</span>
          <span
            :class="[
              'text-sm sm:text-base font-black',
              selectedDate === item.date
                ? 'text-amber-600 dark:text-amber-400'
                : 'text-text-primary',
            ]"
          >
            {{ item.fare }}
          </span>
          <span class="text-[10px] font-bold text-text-secondary">EGP</span>
        </div>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { DateFareItem } from "~/types/search/results";

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    items?: DateFareItem[];
  }>(),
  {
    modelValue: "2024-10-24",
    items: () => [
      { date: "2024-10-22", dayLabel: "Tue, 22 Oct", fare: 115 },
      { date: "2024-10-23", dayLabel: "Wed, 23 Oct", fare: 110 },
      { date: "2024-10-24", dayLabel: "Thu, 24 Oct", fare: 110, isToday: true },
      { date: "2024-10-25", dayLabel: "Fri, 25 Oct", fare: 130 },
      { date: "2024-10-26", dayLabel: "Sat, 26 Oct", fare: 110 },
      { date: "2024-10-27", dayLabel: "Sun, 27 Oct", fare: 110 },
    ],
  },
);

const emit = defineEmits<{
  (e: "update:modelValue", date: string): void;
  (e: "change", date: string): void;
}>();

const selectedDate = computed({
  get: () => props.modelValue,
  set: (val) => {
    emit("update:modelValue", val);
    emit("change", val);
  },
});

const dateItems = computed(() => props.items);

const selectDate = (date: string) => {
  selectedDate.value = date;
};
</script>