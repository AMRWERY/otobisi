<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12 sm:space-y-16">
    <!-- Header -->
    <div class="text-center space-y-4 max-w-2xl mx-auto">
      <div
        class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-800 text-[#EA580C] dark:text-orange-400 text-xs font-bold uppercase tracking-wider"
      >
        <Icon name="ph:arrows-counter-clockwise-bold" class="w-4 h-4" />
        <span>Transparent Refund Charter</span>
      </div>
      <h1 class="text-3xl sm:text-5xl font-black tracking-tight text-text-primary">
        Cancellation & Refund Policy
      </h1>
      <p class="text-sm sm:text-base text-text-secondary leading-relaxed">
        Compliant with Egyptian Ministry of Transport (MOT) regulations. Clear rules, fair timelines, and guaranteed refunds directly to your original payment method.
      </p>
    </div>

    <!-- Quick Action / Direct Cancellation Callout -->
    <div class="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#EA580C] to-[#C2410C] text-white shadow-xl shadow-orange-950/20 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
      <div class="space-y-2">
        <h2 class="text-xl font-bold">Have a Ticket to Cancel or Reschedule?</h2>
        <p class="text-xs text-orange-100 max-w-md">
          Enter your booking reference and phone number in My Bookings to cancel instantly without waiting for customer service.
        </p>
      </div>
      <nuxt-link-locale
        to="/bookings"
        class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-[#EA580C] font-black text-xs hover:bg-orange-50 transition-colors shrink-0 shadow-sm"
      >
        <span>Manage / Cancel Ticket</span>
        <Icon name="ph:arrow-right-bold" class="w-4 h-4" />
      </nuxt-link-locale>
    </div>

    <!-- Refund Timeline Tiers -->
    <div class="space-y-6">
      <div>
        <h2 class="text-xl font-black text-text-primary tracking-tight">Official Refund Schedule</h2>
        <p class="text-xs text-text-muted mt-0.5">Refund percentages based on departure countdown</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <div
          v-for="tier in tiers"
          :key="tier.hours"
          class="p-6 rounded-3xl bg-surface-1 dark:bg-[#131B2E] border border-border/70 space-y-3"
        >
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-text-muted">{{ tier.timeframe }}</span>
            <span
              class="px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider"
              :class="tier.badgeColor"
            >
              {{ tier.refund }}
            </span>
          </div>
          <div class="text-lg font-black text-text-primary">{{ tier.hours }}</div>
          <p class="text-xs text-text-secondary leading-relaxed">{{ tier.details }}</p>
        </div>
      </div>
    </div>

    <!-- How Refunds Are Paid Out -->
    <div class="p-6 sm:p-8 rounded-3xl bg-surface-1 dark:bg-[#131B2E] border border-border/70 space-y-6">
      <h2 class="text-xl font-black text-text-primary tracking-tight">Payment Refund Methods & Timeframes</h2>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div class="space-y-2">
          <div class="flex items-center gap-2 text-[#EA580C] font-bold text-xs">
            <Icon name="ph:device-mobile-bold" class="w-4 h-4" />
            <span>Mobile Wallets</span>
          </div>
          <div class="text-sm font-bold text-text-primary">Vodafone Cash / Orange / Etisalat</div>
          <p class="text-xs text-text-muted leading-relaxed">
            Instant refund deposited directly into your mobile wallet within 15 minutes of cancellation approval.
          </p>
        </div>

        <div class="space-y-2">
          <div class="flex items-center gap-2 text-[#EA580C] font-bold text-xs">
            <Icon name="ph:storefront-bold" class="w-4 h-4" />
            <span>Fawry POS Cash</span>
          </div>
          <div class="text-sm font-bold text-text-primary">Fawry Cash Refund Code</div>
          <p class="text-xs text-text-muted leading-relaxed">
            Receive a payout reference code via SMS. Collect your cash at any Fawry retail outlet across Egypt within 7 days.
          </p>
        </div>

        <div class="space-y-2">
          <div class="flex items-center gap-2 text-[#EA580C] font-bold text-xs">
            <Icon name="ph:credit-card-bold" class="w-4 h-4" />
            <span>Debit / Credit Cards</span>
          </div>
          <div class="text-sm font-bold text-text-primary">Visa / Mastercard / Meeza</div>
          <p class="text-xs text-text-muted leading-relaxed">
            Processed instantly on our gateway. Standard bank processing reflects funds back to your statement in 3 to 7 business days.
          </p>
        </div>
      </div>
    </div>

    <!-- Operator Cancellations / Coach Breakdown -->
    <div class="p-6 rounded-3xl bg-surface-1 dark:bg-[#131B2E] border border-border/70 space-y-3">
      <div class="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
        <Icon name="ph:shield-check-bold" class="w-4 h-4" />
        <span>Coach Operator Cancellations & Delays</span>
      </div>
      <h3 class="text-base font-bold text-text-primary">Trip Cancelled by the Bus Operator?</h3>
      <p class="text-xs text-text-secondary leading-relaxed">
        If an operator cancels a departure, delays by more than 90 minutes without replacement, or experiences mechanical issues, you are entitled by Egyptian law to either a <strong>100% full refund</strong> with zero processing fees, or complimentary re-booking on the next available coach.
      </p>
    </div>

    <!-- Support Hotline Contact Banner -->
    <div class="p-6 rounded-3xl bg-surface-1 dark:bg-[#131B2E] border border-border/70 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-start">
      <div>
        <h4 class="text-sm font-bold text-text-primary">Need assistance with an active refund?</h4>
        <p class="text-xs text-text-muted mt-0.5">Call our national support hotline 19XXX or WhatsApp +20 10 1234 5678</p>
      </div>
      <nuxt-link-locale
        to="/contact"
        class="px-5 py-2.5 rounded-xl bg-surface-2 dark:bg-[#1B2438] hover:bg-[#EA580C] hover:text-white border border-border/70 text-xs font-bold text-text-primary transition-colors"
      >
        Contact Support Desk
      </nuxt-link-locale>
    </div>
  </div>
</template>

<script lang="ts" setup>
const tiers = [
  {
    hours: "More than 24 Hours",
    timeframe: "> 24H Prior to Departure",
    refund: "100% Refund",
    badgeColor: "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400",
    details: "Full ticket fare returned to your original payment method. Only standard operator bank transaction fee may apply.",
  },
  {
    hours: "2 to 24 Hours",
    timeframe: "2H – 24H Prior to Departure",
    refund: "80% Refund",
    badgeColor: "bg-orange-100 dark:bg-orange-950/60 text-[#EA580C] dark:text-orange-400",
    details: "80% refund of the base ticket fare. Seat is immediately released for other passengers on the coach route.",
  },
  {
    hours: "Under 2 Hours",
    timeframe: "< 2H or Post-Departure",
    refund: "No Refund",
    badgeColor: "bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400",
    details: "Non-refundable once coach boarding manifests have finalized and passenger insurance is activated.",
  },
];

useSeo({
  title: "Cancellation & Refund Policy | Otobisi Egypt",
  description:
    "Official Egypt Ministry of Transport cancellation policy for intercity bus tickets. Learn about refund tiers, Fawry/Vodafone Cash payouts, and cancellation steps.",
  private: false,
});
</script>
