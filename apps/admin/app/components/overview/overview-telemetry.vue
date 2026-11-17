<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
    <VStatCardWide
      v-for="card in cards"
      :key="card.label"
      :label="card.label"
      :value="card.value"
      :unit="card.unit"
      :delta="card.delta"
      :delta-note="card.deltaNote"
      :series="card.series"
      :start-label="card.startLabel"
      :end-label="card.endLabel"
      :footer="card.footer"
    >
      <template v-if="card.link" #footer-end>
        <NuxtLinkLocale
          :to="card.link"
          class="font-mono text-[11px] text-teal-700 dark:text-teal-300 hover:underline inline-flex items-center gap-1"
        >
          {{ card.linkLabel }}
          <Icon name="ph:arrow-right-bold" class="w-3 h-3 rtl:rotate-180" />
        </NuxtLinkLocale>
      </template>
    </VStatCardWide>
  </div>
</template>

<script lang="ts" setup>
// Placeholder series until the telemetry endpoint exists
const cards = [
  {
    label: "Daily Revenue Velocity",
    value: "148,250",
    unit: "EGP / day",
    delta: 18.4,
    deltaNote: "vs 7d avg",
    series: [92, 96, 90, 104, 110, 108, 121, 118, 126, 161, 140, 133, 138, 148],
    startLabel: "Nov 10",
    endLabel: "Today (Nov 24)",
    footer: "Peak route: Alexandria Express (94.2% yield)",
    link: "/reports",
    linkLabel: "Detailed ledger",
  },
  {
    label: "Active Seat Deployment",
    value: "4,120",
    unit: "/ 4,600 seats",
    delta: -3.1,
    deltaNote: "vs peak capacity",
    series: [40, 38, 36, 52, 70, 88, 90, 86, 78, 84, 89, 82, 60, 44],
    startLabel: "00:00 (Depot)",
    endLabel: "23:59",
    footer: "54 of 58 coaches on asphalt • 4 in Almaza workshop",
  },
  {
    label: "Revenue Yield per Km (RPKM)",
    value: "1.42",
    unit: "EGP / seat-km",
    delta: 5.1,
    deltaNote: "efficiency",
    series: [1.1, 1.18, 1.14, 1.22, 1.3, 1.26, 1.33, 1.38, 1.35, 1.4, 1.42],
    startLabel: "Cairo–Luxor",
    endLabel: "Cairo–Hurghada",
    footer: "Fuel breakeven threshold: 0.94 EGP/km",
    link: "/reports",
    linkLabel: "Corridor index",
  },
  {
    label: "Passenger CSAT Rating",
    value: "4.86",
    unit: "/ 5.0 (3,410 ratings)",
    delta: 0.2,
    deltaNote: "CSAT pts, last 30d",
    series: [4.62, 4.64, 4.7, 4.68, 4.74, 4.78, 4.8, 4.79, 4.83, 4.85, 4.86],
    startLabel: "Day 1: 4.62",
    endLabel: "Day 30: 4.86",
    footer: "Top compliment: A/C reliability & smooth braking",
  },
];
</script>
