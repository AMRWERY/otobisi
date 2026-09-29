<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12 sm:space-y-16">
    <!-- Header -->
    <div class="text-center space-y-4 max-w-2xl mx-auto">
      <div
        class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-800 text-[#EA580C] dark:text-orange-400 text-xs font-bold uppercase tracking-wider"
      >
        <Icon name="ph:scales-bold" class="w-4 h-4" />
        <span>Ministry of Transport (MOT) Charter</span>
      </div>
      <h1 class="text-3xl sm:text-5xl font-black tracking-tight text-text-primary">
        Passenger Rights in Egypt
      </h1>
      <p class="text-sm sm:text-base text-text-secondary leading-relaxed">
        Your legal protections and rights when traveling by intercity coach across Egypt, under official regulations set forth by the Egyptian Ministry of Transport and Consumer Protection Agency (CPA).
      </p>
    </div>

    <!-- Official MOT Endorsement Notice -->
    <div class="p-6 rounded-3xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 flex items-start gap-4">
      <div class="w-10 h-10 rounded-2xl bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
        <Icon name="ph:seal-check-fill" class="w-6 h-6" />
      </div>
      <div class="space-y-1">
        <h3 class="text-sm font-bold text-emerald-900 dark:text-emerald-200">
          Official Consumer Protection Compliance
        </h3>
        <p class="text-xs text-emerald-800/90 dark:text-emerald-300 leading-relaxed">
          All bus companies listed on Otobisi hold valid Ministry of Transport operating licenses, commercial registrations, and mandatory highway transit passenger insurance under Egyptian Law.
        </p>
      </div>
    </div>

    <!-- Charter Rights Grid -->
    <div class="space-y-6">
      <h2 class="text-xl font-black text-text-primary tracking-tight">Core Passenger Entitlements</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          v-for="right in charterRights"
          :key="right.title"
          class="p-6 rounded-3xl bg-surface-1 dark:bg-[#131B2E] border border-border/70 space-y-3"
        >
          <div class="w-10 h-10 rounded-2xl bg-orange-100 dark:bg-orange-950/60 text-[#EA580C] flex items-center justify-center">
            <Icon :name="right.icon" class="w-5 h-5" />
          </div>
          <h3 class="text-base font-bold text-text-primary">{{ right.title }}</h3>
          <p class="text-xs text-text-secondary leading-relaxed">{{ right.description }}</p>
        </div>
      </div>
    </div>

    <!-- Compensation & Delay Policy Table -->
    <div class="p-6 sm:p-8 rounded-3xl bg-surface-1 dark:bg-[#131B2E] border border-border/70 space-y-6">
      <h2 class="text-xl font-black text-text-primary tracking-tight">Delays & Overbooking Protections</h2>
      <div class="space-y-4 text-xs text-text-secondary leading-relaxed">
        <div class="p-4 rounded-2xl bg-surface-0 dark:bg-[#0B0F19] border border-border/60 space-y-1">
          <div class="font-bold text-text-primary text-sm">Departure Delays Exceeding 90 Minutes</div>
          <p>If your scheduled bus is delayed by more than 90 minutes without replacement, you are legally entitled to cancel immediately for a 100% full refund, or request complimentary transfer to the next available bus.</p>
        </div>

        <div class="p-4 rounded-2xl bg-surface-0 dark:bg-[#0B0F19] border border-border/60 space-y-1">
          <div class="font-bold text-text-primary text-sm">Mechanical Breakdown on Highway</div>
          <p>In the rare event of a mechanical malfunction on intercity desert or agricultural highways, the operator must dispatch a relief coach within 60 minutes and ensure passenger refreshments and safety until transit resumes.</p>
        </div>

        <div class="p-4 rounded-2xl bg-surface-0 dark:bg-[#0B0F19] border border-border/60 space-y-1">
          <div class="font-bold text-text-primary text-sm">Seat Discrepancy & Guaranteed Booking</div>
          <p>If the operator is unable to provide the reserved seat class (e.g. booked VIP/Royal but offered Standard), the fare difference must be refunded immediately in cash or wallet credit upon arrival.</p>
        </div>
      </div>
    </div>

    <!-- Filing a Complaint -->
    <div class="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-orange-50 to-amber-50 dark:from-[#1A1824] dark:to-[#141B2E] border border-orange-200/70 dark:border-orange-900/40 space-y-4">
      <div class="space-y-1">
        <h3 class="text-lg font-bold text-text-primary">How to File an Escalated Complaint</h3>
        <p class="text-xs text-text-secondary leading-relaxed">
          If an operator fails to meet their service obligations, you can submit an official dispute through Otobisi. We investigate directly with MOT terminal supervisors and ensure your resolution.
        </p>
      </div>
      <div class="flex flex-wrap items-center gap-3 pt-2">
        <nuxt-link-locale
          to="/contact"
          class="px-5 py-2.5 rounded-xl bg-[#EA580C] hover:bg-orange-700 text-white text-xs font-bold transition-colors shadow-sm"
        >
          Submit Dispute Report
        </nuxt-link-locale>
        <span class="text-xs text-text-muted">Or call National Hotline 19XXX (24/7)</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const charterRights = [
  {
    icon: "ph:armchair-bold",
    title: "Guaranteed Reserved Seating",
    description:
      "Passengers have an absolute right to occupy the exact seat number shown on their electronic ticket manifest without reallocation.",
  },
  {
    icon: "ph:first-aid-kit-bold",
    title: "Mandatory Passenger Insurance",
    description:
      "Every ticket booked through Otobisi automatically includes passenger accidental insurance under the Egyptian transit authority guarantee fund.",
  },
  {
    icon: "ph:wheelchair-bold",
    title: "Accessibility & Priority Assistance",
    description:
      "Elderly travelers, pregnant women, and passengers with disabilities are entitled to priority boarding, luggage handling assistance, and accessible seating.",
  },
  {
    icon: "ph:receipt-bold",
    title: "Official Price Transparency",
    description:
      "Bus operators are legally prohibited from demanding unstated baggage fees or surcharges not declared during official digital checkout.",
  },
];

useSeo({
  title: "Passenger Rights (Egypt MOT) | Otobisi",
  description:
    "Egyptian Ministry of Transport passenger charter and consumer protection rights for coach travelers. Learn about compensation for bus delays, mechanical breakdowns, and disputes.",
  private: false,
});
</script>
