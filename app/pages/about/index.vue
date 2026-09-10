<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12 sm:space-y-16">
    <!-- Header / Hero -->
    <div class="text-center space-y-4 max-w-3xl mx-auto">
      <div
        class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-800 text-[#EA580C] dark:text-orange-400 text-xs font-bold uppercase tracking-wider"
      >
        <Icon name="ph:bus-duotone" class="w-4 h-4" />
        <span>Egypt's Transit Platform</span>
      </div>
      <h1 class="text-3xl sm:text-5xl font-black tracking-tight text-text-primary">
        Modernizing Intercity Bus Travel Across Egypt
      </h1>
      <p class="text-sm sm:text-base text-text-secondary leading-relaxed">
        Otobisi connects passengers with Egypt's premier licensed coach operators through real-time seat inventory, transparent fares, and instant digital ticketing across all 27 governorates.
      </p>
    </div>

    <!-- Key Metrics Grid -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      <div
        v-for="metric in metrics"
        :key="metric.label"
        class="p-6 rounded-3xl bg-surface-1 dark:bg-[#131B2E] border border-border/70 text-center space-y-1 hover:border-[#EA580C]/40 transition-colors"
      >
        <div class="text-3xl sm:text-4xl font-black text-[#EA580C] dark:text-orange-400">
          {{ metric.value }}
        </div>
        <div class="text-xs font-bold text-text-primary">
          {{ metric.label }}
        </div>
        <p class="text-[11px] text-text-muted leading-tight">
          {{ metric.description }}
        </p>
      </div>
    </div>

    <!-- Mission & Story Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
      <div class="p-8 rounded-3xl bg-surface-1 dark:bg-[#131B2E] border border-border/70 space-y-4 flex flex-col justify-between">
        <div class="space-y-3">
          <div class="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-950/70 text-[#EA580C] flex items-center justify-center">
            <Icon name="ph:compass-rose-bold" class="w-6 h-6" />
          </div>
          <h2 class="text-xl sm:text-2xl font-black text-text-primary tracking-tight">
            Our Mission
          </h2>
          <p class="text-xs sm:text-sm text-text-secondary leading-relaxed">
            For decades, Egyptian travelers endured long terminal queues, uncertain departure schedules, and paper ticket friction. Otobisi eliminates that friction by unifying 30+ regional operators onto a single digital platform with guaranteed seat selection and 100% digital boarding.
          </p>
        </div>
        <div class="pt-4 border-t border-border/60 flex items-center gap-2 text-xs font-bold text-[#EA580C]">
          <Icon name="ph:shield-check-fill" class="w-4 h-4" />
          <span>Licensed by Egypt Ministry of Transport (MOT)</span>
        </div>
      </div>

      <div class="p-8 rounded-3xl bg-gradient-to-br from-[#EA580C] to-[#C2410C] text-white shadow-xl shadow-orange-950/20 space-y-4 flex flex-col justify-between">
        <div class="space-y-3">
          <div class="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-xs flex items-center justify-center">
            <Icon name="ph:buildings-bold" class="w-6 h-6 text-white" />
          </div>
          <h2 class="text-xl sm:text-2xl font-black tracking-tight">
            Built for Egypt, Expanding Regional Transit
          </h2>
          <p class="text-xs sm:text-sm text-orange-100 leading-relaxed">
            Headquartered in Cairo, our engineering and operations teams combine deep transit logistics expertise with cutting-edge software. We work hand-in-hand with terminal authorities from Alexandria Moharam Bek to Aswan High Dam.
          </p>
        </div>
        <div class="pt-4 border-t border-white/20 text-xs font-semibold text-orange-100">
          Otobisi Egypt SAE • Commercial Reg. 182491
        </div>
      </div>
    </div>

    <!-- Core Values -->
    <div class="space-y-6">
      <div class="text-center space-y-2">
        <h2 class="text-2xl font-black text-text-primary tracking-tight">
          What Drives Us
        </h2>
        <p class="text-xs sm:text-sm text-text-muted">
          Our commitments to every traveler boarding a bus across Egypt
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div
          v-for="value in values"
          :key="value.title"
          class="p-6 rounded-2xl bg-surface-1 dark:bg-[#131B2E] border border-border/70 space-y-2"
        >
          <div class="w-10 h-10 rounded-xl bg-surface-2 dark:bg-[#1B2438] text-[#EA580C] flex items-center justify-center mb-3">
            <Icon :name="value.icon" class="w-5 h-5" />
          </div>
          <h3 class="text-sm font-bold text-text-primary">{{ value.title }}</h3>
          <p class="text-xs text-text-secondary leading-relaxed">{{ value.desc }}</p>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="p-8 sm:p-10 rounded-3xl bg-surface-1 dark:bg-[#131B2E] border border-border/70 text-center space-y-4">
      <h2 class="text-xl sm:text-2xl font-black text-text-primary">
        Ready to Explore Egypt?
      </h2>
      <p class="text-xs sm:text-sm text-text-secondary max-w-md mx-auto">
        Search routes across Cairo, Alexandria, Hurghada, Sharm El Sheikh, Luxor, and beyond.
      </p>
      <div class="pt-2">
        <nuxt-link-locale
          to="/"
          class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#EA580C] hover:bg-orange-700 text-white font-bold text-xs shadow-md transition-colors group"
        >
          <span>Find Bus Tickets</span>
          <Icon name="ph:arrow-right-bold" class="w-4 h-4 icon-arrow-animated" />
        </nuxt-link-locale>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const metrics = [
  { value: "30+", label: "Licensed Operators", description: "Go Bus, BlueBus, Super Jet & regional fleets" },
  { value: "27", label: "Governorates Covered", description: "From Alexandria & Cairo to Upper Egypt & Sinai" },
  { value: "1.2M+", label: "Happy Travelers", description: "Tickets booked seamlessly with zero queueing" },
  { value: "99.8%", label: "Inventory Accuracy", description: "Real-time seat sync directly with station gates" },
];

const values = [
  {
    icon: "ph:ticket-bold",
    title: "100% Guaranteed Seats",
    desc: "Your chosen seat is locked instantly in operator dispatch systems. No double-booking, ever.",
  },
  {
    icon: "ph:money-bold",
    title: "Official Ticket Prices",
    desc: "Zero hidden surcharges. All ticket prices match official counter fares with instant digital receipt.",
  },
  {
    icon: "ph:headset-bold",
    title: "24/7 Egypt-Based Care",
    desc: "Our national hotline (19XXX) and WhatsApp specialists assist before, during, and after your trip.",
  },
];

useSeo({
  title: "About Us | Otobisi Egypt",
  description:
    "Learn how Otobisi modernizes intercity bus travel across Egypt with 30+ licensed operators, 27 governorates coverage, guaranteed seat booking, and digital ticketing.",
  private: false,
});
</script>
