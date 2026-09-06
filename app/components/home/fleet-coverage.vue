<template>
  <div>
    <section id="operators">
      <span
        class="text-[11px] font-bold tracking-wider text-amber-600 uppercase"
        >Fleet Coverage</span
      >
      <h2 class="text-2xl font-bold text-text-primary mt-1">
        Official partners with Egypt's licensed transit operators
      </h2>
      <p class="text-xs text-text-secondary mt-1">
        Real-time seat mapping integrated directly with Ministry of Transport
        certified fleets.
      </p>

      <!-- Operators Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mt-8">
        <div
          v-for="op in operators"
          :key="op.name"
          class="bg-surface-1 border border-border rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center text-center hover:border-border-strong hover:shadow-lg transition-all cursor-pointer group"
        >
          <!-- Operator Icon with custom color circle -->
          <div
            :class="[op.bgColor, op.iconColor]"
            class="w-11 h-11 rounded-full flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110"
          >
            <icon :name="op.icon" class="w-5 h-5" />
          </div>

          <span class="font-bold text-sm text-text-primary leading-tight">
            {{ op.name }}
          </span>
          <span class="text-xs text-text-secondary mt-1 leading-snug">
            {{ op.desc }}
          </span>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import type { OperatorBadge } from "~/types/home/fleet-coverage";

const operators = ref<OperatorBadge[]>([
  {
    name: "Go Bus",
    desc: "Aero & Elite Class",
    icon: "ph:bus-fill",
    iconColor: "text-orange-500",
    bgColor: "bg-orange-500/10 border border-orange-500/20",
  },
  {
    name: "BlueBus",
    desc: "VIP & First Class",
    icon: "ph:van-fill",
    iconColor: "text-teal-400",
    bgColor: "bg-teal-500/10 border border-teal-500/20",
  },
  {
    name: "Super Jet",
    desc: "National Express",
    icon: "ph:gauge-bold",
    iconColor: "text-amber-500",
    bgColor: "bg-amber-500/10 border border-amber-500/20",
  },
  {
    name: "West Delta",
    desc: "Alex & Matrouh",
    icon: "ph:navigation-arrow-fill",
    iconColor: "text-blue-400",
    bgColor: "bg-blue-500/10 border border-blue-500/20",
  },
  {
    name: "East Delta",
    desc: "Canal & Sinai",
    icon: "ph:compass-fill",
    iconColor: "text-emerald-400",
    bgColor: "bg-emerald-500/10 border border-emerald-500/20",
  },
  {
    name: "Upper Egypt",
    desc: "Luxor & Aswan",
    icon: "ph:sun-fill",
    iconColor: "text-yellow-500",
    bgColor: "bg-yellow-500/10 border border-yellow-500/20",
  },
  {
    name: "El Gouna",
    desc: "Red Sea Express",
    icon: "ph:waves-bold",
    iconColor: "text-cyan-400",
    bgColor: "bg-cyan-500/10 border border-cyan-500/20",
  },
  {
    name: "Swvl",
    desc: "Intercity Direct",
    icon: "ph:lightning-fill",
    iconColor: "text-rose-400",
    bgColor: "bg-rose-500/10 border border-rose-500/20",
  },
]);
</script>