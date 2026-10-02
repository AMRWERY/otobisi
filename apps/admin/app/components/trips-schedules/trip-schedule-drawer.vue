<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 overflow-hidden"
      role="dialog"
      aria-modal="true"
    >
      <!-- Backdrop -->
      <div
        class="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
        @click="emit('close')"
      />

      <!-- Drawer Container -->
      <div class="fixed inset-y-0 end-0 flex max-w-full">
        <div
          class="w-screen max-w-md lg:max-w-lg bg-surface-0 dark:bg-[#0E131F] border-s border-border shadow-2xl flex flex-col h-full transform transition-transform duration-300 ease-in-out"
        >
          <!-- Drawer Header -->
          <div
            class="px-6 py-5 border-b border-border/80 flex items-start justify-between gap-4 shrink-0 bg-surface-1/30 dark:bg-surface-2/10"
          >
            <div>
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-emerald-500" />
                <h2 class="text-base font-bold text-text-primary">
                  {{
                    isEditing ? "Edit Trip Schedule" : "Add New Trip Schedule"
                  }}
                </h2>
              </div>
              <p class="text-xs text-text-muted mt-0.5">
                Create a one-off or recurring timetable route
              </p>
            </div>
            <VButton
              variant="ghost"
              size="xs"
              rounded="lg"
              icon="ph:x-bold"
              aria-label="Close drawer"
              @click="emit('close')"
            />
          </div>

          <!-- Drawer Body -->
          <div
            class="flex-1 overflow-y-auto px-6 py-5 space-y-6 custom-scrollbar text-xs"
          >
            <!-- Corridor Route Origin & Destination -->
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <label
                  class="text-[11px] font-bold uppercase tracking-wider text-text-primary"
                >
                  Corridor Route Origin & Destination
                </label>
                <span
                  class="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold"
                >
                  14 Corridors Active
                </span>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div class="space-y-1">
                  <span class="text-[10px] uppercase font-bold text-text-muted"
                    >Origin Station</span
                  >
                  <select
                    v-model="form.origin"
                    class="w-full px-3 py-2 rounded-lg bg-surface-1 dark:bg-surface-2/50 border border-border text-xs text-text-primary focus:outline-none focus:border-accent-500 transition-colors"
                  >
                    <option
                      v-for="station in originStations"
                      :key="station"
                      :value="station"
                    >
                      {{ station }}
                    </option>
                  </select>
                </div>

                <div class="space-y-1">
                  <span class="text-[10px] uppercase font-bold text-text-muted"
                    >Destination Terminal</span
                  >
                  <select
                    v-model="form.destination"
                    class="w-full px-3 py-2 rounded-lg bg-surface-1 dark:bg-surface-2/50 border border-border text-xs text-text-primary focus:outline-none focus:border-accent-500 transition-colors"
                  >
                    <option
                      v-for="station in destinationStations"
                      :key="station"
                      :value="station"
                    >
                      {{ station }}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Timetable Timing Matrix using shared LazyVInput -->
            <div class="space-y-2">
              <label
                class="text-[11px] font-bold uppercase tracking-wider text-text-muted block"
              >
                TIMETABLE TIMING MATRIX
              </label>

              <div class="grid grid-cols-3 gap-2">
                <LazyVInput
                  v-model="form.departDate"
                  label="Depart Date"
                  size="xs"
                  rounded="lg"
                  placeholder="Oct 25, 2024"
                  label-class="text-[10px] text-text-muted font-normal"
                />
                <LazyVInput
                  v-model="form.departTime"
                  label="Depart Time"
                  size="xs"
                  rounded="lg"
                  placeholder="08:30 AM"
                  label-class="text-[10px] text-text-muted font-normal"
                />
                <LazyVInput
                  v-model="form.estArrival"
                  label="Est. Arrival"
                  size="xs"
                  rounded="lg"
                  placeholder="11:00 AM"
                  label-class="text-[10px] text-text-muted font-normal"
                />
              </div>
            </div>

            <!-- Bus & Vehicle Assignment -->
            <div class="space-y-2">
              <label class="text-[11px] font-bold text-text-primary block">
                Bus & Vehicle Assignment
              </label>
              <select
                v-model="form.vehicle"
                class="w-full px-3 py-2 rounded-lg bg-surface-1 dark:bg-surface-2/50 border border-border text-xs text-text-primary focus:outline-none focus:border-accent-500"
              >
                <option
                  v-for="bus in vehicleOptions"
                  :key="bus.value"
                  :value="bus.value"
                >
                  {{ bus.label }}
                </option>
              </select>
              <div
                class="flex items-center gap-1.5 text-[11px] text-emerald-700 dark:text-emerald-400 font-medium pt-0.5"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span
                  >Fleet pre-inspection verified for
                  {{ form.capacity || 48 }} passengers</span
                >
              </div>
            </div>

            <!-- Base Ticket Fare (EGP) using shared LazyVInput -->
            <div class="space-y-2">
              <label class="text-[11px] font-bold text-text-primary block">
                Base Ticket Fare (EGP)
              </label>
              <LazyVInput
                v-model.number="form.fare"
                type="number"
                size="sm"
                rounded="lg"
                input-class="font-bold text-sm"
              >
                <template #leading>
                  <span class="ps-2 pe-1 font-bold text-text-muted text-xs">
                    EGP
                  </span>
                </template>
              </LazyVInput>

              <!-- Calculation breakdown -->
              <div
                class="flex items-center justify-between text-[11px] font-mono text-text-muted bg-surface-1/50 dark:bg-surface-2/20 p-2 rounded-lg border border-border/50"
              >
                <span>Net Tariff: {{ netTariff.toFixed(2) }} EGP</span>
                <span class="text-emerald-600 dark:text-emerald-400"
                  >14% Egyptian VAT Included:
                  {{ vatAmount.toFixed(2) }} EGP</span
                >
              </div>
            </div>

            <!-- Repeat Schedule Automatically -->
            <div
              class="p-4 rounded-xl bg-surface-1/40 dark:bg-surface-2/20 border border-border/70 space-y-4"
            >
              <div class="flex items-center justify-between">
                <div>
                  <div class="font-bold text-text-primary text-xs">
                    Repeat Schedule Automatically
                  </div>
                  <div class="text-[11px] text-text-muted">
                    Generates recurring timetable occurrences
                  </div>
                </div>
                <!-- Toggle switch -->
                <button
                  type="button"
                  class="w-10 h-5 rounded-full transition-colors relative cursor-pointer"
                  :class="
                    form.isRecurring
                      ? 'bg-emerald-600'
                      : 'bg-surface-3 dark:bg-surface-2'
                  "
                  @click="form.isRecurring = !form.isRecurring"
                >
                  <span
                    class="absolute top-0.5 start-0.5 w-4 h-4 rounded-full bg-white transition-transform"
                    :class="{
                      'translate-x-5 rtl:-translate-x-5': form.isRecurring,
                    }"
                  />
                </button>
              </div>

              <div
                v-if="form.isRecurring"
                class="space-y-3 pt-2 border-t border-border/60"
              >
                <!-- Recurrence pill tabs -->
                <div class="flex items-center gap-2 text-xs">
                  <span class="text-text-muted text-[11px]">Recurrence:</span>
                  <div
                    class="flex items-center bg-surface-2/60 dark:bg-surface-2 rounded-lg p-0.5"
                  >
                    <button
                      v-for="rec in ['Daily', 'Weekly', 'Custom']"
                      :key="rec"
                      type="button"
                      class="px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors cursor-pointer"
                      :class="
                        form.recurrenceType === rec
                          ? 'bg-emerald-700 text-white shadow-xs'
                          : 'text-text-muted hover:text-text-primary'
                      "
                      @click="form.recurrenceType = rec"
                    >
                      {{ rec }}
                    </button>
                  </div>
                </div>

                <!-- Operating Days -->
                <div class="space-y-1.5">
                  <span
                    class="text-[10px] font-bold uppercase tracking-wider text-text-muted block"
                  >
                    OPERATING DAYS
                  </span>
                  <div class="flex items-center gap-2">
                    <button
                      v-for="(day, idx) in daysList"
                      :key="idx"
                      type="button"
                      class="w-7 h-7 rounded-full text-xs font-bold transition-all flex items-center justify-center cursor-pointer"
                      :class="
                        form.operatingDays.includes(day.key)
                          ? 'bg-emerald-700 text-white ring-2 ring-emerald-600/30'
                          : 'bg-surface-2 text-text-muted hover:text-text-primary'
                      "
                      @click="toggleDay(day.key)"
                    >
                      {{ day.letter }}
                    </button>
                  </div>
                </div>

                <!-- Recurrence Horizon -->
                <div
                  class="flex items-center justify-between text-[11px] text-text-muted pt-1"
                >
                  <span>Recurrence Horizon</span>
                  <span class="font-medium text-text-primary">
                    End after 30 departures (Nov 24, 2024)
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Drawer Footer using shared VButton -->
          <div
            class="px-6 py-4 border-t border-border/80 bg-surface-1/40 dark:bg-surface-2/20 flex items-center justify-end gap-3 shrink-0"
          >
            <LazyVButton
              variant="ghost"
              size="sm"
              rounded="xl"
              @click="emit('close')"
            >
              Cancel
            </LazyVButton>

            <LazyVButton
              variant="primary"
              size="sm"
              rounded="xl"
              icon="ph:check-bold"
              custom-class="bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm shadow-emerald-950/20 border-none"
              @click="handleSave"
            >
              Save & Publish Schedule
            </LazyVButton>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
const props = defineProps<{
  isOpen: boolean;
  tripData?: any;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "save", trip: any): void;
}>();

const isEditing = computed(() => !!props.tripData?.id);

const originStations = [
  "Cairo Almaza Terminal",
  "Cairo (Tahrir)",
  "Alexandria Sidi Gaber Terminal",
  "Alex (Moharam Bek)",
  "Mansoura Express Terminal",
  "Port Said Terminal",
  "Hurghada (El Dahar)",
  "Sharm El Sheikh (Peace Rd)",
  "Dahab Bus Terminal",
  "Luxor Terminal",
];

const destinationStations = [
  "Alexandria Sidi Gaber Terminal",
  "Cairo Almaza Terminal",
  "Cairo (Tahrir)",
  "Hurghada (El Dahar)",
  "Sharm El Sheikh (Peace Rd)",
  "Dahab Bus Terminal",
  "Mansoura Express",
  "Luxor Overland Exp",
  "Port Said Terminal",
];

const vehicleOptions = [
  {
    label: "MCV 600 VIP Elite - Plate #(DX-8821) (48 Seats) - In Service",
    value: "MCV 600 VIP",
    plate: "DX-8821",
    cap: 48,
  },
  {
    label: "MAN Lion's Coach - Plate #(HR-1844) (48 Seats) - In Service",
    value: "MAN Lion's Coach",
    plate: "HR-1844",
    cap: 48,
  },
  {
    label: "Mercedes Travego VIP - Plate #(SS-9012) (44 Seats) - In Service",
    value: "Mercedes Travego VIP",
    plate: "SS-9012",
    cap: 44,
  },
  {
    label: "MCV 400 Eco - Plate #(AX-3310) (48 Seats) - In Service",
    value: "MCV 400 Eco",
    plate: "AX-3310",
    cap: 48,
  },
  {
    label: "SuperJet Business - Plate #(DH-7711) (36 Seats) - In Service",
    value: "SuperJet Business",
    plate: "DH-7711",
    cap: 36,
  },
  {
    label: "Daewoo Royal City - Plate #(MN-4402) (48 Seats) - In Service",
    value: "Daewoo Royal City",
    plate: "MN-4402",
    cap: 48,
  },
  {
    label: "Sleeper Coach VIP - Plate #(LX-1100) (30 Seats) - In Service",
    value: "Sleeper Coach VIP",
    plate: "LX-1100",
    cap: 30,
  },
  {
    label: "MCV 400 Standard - Plate #(PS-2201) (48 Seats) - Standby",
    value: "MCV 400 Standard",
    plate: "PS-2201",
    cap: 48,
  },
];

const daysList = [
  { letter: "M", key: "mon" },
  { letter: "T", key: "tue" },
  { letter: "W", key: "wed" },
  { letter: "T", key: "thu" },
  { letter: "F", key: "fri" },
  { letter: "S", key: "sat" },
  { letter: "S", key: "sun" },
];

const form = ref({
  id: "",
  origin: "Cairo Almaza Terminal",
  destination: "Alexandria Sidi Gaber Terminal",
  departDate: "Oct 25, 2024",
  departTime: "08:30 AM",
  estArrival: "11:00 AM",
  duration: "2h 30m direct",
  gate: "Gate B-04",
  vehicle: "MCV 600 VIP",
  plate: "DX-8821",
  capacity: 48,
  fare: 220,
  isRecurring: true,
  recurrenceType: "Daily",
  operatingDays: ["mon", "tue", "wed", "thu", "fri", "sat"],
  status: true,
});

watch(
  () => props.tripData,
  (val) => {
    if (val) {
      form.value = {
        id: val.id || "",
        origin: val.origin || "Cairo Almaza Terminal",
        destination: val.destination || "Alexandria Sidi Gaber Terminal",
        departDate: val.departDate || "Oct 25, 2024",
        departTime: val.departTime || "08:30 AM",
        estArrival: val.estArrival || "11:00 AM",
        duration: val.duration || "2h 30m direct",
        gate: val.gate || "Gate B-04",
        vehicle: val.vehicle || "MCV 600 VIP",
        plate: val.plate || "DX-8821",
        capacity: val.capacity || 48,
        fare: val.fare || 220,
        isRecurring: val.isRecurring ?? true,
        recurrenceType: val.recurrenceType || "Daily",
        operatingDays: val.operatingDays || [
          "mon",
          "tue",
          "wed",
          "thu",
          "fri",
          "sat",
        ],
        status: val.status ?? true,
      };
    } else {
      form.value = {
        id: "",
        origin: "Cairo Almaza Terminal",
        destination: "Alexandria Sidi Gaber Terminal",
        departDate: "Oct 25, 2024",
        departTime: "08:30 AM",
        estArrival: "11:00 AM",
        duration: "2h 30m direct",
        gate: "Gate B-04",
        vehicle: "MCV 600 VIP",
        plate: "DX-8821",
        capacity: 48,
        fare: 220,
        isRecurring: true,
        recurrenceType: "Daily",
        operatingDays: ["mon", "tue", "wed", "thu", "fri", "sat"],
        status: true,
      };
    }
  },
  { immediate: true }
);

const netTariff = computed(() => (form.value.fare || 0) / 1.14);
const vatAmount = computed(() => (form.value.fare || 0) - netTariff.value);

const toggleDay = (key: string) => {
  const index = form.value.operatingDays.indexOf(key);
  if (index > -1) {
    form.value.operatingDays.splice(index, 1);
  } else {
    form.value.operatingDays.push(key);
  }
};

const handleSave = () => {
  const selectedVehicleObj = vehicleOptions.find(
    (v) => v.value === form.value.vehicle
  );
  if (selectedVehicleObj) {
    form.value.plate = selectedVehicleObj.plate;
    form.value.capacity = selectedVehicleObj.cap;
  }
  emit("save", { ...form.value });
};
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: var(--border);
  border-radius: 9999px;
}
</style>