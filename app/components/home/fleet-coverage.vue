<template>
  <div>
    <section
      id="operators"
      class="max-w-5xl mx-auto px-4 sm:px-6 pb-16 text-center"
    >
      <span
        class="text-[11px] font-bold tracking-wider text-orange-700 uppercase"
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
          class="bg-surface-1 border border-border rounded-xl p-3 flex flex-col items-center justify-center text-center shadow-2xs hover:border-border-strong transition-colors"
        >
          <span class="font-extrabold text-xs text-text-primary">{{
            op.name
          }}</span>
          <span class="text-[10px] text-text-muted mt-0.5">{{ op.desc }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
interface OperatorBadge {
  name: string;
  desc: string;
}

const operators = ref<OperatorBadge[]>([
  { name: "Go Bus", desc: "Nationwide" },
  { name: "BlueBus", desc: "Luxury VIP" },
  { name: "Super Jet", desc: "Arab Union" },
  { name: "West Delta", desc: "Alex & Coast" },
  { name: "East Delta", desc: "Canal & Sinai" },
  { name: "Upper Egypt", desc: "Luxor & Aswan" },
  { name: "El Gouna", desc: "Red Sea Express" },
  { name: "Swvl", desc: "Intercity" },
]);
</script>