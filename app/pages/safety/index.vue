<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12 sm:space-y-16">
    <!-- Header -->
    <div class="text-center space-y-4 max-w-2xl mx-auto">
      <div
        class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-800 text-[#EA580C] dark:text-orange-400 text-xs font-bold uppercase tracking-wider"
      >
        <Icon name="ph:shield-check-bold" class="w-4 h-4" />
        <span>Highway Safety Protocol</span>
      </div>
      <h1 class="text-3xl sm:text-5xl font-black tracking-tight text-text-primary">
        Safety Standards Compliance
      </h1>
      <p class="text-sm sm:text-base text-text-secondary leading-relaxed">
        Your safety across Egyptian highways is our absolute priority. Learn about our fleet compliance requirements, driver fatigue regulations, and 24/7 GPS telemetry.
      </p>
    </div>

    <!-- Safety Pillars Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
        v-for="pillar in pillars"
        :key="pillar.title"
        class="p-6 sm:p-8 rounded-3xl bg-surface-1 dark:bg-[#131B2E] border border-border/70 space-y-3"
      >
        <div class="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-950/60 text-[#EA580C] flex items-center justify-center">
          <Icon :name="pillar.icon" class="w-6 h-6" />
        </div>
        <h3 class="text-lg font-bold text-text-primary">{{ pillar.title }}</h3>
        <p class="text-xs text-text-secondary leading-relaxed">{{ pillar.desc }}</p>
      </div>
    </div>

    <!-- Mandatory Long-Route Regulations -->
    <div class="p-6 sm:p-8 rounded-3xl bg-surface-1 dark:bg-[#131B2E] border border-border/70 space-y-4">
      <div class="flex items-center gap-2 text-[#EA580C] font-bold text-xs uppercase tracking-wider">
        <Icon name="ph:users-three-bold" class="w-4 h-4" />
        <span>Egyptian Highway Traffic Law</span>
      </div>
      <h2 class="text-xl font-black text-text-primary tracking-tight">Two-Driver Policy on Journeys &gt; 400km</h2>
      <p class="text-xs text-text-secondary leading-relaxed">
        Under Ministry of Transport transit safety regulations, any scheduled bus trip exceeding 400 kilometers (such as <strong>Cairo to Hurghada, Sharm El Sheikh, Luxor, or Aswan</strong>) must operate with <strong>two licensed professional drivers</strong> on board to switch shifts and prevent driver fatigue on desert expressways.
      </p>
    </div>

    <!-- Emergency Protocol -->
    <div class="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#EA580C] to-[#C2410C] text-white shadow-xl shadow-orange-950/20 space-y-4">
      <div class="flex items-center gap-2 text-orange-200 font-bold text-xs uppercase tracking-wider">
        <Icon name="ph:phone-call-fill" class="w-4 h-4" />
        <span>Rapid Response</span>
      </div>
      <h3 class="text-xl sm:text-2xl font-black">24/7 National Transit Highway Hotline</h3>
      <p class="text-xs sm:text-sm text-orange-100 leading-relaxed max-w-2xl">
        In the unlikely event of highway breakdown or safety concern during your trip, dial <strong>19XXX</strong> immediately. Our operations control room coordinates directly with highway emergency patrols and operator dispatch.
      </p>
      <div class="pt-2">
        <a
          href="tel:19999"
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-[#EA580C] font-black text-xs hover:bg-orange-50 transition-colors shadow-sm group"
        >
          <span>Dial 19XXX Hotline</span>
          <Icon name="ph:arrow-right-bold" class="w-3.5 h-3.5 icon-arrow-animated" />
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const pillars = [
  {
    icon: "ph:gauge-bold",
    title: "GPS Telemetry & Speed Caps",
    desc: "Every partner coach is equipped with active GPS tracking adhering to the national highway commercial vehicle speed limit (100 km/h max).",
  },
  {
    icon: "ph:wrench-bold",
    title: "Mandatory MOT Vehicle Inspections",
    desc: "Coaches undergo mandatory periodic mechanical, brake, and tire safety checks certified by the Egyptian Ministry of Transport.",
  },
  {
    icon: "ph:user-check-bold",
    title: "Strict Driver Screening & Health",
    desc: "All drivers hold Class A commercial passenger licenses, undergo regular mandatory substance testing, and receive defensive driving training.",
  },
  {
    icon: "ph:sparkle-bold",
    title: "Sanitization & Climate Control",
    desc: "Coaches are thoroughly cleaned, ventilated, and disinfected before every departure with certified onboard air filtration systems.",
  },
];

useSeo({
  title: "Safety Standards Compliance | Otobisi Egypt",
  description:
    "Learn about Otobisi's highway safety standards, Ministry of Transport compliance, GPS speed telemetry, and 2-driver policies on Egyptian intercity routes.",
  private: false,
});
</script>
