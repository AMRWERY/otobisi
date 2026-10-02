<template>
  <div
    class="bg-surface-0 dark:bg-[#111927] border border-border/80 rounded-2xl p-5 space-y-6 shadow-xs text-xs"
  >
    <!-- ─── Template Identity ─── -->
    <div class="space-y-3">
      <div class="flex items-center justify-between">
        <h3 class="text-sm font-extrabold text-text-primary tracking-tight">
          Template Identity
        </h3>
        <span
          class="font-mono text-[10px] font-bold text-emerald-700 dark:text-emerald-400"
        >
          UID: {{ form.uid }}
        </span>
      </div>

      <!-- Layout Display Name -->
      <div class="space-y-1">
        <label class="text-[11px] font-bold text-text-muted uppercase">
          Layout Display Name
        </label>
        <LazyVInput
          v-model="form.name"
          size="sm"
          rounded="xl"
          placeholder="e.g. VIP 2+1 Executive Suite"
        />
      </div>

      <!-- Target Chassis / Vehicle Model -->
      <div class="space-y-1">
        <label class="text-[11px] font-bold text-text-muted uppercase">
          Target Chassis / Vehicle Model
        </label>
        <select
          v-model="form.chassis"
          class="w-full px-3 py-2 rounded-xl bg-surface-1 dark:bg-surface-2/40 border border-border text-xs text-text-primary focus:outline-none focus:border-accent-500 font-medium transition-colors"
        >
          <option v-for="c in chassisOptions" :key="c" :value="c">
            {{ c }}
          </option>
        </select>
      </div>

      <!-- Fleet Service Class -->
      <div class="space-y-1.5">
        <label class="text-[11px] font-bold text-text-muted uppercase">
          Fleet Service Class
        </label>
        <div
          class="grid grid-cols-4 gap-1 bg-surface-1 dark:bg-surface-2/40 p-1 rounded-xl border border-border/70 text-center"
        >
          <button
            v-for="cls in serviceClasses"
            :key="cls"
            type="button"
            class="py-1.5 px-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer truncate"
            :class="[
              form.serviceClass === cls
                ? 'bg-[#0F5A47] text-white shadow-xs'
                : 'text-text-muted hover:text-text-primary',
            ]"
            @click="form.serviceClass = cls"
          >
            {{ cls }}
          </button>
        </div>
      </div>
    </div>

    <!-- ─── Geometry & Capacity Matrix ─── -->
    <div class="space-y-2.5 pt-2 border-t border-border/70">
      <h3 class="text-xs font-black text-text-primary uppercase tracking-wider">
        Geometry & Capacity Matrix
      </h3>

      <div class="grid grid-cols-2 gap-2.5">
        <!-- Card 1: Passenger Capacity -->
        <div
          class="p-3 rounded-xl bg-surface-1/50 dark:bg-surface-2/30 border border-border/70 space-y-0.5"
        >
          <span
            class="text-[9px] font-black uppercase text-text-muted tracking-wider block"
          >
            TOTAL PASSENGER CAPACITY
          </span>
          <div class="flex items-baseline gap-1">
            <span
              class="text-xl font-black text-emerald-700 dark:text-emerald-400 font-mono"
            >
              {{ form.totalCapacity }}
            </span>
            <span class="text-[11px] font-bold text-text-primary">Seats</span>
          </div>
          <span class="text-[9px] text-text-muted block">
            32 of 33 Gross (1 Lavatory)
          </span>
        </div>

        <!-- Card 2: Wheelchair Designated -->
        <div
          class="p-3 rounded-xl bg-surface-1/50 dark:bg-surface-2/30 border border-border/70 space-y-0.5"
        >
          <span
            class="text-[9px] font-black uppercase text-text-muted tracking-wider block"
          >
            WHEELCHAIR DESIGNATED
          </span>
          <div class="flex items-baseline gap-1">
            <span
              class="text-xl font-black text-indigo-600 dark:text-indigo-400 font-mono"
            >
              {{ form.wheelchairSpaces }}
            </span>
            <span class="text-[11px] font-bold text-text-primary">Spaces</span>
          </div>
          <span class="text-[9px] text-text-muted block">
            Row 03A, 03B with Anchors
          </span>
        </div>

        <!-- Card 3: Seat Pitch -->
        <div
          class="p-3 rounded-xl bg-surface-1/50 dark:bg-surface-2/30 border border-border/70 space-y-0.5"
        >
          <span
            class="text-[9px] font-black uppercase text-text-muted tracking-wider block"
          >
            AVERAGE SEAT PITCH
          </span>
          <div class="flex items-baseline gap-1">
            <span class="text-xl font-black text-text-primary font-mono">
              {{ form.seatPitch }}
            </span>
            <span class="text-[11px] font-bold text-text-muted">mm</span>
          </div>
          <span
            class="text-[9px] text-emerald-700 dark:text-emerald-400 font-semibold block"
          >
            Comfort Grade: Extra Legroom
          </span>
        </div>

        <!-- Card 4: Recline Angle -->
        <div
          class="p-3 rounded-xl bg-surface-1/50 dark:bg-surface-2/30 border border-border/70 space-y-0.5"
        >
          <span
            class="text-[9px] font-black uppercase text-text-muted tracking-wider block"
          >
            RECLINE ANGLE
          </span>
          <div class="flex items-baseline gap-1">
            <span class="text-xl font-black text-text-primary font-mono">
              {{ form.reclineAngle }}°
            </span>
            <span class="text-[10px] font-bold text-text-muted truncate"
              >Semi-Sleeper</span
            >
          </div>
          <span class="text-[9px] text-text-muted block">
            Calf-rest Extender Equipt
          </span>
        </div>
      </div>
    </div>

    <!-- ─── Onboard Amenities Specification ─── -->
    <div class="space-y-2.5 pt-2 border-t border-border/70">
      <div class="flex items-center justify-between">
        <h3
          class="text-xs font-black text-text-primary uppercase tracking-wider"
        >
          Onboard Amenities Specification
        </h3>
        <span
          class="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold font-mono"
        >
          {{ selectedAmenitiesCount }} Selected
        </span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
        <label
          v-for="amenity in allAmenities"
          :key="amenity.id"
          class="flex items-center gap-2 p-2 rounded-xl bg-surface-1/40 dark:bg-surface-2/20 border border-border/60 cursor-pointer hover:border-accent-500/50 transition-colors"
        >
          <input
            v-model="form.amenities"
            type="checkbox"
            :value="amenity.id"
            class="rounded text-[#0F5A47] focus:ring-[#0F5A47] w-4 h-4 cursor-pointer"
          />
          <Icon :name="amenity.icon" class="w-3.5 h-3.5 text-text-muted" />
          <span class="text-[11px] font-semibold text-text-primary truncate">
            {{ amenity.label }}
          </span>
        </label>
      </div>
    </div>

    <!-- ─── Luggage Allowance ─── -->
    <div class="space-y-1 pt-2 border-t border-border/70">
      <label class="text-[11px] font-bold text-text-muted uppercase">
        Max Luggage Allowance per Passenger
      </label>
      <div
        class="flex items-center gap-2 p-2.5 rounded-xl bg-surface-1/50 dark:bg-surface-2/30 border border-border text-xs text-text-primary font-medium"
      >
        <Icon
          name="ph:suitcase-simple-bold"
          class="w-4 h-4 text-text-muted shrink-0"
        />
        <input
          v-model="form.luggage"
          type="text"
          class="w-full bg-transparent focus:outline-none text-xs text-text-primary"
        />
      </div>
    </div>

    <!-- ─── Dispatcher Operational Dispatch Notes ─── -->
    <div class="space-y-1 pt-2 border-t border-border/70">
      <label class="text-[11px] font-bold text-text-muted uppercase">
        Dispatcher Operational Dispatch Notes
      </label>
      <textarea
        v-model="form.dispatchNotes"
        rows="3"
        class="w-full p-2.5 rounded-xl bg-surface-1/50 dark:bg-surface-2/30 border border-border text-xs text-text-primary focus:outline-none focus:border-accent-500 custom-scrollbar"
        placeholder="Add special notes for dispatchers and ground operations..."
      />
    </div>

    <!-- ─── Action Buttons ─── -->
    <div
      class="pt-3 border-t border-border/70 flex items-center justify-between gap-2 flex-wrap"
    >
      <LazyVButton
        variant="ghost"
        size="xs"
        rounded="xl"
        @click="emit('discard')"
      >
        Discard Changes
      </LazyVButton>

      <div class="flex items-center gap-2">
        <LazyVButton
          variant="outline"
          size="xs"
          rounded="xl"
          icon="ph:eye-bold"
          @click="emit('preview')"
        >
          Preview Client View
        </LazyVButton>

        <LazyVButton
          variant="primary"
          size="xs"
          rounded="xl"
          icon="ph:check-bold"
          custom-class="bg-[#0F5A47] hover:bg-[#0c4939] border-none text-white shadow-sm shadow-[#0F5A47]/20"
          @click="emit('save', form)"
        >
          Save & Deploy Template
        </LazyVButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const emit = defineEmits<{
  (e: "discard"): void;
  (e: "preview"): void;
  (e: "save", data: any): void;
}>();

const chassisOptions = [
  "MCV 600 VIP / Mercedes-Benz OC 500 RF (12.8m)",
  "MAN Lion's Coach Supreme (13.2m)",
  "Mercedes-Benz Travego 16 RHD (12.3m)",
  "Daewoo Royal City Intercity (11.8m)",
  "MCV 400 Eco Intercity (10.5m)",
];

const serviceClasses = ["VIP First", "Standard", "Sleeper", "Commuter"];

const allAmenities = [
  { id: "ac", label: "Individual AC Nozzles", icon: "ph:wind-bold" },
  { id: "wifi", label: "High-Speed 5G WiFi", icon: "ph:wifi-high-bold" },
  { id: "usb", label: "USB-C & 220V Outlets", icon: "ph:plug-charging-bold" },
  { id: "wc", label: "Chemical Restroom (WC)", icon: "ph:toilet-bold" },
  {
    id: "screens",
    label: "Individual Seat Screens",
    icon: "ph:television-simple-bold",
  },
  { id: "minibar", label: "Refreshment Minibar", icon: "ph:brandy-bold" },
  { id: "tray", label: "Water & Snack Tray", icon: "ph:fork-knife-bold" },
  { id: "lamp", label: "Personal Reading Lamp", icon: "ph:lamp-bold" },
];

const form = ref({
  uid: "TMP-EGP-600",
  name: "VIP 2+1 Executive Suite",
  chassis: "MCV 600 VIP / Mercedes-Benz OC 500 RF (12.8m)",
  serviceClass: "VIP First",
  totalCapacity: 32,
  wheelchairSpaces: 2,
  seatPitch: 860,
  reclineAngle: 140,
  amenities: ["ac", "wifi", "usb", "wc", "screens", "tray", "lamp"],
  luggage: "2 x 23kg Checked Bags + 1 Overhead Carry-on",
  dispatchNotes:
    "Optimized for Cairo - Hurghada and Cairo - Luxor 6+ hour express corridors. Aisle gap maintained at minimum 420mm.",
});

const selectedAmenitiesCount = computed(() => form.value.amenities.length);
</script>