<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
    <!-- Header -->
    <div class="text-center space-y-3 mb-10 sm:mb-14">
      <div
        class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-800 text-[#EA580C] dark:text-orange-400 text-xs font-bold uppercase tracking-wider"
      >
        <Icon name="ph:headset-bold" class="w-4 h-4" />
        <span>24/7 Traveler Support</span>
      </div>
      <h1
        class="text-3xl sm:text-4xl font-black tracking-tight text-text-primary"
      >
        Help Center & Passenger Support
      </h1>
      <p class="text-sm text-text-secondary max-w-xl mx-auto leading-relaxed">
        We are here to help with your bookings, schedule inquiries, luggage
        guidelines, and intercity travel across Egypt.
      </p>
    </div>

    <!-- Contact & Emergency Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-12">
      <!-- 24/7 National Transit Hotline Card -->
      <a
        href="tel:19999"
        class="group p-6 rounded-3xl bg-gradient-to-br from-[#EA580C] to-[#C2410C] text-white shadow-lg shadow-orange-950/20 hover:scale-[1.01] transition-transform duration-200 flex flex-col justify-between"
      >
        <div class="flex items-start justify-between">
          <div
            class="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-xs flex items-center justify-center"
          >
            <Icon name="ph:phone-call-fill" class="w-6 h-6 text-white" />
          </div>
          <span
            class="px-2.5 py-1 rounded-full bg-white/20 text-[10px] font-extrabold uppercase tracking-wider"
          >
            24/7 LIVE
          </span>
        </div>
        <div class="mt-8 space-y-1">
          <span class="text-xs text-orange-100 font-medium">
            National Transit Hotline
          </span>
          <div class="text-2xl sm:text-3xl font-black tracking-tight">
            19XXX
          </div>
          <p class="text-[11px] text-orange-100/90 leading-snug pt-1">
            Available 24/7 for passenger assistance, cancellations, and urgent
            booking changes
          </p>
        </div>
      </a>

      <!-- WhatsApp Travel Assistant Card -->
      <a
        href="https://wa.me/201012345678"
        target="_blank"
        rel="noopener noreferrer"
        class="group p-6 rounded-3xl bg-surface-1 dark:bg-[#131B2E] border border-border/80 hover:border-[#EA580C]/50 hover:scale-[1.01] transition-all duration-200 flex flex-col justify-between"
      >
        <div class="flex items-start justify-between">
          <div
            class="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center"
          >
            <Icon name="ph:whatsapp-logo-bold" class="w-6 h-6" />
          </div>
          <span
            class="px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-[10px] font-extrabold uppercase tracking-wider"
          >
            WHATSAPP
          </span>
        </div>
        <div class="mt-8 space-y-1">
          <span class="text-xs text-text-muted font-medium">
            Instant WhatsApp Assistant
          </span>
          <div
            class="text-xl sm:text-2xl font-black text-text-primary tracking-tight"
          >
            +20 10 1234 5678
          </div>
          <p class="text-[11px] text-text-secondary leading-snug pt-1">
            Receive e-tickets, check live bus schedules, and chat with travel
            specialists
          </p>
        </div>
      </a>
    </div>

    <!-- Quick Help Topics Accordion / Grid -->
    <div class="space-y-4">
      <h3 class="text-lg font-black text-text-primary tracking-tight mb-2">
        Frequently Asked Questions
      </h3>

      <div
        v-for="(item, idx) in faqItems"
        :key="idx"
        class="rounded-2xl border border-border/70 bg-surface-1/50 dark:bg-[#131B2E]/50 overflow-hidden transition-colors"
      >
        <button
          type="button"
          class="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-start font-bold text-xs sm:text-sm text-text-primary cursor-pointer hover:bg-surface-0 dark:hover:bg-[#1B2438] transition-colors"
          @click="toggleFaq(idx)"
        >
          <span class="leading-snug">{{ item.q }}</span>
          <Icon
            name="ph:caret-down-bold"
            class="w-4 h-4 text-text-muted shrink-0 transition-transform duration-200"
            :class="{ 'rotate-180 text-[#EA580C]': openFaq === idx }"
          />
        </button>
        <div
          v-show="openFaq === idx"
          class="px-4 sm:px-5 pb-5 pt-1 text-xs text-text-secondary leading-relaxed border-t border-border/40"
        >
          {{ item.a }}
        </div>
      </div>
    </div>

    <!-- Ministry of Transport Endorsement Banner -->
    <div
      class="mt-12 p-4 sm:p-5 rounded-2xl bg-surface-1 dark:bg-[#131B2E] border border-border/60 flex items-center gap-3"
    >
      <div
        class="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-950 text-[#EA580C] dark:text-orange-400 flex items-center justify-center shrink-0"
      >
        <Icon name="ph:seal-check-fill" class="w-5 h-5 text-[#EA580C]" />
      </div>
      <div class="text-xs">
        <h4 class="font-bold text-text-primary">
          Official Ministry of Transport Integration
        </h4>
        <p class="text-[11px] text-text-muted mt-0.5 leading-relaxed">
          All passenger reservations and ticket refunds comply with official
          Ministry of Transport consumer protection standards.
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const openFaq = ref<number | null>(0);

const toggleFaq = (idx: number) => {
  openFaq.value = openFaq.value === idx ? null : idx;
};

const faqItems = [
  {
    q: "How do I cancel or modify my booking?",
    a: 'You can easily modify or cancel your ticket via the "My Bookings" page using your booking code and phone number, or by dialing our 24/7 hotline 19XXX at least 2 hours before scheduled departure.',
  },
  {
    q: "What is the allowed luggage allowance per passenger?",
    a: "Each passenger is permitted one checked bag up to 25kg and one personal carry-on bag at no extra charge. Excess baggage may incur a nominal fee payable at the terminal.",
  },
  {
    q: "Do I need a printed ticket to board the coach?",
    a: "No printed ticket is required. You can present your digital e-ticket QR code on your mobile phone along with your valid National ID or Passport.",
  },
  {
    q: "What should I do if I left an item on the bus?",
    a: "Please dial 19XXX immediately with your trip number, operator name, and seat assignment. Our operations team will contact the terminal supervisor to secure your item.",
  },
];

useHead({
  title: "Help Center & 24/7 Support | Otobisi",
});
</script>