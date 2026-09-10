<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12 sm:space-y-16">
    <!-- Header -->
    <div class="text-center space-y-4 max-w-2xl mx-auto">
      <div
        class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-800 text-[#EA580C] dark:text-orange-400 text-xs font-bold uppercase tracking-wider"
      >
        <Icon name="ph:question-bold" class="w-4 h-4" />
        <span>Answers & Support</span>
      </div>
      <h1 class="text-3xl sm:text-5xl font-black tracking-tight text-text-primary">
        Frequently Asked Questions
      </h1>
      <p class="text-sm sm:text-base text-text-secondary leading-relaxed">
        Everything you need to know about booking bus tickets, boarding procedures, luggage limits, and payment methods in Egypt.
      </p>
    </div>

    <!-- Category Filter Tabs -->
    <div class="flex items-center justify-center gap-2 flex-wrap">
      <button
        v-for="category in categories"
        :key="category.id"
        type="button"
        class="px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
        :class="activeCategory === category.id ? 'bg-[#EA580C] text-white' : 'bg-surface-1 dark:bg-[#131B2E] border border-border/70 text-text-secondary hover:text-text-primary'"
        @click="activeCategory = category.id"
      >
        {{ category.title }}
      </button>
    </div>

    <!-- Accordion Section -->
    <div class="p-6 sm:p-8 rounded-3xl bg-surface-1 dark:bg-[#131B2E] border border-border/70 space-y-6">
      <div class="flex items-center justify-between pb-2 border-b border-border/60">
        <h2 class="text-lg font-black text-text-primary tracking-tight">
          {{ currentCategoryTitle }}
        </h2>
        <span class="text-xs text-text-muted">
          {{ currentQuestions.length }} Questions
        </span>
      </div>

      <LazyVAccordion
        v-model="openQuestion"
        :items="currentAccordionItems"
        :multiple="false"
      />
    </div>

    <!-- Still Have Questions Card -->
    <div class="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-orange-50 to-amber-50 dark:from-[#1A1824] dark:to-[#141B2E] border border-orange-200/70 dark:border-orange-900/40 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-start">
      <div class="space-y-1">
        <h3 class="text-lg font-bold text-text-primary">Still have questions?</h3>
        <p class="text-xs text-text-secondary">
          Our Egypt transit support specialists are available 24/7 on WhatsApp and phone.
        </p>
      </div>
      <div class="flex items-center gap-3">
        <a
          href="tel:19999"
          class="px-4 py-2 rounded-xl bg-[#EA580C] text-white text-xs font-bold hover:bg-orange-700 transition-colors shadow-sm"
        >
          Call 19XXX
        </a>
        <nuxt-link-locale
          to="/contact"
          class="px-4 py-2 rounded-xl bg-surface-0 dark:bg-[#0B0F19] text-text-primary text-xs font-bold border border-border/70 hover:bg-surface-2 transition-colors"
        >
          Contact Us
        </nuxt-link-locale>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { AccordionItem } from "~/types/shared/VAccordion";

const activeCategory = ref("booking");
const openQuestion = ref<string | number>(0);

const categories = [
  { id: "booking", title: "Booking & E-Tickets" },
  { id: "payment", title: "Payment & Fawry" },
  { id: "boarding", title: "Boarding & Luggage" },
  { id: "cancellation", title: "Cancellations & Refunds" },
];

const currentCategoryTitle = computed(() => {
  return categories.find((c) => c.id === activeCategory.value)?.title || "";
});

const allFaqs: Record<string, { id: number; title: string; content: string }[]> = {
  booking: [
    {
      id: 0,
      title: "Do I need to print my bus ticket to board the coach?",
      content:
        "No printed paper is required! You can board simply by showing the digital QR code e-ticket on your smartphone along with a valid National ID or Passport to the station gate inspector or coach conductor.",
    },
    {
      id: 1,
      title: "How do I choose my specific seat on the bus?",
      content:
        "When booking your trip, you will see an interactive seat map displaying available window, aisle, front-row, and VIP seats. Once selected, your seat is temporarily reserved for 10 minutes while you complete checkout.",
    },
    {
      id: 2,
      title: "Can I book tickets for someone else?",
      content:
        "Yes. During passenger details entry, simply input the traveler's full name and National ID / Passport number. The e-ticket QR code and WhatsApp notification will be sent directly to the contact phone number specified.",
    },
    {
      id: 3,
      title: "How far in advance can I book intercity bus tickets?",
      content:
        "Most Egyptian operators (Go Bus, BlueBus, Super Jet) open booking schedules 14 to 30 days ahead of departure. During Eid and summer holidays, schedules are often published up to 45 days in advance.",
    },
  ],
  payment: [
    {
      id: 0,
      title: "What payment methods are supported on Otobisi?",
      content:
        "We accept Visa, Mastercard, Meeza national debit cards, Mobile Wallets (Vodafone Cash, Orange Money, Etisalat Cash, WE Pay, InstaPay), and cash at any Fawry retail outlet across Egypt.",
    },
    {
      id: 1,
      title: "How does payment via Fawry work?",
      content:
        "When selecting Fawry at checkout, you will receive a 9-digit payment reference code. Take this code to any Fawry kiosk, store, or pharmacy and pay within 2 hours. Your seat is confirmed immediately upon payment.",
    },
    {
      id: 2,
      title: "Are there any hidden fees or extra surcharges?",
      content:
        "No. Otobisi displays official counter ticket fares with complete transparency. What you see is exactly what you pay, including all official road taxes and passenger insurance fees.",
    },
  ],
  boarding: [
    {
      id: 0,
      title: "How early should I arrive at the bus terminal before departure?",
      content:
        "We strongly advise arriving at least 30 to 45 minutes prior to scheduled departure. This provides sufficient time for luggage tag check-in, National ID inspection, and seat settling.",
    },
    {
      id: 1,
      title: "What is the baggage weight allowance per ticket?",
      content:
        "Each ticket includes one carry-on bag (up to 7kg) and one large checked luggage piece in the coach cargo hold (up to 25kg). Excess luggage can be paid for nominally at the terminal luggage counter.",
    },
    {
      id: 2,
      title: "Are pets permitted on the buses?",
      content:
        "Under Egyptian Ministry of Transport transit regulations, live animals and pets are strictly prohibited inside passenger compartments for safety and hygiene reasons.",
    },
  ],
  cancellation: [
    {
      id: 0,
      title: "How can I cancel my ticket?",
      content:
        "Go to the 'My Bookings' page, enter your booking reference and phone number, and click 'Cancel Ticket'. Your refund amount is calculated based on our transparent refund tier schedule.",
    },
    {
      id: 1,
      title: "How quickly do I get my money back after cancellation?",
      content:
        "Vodafone Cash and mobile wallet refunds are sent within 15 minutes. Fawry cash pickup codes are issued within 30 minutes. Credit and debit card refunds take 3 to 7 banking days depending on your bank.",
    },
    {
      id: 2,
      title: "Can I reschedule my trip date or departure time?",
      content:
        "Yes, ticket rescheduling is allowed up to 3 hours before departure. Depending on the operator, you can modify the date or switch to an earlier/later coach on the same route.",
    },
  ],
};

const currentQuestions = computed(() => {
  return allFaqs[activeCategory.value] || [];
});

const currentAccordionItems = computed<AccordionItem[]>(() => {
  return currentQuestions.value.map((q) => ({
    id: q.id,
    title: q.title,
    content: q.content,
  }));
});

watch(activeCategory, () => {
  openQuestion.value = 0;
});

useSeo({
  title: "Frequently Asked Questions (FAQ) | Otobisi Egypt",
  description:
    "Find answers to common questions about intercity bus booking in Egypt, Fawry payments, QR code digital tickets, luggage allowances, and cancellation policies.",
  private: false,
});
</script>
