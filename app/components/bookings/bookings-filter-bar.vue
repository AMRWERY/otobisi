<template>
  <div
    class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6"
  >
    <!-- Filter Tabs -->
    <div
      class="flex items-center gap-1.5 sm:gap-2 p-1 rounded-xl bg-surface-1 border border-border overflow-x-auto no-scrollbar shadow-2xs"
    >
      <button
        v-for="tab in tabs"
        :key="tab.id"
        type="button"
        class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap"
        :class="[
          activeTab === tab.id
            ? 'bg-[#A1331B] text-white shadow-xs'
            : 'text-text-secondary hover:text-text-primary hover:bg-surface-2'
        ]"
        @click="$emit('update:activeTab', tab.id)"
      >
        <span>{{ tab.label }}</span>
        <span
          class="px-1.5 py-0.2 rounded-full text-[10px] font-black"
          :class="[
            activeTab === tab.id
              ? 'bg-white/20 text-white'
              : 'bg-surface-2 text-text-muted'
          ]"
        >
          {{ tab.count }}
        </span>
      </button>
    </div>

    <!-- Search Input -->
    <div class="relative w-full sm:w-72 md:w-80">
      <Icon
        name="ph:magnifying-glass-bold"
        class="w-4 h-4 text-text-muted absolute start-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
      />
      <input
        :value="searchQuery"
        type="text"
        placeholder="Search PNR, city, or operator..."
        class="w-full ps-10 pe-9 py-2 rounded-xl bg-surface-1 border border-border focus:border-orange-500/50 focus:ring-2 focus:ring-orange-500/20 text-xs text-text-primary placeholder:text-text-muted outline-none transition-all shadow-2xs"
        @input="$emit('update:searchQuery', ($event.target as HTMLInputElement).value)"
      />
      <button
        v-if="searchQuery"
        type="button"
        class="absolute end-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary cursor-pointer"
        @click="$emit('update:searchQuery', '')"
      >
        <Icon name="ph:x-bold" class="w-3.5 h-3.5" />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
export interface FilterTab {
  id: string;
  label: string;
  count: number;
}

withDefaults(
  defineProps<{
    activeTab: string;
    searchQuery: string;
    tabs?: FilterTab[];
  }>(),
  {
    tabs: () => [
      { id: "all", label: "All Bookings", count: 3 },
      { id: "upcoming", label: "Upcoming", count: 1 },
      { id: "completed", label: "Completed", count: 1 },
      { id: "cancelled", label: "Cancelled", count: 1 },
    ],
  },
);

defineEmits<{
  (e: "update:activeTab", value: string): void;
  (e: "update:searchQuery", value: string): void;
}>();
</script>
