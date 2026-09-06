<template>
  <div
    class="border-b border-border bg-surface-1/95 backdrop-blur-md sticky top-16 z-30 transition-colors"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
      <!-- Official Partner Strip -->
      <div
        class="flex items-center justify-between text-xs mb-3 pb-2.5 border-b border-border/60"
      >
        <div class="flex items-center gap-2">
          <div
            class="w-5 h-5 rounded-md bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white text-[10px] font-black"
          >
            <Icon name="ph:bus-fill" class="w-3 h-3" />
          </div>
          <span
            class="font-arabic text-text-muted text-[11px] font-medium hidden sm:inline"
            >أوتوبيسي</span
          >
          <span class="text-text-muted">|</span>
          <div
            class="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium"
          >
            <Icon name="ph:check-circle-bold" class="w-3.5 h-3.5" />
            <span>Official Egyptian Intercity Coach Partner</span>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <span
            class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[11px] font-bold border border-amber-500/20"
          >
            <span
              class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"
            ></span>
            <span>{{ fromCity }} ⇄ {{ toCity }} Line Active</span>
          </span>
        </div>
      </div>

      <!-- Compact Search Bar Summary / Modify Row -->
      <div class="flex flex-wrap items-center justify-between gap-3">
        <!-- Route & Details Pills Container -->
        <div class="flex flex-wrap items-center gap-2 flex-1">
          <!-- Origin -->
          <div
            class="flex items-center gap-2 bg-surface-2 border border-border px-3.5 py-2 rounded-xl text-xs sm:text-sm"
          >
            <Icon
              name="ph:circle-bold"
              class="w-3 h-3 text-orange-500 shrink-0"
            />
            <div class="flex items-baseline gap-1">
              <span class="font-bold text-text-primary">{{ fromCity }}</span>
              <span
                class="text-text-muted text-xs truncate max-w-[120px] sm:max-w-[180px]"
                >({{ fromStation }})</span
              >
            </div>
          </div>

          <!-- Arrow -->
          <div class="text-text-muted px-0.5">
            <Icon
              name="ph:arrow-right-bold"
              class="w-3.5 h-3.5 rtl:rotate-180"
            />
          </div>

          <!-- Destination -->
          <div
            class="flex items-center gap-2 bg-surface-2 border border-border px-3.5 py-2 rounded-xl text-xs sm:text-sm"
          >
            <Icon
              name="ph:map-pin-bold"
              class="w-3 h-3 text-emerald-500 shrink-0"
            />
            <div class="flex items-baseline gap-1">
              <span class="font-bold text-text-primary">{{ toCity }}</span>
              <span
                class="text-text-muted text-xs truncate max-w-[120px] sm:max-w-[180px]"
                >({{ toStation }})</span
              >
            </div>
          </div>

          <!-- Date -->
          <div
            class="flex items-center gap-2 bg-surface-2 border border-border px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-text-primary"
          >
            <Icon
              name="ph:calendar-blank-bold"
              class="w-4 h-4 text-text-muted shrink-0"
            />
            <span>{{ formattedDate }}</span>
          </div>

          <!-- Passengers -->
          <div
            class="flex items-center gap-2 bg-surface-2 border border-border px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-text-primary"
          >
            <Icon
              name="ph:user-bold"
              class="w-4 h-4 text-text-muted shrink-0"
            />
            <span
              >{{ passengers }} Passenger{{ passengers > 1 ? "s" : "" }}</span
            >
          </div>
        </div>

        <!-- Modify Search Action Button -->
        <LazyVButton
          variant="secondary"
          size="sm"
          icon="ph:sliders-horizontal-bold"
          custom-class="shrink-0"
          @click="isModifyOpen = !isModifyOpen"
        >
          Modify Search
        </LazyVButton>
      </div>

      <!-- Modify Search Collapsible Drawer -->
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="transform -translate-y-2 opacity-0"
        enter-to-class="transform translate-y-0 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="transform translate-y-0 opacity-100"
        leave-to-class="transform -translate-y-2 opacity-0"
      >
        <div
          v-if="isModifyOpen"
          class="mt-4 pt-4 border-t border-border grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-end"
        >
          <LazyVInput
            v-model="editFrom"
            label="From city / station"
            placeholder="Origin"
            wrapper-class="lg:col-span-4"
          >
            <template #leading>
              <Icon
                name="ph:circle-bold"
                class="w-3 h-3 text-orange-500 shrink-0"
              />
            </template>
          </LazyVInput>

          <LazyVInput
            v-model="editTo"
            label="To destination"
            placeholder="Destination"
            wrapper-class="lg:col-span-4"
          >
            <template #leading>
              <Icon
                name="ph:map-pin-bold"
                class="w-3 h-3 text-emerald-500 shrink-0"
              />
            </template>
          </LazyVInput>

          <LazyVDatePicker
            v-model="editDate"
            label="Travel date"
            wrapper-class="lg:col-span-3"
          />

          <div class="lg:col-span-1 flex items-end">
            <LazyVButton
              size="md"
              icon="ph:magnifying-glass-bold"
              block
              @click="applyModify"
            >
              Update
            </LazyVButton>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    fromCity?: string;
    fromStation?: string;
    toCity?: string;
    toStation?: string;
    date?: string;
    passengers?: number;
  }>(),
  {
    fromCity: "Cairo",
    fromStation: "Ramses, Almaza, Torgoman",
    toCity: "Alexandria",
    toStation: "Moharam Bek, Sidi Gaber",
    date: "2024-10-24",
    passengers: 1,
  },
);

const emit = defineEmits<{
  (
    e: "update-search",
    params: { from: string; to: string; date: string },
  ): void;
}>();

const isModifyOpen = ref(false);
const editFrom = ref(props.fromCity);
const editTo = ref(props.toCity);
const editDate = ref(props.date);

const formattedDate = computed(() => {
  if (!props.date) return "Thu, 24 Oct 2024";
  try {
    const [y, m, d] = props.date.split("-").map(Number);
    if (!y || !m || !d) return props.date;
    const dt = new Date(y, m - 1, d);
    return dt.toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return props.date;
  }
});

const applyModify = () => {
  emit("update-search", {
    from: editFrom.value,
    to: editTo.value,
    date: editDate.value,
  });
  isModifyOpen.value = false;
};
</script>