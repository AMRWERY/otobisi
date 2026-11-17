<template>
  <!-- Mock of the public marketplace, which is always light-themed -->
  <div
    class="bg-slate-100/70 border border-slate-200/90 rounded-xl p-3 sm:p-4 text-slate-800"
  >
    <div
      class="flex items-center justify-between text-[10px] font-mono text-slate-400 pb-2 mb-2 border-b border-slate-200"
    >
      <span class="flex items-center gap-1 font-bold text-slate-600">
        <Icon name="ph:eye-bold" class="w-3.5 h-3.5" />
        OTOBISI BOOKING MARKETPLACE PREVIEW
      </span>
      <span>Live Client Rendering</span>
    </div>

    <div
      class="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-3"
    >
      <!-- Operator & class -->
      <div class="flex items-start justify-between gap-2">
        <div class="flex items-center gap-2.5 min-w-0">
          <div
            class="w-9 h-9 rounded-lg flex items-center justify-center text-white shadow-2xs transition-colors shrink-0"
            :style="{ backgroundColor: accent }"
          >
            <Icon name="ph:bus-fill" class="w-5 h-5" />
          </div>
          <div class="min-w-0">
            <div class="flex items-center gap-1">
              <span class="font-bold text-slate-900 text-xs truncate">
                {{ brandName }}
              </span>
              <Icon
                name="ph:seal-check-fill"
                class="w-3 h-3 text-teal-600 shrink-0"
              />
            </div>
            <p class="text-[10px] text-slate-400 truncate">{{ tagline }}</p>
          </div>
        </div>

        <div class="text-end shrink-0">
          <span
            :class="[
              'px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase',
              tierInfo.badgeClass,
            ]"
          >
            {{ tierInfo.label }}
          </span>
          <span class="block text-[9px] font-mono text-slate-400 mt-0.5">
            Coach #MCV-600
          </span>
        </div>
      </div>

      <!-- Timeline -->
      <div class="grid grid-cols-12 items-center gap-2 py-1 font-mono" dir="ltr">
        <div class="col-span-4">
          <div class="text-base font-black text-slate-900">07:00 AM</div>
          <div class="text-[10px] text-slate-600 font-bold leading-tight">
            Cairo (Almaza Terminal)
          </div>
          <div class="text-[9px] text-slate-400">Hub #402 Gate 3</div>
        </div>

        <div class="col-span-4 text-center">
          <span class="text-[9px] text-teal-800 font-bold block mb-0.5">
            2h 30m • Direct Intercity
          </span>
          <div class="relative flex items-center justify-center">
            <div class="h-0.5 w-full bg-slate-200" />
            <div
              class="absolute w-2 h-2 rounded-full border-2 border-white left-0"
              :style="{ backgroundColor: accent }"
            />
            <div
              class="absolute w-2 h-2 rounded-full border-2 border-white right-0"
              :style="{ backgroundColor: accent }"
            />
          </div>
          <span class="text-[8px] text-slate-400 block mt-0.5">
            Non-stop Desert Highway
          </span>
        </div>

        <div class="col-span-4 text-right">
          <div class="text-base font-black text-slate-900">09:30 AM</div>
          <div class="text-[10px] text-slate-600 font-bold leading-tight">
            Alexandria (Sidi Gaber)
          </div>
          <div class="text-[9px] text-slate-400">Station Terminal Pier A</div>
        </div>
      </div>

      <!-- Amenities -->
      <div
        class="flex items-center justify-between flex-wrap gap-2 text-[10px] font-mono text-slate-500 pt-2 border-t border-slate-100"
      >
        <span
          v-for="item in amenities"
          :key="item.label"
          class="flex items-center gap-1"
        >
          <Icon :name="item.icon" :class="['w-3 h-3', item.color]" />
          {{ item.label }}
        </span>
      </div>

      <!-- Price & CTA -->
      <div
        class="flex items-center justify-between pt-2 border-t border-slate-100"
      >
        <div>
          <div class="flex items-center gap-1">
            <span class="w-2 h-2 rounded-full bg-amber-500" />
            <span class="text-[10px] font-mono text-slate-500 font-semibold">
              8 seats left • 41/49 Booked
            </span>
          </div>
          <div class="flex items-baseline gap-1 mt-0.5">
            <span class="text-lg font-black text-slate-900 font-mono">
              220.00
            </span>
            <span class="text-[10px] font-mono text-slate-500">EGP / Seat</span>
          </div>
          <span class="text-[9px] font-mono text-emerald-700 block">
            Instant QR e-Ticket & Fawry pay
          </span>
        </div>

        <span
          class="px-4 py-2 rounded-lg text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors"
          :style="{ backgroundColor: accent }"
        >
          Select Seats
          <Icon name="ph:caret-right-bold" class="w-3.5 h-3.5" />
        </span>
      </div>
    </div>

    <div
      class="mt-2 text-[10px] font-mono text-slate-400 flex items-center gap-1"
    >
      <Icon name="ph:info-bold" class="w-3 h-3 text-slate-500 shrink-0" />
      <span>
        Real-time rendering reflects instant commuter app and web booking
        appearance across Almaza-Alexandria routes.
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { FleetTierKey } from "~/types/settings";

const props = defineProps<{
  brandName: string;
  tagline: string;
  accent: string;
  tier: FleetTierKey;
}>();

const tierInfo = computed(() => SETTINGS_FLEET_TIERS[props.tier]);

const amenities = [
  { icon: "ph:snowflake", label: "Climate AC", color: "text-cyan-600" },
  { icon: "ph:wifi-high", label: "5G Fast WiFi", color: "text-slate-700" },
  { icon: "ph:armchair", label: "Leather Recliner", color: "text-slate-700" },
  { icon: "ph:plug", label: "220V Outlets", color: "text-slate-700" },
];
</script>
